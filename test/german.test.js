'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const Core = require('../core.js');
const root = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const manifest = read('docs/german-sources.json');
const packages = ['a1','a2','b1'].map(level => read(`packages/german-${level}.json`));
const all = packages[2], index = read('packages/index.json');
let passed = 0;
function test(name, run) { run(); passed++; console.log('ok - ' + name); }

test('registered cumulative German packages preserve complete five-field rows', () => {
  packages.forEach((pkg, i) => {
    assert.equal(pkg.lang, 'de-DE');
    assert.equal(pkg.words.length, [820,1579,3620][i]);
    assert.equal(Core.chunkDays(pkg.words).length, [41,79,181][i]);
    assert.ok(index.includes(pkg.id + '.json'));
    assert.equal(new Set(pkg.words.map(w => Core.wordId(pkg.id, w[0]))).size, pkg.words.length);
    pkg.words.forEach(w => {
      assert.equal(w.length, 5, w[0]);
      assert.ok(w.every(cell => typeof cell === 'string' && cell.trim()), w[0]);
      assert.match(w[1], /[가-힣]/); assert.match(w[4], /[가-힣]/);
      assert.match(w[2], /^[명동형부전접대감관수](?:\/[명동형부전접대감관수])*$/);
      assert.ok(w[3].split(/\s+/).length <= 15, w[0]);
      assert.doesNotMatch(w.join(''), /[\u00ad\ufffd]|VS_\d|WORTLISTE|hat\/ist|Museumeen|Praktikuma|irgendirgendein|überübertreiben/);
      assert.ok(pkg.wordInfo[w[0]], w[0]);
    });
    if (i) assert.deepEqual(pkg.words.slice(0, packages[i-1].words.length), packages[i-1].words);
    const descriptor = manifest.packages[i];
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'packages', descriptor.file))).digest('hex'), descriptor.sha256);
  });
  for (const file of ['toeic.json','suneung.json','teps.json']) assert.ok(index.includes(file));
});

test('every extracted group and thematic reference maps to delivered words or an explicit exclusion', () => {
  assert.equal(manifest.words.length, all.words.length);
  const exclusions = [];
  for (const source of manifest.sources) {
    assert.match(source.sha256, /^[0-9a-f]{64}$/);
    const rows = manifest.alphabeticalReview[source.cefr];
    assert.equal(rows.length, source.extractedGroups);
    rows.forEach(row => {
      if (row.excluded) { assert.equal(row.wordIndices.length,0); exclusions.push(row); }
      else assert.ok(row.wordIndices.length, row.heading);
      row.wordIndices.forEach(i => {
        assert.ok(all.words[i]);
        assert.ok(manifest.words[i].sources.some(s => s.level === source.cefr && s.row === row.row && s.page === row.page));
      });
    });
  }
  assert.equal(exclusions.length,1);
  assert.equal(exclusions[0].heading,'e');
  assert.equal(manifest.wordGroupReview.length,866);
  manifest.wordGroupReview.forEach(row => {
    assert.ok(row.wordIndices.length);
    row.wordIndices.forEach(i => assert.ok(all.words[i]));
  });
  manifest.words.forEach((record,i) => {
    assert.equal(record.headword,all.words[i][0]);
    assert.ok(record.sources.length);
    record.sources.forEach(s => {
      if (s.section === 'editorial-core') assert.ok(manifest.editorialCore.includes(record.headword));
      else assert.ok(s.page > 0 && s.page <= manifest.sources.find(src => src.cefr === s.level).pages);
    });
  });
});

test('critical noun morphology, casing and current spellings survive normalization', () => {
  const info = all.wordInfo, heads = new Set(all.words.map(w => w[0]));
  for (const [head,plural] of Object.entries({'die Bank':['Banken','Bänke'],'das Museum':['Museen'],'das Praktikum':['Praktika'],'das Datum':['Daten'],'das Zentrum':['Zentren'],'die Pizza':['Pizzas','Pizzen'],'die Kursleiterin':['Kursleiterinnen']})) {
    assert.deepEqual(info[head].plural,plural,head);
  }
  assert.equal(info['der Grad'].article,'der');
  assert.ok(info['die Früchte'].pluralOnly);
  for (const head of ['sie / Sie','ihr / Ihr','ihnen / Ihnen','Deutsch / deutsch','irgend-','irgendein','über-','übertreiben','leidtun','der Ketchup','das Ketchup']) assert.ok(heads.has(head),head);
  for (const head of ['das Grad','der Hinweise','die Kursleiter','der Ketschup','das Ketschup','leid tun','trifft','e']) assert.ok(!heads.has(head),head);
  assert.equal(all.words.find(w => w[0] === 'der Service')[3].includes('Servicen'),false);
});

test('both quiz directions and wrong-note persistence preserve German metadata', () => {
  const words = all.words.filter(w => ['die Bank','das Museum','der Schlüssel','lesen'].includes(w[0]));
  for (const mode of ['en2ko','ko2en']) {
    const questions = Core.buildQuiz(words,mode,all.words,() => .4);
    assert.equal(questions.length,words.length);
    questions.forEach(q => {
      assert.equal(q.word.length,5);
      assert.ok(q.choices.includes(q.answer));
      assert.equal(q.prompt,q.word[mode === 'en2ko' ? 0 : 1]);
      if (mode === 'ko2en') assert.doesNotMatch(q.prompt,/Banken|Bänke|Museen|Schlüssel/);
    });
  }
  const state = Core.defaultState();
  Core.recordAnswer(state, all.id, words[0],false);
  const entry = state.wrong[Core.wordId(all.id,words[0][0])];
  assert.deepEqual([entry.en,entry.ko,entry.pos,entry.ex,entry.exKo],words[0]);
});

// Exercise the real UI closure with inert browser surfaces. No test hook is
// shipped to the app; replace only its final startup call in this VM copy.
function uiHarness() {
  const spoken = [], timers = [];
  const element = {addEventListener(){},setAttribute(){},querySelector(){return element;},querySelectorAll(){return [];},focus(){},classList:{toggle(){}}};
  const location = {hash:'#/listen/german-a1/0',protocol:'http:'};
  const speech = {cancel(){},getVoices:() => [{lang:'de-DE'},{lang:'ko-KR'},{lang:'en-US'}],speak(u){spoken.push(u);}};
  const window = {speechSynthesis:speech,SpeechSynthesisUtterance:function(text){this.text=text;},addEventListener(){}};
  const context = {window,document:{hidden:false,querySelector:() => element,querySelectorAll:() => [],addEventListener(){},getElementById:() => element},
    location,history:{},navigator:{},SpeechSynthesisUtterance:window.SpeechSynthesisUtterance,
    setTimeout(fn){timers.push(fn);return timers.length;},clearTimeout(){},console};
  // The app runs as classic scripts sharing one global scope; concatenating them in index.html order is equivalent.
  const source = ['js/shared.js','js/study.js','js/listen.js','js/exam.js','js/settings.js','app.js'].map(file => fs.readFileSync(path.join(root,file),'utf8')).join('\n');
  assert.equal((source.match(/  init\(\);/g)||[]).length,1);
  vm.runInNewContext(source.replace('  init();', `globalThis.ui = {
    setup(pkgs, core, st) {builtins=pkgs;Core=core;state=st;selectedPackage=pkgs[0].id;},
    wordHTML, wordGrammarHTML, highlightedExample, renderDay, renderCards, renderQuiz, renderWrong, speak, autoSpeak,
    setSession(value){session=value;}, setState(value){state=value;},
    listen(word,pkgId){listening={words:[word],index:0,pkgId,playing:true,route:location.hash};listenSettings={repeats:1,examples:true,rate:1};readListenWord(listenGeneration,listenVoices());},
    renderListen, stop(){haltListening();}
  };`),context);
  context.ui.setup([...packages,{id:'english',name:'영어',words:[['die','죽다','동','Plants die without water.','식물은 물이 없으면 죽는다.']]}],Core,Core.defaultState());
  return {ui:context.ui,spoken,timers};
}

test('German rendering, hidden grammar and English highlighting work in the actual UI functions', () => {
  const {ui} = uiHarness(); const word = all.words.find(w => w[0] === 'die Bank');
  const html = ui.wordHTML(word,true,true,all.id);
  assert.match(html,/lang="de-DE"/); assert.match(html,/data-lang="de-DE"/);
  assert.match(html,/class="word-grammar"[^>]*hidden/); assert.match(html,/Banken/); assert.match(html,/Bänke/);
  assert.match(ui.renderDay(packages[0],0),/퀴즈 독/);
  assert.match(ui.highlightedExample(['die','죽다','동','Plants die without water.'],'english'),/<strong>die<\/strong>/);
  assert.match(ui.highlightedExample(['der Schlüssel','','','Der Schlüssel ist hier.'],all.id),/<strong>Schlüssel<\/strong>/);
  assert.doesNotMatch(ui.wordHTML(['<img>','뜻','명','<script>','해석'],false,true,all.id),/<script>|<img>/);
  const state = Core.defaultState(); Core.recordAnswer(state,all.id,word,false); ui.setState(state);
  assert.match(ui.renderWrong(),/data-lang="de-DE"/);
  ui.setSession({items:[{pkgId:all.id,word}],index:0,revealed:false,returnHash:'#/home',label:'독일어'});
  assert.doesNotMatch(ui.renderCards(),/Banken|Bänke/);
  ui.setSession({items:[{pkgId:all.id,word}],index:0,revealed:true,returnHash:'#/home',label:'독일어'});
  assert.match(ui.renderCards(),/Banken/);
  for (const mode of ['en2ko','ko2en']) {
    const q={...Core.buildQuiz([word],mode,all.words,() => .4)[0],pkgId:all.id};
    ui.setSession({mode,questions:[q],index:0,returnHash:'#/home'});
    const quiz=ui.renderQuiz(); assert.match(quiz,/독일어/); assert.doesNotMatch(quiz,/Banken|Bänke/);
  }
});

test('German listening alternates German and Korean; mixed review keeps the per-word language', () => {
  const {ui,spoken,timers} = uiHarness();
  const word=packages[0].words[0]; ui.listen(word,packages[0].id);
  assert.equal(spoken[0].lang,'de-DE'); assert.equal(spoken[0].voice.lang,'de-DE');
  spoken[0].onend(); timers.at(-1)(); assert.equal(spoken[1].lang,'ko-KR');
  spoken[1].onend(); timers.at(-1)(); assert.equal(spoken[2].lang,'de-DE');
  spoken[2].onend(); timers.at(-1)(); assert.equal(spoken[3].lang,'ko-KR'); ui.stop();
  const state=Core.defaultState();state.settings={autoSpeak:true};ui.setState(state);
  ui.setSession({type:'cards',items:[{pkgId:packages[0].id,word}],index:0});ui.autoSpeak();assert.equal(spoken.at(-1).lang,'de-DE');
  ui.setSession({type:'cards',items:[{pkgId:'english',word:['hello','안녕']}],index:0});ui.autoSpeak();assert.equal(spoken.at(-1).lang,'en-US');
  ui.speak('hello');assert.equal(spoken.at(-1).lang,'en-US');
});
console.log(`${passed} German package and UI checks passed.`);
