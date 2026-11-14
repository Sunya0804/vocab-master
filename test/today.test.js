'use strict';
// Renders the review / today / starred screens through the real UI scripts (same VM harness idea as german.test.js).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Core = require('../core.js');
const root = path.resolve(__dirname, '..');
let passed = 0;
function test(name, run) { run(); passed++; console.log('ok - ' + name); }

const words = Array.from({length:45}, (_, i) => [`word${i}`, `뜻${i}`, '명', `This is word${i}.`, `이것은 단어${i}이다.`]);
const pkg = {id:'demo', name:'데모 단어장', words};

function harness(hash = '#/home') {
  const element = {addEventListener(){},setAttribute(){},querySelector(){return element;},querySelectorAll(){return [];},focus(){},classList:{toggle(){}},textContent:'',hidden:false};
  const location = {hash, protocol:'http:'};
  const window = {addEventListener(){}};
  const context = {window, document:{hidden:false,querySelector:() => element,querySelectorAll:() => [],addEventListener(){},getElementById:() => element,documentElement:{dataset:{}}},
    location, history:{}, navigator:{onLine:true}, setTimeout(){return 0;}, clearTimeout(){}, console, CSS:{escape:value => value}};
  const source = ['js/shared.js','js/study.js','js/listen.js','js/exam.js','js/settings.js','js/search.js','js/stats.js','js/dictation.js','app.js'].map(file => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
  vm.runInNewContext(source.replace('  init();', `globalThis.ui = {
    setup(pkgs, core, st) {builtins=pkgs;Core=core;state=st;selectedPackage=pkgs[0].id;ready=true;storage={getItem(){return null;},setItem(){},removeItem(){}};preferenceStorage=storage;},
    renderHome, renderStarred, renderSettings, render, main, get session() {return session;}
  };`), context);
  return context;
}

test('home shows today card: due reviews, next Day, goal and 7-day streak', () => {
  const today = Core.localDay(), state = Core.defaultState();
  state.progress['demo:0'] = {studied:true};
  state.review['demo:word0'] = {pkg:'demo', en:'word0', step:0, due:today};
  state.review['demo:word1'] = {pkg:'demo', en:'word1', step:1, due:Core.addDays(today, -2)};
  state.review['demo:word2'] = {pkg:'demo', en:'word2', step:0, due:Core.addDays(today, 3)};
  state.review['gone:x'] = {pkg:'gone', en:'x', step:0, due:today};
  state.activity[Core.addDays(today, -1)] = {learned:5, reviewed:0, exam:0};
  state.activity[today] = {learned:3, reviewed:1, exam:0};
  const {ui} = harness(); ui.setup([pkg], Core, state);
  const html = ui.renderHome();
  assert.match(html, /오늘 할 것/);
  assert.match(html, /복습 2개/, 'deleted wordbooks and future reviews are not counted');
  assert.match(html, /href="#\/review"/);
  assert.match(html, /Day 02 이어서 학습/);
  assert.match(html, /연속 2일 학습/);
  assert.match(html, /새 단어 3\/20 · 복습 1\/3/);
  assert.equal((html.match(/<li class="is-active"/g) || []).length, 2);
  assert.match(html, /내 단어장/);
});

test('review route builds a card session of at most 50 due words with review labels', () => {
  const today = Core.localDay(), state = Core.defaultState();
  const big = {...pkg, words:[...words, ...Array.from({length:10}, (_, i) => [`extra${i}`, `추가${i}`])]};
  big.words.forEach(word => { state.review[`demo:${word[0]}`] = {pkg:'demo', en:word[0], step:0, due:today}; });
  state.review['demo:missing'] = {pkg:'demo', en:'missing', step:0, due:Core.addDays(today, -9)};
  const ctx = harness('#/review'); ctx.ui.setup([big], Core, state);
  ctx.ui.render();
  const session = ctx.ui.session;
  assert.equal(session.type, 'cards');
  assert.equal(session.review, true);
  assert.equal(session.items.length, 50);
  assert.ok(session.items.every(item => item.word), 'a missing headword is skipped');
  ctx.ui.render();
  assert.match(ctx.ui.main.innerHTML, /기억나요/);
  assert.match(ctx.ui.main.innerHTML, /헷갈려요/);
});

test('starred page lists starred words with their wordbook and an empty state otherwise', () => {
  const state = Core.defaultState();
  const {ui} = harness('#/starred'); ui.setup([pkg], Core, state);
  assert.match(ui.renderStarred(), /아직 별표한 단어가 없어요/);
  Core.toggleStar(state, 'demo', words[3]);
  const html = ui.renderStarred();
  assert.match(html, /word3/);
  assert.match(html, /데모 단어장/);
  assert.match(html, /data-action="star"[^>]*aria-pressed="true"/);
  assert.match(html, /data-action="starred-cards"/);
});

test('settings offers the daily goal with the current value selected', () => {
  const state = Core.defaultState(); state.daily.goal = 35; state.settings = {autoSpeak:false};
  const {ui} = harness('#/settings'); ui.setup([pkg], Core, state);
  const html = ui.renderSettings();
  assert.match(html, /id="daily-goal"/);
  assert.match(html, /<option value="35" selected>35단어<\/option>/);
});

console.log(`${passed} today/review/starred UI checks passed.`);
