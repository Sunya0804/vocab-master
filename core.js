(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Core = factory();
  }
}(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  var STATE_KEY = 'vocab-master-v1';
  // Corrected TOEIC phrases retain records created by older package versions.
  var TOEIC_WORD_ALIASES = {
    'set down to work': 'get down to work',
    'claim refund': 'claim a refund',
    'put a rush': 'put a rush on',
    'take an action against': 'take action against'
  };

  function canonicalWord(pkgId, en) {
    return pkgId === 'toeic' && Object.prototype.hasOwnProperty.call(TOEIC_WORD_ALIASES, en)
      ? TOEIC_WORD_ALIASES[en] : en;
  }

  function migrateToeicAliases(state) {
    Object.keys(TOEIC_WORD_ALIASES).forEach(function (oldWord) {
      var en = TOEIC_WORD_ALIASES[oldWord];
      var oldId = 'toeic:' + oldWord;
      var newId = 'toeic:' + en;
      if (Object.prototype.hasOwnProperty.call(state.known, oldId)) {
        state.known[newId] = state.known[newId] || state.known[oldId];
        delete state.known[oldId];
      }
      var oldEntry = state.wrong[oldId];
      if (!oldEntry || oldEntry.pkg !== 'toeic') return;
      var entry = state.wrong[newId];
      if (entry && entry.pkg !== 'toeic') return;
      if (entry) {
        // Separate old/new records may coexist after an offline package update.
        entry.miss += oldEntry.miss;
        entry.streak = Math.min(entry.streak, oldEntry.streak);
        ['ko', 'pos', 'ex', 'exKo'].forEach(function (key) {
          entry[key] = entry[key] || oldEntry[key];
        });
      } else {
        entry = oldEntry;
        state.wrong[newId] = entry;
      }
      entry.en = en;
      delete state.wrong[oldId];
    });
    return state;
  }

  function chunkDays(words, size = 20) {
    if (!Number.isInteger(size) || size < 1) {
      throw new RangeError('Day size must be a positive integer');
    }
    var days = [];
    for (var i = 0; i < words.length; i += size) {
      days.push(words.slice(i, i + size));
    }
    return days;
  }

  function dayLevels(pkg) {
    var names = new Array(chunkDays(pkg.words).length).fill(null);
    var levels = pkg.levels;
    if (!Array.isArray(levels)) return names;
    // Validate all entries before assigning, including levels beyond the final Day.
    for (var i = 0; i < levels.length; i += 1) {
      var level = levels[i];
      if (!level || typeof level.name !== 'string' || !level.name.trim()
        || !Number.isInteger(level.days) || level.days <= 0) return names;
    }
    var start = 0;
    levels.forEach(function (level, index) {
      var end = index === levels.length - 1 ? names.length : Math.min(names.length, start + level.days);
      names.fill(level.name, start, end);
      start = end;
    });
    return names;
  }

  function wordId(pkgId, word) {
    return pkgId + ':' + canonicalWord(pkgId, Array.isArray(word) ? word[0] : word);
  }

  function shuffle(arr, rand = Math.random) {
    var result = arr.slice();
    for (var i = result.length - 1; i > 0; i -= 1) {
      var j = Math.floor(rand() * (i + 1));
      var temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }

  function makeChoices(answer, pool, n = 4, rand = Math.random) {
    var limit = Math.max(0, Math.floor(n));
    if (!limit) return [];
    var alternatives = Array.from(new Set(pool)).filter(function (item) {
      return item !== answer;
    });
    var choices = [answer].concat(shuffle(alternatives, rand).slice(0, limit - 1));
    return shuffle(choices, rand);
  }

  function buildQuiz(words, mode, pool, rand = Math.random) {
    if (mode !== 'en2ko' && mode !== 'ko2en') {
      throw new RangeError('Unknown quiz mode: ' + mode);
    }
    var answerIndex = mode === 'en2ko' ? 1 : 0;
    var promptIndex = 1 - answerIndex;
    return words.map(function (word) {
      var answers = pool.filter(function (candidate) {
        return candidate[promptIndex] !== word[promptIndex];
      }).map(function (candidate) { return candidate[answerIndex]; });
      return {
        word: word,
        prompt: word[promptIndex],
        answer: word[answerIndex],
        choices: makeChoices(word[answerIndex], answers, 4, rand)
      };
    });
  }

  // Only delimiters outside quoted fields count. Tabs take precedence over commas.
  function findSeparator(line) {
    var quoted = false;
    var comma = -1;
    var tab = -1;
    for (var i = 0; i < line.length; i += 1) {
      if (line[i] === '"') {
        if (quoted && line[i + 1] === '"') i += 1;
        else quoted = !quoted;
      } else if (!quoted) {
        if (line[i] === '\t' && tab === -1) tab = i;
        if (line[i] === ',' && comma === -1) comma = i;
      }
    }
    return { index: tab === -1 ? comma : tab, valid: !quoted };
  }

  function unquote(field) {
    var value = field.trim();
    if (value[0] === '"' && value[value.length - 1] === '"') {
      value = value.slice(1, -1).replace(/""/g, '"');
    }
    return value.trim();
  }

  function splitFields(line, separator) {
    var fields = [];
    var quoted = false;
    var start = 0;
    for (var i = 0; i < line.length; i += 1) {
      if (line[i] === '"') {
        if (quoted && line[i + 1] === '"') i += 1;
        else quoted = !quoted;
      } else if (!quoted && line[i] === separator) {
        fields.push(line.slice(start, i));
        start = i + 1;
      }
    }
    fields.push(line.slice(start));
    return fields;
  }

  function parseImport(text) {
    var words = [];
    var seen = new Set();
    words.duplicates = 0;
    String(text).split(/\r\n|\n|\r/).forEach(function (rawLine) {
      // Preserve tabs until after splitting so an empty English/meaning field stays empty.
      var line = rawLine.replace(/^\uFEFF/, '').replace(/^ +| +$/g, '');
      if (!line.trim() || line.trimStart()[0] === '#') return;
      var separator = findSeparator(line);
      if (!separator.valid) return;
      var fields;
      if (separator.index !== -1) {
        // Comma imports have two fields; only tabs introduce optional metadata.
        fields = line[separator.index] === '\t'
          ? splitFields(line, '\t')
          : [line.slice(0, separator.index), line.slice(separator.index + 1)];
      } else {
        // A phrase such as "take part in 참여하다" keeps the complete English phrase.
        var match = line.match(/^(.+?)\s+([^A-Za-z0-9\s]*[ㄱ-ㅎㅏ-ㅣ가-힣].*)$/)
          || line.match(/^(\S+)\s+(.+)$/);
        if (!match) return;
        fields = [match[1], match[2]];
      }
      fields = fields.slice(0, 5).map(unquote);
      if (!fields[0] || !fields[1]) return;
      var key = fields[0].toLowerCase();
      if (seen.has(key)) {
        words.duplicates += 1;
        return;
      }
      seen.add(key);
      while (fields.length > 2 && fields[fields.length - 1] === '') fields.pop();
      words.push(fields);
    });
    return words;
  }

  function defaultState() {
    return { known: {}, wrong: {}, custom: [], progress: {} };
  }

  // Answer/card actions update the supplied state so UI callers can save that same object.
  function recordAnswer(state, pkgId, word, correct) {
    var id = wordId(pkgId, word);
    var entry = state.wrong[id];
    if (!correct) {
      state.wrong[id] = {
        pkg: pkgId,
        en: canonicalWord(pkgId, word[0]),
        ko: word[1],
        pos: word[2] || '',
        ex: word[3] || '',
        exKo: word[4] || '',
        miss: (entry ? entry.miss : 0) + 1,
        streak: 0
      };
      delete state.known[id];
    } else if (entry) {
      entry.en = canonicalWord(pkgId, word[0]);
      entry.pos = word[2] || '';
      entry.ex = word[3] || '';
      entry.exKo = word[4] || '';
      entry.streak += 1;
      if (entry.streak >= 2) delete state.wrong[id];
    }
    return state;
  }

  function markKnown(state, pkgId, word, known) {
    if (known) {
      state.known[wordId(pkgId, word)] = true;
      recordAnswer(state, pkgId, word, true);
    } else recordAnswer(state, pkgId, word, false);
    return state;
  }

  function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function backupCorrupt(storage, raw) {
    try {
      storage.setItem(STATE_KEY + '-corrupt', raw);
    } catch (error) {
      // A full or blocked storage must not prevent loading the recoverable state.
    }
  }

  function isWrongEntry(entry) {
    return isRecord(entry)
      && typeof entry.pkg === 'string'
      && typeof entry.en === 'string' && typeof entry.ko === 'string'
      && Number.isInteger(entry.miss) && entry.miss >= 0
      && Number.isInteger(entry.streak) && entry.streak >= 0
      && ['pos', 'ex', 'exKo'].every(function (key) {
        return entry[key] === undefined || typeof entry[key] === 'string';
      });
  }

  function loadState(storage) {
    var raw;
    try {
      raw = storage.getItem(STATE_KEY);
    } catch (error) {
      return defaultState();
    }
    if (raw === null || raw === undefined) return defaultState();
    try {
      var parsed = JSON.parse(raw);
      if (!isRecord(parsed)) throw new TypeError('Invalid state');
      var state = defaultState();
      var discarded = false;
      Object.keys(state).forEach(function (key) {
        if (!Object.prototype.hasOwnProperty.call(parsed, key)) return;
        var valid = key === 'custom' ? Array.isArray(parsed[key]) : isRecord(parsed[key]);
        if (valid) state[key] = parsed[key];
        else discarded = true;
      });
      Object.keys(state.wrong).forEach(function (id) {
        var entry = state.wrong[id];
        if (!isWrongEntry(entry)) {
          delete state.wrong[id];
          discarded = true;
        } else {
          // Older two-column records have no optional metadata; migrate without data loss.
          entry.pos = entry.pos || '';
          entry.ex = entry.ex || '';
          entry.exKo = entry.exKo || '';
        }
      });
      if (discarded) backupCorrupt(storage, raw);
      return migrateToeicAliases(state);
    } catch (error) {
      backupCorrupt(storage, raw);
      return defaultState();
    }
  }

  function saveState(storage, state) {
    try {
      storage.setItem(STATE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      return false;
    }
  }

  function selectExamQuestions(questions, count, difficulty = 0, rand = Math.random) {
    if (!Array.isArray(questions)) throw new TypeError('Questions must be an array');
    if (!Number.isInteger(count) || count < 0 || ![0, 1, 2, 3].includes(difficulty)) {
      throw new RangeError('Invalid exam selection');
    }
    var seen = new Set();
    var pool = questions.filter(function (question) {
      if (!question || typeof question.id !== 'string' || ![1, 2, 3].includes(question.difficulty)
        || seen.has(question.id) || (difficulty && question.difficulty !== difficulty)) return false;
      seen.add(question.id);
      return true;
    });
    var size = Math.min(count, pool.length);
    if (difficulty || !size) return shuffle(pool, rand).slice(0, size);
    // Largest remainders preserve the 25/45/30 mix at both 30 and 25 questions.
    var raw = [.25, .45, .30].map(function (weight) { return size * weight; });
    var quotas = raw.map(Math.floor);
    var order = [0, 1, 2].sort(function (a, b) {
      return (raw[b] - quotas[b]) - (raw[a] - quotas[a]) || a - b;
    });
    var extra = size - quotas.reduce(function (sum, value) { return sum + value; }, 0);
    order.slice(0, extra).forEach(function (index) { quotas[index] += 1; });
    var selected = [];
    [1, 2, 3].forEach(function (level, index) {
      selected.push.apply(selected, shuffle(pool.filter(function (question) {
        return question.difficulty === level;
      }), rand).slice(0, quotas[index]));
    });
    // Sample files and filtered banks may lack a level; fill from unused questions.
    var ids = new Set(selected.map(function (question) { return question.id; }));
    selected.push.apply(selected, shuffle(pool.filter(function (question) {
      return !ids.has(question.id);
    }), rand).slice(0, size - selected.length));
    return shuffle(selected, rand);
  }

  function validExamState(value) {
    return isRecord(value) && isRecord(value.answers)
      && Object.entries(value.answers).every(function (pair) {
        var id = pair[0], answer = pair[1];
        return /^p[25]-\d+$/.test(id) && isRecord(answer)
          && typeof answer.correct === 'boolean'
          && (answer.first === undefined || typeof answer.first === 'boolean')
          && Number.isFinite(answer.at) && answer.at >= 0
          && Number.isSafeInteger(answer.tries) && answer.tries > 0;
      });
  }

  function recordExamAnswer(exam, id, correct, at = Date.now()) {
    if (!validExamState(exam) || !/^p[25]-\d+$/.test(id) || typeof correct !== 'boolean'
      || !Number.isFinite(at) || at < 0) throw new TypeError('Invalid exam answer');
    var previous = exam.answers[id];
    var answers = Object.assign({}, exam.answers);
    answers[id] = { correct: correct, first: previous ? previous.first ?? previous.correct : correct, at: at, tries: Math.min(Number.MAX_SAFE_INTEGER, (previous ? previous.tries : 0) + 1) };
    return { answers: answers };
  }

  function examStats(questions, answers) {
    var seen = new Set(), solved = 0, correct = 0, firstCorrect = 0, wrong = [];
    questions.forEach(function (question) {
      if (seen.has(question.id)) return;
      seen.add(question.id);
      var answer = answers[question.id];
      if (!answer || typeof answer.correct !== 'boolean') return;
      solved += 1;
      if (answer.first ?? answer.correct) firstCorrect += 1;
      if (answer.correct) correct += 1;
      else wrong.push(question);
    });
    return { total: seen.size, solved: solved, correct: correct, accuracy: solved ? Math.round(correct / solved * 100) : 0,
      firstCorrect: firstCorrect, firstAccuracy: solved ? Math.round(firstCorrect / solved * 100) : 0, wrong: wrong };
  }

  return {
    selectExamQuestions: selectExamQuestions,
    validExamState: validExamState,
    recordExamAnswer: recordExamAnswer,
    examStats: examStats,
    chunkDays: chunkDays,
    dayLevels: dayLevels,
    wordId: wordId,
    shuffle: shuffle,
    makeChoices: makeChoices,
    buildQuiz: buildQuiz,
    parseImport: parseImport,
    defaultState: defaultState,
    recordAnswer: recordAnswer,
    markKnown: markKnown,
    loadState: loadState,
    saveState: saveState
  };
}));
