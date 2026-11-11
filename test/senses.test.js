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

const toeic = read('packages/toeic.json');

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

test('only TOEIC carries senses; every TOEIC sense row is valid and makes a cloze', () => {
  for (const file of fs.readdirSync(path.join(root, 'packages')).filter(name => name.endsWith('.json') && name !== 'index.json' && name !== 'toeic.json')) {
    const pkg = read('packages/' + file);
    if (Array.isArray(pkg.words)) assert.ok(pkg.words.every(word => word.length <= 5), file);
  }
  const withSenses = toeic.words.filter(word => word.length > 5);
  for (const word of withSenses) {
    assert.ok(word[5].length > 0, word[0]);
    assert.deepEqual(Core.wordSenses(word), word[5], word[0]);
    for (const [sense, ex] of word[5]) {
      assert.ok(word[1].includes(sense), `${word[0]}: sense ${sense} is part of ko, so the meaning quiz accepts it`);
      assert.ok(Core.clozeExample([word[0], '', '', ex], false), `${word[0]}: ${ex}`);
    }
  }
  const record = read('docs/toeic-sources.json').postSortValidation.senses;
  if (!withSenses.length) return assert.equal(record, undefined);
  assert.equal(record.wordCount, withSenses.length);
  assert.equal(record.senseCount, withSenses.reduce((sum, word) => sum + word[5].length, 0));
  assert.equal(record.sensesSha256, sensesSha256(toeic.words));
});

test('merge validates entries, is idempotent and keeps the package layout', () => {
  const words = [['run', '달리다; 운영하다', '동', 'I run every day.', '나는 매일 달린다.'], ['open', '열다', '동/형', 'Open the door.', '문을 열어라.']];
  const good = {index:0, en:'run', sense:'운영하다', pos:'동', ex:'She runs a small shop.', exKo:'그녀는 작은 가게를 운영한다.'};
  const once = merge(words, [good]);
  assert.deepEqual(once.errors, []);
  assert.deepEqual(once.words[0][5], [['운영하다', 'She runs a small shop.', '그녀는 작은 가게를 운영한다.']]);
  assert.equal(once.words[1].length, 5);
  assert.deepEqual(merge(once.words, [good]).words, once.words);
  assert.deepEqual(merge(once.words, []).words, words);
  assert.equal(merge(words, [{...good, index:1}]).errors.length, 1);
  assert.equal(merge(words, [{...good, index:9}]).errors.length, 1);
  assert.equal(merge(words, [{...good, ex:'She has a small shop.'}]).errors.length, 1);
  assert.equal(merge(words, [{...good, exKo:''}]).errors.length, 1);
  assert.equal(merge(words, [good, good]).errors.length, 1);
  const text = fs.readFileSync(path.join(root, 'packages/toeic.json'), 'utf8').replace(/\r\n/g, '\n');
  assert.equal(formatPackage(toeic), text);
});

const final = path.join(root, 'docs/senses/final.json');
if (fs.existsSync(final)) test('docs/senses/final.json merges without errors', () => {
  assert.deepEqual(merge(toeic.words, JSON.parse(fs.readFileSync(final, 'utf8'))).errors, []);
});

console.log(`${passed} passed`);
