'use strict';

// Mock test files (questions/mock/mock-N.json, docs/tasks/ui-17-mock.md): one real test per file.
// Missing files are skipped; the dev fixture test/fixtures/mock-1.json is always checked so the app's test data stays valid.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
let passed = 0;
const test = (name, fn) => { fn(); passed++; console.log('ok', name); };
const COUNTS = {1:6, 2:25, 3:13, 4:10, 5:30, 6:4, 7:15};

const files = [1, 2, 3, 4, 5].map(n => [n, `questions/mock/mock-${n}.json`]).filter(([, file]) => fs.existsSync(path.join(root, file)));
files.push([1, 'test/fixtures/mock-1.json']);

for (const [n, file] of files) test(`${file}: test ${n}, part counts, 200 questions, answers, Part 1 images`, () => {
  const data = JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
  assert.equal(data.version, 1);
  assert.equal(data.test, n);
  let total = 0;
  for (const [part, count] of Object.entries(COUNTS)) {
    const list = data.parts[part];
    assert.ok(Array.isArray(list), `part ${part} list`);
    assert.equal(list.length, count, `part ${part} count`);
    for (const item of list) {
      assert.match(item.id, new RegExp(`^m-p${part}-${n}-\\d+$`), `id ${item.id}`);
      const questions = item.questions || [item];
      if (part === '3' || part === '4') assert.equal(questions.length, 3, item.id);
      if (part === '6') assert.equal(questions.length, 4, item.id);
      for (const q of questions) {
        const choices = part === '2' ? 3 : 4;
        assert.equal(q.choices.length, choices, `${item.id} choices`);
        assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < choices, `${item.id} answer`);
      }
      total += questions.length;
      if (part === '1') assert.ok(fs.existsSync(path.join(root, item.image)), `${item.id} image ${item.image}`);
    }
  }
  assert.equal(total, 200, 'questions');
  const lc = ['1', '2', '3', '4'].reduce((sum, part) => sum + data.parts[part].reduce((s, item) => s + (item.questions || [item]).length, 0), 0);
  assert.equal(lc, 100, 'LC questions');
});

console.log(`${passed} passed${files.length === 1 ? ' (no questions/mock files yet; fixture only)' : ''}`);
