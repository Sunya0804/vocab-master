/* UI only. Learning, quiz construction, import parsing and persistence belong to Core. */
(() => {
  'use strict';
  const main = document.querySelector('#main');
  const quizAnnouncement = document.querySelector('#quiz-announcement');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const path = value => encodeURIComponent(value);
  const supportsSpeech = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let Core, state, storage, preferenceStorage, builtins = [], selectedPackage = '', session = null;
  let selectedLevels = Object.create(null);
  let quizTimer, toastTimer, practiceId = 0, meaningsHidden = false, ready = false;
  const draft = {text:'', name:'', words:[]};
  const homePositions = new Map();
  let restoringHome = false, storageRefreshTimer;
  const LISTEN_KEY = 'vocab-master-listen';
  const LISTEN_RATES = [.7, .85, 1, 1.2];
  let listenSettings = {rate:.85, examples:false, repeats:1};
  let listening = null, listenGeneration = 0, listenTimer, listenVoiceCleanup;
  let koreanVoiceWarningShown = false;

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
        preferences.progress['preferences:selection'] = {package:selectedPackage, levels};
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
    }
    return loaded;
  }

  const packages = () => [...builtins, ...state.custom];
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
  const speaker = text => supportsSpeech ? `<button class="icon-button" data-action="speak" data-text="${escape(text)}" aria-label="${escape(text)} 발음 듣기">${icon('volume-2')}</button>` : '';
  const empty = (title, description, href = '#/home', label = '단어장 보기') => `<div class="empty-state"><div class="empty-symbol" aria-hidden="true">${icon('book-open')}</div><h1>${escape(title)}</h1><p>${escape(description)}</p><a class="button-link" href="${escape(href)}">${escape(label)}</a></div>`;

  const posBadge = word => word[2] ? `<span class="pos-badge" aria-label="품사 ${escape(word[2])}">${escape(word[2])}</span>` : '';

  function highlightedExample(word) {
    const stems = (String(word[0]).toLowerCase().match(/[a-z]+/g) || [])
      .map(part => part.length > 4 ? part.replace(/[ey]$/, '') : part);
    // Escape first. Preserve entity tokens intact; only generated <strong> is HTML.
    return escape(word[3] || '').replace(/&(?:amp|lt|gt|quot|#39);|[A-Za-z]+(?:['’\u002d][A-Za-z]+)*/g, token => {
      if (token.startsWith('&')) return token;
      return stems.some(stem => token.toLowerCase().startsWith(stem)) ? `<strong>${token}</strong>` : token;
    });
  }

  function exampleHTML(word, hidden = false, withSpeech = false) {
    if (!word[3] && !word[4]) return '';
    return `<div class="word-example">${word[3] ? `<div class="example-line"><p lang="en">${highlightedExample(word)}</p>${withSpeech ? speaker(word[3]) : ''}</div>` : ''}${word[4] ? `<p class="example-translation" data-meaning ${hidden ? 'hidden' : ''}>${escape(word[4])}</p>` : ''}</div>`;
  }

  function wordHTML(word, hidden = false, withSpeech = false) {
    return `<div class="word-title"><h3 class="english" lang="en">${escape(word[0])}</h3>${posBadge(word)}</div><p data-meaning ${hidden ? 'hidden' : ''}>${escape(word[1])}</p>${exampleHTML(word, hidden, withSpeech)}`;
  }

  function wrongWord(entry) {
    const original = findPackage(entry.pkg)?.words.find(word => word[0] === entry.en);
    return [entry.en, entry.ko, entry.pos || original?.[2] || '', entry.ex || original?.[3] || '', entry.exKo || original?.[4] || ''];
  }

  function speak(text) {
    if (!supportsSpeech) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = .88;
      window.speechSynthesis.speak(utterance);
    } catch (_) { toast('지금은 발음을 재생할 수 없어요.'); }
  }

  function loadListenSettings() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(LISTEN_KEY));
      return {
        rate:LISTEN_RATES.includes(saved?.rate) ? saved.rate : .85,
        examples:typeof saved?.examples === 'boolean' ? saved.examples : false,
        repeats:[1, 2, 3].includes(saved?.repeats) ? saved.repeats : 1
      };
    } catch (_) { return {rate:.85, examples:false, repeats:1}; }
  }

  function saveListenSettings() {
    try { window.localStorage.setItem(LISTEN_KEY, JSON.stringify(listenSettings)); }
    catch (_) { toast('듣기 설정을 저장하지 못했어요. 이번 재생에는 적용돼요.'); }
  }

  function haltListening(status) {
    // Invalidate callbacks before cancel(), which may synchronously fire onend.
    listenGeneration++;
    clearTimeout(listenTimer);
    listenVoiceCleanup?.();
    listenVoiceCleanup = null;
    if (listening) {
      listening.playing = false;
      if (status) listening.status = status;
      if (listening.utterance) {
        listening.utterance.onend = null;
        listening.utterance.onerror = null;
        listening.utterance = null;
      }
    }
    if (supportsSpeech) {
      try { window.speechSynthesis.cancel(); } catch (_) { /* Already stopped. */ }
    }
  }

  const activeListening = token => token === listenGeneration && listening?.playing
    && listening.route === location.hash && !document.hidden;

  function refreshListening() {
    if (!listening || listening.route !== location.hash) return;
    const focused = document.activeElement?.id;
    render();
    if (focused?.startsWith('listen-')) document.getElementById(focused)?.focus({preventScroll:true});
  }

  function listenVoices() {
    try { return window.speechSynthesis.getVoices(); } catch (_) { return []; }
  }

  function readListenWord(token, voices) {
    if (!activeListening(token)) return;
    const currentVoices = listenVoices();
    if (currentVoices.length) voices = currentVoices;
    const word = listening.words[listening.index];
    const voiceFor = language => voices.find(voice => voice.lang.toLowerCase().replace('_', '-') === language.toLowerCase())
      || voices.find(voice => voice.lang.toLowerCase().startsWith(language.slice(0, 2)));
    const korean = voiceFor('ko-KR');
    listening.notice = korean ? '' : '한국어 음성이 없어 뜻과 예문 해석은 건너뛰어요. 기기의 한국어 음성을 설치해 주세요.';
    if (!korean && !koreanVoiceWarningShown) {
      koreanVoiceWarningShown = true;
      toast('한국어 음성이 없어 영어만 읽어요.');
    }
    const queue = Array.from({length:listenSettings.repeats}, () => ({text:word[0], lang:'en-US'}));
    if (korean) queue.push({text:word[1], lang:'ko-KR'});
    if (listenSettings.examples) {
      if (word[3]) queue.push({text:word[3], lang:'en-US'});
      if (word[4] && korean) queue.push({text:word[4], lang:'ko-KR'});
    }
    listening.status = '재생 중 · 영어 단어 → 뜻' + (listenSettings.examples ? ' → 예문 → 해석' : '');
    refreshListening();
    function nextStep(index) {
      if (!activeListening(token)) return;
      if (index >= queue.length) {
        listenTimer = setTimeout(() => {
          if (!activeListening(token)) return;
          if (listening.index === listening.words.length - 1) {
            haltListening('이 Day의 듣기를 마쳤어요. 다시 재생하면 처음부터 시작해요.');
            listening.finished = true;
            refreshListening();
          } else {
            listening.index++;
            readListenWord(token, voices);
          }
        }, 650);
        return;
      }
      const step = queue[index];
      const utterance = new SpeechSynthesisUtterance(step.text);
      utterance.lang = step.lang;
      utterance.rate = listenSettings.rate;
      const voice = voiceFor(step.lang);
      if (voice) utterance.voice = voice;
      // Keep a strong reference until completion, including on engines prone to GC.
      listening.utterance = utterance;
      let settled = false;
      const timeout = setTimeout(() => advance(true), Math.min(60000, Math.max(4000, (String(step.text).length * 180 + 1500) / utterance.rate)));
      listenTimer = timeout;
      function advance(timedOut) {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        utterance.onend = null;
        utterance.onerror = null;
        if (!activeListening(token)) return;
        listening.utterance = null;
        if (timedOut) {
          try { window.speechSynthesis.cancel(); } catch (_) { /* Timeout still advances. */ }
        }
        listenTimer = setTimeout(() => nextStep(index + 1), 150);
      }
      utterance.onend = () => advance(false);
      utterance.onerror = () => advance(false);
      try { window.speechSynthesis.speak(utterance); }
      catch (_) { advance(false); }
    }
    nextStep(0);
  }

  function startListening() {
    if (!supportsSpeech || !listening || document.hidden) return;
    haltListening();
    if (listening.finished) listening.index = 0;
    listening.finished = false;
    listening.playing = true;
    listening.status = '음성을 준비하고 있어요…';
    const token = listenGeneration;
    refreshListening();
    const voices = listenVoices();
    if (voices.length) { readListenWord(token, voices); return; }
    // Voice lists often arrive after page load. Wait briefly before skipping Korean.
    let settled = false;
    const speech = window.speechSynthesis;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      speech.removeEventListener?.('voiceschanged', changed);
      if (listenVoiceCleanup === cleanup) listenVoiceCleanup = null;
      if (activeListening(token)) readListenWord(token, listenVoices());
    };
    const changed = () => { if (listenVoices().length) finish(); };
    const timeout = setTimeout(finish, 800);
    const cleanup = () => {
      settled = true;
      clearTimeout(timeout);
      speech.removeEventListener?.('voiceschanged', changed);
    };
    listenVoiceCleanup = cleanup;
    listenTimer = timeout;
    speech.addEventListener?.('voiceschanged', changed);
  }

  function toggleListening() {
    if (!listening || !supportsSpeech) return;
    if (listening.playing) {
      haltListening('일시정지 · 재생하면 현재 단어부터 다시 들어요.');
      refreshListening();
    } else startListening();
  }

  function moveListening(index, play = listening?.playing) {
    if (!listening || !Number.isInteger(index) || index < 0 || index >= listening.words.length) return;
    haltListening('재생을 누르면 이 단어부터 들어요.');
    listening.index = index;
    listening.finished = false;
    if (play) startListening(); else refreshListening();
  }

  function renderListen(pkg, day) {
    const s = listening, word = s.words[s.index];
    return `${back(dayHash(pkg.id, day), 'Day로 돌아가기')}${intro(pkg.name, `Day ${String(day + 1).padStart(2, '0')} 듣기`, '한 단어씩 듣고, 뜻을 떠올려 보세요.')}
      <div class="session-top"><span class="pill">단어 듣기</span><p id="listen-position">${s.index + 1} / ${s.words.length}</p></div>${meter(s.index + 1, s.words.length, '현재 듣는 단어 위치')}
      <section class="listen-card" aria-label="현재 듣는 단어"><h2 class="english" lang="en">${escape(word[0])}</h2>${posBadge(word)}<p class="listen-meaning" lang="ko">${escape(word[1])}</p>${exampleHTML(word)}</section>
      <p id="listen-status" class="session-note">${supportsSpeech ? escape(s.status) : '이 브라우저는 음성 합성을 지원하지 않아요. 음성을 지원하는 브라우저에서 열어 주세요.'}</p>
      ${s.notice ? `<p class="offline-banner listen-notice">${escape(s.notice)}</p>` : ''}
      <div class="button-row listen-controls"><button id="listen-prev" data-action="listen-prev" aria-label="이전 단어" ${!supportsSpeech || s.index === 0 ? 'disabled' : ''}>${icon('arrow-left')} 이전</button><button id="listen-toggle" class="secondary" data-action="listen-toggle" aria-label="듣기 ${s.playing ? '일시정지' : '재생'}" aria-pressed="${s.playing}" ${!supportsSpeech ? 'disabled' : ''}>${s.playing ? `${icon('pause')} 일시정지` : `${icon('play')} 재생`}</button><button id="listen-next" data-action="listen-next" aria-label="다음 단어" ${!supportsSpeech || s.index === s.words.length - 1 ? 'disabled' : ''}>다음 ${icon('arrow-right')}</button></div>
      <div class="listen-options"><label class="field">재생 속도<select id="listen-rate" ${!supportsSpeech ? 'disabled' : ''}>${LISTEN_RATES.map(rate => `<option value="${rate}" ${rate === listenSettings.rate ? 'selected' : ''}>${rate.toFixed(rate === .85 ? 2 : 1)}×</option>`).join('')}</select></label><label class="field">영어 단어 반복<select id="listen-repeats" ${!supportsSpeech ? 'disabled' : ''}>${[1, 2, 3].map(count => `<option value="${count}" ${count === listenSettings.repeats ? 'selected' : ''}>${count}회</option>`).join('')}</select></label><label class="toggle-label"><input id="listen-examples" type="checkbox" ${listenSettings.examples ? 'checked' : ''} ${!supportsSpeech ? 'disabled' : ''}> 예문과 해석 읽기</label></div>
      <p class="session-note">화면을 벗어나거나 기기가 잠기면 재생이 멈출 수 있어요. 스페이스 키로 재생·일시정지할 수 있어요.</p>
      <div class="section-heading"><h2>듣기 순서</h2><small>단어를 누르면 그 위치부터 재생</small></div><ol class="listen-list">${s.words.map((item, index) => `<li><button id="listen-word-${index}" class="listen-word" data-action="listen-jump" data-index="${index}" ${index === s.index ? 'aria-current="true"' : ''} aria-label="${index + 1}번째 단어 ${escape(item[0])}부터 재생" ${!supportsSpeech ? 'disabled' : ''}><span class="listen-number">${String(index + 1).padStart(2, '0')}</span><span class="listen-word-text"><strong lang="en">${escape(item[0])}</strong><span lang="ko">${escape(item[1])}</span></span>${icon('play')}</button></li>`).join('')}</ol>`;
  }

  function updateNavigation(tab) {
    document.querySelectorAll('[data-tab]').forEach(link => {
      if (link.dataset.tab === tab) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const count = Object.keys(state.wrong).length;
    const badge = document.querySelector('#wrong-badge');
    badge.textContent = count;
    badge.hidden = !count;
  }

  function renderHome() {
    const all = packages();
    const pkg = findPackage(selectedPackage) || all[0];
    if (!pkg) return empty('나만의 단어장을 만들어 볼까요?', '설정에서 텍스트나 파일로 단어를 가져올 수 있어요.', '#/settings', '단어장 가져오기');
    selectedPackage = pkg.id;
    const days = Core.chunkDays(pkg.words);
    const dayLevels = Core.dayLevels(pkg);
    const levels = [...new Set(dayLevels.filter(name => name !== null))];
    const selectedLevel = levels.includes(selectedLevels[pkg.id]) ? selectedLevels[pkg.id] : null;
    const visibleDays = days.map((words, index) => ({words, index}))
      .filter(({index}) => selectedLevel === null || dayLevels[index] === selectedLevel);
    const completed = visibleDays.filter(({index}) => state.progress[`${pkg.id}:${index}`]?.studied).length;
    const nextDay = visibleDays.find(({index}) => !state.progress[`${pkg.id}:${index}`]?.studied)?.index;
    const continueDay = nextDay ?? visibleDays[0]?.index;
    return `${intro('', pkg.name, `${days.length} Days · 하루 20단어`)}
      ${!navigator.onLine ? '<p class="offline-banner">오프라인 학습 중 · 기록은 이 기기에 저장돼요.</p>' : ''}
      <label class="package-picker"><span class="field-label">지금 학습할 단어장</span><select id="package-select" aria-label="단어장 선택">${all.map(item => `<option value="${escape(item.id)}" ${item.id === pkg.id ? 'selected' : ''}>${escape(item.name)}</option>`).join('')}</select></label>
      ${levels.length ? `<div class="level-filter" role="group" aria-label="난이도 레벨 선택"><button class="level-chip" data-action="filter-level" data-level="-1" aria-pressed="${selectedLevel === null}">전체</button>${levels.map((name, index) => `<button class="level-chip" data-action="filter-level" data-level="${index}" aria-pressed="${selectedLevel === name}">${escape(name)}</button>`).join('')}</div>` : ''}
      ${visibleDays.length ? `<section class="hero" aria-label="오늘의 Day 카드"><div class="hero-heading"><h2>오늘의 Day ${String(continueDay + 1).padStart(2, '0')}</h2><span>${days[continueDay].length}단어</span></div><ul class="hero-words">${days[continueDay].slice(0, 3).map(word => `<li><strong lang="en" title="${escape(word[0])}">${escape(word[0])}</strong><span title="${escape(word[1])}">${escape(word[1])}</span></li>`).join('')}</ul><div class="hero-meta"><span>아는 단어</span><span>${days[continueDay].filter(word => isKnown(pkg.id, word)).length} / ${days[continueDay].length}</span></div>${meter(days[continueDay].filter(word => isKnown(pkg.id, word)).length, days[continueDay].length, '아는 단어 비율', false, true)}<a class="button-link primary full continue-learning" href="${dayHash(pkg.id, continueDay)}">${nextDay === undefined ? '다시 학습' : '이어서 학습'} ${icon('arrow-right')}</a></section>` : ''}
      <div class="section-heading"><h2>${selectedLevel === null ? 'Day별 학습' : escape(selectedLevel)}</h2><small>학습 완료 ${completed} / ${visibleDays.length} Days</small></div>
      <div class="day-list">${visibleDays.map(({words, index}, position) => {
        const count = words.filter(word => isKnown(pkg.id, word)).length;
        const progress = state.progress[`${pkg.id}:${index}`];
        const heading = dayLevels[index] !== null && (position === 0 || dayLevels[visibleDays[position - 1].index] !== dayLevels[index])
          ? `<h3 class="level-heading">${escape(dayLevels[index])}</h3>` : '';
        return `${heading}<a class="day-card" href="${dayHash(pkg.id, index)}" aria-label="Day ${index + 1}, ${words.length}단어, 아는 단어 ${count}개, ${progress?.studied ? '학습 완료' : '학습 미완료'}, ${progress?.best != null ? `퀴즈 최고 ${progress.best}점` : '퀴즈 기록 없음'}"><span class="day-number"><small>Day</small>${String(index + 1).padStart(2, '0')}</span><div><div class="day-title"><strong>${escape(words.slice(0, 3).map(word => word[0]).join(' · '))}</strong></div>${meter(count, words.length, '', true, true)}<div class="day-meta"><span>아는 단어 ${count} / ${words.length}</span><span class="score-pill">${progress?.best != null ? `최고 ${progress.best}점` : progress?.studied ? '학습 완료' : ''}</span></div></div><span class="chevron" aria-hidden="true">${icon('chevron-right')}</span></a>`;
      }).join('')}</div>`;
  }

  function renderDay(pkg, day) {
    const words = Core.chunkDays(pkg.words)[day];
    if (!words) return empty('해당 Day를 찾을 수 없어요', '단어장에서 학습할 Day를 선택해 주세요.');
    return `${back('#/home')}${intro(pkg.name, `Day ${String(day + 1).padStart(2, '0')}`, `${words.length}개 단어 · 카드 · 퀴즈 · 듣기`)}
      <div class="stack"><button class="primary" data-action="start-cards" data-pkg="${escape(pkg.id)}" data-day="${day}">카드 학습 시작 ${icon('arrow-right')}</button><div class="button-row"><button data-action="start-quiz" data-pkg="${escape(pkg.id)}" data-day="${day}" data-mode="en2ko">퀴즈 영 ${icon('arrow-right')} 한</button><button data-action="start-quiz" data-pkg="${escape(pkg.id)}" data-day="${day}" data-mode="ko2en">퀴즈 한 ${icon('arrow-right')} 영</button></div><button class="secondary" data-action="start-listen" data-pkg="${escape(pkg.id)}" data-day="${day}" aria-label="Day ${day + 1} 듣기" ${!supportsSpeech ? 'disabled' : ''}>${icon('headphones')} 듣기</button>${!supportsSpeech ? '<p class="session-note">이 브라우저는 음성 합성을 지원하지 않아요.</p>' : ''}</div>
      <div class="section-heading"><h2>오늘의 단어 <span class="pill">${words.length}</span></h2><label class="toggle-label"><input id="hide-meanings" type="checkbox" ${meaningsHidden ? 'checked' : ''}> 뜻 가리기</label></div>
      <ul class="word-list">${words.map((word, index) => `<li class="word-row"><div class="word-content">${wordHTML(word, meaningsHidden, true)}</div>${speaker(word[0])}<label class="check-label"><input type="checkbox" data-action="known" data-pkg="${escape(pkg.id)}" data-day="${day}" data-index="${index}" aria-label="${escape(word[0])} 알아요" ${isKnown(pkg.id, word) ? 'checked' : ''}></label></li>`).join('')}</ul>`;
  }

  function dayItems(pkg, day) {
    return (Core.chunkDays(pkg.words)[day] || []).map(word => ({pkgId:pkg.id, word}));
  }

  function startSession(type, items, options = {}) {
    if (!items.length) { toast('학습할 단어가 없어요.'); return; }
    const route = options.route || `#/practice/${type}/${++practiceId}`;
    const next = {type, route, items, index:0, revealed:false, known:[], unknown:[], missed:[], correct:0, answered:false, selected:null, finished:false, mode:options.mode || 'en2ko', returnHash:options.returnHash || '#/wrong', label:options.label || '오답 복습', dayKey:options.dayKey || null};
    if (type === 'quiz') {
      // Each word uses the FULL pool of its own package, including mixed-package reviews.
      next.questions = Core.shuffle(items.flatMap(item => {
        const pool = findPackage(item.pkgId)?.words || items.filter(candidate => candidate.pkgId === item.pkgId).map(candidate => candidate.word);
        return Core.buildQuiz([item.word], next.mode, pool).map(question => ({...question, pkgId:item.pkgId}));
      }));
      if (!next.questions.length) { toast('퀴즈를 만들 수 있는 단어가 없어요.'); return; }
    }
    session = next;
    if (location.hash === route) render(); else location.hash = route;
  }

  function autoSpeak() {
    if (session?.type === 'cards' && !session.finished && state.settings?.autoSpeak) speak(session.items[session.index].word[0]);
  }

  function completeSession() {
    if (session.finished) return;
    session.finished = true;
    if (session.dayKey) {
      const previous = state.progress[session.dayKey] || {};
      state.progress[session.dayKey] = session.type === 'cards'
        ? {...previous, studied:true}
        : {...previous, best:Math.max(previous.best || 0, Math.round(session.correct / session.questions.length * 100))};
    }
  }

  function renderCards() {
    const s = session;
    if (s.index >= s.items.length) {
      return `${back(s.returnHash, '돌아가기')}${intro('', '카드 학습 결과')}<section class="result-hero"><span class="result-icon" aria-hidden="true">${icon('check')}</span><h2>카드 학습을 마쳤어요</h2><p>${escape(s.label)} · ${s.items.length}단어</p><div class="result-counts"><div><strong>${s.known.length}</strong><span>${icon('check')} 알아요</span></div><div><strong>${s.unknown.length}</strong><span>${icon('rotate-ccw')} 몰라요</span></div></div></section><div class="stack"><button class="secondary" data-action="unknown-quiz" ${!s.unknown.length ? 'disabled' : ''}>모르는 단어 퀴즈${s.unknown.length ? ` · ${s.unknown.length}개` : ''}</button><button data-action="return">돌아가기</button></div>${!s.unknown.length ? '<p class="session-note">모든 단어를 알고 있어요. 퀴즈로도 확인해 보세요.</p>' : '<p class="session-note">모르는 단어는 오답노트에도 모아 두었어요.</p>'}`;
    }
    const item = s.items[s.index];
    return `${back(s.returnHash, '학습 나가기')}<div class="session-top"><span class="pill">${escape(s.label)}</span><p>카드 <strong>${s.index + 1}</strong> / ${s.items.length}</p></div>${meter(s.index, s.items.length, '카드 학습 진행')}
      <section class="study-card ${s.revealed ? 'is-revealed' : ''}" aria-label="학습 카드"><button class="card-face" data-action="reveal" aria-expanded="${s.revealed}" aria-label="${escape(item.word[0])}, ${s.revealed ? escape(item.word[1]) : '탭해서 뜻 보기'}"><span class="eyebrow">${s.revealed ? '뜻 확인' : '뜻 떠올리기'}</span><span class="english" lang="en">${escape(item.word[0])}</span>${s.revealed ? `${posBadge(item.word)}<span class="card-meaning">${escape(item.word[1])}</span>` : '<span class="card-hint">카드를 탭하면 뜻이 나타나요</span>'}</button>${s.revealed ? exampleHTML(item.word, false, true) : ''}</section>
      <div class="card-bottom"><p>${s.revealed ? '알고 있는 단어인지 선택해 주세요' : '뜻을 떠올려 본 뒤 카드를 뒤집어 보세요'}</p>${speaker(item.word[0])}</div>
      <div class="button-row study-actions"><button class="danger-fill" data-action="card-answer" data-known="false">${icon('rotate-ccw')} 몰라요</button><button class="secondary" data-action="card-answer" data-known="true">${icon('check')} 알아요</button></div><p class="session-note">모르는 단어는 오답노트에서 다시 만나요.</p>`;
  }

  function renderQuiz() {
    const s = session;
    if (s.index >= s.questions.length) {
      const score = Math.round(s.correct / s.questions.length * 100);
      return `${back(s.returnHash, '돌아가기')}${intro('', '퀴즈 결과')}<section class="result-hero"><span class="eyebrow">퀴즈 점수</span><div class="result-score">${score}<small> 점</small></div><p>${s.questions.length}문제 중 ${s.correct}개 정답 · ${escape(s.label)}</p></section><div class="stack"><button class="secondary" data-action="retry-quiz" ${!s.missed.length ? 'disabled' : ''}>틀린 것만 다시${s.missed.length ? ` · ${s.missed.length}개` : ''}</button><button data-action="return">돌아가기</button></div><div class="section-heading"><h2>틀린 단어</h2><small>${s.missed.length}개</small></div>${s.missed.length ? `<ul class="word-list">${s.missed.map(item => `<li class="word-row"><div class="word-content">${wordHTML(item.word)}</div>${speaker(item.word[0])}</li>`).join('')}</ul>` : '<p class="session-note">틀린 단어가 없어요. 다음 Day에도 도전해 보세요.</p>'}`;
    }
    const question = s.questions[s.index];
    return `${back(s.returnHash, '퀴즈 나가기')}<div class="session-top"><span class="pill">${s.mode === 'en2ko' ? '영어에서 한국어' : '한국어에서 영어'}</span><p>문제 <strong>${s.index + 1}</strong> / ${s.questions.length}</p></div>${meter(s.index, s.questions.length, '퀴즈 진행')}<div class="quiz-prompt"><span class="eyebrow">${s.mode === 'en2ko' ? '알맞은 뜻을 골라 주세요' : '알맞은 영어 단어를 골라 주세요'}</span><h1 ${s.mode === 'en2ko' ? 'lang="en"' : ''}>${escape(question.prompt)}</h1></div><div class="choices">${question.choices.map((choice, index) => {
      const correct = s.answered && choice === question.answer;
      const incorrect = s.answered && choice === s.selected && choice !== question.answer;
      return `<button class="choice ${correct ? 'correct' : ''} ${incorrect ? 'incorrect' : ''}" data-action="answer" data-index="${index}" aria-disabled="${s.answered}"><span class="choice-number">${index + 1}</span><span class="choice-text">${escape(choice)}</span><span class="choice-result">${correct ? '정답' : incorrect ? '오답' : ''}</span></button>`;
    }).join('')}</div><p class="answer-feedback">${s.answered ? s.selected === question.answer ? '정답이에요' : `정답: ${escape(question.answer)}` : '알맞은 답을 선택해 주세요'}</p><p class="session-note">오답은 2번 연속 맞히면 오답노트에서 졸업해요.</p>`;
  }

  function renderWrong() {
    const entries = wrongEntries();
    return `${intro('', '오답노트', '2번 연속 맞힌 단어는 오답노트에서 빠져요')}<div class="section-heading"><h2>오답노트 <span class="pill">${entries.length}개</span></h2>${entries.length ? '<button class="danger" data-action="clear-wrong">전체 비우기</button>' : ''}</div>${entries.length ? `<div class="button-row"><button class="secondary" data-action="wrong-cards">오답 카드 학습</button><button class="secondary" data-action="wrong-quiz">오답 퀴즈</button></div><p class="session-note">많이 틀린 단어부터 표시해요 · 모든 단어장 통합</p><ul class="word-list">${entries.map(([id, word]) => `<li class="word-row"><div class="word-content">${wordHTML(wrongWord(word))}<small>${escape(findPackage(word.pkg)?.name || '이전 단어장')} · 오답 ${word.miss}회 · 연속 정답 ${word.streak}/2</small></div>${speaker(word.en)}<button class="icon-button danger" data-action="delete-wrong" data-id="${escape(id)}" aria-label="${escape(word.en)} 오답노트에서 삭제">${icon('x')}</button></li>`).join('')}</ul>` : empty('오답노트가 비어 있어요', '학습 중 모르는 단어와 퀴즈에서 틀린 단어가 여기에 모여요.')}`;
  }

  function previewHTML() {
    const duplicateCount = Array.isArray(draft.words.duplicates) ? draft.words.duplicates.length : Number(draft.words.duplicates) || 0;
    const duplicates = duplicateCount ? `<p class="duplicate-note">중복 ${duplicateCount}개 제외</p>` : '';
    if (!draft.text.trim()) return '<span class="muted">단어를 붙여넣으면 가져올 개수를 확인할 수 있어요.</span>';
    if (!draft.words.length) return `<span>가져올 단어가 없어요. 영어와 뜻의 구분을 확인해 주세요.</span>${duplicates}`;
    return `<strong>${draft.words.length}개 단어를 찾았어요</strong>${duplicates}<ul>${draft.words.slice(0, 3).map(word => `<li>${escape(word[0])} · ${escape(word[1])}${word[2] ? ` · ${escape(word[2])}` : ''}</li>`).join('')}</ul>${draft.words.length > 3 ? '<small>외 나머지 단어도 함께 가져와요.</small>' : ''}`;
  }

  function renderSettings() {
    return `${intro('', '설정', '단어장 가져오기 · 학습 환경 · 백업')}<section class="settings-section"><h2>단어장 가져오기</h2><p>영어와 뜻을 탭, 쉼표 또는 공백으로 나눠 주세요. PDF에서 복사한 텍스트도 붙여넣을 수 있어요.</p><p class="import-guide"><code>영단어&lt;TAB&gt;뜻&lt;TAB&gt;품사&lt;TAB&gt;예문&lt;TAB&gt;해석</code><br>뒤 3칸(품사·예문·해석)은 선택이에요. 실제 칸 사이는 탭 키로 구분해 주세요.<br><span class="muted">예: confirm → 확인하다 → 동 → Please confirm the schedule. → 일정을 확인해 주세요.</span></p><form id="import-form"><label class="field">단어장 이름<input id="import-name" maxlength="80" required placeholder="예: 출근길에 외우는 단어" value="${escape(draft.name)}"></label><label class="field">단어 붙여넣기<textarea id="import-text" placeholder="accommodate, 수용하다&#10;confirm, 확인하다&#10;available 이용 가능한" spellcheck="false">${escape(draft.text)}</textarea></label><label class="field">또는 텍스트 파일 선택<input type="file" id="import-file" accept=".txt,.csv,text/plain,text/csv"></label><div id="import-preview" class="preview" role="status" aria-live="polite">${previewHTML()}</div><button id="import-submit" class="secondary full" type="submit" ${!draft.words.length ? 'disabled' : ''}>${draft.words.length ? `${draft.words.length}개 단어 가져오기` : '단어 가져오기'}</button></form></section>
      <section class="settings-section"><h2>가져온 단어장</h2><p>삭제하면 이 단어장의 학습·오답 기록도 함께 지워져요.</p>${state.custom.length ? `<ul>${state.custom.map(pkg => `<li class="custom-row"><div><strong>${escape(pkg.name)}</strong><small>${pkg.words.length}개 단어 · ${Core.chunkDays(pkg.words).length} Days</small></div><button class="danger" data-action="delete-package" data-pkg="${escape(pkg.id)}" aria-label="${escape(pkg.name)} 삭제">삭제</button></li>`).join('')}</ul>` : '<small>아직 가져온 단어장이 없어요.</small>'}</section>
      <section class="settings-section"><h2>학습 환경</h2><label class="toggle-row"><span><strong>카드 자동 발음</strong><span class="toggle-description">${supportsSpeech ? '다음 카드를 열면 영어 발음을 들려줘요.' : '이 브라우저에서는 발음을 지원하지 않아요.'}</span></span><input type="checkbox" id="auto-speak" aria-label="카드 자동 발음" ${state.settings?.autoSpeak ? 'checked' : ''} ${!supportsSpeech ? 'disabled' : ''}></label></section>
      <section class="settings-section"><h2>백업과 복원</h2><p>학습 기록과 가져온 단어장을 JSON 파일로 보관하세요. 복원하면 현재 데이터가 교체돼요.</p><button class="secondary full" data-action="export">백업 내보내기 ${icon('download')}</button><label class="field" style="margin-top:16px">백업 JSON 복원<input id="restore-file" type="file" accept=".json,application/json"></label></section>
      <section class="settings-section"><h2>학습 기록 초기화</h2><p>아는 단어, 오답노트와 Day별 기록을 지워요. 가져온 단어장과 자동 발음 설정은 유지해요.</p><button class="danger full" data-action="reset">학습 기록 초기화</button></section><p class="app-footer">Vocab Master<br>기록은 이 브라우저에 저장됩니다.</p>`;
  }

  function render() {
    if (!ready) return;
    try {
      const parts = (location.hash || '#/home').slice(2).split('/').map(decodeURIComponent);
      const page = parts[0];
      let html;
      if (page === 'home' || !page) html = renderHome();
      else if (page === 'wrong') html = renderWrong();
      else if (page === 'settings') html = renderSettings();
      else if (['day','cards','quiz','listen'].includes(page)) {
        const pkg = findPackage(parts[1]);
        const day = Number(parts[2]);
        if (!pkg || !Number.isInteger(day) || day < 0 || !Core.chunkDays(pkg.words)[day]) {
          if (listening) { haltListening(); listening = null; }
          html = empty('학습할 Day를 찾을 수 없어요', '단어장에서 Day를 다시 선택해 주세요.');
        }
        else if (page === 'listen') {
          selectedPackage = pkg.id;
          if (!listening || listening.route !== location.hash) {
            listening = {route:location.hash, words:Core.chunkDays(pkg.words)[day], index:0, playing:false, finished:false, notice:'', status:'재생을 누르면 첫 단어부터 들어요.'};
          }
          html = renderListen(pkg, day);
        }
        else if (page === 'day') {
          selectedPackage = pkg.id;
          html = renderDay(pkg, day);
        }
        else {
          if (!session || session.route !== location.hash) {
            startSession(page === 'cards' ? 'cards' : 'quiz', dayItems(pkg, day), {route:location.hash, mode:parts[3] === 'ko2en' ? 'ko2en' : 'en2ko', returnHash:dayHash(pkg.id, day), label:`Day ${String(day + 1).padStart(2, '0')}`, dayKey:`${pkg.id}:${day}`});
            return;
          }
          html = page === 'cards' ? renderCards() : renderQuiz();
        }
      } else if (page === 'practice' && session?.route === location.hash) html = session.type === 'cards' ? renderCards() : renderQuiz();
      else html = empty('학습을 새로 시작해 주세요', '이전 복습 화면은 새로고침하면 종료돼요. 저장된 기록은 오답노트에서 확인하세요.', '#/wrong', '오답노트 보기');
      main.innerHTML = html;
      if (page === 'listen') {
        // Share the persistent announcement node outside main with the quiz screen.
        const announcement = listening ? `${listening.index + 1}/${listening.words.length} ${listening.words[listening.index][0]}` : '';
        if (quizAnnouncement.textContent !== announcement) quizAnnouncement.textContent = announcement;
      }
      main.setAttribute('aria-busy', 'false');
      updateNavigation(page === 'settings' ? 'settings' : page === 'wrong' || (page === 'practice' && session?.returnHash === '#/wrong') ? 'wrong' : 'home');
      document.title = `${page === 'settings' ? '설정' : page === 'wrong' ? '오답노트' : page === 'listen' ? '듣기' : page === 'cards' || (page === 'practice' && session?.type === 'cards') ? '카드 학습' : page === 'quiz' || page === 'practice' ? '퀴즈' : page === 'day' ? 'Day 학습' : '단어장'} · Vocab Master`;
    } catch (_) {
      main.innerHTML = empty('화면을 불러오지 못했어요', '단어장으로 돌아가 다시 시도해 주세요.');
      main.setAttribute('aria-busy', 'false');
    }
  }

  function answerQuiz(index) {
    const s = session;
    if (!s || s.type !== 'quiz' || s.answered || s.finished) return;
    const question = s.questions[s.index];
    const choice = question.choices[index];
    if (choice === undefined) return;
    s.answered = true;
    s.selected = choice;
    const correct = choice === question.answer;
    Core.recordAnswer(state, question.pkgId, question.word, correct);
    if (correct) s.correct++;
    else s.missed.push({pkgId:question.pkgId, word:question.word});
    // Save the final score in the same write as the last answer, before the delay.
    if (s.index === s.questions.length - 1) completeSession();
    persist();
    // Keep the existing buttons mounted and focusable while feedback is visible.
    main.querySelectorAll('.choice').forEach((button, choiceIndex) => {
      const value = question.choices[choiceIndex];
      const isCorrect = value === question.answer;
      const isIncorrect = value === choice && !correct;
      button.setAttribute('aria-disabled', 'true');
      button.classList.toggle('correct', isCorrect);
      button.classList.toggle('incorrect', isIncorrect);
      button.querySelector('.choice-result').textContent = isCorrect ? '정답' : isIncorrect ? '오답' : '';
    });
    const feedback = correct ? '정답이에요' : `오답이에요. 정답: ${question.answer}`;
    main.querySelector('.answer-feedback').textContent = feedback;
    quizAnnouncement.textContent = `문제 ${s.index + 1}. ${feedback}`;
    quizTimer = setTimeout(() => {
      if (session !== s || location.hash !== s.route) return;
      s.index++;
      s.answered = false;
      s.selected = null;
      render();
      main.querySelector('.choice, [data-action="retry-quiz"]:not(:disabled), [data-action="return"]')?.focus({preventScroll:true});
    }, 800);
  }

  function reviewItems() { return wrongEntries().map(([, word]) => ({pkgId:word.pkg, word:wrongWord(word)})); }

  main.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    if (!button || button.disabled || !ready) return;
    const {action, pkg:pkgId, day} = button.dataset;
    if (action === 'speak') speak(button.dataset.text);
    else if (action === 'start-listen') location.hash = `#/listen/${path(pkgId)}/${day}`;
    else if (action === 'listen-toggle') toggleListening();
    else if (action === 'listen-prev') moveListening(listening.index - 1);
    else if (action === 'listen-next') moveListening(listening.index + 1);
    else if (action === 'listen-jump') moveListening(Number(button.dataset.index), true);
    else if (action === 'filter-level') {
      const pkg = findPackage(selectedPackage);
      const levels = [...new Set(Core.dayLevels(pkg).filter(name => name !== null))];
      const index = Number(button.dataset.level);
      selectedLevels[pkg.id] = levels[index] ?? null;
      persist({saveSelection:true}); render();
      main.querySelector(`[data-action="filter-level"][data-level="${index}"]`)?.focus({preventScroll:true});
    }
    else if (action === 'start-cards') location.hash = `#/cards/${path(pkgId)}/${day}`;
    else if (action === 'start-quiz') location.hash = `#/quiz/${path(pkgId)}/${day}/${button.dataset.mode}`;
    else if (action === 'reveal') { session.revealed = !session.revealed; render(); main.querySelector('[data-action="reveal"]')?.focus({preventScroll:true}); }
    else if (action === 'card-answer' && session?.type === 'cards' && !session.finished) {
      const item = session.items[session.index];
      const known = button.dataset.known === 'true';
      Core.markKnown(state, item.pkgId, item.word, known);
      session[known ? 'known' : 'unknown'].push(item);
      session.index++;
      session.revealed = false;
      if (session.index >= session.items.length) completeSession();
      persist();
      render();
      autoSpeak();
      main.querySelector('[data-action="reveal"], [data-action="return"]')?.focus({preventScroll:true});
    } else if (action === 'answer') answerQuiz(Number(button.dataset.index));
    else if (action === 'return') location.hash = session.returnHash;
    else if (action === 'unknown-quiz') startSession('quiz', session.unknown, {returnHash:session.returnHash, label:'모르는 단어 복습'});
    else if (action === 'retry-quiz') startSession('quiz', session.missed, {returnHash:session.returnHash, mode:session.mode, label:'틀린 단어 재도전'});
    else if (action === 'wrong-cards') startSession('cards', reviewItems());
    else if (action === 'wrong-quiz') startSession('quiz', reviewItems());
    else if (action === 'delete-wrong') { delete state.wrong[button.dataset.id]; persist(); render(); toast('오답노트에서 지웠어요.'); }
    else if (action === 'clear-wrong' && confirm('오답노트를 모두 비울까요?')) { state.wrong = {}; persist(); render(); toast('오답노트를 비웠어요.'); }
    else if (action === 'delete-package') deletePackage(pkgId);
    else if (action === 'reset' && confirm('아는 단어, 오답노트, Day별 기록을 모두 초기화할까요? 가져온 단어장은 유지됩니다.')) {
      state = {...Core.defaultState(), custom:state.custom, settings:state.settings || {autoSpeak:false}};
      session = null;
      persist(); render(); toast('학습 기록을 초기화했어요.');
    } else if (action === 'export') exportBackup();
  });

  main.addEventListener('change', async event => {
    const target = event.target;
    if (['listen-rate', 'listen-repeats', 'listen-examples'].includes(target.id)) {
      if (!listening) return;
      const wasPlaying = listening.playing;
      haltListening();
      if (target.id === 'listen-rate' && LISTEN_RATES.includes(Number(target.value))) listenSettings.rate = Number(target.value);
      else if (target.id === 'listen-repeats' && [1, 2, 3].includes(Number(target.value))) listenSettings.repeats = Number(target.value);
      else if (target.id === 'listen-examples') listenSettings.examples = target.checked;
      saveListenSettings();
      if (wasPlaying) startListening(); else refreshListening();
    }
    else if (target.id === 'package-select') { selectedPackage = target.value; persist({saveSelection:true}); render(); }
    else if (target.id === 'hide-meanings') {
      meaningsHidden = target.checked;
      main.querySelectorAll('[data-meaning]').forEach(element => { element.hidden = meaningsHidden; });
    } else if (target.dataset.action === 'known') {
      const pkg = findPackage(target.dataset.pkg);
      const word = Core.chunkDays(pkg.words)[Number(target.dataset.day)][Number(target.dataset.index)];
      if (target.checked) state.known[Core.wordId(pkg.id, word[0])] = true;
      else delete state.known[Core.wordId(pkg.id, word[0])];
      persist(); updateNavigation('home');
    } else if (target.id === 'auto-speak') {
      state.settings = {...state.settings, autoSpeak:target.checked};
      persist();
      if (!target.checked && supportsSpeech) window.speechSynthesis.cancel();
    } else if (target.id === 'import-file' && target.files[0]) {
      try {
        const file = target.files[0];
        const content = await file.text();
        if (!target.isConnected) return;
        draft.text = content;
        if (!draft.name) draft.name = file.name.replace(/\.(txt|csv)$/i, '').slice(0, 80);
        main.querySelector('#import-text').value = draft.text;
        main.querySelector('#import-name').value = draft.name;
        updatePreview();
      } catch (_) { toast('파일을 읽지 못했어요. 다시 선택해 주세요.'); }
      finally { if (target.isConnected) target.value = ''; }
    } else if (target.id === 'restore-file' && target.files[0]) {
      await restoreBackup(target.files[0]);
      if (target.isConnected) target.value = '';
    }
  });

  function updatePreview() {
    draft.words = Core.parseImport(draft.text);
    main.querySelector('#import-preview').innerHTML = previewHTML();
    const submit = main.querySelector('#import-submit');
    submit.disabled = !draft.words.length;
    submit.textContent = draft.words.length ? `${draft.words.length}개 단어 가져오기` : '단어 가져오기';
  }

  main.addEventListener('input', event => {
    if (event.target.id === 'import-name') draft.name = event.target.value;
    if (event.target.id === 'import-text') { draft.text = event.target.value; updatePreview(); }
  });

  main.addEventListener('submit', event => {
    if (event.target.id !== 'import-form') return;
    event.preventDefault();
    const name = draft.name.trim();
    const words = Core.parseImport(draft.text);
    if (!name || !words.length) { toast('단어장 이름과 가져올 단어를 확인해 주세요.'); return; }
    let timestamp = Date.now();
    while (findPackage(`custom-${timestamp}`)) timestamp++;
    const pkg = {id:`custom-${timestamp}`, name, desc:'직접 가져온 나만의 단어장', words};
    state.custom.push(pkg);
    selectedPackage = pkg.id;
    if (!persist({saveSelection:true})) { state.custom.pop(); return; }
    draft.text = ''; draft.name = ''; draft.words = [];
    location.hash = '#/home';
    toast(`${words.length}개 단어를 가져왔어요.`);
  });

  function deletePackage(id) {
    const pkg = findPackage(id);
    if (!pkg || !state.custom.some(item => item.id === id) || !confirm(`“${pkg.name}” 단어장과 관련 학습 기록을 삭제할까요?`)) return;
    state.custom = state.custom.filter(item => item.id !== id);
    pkg.words.forEach(word => { delete state.known[Core.wordId(id, word[0])]; });
    Object.keys(state.wrong).forEach(key => { if (state.wrong[key].pkg === id) delete state.wrong[key]; });
    Object.keys(state.progress).forEach(key => { if (key.startsWith(`${id}:`)) delete state.progress[key]; });
    delete selectedLevels[id];
    if (selectedPackage === id) selectedPackage = packages()[0]?.id || '';
    persist({saveSelection:true}); render(); toast('단어장을 삭제했어요.');
  }

  async function exportBackup() {
    const blob = new Blob([JSON.stringify({version:1, exportedAt:new Date().toISOString(), state}, null, 2)], {type:'application/json'});
    const fileName = `vocab-master-${new Date().toISOString().slice(0, 10)}.json`;
    try {
      const mobile = navigator.userAgentData?.mobile === true || window.matchMedia?.('(pointer: coarse)').matches;
      if (mobile && typeof navigator.canShare === 'function' && typeof navigator.share === 'function' && typeof File === 'function') {
        const files = [new File([blob], fileName, {type:'application/json'})];
        if (navigator.canShare({files})) {
          await navigator.share({files, title:'Vocab Master 백업'});
          toast('백업 파일을 공유했어요.');
          return;
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      // If the platform declines file sharing, keep the download available.
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('백업 파일을 내보냈어요.');
  }

  const isObject = value => !!value && typeof value === 'object' && !Array.isArray(value);
  const validPackage = pkg => isObject(pkg) && typeof pkg.id === 'string' && pkg.id.length > 0 && typeof pkg.name === 'string' && pkg.name.trim().length > 0 && Array.isArray(pkg.words) && pkg.words.every(word => Array.isArray(word) && word.length >= 2 && typeof word[0] === 'string' && !!word[0].trim() && typeof word[1] === 'string' && !!word[1].trim());

  class BackupError extends Error {}

  async function restoreBackup(file) {
    try {
      const json = JSON.parse(await file.text());
      if (!isObject(json)) throw new BackupError('백업의 최상위 형식이 올바르지 않아요.');
      if (json.version !== undefined && json.version !== 1) throw new BackupError('지원하지 않는 백업 버전이에요.');
      const value = json.state || json;
      if (!isObject(value) || !isObject(value.known) || !isObject(value.wrong) || !isObject(value.progress) || !Array.isArray(value.custom)) throw new BackupError('백업의 학습 기록 형식이 올바르지 않아요.');
      if (!Object.values(value.known).every(item => typeof item === 'boolean') || !value.custom.every(pkg => validPackage(pkg) && /^custom-\d+$/.test(pkg.id))) throw new BackupError('아는 단어 또는 가져온 단어장의 형식이 올바르지 않아요.');
      if (new Set(value.custom.map(pkg => pkg.id)).size !== value.custom.length) throw new BackupError('가져온 단어장의 식별자가 중복되어 있어요.');
      if (!Object.values(value.wrong).every(item => isObject(item) && typeof item.pkg === 'string' && typeof item.en === 'string' && !!item.en.trim() && typeof item.ko === 'string' && !!item.ko.trim() && Number.isInteger(item.miss) && item.miss >= 0 && Number.isInteger(item.streak) && item.streak >= 0)) throw new BackupError('오답노트 항목의 형식이 올바르지 않아요.');
      for (const item of Object.values(value.wrong)) {
        for (const [key, label] of [['pos', '품사'], ['ex', '영어 예문'], ['exKo', '예문 해석']]) {
          if (item[key] !== undefined && typeof item[key] !== 'string') throw new BackupError(`오답노트의 ${label} 값은 문자열이어야 해요.`);
        }
      }
      if (!Object.values(value.progress).every(item => isObject(item) && (item.studied === undefined || typeof item.studied === 'boolean') && (item.best === undefined || Number.isFinite(item.best) && item.best >= 0 && item.best <= 100))) throw new BackupError('학습 진행 기록의 형식이 올바르지 않아요.');
      if (value.settings !== undefined && (!isObject(value.settings) || typeof value.settings.autoSpeak !== 'boolean')) throw new BackupError('자동 발음 설정이 올바르지 않아요.');
      if (!confirm('백업으로 복원할까요? 현재 학습 기록과 가져온 단어장이 백업 내용으로 교체됩니다.')) return;
      // Feed the validated payload through Core's storage boundary as well.
      const restored = Core.loadState({getItem:key => key === 'vocab-master-v1' ? JSON.stringify(value) : null, setItem:() => {}});
      const previous = state;
      state = restored;
      state.settings = value.settings || {autoSpeak:false};
      if (!persist()) { state = previous; return; }
      session = null; render(); toast('백업을 복원했어요.');
    } catch (error) {
      const reason = error instanceof SyntaxError ? 'JSON 형식이 아니에요. 백업 JSON 파일을 선택해 주세요.'
        : error instanceof BackupError ? error.message : '파일을 읽거나 복원하지 못했어요. 백업 파일을 다시 확인해 주세요.';
      toast(`백업을 복원하지 못했어요. ${reason}`);
    }
  }

  window.addEventListener('hashchange', event => {
    const destination = new URL(event.newURL).hash;
    clearTimeout(quizTimer);
    if (listening) {
      haltListening();
      if (listening.route !== destination) listening = null;
    } else if (supportsSpeech) window.speechSynthesis.cancel();
    // Rapid back/forward navigation can queue several events before rendering.
    // Honor each departure, then render only the most recent destination.
    if (session && session.route !== destination) session = null;
    if (destination !== location.hash) return;
    if (session?.answered) session = null;
    quizAnnouncement.textContent = '';
    render();
    autoSpeak();
    main.focus({preventScroll:true});
    if (destination === '#/home') {
      const position = homePositions.get(selectedPackage) || 0;
      restoringHome = true;
      window.scrollTo(0, position);
      requestAnimationFrame(() => {
        if (location.hash === '#/home') window.scrollTo(0, position);
        restoringHome = false;
      });
    } else window.scrollTo(0, 0);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && listening?.playing) {
      haltListening('화면을 벗어나 일시정지했어요. 재생하면 현재 단어부터 다시 들어요.');
      refreshListening();
    }
  });
  window.addEventListener('pagehide', () => {
    if (listening) {
      haltListening('화면을 벗어나 일시정지했어요. 재생하면 현재 단어부터 다시 들어요.');
      refreshListening();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.code !== 'Space' || event.repeat || event.altKey || event.ctrlKey || event.metaKey
      || !listening || listening.route !== location.hash || !supportsSpeech) return;
    if (event.target.closest('button, a, summary, [role="button"], input, select, textarea, [contenteditable]')) return;
    event.preventDefault();
    toggleListening();
  });
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('scroll', () => {
    if (location.hash === '#/home' && !restoringHome) homePositions.set(selectedPackage, window.scrollY);
  }, {passive:true});
  document.addEventListener('click', event => {
    if (location.hash === '#/home' && event.target.closest('a[href^="#/"]')) homePositions.set(selectedPackage, window.scrollY);
  }, true);
  window.addEventListener('storage', event => {
    if (!ready || event.storageArea !== storage || ![null, 'vocab-master-v1', 'vocab-master-preferences-v1'].includes(event.key)) return;
    clearTimeout(storageRefreshTimer);
    storageRefreshTimer = setTimeout(() => {
      const activeId = document.activeElement?.id;
      const choiceIndex = document.activeElement?.dataset.index;
      const position = window.scrollY;
      const nextState = loadSavedState();
      // Selection-only preference changes need no redraw or synchronization toast.
      if (JSON.stringify(nextState) === JSON.stringify(state)) return;
      state = nextState;
      render();
      const focused = activeId ? document.getElementById(activeId) : choiceIndex !== undefined ? main.querySelector(`.choice[data-index="${choiceIndex}"]`) : null;
      focused?.focus({preventScroll:true});
      window.scrollTo(0, position);
      if (!state.settings.autoSpeak && supportsSpeech && !listening?.playing) window.speechSynthesis.cancel();
      toast('다른 탭의 변경 내용을 반영했어요.');
    }, 0);
  });
  window.addEventListener('offline', () => toast('오프라인이에요. 저장된 단어장은 계속 학습할 수 있어요.'));
  window.addEventListener('online', () => toast('다시 연결되었어요.'));

  async function init() {
    Core = window.Core;
    const required = ['chunkDays','dayLevels','wordId','shuffle','buildQuiz','parseImport','defaultState','recordAnswer','markKnown','loadState','saveState'];
    if (!Core || required.some(name => typeof Core[name] !== 'function')) {
      main.innerHTML = empty('학습 기능을 준비하고 있어요', 'Core 모듈이 준비되면 새로고침해 주세요.');
      main.setAttribute('aria-busy', 'false');
      return;
    }
    try {
      storage = window.localStorage;
      preferenceStorage = {
        getItem: key => storage.getItem(key.replace('vocab-master-v1', 'vocab-master-preferences-v1')),
        setItem: (key, value) => storage.setItem(key.replace('vocab-master-v1', 'vocab-master-preferences-v1'), value)
      };
      state = loadSavedState({restoreSelection:true});
      listenSettings = loadListenSettings();
    } catch (_) {
      main.innerHTML = empty('저장 공간에 접근할 수 없어요', '브라우저에서 이 사이트의 저장 공간을 허용한 뒤 새로고침해 주세요.');
      main.setAttribute('aria-busy', 'false');
      return;
    }
    try {
      const response = await fetch('./packages/index.json');
      if (!response.ok) throw new Error('Package index unavailable');
      const files = await response.json();
      if (!Array.isArray(files)) throw new Error('Invalid package index');
      const results = await Promise.allSettled(files.map(async filename => {
        if (typeof filename !== 'string' || !/^[\w.-]+\.json$/.test(filename)) throw new Error('Invalid package filename');
        const response = await fetch(`./packages/${filename}`);
        if (!response.ok) throw new Error('Package unavailable');
        const pkg = await response.json();
        if (!validPackage(pkg)) throw new Error('Invalid package');
        return pkg;
      }));
      builtins = results.filter(result => result.status === 'fulfilled').map(result => result.value);
      if (results.some(result => result.status === 'rejected')) toast('일부 단어장을 불러오지 못했어요. 연결 후 새로고침해 주세요.');
    } catch (_) { toast('기본 단어장을 불러오지 못했어요. 연결 후 새로고침해 주세요.'); }
    ready = true;
    if (!location.hash || location.hash === '#main') history.replaceState(null, '', '#/home');
    render();
    autoSpeak();
    if ('serviceWorker' in navigator && ['http:', 'https:'].includes(location.protocol)) {
      navigator.serviceWorker.register('./sw.js').catch(() => toast('오프라인 준비에 실패했어요. 온라인 학습은 계속할 수 있어요.'));
    }
  }
  init();
})();
