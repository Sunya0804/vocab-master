/* Shared state and helpers: escaping, icons, toast, storage, package lookup, word rendering and speech. */
  'use strict';
  const main = document.querySelector('#main');
  const quizAnnouncement = document.querySelector('#quiz-announcement');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const path = value => encodeURIComponent(value);
  const supportsSpeech = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let Core, state, storage, preferenceStorage, builtins = [], selectedPackage = '', session = null;
  let selectedLevels = Object.create(null);
  // Last wordbook per language name, so the language switch returns to it.
  let selectedByLanguage = Object.create(null);
  let quizTimer, toastTimer, practiceId = 0, meaningsHidden = false, ready = false;
  const draft = {text:'', name:'', words:[]};
  const homePositions = new Map();
  let restoringHome = false, storageRefreshTimer;
  function toast(message) {
    clearTimeout(toastTimer);
    const element = document.querySelector('#toast');
    element.textContent = message;
    element.hidden = false;
    toastTimer = setTimeout(() => { element.hidden = true; }, 3600);
  }

  function persist({saveSelection = false} = {}) {
    let previous;
    try {
      previous = ['vocab-master-v1', 'vocab-master-preferences-v1'].map(key => [key, storage.getItem(key)]);
      if (Core.saveState(storage, state) === false) throw new Error('Storage unavailable');
      // Core normalizes the four SPEC state fields. Use the same Core storage
      // wrapper with a separate namespace for this UI-only preference.
      const preferences = Core.loadState(preferenceStorage);
      if (state.settings?.autoSpeak) preferences.known['preferences:autoSpeak'] = true;
      else delete preferences.known['preferences:autoSpeak'];
      // Learning in another tab must not replace the last deliberate selection.
      if (saveSelection) {
        const saved = preferences.progress['preferences:selection'];
        const levels = isObject(saved?.levels) ? {...saved.levels} : {};
        levels[selectedPackage] = selectedLevels[selectedPackage] ?? null;
        const languages = isObject(saved?.languages) ? {...saved.languages} : {};
        if (findPackage(selectedPackage)) languages[languageName(selectedPackage)] = selectedPackage;
        selectedByLanguage = Object.assign(Object.create(null), languages);
        preferences.progress['preferences:selection'] = {package:selectedPackage, levels, languages};
      }
      if (Core.saveState(preferenceStorage, preferences) === false) throw new Error('Preferences unavailable');
      return true;
    } catch (_) {
      // Compensate a partial two-key write, preserving the exact pre-write bytes.
      if (previous) for (const [key, raw] of previous) {
        try {
          if (storage.getItem(key) === raw) continue;
          if (raw === null) storage.removeItem(key); else storage.setItem(key, raw);
        } catch (_) { /* Leave the original failure visible below. */ }
      }
      toast('기록을 저장하지 못했어요. 저장 공간과 브라우저 설정을 확인해 주세요.');
      return false;
    }
  }

  function loadSavedState({restoreSelection = false} = {}) {
    const loaded = Core.loadState(storage);
    const preferences = Core.loadState(preferenceStorage);
    loaded.settings = {autoSpeak:!!preferences.known['preferences:autoSpeak']};
    // Restore shared defaults only on startup; live UI choices belong to this tab.
    if (restoreSelection) {
      const selection = preferences.progress['preferences:selection'];
      selectedPackage = typeof selection?.package === 'string' ? selection.package : '';
      selectedLevels = Object.create(null);
      if (isObject(selection?.levels)) {
        for (const [pkgId, level] of Object.entries(selection.levels)) {
          if (level === null || typeof level === 'string') selectedLevels[pkgId] = level;
        }
      }
      selectedByLanguage = Object.create(null);
      if (isObject(selection?.languages)) {
        for (const [name, pkgId] of Object.entries(selection.languages)) if (typeof pkgId === 'string') selectedByLanguage[name] = pkgId;
      }
    }
    return loaded;
  }

  const packages = () => [...builtins, ...state.custom];
  // Built-ins start as index entries {file, id, name, lang?, languageName?}; words arrive when a screen needs them.
  const packageReady = pkg => Array.isArray(pkg?.words);
  const packageLoads = Object.create(null);
  function loadPackages(ids) {
    return Promise.all(ids.map(id => {
      const entry = builtins.find(pkg => pkg.id === id);
      if (!entry || packageReady(entry)) return null;
      return packageLoads[id] ||= (async () => {
        try {
          const response = await fetch(`./packages/${entry.file}`);
          if (!response.ok) throw new Error('Package unavailable');
          const pkg = await response.json();
          if (!validPackage(pkg) || pkg.id !== id) throw new Error('Invalid package');
          builtins[builtins.indexOf(entry)] = pkg;
        } catch (_) { entry.failed = true; }
        finally { delete packageLoads[id]; }
      })();
    }));
  }
  const findPackage = id => packages().find(pkg => pkg.id === id);
  const wrongEntries = () => Object.entries(state.wrong).sort((a, b) => b[1].miss - a[1].miss || a[1].en.localeCompare(b[1].en));
  const isKnown = (pkg, word) => !!state.known[Core.wordId(pkg, word[0])];
  const dayHash = (pkg, day) => `#/day/${path(pkg)}/${day}`;
  const iconPaths = {
    'arrow-left':'<path d="m12 19-7-7 7-7M5 12h14"/>',
    'arrow-right':'<path d="M5 12h14m-7-7 7 7-7 7"/>',
    'chevron-right':'<path d="m9 18 6-6-6-6"/>',
    'volume-2':'<path d="m11 5-6 4H2v6h3l6 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13"/>',
    'headphones':'<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><rect x="3" y="12" width="4" height="9" rx="2"/><rect x="17" y="12" width="4" height="9" rx="2"/>',
    'book-open':'<path d="M12 7v14m0-14C9 4 5 4 2 4v15c4 0 7 0 10 2 3-2 6-2 10-2V4c-3 0-7 0-10 3Z"/>',
    'rotate-ccw':'<path d="M3 10a9 9 0 1 1 2.5 8.5M3 4v6h6"/>',
    'check':'<path d="m20 6-11 11-5-5"/>',
    'x':'<path d="m18 6-12 12M6 6l12 12"/>',
    'play':'<path d="m6 3 14 9-14 9V3Z"/>',
    'pause':'<path d="M8 4v16M16 4v16"/>',
    'download':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>'
  };
  const icon = name => `<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${iconPaths[name]}</svg>`;
  const back = (href, text = '단어장으로') => `<a class="back-link" href="${escape(href)}">${icon('arrow-left')} ${escape(text)}</a>`;
  const intro = (eyebrow, title, description = '') => `<div class="page-intro">${eyebrow ? `<span class="eyebrow">${escape(eyebrow)}</span>` : ''}<h1>${escape(title)}</h1>${description ? `<p>${escape(description)}</p>` : ''}</div>`;
  const meter = (current, total, label, decorative = false, known = false) => `<div class="progress-track${known ? ' known-progress' : ''}" ${decorative ? 'aria-hidden="true"' : `role="progressbar" aria-label="${escape(label)}" aria-valuemin="0" aria-valuemax="${total || 1}" aria-valuenow="${current}"`}><span style="width:${total ? Math.round(current / total * 100) : 0}%"></span></div>`;
  const packageLang = pkgId => findPackage(pkgId || selectedPackage)?.lang || 'en-US';
  const languageName = pkgId => findPackage(pkgId || selectedPackage)?.languageName || '영어';
  const languageShort = pkgId => packageLang(pkgId).startsWith('de') ? '독' : '영';
  const speaker = (text, pkgId) => supportsSpeech ? `<button class="icon-button" data-action="speak" data-text="${escape(text)}" data-lang="${escape(packageLang(pkgId))}" aria-label="${escape(text)} 발음 듣기">${icon('volume-2')}</button>` : '';
  const empty = (title, description, href = '#/home', label = '단어장 보기') => `<div class="empty-state"><div class="empty-symbol" aria-hidden="true">${icon('book-open')}</div><h1>${escape(title)}</h1><p>${escape(description)}</p><a class="button-link" href="${escape(href)}">${escape(label)}</a></div>`;

  const posBadge = word => word[2] ? `<span class="pos-badge" aria-label="품사 ${escape(word[2])}">${escape(word[2])}</span>` : '';

  function highlightedExample(word, pkgId) {
    const stems = Core.exampleStems(word[0], packageLang(pkgId).startsWith('de'));
    // Escape first. Preserve entity tokens intact; only generated <strong> is HTML.
    return escape(word[3] || '').replace(/&(?:amp|lt|gt|quot|#39);|\p{L}+(?:['’\u002d]\p{L}+)*/gu, token => {
      if (token.startsWith('&')) return token;
      return stems.some(stem => token.toLowerCase().startsWith(stem)) ? `<strong>${token}</strong>` : token;
    });
  }

  // One cloze per word: picks the main example or one of the other senses' examples at random.
  // exWord carries the chosen example in slots 3-4; sense is '' for the main example.
  function clozeFor(item) {
    const german = packageLang(item.pkgId).startsWith('de');
    const options = [['', item.word[3], item.word[4]], ...Core.wordSenses(item.word)].map(([sense, ex, exKo]) => {
      const exWord = [item.word[0], item.word[1], item.word[2], ex, exKo];
      const cloze = Core.clozeExample(exWord, german);
      return cloze && {cloze, exWord, sense};
    }).filter(Boolean);
    return options.length ? options[Math.floor(Math.random() * options.length)] : null;
  }

  function exampleHTML(word, hidden = false, withSpeech = false, pkgId) {
    if (!word[3] && !word[4]) return '';
    return `<div class="word-example">${word[3] ? `<div class="example-line"><p lang="${escape(packageLang(pkgId))}">${highlightedExample(word, pkgId)}</p>${withSpeech ? speaker(word[3], pkgId) : ''}</div>` : ''}${word[4] ? `<p class="example-translation" lang="ko" data-meaning ${hidden ? 'hidden' : ''}>${escape(word[4])}</p>` : ''}</div>`;
  }

  function sensesHTML(word, hidden = false, withSpeech = false, pkgId) {
    const senses = Core.wordSenses(word);
    if (!senses.length) return '';
    return `<div class="word-senses"><p class="senses-label">다른 뜻</p><ul>${senses.map(([sense, ex, exKo]) => `<li><p class="sense-meaning" lang="ko" data-meaning ${hidden ? 'hidden' : ''}>${escape(sense)}</p>${exampleHTML([word[0], sense, '', ex, exKo], hidden, withSpeech, pkgId)}</li>`).join('')}</ul></div>`;
  }

  function wordGrammarHTML(word, pkgId, hidden = false) {
    const info = findPackage(pkgId || selectedPackage)?.wordInfo?.[word[0]];
    if (!info || typeof info !== 'object') return '';
    const details = [];
    if (info.cefr) details.push(`목록 기준 ${info.cefr}`);
    if (info.pluralOnly) details.push('복수형 명사');
    else if (info.article) details.push(({der:'남성', die:'여성', das:'중성'})[info.article] || info.article);
    if (Array.isArray(info.plural) && info.plural.length) details.push(`복수: ${info.plural.join(' / ')}`);
    else if (info.singularOnly) details.push('이 뜻에서는 단수로 사용');
    else if (info.pluralNote) details.push(info.pluralNote);
    if (info.reflexive) details.push('재귀 용법 있음');
    if (info.boundForm) details.push('활용·결합 어간');
    if (Array.isArray(info.regions)) details.push(info.regions.map(region => ({D:'독일', A:'오스트리아', CH:'스위스'})[region] || region).join('·'));
    if (info.usage) details.push(info.usage);
    return details.length ? `<p class="word-grammar" lang="ko" data-meaning ${hidden ? 'hidden' : ''}>${escape(details.join(' · '))}</p>` : '';
  }

  function wordHTML(word, hidden = false, withSpeech = false, pkgId) {
    return `<div class="word-title"><h3 class="english" lang="${escape(packageLang(pkgId))}">${escape(word[0])}</h3>${posBadge(word)}</div><p data-meaning ${hidden ? 'hidden' : ''}>${escape(word[1])}</p>${wordGrammarHTML(word, pkgId, hidden)}${exampleHTML(word, hidden, withSpeech, pkgId)}${sensesHTML(word, hidden, withSpeech, pkgId)}`;
  }

  function wrongWord(entry) {
    const original = findPackage(entry.pkg)?.words.find(word => word[0] === entry.en);
    return [entry.en, entry.ko, entry.pos || original?.[2] || '', entry.ex || original?.[3] || '', entry.exKo || original?.[4] || '', original?.[5]];
  }

  function speak(text, language = 'en-US') {
    if (!supportsSpeech) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(Core.spokenText(text));
      utterance.lang = language;
      utterance.rate = .88;
      const voices = listenVoices(), voice = speechVoice(voices, language);
      if (voice) utterance.voice = voice;
      warnMissingVoice(language, voices, voice);
      window.speechSynthesis.speak(utterance);
    } catch (_) { toast('지금은 발음을 재생할 수 없어요.'); }
  }

  function cancelSpeech() {
    if (supportsSpeech) try { window.speechSynthesis.cancel(); } catch (_) { /* Already stopped. */ }
  }

  function listenVoices() {
    try { return window.speechSynthesis.getVoices(); } catch (_) { return []; }
  }

  const speechVoice = (voices, language) => voices.find(voice => voice.lang.toLowerCase().replace('_', '-') === language.toLowerCase())
    || voices.find(voice => voice.lang.toLowerCase().startsWith(language.slice(0, 2)));

  // Once per session; an empty list means voices are still loading, not missing.
  let germanVoiceWarningShown = false;
  function warnMissingVoice(language, voices, voice) {
    if (voice || !voices.length || !language.startsWith('de') || germanVoiceWarningShown) return;
    germanVoiceWarningShown = true;
    toast('이 기기에 독일어 음성이 없어 다른 음성으로 읽어요. 기기 설정에서 독일어 음성을 추가할 수 있어요.');
  }

