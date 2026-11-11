'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const Core = require('../core.js');
const root = path.resolve(__dirname,'..');
const read = file => JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
const manifest = read('docs/german-advanced-sources.json');
const base = read('packages/german-b1.json');
const packages = ['b2','c1','c2'].map(level => read(`packages/german-${level}.json`));
const all = packages.at(-1), added = all.words.slice(base.words.length);
const canonical = head => head.replace(/^(?:der|die|das|sich) /,'').toLocaleLowerCase('de-DE').replace(/ß/g,'ss');
let passed=0;
function test(name,run){run();passed++;console.log('ok - '+name);}

test('B2-C2 packages are registered and preserve every lower-level row and grammar field', () => {
  const index=read('packages/index.json').map(entry => entry.file);
  assert.equal(hash('packages/german-b1.json'),manifest.base.sha256);
  assert.equal(manifest.base.count,3620);
  packages.forEach((pkg,i) => {
    const prior=i ? packages[i-1] : base;
    const descriptor=manifest.packages[i];
    assert.ok(index.includes(pkg.id+'.json'));
    assert.equal(index.filter(file => file===pkg.id+'.json').length,1);
    assert.equal(pkg.lang,'de-DE'); assert.equal(pkg.languageName,'독일어');
    assert.equal(pkg.selectionType,'curated-pdf-extension');
    assert.equal(pkg.words.length,[3868,4099,4371][i]);
    assert.equal(pkg.words.length-prior.words.length,[248,231,272][i]);
    assert.equal(descriptor.newCount,pkg.words.length-prior.words.length);
    assert.equal(Core.chunkDays(pkg.words).length,[194,205,219][i]);
    assert.equal(hash('packages/'+descriptor.file),descriptor.sha256);
    assert.deepEqual(pkg.words.slice(0,prior.words.length),prior.words);
    for(const [head,info] of Object.entries(prior.wordInfo)) assert.deepEqual(pkg.wordInfo[head],info,head);
  });
  for(const file of ['toeic.json','suneung.json','teps.json','german-a1.json','german-a2.json','german-b1.json']) assert.ok(index.includes(file));
});

test('all 751 new entries have complete Korean metadata and original short German sentences', () => {
  assert.equal(added.length,751);
  const seen=new Set(base.words.map(row => canonical(row[0])));
  const sentences=new Set();
  added.forEach(row => {
    assert.equal(row.length,5,row[0]);
    row.forEach(cell => assert.ok(typeof cell==='string' && cell.trim(),row[0]));
    assert.match(row[1],/[가-힣]/); assert.match(row[4],/[가-힣]/);
    assert.doesNotMatch(row[1],/[A-Za-zÄÖÜäöüß]/,row[0]+' reverse quiz answer leakage');
    assert.match(row[2],/^[명동형부전접대감관수](?:\/[명동형부전접대감관수])*$/);
    assert.ok(row[3].split(/\s+/).length<=15,row[0]);
    assert.match(row[3],/[.!?]$/);
    assert.doesNotMatch(row.join(''),/[\ufffd\u00ad]|SCHUBERT|GOETHE-ZERTIFIKAT|Sprachniveau|Preisnachlaß/);
    assert.ok(!seen.has(canonical(row[0])),row[0]+' duplicate');seen.add(canonical(row[0]));
    assert.ok(!sentences.has(row[3]),row[0]+' duplicate sentence');sentences.add(row[3]);
    assert.equal(all.wordInfo[row[0]].levelBasis,'curated-pdf-context');
  });
  assert.equal(manifest.qualityReview.longSourceSentenceMatches,0);
});

test('every new word has a bounded page reference and reproducible delivered index', () => {
  assert.equal(manifest.sources.length,6);
  assert.equal(manifest.sources.reduce((sum,s)=>sum+s.pages,0),251);
  assert.equal(manifest.words.length,751);
  const sourceMap=new Map(manifest.sources.map(s=>[s.id,s]));
  const indices=new Set(), heads=new Set();let references=0;
  manifest.sources.forEach(source => {
    assert.match(source.url,/^https:\/\/www\.(goethe\.de|schubert-verlag\.de)\//);
    assert.match(source.sha256,/^[0-9a-f]{64}$/);
    assert.ok(source.bytes>0 && source.pages>0);
  });
  manifest.words.forEach(record => {
    assert.equal(record.status,'added');
    assert.ok(record.index>=base.words.length && record.index<all.words.length);
    assert.equal(all.words[record.index][0],record.headword);
    assert.equal(all.wordInfo[record.headword].cefr,record.level);
    assert.ok(!indices.has(record.index));indices.add(record.index);
    assert.ok(!heads.has(record.headword));heads.add(record.headword);
    assert.ok(record.sources.length);
    record.sources.forEach(evidence => {
      const source=sourceMap.get(evidence.id);assert.ok(source);
      assert.equal(source.level,record.level);
      assert.ok(Number.isInteger(evidence.page) && evidence.page>0 && evidence.page<=source.pages);
      assert.ok(evidence.anchor && evidence.forms.length);
      evidence.forms.forEach(form=>assert.match(form,/^[\p{L}-]+$/u));
      references++;
    });
  });
  assert.equal(references,manifest.curation.newSourceTokenReferencesChecked);
  assert.equal(references,1023);
  assert.equal(references+manifest.existing.reduce((sum,d)=>sum+d.sources.length,0),manifest.curation.sourceTokenReferencesChecked);
  assert.equal(manifest.existing.length,1);
  assert.ok(base.words.some(row=>row[0]===manifest.existing[0].canonical));
});

test('homonymous forms do not incorrectly lower noun classification', () => {
  const info=all.wordInfo;
  assert.equal(info['das Vermögen'].cefr,'C2');
  assert.equal(info['der Nachlass'].cefr,'C2');
  assert.equal(info['sich wehren'].cefr,'C1');
  assert.equal(info['versetzen'].cefr,'B2');
  assert.ok(info['der Gesetzentwurf']);
  assert.equal(manifest.words.find(w=>w.headword==='der Gesetzentwurf').sources[0].forms[0],'Gesetzentwurf');
  assert.equal(manifest.curation.reclassifiedSingleWords,14);
});

test('noun plurals and verb-phrase grammar stay separate from meanings', () => {
  let nouns=0, plurals=0;
  added.forEach(row => {
    const info=all.wordInfo[row[0]];
    assert.equal(!!info.article,row[2]==='명',row[0]);
    if(row[2]==='명'){
      nouns++;assert.match(row[0],/^(der|die|das) /);
      assert.ok(info.plural || info.pluralNote || info.pluralOnly);
      if(info.plural){plurals++;assert.ok(info.plural.every(p=>typeof p==='string'&&p.trim()));}
    }
  });
  assert.equal(nouns,247);assert.equal(plurals,180);
  for(const head of ['die Konsequenzen ziehen','die Fassung bewahren','die Geduld verlieren']) assert.equal(all.wordInfo[head].article,undefined);
  for(const [head,plural] of Object.entries({'das Kriterium':['Kriterien'],'der Gesetzentwurf':['Gesetzentwürfe'],'das Gutachten':['Gutachten'],'das Rechtsmittel':['Rechtsmittel'],'die Rechthaberei':['Rechthabereien'],'der Werdegang':['Werdegänge'],'der Schiffbruch':['Schiffbrüche']})) assert.deepEqual(all.wordInfo[head].plural,plural,head);
  assert.match(all.wordInfo['umschreiben'].usage,/분리/);
  assert.match(all.wordInfo['beruhen'].usage,/여격/);
});

test('German word order, separable forms and formal collocations are represented in the examples', () => {
  const word=head=>all.words.find(row=>row[0]===head);
  assert.match(word('sich wohlfühlen')[3],/fühle.*mich wohl/);
  assert.match(word('in Erwägung ziehen')[3],/ziehen.*in Erwägung/);
  assert.match(word('ein Urteil fällen')[3],/Urteil fällen/);
  assert.match(word('ein Geständnis ablegen')[3],/legte.*Geständnis ab/);
  assert.match(word('einen Schlussstrich ziehen')[3],/Schlussstrich ziehen/);
  assert.match(word('sich jemandes Zorn zuziehen')[3],/zog.*sich.*Zorn.*zu/);
  assert.match(word('zum Erliegen kommen')[3],/kam.*zum Erliegen/);
  assert.match(word('sich vergreifen')[3],/sich an fremdem Eigentum vergreift/);
  assert.match(word('zunichtemachen')[3],/zunichtemachen/);
});

test('both quiz directions and learning records work with all three advanced packages', () => {
  packages.forEach((pkg,i) => {
    const start=i ? packages[i-1].words.length : base.words.length;
    const selected=pkg.words.slice(start,start+5);
    for(const mode of ['en2ko','ko2en']){
      const questions=Core.buildQuiz(selected,mode,pkg.words,()=>.37);
      assert.equal(questions.length,selected.length);
      questions.forEach(q=>{
        assert.equal(q.word.length,5);assert.ok(q.choices.includes(q.answer));
        assert.equal(q.prompt,q.word[mode==='en2ko'?0:1]);
        assert.equal(new Set(q.choices).size,q.choices.length);
      });
    }
    const state=Core.defaultState(), row=selected[0];Core.recordAnswer(state,pkg.id,row,false);
    const entry=state.wrong[Core.wordId(pkg.id,row[0])];
    assert.deepEqual([entry.en,entry.ko,entry.pos,entry.ex,entry.exKo],row);
    Core.recordAnswer(state,pkg.id,row,true);Core.recordAnswer(state,pkg.id,row,true);
    assert.equal(state.wrong[Core.wordId(pkg.id,row[0])],undefined);
  });
});
console.log(`${passed} advanced German corpus checks passed.`);
