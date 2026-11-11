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

// Banks grow over time (docs/tasks/expand-*.md): check minimum size and proportions, not exact counts.
const near = (got, total, share, tol = 0.05) => Math.abs(got / total - share) <= tol;
for (const [file, min, choices] of [[part5, 300, 4], [part2, 200, 3]]) {
  const qs = file.questions;
  const n = qs.length;
  test(`part ${file.part}: ${n} questions, unique ids and stems`, () => {
    assert.ok(n >= min, n);
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
    [0.25, 0.45, 0.30].forEach((share, i) => assert.ok(near(d[i + 1], n, share), `difficulty ${i + 1}`));
    Object.values(count(qs, 'answer')).forEach(c => assert.ok(c / n >= 0.2 && c / n <= 0.4));
  });
}

test('part 5: one blank, type mix', () => {
  for (const q of part5.questions) {
    assert.equal(q.q.split('-------').length, 2, q.id);
    assert.ok(/[가-힣]/.test(q.ko), q.id);
  }
  const t5 = count(part5.questions, 'type');
  Object.entries({pos:70, pronoun:20, comparison:10, verb:45, 'prep-conj':50, relative:15, vocab:90}).forEach(([k, v]) => assert.ok(near(t5[k] || 0, part5.questions.length, v / 300), k));
});

test('part 2: translations, traps, type mix', () => {
  for (const q of part2.questions) {
    assert.ok(q.ko.q && q.ko.choices.length === 3, q.id);
    assert.ok(q.trap.length >= 1 && q.trap.every(t => TRAPS.has(t)), q.id);
  }
  const t2 = count(part2.questions, 'type');
  Object.entries({wh:90, choice:15, yesno:30, 'negative-tag':15, request:25, statement:25}).forEach(([k, v]) => assert.ok(near(t2[k] || 0, part2.questions.length, v / 200), k));
});

// Part 3/4 sets: docs/tasks/exam-lc-spec.md
const SET_TYPES = new Set(['topic', 'speaker', 'detail', 'reason', 'suggest', 'next', 'inference', 'intention', 'graphic']);
const TALKS = {telephone:8, announcement:8, meeting:6, speech:6, advertisement:4, broadcast:4, tour:4};
for (const [part, min, diff] of [[3, 52, [14, 24, 14]], [4, 40, [10, 18, 12]]]) {
  const sets = read(`questions/toeic-part${part}.json`).sets;
  const qs = sets.flatMap(s => s.questions);
  const n = sets.length;
  const words = s => s.script.map(l => l.t).join(' ').split(/\s+/).length;
  test(`part ${part}: ${n} sets, ids, difficulty`, () => {
    assert.ok(n >= min, n);
    sets.forEach((s, i) => assert.equal(s.id, `p${part}-${String(i + 1).padStart(3, '0')}`));
    const d = count(sets, 'difficulty');
    diff.forEach((v, i) => assert.ok(near(d[i + 1], n, v / min, 0.06), `difficulty ${i + 1}`));
  });
  test(`part ${part}: set shape`, () => {
    for (const s of sets) {
      assert.equal(s.questions.length, 3, s.id);
      assert.equal(s.scriptKo.length, s.script.length, s.id);
      const [lo, hi] = part === 3 ? [90, 150] : [100, 160];
      assert.ok(words(s) >= lo && words(s) <= hi, `${s.id} words ${words(s)}`);
      assert.ok(s.script.every(l => ['M', 'W', 'M2', 'W2'].includes(l.s) && l.t), s.id);
      if (part === 4) assert.equal(new Set(s.script.map(l => l.s)).size, 1, s.id);
      if (s.graphic) assert.ok(s.graphic.title && s.graphic.titleKo && s.graphic.rows.length >= 3 && s.graphic.rows.length <= 7, s.id);
      assert.equal(!!s.graphic, s.questions.some(q => q.type === 'graphic'), s.id);
      for (const q of s.questions) {
        assert.ok(SET_TYPES.has(q.type), s.id);
        assert.equal(new Set(q.choices).size, 4, s.id);
        assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, s.id);
        assert.ok(q.ko.q && q.ko.choices.length === 4 && /[가-힣]/.test(q.explain), s.id);
        if (q.type === 'intention') {
          const quote = (q.q.match(/"(.+)"/) || [])[1];
          assert.ok(quote && s.script.some(l => l.t.includes(quote)), `${s.id} intention quote`);
        }
      }
    }
  });
  test(`part ${part}: mix and answer positions`, () => {
    assert.ok(near(sets.filter(s => s.graphic).length, n, (part === 3 ? 12 : 8) / min));
    assert.ok(near(qs.filter(q => q.type === 'intention').length, qs.length, (part === 3 ? 8 : 12) / (min * 3)));
    if (part === 3) assert.ok(near(sets.filter(s => new Set(s.script.map(l => l.s)).size >= 3).length, n, 10 / min));
    else Object.entries(TALKS).forEach(([k, v]) => assert.ok(near(count(sets, 'talkType')[k] || 0, n, v / 40, 0.06), k));
    Object.values(count(qs, 'answer')).forEach(c => assert.ok(c / qs.length >= 0.2 && c / qs.length <= 0.3));
  });
}

console.log(`${passed} passed`);
