'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Core = require('../core.js');

let passed = 0;
let failed = 0;
function test(name, run) {
  try {
    run();
    passed += 1;
    console.log('ok - ' + name);
  } catch (error) {
    failed += 1;
    console.error('not ok - ' + name);
    console.error(error.stack);
  }
}

function storage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem(key) { return data.has(key) ? data.get(key) : null; },
    setItem(key, value) { data.set(key, String(value)); }
  };
}

function seededRandom(seed) {
  return function () {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function assertImported(text, expected, duplicates = 0) {
  const words = Core.parseImport(text);
  assert.deepEqual(Array.from(words), expected);
  assert.equal(words.duplicates, duplicates);
  return words;
}

test('browser exports window.Core without DOM or Node dependencies', () => {
  const context = { window: {} };
  Object.defineProperty(context, 'document', {
    get() { throw new Error('DOM access is forbidden'); }
  });
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../core.js'), 'utf8'), context);
  assert.deepEqual(Object.keys(context.window.Core).sort(), Object.keys(Core).sort());
  assert.equal(context.window.Core.wordId('toeic', 'acquire'), 'toeic:acquire');
  assert.deepEqual(Array.from(context.window.Core.dayLevels({ words: [['test', '시험']] })), [null]);
});

test('chunkDays preserves order, handles partial/empty days and copies arrays', () => {
  const words = Array.from({ length: 43 }, (_, index) => ['word' + index, '뜻' + index]);
  const days = Core.chunkDays(words);
  assert.deepEqual(days.map(day => day.length), [20, 20, 3]);
  assert.deepEqual(days.flat(), words);
  days[0].pop();
  assert.equal(words.length, 43);
  assert.deepEqual(Core.chunkDays([]), []);
  assert.deepEqual(Core.chunkDays([1, 2, 3], 2), [[1, 2], [3]]);
  for (const size of [0, -1, 1.5, NaN, Infinity]) {
    assert.throws(() => Core.chunkDays(words, size), RangeError);
  }
});

test('dayLevels covers current Suneung Days in contiguous declared level order', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../packages/suneung.json'), 'utf8'));
  const snapshot = JSON.stringify(pkg);
  const dayCount = Core.chunkDays(pkg.words).length;
  assert.ok(dayCount > 0);
  assert.ok(Array.isArray(pkg.levels) && pkg.levels.length > 0);
  pkg.levels.forEach(level => {
    assert.equal(typeof level.name, 'string');
    assert.ok(Number.isInteger(level.days) && level.days > 0);
  });
  assert.equal(pkg.levels.reduce((total, level) => total + level.days, 0), dayCount);
  const names = Core.dayLevels(pkg);
  assert.equal(names.length, dayCount);
  assert.ok(names.every(name => name !== null));
  let start = 0;
  pkg.levels.forEach(level => {
    assert.deepEqual(names.slice(start, start + level.days), Array(level.days).fill(level.name));
    start += level.days;
  });
  console.log('  Suneung levels: ' + pkg.words.length + ' words, ' + dayCount + ' Days = '
    + pkg.levels.map(level => level.days).join(' / '));
  assert.equal(JSON.stringify(pkg), snapshot);
});

test('dayLevels maps a synthetic 100-Day package across five exact level boundaries', () => {
  const pkg = {
    words: Array.from({ length: 2000 }, (_, index) => ['word' + index, '뜻']),
    levels: [
      { name: 'Lv1 기초', days: 20 }, { name: 'Lv2 기본', days: 20 },
      { name: 'Lv3 중급', days: 24 }, { name: 'Lv4 고급', days: 28 },
      { name: 'Lv5 고난도', days: 8 }
    ]
  };
  const snapshot = JSON.stringify(pkg);
  const names = Core.dayLevels(pkg);
  assert.equal(names.length, 100);
  assert.deepEqual(names, [
    ...Array(20).fill('Lv1 기초'), ...Array(20).fill('Lv2 기본'),
    ...Array(24).fill('Lv3 중급'), ...Array(28).fill('Lv4 고급'), ...Array(8).fill('Lv5 고난도')
  ]);
  assert.equal(JSON.stringify(pkg), snapshot);
});

test('dayLevels returns null for every Day without levels, including a partial last Day', () => {
  const words = Array.from({ length: 41 }, (_, index) => ['word' + index, '뜻']);
  assert.deepEqual(Core.dayLevels({ id: 'custom-1', words }), [null, null, null]);
  assert.deepEqual(Core.dayLevels({ words, levels: [] }), [null, null, null]);
  assert.deepEqual(Core.dayLevels({ words: [] }), []);
});

test('dayLevels rejects malformed levels entirely, even after the available Days are covered', () => {
  const words = [['word', '뜻']];
  for (const levels of [null, {}, 'levels', 42, true, Array(1)]) {
    assert.deepEqual(Core.dayLevels({ words, levels }), [null]);
  }
  const invalidEntries = [null, [], {}, { name: 1, days: 1 }, { days: 1 }, { name: 'B' }];
  for (const days of [0, -1, 1.5, NaN, Infinity, '1', null, true]) {
    invalidEntries.push({ name: 'B', days });
  }
  for (const invalid of invalidEntries) {
    assert.deepEqual(Core.dayLevels({ words, levels: [{ name: 'A', days: 100 }, invalid] }), [null]);
  }
});

test('dayLevels rejects all levels when any name is empty or whitespace-only', () => {
  const words = Array.from({ length: 41 }, (_, index) => ['word' + index, '뜻']);
  for (const name of ['', '   ', '\t\r\n', '\u00a0\u3000']) {
    for (const levels of [
      [{ name, days: 1 }, { name: 'B', days: 2 }],
      [{ name: 'A', days: 1 }, { name, days: 2 }],
      [{ name: 'A', days: 3 }, { name, days: 1 }]
    ]) {
      const pkg = { words, levels };
      const snapshot = JSON.stringify(pkg);
      assert.deepEqual(Core.dayLevels(pkg), [null, null, null]);
      assert.equal(JSON.stringify(pkg), snapshot);
    }
  }
  assert.deepEqual(Core.dayLevels({ words, levels: [{ name: ' Lv1 기초 ', days: 3 }] }),
    Array(3).fill(' Lv1 기초 '));
});

test('dayLevels assigns all remaining Days to the last level regardless of its declared size', () => {
  const words = Array(81).fill(['word', '뜻']);
  for (const days of [1, 100]) {
    assert.deepEqual(Core.dayLevels({ words, levels: [{ name: 'A', days: 1 }, { name: 'B', days }] }),
      ['A', 'B', 'B', 'B', 'B']);
  }
  assert.deepEqual(Core.dayLevels({ words, levels: [{ name: 'Only', days: 1 }] }), Array(5).fill('Only'));
  assert.deepEqual(Core.dayLevels({ words: [], levels: [{ name: 'Only', days: 1 }] }), []);
});

test('dayLevels truncates excess allocations at the actual Day count without changing input', () => {
  const pkg = { words: Array(81).fill(['word', '뜻']), levels: [
    { name: 'A', days: 4 }, { name: 'B', days: 4 }, { name: 'C', days: 1 }
  ] };
  const snapshot = JSON.stringify(pkg);
  assert.deepEqual(Core.dayLevels(pkg), ['A', 'A', 'A', 'A', 'B']);
  assert.equal(JSON.stringify(pkg), snapshot);
  assert.deepEqual(Core.dayLevels({ ...pkg, levels: [{ name: 'A', days: 100 }, { name: 'B', days: 1 }] }),
    Array(5).fill('A'));
});

test('wordId accepts an English string or word pair and separates packages', () => {
  assert.equal(Core.wordId('toeic', 'accommodate'), 'toeic:accommodate');
  assert.equal(Core.wordId('custom-123', ['take part in', '참여하다']), 'custom-123:take part in');
});

test('shuffle returns a deterministic permutation without changing its input', () => {
  const input = [1, 2, 3, 4];
  assert.deepEqual(Core.shuffle(input, () => 0), [2, 3, 4, 1]);
  assert.deepEqual(input, [1, 2, 3, 4]);
  assert.notEqual(Core.shuffle(input), input);
  assert.deepEqual(Core.shuffle([]), []);
});

test('parseImport supports tabs, comma-separated pairs, CRLF and quoted meaning commas', () => {
  assertImported('acquire\t얻다, 인수하다\r\nagenda,"안건, 의제"\r\namend\t 수정하다', [
    ['acquire', '얻다, 인수하다'], ['agenda', '안건, 의제'], ['amend', '수정하다']
  ]);
});

test('parseImport splits unquoted comma rows only at the first comma', () => {
  assertImported([
    'accommodate, 수용하다, 숙박시키다',
    'en, 뜻1, 뜻2',
    'many, 뜻1, 뜻2, 뜻3, 뜻4, 뜻5'
  ].join('\n'), [
    ['accommodate', '수용하다, 숙박시키다'],
    ['en', '뜻1, 뜻2'],
    ['many', '뜻1, 뜻2, 뜻3, 뜻4, 뜻5']
  ]);
});

test('parseImport treats CSV metadata columns as part of the meaning', () => {
  assertImported('entry,뜻,명,Example.,해석', [['entry', '뜻,명,Example.,해석']]);
});

test('parseImport supports quoted fields, quoted delimiters and escaped quotes', () => {
  assertImported([
    '"take part in","참여하다, 참가하다"',
    '"a,b", "쉼표가 있는 영어"',
    '"c,d", "뜻1, 뜻2"',
    '"say ""hello"""\t"인사하다"',
    '"tab\tinside", "탭 포함"',
    '"#hash","주석 아님"'
  ].join('\n'), [
    ['take part in', '참여하다, 참가하다'],
    ['a,b', '쉼표가 있는 영어'],
    ['c,d', '뜻1, 뜻2'],
    ['say "hello"', '인사하다'],
    ['tab\tinside', '탭 포함'],
    ['#hash', '주석 아님']
  ]);
});

test('parseImport ignores blank/comment/incomplete rows without shifting empty fields', () => {
  assertImported([
    '\uFEFF # comments', '', '   ', '\t', ',뜻만', 'word,', '\t뜻만',
    'word\t', '"",뜻', 'word,""', 'unseparated', '"unclosed,뜻',
    ' valid\t 유효한 ', 'hash\t해시 # 기호'
  ].join('\n'), [['valid', '유효한'], ['hash', '해시 # 기호']]);
});

test('parseImport supports PDF whitespace and keeps multiword English phrases', () => {
  assertImported([
    'acquire 얻다', 'take part in 참여하다', '  in charge of   ~을 담당하는  ',
    '"look forward to" 기대하다', 'word meaning', 'invoice (명) 청구서'
  ].join('\n'), [
    ['acquire', '얻다'], ['take part in', '참여하다'], ['in charge of', '~을 담당하는'],
    ['look forward to', '기대하다'], ['word', 'meaning'], ['invoice', '(명) 청구서']
  ]);
});

test('parseImport accepts five TSV columns with commas and escaped quotes in examples', () => {
  assertImported([
    'acquire\t"얻다, 인수하다"\t동\t"We acquire goods, even overseas."\t"우리는 해외에서도 물품을 구입한다."',
    'announce\t발표하다\t동\t"She said ""We announce it, today."""\t그녀는 오늘 발표한다고 말했다.'
  ].join('\n'), [
    ['acquire', '얻다, 인수하다', '동', 'We acquire goods, even overseas.', '우리는 해외에서도 물품을 구입한다.'],
    ['announce', '발표하다', '동', 'She said "We announce it, today."', '그녀는 오늘 발표한다고 말했다.']
  ]);
});

test('parseImport limits TSV to five columns while preserving quoted tabs and commas', () => {
  assertImported('"tab\tinside"\t"뜻1,\t뜻2"\t명\t"Use a tab,\tthen continue."\t"탭, 다음 계속"\tignored', [
    ['tab\tinside', '뜻1,\t뜻2', '명', 'Use a tab,\tthen continue.', '탭, 다음 계속']
  ]);
});

test('parseImport accepts extended TSV and keeps empty interior optional fields', () => {
  assertImported([
    'agenda\t안건, 의제\t명\t"Review the agenda, then vote."\t안건을 검토한 다음 투표하세요.',
    'audit\t감사하다\t\tAudit the firm.\t',
    'amend\t수정하다\t동\t\t',
    'plain\t단순한\t\t\t',
    'phrase\t구문\t\t\t구문의 해석'
  ].join('\n'), [
    ['agenda', '안건, 의제', '명', 'Review the agenda, then vote.', '안건을 검토한 다음 투표하세요.'],
    ['audit', '감사하다', '', 'Audit the firm.'],
    ['amend', '수정하다', '동'],
    ['plain', '단순한'],
    ['phrase', '구문', '', '', '구문의 해석']
  ]);
});

test('parseImport keeps the first case-insensitive headword and counts only discarded duplicates', () => {
  const words = assertImported([
    'Acquire\t첫 뜻\t동\tFirst example.\t첫 예문',
    ' acquire\t둘째 뜻\t명', 'ACQUIRE 셋째 뜻', 'beta,',
    'beta 유효한 뜻', 'Beta,중복 뜻', '# acquire,주석', 'Acquire,'
  ].join('\n'), [
    ['Acquire', '첫 뜻', '동', 'First example.', '첫 예문'], ['beta', '유효한 뜻']
  ], 3);
  assert.ok(Array.isArray(words));
  assert.equal(typeof words.duplicates, 'number');
  assertImported('', []);
  assertImported('# comment\n,뜻\nword,', []);
});

test('makeChoices always includes the answer with unique shuffled candidates', () => {
  const pool = ['정답', '가', '가', '나', '다', '라', '정답'];
  const original = pool.slice();
  for (let seed = 1; seed <= 50; seed += 1) {
    const choices = Core.makeChoices('정답', pool, 4, seededRandom(seed));
    assert.equal(choices.length, 4);
    assert.equal(new Set(choices).size, 4);
    assert.ok(choices.includes('정답'));
    assert.ok(choices.every(choice => pool.includes(choice)));
  }
  assert.deepEqual(pool, original);
  assert.deepEqual(Core.makeChoices('정답', ['가', '나', '다'], 4, () => 0), ['나', '다', '가', '정답']);
});

test('makeChoices handles empty, duplicate, small and answer-free pools', () => {
  assert.deepEqual(Core.makeChoices('정답', [], 4), ['정답']);
  assert.deepEqual(Core.makeChoices('정답', ['정답', '정답'], 4), ['정답']);
  const small = Core.makeChoices('정답', ['가', '가'], 4);
  assert.equal(small.length, 2);
  assert.deepEqual(new Set(small), new Set(['정답', '가']));
  assert.equal(Core.makeChoices('정답', ['가', '나'], 2).length, 2);
  assert.deepEqual(Core.makeChoices('정답', ['가'], 1), ['정답']);
});

const quizPool = [
  ['acquire', '얻다'], ['gain', '얻다'], ['agenda', '안건'],
  ['amend', '수정하다'], ['allocate', '할당하다'], ['audit', '감사하다']
];

for (const mode of ['en2ko', 'ko2en']) {
  test('buildQuiz ' + mode + ' uses the correct prompt, answer and full package pool', () => {
    const words = quizPool.slice(0, 2);
    const snapshot = JSON.stringify(quizPool);
    const answerIndex = mode === 'en2ko' ? 1 : 0;
    const quiz = Core.buildQuiz(words, mode, quizPool, seededRandom(7));
    assert.equal(quiz.length, words.length);
    quiz.forEach((question, index) => {
      assert.deepEqual(question.word, words[index]);
      assert.equal(question.prompt, words[index][1 - answerIndex]);
      assert.equal(question.answer, words[index][answerIndex]);
      assert.equal(question.choices.length, 4);
      assert.equal(new Set(question.choices).size, 4);
      assert.ok(question.choices.includes(question.answer));
      assert.ok(question.choices.every(choice => quizPool.some(word => word[answerIndex] === choice)));
      assert.ok(question.choices.some(choice => !words.some(word => word[answerIndex] === choice)));
    });
    assert.equal(JSON.stringify(quizPool), snapshot);
    assert.deepEqual(Core.buildQuiz([], mode, quizPool), []);
    assert.deepEqual(Core.buildQuiz([words[0]], mode, [])[0].choices, [words[0][answerIndex]]);
  });
}

for (const mode of ['en2ko', 'ko2en']) {
  test('buildQuiz ' + mode + ' excludes every alternative with the current question prompt', () => {
    const pool = mode === 'en2ko' ? [
      ['run', '달리다', '동', 'We run daily.', '우리는 매일 달린다.'],
      ['run', '운영하다'], ['walk', '걷다']
    ] : [
      ['acquire', '얻다', '동', 'We acquire goods.', '우리는 물품을 구입한다.'],
      ['gain', '얻다'], ['amend', '수정하다']
    ];
    const snapshot = JSON.stringify(pool);
    const answerIndex = mode === 'en2ko' ? 1 : 0;
    const questions = Core.buildQuiz([pool[0], pool[2]], mode, pool, () => 0);
    assert.deepEqual(questions[0].word, pool[0]);
    assert.deepEqual(new Set(questions[0].choices), new Set([pool[0][answerIndex], pool[2][answerIndex]]));
    assert.ok(!questions[0].choices.includes(pool[1][answerIndex]));
    assert.ok(questions[1].choices.includes(pool[0][answerIndex]));
    assert.ok(questions[1].choices.includes(pool[1][answerIndex]));
    assert.equal(JSON.stringify(pool), snapshot);
    assert.deepEqual(Core.buildQuiz([pool[0]], mode, pool.slice(0, 2))[0].choices, [pool[0][answerIndex]]);
  });
}

test('defaultState returns independent empty containers', () => {
  const first = Core.defaultState();
  const second = Core.defaultState();
  assert.deepEqual(first, { known: {}, wrong: {}, custom: [], progress: {} });
  first.known.word = true;
  first.wrong.word = {};
  first.custom.push({});
  first.progress.day = {};
  assert.deepEqual(second, { known: {}, wrong: {}, custom: [], progress: {} });
});

test('recordAnswer adds misses, clears known, resets streak and removes after two consecutive correct', () => {
  const state = Core.defaultState();
  const word = ['acquire', '얻다'];
  const id = 'toeic:acquire';
  state.known[id] = true;
  assert.equal(Core.recordAnswer(state, 'toeic', word, false), state);
  assert.equal(state.known[id], undefined);
  assert.deepEqual(state.wrong[id], {
    pkg: 'toeic', en: 'acquire', ko: '얻다', pos: '', ex: '', exKo: '', miss: 1, streak: 0
  });
  Core.recordAnswer(state, 'toeic', word, true);
  assert.equal(state.wrong[id].streak, 1);
  Core.recordAnswer(state, 'toeic', word, false);
  assert.equal(state.wrong[id].miss, 2);
  assert.equal(state.wrong[id].streak, 0);
  Core.recordAnswer(state, 'toeic', word, true);
  assert.equal(state.wrong[id].streak, 1);
  assert.equal(state.wrong[id].miss, 2);
  Core.recordAnswer(state, 'toeic', word, true);
  assert.equal(Object.hasOwn(state.wrong, id), false);
  Core.recordAnswer(state, 'toeic', word, true);
  assert.deepEqual(state.wrong, {});
  assert.deepEqual(state.known, {});
});

test('markKnown toggles known and records repeated unknown cards as misses', () => {
  const state = Core.defaultState();
  const word = ['agenda', '안건'];
  assert.equal(Core.markKnown(state, 'toeic', word, true), state);
  assert.equal(state.known['toeic:agenda'], true);
  assert.deepEqual(state.wrong, {});
  Core.markKnown(state, 'toeic', word, false);
  Core.markKnown(state, 'toeic', word, false);
  assert.equal(state.known['toeic:agenda'], undefined);
  assert.equal(state.wrong['toeic:agenda'].miss, 2);
  Core.markKnown(state, 'toeic', word, true);
  assert.equal(state.wrong['toeic:agenda'].streak, 1);
  Core.recordAnswer(state, 'other', word, false);
  assert.equal(state.known['toeic:agenda'], true);
  assert.equal(state.wrong['other:agenda'].miss, 1);
});

test('recordAnswer and markKnown preserve extended metadata and default missing fields to empty strings', () => {
  const word = ['acquire', '얻다', '동', 'We acquire goods, locally.', '우리는 현지에서 물품을 구입한다.'];
  const state = Core.defaultState();
  Core.recordAnswer(state, 'toeic', word, false);
  const expected = {
    pkg: 'toeic', en: word[0], ko: word[1], pos: word[2], ex: word[3], exKo: word[4], miss: 1, streak: 0
  };
  assert.deepEqual(state.wrong['toeic:acquire'], expected);
  Core.markKnown(state, 'custom-1', word, false);
  assert.deepEqual(state.wrong['custom-1:acquire'], { ...expected, pkg: 'custom-1' });
  Core.recordAnswer(state, 'legacy', word.slice(0, 2), false);
  assert.deepEqual(state.wrong['legacy:acquire'], { ...expected, pkg: 'legacy', pos: '', ex: '', exKo: '' });
  Core.markKnown(state, 'legacy', word, true);
  assert.deepEqual(state.wrong['legacy:acquire'], { ...expected, pkg: 'legacy', streak: 1 });
  Core.recordAnswer(state, 'partial', word.slice(0, 3), false);
  assert.equal(state.wrong['partial:acquire'].pos, '동');
  assert.equal(state.wrong['partial:acquire'].ex, '');
  assert.equal(state.wrong['partial:acquire'].exKo, '');
});

test('markKnown true and quiz correct share the same consecutive-correct graduation rule', () => {
  const state = Core.defaultState();
  const word = ['agenda', '안건', '명'];
  const id = 'toeic:agenda';
  Core.markKnown(state, 'toeic', word, false);
  Core.markKnown(state, 'toeic', word, true);
  assert.equal(state.wrong[id].streak, 1);
  assert.equal(state.wrong[id].miss, 1);
  Core.markKnown(state, 'toeic', word, true);
  assert.equal(state.wrong[id], undefined);
  assert.equal(state.known[id], true);
  Core.markKnown(state, 'toeic', word, false);
  Core.recordAnswer(state, 'toeic', word, true);
  Core.markKnown(state, 'toeic', word, false);
  assert.equal(state.wrong[id].streak, 0);
  assert.equal(state.wrong[id].miss, 2);
  assert.equal(state.known[id], undefined);
  Core.markKnown(state, 'toeic', word, true);
  Core.recordAnswer(state, 'toeic', word, true);
  assert.equal(state.wrong[id], undefined);
});

test('saveState/loadState round-trip known, wrong, custom and progress', () => {
  const store = storage();
  assert.deepEqual(Core.loadState(store), Core.defaultState());
  const state = Core.defaultState();
  state.known['toeic:agenda'] = true;
  Core.recordAnswer(state, 'toeic', ['acquire', '얻다', '동', 'We acquire goods.', '우리는 물품을 구입한다.'], false);
  state.custom.push({ id: 'custom-123', name: '직접 가져옴', desc: '', words: [['test', '시험']] });
  state.progress['toeic:0'] = { studied: true, best: 85 };
  assert.equal(Core.saveState(store, state), true);
  assert.equal(store.getItem('vocab-master-v1'), JSON.stringify(state));
  assert.deepEqual(Core.loadState(store), state);
  assert.equal(store.getItem('vocab-master-v1-corrupt'), null);
});

test('loadState backs up corrupt JSON verbatim and leaves the original intact', () => {
  const raw = '{"known": broken JSON\n';
  const store = storage({ 'vocab-master-v1': raw });
  assert.deepEqual(Core.loadState(store), Core.defaultState());
  assert.equal(store.getItem('vocab-master-v1-corrupt'), raw);
  assert.equal(store.getItem('vocab-master-v1'), raw);
  assert.deepEqual(Core.loadState(storage({ 'vocab-master-v1': '{}' })), Core.defaultState());
  for (const invalid of ['null', '[]', '42']) {
    const invalidStore = storage({ 'vocab-master-v1': invalid });
    assert.deepEqual(Core.loadState(invalidStore), Core.defaultState());
    assert.equal(invalidStore.getItem('vocab-master-v1-corrupt'), invalid);
  }
});

test('loadState backs up wrong top-level types while retaining every valid field', () => {
  const valid = Core.defaultState();
  valid.known['toeic:agenda'] = true;
  Core.recordAnswer(valid, 'toeic', ['acquire', '얻다'], false);
  valid.custom.push({ id: 'custom-1', name: '개인', words: [['test', '시험']] });
  valid.progress['toeic:0'] = { studied: true, best: 80 };
  for (const key of Object.keys(valid)) {
    for (const invalid of [null, 42, 'invalid', key === 'custom' ? {} : []]) {
      const raw = JSON.stringify({ ...valid, [key]: invalid });
      const store = storage({ 'vocab-master-v1': raw });
      assert.deepEqual(Core.loadState(store), { ...valid, [key]: Core.defaultState()[key] });
      assert.equal(store.getItem('vocab-master-v1-corrupt'), raw);
      assert.equal(store.getItem('vocab-master-v1'), raw);
    }
  }
});

test('loadState removes only invalid wrong entries and backs up their original JSON', () => {
  const legacy = { pkg: 'toeic', en: 'agenda', ko: '안건', miss: 2, streak: 1 };
  const extended = { ...legacy, en: 'acquire', ko: '얻다', pos: '동', ex: 'We acquire goods.', exKo: '우리는 물품을 구입한다.' };
  const invalid = [null, [], {},
    { ...legacy, pkg: null }, { ...legacy, en: 42 }, { ...legacy, ko: {} },
    { ...legacy, miss: '2' }, { ...legacy, streak: '1' },
    { ...legacy, miss: NaN }, { ...legacy, streak: Infinity },
    { ...legacy, miss: -1 }, { ...legacy, streak: -1 }, { ...legacy, pos: 42 }
  ];
  const wrong = { legacy, extended };
  invalid.forEach((entry, index) => { wrong['invalid:' + index] = entry; });
  const raw = JSON.stringify({ known: { 'toeic:known': true }, wrong, custom: [], progress: {} });
  const store = storage({ 'vocab-master-v1': raw });
  const result = Core.loadState(store);
  assert.deepEqual(result.wrong, { legacy: { ...legacy, pos: '', ex: '', exKo: '' }, extended });
  assert.deepEqual(result.known, { 'toeic:known': true });
  assert.equal(store.getItem('vocab-master-v1-corrupt'), raw);
  assert.equal(store.getItem('vocab-master-v1'), raw);
});

test('loadState upgrades valid legacy metadata without treating missing optional fields as corruption', () => {
  const entry = { pkg: 'toeic', en: 'agenda', ko: '안건', miss: 2, streak: 1 };
  const store = storage({ 'vocab-master-v1': JSON.stringify({ wrong: { 'toeic:agenda': entry } }) });
  assert.deepEqual(Core.loadState(store), {
    ...Core.defaultState(), wrong: { 'toeic:agenda': { ...entry, pos: '', ex: '', exKo: '' } }
  });
  assert.equal(store.getItem('vocab-master-v1-corrupt'), null);
  const emptyStore = storage({ 'vocab-master-v1': '{}' });
  assert.deepEqual(Core.loadState(emptyStore), Core.defaultState());
  assert.equal(emptyStore.getItem('vocab-master-v1-corrupt'), null);
});

test('loadState still recovers valid fields if backing up a type mismatch fails', () => {
  const raw = JSON.stringify({ known: { word: true }, wrong: [], custom: [], progress: {} });
  assert.deepEqual(Core.loadState({
    getItem() { return raw; },
    setItem() { throw new Error('full'); }
  }), { ...Core.defaultState(), known: { word: true } });
});

test('storage wrappers tolerate unavailable or full storage', () => {
  const unavailable = {
    getItem() { throw new Error('denied'); },
    setItem() { throw new Error('denied'); }
  };
  assert.deepEqual(Core.loadState(unavailable), Core.defaultState());
  assert.equal(Core.saveState(unavailable, Core.defaultState()), false);
  assert.deepEqual(Core.loadState({
    getItem() { return '{broken'; },
    setItem() { throw new Error('full'); }
  }), Core.defaultState());
});

test('TOEIC vocabulary supports two to five fields and chunks its current size correctly', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../packages/toeic.json'), 'utf8'));
  assert.equal(pkg.id, 'toeic');
  assert.ok(pkg.words.length > 0);
  const seen = new Set();
  for (const word of pkg.words) {
    assert.ok(Array.isArray(word) && word.length >= 2 && word.length <= 5);
    assert.ok(word.every(value => typeof value === 'string' && value.trim() === value));
    assert.ok(word[0].length > 0 && word[1].length > 0);
    assert.match(word[0], /[A-Za-z]/);
    assert.match(word[1], /[가-힣]/);
    assert.doesNotMatch(word.join(''), /[\u0000-\u001f\ue000-\uf8ff\ufffd]/);
    const key = word[0].normalize('NFKC').replace(/[‘’]/g, "'").replace(/\s+/g, ' ').toLowerCase();
    assert.ok(!seen.has(key), 'Duplicate headword: ' + word[0]);
    seen.add(key);
  }
  const days = Core.chunkDays(pkg.words);
  assert.equal(days.length, Math.ceil(pkg.words.length / 20));
  assert.ok(days.slice(0, -1).every(day => day.length === 20));
  assert.equal(days.at(-1).length, pkg.words.length % 20 || 20);
  assert.deepEqual(days.flat(), pkg.words);
  console.log(`  TOEIC: ${pkg.words.length} entries, ${days.length} Days, final Day ${days.at(-1).length} entries`);
});

test('TOEIC source headwords remain available and quizzes accept the current package', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../packages/toeic.json'), 'utf8'));
  const provenance = JSON.parse(fs.readFileSync(path.join(__dirname, '../docs/toeic-sources.json'), 'utf8'));
  const headwords = new Set(pkg.words.map(word => word[0]));
  const covered = new Set();
  for (const source of provenance.sources) {
    assert.match(source.pdfSha256, /^[a-f0-9]{64}$/);
    const sourceWords = new Set();
    for (const [page, words] of Object.entries(source.pages)) {
      assert.ok(Number.isInteger(Number(page)) && Number(page) >= 1 && Number(page) <= source.pdfPageCount);
      assert.ok(Array.isArray(words) && words.length > 0);
      for (const word of words) { sourceWords.add(word); covered.add(word); }
    }
    assert.ok(sourceWords.size > 0);
  }
  for (const word of covered) assert.ok(headwords.has(word), 'Missing source headword: ' + word);
  for (const day of Core.chunkDays(pkg.words)) {
    for (const mode of ['en2ko', 'ko2en']) {
      const quiz = Core.buildQuiz([day[0]], mode, pkg.words, seededRandom(9));
      assert.ok(quiz[0].choices.includes(quiz[0].answer));
      assert.equal(new Set(quiz[0].choices).size, 4);
    }
  }
});

test('exam sets preserve 25/45/30 proportions, unique IDs and input order', () => {
  const bank = [1, 2, 3].flatMap(difficulty => Array.from({length:100}, (_, i) => ({id:`p5-${difficulty * 1000 + i}`, difficulty})));
  const before = JSON.stringify(bank);
  for (const [count, expected] of [[30, [8, 13, 9]], [25, [6, 11, 8]]]) {
    const selected = Core.selectExamQuestions(bank, count, 0, seededRandom(7));
    assert.equal(selected.length, count);
    assert.equal(new Set(selected.map(q => q.id)).size, count);
    assert.deepEqual([1, 2, 3].map(level => selected.filter(q => q.difficulty === level).length), expected);
  }
  assert.equal(JSON.stringify(bank), before);
  assert.deepEqual(Core.selectExamQuestions(bank, 30, 0, seededRandom(3)), Core.selectExamQuestions(bank, 30, 0, seededRandom(3)));
});

test('exam selection respects difficulty, scarce levels, tiny banks and invalid requests', () => {
  const bank = Array.from({length:40}, (_, i) => ({id:`p2-${i}`, difficulty:i < 2 ? 1 : 2}));
  assert.equal(Core.selectExamQuestions(bank, 25).length, 25);
  assert.equal(Core.selectExamQuestions(bank, 30, 1).length, 2);
  assert.ok(Core.selectExamQuestions(bank, 25, 2).every(q => q.difficulty === 2));
  assert.deepEqual(Core.selectExamQuestions([], 30), []);
  assert.deepEqual(Core.selectExamQuestions(bank, 0), []);
  assert.equal(Core.selectExamQuestions([bank[0], bank[0]], 30).length, 1);
  assert.throws(() => Core.selectExamQuestions(bank, -1), RangeError);
  assert.throws(() => Core.selectExamQuestions(bank, 25, 4), RangeError);
});

test('exam answers retain tries and timestamp without mutating prior records', () => {
  const original = {answers:{}};
  const wrong = Core.recordExamAnswer(original, 'p5-001', false, 100);
  const correct = Core.recordExamAnswer(wrong, 'p5-001', true, 200);
  assert.deepEqual(original, {answers:{}});
  assert.deepEqual(wrong.answers['p5-001'], {correct:false, first:false, at:100, tries:1});
  assert.deepEqual(correct.answers['p5-001'], {correct:true, first:false, at:200, tries:2});
  assert.deepEqual(Core.examStats([{id:'p5-001'}], correct.answers).wrong, []);
  assert.throws(() => Core.recordExamAnswer(original, '__proto__', true, 1), TypeError);
});

test('exam stats use latest answers, ignore other parts and count each ID once', () => {
  const questions = [{id:'p5-001'}, {id:'p5-002'}, {id:'p5-003'}, {id:'p5-001'}];
  const answers = {'p5-001':{correct:true}, 'p5-002':{correct:false}, 'p2-001':{correct:true}};
  const stats = Core.examStats(questions, answers);
  assert.deepEqual(stats, {total:3, solved:2, correct:1, accuracy:50, firstCorrect:1, firstAccuracy:50, wrong:[questions[1]]});
  assert.equal(Core.examStats(questions, {}).accuracy, 0);
});

test('exam first-attempt results survive retries and legacy record migration', () => {
  const questions = [{id:'p5-001'}, {id:'p5-002'}, {id:'p5-003'}, {id:'p5-004'}];
  let exam = {answers:{'p5-003':{correct:false, at:10, tries:2}, 'p5-004':{correct:true, at:10, tries:2}}};
  const original = JSON.stringify(exam);
  const legacyStats = Core.examStats(questions, exam.answers);
  assert.equal(legacyStats.firstAccuracy, 50);
  assert.equal(JSON.stringify(exam), original);
  exam = Core.recordExamAnswer(exam, 'p5-001', false, 20);
  exam = Core.recordExamAnswer(exam, 'p5-001', true, 30);
  exam = Core.recordExamAnswer(exam, 'p5-002', true, 20);
  exam = Core.recordExamAnswer(exam, 'p5-002', false, 30);
  exam = Core.recordExamAnswer(exam, 'p5-003', true, 30);
  exam = Core.recordExamAnswer(exam, 'p5-004', false, 30);
  assert.deepEqual(questions.map(q => exam.answers[q.id].first), [false, true, false, true]);
  assert.deepEqual(Core.examStats(questions, exam.answers), {total:4, solved:4, correct:2, accuracy:50,
    firstCorrect:2, firstAccuracy:50, wrong:[questions[1], questions[3]]});
  for (const q of questions) exam = Core.recordExamAnswer(exam, q.id, true, 40);
  const stats = Core.examStats(questions, exam.answers);
  assert.equal(stats.accuracy, 100);
  assert.equal(stats.firstAccuracy, 50);
  assert.deepEqual(stats.wrong, []);
  assert.equal(Core.examStats([], {}).firstAccuracy, 0);
  assert.ok(Core.validExamState(JSON.parse(JSON.stringify(exam))));
});

test('exam backup validation rejects malformed records', () => {
  assert.ok(Core.validExamState({answers:{}}));
  assert.ok(Core.validExamState({answers:{'p2-001':{correct:false, at:0, tries:1}}}));
  for (const first of [true, false]) assert.ok(Core.validExamState({answers:{'p2-001':{correct:true, first, at:0, tries:2}}}));
  for (const first of [null, 0, 1, 'false', [], {}]) {
    assert.equal(Core.validExamState({answers:{'p2-001':{correct:true, first, at:0, tries:1}}}), false);
  }
  for (const answer of [{correct:1, at:0, tries:1}, {correct:true, at:-1, tries:1}, {correct:true, at:0, tries:0}, {correct:true, at:Infinity, tries:1}, {correct:true, at:0, tries:1.5}]) {
    assert.equal(Core.validExamState({answers:{'p2-001':answer}}), false);
  }
  for (const value of [null, [], {}, {answers:[]}, {answers:{bad:{correct:true, at:0, tries:1}}}]) assert.equal(Core.validExamState(value), false);
});

test('exam ids accept Part 3/4 set questions and set stats mark sets with an unresolved wrong question', () => {
  let exam = {answers:{}};
  for (const id of ['p2-001', 'p3-001-1', 'p4-012-3']) exam = Core.recordExamAnswer(exam, id, true, 1);
  for (const id of ['p3-001', 'p3-001-4', 'p6-001', 'p4-1-001']) assert.throws(() => Core.recordExamAnswer(exam, id, true, 1), TypeError);
  assert.equal(Core.validExamState({answers:{'p3-001-0':{correct:true, at:0, tries:1}}}), false);
  const q = {type:'detail'};
  const sets = [{id:'p3-001', difficulty:1, questions:[q, q, q]}, {id:'p3-002', difficulty:2, questions:[q, q, q]}];
  exam = Core.recordExamAnswer(exam, 'p3-002-2', false, 2);
  let stats = Core.examSetStats(sets, exam.answers);
  assert.deepEqual([stats.total, stats.solved, stats.correct], [6, 2, 1]);
  assert.deepEqual(stats.wrong.map(s => s.id), ['p3-002']);
  assert.deepEqual(stats.items.map(i => i.id), ['p3-001-1', 'p3-001-2', 'p3-001-3', 'p3-002-1', 'p3-002-2', 'p3-002-3']);
  exam = Core.recordExamAnswer(exam, 'p3-002-2', true, 3);
  stats = Core.examSetStats(sets, exam.answers);
  assert.deepEqual(stats.wrong, []);
  assert.equal(stats.firstCorrect, 1);
  assert.equal(sets[0].questions[0].id, undefined);
});

test('clozeExample blanks inflected, phrasal and German forms; clozeCorrect normalizes', () => {
  const blanks = c => c && c.segments.filter(s => typeof s !== 'string').map(s => s.blank);
  let c = Core.clozeExample(['arrange', '준비하다', 'v', 'We arranged a meeting.', '회의를 잡았다.'], false);
  assert.deepEqual(blanks(c), ['arranged']);
  assert.equal(c.answer, 'arranged');
  assert.equal(c.segments.map(s => typeof s === 'string' ? s : '_').join(''), 'We _ a meeting.');
  c = Core.clozeExample(['set up', '설치하다', 'v', 'They set the booth up before noon.', ''], false);
  assert.deepEqual(blanks(c), ['set', 'up']);
  assert.equal(c.answer, 'set up');
  c = Core.clozeExample(['fahren', '타고 가다', 'v', 'Er fährt morgen nach Berlin.', ''], true);
  assert.equal(c, null, 'umlaut stem change is a match failure under the highlight rule');
  c = Core.clozeExample(['der Bahnhof', '역', 'n', 'Der Bahnhof ist weit.', ''], true);
  assert.deepEqual(blanks(c), ['Bahnhof']);
  c = Core.clozeExample(['sich freuen', '기뻐하다', 'v', 'Wir freuen uns sehr.', ''], true);
  assert.deepEqual(blanks(c), ['freuen']);
  assert.equal(Core.clozeExample(['apple', '사과', 'n', '', ''], false), null);
  assert.equal(Core.clozeExample(['apple', '사과', 'n', 'I like pears.', ''], false), null);
  assert.equal(Core.clozeExample(['up', '위', '', 'Up we go.', ''], false).answer, 'Up');
  assert.ok(Core.clozeCorrect('  SET   up ', 'set up', false));
  assert.ok(Core.clozeCorrect('don’t', "don't", false));
  assert.ok(!Core.clozeCorrect('arange', 'arranged', false));
  assert.ok(Core.clozeCorrect('faehrt', 'fährt', true));
  assert.ok(Core.clozeCorrect('Strasse', 'Straße', true));
  assert.ok(!Core.clozeCorrect('Strasse', 'Straße', false));
  assert.ok(!Core.clozeCorrect('fahrt', 'fährt', true));
});

test('short stems match whole words only; prefix headwords are not cloze questions', () => {
  const answer = (head, ex, german) => Core.clozeExample([head, '', '', ex], german).answer;
  assert.equal(answer('in person', 'She will attend the interview in person.'), 'in person');
  assert.equal(answer('as if', 'The new assistant works as if she has been here for years.'), 'as if');
  assert.equal(answer('in a row', 'Sales have increased for three months in a row.'), 'in a row');
  assert.equal(answer('for the sake of', 'We simplified the form for the sake of clarity.'), 'for the sake of');
  assert.equal(answer('run', 'She runs every morning.'), 'runs');
  assert.equal(answer('run late', 'The bus is running late.'), 'running late');
  assert.ok(!Core.stemMatches('inn', 'in', false));
  assert.equal(answer('acquire', 'The firm acquired a rival.'), 'acquired');
  assert.ok(Core.stemMatches('Uses', 'use', false));
  assert.ok(!Core.stemMatches('as', 'a', false));
  assert.ok(!Core.stemMatches('ins', 'in', true));
  assert.equal(Core.clozeExample(['Feier-', '', '', 'Morgen ist ein Feiertag.'], true), null);
  assert.equal(Core.clozeExample(['irgend-', '', '', 'Irgendwann komme ich.'], true), null);
});

test('spokenText reads only the part before " / " and keeps ellipses', () => {
  assert.equal(Core.spokenText('ihr / Ihr'), 'ihr');
  assert.equal(Core.spokenText('Deutsch / deutsch'), 'Deutsch');
  assert.equal(Core.spokenText('entweder ... oder'), 'entweder ... oder');
  assert.equal(Core.spokenText('je … desto …'), 'je … desto …');
  assert.equal(Core.spokenText('lead (up/down) to'), 'lead (up/down) to');
  assert.equal(Core.spokenText('der Tisch'), 'der Tisch');
});

console.log('\n' + passed + ' passed, ' + failed + ' failed');
if (failed) process.exitCode = 1;
