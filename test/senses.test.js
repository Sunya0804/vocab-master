'use strict';

// Optional 6th word field: other senses [[sense, ex, exKo], ...] (docs/tasks/ui-18-senses.md).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Core = require('../core.js');
const {merge, formatPackage, sensesSha256} = require('../scripts/merge-senses.js');
const root = path.join(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
let passed = 0;
const test = (name, fn) => { fn(); passed++; console.log('ok', name); };

test('wordSenses keeps only [sense, ex, exKo] rows of non-empty strings', () => {
  assert.deepEqual(Core.wordSenses(['a', '가']), []);
  assert.deepEqual(Core.wordSenses(['a', '가', '', '', '', 'bad']), []);
  assert.deepEqual(Core.wordSenses(['a', '가', '', '', '', [['뜻', 'An a.', '해석'], ['뜻'], ['', 'x', 'y'], [1, 2, 3], null]]), [['뜻', 'An a.', '해석']]);
  assert.deepEqual(Core.wordSenses(undefined), []);
});

test('imports never create a 6th field', () => {
  const words = Core.parseImport('run\t달리다\t동\tI run.\t나는 달린다.\t[["운영하다","She runs a shop.","가게를 운영한다."]]\textra');
  assert.equal(words[0].length, 5);
});

const packageIds = fs.readdirSync(path.join(root, 'packages')).filter(name => name.endsWith('.json') && name !== 'index.json').map(name => name.slice(0, -5));
// TOEIC keeps its record under postSortValidation; other wordbooks get a top-level "senses" key.
const sensesRecord = id => {
  const file = `docs/${id}-sources.json`;
  if (!fs.existsSync(path.join(root, file))) return undefined;
  const sources = read(file);
  return id === 'toeic' ? sources.postSortValidation.senses : sources.senses;
};

test('every wordbook with a 6th field has valid sense rows, ko covering each sense, a cloze, and a matching hash record', () => {
  for (const id of packageIds) {
    const pkg = read(`packages/${id}.json`);
    if (!Array.isArray(pkg.words)) continue;
    const withSenses = pkg.words.filter(word => word.length > 5);
    assert.ok(pkg.words.every(word => word.length <= 6), id);
    for (const word of withSenses) {
      assert.ok(word[5].length > 0, `${id} ${word[0]}`);
      assert.deepEqual(Core.wordSenses(word), word[5], `${id} ${word[0]}`);
      for (const [sense, ex] of word[5]) {
        assert.ok(word[1].includes(sense), `${id} ${word[0]}: sense ${sense} is part of ko, so the meaning quiz accepts it`);
        assert.ok(Core.clozeExample([word[0], '', '', ex], packageLang(id).startsWith('de')), `${id} ${word[0]}: ${ex}`);
      }
    }
    const record = sensesRecord(id);
    if (!withSenses.length) { assert.equal(record, undefined, id); continue; }
    assert.equal(record.wordCount, withSenses.length, id);
    assert.equal(record.senseCount, withSenses.reduce((sum, word) => sum + word[5].length, 0), id);
    assert.equal(record.sensesSha256, sensesSha256(pkg.words), id);
  }
});

function packageLang(id) {
  return (read('packages/index.json').find(entry => entry.id === id) || {}).lang || 'en-US';
}

test('merge validates entries, appends missing senses to ko, is idempotent and keeps each package layout', () => {
  const words = [['run', '달리다; 운영하다', '동', 'I run every day.', '나는 매일 달린다.'], ['open', '열다', '동/형', 'Open the door.', '문을 열어라.']];
  const good = {index:0, en:'run', sense:'운영하다', pos:'동', ex:'She runs a small shop.', exKo:'그녀는 작은 가게를 운영한다.'};
  const once = merge(words, [good]);
  assert.deepEqual(once.errors, []);
  assert.deepEqual(once.words[0][5], [['운영하다', 'She runs a small shop.', '그녀는 작은 가게를 운영한다.']]);
  assert.equal(once.words[1].length, 5);
  assert.deepEqual(once.koAdded, []);
  assert.deepEqual(merge(once.words, [good]).words, once.words);
  assert.deepEqual(merge(once.words, []).words, words);
  assert.equal(merge(words, [{...good, index:1}]).errors.length, 1);
  assert.equal(merge(words, [{...good, index:9}]).errors.length, 1);
  assert.equal(merge(words, [{...good, ex:'She has a small shop.'}]).errors.length, 1);
  assert.equal(merge(words, [{...good, exKo:''}]).errors.length, 1);
  assert.equal(merge(words, [good, good]).errors.length, 1);
  const added = merge(words, [{index:1, en:'open', sense:'개방된', pos:'형', ex:'The store is open late.', exKo:'그 가게는 늦게까지 연다.'}]);
  assert.equal(added.words[1][1], '열다; 개방된');
  assert.deepEqual(merge(added.words, [{index:1, en:'open', sense:'개방된', pos:'형', ex:'The store is open late.', exKo:'그 가게는 늦게까지 연다.'}]).words, added.words);
  for (const id of ['toeic', 'suneung', 'teps']) {
    const text = fs.readFileSync(path.join(root, `packages/${id}.json`), 'utf8').replace(/\r\n/g, '\n');
    assert.equal(formatPackage(JSON.parse(text), text), text, `${id} layout`);
  }
});

for (const id of packageIds) {
  const final = path.join(root, id === 'toeic' ? 'docs/senses/final.json' : `docs/senses/${id}-final.json`);
  if (fs.existsSync(final)) test(`${path.relative(root, final).split(path.sep).join('/')} merges into ${id} without errors`, () => {
    assert.deepEqual(merge(read(`packages/${id}.json`).words, JSON.parse(fs.readFileSync(final, 'utf8'))).errors, []);
  });
}

console.log(`${passed} passed`);
