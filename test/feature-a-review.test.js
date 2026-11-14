'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const Core = require('../core.js');
const {spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const pkg = {id:'demo', name:'검토용 단어장', words:Array.from({length:60}, (_,i)=>['word'+i,'뜻'+i])};
function memory() {
  const data = new Map();
  return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};
}
function ui(store=memory(), initial=Core.defaultState(), hash='#/home') {
  const handlers = {};
  const element = {addEventListener(k,f){handlers[k]=f;},setAttribute(){},querySelector(){return element;},querySelectorAll(){return [];},focus(){},classList:{toggle(){}},textContent:'',hidden:false};
  const context = {window:{addEventListener(){}},document:{hidden:false,querySelector:()=>element,querySelectorAll:()=>[],addEventListener(){},getElementById:()=>element,documentElement:{dataset:{}}},
    location:{hash,protocol:'http:'},history:{},navigator:{onLine:true},setTimeout(){return 0;},clearTimeout(){},console,confirm:()=>true,CSS:{escape:v=>v}};
  const files=['js/shared.js','js/study.js','js/listen.js','js/exam.js','js/mock.js','js/settings.js','app.js'];
  const code=files.map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n');
  vm.runInNewContext(code.replace('  init();',"globalThis.ui={\nsetup(core,st,io,pkgs) {Core=core;state=st;storage=io;preferenceStorage={getItem:k=>io.getItem(k.replace('vocab-master-v1','vocab-master-preferences-v1')),setItem:(k,v)=>io.setItem(k.replace('vocab-master-v1','vocab-master-preferences-v1'),v)};builtins=pkgs;selectedPackage=pkgs[0].id;ready=true;savedState=JSON.parse(JSON.stringify(st));},\nstar(w) {Core.toggleStar(state,'demo',w);return persist();},\nstudy(w) {Core.scheduleReview(state,'demo',w,true,Core.localDay());return persist();},\nlevel(name) {selectedLevels.demo=name;}, renderHome,renderStarred,render,restoreBackup,\nget state(){return state;},get session(){return session;},get toast(){return document.querySelector('#toast').textContent;}\n};"),context);
  context.ui.setup(Core,initial,store,[pkg]);
  return {api:context.ui,context,handlers};
}
test('today continuation stays in selected level, including completed-level restart',()=>{
  const state=Core.defaultState(),{api}=ui(undefined,state);
  const leveled={...pkg,levels:[{name:'기초',days:1},{name:'심화',days:2}]};
  api.setup(Core,state,memory(),[leveled]);api.level('심화');
  assert.match(api.renderHome(), /Day 02 이어서 학습/);
  assert.match(api.renderHome(), /href="#\/day\/demo\/1"/);
  state.progress['demo:1']={studied:true};state.progress['demo:2']={studied:true};
  assert.match(api.renderHome(), /모든 Day를 마쳤어요/);
  assert.match(api.renderHome(), /href="#\/day\/demo\/1"/);
});
test('local day and calendar intervals handle timezone midnight and daylight-saving transitions',()=>{
  const corePath=path.join(root,'core.js');
  const script='const c=require('+JSON.stringify(corePath)+');console.log(JSON.stringify([c.localDay("2026-05-01T15:00:00Z"),c.addDays("2026-03-08",1),c.addDays("2026-11-01",1)]));';
  for(const [tz,day] of [['Asia/Seoul','2026-05-02'],['America/New_York','2026-05-01'],['Pacific/Honolulu','2026-05-01']]){
    const r=spawnSync(process.execPath,['-e',script],{encoding:'utf8',env:{...process.env,TZ:tz}});
    assert.equal(r.status,0,r.stderr);
    assert.deepEqual(JSON.parse(r.stdout),[day,'2026-03-09','2026-11-02'],tz);
  }
});
test('persist merges edits made in two tabs before a storage event arrives',()=>{
  const store=memory(),a=ui(store),b=ui(store);
  assert.equal(a.api.star('word1'),true);assert.equal(b.api.star('word2'),true);
  assert.deepEqual(Object.keys(Core.loadState(store).stars).sort(),['demo:word1','demo:word2']);
  a.api.study('word1');b.api.study('word2');
  const saved=Core.loadState(store);
  assert.deepEqual(Object.keys(saved.review).sort(),['demo:word1','demo:word2']);
  assert.equal(saved.activity[Core.localDay()].learned,2);
  a.api.star('word1');b.api.study('word3');
  assert.equal(Core.loadState(store).stars['demo:word1'],undefined,'stale tab does not resurrect removed stars');
});
test('invalid new backup data fails before confirmation and does not change storage',async()=>{
  const store=memory(),original=JSON.stringify(Core.defaultState());
  store.setItem('vocab-master-v1',original);
  const {api,context}=ui(store);let confirms=0;context.confirm=()=>{confirms++;return true;};
  const bad={...Core.defaultState(),review:{'demo:word0':{pkg:'demo',en:'word0',step:0,due:'2026-02-30'}}};
  await api.restoreBackup({text:async()=>JSON.stringify({version:1,state:bad})});
  assert.equal(confirms,0);
  assert.equal(store.getItem('vocab-master-v1'),original);
  assert.match(api.toast,/복원하지 못했어요/);
});
test('old backups seed known words and new backups preserve review, stars, goal and history',async()=>{
  const store=memory(),{api}=ui(store);
  await api.restoreBackup({text:async()=>JSON.stringify({known:{'demo:word0':true},wrong:{},custom:[],progress:{}})});
  assert.equal(Core.loadState(store).review['demo:word0'].step,0);
  const next=Core.defaultState();next.daily.goal=35;
  Core.scheduleReview(next,'demo','word1',true,Core.localDay());Core.toggleStar(next,'demo','word2');
  await api.restoreBackup({text:async()=>JSON.stringify({version:1,state:next})});
  const got=Core.loadState(store);
  assert.equal(got.daily.goal,35);assert.ok(got.stars['demo:word2']);assert.ok(got.review['demo:word1']);
  assert.equal(got.review['demo:word0'],undefined,'restore replaces rather than merges');
  assert.equal(got.activity[Core.localDay()].learned,1);
});
test('review answers count once and missing words do not inflate the home due count',()=>{
  const state=Core.defaultState(),today=Core.localDay();
  state.review['demo:word0']={pkg:'demo',en:'word0',step:2,due:today};
  state.review['demo:missing']={pkg:'demo',en:'missing',step:0,due:today};
  const {api,handlers}=ui(undefined,state,'#/review');
  api.render();assert.equal(api.session.items.length,1);
  handlers.click({target:{closest:()=>({dataset:{action:'card-answer',known:'false'}})}});
  assert.equal(api.state.review['demo:word0'].step,0);
  assert.equal(api.state.review['demo:word0'].due,Core.addDays(today,1));
  assert.equal(api.state.activity[today].reviewed,1);
  assert.match(api.renderHome(),/복습 0개/);
});
