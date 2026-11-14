'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const Core = require('../core.js');

test('search folds case, umlauts, sharp s and German articles without changing English articles', () => {
  assert.equal(Core.normalizeSearch('  DER HÄUSER Straße  ', true), 'hauser strasse');
  assert.equal(Core.normalizeSearch('die casting', false), 'die casting');
  const words = Array.from({length:21}, (_, i) => [`word${i}`, '뜻', '', 'A contract example.', '계약 예문']);
  words[20] = ['die Häuser', '집들', '명사', 'Die Häuser sind groß.', '집들이 크다.', [['거처', 'Ein Zuhause.', '사는 곳']]];
  const books = [{id:'de', name:'독일어', lang:'de-DE', words}, {id:'custom', name:'가져온 단어장', words:[['Acquire', '취득', '', 'Sign this AGREEMENT.']]}];
  assert.equal(Core.searchWords(books, 'DER HAUSER')[0].day, 1);
  assert.equal(Core.searchWords(books, 'HÄUSER')[0].word[0], 'die Häuser');
  assert.equal(Core.searchWords(books, '거처')[0].pkgId, 'de');
  assert.equal(Core.searchWords(books, 'agreement')[0].pkgName, '가져온 단어장');
  assert.equal(Core.searchWords([{id:'custom-de', name:'가져온 독일어', words:[['Baum','나무']]}], 'der Baum')[0].pkgId, 'custom-de');
  assert.equal(Core.searchWords(books, '계약').length, 20);
  assert.deepEqual(Core.searchWords(books, '  '), []);
});

test('statistics count valid Days and existing known words, unique practice questions and latest test attempts', () => {
  const state = Core.defaultState();
  state.progress = {'book:0':{studied:true}, 'book:1':{best:100}, 'book:t0':{studied:true}, 'book:99':{studied:true}};
  state.known = {'book:w0':true, 'book:removed':true, 'other:w0':true};
  state.wrong = {a:{}, b:{}};
  const books = [{id:'book', name:'Book', words:Array.from({length:21}, (_, i) => ['w' + i, '뜻'])}, {id:'unloaded', name:'미저장'}];
  const exam = {answers:{'p3-001-1':{correct:true, tries:3}, 'p3-001-2':{correct:false}, 'p5-001':{correct:true}}};
  const mock = {attempts:[{test:2, at:10, lc:50, rc:60}, {test:1, at:15, lc:80, rc:90}, {test:2, at:20, lc:40, rc:30}]};
  const stats = Core.learningStats(state, books, exam, mock);
  assert.deepEqual(stats.books[0], {id:'book', name:'Book', studiedDays:1, totalDays:2, known:1});
  assert.equal(stats.books[1].known, null);
  assert.equal(stats.wrong, 2);
  assert.deepEqual(stats.parts[2], {part:3, solved:2, correct:1, accuracy:50});
  assert.equal(stats.parts[0].accuracy, null);
  assert.deepEqual(stats.scores.map(s => s.test), [1, 2]);
  assert.equal(stats.scores[1].lc, Core.mockScore(40));
  assert.equal(stats.scores[1].total, Core.mockScore(40) + Core.mockScore(30));
  assert.deepEqual(Core.learningStats(Core.defaultState(), [], {}, {}).scores, []);
});

test('dictation uses the spoken first spelling and existing cloze keyboard rules', () => {
  assert.equal(Core.dictationAnswer(['ihr / Ihr', '그들의']), 'ihr');
  assert.equal(Core.spokenText('Deutsch / deutsch'), 'Deutsch');
  assert.equal(Core.spokenText('entweder ... oder'), 'entweder ... oder');
  assert.ok(Core.clozeCorrect('GROESSE', Core.dictationAnswer(['Größe', '크기']), true));
  assert.ok(Core.clozeCorrect('  ACQUIRE  ', 'acquire', false));
  assert.ok(!Core.clozeCorrect('gross', 'Größe', true));
});

test('offline discovery reads cached books and never fetches uncached books', async () => {
  let network = 0;
  const context = {navigator:{onLine:false}, window:{caches:true, addEventListener(){}}, location:{href:'https://example.test/', hash:'#/home'}, URL,
    builtins:[{id:'cached', file:'cached.json'}, {id:'absent', file:'absent.json'}], Core,
    packageReady:pkg => Array.isArray(pkg.words), validPackage:pkg => pkg.id === 'cached',
    loadPackages(){ network++; }, caches:{async match(url){ return url.endsWith('/cached.json') ? {ok:true, json:async () => ({id:'cached', words:[['hello','안녕']]})} : undefined; }},
    main:{addEventListener(){}}, render(){}
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../js/search.js'), 'utf8'), context);
  await vm.runInContext('discoverWordbooks()', context);
  assert.equal(network, 0);
  assert.equal(context.builtins[0].words[0][0], 'hello');
  assert.equal(context.builtins[1].words, undefined);
});

test('speak selects a German voice and missing-German warning is shown only once', () => {
  const spoken = [], notices = [];
  const voices = [{lang:'en-US'}, {lang:'de-DE'}];
  const context = {window:{speechSynthesis:{cancel(){}, getVoices:() => voices, speak:u => spoken.push(u)}, SpeechSynthesisUtterance:function(text){this.text=text;}},
    document:{querySelector(){return {};}}, SpeechSynthesisUtterance:function(text){this.text=text;}, Core, setTimeout(){}, clearTimeout(){}};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../js/shared.js'), 'utf8') + '\nCore = window.Core; toast = msg => notices.push(msg);', Object.assign(context, {notices}));
  // shared.js binds its own Core variable, as init() does in the app.
  context.window.Core = Core;
  vm.runInContext('Core = window.Core; speak("Deutsch / deutsch", "de-DE");', context);
  assert.equal(spoken[0].text, 'Deutsch');
  assert.equal(spoken[0].voice.lang, 'de-DE');
  voices.splice(1);
  vm.runInContext('speak("Hallo", "de-DE"); speak("Haus", "de-DE");', context);
  assert.equal(notices.length, 1);
});

function screenHarness() {
  const handlers = {};
  const element = {innerHTML:'', textContent:'', addEventListener(type, fn){ (handlers[type] ||= []).push(fn); }, setAttribute(){},
    querySelector(){return element;}, querySelectorAll(){return [];}, focus(){}};
  const saved = new Map();
  const memory = {getItem:k => saved.get(k) ?? null, setItem:(k,v) => saved.set(k, v), removeItem:k => saved.delete(k)};
  const context = {window:{Core, addEventListener(){}, speechSynthesis:{cancel(){}, getVoices:() => [{lang:'de-DE'}], speak(){}}, SpeechSynthesisUtterance:function(){}},
    document:{querySelector:() => element, querySelectorAll:() => [], documentElement:{dataset:{}}, addEventListener(){}}, location:{hash:'#/home'},
    navigator:{onLine:true}, history:{}, setTimeout(){}, clearTimeout(){}, URL};
  vm.createContext(context);
  const scripts = fs.readFileSync(require.resolve('../index.html'), 'utf8').matchAll(/<script src="\.\/([^\"]+)"/g);
  for (const [, file] of scripts) {
    if (file === 'core.js' || file === 'js/install.js') continue;
    let source = fs.readFileSync(require.resolve('../' + file), 'utf8');
    if (file === 'app.js') source = source.replace('  init();', `globalThis.screens = {
      setup() {Core=window.Core; state=Core.defaultState(); state.settings={}; storage=globalThis.memory; preferenceStorage=storage;
        builtins=[{id:'de', name:'독일어', lang:'de-DE', words:[['Größe','크기']]}]; ready=true; discoveryFinished=true;},
      route(hash) {location.hash=hash; render(); return main.innerHTML;},
      input(text) {session.input=text;}, getState() {return state;},
      mock() {mockState={attempts:[{test:1,at:1,lc:80,rc:70}],progress:{}};},
      search(text) {searchQuery=text; return searchResultsHTML();}
    };`);
    vm.runInContext(source, context, {filename:file});
  }
  context.memory = memory;
  context.screens.setup();
  return {ui:context.screens, element, saved, submit(){for(const fn of handlers.submit) fn({target:{id:'dictation-form'}, preventDefault(){}});},
    click(action){for(const fn of handlers.click) fn({target:{closest:() => ({dataset:{action}, disabled:false})}});}};
}

test('real routes render search, empty statistics and a populated SVG trend', () => {
  const {ui} = screenHarness();
  assert.match(ui.route('#/home'), /전체 검색[\s\S]*학습 통계/);
  assert.match(ui.route('#/search'), /id="word-search"/);
  assert.match(ui.search('grosse'), /#\/day\/de\/0/);
  assert.match(ui.route('#/stats'), /아직 모의고사 기록이 없어요/);
  ui.mock();
  const html = ui.route('#/stats');
  assert.match(html, /<svg class="stats-chart"/);
  assert.match(html, /<polyline/);
  assert.match(html, /<table class="stats-table"/);
});

test('dictation hides answers until graded, persists one miss, supports retry and keeps quiz best unchanged', () => {
  const h = screenHarness();
  assert.match(h.ui.route('#/day/de/0'), /data-action="start-dictation"/);
  assert.doesNotMatch(h.ui.route('#/dictation/de/0'), /Größe|크기/);
  h.ui.input('wrong'); h.submit(); h.submit();
  assert.equal(h.ui.getState().wrong['de:Größe'].miss, 1);
  assert.match(h.element.innerHTML, /Größe[\s\S]*크기/);
  assert.ok(h.saved.get('vocab-master-v1').includes('Größe'));
  assert.deepEqual(Object.keys(h.ui.getState().progress), []);
  h.click('dictation-next');
  assert.match(h.element.innerHTML, /받아쓰기 결과/);
  h.click('dictation-retry');
  h.ui.input('GROESSE'); h.submit();
  assert.equal(h.ui.getState().wrong['de:Größe'].streak, 1);
  assert.match(h.element.innerHTML, /정답이에요/);
});
