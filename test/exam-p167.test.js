'use strict';

// Shape checks for questions/toeic-part1|6|7.json against docs/tasks/exam-p167-spec.md.
// Counts and ratios are not checked here: the files may still hold temporary data.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const exists = name => fs.existsSync(path.join(root, name));
let passed = 0;
const test = (name, fn) => { fn(); passed++; console.log('ok', name); };
const filled = v => typeof v === 'string' && v.trim() !== '';
const strings = (list, n) => Array.isArray(list) && (n == null || list.length === n) && list.every(filled);

function choices(q, where) {
  assert.ok(strings(q.choices, 4) && new Set(q.choices).size === 4, `${where} four distinct choices`);
  assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, `${where} answer 0-3`);
  assert.ok(q.ko && strings(q.ko.choices, 4), `${where} ko.choices`);
  assert.ok(/[가-힣]/.test(q.explain), `${where} Korean explain`);
}

test('service worker caches every question file', () => {
  const files = fs.readdirSync(path.join(root, 'questions')).filter(f => f.endsWith('.json')).map(f => `questions/${f}`);
  const list = (fs.readFileSync(path.join(root, 'sw.js'), 'utf8').match(/QUESTION_FILES = \[([\d, ]+)\]/) || [])[1];
  assert.ok(list, 'QUESTION_FILES part list');
  const cached = list.split(',').map(n => `questions/toeic-part${n.trim()}.json`);
  for (const file of files) assert.ok(cached.includes(file), `${file} in QUESTION_FILES`);
});

if (exists('questions/toeic-part1.json')) test('part 1: fields, choices, traps, image files', () => {
  const data = read('questions/toeic-part1.json');
  assert.deepEqual([data.version, data.part, Array.isArray(data.questions)], [1, 1, true]);
  const traps = new Set(['action', 'being', 'wearing', 'absent', 'sound', 'position', 'association']);
  const places = new Set(['office', 'outdoor-work', 'store', 'restaurant', 'street', 'transport', 'warehouse', 'lab', 'home']);
  assert.equal(new Set(data.questions.map(q => q.id)).size, data.questions.length, 'unique ids');
  for (const q of data.questions) {
    assert.match(q.id, /^p1-\d+$/);
    assert.ok([1, 2, 3].includes(q.difficulty), q.id);
    assert.ok(['single', 'group', 'object'].includes(q.photoType), `${q.id} photoType`);
    assert.ok(places.has(q.place), `${q.id} place`);
    assert.ok(filled(q.alt), `${q.id} alt`);
    assert.match(q.image, /^images\/part1\/[\w.-]+\.webp$/, `${q.id} image path`);
    assert.ok(exists(q.image), `${q.id} image file ${q.image}`);
    assert.ok(Array.isArray(q.trap) && q.trap.length === 3 && q.trap.every(t => traps.has(t)), `${q.id} trap`);
    choices(q, q.id);
  }
});

if (exists('questions/toeic-part6.json')) test('part 6: heading, blanks {1}-{4} match questions, translations', () => {
  const data = read('questions/toeic-part6.json');
  assert.deepEqual([data.version, data.part, Array.isArray(data.sets)], [1, 6, true]);
  const types = new Set(['vocab', 'tense', 'pos', 'connector', 'pronoun', 'relative', 'sentence']);
  const docs = new Set(['email', 'memo', 'notice', 'article', 'advertisement', 'letter', 'webpage', 'invitation']);
  for (const s of data.sets) {
    assert.match(s.id, /^p6-\d+$/);
    assert.ok([1, 2, 3].includes(s.difficulty) && docs.has(s.passageType), s.id);
    assert.ok(strings(s.heading) && strings(s.headingKo, s.heading.length), `${s.id} heading`);
    assert.ok(strings(s.paragraphs) && s.paragraphs.length >= 1 && strings(s.paragraphsKo, s.paragraphs.length), `${s.id} paragraphs`);
    const blanks = s.paragraphs.join('\n').match(/\{\d+\}/g) || [];
    assert.equal(blanks.length, s.questions.length, `${s.id} blank count = questions`);
    assert.deepEqual(blanks, s.questions.map((_, i) => `{${i + 1}}`), `${s.id} blanks in order`);
    assert.deepEqual(s.paragraphsKo.join('\n').match(/\{\d+\}/g), blanks, `${s.id} Korean keeps the blank marks`);
    assert.equal(s.questions.length, 4, s.id);
    assert.equal(s.questions.filter(q => q.type === 'sentence').length, 1, `${s.id} one sentence question`);
    s.questions.forEach((q, i) => {
      assert.ok(q.blank === i + 1 && types.has(q.type), `${s.id}-${i + 1}`);
      choices(q, `${s.id}-${i + 1}`);
    });
  }
});

if (exists('questions/toeic-part7.json')) test('part 7: passages, translations, insertion marks, synonym refs, intention quotes', () => {
  const data = read('questions/toeic-part7.json');
  assert.deepEqual([data.version, data.part, Array.isArray(data.sets)], [1, 7, true]);
  const types = new Set(['detail', 'inference', 'purpose', 'not-true', 'synonym', 'intention', 'insertion', 'speaker']);
  const textDocs = new Set(['email', 'letter', 'memo', 'notice', 'article', 'advertisement', 'webpage', 'review', 'announcement']);
  for (const s of data.sets) {
    assert.match(s.id, /^p7-\d+$/);
    assert.ok([1, 2, 3].includes(s.difficulty), s.id);
    assert.equal(s.passages.length, {single:1, double:2, triple:3}[s.setType], `${s.id} setType matches passages`);
    assert.equal(s.passagesKo.length, s.passages.length, `${s.id} passagesKo length`);
    s.passages.forEach((p, i) => {
      const ko = s.passagesKo[i], where = `${s.id} passage ${i}`;
      assert.ok(filled(p.title) && filled(ko.title), `${where} title`);
      if (p.type === 'text' || p.type === 'chat') {
        assert.ok(p.lines.length > 0 && p.lines.every(l => filled(l.time) && filled(l.name) && filled(l.t)), `${where} lines`);
        assert.ok(strings(ko.lines, p.lines.length), `${where} ko lines`);
      } else {
        assert.ok(p.type === 'form' || textDocs.has(p.type), `${where} type ${p.type}`);
        if (p.type === 'form') assert.ok(p.table.length >= 2 && p.table.every(r => r.length === p.table[0].length) && ko.table.length === p.table.length, `${where} table`);
        else assert.ok(strings(p.body) && p.body.length > 0, `${where} body`);
      }
      if (p.heading) assert.ok(strings(p.heading) && strings(ko.heading, p.heading.length), `${where} heading`);
      if (p.body) assert.ok(strings(ko.body, p.body.length), `${where} ko body`);
    });
    assert.ok(s.questions.length >= 2 && s.questions.length <= 5, `${s.id} question count`);
    if (s.setType !== 'single') assert.ok(s.questions.some(q => q.crossRef === true), `${s.id} has a crossRef question`);
    s.questions.forEach((q, i) => {
      const where = `${s.id}-${i + 1}`;
      assert.ok(types.has(q.type) && filled(q.q) && filled(q.ko?.q), where);
      choices(q, where);
      const quote = (q.q.match(/"([^"]+)"/) || [])[1];
      if (q.type === 'insertion') {
        assert.deepEqual(q.choices, ['[1]', '[2]', '[3]', '[4]'], `${where} insertion choices`);
        assert.ok(quote, `${where} insertion sentence`);
        const body = s.passages.map(p => (p.body || []).join(' ')).join(' ');
        for (const mark of ['[1]', '[2]', '[3]', '[4]']) assert.equal(body.split(mark).length, 2, `${where} ${mark} once in the passage`);
      }
      if (q.type === 'synonym') {
        const paragraph = s.passages[q.ref?.passage]?.body?.[q.ref?.paragraph];
        assert.ok(quote && filled(paragraph), `${where} ref`);
        assert.match(paragraph, new RegExp(`\\b${quote.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`), `${where} "${quote}" in referenced paragraph`);
      }
      if (q.type === 'intention') {
        const time = (q.q.match(/At (\d{1,2}:\d{2} [AP]\.M\.)/) || [])[1];
        const lines = s.passages.flatMap(p => p.lines || []);
        assert.ok(quote && lines.some(l => l.t.includes(quote) && (!time || l.time === time)), `${where} intention quote at ${time}`);
      }
    });
  }
});

console.log(`${passed} passed`);
