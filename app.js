/* Routing, event delegation and init. UI only: learning, quiz construction, import parsing and persistence belong to Core. */
  'use strict';
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

  function render() {
    if (!ready) return;
    try {
      const parts = (location.hash || '#/home').slice(2).split('/').map(decodeURIComponent);
      const page = parts[0];
      // Fetch only the built-in packages this screen reads; show the loading state meanwhile.
      const needed = page === 'home' || !page ? [(findPackage(selectedPackage) || packages()[0])?.id]
        : ['day','cards','quiz','cloze','listen'].includes(page) ? [parts[1]]
        : page === 'wrong' ? [...new Set(Object.values(state.wrong).map(entry => entry.pkg))] : [];
      const pending = builtins.filter(pkg => needed.includes(pkg.id) && !packageReady(pkg));
      if (pending.some(pkg => pkg.failed)) {
        pending.forEach(pkg => { delete pkg.failed; });
        main.innerHTML = `<div class="empty-state"><h1>단어장을 불러오지 못했어요</h1><p>연결을 확인한 뒤 다시 시도해 주세요. 한 번 연 단어장은 오프라인에서도 열려요.</p><button class="primary" data-action="reload-packages">다시 시도</button></div>`;
        main.setAttribute('aria-busy', 'false');
        return;
      }
      if (pending.length) {
        main.innerHTML = '<div class="empty-state"><h1>단어장을 준비하고 있어요</h1><p>단어장 불러오는 중</p></div>';
        main.setAttribute('aria-busy', 'true');
        void loadPackages(pending.map(pkg => pkg.id)).then(render);
        return;
      }
      let html;
      if (page === 'home' || !page) html = renderHome();
      else if (page === 'wrong') html = renderWrong();
      else if (page === 'settings') html = renderSettings();
      else if (page === 'exam') html = parts[1] === 'mock' ? renderMock(Number(parts[2]), parts[3]) : parts[1] ? renderExamPage(Number(parts[1]), parts[2] || 'set') : renderExamHome();
      else if (['day','cards','quiz','cloze','listen'].includes(page)) {
        const pkg = findPackage(parts[1]);
        const day = Number(parts[2]);
        if (!pkg || !Number.isInteger(day) || day < 0 || !Core.chunkDays(pkg.words)[day]) {
          if (listening) { haltListening(); listening = null; }
          html = empty('학습할 Day를 찾을 수 없어요', '단어장에서 Day를 다시 선택해 주세요.');
        }
        else if (page === 'listen') {
          selectedPackage = pkg.id;
          if (!listening || listening.route !== location.hash) {
            listening = {route:location.hash, pkgId:pkg.id, words:Core.chunkDays(pkg.words)[day], index:0, playing:false, finished:false, notice:'', status:'재생을 누르면 첫 단어부터 들어요.'};
          }
          html = renderListen(pkg, day);
        }
        else if (page === 'day') {
          selectedPackage = pkg.id;
          html = renderDay(pkg, day);
        }
        else {
          if (!session || session.route !== location.hash) {
            // Cloze scores stay out of the Day's quiz best record.
            startSession(page, dayItems(pkg, day), {route:location.hash, mode:parts[3] === 'ko2en' ? 'ko2en' : 'en2ko', returnHash:dayHash(pkg.id, day), label:`Day ${String(day + 1).padStart(2, '0')}`, dayKey:page === 'cloze' ? null : `${pkg.id}:${day}`});
            return;
          }
          html = renderSession();
        }
      } else if (page === 'practice' && session?.route === location.hash) html = renderSession();
      else html = empty('학습을 새로 시작해 주세요', '이전 복습 화면은 새로고침하면 종료돼요. 저장된 기록은 오답노트에서 확인하세요.', '#/wrong', '오답노트 보기');
      main.innerHTML = html;
      if (page === 'listen') {
        // Share the persistent announcement node outside main with the quiz screen.
        const announcement = listening ? `${listening.index + 1}/${listening.words.length} ${listening.words[listening.index][0]}` : '';
        if (quizAnnouncement.textContent !== announcement) quizAnnouncement.textContent = announcement;
      }
      if (page === 'exam' && examSession?.route === location.hash && !examSession.answered && examSession.questions.length) {
        const announcement = `Part ${examSession.part} ${examSession.index + 1}/${examSession.questions.length} ${EXAM_PARTS[examSession.part].sets ? '세트' : '문제'}`;
        if (quizAnnouncement.textContent !== announcement) quizAnnouncement.textContent = announcement;
      }
      main.setAttribute('aria-busy', 'false');
      updateNavigation(page === 'exam' ? 'exam' : page === 'settings' ? 'settings' : page === 'wrong' || (page === 'practice' && session?.returnHash === '#/wrong') ? 'wrong' : 'home');
      document.title = `${page === 'exam' ? '문제' : page === 'settings' ? '설정' : page === 'wrong' ? '오답노트' : page === 'listen' ? '듣기' : page === 'cards' || (page === 'practice' && session?.type === 'cards') ? '카드 학습' : page === 'cloze' || (page === 'practice' && session?.type === 'cloze') ? '예문 빈칸' : page === 'quiz' || page === 'practice' ? '퀴즈' : page === 'day' ? 'Day 학습' : '단어장'} · Vocab Master`;
    } catch (_) {
      main.innerHTML = empty('화면을 불러오지 못했어요', '단어장으로 돌아가 다시 시도해 주세요.');
      main.setAttribute('aria-busy', 'false');
    }
  }

  main.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    if (!button || button.disabled || !ready) return;
    const {action, pkg:pkgId, day} = button.dataset;
    if (action === 'speak') speak(button.dataset.text, button.dataset.lang);
    else if (action === 'reload-packages') render();
    else if (action === 'exam-level') { const level = Number(button.dataset.level); if ([0, 1, 2, 3].includes(level)) { examDifficulty = level; render(); } }
    else if (action === 'exam-start') startExam(Number(button.dataset.part), button.dataset.mode);
    else if (action === 'exam-reload') { void loadExamBank(Number(button.dataset.part)); render(); }
    else if (action === 'exam-answer') answerExam(Number(button.dataset.index));
    else if (action === 'exam-pick') pickExam(Number(button.dataset.q), Number(button.dataset.index));
    else if (action === 'exam-grade') gradeExamSet();
    else if (action === 'exam-next') nextExam();
    else if (action === 'exam-audio') playExamAudio();
    else if (action === 'exam-audio-stop') { stopExamAudio('재생 정지 · 다시 듣기를 누르면 처음부터 읽어요'); refreshExam(); }
    else if (action === 'mock-start') startMock(Number(button.dataset.test));
    else if (action === 'mock-reload') { const test = Number(button.dataset.test); if (mockBanks[test]) { mockBanks[test].status = 'idle'; render(); } }
    else if (action === 'mock-play') playMock();
    else if (action === 'mock-pause') pauseMock();
    else if (action === 'mock-answer') answerMock(Number(button.dataset.no), Number(button.dataset.index));
    else if (action === 'mock-move') moveMock(Number(button.dataset.step));
    else if (action === 'mock-goto') gotoMock(Number(button.dataset.no));
    else if (action === 'mock-sheet') toggleMockSheet();
    else if (action === 'mock-lc-end') endMockLc();
    else if (action === 'mock-rc') startMockRc();
    else if (action === 'mock-submit') submitMock(mockRun?.test);
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
    else if (action === 'pick-language') {
      // Returns to the wordbook last opened in that language; its first wordbook otherwise (or if that one was deleted).
      const inLanguage = packages().filter(item => languageName(item.id) === button.dataset.language);
      const pkg = inLanguage.find(item => item.id === selectedByLanguage[button.dataset.language]) || inLanguage[0];
      if (pkg && languageName(selectedPackage) !== button.dataset.language) { selectedPackage = pkg.id; persist({saveSelection:true}); render(); }
      main.querySelector(`[data-action="pick-language"][data-language="${CSS.escape(button.dataset.language)}"]`)?.focus({preventScroll:true});
    }
    else if (action === 'start-cards') location.hash = `#/cards/${path(pkgId)}/${day}`;
    else if (action === 'start-cloze') location.hash = `#/cloze/${path(pkgId)}/${day}`;
    else if (action === 'cloze-hint' && session?.type === 'cloze' && !session.answered) {
      session.hint++;
      render();
      (main.querySelector('#cloze-hint:not(:disabled)') || main.querySelector('#cloze-input'))?.focus({preventScroll:true});
    } else if (action === 'cloze-next' && session?.type === 'cloze' && session.answered) {
      Object.assign(session, {index:session.index + 1, answered:false, hint:0, input:'', notice:'', lastCorrect:null});
      render();
      main.querySelector('#cloze-input, [data-action="retry-quiz"]:not(:disabled), [data-action="return"]')?.focus({preventScroll:true});
    }
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
    else if (action === 'retry-quiz') startSession(session.type, session.missed, {returnHash:session.returnHash, mode:session.mode, label:'틀린 단어 재도전'});
    else if (action === 'wrong-cards') startSession('cards', reviewItems());
    else if (action === 'wrong-quiz') startSession('quiz', reviewItems());
    else if (action === 'wrong-cloze') startSession('cloze', reviewItems(), {label:'오답 예문 빈칸'});
    else if (action === 'delete-wrong') { delete state.wrong[button.dataset.id]; persist(); render(); toast('오답노트에서 지웠어요.'); }
    else if (action === 'clear-wrong' && confirm('오답노트를 모두 비울까요?')) { state.wrong = {}; persist(); render(); toast('오답노트를 비웠어요.'); }
    else if (action === 'delete-package') deletePackage(pkgId);
    else if (action === 'reset' && confirm('아는 단어, 오답노트, Day별 기록을 모두 초기화할까요? 가져온 단어장은 유지됩니다.')) {
      state = {...Core.defaultState(), custom:state.custom, settings:state.settings || {autoSpeak:false}};
      session = null;
      persist(); render(); toast('학습 기록을 초기화했어요.');
    } else if (action === 'reset-exam' && confirm('문제 풀이 횟수, 첫 시도 정답률과 틀린 문제 기록을 모두 초기화할까요? 단어 학습 기록은 유지됩니다.')) {
      try { storage.removeItem(EXAM_KEY); }
      catch (_) { toast('문제 기록을 지우지 못했어요. 저장 공간과 브라우저 설정을 확인해 주세요.'); return; }
      stopExamAudio(); examSession = null; examState = {answers:{}};
      render(); toast('문제 기록을 초기화했어요.');
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

  main.addEventListener('input', event => {
    if (event.target.id === 'cloze-input' && session?.type === 'cloze') session.input = event.target.value;
    if (event.target.id === 'import-name') draft.name = event.target.value;
    if (event.target.id === 'import-text') { draft.text = event.target.value; updatePreview(); }
  });

  main.addEventListener('submit', event => {
    if (event.target.id === 'cloze-form') { event.preventDefault(); gradeCloze(); return; }
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

  window.addEventListener('hashchange', event => {
    const destination = new URL(event.newURL).hash;
    clearTimeout(quizTimer);
    stopExamAudio();
    stopMock();
    if (examSession && examSession.route !== destination) examSession = null;
    if (mockRun && mockRun.route !== destination) mockRun = null;
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
    if (destination.startsWith('#/exam')) ensureExamBanks();
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
    if (document.hidden && examSession?.audioPlaying) { stopExamAudio('화면을 벗어나 재생을 멈췄어요'); refreshExam(); }
    if (document.hidden && mockRun?.playing) pauseMock();
    if (document.hidden && listening?.playing) {
      haltListening('화면을 벗어나 일시정지했어요. 재생하면 현재 단어부터 다시 들어요.');
      refreshListening();
    }
  });
  window.addEventListener('pagehide', () => {
    if (examSession?.audioPlaying) { stopExamAudio('화면을 벗어나 재생을 멈췄어요'); refreshExam(); }
    if (mockRun?.playing) pauseMock();
    if (listening) {
      haltListening('화면을 벗어나 일시정지했어요. 재생하면 현재 단어부터 다시 들어요.');
      refreshListening();
    }
  });
  document.addEventListener('keydown', event => {
    if (examSession?.route === location.hash && examSession.questions.length && !examSession.finished && !event.repeat && !event.altKey && !event.ctrlKey && !event.metaKey
      && !event.target.closest('input, select, textarea, [contenteditable]')) {
      const index = /^[1-4]$/.test(event.key) ? Number(event.key) - 1 : /^[a-d]$/i.test(event.key) ? event.key.toUpperCase().charCodeAt(0) - 65 : -1;
      if (index >= 0 && !examSession.answered && !EXAM_PARTS[examSession.part].sets && index < examSession.questions[examSession.index].choices.length) { event.preventDefault(); answerExam(index); return; }
      if (event.key === 'Enter' && examSession.answered && !event.target.closest('button, a, summary, [role="button"]')) { event.preventDefault(); nextExam(); return; }
    }
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
    if (ready && event.storageArea === storage && (event.key === EXAM_KEY || event.key === null)) {
      examState = loadExamState();
      if (event.key === EXAM_KEY) { if (location.hash.startsWith('#/exam')) render(); return; }
    }
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
      if (!state.settings.autoSpeak && supportsSpeech && !listening?.playing && !examSession?.audioPlaying) window.speechSynthesis.cancel();
      toast('다른 탭의 변경 내용을 반영했어요.');
    }, 0);
  });
  window.addEventListener('offline', () => toast('오프라인이에요. 저장된 단어장은 계속 학습할 수 있어요.'));
  window.addEventListener('online', () => toast('다시 연결되었어요.'));

  async function init() {
    Core = window.Core;
    const required = ['chunkDays','dayLevels','wordId','shuffle','buildQuiz','parseImport','defaultState','recordAnswer','markKnown','loadState','saveState','selectExamQuestions','validExamState','recordExamAnswer','examStats','examSetStats','mockScore','validMockState','wordSenses'];
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
      examState = loadExamState();
      mockState = loadMockState();
    } catch (_) {
      main.innerHTML = empty('저장 공간에 접근할 수 없어요', '브라우저에서 이 사이트의 저장 공간을 허용한 뒤 새로고침해 주세요.');
      main.setAttribute('aria-busy', 'false');
      return;
    }
    try {
      const response = await fetch('./packages/index.json');
      if (!response.ok) throw new Error('Package index unavailable');
      const entries = await response.json();
      if (!Array.isArray(entries)) throw new Error('Invalid package index');
      // A stale cached index from before lazy loading lists bare file names; load those packages whole.
      if (entries.length && entries.every(entry => typeof entry === 'string')) {
        const pkgs = await Promise.all(entries.filter(file => /^[\w.-]+\.json$/.test(file))
          .map(file => fetch(`./packages/${file}`).then(r => r.ok ? r.json() : null).catch(() => null)));
        builtins = pkgs.filter(pkg => pkg && validPackage(pkg));
      } else
      // Only names and languages here; render() fetches a package's words when a screen needs them.
      builtins = entries.filter(entry => isObject(entry) && typeof entry.file === 'string' && /^[\w.-]+\.json$/.test(entry.file)
        && typeof entry.id === 'string' && entry.id && typeof entry.name === 'string' && entry.name.trim()
        && (entry.lang === undefined || typeof entry.lang === 'string') && (entry.languageName === undefined || typeof entry.languageName === 'string'))
        .map(entry => ({file:entry.file, id:entry.id, name:entry.name, ...(entry.lang ? {lang:entry.lang} : {}), ...(entry.languageName ? {languageName:entry.languageName} : {})}));
      if (builtins.length < entries.length) toast('일부 단어장을 불러오지 못했어요. 연결 후 새로고침해 주세요.');
    } catch (_) { toast('기본 단어장을 불러오지 못했어요. 연결 후 새로고침해 주세요.'); }
    ready = true;
    if (!location.hash || location.hash === '#main') history.replaceState(null, '', '#/home');
    if (location.hash.startsWith('#/exam')) ensureExamBanks();
    render();
    autoSpeak();
    if ('serviceWorker' in navigator && ['http:', 'https:'].includes(location.protocol)) {
      navigator.serviceWorker.register('./sw.js').catch(() => toast('오프라인 준비에 실패했어요. 온라인 학습은 계속할 수 있어요.'));
    }
  }
  init();
