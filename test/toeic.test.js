'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const Core = require('../core.js');
const read = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', name), 'utf8'));
const pkg = read('packages/toeic.json');
const provenance = read('docs/toeic-sources.json');
const review = read('docs/toeic-review.json');
const levelData = read('docs/toeic-levels.json');
const hash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const normalize = text => text.normalize('NFKC').replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();
const byHeadword = new Map(pkg.words.map((word, index) => [normalize(word[0]), { word, index }]));
const canonicalLegacyHeadword = headword => {
  const key = normalize(headword);
  return normalize(review.legacyHeadwordCorrections[key] || key);
};
const addedHeadwords = new Set(review.sources.flatMap(source => source.rows
  .filter(row => row.decision === 'added').map(row => canonicalLegacyHeadword(row.headword))));
const sourcedHeadwords = new Set(provenance.sources.flatMap(source =>
  Object.values(source.pages).flat().map(canonicalLegacyHeadword)));
const baseWords = pkg.words.filter(word => !sourcedHeadwords.has(normalize(word[0])));
const legacyWords = pkg.words.filter(word => !addedHeadwords.has(normalize(word[0])));
const legacyHeadwords = new Set(legacyWords.map(word => normalize(word[0])));
const sortedWords = words => words.slice().sort((a, b) => {
  const left = normalize(a[0]), right = normalize(b[0]);
  return left < right ? -1 : left > right ? 1 : 0;
});
let passed = 0;
let failed = 0;
function test(name, run) {
  try {
    run();
    console.log('ok - ' + name);
    passed += 1;
  } catch (error) {
    console.error('not ok - ' + name);
    console.error(error.stack);
    failed += 1;
  }
}

// Accept normal inflections and real substitutions for grammatical pattern
// variables, while still checking every entry against its own example.
const irregular = new Map();
[
  'be am is are was were been being', 'have has had having', 'do does did done doing',
  'go goes went gone going', 'get got gotten getting', 'make made making',
  'take took taken taking', 'give gave given giving', 'come came coming',
  'run ran running', 'put putting', 'set setting', 'cut cutting', 'let letting',
  'meet met meeting', 'hold held holding', 'stand stood standing', 'sit sat sitting',
  'lie lay lain lying', 'lay laid laying', 'lead led leading', 'lose lost losing',
  'leave left leaving', 'send sent sending', 'find found finding', 'buy bought buying',
  'bring brought bringing', 'think thought thinking', 'speak spoke spoken speaking',
  'write wrote written writing', 'read reading', 'say said saying', 'tell told telling',
  'pay paid paying', 'keep kept keeping', 'build built building', 'break broke broken breaking',
  'choose chose chosen choosing', 'draw drew drawn drawing', 'drive drove driven driving',
  'fall fell fallen falling', 'feel felt feeling', 'grow grew grown growing',
  'know knew known knowing', 'see saw seen seeing', 'sell sold selling', 'spend spent spending',
  'undergo underwent undergone undergoing', 'wear wore worn wearing', 'win won winning',
  'wind wound winding', 'eat ate eaten eating', 'fly flew flown flying',
  'rise rose risen rising', 'swear swore sworn swearing', 'seek sought seeking',
  'catch caught catching', 'kneel knelt kneeling', 'outgrow outgrew outgrown outgrowing',
  'overhear overheard overhearing', 'foot feet', 'person people', 'man men', 'woman women',
  'child children', 'mouse mice', 'tooth teeth', 'good better best', 'far further farther'
].forEach(group => {
  const words = group.split(' ');
  words.forEach(word => irregular.set(word, words[0]));
});
const tokens = text => text.toLowerCase().replace(/’/g, "'").normalize('NFKD')
  .replace(/\p{M}/gu, '').match(/[a-z]+(?:'[a-z]+)?|[0-9]+/g) || [];
function forms(word) {
  const result = new Set([word, irregular.get(word) || word]);
  if (word.length > 3) {
    if (word.endsWith('s')) result.add(word.slice(0, -1));
    if (word.endsWith('es')) result.add(word.slice(0, -2));
    if (word.endsWith('ies')) result.add(word.slice(0, -3) + 'y');
    if (word.endsWith('ing')) {
      result.add(word.slice(0, -3)); result.add(word.slice(0, -3) + 'e');
      if (word.at(-4) === word.at(-5)) result.add(word.slice(0, -4));
    }
    if (word.endsWith('ed')) {
      result.add(word.slice(0, -2)); result.add(word.slice(0, -1));
      if (word.endsWith('ied')) result.add(word.slice(0, -3) + 'y');
      if (word.at(-3) === word.at(-4)) result.add(word.slice(0, -3));
    }
  }
  return result;
}
function containsTarget(headword, example) {
  const head = tokens(headword.replace(/\([^)]*\)/g, ''));
  const sentence = tokens(example);
  const variables = new Set(['a', 'b', 'n', 'v', 'ing', 'one', 'ones', 'oneself',
    'someone', 'somebody', 'something', 'somewhere']);
  let cursor = 0;
  return head.every(token => {
    if (variables.has(token) || token.startsWith("one'")
      || (token === 'do' && head.length > 1 && head.at(-1) === 'do')) return true;
    if (token === "it's" && sentence.includes('it') && sentence.includes('is')) return true;
    const expected = forms(token);
    while (cursor < sentence.length) {
      if (Array.from(forms(sentence[cursor++])).some(form => expected.has(form))) return true;
    }
    return false;
  });
}

test('all 5,804 TOEIC entries have usable five-field metadata and original short examples', () => {
  assert.equal(pkg.words.length, 5804);
  assert.equal(byHeadword.size, pkg.words.length);
  pkg.words.forEach(word => {
    // The optional 6th field (other senses) is checked in test/senses.test.js.
    assert.ok(word.length === 5 || word.length === 6, word[0]);
    word.slice(0, 5).forEach(field => assert.ok(typeof field === 'string' && field.trim() === field && field.length, word[0]));
    assert.match(word[2], /^[명동형부전접대감](?:\/[명동형부전접대감])*$/, word[0]);
    assert.equal(new Set(word[2].split('/')).size, word[2].split('/').length, word[0]);
    assert.ok(word[3].split(/\s+/).length <= 15, word[0]);
    assert.ok(containsTarget(word[0], word[3]), word[0] + ': ' + word[3]);
    assert.match(word[1], /[가-힣]/, word[0]);
    assert.match(word[4], /[가-힣]/, word[0]);
    assert.doesNotMatch(word.slice(0, 5).join(''), /[\u0000-\u001f\ue000-\uf8ff\ufffd]/, word[0]);
    assert.doesNotMatch(word[3], /\bthe (?:a|an|the|some|any|each|every|both|either|neither|all|this|that|these|those)\s/i, word[0]);
  });
});

test('original pairs and corrected legacy headword sets survive sorting; content hashes ignore order', () => {
  const snapshot = provenance.postSortValidation;
  // Source ownership and audit decisions identify sets, never current array positions.
  // Golden hashes came from the original snapshots checked against the historical hashes.
  assert.equal(baseWords.length, 260);
  assert.equal(baseWords.length, provenance.base.entryCount);
  assert.equal(hash(sortedWords(baseWords.map(word => word.slice(0, 2)))), snapshot.basePairsSha256);
  assert.equal(legacyHeadwords.size, review.beforeEntryCount);
  assert.equal(legacyWords.length, snapshot.legacyEntryCount);
  assert.equal(hash([...legacyHeadwords].sort()), snapshot.legacyHeadwordsSha256);
  assert.equal(hash(sortedWords(pkg.words.map(word => word.slice(0, 5)))), snapshot.wordsSha256);
  assert.equal(snapshot.entryCount, pkg.words.length);
  assert.equal(provenance.result.entryCount, pkg.words.length);
  assert.equal(provenance.result.completeFiveFieldEntries, pkg.words.length);
  assert.equal(review.afterEntryCount, pkg.words.length);
  assert.equal(review.addedEntryCount, pkg.words.length - review.beforeEntryCount);
});

test('sorted TOEIC words follow the level map and expose five contiguous Day levels', () => {
  const days = Core.chunkDays(pkg.words);
  assert.equal(days.length, 291);
  assert.equal(days.at(-1).length, 4);
  assert.equal(pkg.levels.length, 5);
  assert.deepEqual(pkg.levels.map(level => level.days), [23, 76, 110, 58, 24]);
  assert.deepEqual(pkg.levels.map(level => level.name), levelData.levels);
  assert.equal(pkg.levels.reduce((total, level) => total + level.days, 0), days.length);
  const names = Core.dayLevels(pkg);
  assert.equal(names.length, days.length);
  assert.ok(names.every(name => name !== null));
  assert.deepEqual(names, pkg.levels.flatMap(level => Array(level.days).fill(level.name)));
  assert.deepEqual(new Set(Object.keys(levelData.map)), new Set(pkg.words.map(word => word[0].toLowerCase())));
  let previous = 0;
  pkg.words.forEach(word => {
    const level = levelData.map[word[0].toLowerCase()];
    assert.ok(Number.isInteger(level) && level >= 1 && level <= 5, word[0]);
    assert.ok(level >= previous, 'Level order: ' + word[0]);
    previous = level;
  });
});

test('every web source row has a reproducible disposition and its canonical word exists', () => {
  let rowTotal = 0;
  const newEntries = new Set();
  for (const source of review.sources) {
    assert.equal(source.reviewedRows, source.rows.length);
    assert.equal(source.uncoveredRows, 0);
    const pdf = provenance.sources.find(item => item.id === source.id);
    const distinct = new Set();
    source.rows.forEach(row => {
      let canonical = normalize(row.rawHeadword);
      canonical = normalize(review.sourceAliases[canonical] || canonical);
      canonical = normalize(review.legacyHeadwordCorrections[canonical] || canonical);
      assert.equal(canonical, normalize(row.headword));
      assert.ok(Number.isInteger(row.page) && row.page >= 1 && row.page <= pdf.pdfPageCount);
      const entry = byHeadword.get(canonical);
      assert.ok(entry, row.rawHeadword);
      assert.equal(entry.word[0], row.headword);
      // entryIndex describes the pre-sort audit snapshot, not the current position.
      assert.ok(Number.isInteger(row.entryIndex) && row.entryIndex >= 0 && row.entryIndex < review.afterEntryCount);
      assert.equal(row.decision, row.entryIndex < review.beforeEntryCount ? 'already-present' : 'added');
      assert.equal(row.decision, legacyHeadwords.has(canonical) ? 'already-present' : 'added');
      if (row.decision === 'added') newEntries.add(canonical);
      distinct.add(row.headword);
    });
    assert.equal(distinct.size, source.uniqueCanonicalHeadwords);
    rowTotal += source.rows.length;
    if (source.id !== 'pagoda') {
      assert.deepEqual(source.rows.map(row => row.number), Array.from({ length: source.rows.length }, (_, i) => i + 1));
    } else {
      const counts = [84, 84, 84, 84, 88, 88, 88, 88];
      counts.forEach((count, i) => {
        assert.deepEqual(source.rows.filter(row => row.test === i + 1).map(row => row.number),
          Array.from({ length: count }, (_, j) => j + 1));
      });
    }
  }
  assert.equal(rowTotal, 3097);
  assert.equal(newEntries.size, 1672);
  assert.deepEqual(newEntries, new Set(pkg.words.filter(word => !legacyHeadwords.has(normalize(word[0])))
    .map(word => normalize(word[0]))));
  assert.equal(review.dokjongban.actualNumberedEntries, 2109);
  assert.equal(review.dokjongban.advertisedRangeCovered, 1200);
  // A word may occur on several pages of the same PDF; its primary source is unique.
  const owned = provenance.sources.flatMap(source =>
    [...new Set(Object.values(source.pages).flat().map(canonicalLegacyHeadword))]);
  assert.equal(new Set(owned).size, owned.length);
  const baseHeadwords = new Set(baseWords.map(word => normalize(word[0])));
  assert.deepEqual(new Set(owned), new Set(pkg.words.filter(word => !baseHeadwords.has(normalize(word[0])))
    .map(word => normalize(word[0]))));
});

function storage(state) {
  const values = new Map([['vocab-master-v1', JSON.stringify(state)]]);
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test('corrected headwords preserve known/wrong records, metadata and global Day progress', () => {
  for (const [old, current] of Object.entries(review.legacyHeadwordCorrections)) {
    const oldId = 'toeic:' + old, newId = 'toeic:' + current;
    const state = Core.defaultState();
    state.known[oldId] = true;
    state.progress['toeic:168'] = { studied: true, best: 95 };
    state.wrong[oldId] = { pkg: 'toeic', en: old, ko: '기존 뜻', miss: 3, streak: 1 };
    state.wrong['custom-1:' + old] = { pkg: 'custom-1', en: old, ko: '사용자 뜻', miss: 1, streak: 0 };
    state.known['custom-1:' + old] = true;
    const store = storage(state);
    const loaded = Core.loadState(store);
    assert.equal(loaded.known[newId], true);
    assert.equal(loaded.known[oldId], undefined);
    assert.equal(loaded.wrong[newId].en, current);
    assert.equal(loaded.wrong[newId].miss, 3);
    assert.equal(loaded.wrong[newId].streak, 1);
    assert.equal(loaded.wrong[oldId], undefined);
    assert.equal(loaded.wrong['custom-1:' + old].en, old);
    assert.equal(loaded.known['custom-1:' + old], true);
    assert.deepEqual(loaded.progress, state.progress);
    assert.equal(Core.wordId('toeic', old), newId);
    assert.equal(Core.wordId('custom-1', old), 'custom-1:' + old);
    assert.equal(Core.saveState(store, loaded), true);
    assert.deepEqual(Core.loadState(store), loaded);
    const word = byHeadword.get(current).word;
    Core.recordAnswer(loaded, 'toeic', word, false);
    assert.equal(loaded.wrong[newId].miss, 4);
    assert.deepEqual([loaded.wrong[newId].pos, loaded.wrong[newId].ex, loaded.wrong[newId].exKo], word.slice(2));
    Core.recordAnswer(loaded, 'toeic', [old, '구버전 뜻'], false);
    assert.equal(loaded.wrong[newId].en, current);
    assert.equal(loaded.wrong[oldId], undefined);
  }
});

test('coexisting old/new records merge once without losing metadata or miss counts', () => {
  const old = 'claim refund', current = 'claim a refund';
  const state = Core.defaultState();
  state.wrong['toeic:' + old] = { pkg: 'toeic', en: old, ko: '기존 뜻', pos: '동', miss: 3, streak: 1 };
  state.wrong['toeic:' + current] = { pkg: 'toeic', en: current, ko: '수정 뜻', ex: 'Please claim a refund.', miss: 2, streak: 0 };
  const store = storage(state);
  const loaded = Core.loadState(store);
  assert.equal(Object.keys(loaded.wrong).length, 1);
  assert.deepEqual(loaded.wrong['toeic:' + current], {
    pkg: 'toeic', en: current, ko: '수정 뜻', pos: '동', ex: 'Please claim a refund.', exKo: '', miss: 5, streak: 0
  });
  Core.saveState(store, loaded);
  assert.deepEqual(Core.loadState(store), loaded);
});

console.log(`\n${passed} TOEIC corpus checks passed, ${failed} failed`);
if (failed) process.exitCode = 1;
