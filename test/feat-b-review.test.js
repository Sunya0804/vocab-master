'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const Core = require('../core.js');
const read = file => fs.readFileSync(require.resolve('../' + file), 'utf8');
const fixture = JSON.parse(read('test/fixtures/mock-1.json'));

// Exercise the classic scripts together, with only browser APIs and startup I/O replaced.
function application() {
  const documentEvents = {}, windowEvents = {}, mainEvents = {}, timers = new Map(), voiceEvents = new Set();
  const effects = {spoken:[], cancelled:0, focused:false, voices:[{name:'David',lang:'en-US'}, {name:'Zira',lang:'en-US'}]};
  const saved = new Map();
  let nextTimer = 0;
  const typeSelect = {focus:() => { effects.focused = true; }};
  const main = {addEventListener:(name, fn) => { mainEvents[name] = fn; }, focus:() => {},
    querySelector:selector => selector.startsWith('[data-exam-type=') ? typeSelect : null};
  const context = vm.createContext({Core, console, noteActivity(){}, URL, effects, fixture, main, ready:false, session:null, selectedPackage:'',
    quizTimer:null, history:{}, homePositions:new Map(), restoringHome:false,
    location:{hash:'#/exam'}, supportsSpeech:true, quizAnnouncement:{textContent:''},
    document:{hidden:false, querySelector:() => null, querySelectorAll:() => [],
      addEventListener:(name, fn) => { (documentEvents[name] ||= []).push(fn); }},
    window:{scrollTo:() => {}, addEventListener:(name, fn) => { (windowEvents[name] ||= []).push(fn); },
      speechSynthesis:{speak:utterance => effects.spoken.push(utterance), cancel:() => { effects.cancelled++; },
        addEventListener:(_, fn) => voiceEvents.add(fn), removeEventListener:(_, fn) => voiceEvents.delete(fn)}},
    SpeechSynthesisUtterance:function(text) { this.text = text; },
    listenVoices:() => effects.voices, cancelSpeech:() => { effects.cancelled++; },
    setTimeout:fn => { timers.set(++nextTimer, fn); return nextTimer; },
    clearTimeout:id => timers.delete(id), clearInterval:id => timers.delete(id),
    storage:{getItem:key => saved.get(key) ?? null, setItem:(key,value) => saved.set(key,value)},
    escape:s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
    icon:() => '', intro:() => '', back:() => '', meter:() => '', toast:() => {}, autoSpeak:() => {}, requestAnimationFrame:fn => fn()});
  for (const file of ['js/exam.js','js/mock.js','js/listen.js']) vm.runInContext(read(file), context);
  vm.runInContext(read('app.js').replace(/\binit\(\);\s*$/, ''), context);
  const run = code => vm.runInContext(code, context);
  run('render = () => {};');
  return {context, run, effects, timers, voiceEvents,
    change:target => mainEvents.change({target}),
    documentEvent:name => documentEvents[name].forEach(fn => fn({})),
    windowEvent:(name,event = {}) => windowEvents[name].forEach(fn => fn(event))};
}

const tests = [];
const test = (name, run) => tests.push({name, run});

test('photo-type practice retains its type name and correct count on the result screen', () => {
  const a = application();
  a.context.photo = JSON.parse(read('questions/toeic-part1.json')).questions[0];
  a.run("location.hash = '#/exam/1/set'; examBanks[1].questions = [photo]; examBanks[1].status = 'ready'; examTypeFilter[1] = photo.photoType; makeExamSession(1,'set'); answerExam(examSession.questions[0].answer);");
  assert.ok(a.run("renderExamPage(1, 'set')").includes('해설 · 1인 사진'));
  a.run('nextExam()');
  const html = a.run('renderExamResult()');
  assert.ok(html.includes('<dt>1인 사진</dt>'));
  assert.ok(html.includes('<dd>1 / 1</dd>'));
  assert.equal(a.run('examSession.results[0].type'), 'single');
});

test('Part 6 type practice supplies other blanks as context without revealing the target', () => {
  const a = application();
  a.context.reading = JSON.parse(read('questions/toeic-part6.json')).sets[0];
  a.run("location.hash = '#/exam/6/set'; examBanks[6].questions = [reading]; examTypeFilter[6] = 'sentence'; makeExamSession(6,'set');");
  const html = a.run('renderReadingSet()');
  assert.equal((html.match(/class="reading-blank is-filled"/g) || []).length, 3);
  assert.equal((html.match(/aria-hidden="true"> -------/g) || []).length, 1);
  assert.ok(html.includes('(1) had confirmed'));
  assert.ok(html.includes('(2) available'));
  assert.ok(html.includes('(4) interview'));
  assert.equal(a.run('examSession.active'), 2);
  // Ordinary mock/exam passages still start with all four blanks unanswered.
  const mock = a.run('readingPassage(reading, 6, false, -1, 131).passage');
  assert.equal((mock.match(/aria-hidden="true"> -------/g) || []).length, 4);
});

test('changing a type filter preserves keyboard focus after the screen is replaced', async () => {
  const a = application();
  await a.change({matches:selector => selector === '[data-exam-type]', dataset:{examType:'3'}, value:'detail'});
  assert.equal(a.run('examTypeFilter[3]'), 'detail');
  assert.equal(a.effects.focused, true);
});

function mockReview(a, part) {
  a.context.part = part;
  a.run("Object.assign(mockBanks[1], mockUnits(fixture), {status:'ready'}); mockState.attempts = [{test:1,at:1,lc:100,rc:100,answers:{}}]; location.hash = '#/exam/mock/1/result';");
  const entry = fixture.parts[part][0];
  a.context.button = {dataset:{part:String(part), entry:entry.id, test:'1', line:'0', sentence:'0'},
    setAttribute:() => {}, removeAttribute:() => {}};
  a.run('playLcReview(button)');
  return a.effects.spoken.at(-1);
}

for (const part of [1, 2, 3, 4]) test(`Part ${part} mock review plays one sentence and pagehide cancels stale callbacks`, () => {
  const a = application(), utterance = mockReview(a, part), entry = fixture.parts[part][0];
  const text = part === 1 ? entry.choices[0] : part === 2 ? entry.q : entry.script[0].t;
  assert.equal(utterance.text, Core.lcSentences(text)[0]);
  const end = utterance.onend, cancelled = a.effects.cancelled;
  a.windowEvent('pagehide');
  assert.ok(a.effects.cancelled > cancelled);
  assert.equal(a.run('lcReviewPlaying'), false);
  assert.equal(a.timers.size, 0);
  end();
  assert.equal(a.effects.spoken.length, 1);
  assert.equal(a.timers.size, 0);
});

test('leaving the result route cancels review audio and its timers', () => {
  const a = application();
  mockReview(a, 3);
  const cancelled = a.effects.cancelled;
  a.run("location.hash = '#/home'");
  a.windowEvent('hashchange', {newURL:'https://example.test/#/home'});
  assert.ok(a.effects.cancelled > cancelled);
  assert.equal(a.run('lcReviewPlaying'), false);
  assert.equal(a.timers.size, 0);
});

test('hiding the page while voices load removes the wait and voiceschanged listener', () => {
  const a = application();
  a.effects.voices = [];
  mockReview(a, 2);
  assert.equal(a.effects.spoken.length, 0);
  assert.equal(a.voiceEvents.size, 1);
  a.run('document.hidden = true');
  a.documentEvent('visibilitychange');
  assert.equal(a.timers.size, 0);
  assert.equal(a.voiceEvents.size, 0);
  assert.equal(a.run('lcReviewPlaying'), false);
});

test('review speeds stay out of the actual mock audio queue', () => {
  const a = application();
  for (const rate of [.8, 1, 1.2]) {
    a.context.rate = rate;
    a.run('setLcReviewRate(rate)');
    assert.equal(mockReview(a, 2).rate, rate);
    a.run("stopLcReview(); speakQueue(examAudioQueue(2, fixture.parts[2][0], effects.voices, 7), {active:()=>true, timer:setTimeout, onItem:()=>{}, done:()=>{}, fail:()=>{}})");
    assert.equal(a.effects.spoken.at(-1).rate, 1);
  }
});

test('targeted LC plays only its questions and its completion prompt matches the filter', () => {
  const a = application();
  a.context.entry = {id:'p3-001',difficulty:2,talkType:'conversation',script:[{s:'M',t:'Our package arrived.'}],
    questions:[{type:'topic',q:'What arrived?'},{type:'detail',q:'When did it arrive?'},{type:'next',q:'What happens next?'}]};
  a.run("location.hash = '#/exam/3/set'; examBanks[3].questions = [entry]; examTypeFilter[3] = 'detail'; makeExamSession(3,'set'); playExamAudio();");
  for (let count = 0; count < 5 && a.run('examSession.audioPlaying'); count++) {
    a.effects.spoken.at(-1).onend();
    const [id, callback] = a.timers.entries().next().value;
    a.timers.delete(id);
    callback();
  }
  assert.deepEqual(a.effects.spoken.map(u => u.text), ['Our package arrived.', 'Question 2. When did it arrive?']);
  assert.equal(a.run('examSession.audioStatus'), '재생 완료 · 연습 중인 문항의 답을 고르세요');
  assert.equal(a.timers.size, 0);
});

(async () => {
  let failed = 0;
  for (const {name, run} of tests) try { await run(); console.log('ok', name); }
  catch (error) { failed++; console.error('FAIL', name, error.message); }
  console.log(`${tests.length - failed} passed, ${failed} failed (feature B review)`);
  if (failed) process.exitCode = 1;
})();
