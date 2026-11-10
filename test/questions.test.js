'use strict';

// Validates questions/toeic-part5.json and toeic-part2.json against docs/tasks/exam-spec.md.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', name), 'utf8'));
const count = (items, key) => items.reduce((m, x) => (m[x[key]] = (m[x[key]] || 0) + 1, m), {});
let passed = 0;
const test = (name, fn) => { fn(); passed++; console.log('ok', name); };

const part5 = read('questions/toeic-part5.json');
const part2 = read('questions/toeic-part2.json');
const TRAPS = new Set(['repeat-word', 'similar-sound', 'wh-mismatch', 'yes-no-to-wh', 'related-word', 'wrong-subject']);

for (const [file, n, choices] of [[part5, 300, 4], [part2, 200, 3]]) {
  const qs = file.questions;
  test(`part ${file.part}: ${n} questions, unique ids and stems`, () => {
    assert.equal(qs.length, n);
    assert.equal(new Set(qs.map(q => q.q.trim().toLowerCase())).size, n);
    qs.forEach((q, i) => assert.equal(q.id, `p${file.part}-${String(i + 1).padStart(3, '0')}`));
  });
  test(`part ${file.part}: shape`, () => {
    for (const q of qs) {
      assert.equal(new Set(q.choices).size, choices, q.id);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < choices, q.id);
      assert.ok([1, 2, 3].includes(q.difficulty), q.id);
      assert.ok(/[가-힣]/.test(q.explain), q.id);
    }
  });
  test(`part ${file.part}: difficulty 25/45/30 and balanced answer positions`, () => {
    const d = count(qs, 'difficulty');
    assert.deepEqual([d[1], d[2], d[3]], [n * 0.25, n * 0.45, n * 0.30]);
    Object.values(count(qs, 'answer')).forEach(c => assert.ok(c / n >= 0.2 && c / n <= 0.4));
  });
}

test('part 5: one blank, type mix', () => {
  for (const q of part5.questions) {
    assert.equal(q.q.split('-------').length, 2, q.id);
    assert.ok(/[가-힣]/.test(q.ko), q.id);
  }
  assert.deepEqual(count(part5.questions, 'type'), {pos:70, pronoun:20, comparison:10, verb:45, 'prep-conj':50, relative:15, vocab:90});
});

test('part 2: translations, traps, type mix', () => {
  for (const q of part2.questions) {
    assert.ok(q.ko.q && q.ko.choices.length === 3, q.id);
    assert.ok(q.trap.length >= 1 && q.trap.every(t => TRAPS.has(t)), q.id);
  }
  assert.deepEqual(count(part2.questions, 'type'), {wh:90, choice:15, yesno:30, 'negative-tag':15, request:25, statement:25});
});

console.log(`${passed} passed`);
