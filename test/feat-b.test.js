'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const Core = require('../core.js');
let passed = 0;
const test = (name, run) => { run(); passed++; console.log('ok', name); };
const voice = (name, lang = 'en-US') => ({name, lang});

test('breakdown counts unanswered items, scopes shared types by part, sorts weakest first', () => {
  const items = [null, {no:1, part:3, q:{type:'detail', answer:0}}, {no:2, part:3, q:{type:'detail', answer:1}},
    {no:3, part:7, q:{type:'detail', answer:2}}, {no:4, part:1, q:{photoType:'single', answer:0}}];
  const stats = Core.examBreakdown(items, {1:0, 3:2});
  assert.deepEqual(stats.types.map(r => [r.part, r.type, r.right, r.total]), [[1,'single',0,1],[3,'detail',1,2],[7,'detail',1,1]]);
  assert.deepEqual(Core.examBreakdown([], {}).types, []);
});
test('cumulative weakness includes every retake and excludes unavailable banks explicitly', () => {
  const banks = {1:[{no:1, part:2, q:{type:'wh', answer:0}}], 2:[{no:1, part:2, q:{type:'wh', answer:1}}]};
  const result = Core.mockWeakness([{test:1, answers:{1:0}}, {test:1, answers:{}}, {test:2, answers:{1:1}}, {test:3, answers:{}}], banks);
  assert.equal(result.included, 3);
  assert.deepEqual(result.types, [{part:2,type:'wh',right:2,total:3,accuracy:67}]);
});
test('gender-labelled voices match the speakers and use natural pitch', () => {
  const m = voice('Microsoft David'), w = voice('Microsoft Zira');
  const cast = Core.examVoiceCast([m,w], ['W','M']);
  assert.equal(cast.W.voice,w); assert.equal(cast.M.voice,m);
  assert.equal(cast.W.pitch,1); assert.equal(cast.M.pitch,1);
});
test('unlabelled Android voices are distinct before reuse and have stronger pitch contrast', () => {
  const voices = [voice('English United States'),voice('English United Kingdom','en-GB'),voice('English Australia','en-AU')];
  const cast = Core.examVoiceCast(voices, ['M','W','M2']);
  assert.equal(new Set(Object.values(cast).map(c => c.voice)).size,3);
  assert.ok(cast.W.pitch - cast.M.pitch > .5);
});
test('one voice and same-gender-only voices still distinguish all speaker codes', () => {
  for (const voices of [[voice('English United States')], [voice('Microsoft Zira'),voice('Samantha')]]) {
    const cast = Core.examVoiceCast(voices, ['M','W','M2','W2']);
    assert.ok(cast.M.pitch < cast.W.pitch);
    assert.equal(new Set(Object.values(cast).map(c => c.pitch)).size,4);
  }
  assert.equal(Core.examVoiceCast([], ['M']).M.voice, undefined);
});
test('sentence splitting handles multiple sentences without removing punctuation', () => {
  assert.deepEqual(Core.lcSentences('Please wait here. Then call me!'), ['Please wait here.','Then call me!']);
});

const context = vm.createContext({Core, console, setTimeout, clearTimeout, supportsSpeech:true,
  location:{hash:'#/exam/3/set'}, document:{hidden:false, querySelectorAll:() => [], querySelector:() => null},
  render:() => {}, stopMockAudio:() => {}, haltListening:() => {}, cancelSpeech:() => {},
  escape:s => String(s).replaceAll('<','&lt;'), icon:() => '', back:() => '', intro:() => '', meter:() => '',
  quizAnnouncement:{textContent:''}, storage:{getItem:() => null,setItem:() => {}}, toast:() => {},
  SpeechSynthesisUtterance:function(text) { this.text = text; }, window:{speechSynthesis:{speak:u => { context.spoken = u; }}}});
vm.runInContext(fs.readFileSync(require.resolve('../js/exam.js'),'utf8'),context);
const run = code => vm.runInContext(code,context);

test('Part 2 alternates question gender and gives responses the other gender', () => {
  context.voices = [voice('Microsoft David'),voice('Microsoft Zira')];
  const pair = run("[examAudioQueue(2, {q:'Question?', choices:['A','B','C']}, voices, 1), examAudioQueue(2, {q:'Question?', choices:['A','B','C']}, voices, 2)]");
  assert.equal(pair[0][0].voice.name,'Microsoft Zira'); assert.equal(pair[0][1].voice.name,'Microsoft David');
  assert.equal(pair[1][0].voice.name,'Microsoft David'); assert.equal(pair[1][1].voice.name,'Microsoft Zira');
});
test('targeted set practice grades only selected types and preserves original question IDs', () => {
  context.sample = {id:'p3-001', difficulty:2, questions:[{type:'topic',answer:0},{type:'detail',answer:1},{type:'detail',answer:2}]};
  run("examBanks[3].questions = [sample]; examBanks[3].status = 'ready'; examTypeFilter[3] = 'detail'; makeExamSession(3,'set'); examSession.picks = [null,1,2]; gradeExamSet();");
  assert.deepEqual(JSON.parse(run('JSON.stringify(Object.keys(examState.answers))')),['p3-001-2','p3-001-3']);
  assert.equal(run('examSession.results.length'),2);
  assert.equal(run('examSession.answered'),true);
  assert.equal(run('examTargets(sample).length'),2);
});
test('ungraded scripts have no sentence replay controls', () => {
  context.entry = {q:'Wait here.',ko:{q:'기다리세요.',choices:['가','나','다']},choices:['One.','Two.','Three.'],answer:0};
  assert.ok(!run('renderExamScript(entry, false)').includes('lc-review-line'));
  assert.ok(run("renderExamScript(entry, true, {part:2,entry:'p2-001'})").includes('lc-review-line'));
});
test('test audio stays at normal speed while review rate is passed explicitly', () => {
  run("lcReviewRate = .8; speakQueue([{text:'Normal'}], {active:()=>true,timer:()=>0,onItem:()=>{},done:()=>{},fail:()=>{}})");
  assert.equal(context.spoken.rate,1);
  run("speakQueue([{text:'Review',rate:.8}], {active:()=>true,timer:()=>0,onItem:()=>{},done:()=>{},fail:()=>{}})");
  assert.equal(context.spoken.rate,.8);
});
test('sentence review speaks only the clicked sentence and stops without continuing', () => {
  context.button = {dataset:{part:'3',entry:'p3-001',test:'',line:'0',sentence:'1'},setAttribute:() => {},removeAttribute:() => {}};
  run("whenVoices = begin => { begin(voices); return () => {}; }; examSession.questions[0].script = [{s:'M',t:'First sentence. Second sentence.'}]; playLcReview(button);");
  assert.equal(context.spoken.text,'Second sentence.');
  assert.equal(context.spoken.rate,.8);
  run('stopLcReview()');
  assert.equal(run('lcReviewPlaying'),false);
  run('examSession.answered = false');
  context.spoken = null;
  run('playLcReview(button)');
  assert.equal(context.spoken,null);
});
test('Part 6 targeted practice keeps all passage blanks but shows and grades only that type', () => {
  context.reading = {id:'p6-001',difficulty:2,passageType:'email',heading:[],headingKo:[],paragraphs:['Please {1}. We {2}. {3} Finally {4}.'],paragraphsKo:['{1} {2} {3} {4}'],questions:[
    {blank:1,type:'vocab',answer:0,choices:['wait','stay','go','read'],ko:{choices:['1','2','3','4']},explain:'근거'},
    {blank:2,type:'tense',answer:0,choices:['wait','stay','go','read'],ko:{choices:['1','2','3','4']},explain:'근거'},
    {blank:3,type:'sentence',answer:1,choices:['Wait.','Stay.','Go.','Read.'],ko:{choices:['1','2','3','4']},explain:'근거'},
    {blank:4,type:'connector',answer:0,choices:['wait','stay','go','read'],ko:{choices:['1','2','3','4']},explain:'근거'}]};
  run("location.hash = '#/exam/6/set'; examBanks[6].questions = [reading]; examTypeFilter[6] = 'sentence'; makeExamSession(6,'set');");
  assert.equal(run('examSession.active'),2);
  const html = run('renderReadingSet()');
  assert.equal((html.match(/class="exam-set-question"/g) || []).length,1);
  assert.ok(html.includes('(4)'));
  run('examSession.picks[2] = 1; gradeExamSet()');
  assert.deepEqual(JSON.parse(run('JSON.stringify(Object.keys(examState.answers))')), ['p6-001-3']);
});

vm.runInContext(fs.readFileSync(require.resolve('../js/mock.js'),'utf8'),context);
context.fixture = JSON.parse(fs.readFileSync(require.resolve('./fixtures/mock-1.json'),'utf8'));
test('mock results render sorted type practice links and review scripts for correct LC items too', () => {
  run("Object.assign(mockBanks[1], mockUnits(fixture), {status:'ready'}); mockState.attempts = [{test:1,at:1,lc:100,rc:100,answers:Object.fromEntries(mockBanks[1].items.filter(Boolean).map(i=>[i.no,i.q.answer]))}];");
  const result = run('renderMockResult(1)');
  assert.ok(result.includes('유형별 정답률'));
  assert.ok(result.includes('data-action="exam-type-start"'));
  assert.ok(result.includes('data-action="lc-review-line"'));
  assert.ok(run('renderMockWeakness()').includes('모든 유형을 맞혔어요'));
});
console.log(passed + ' feature B checks passed');
