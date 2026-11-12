/* Mock tests: five full TOEIC tests (questions/mock/mock-N.json) with continuous LC audio, a 75-minute RC timer,
   an answer sheet, approximate scores and resumable progress. Screens reuse the part renderers in exam.js. */
  'use strict';
  const MOCK_KEY = 'vocab-master-mock';
  // Tests 1-15; a missing questions/mock/mock-N.json shows as "준비 중" on the home card.
  const MOCK_TESTS = Array.from({length:15}, (_, i) => i + 1);
  const MOCK_COUNTS = {1:6, 2:25, 3:13, 4:10, 5:30, 6:4, 7:15};
  const MOCK_RC_MS = 75 * 60 * 1000;
  // Silence after each Part 1/2 item and after each Part 3/4 question, as on the test.
  const MOCK_GAP = {item:5000, question:8000};
  const mockBanks = Object.fromEntries(MOCK_TESTS.map(n => [n, {status:'idle', units:[], items:[]}]));
  let mockState = {attempts:[], progress:{}}, mockRun = null;
  let mockAudioGeneration = 0, mockAudioTimer, mockVoiceCleanup = null, mockClock;

  function loadMockState() {
    let raw;
    try {
      raw = storage.getItem(MOCK_KEY);
      if (!raw) return {attempts:[], progress:{}};
      const value = JSON.parse(raw);
      if (!Core.validMockState(value)) throw new Error('Invalid mock state');
      return value;
    } catch (_) {
      if (raw) try { storage.setItem(MOCK_KEY + '-corrupt', raw); } catch (_) { /* Keep the current storage. */ }
      return {attempts:[], progress:{}};
    }
  }

  function saveMockState() {
    try { storage.setItem(MOCK_KEY, JSON.stringify(mockState)); }
    catch (_) { toast('모의고사 기록을 저장하지 못했어요. 저장 공간을 확인해 주세요.'); }
  }

  // Home cards only need to know whether a test exists; HEAD avoids downloading five full tests.
  function checkMockBanks() {
    for (const n of MOCK_TESTS) {
      const bank = mockBanks[n];
      if (bank.status !== 'idle') continue;
      bank.status = 'checking';
      fetch(`./questions/mock/mock-${n}.json`, {method:'HEAD'})
        .then(response => { if (bank.status === 'checking') bank.status = response.status === 404 ? 'empty' : 'available'; })
        // Offline: the file may still be in the cache from an earlier visit, so let the card try.
        .catch(() => { if (bank.status === 'checking') bank.status = 'available'; })
        .finally(() => { if (location.hash === '#/exam') render(); });
    }
  }

  function validMockTest(data, n) {
    return isObject(data) && data.version === 1 && data.test === n && isObject(data.parts)
      && Object.entries(MOCK_COUNTS).every(([key, count]) => {
        const part = Number(key), list = data.parts[key], id = new RegExp(`^m-p${part}-${n}-\\d+$`);
        return Array.isArray(list) && list.length === count
          && list.every(item => EXAM_PARTS[part].sets ? validExamSet(item, part, id) : validExamQuestion(item, part, id));
      });
  }

  // Units are what one screen shows: a Part 1/2/5 question or a Part 3/4/6/7 set. items[no] maps test numbers 1-200.
  function mockUnits(data) {
    const units = [], items = [null];
    for (const part of [1, 2, 3, 4, 5, 6, 7]) for (const entry of data.parts[part]) {
      const unit = {part, entry, first:items.length, section:part <= 4 ? 'lc' : 'rc'};
      (entry.questions || [entry]).forEach((q, qi) => items.push({no:items.length, part, q, qi, unit}));
      unit.last = items.length - 1;
      units.push(unit);
    }
    return {units, items};
  }

  async function loadMockTest(n) {
    const bank = mockBanks[n];
    if (bank.status === 'loading' || bank.status === 'ready') return;
    bank.status = 'loading';
    try {
      const response = await fetch(`./questions/mock/mock-${n}.json`);
      if (response.status === 404) { bank.status = 'empty'; return; }
      if (!response.ok) throw new Error('Unavailable');
      const data = await response.json();
      if (!validMockTest(data, n)) throw new Error('Invalid mock test');
      const {units, items} = mockUnits(data);
      if (items.length !== 201) throw new Error('A mock test has 200 questions');
      Object.assign(bank, {status:'ready', units, items, lc:units.filter(u => u.section === 'lc'), rc:units.filter(u => u.section === 'rc')});
    } catch (_) { bank.status = 'error'; }
    finally { if (location.hash.startsWith(`#/exam/mock/${n}`)) render(); }
  }

  const choiceCount = part => part === 2 ? 3 : 4;
  const letter = index => String.fromCharCode(65 + index);
  const clock = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const day = at => new Date(at).toLocaleDateString('ko-KR', {month:'long', day:'numeric'});
  const attemptsFor = n => mockState.attempts.filter(a => a.test === n);
  const scoreOf = attempt => ({lc:Core.mockScore(attempt.lc), rc:Core.mockScore(attempt.rc)});

  function renderMockHome() {
    return `<section class="mock-home" aria-labelledby="mock-title"><h2 id="mock-title">실전 모의고사</h2><p class="exam-note">200문항 · LC 약 45분 음성이 이어서 나오고 RC는 75분이에요. 모두 새로 쓴 문제예요.</p>
      <div class="mock-cards">${MOCK_TESTS.map(n => {
        const bank = mockBanks[n], latest = attemptsFor(n).at(-1), progress = mockState.progress[n];
        const empty = bank.status === 'empty', checking = bank.status === 'idle' || bank.status === 'checking';
        const status = empty ? '준비 중' : checking ? '확인 중' : progress ? `이어 풀기 · ${Object.keys(progress.answers).length}/200` : '응시하기';
        const score = latest && scoreOf(latest);
        return `<div class="mock-card${empty ? ' is-empty' : ''}" data-mock-test="${n}">${empty || checking ? `<span class="mock-card-title">${n}회</span>` : `<a class="mock-card-title" href="#/exam/mock/${n}">${n}회</a>`}
          <span class="mock-card-status">${status}</span>${score ? `<a class="mock-card-score" href="#/exam/mock/${n}/result">최근 ${score.lc + score.rc}점 · ${day(latest.at)}</a>` : ''}</div>`;
      }).join('')}</div></section>`;
  }

  // ---- runner ----

  const progressOf = n => mockState.progress[n];
  const unitsOf = (bank, section) => section === 'lc' ? bank.lc : bank.rc;

  function startMock(n) {
    if (!MOCK_TESTS.includes(n) || mockBanks[n].status !== 'ready') return;
    if (progressOf(n) && !confirm(`${n}회 진행 기록을 지우고 처음부터 시작할까요?`)) return;
    stopMock();
    mockState.progress[n] = {answers:{}, section:'lc', unit:0, rcEndsAt:null};
    saveMockState();
    const route = `#/exam/mock/${n}`;
    mockRun = null;
    if (location.hash !== route) { location.hash = route; return; }
    render();
    playMock();
  }

  function renderMock(n, view) {
    if (!MOCK_TESTS.includes(n)) return empty('모의고사를 찾을 수 없어요', '문제 홈에서 회차를 다시 선택해 주세요.', '#/exam', '문제 홈');
    const bank = mockBanks[n];
    if (bank.status === 'empty') return empty(`실전 모의고사 ${n}회는 준비 중이에요`, '문제를 만들고 있어요. 다른 회차를 선택해 주세요.', '#/exam', '문제 홈');
    if (bank.status === 'error') return `${back('#/exam', '문제 홈')}<div class="empty-state"><h1>모의고사를 불러오지 못했어요</h1><p>연결을 확인한 뒤 다시 시도해 주세요. 한 번 연 회차는 오프라인에서도 열려요.</p><button class="primary" data-action="mock-reload" data-test="${n}">다시 불러오기</button></div>`;
    if (bank.status !== 'ready') { void loadMockTest(n); return '<div class="empty-state" aria-busy="true"><h1>모의고사를 준비하고 있어요</h1><p>문제를 불러오는 중</p></div>'; }
    if (view === 'result') return renderMockResult(n);
    if (!mockRun || mockRun.route !== location.hash) mockRun = {route:location.hash, test:n, playing:false, status:'', fallback:!supportsSpeech, sheet:false};
    const p = progressOf(n);
    if (!p) return renderMockIntro(n);
    if (p.section === 'rc') {
      if (Date.now() >= p.rcEndsAt) { setTimeout(() => submitMock(n, true)); return '<div class="empty-state"><h1>시간이 끝났어요</h1><p>답안을 제출하고 있어요</p></div>'; }
      startMockClock(n);
    }
    const top = `${back('#/exam', '문제 홈')}<div class="session-top mock-top"><span class="pill">${n}회 · ${p.section === 'lc' ? 'LC' : 'RC'}</span>
      ${p.section === 'rc' ? `<p id="mock-timer" class="mock-timer" role="timer" aria-label="남은 시간">남은 시간 ${clock(p.rcEndsAt - Date.now())}</p>` : ''}
      <div class="mock-tools">${p.section === 'rc' && !mockRun.sheet ? renderMockNav(unitsOf(bank, 'rc'), p) : ''}<button data-action="mock-sheet" aria-pressed="${mockRun.sheet}">${mockRun.sheet ? '문제 보기' : '답안지'}</button>${p.section === 'rc' ? '<button class="primary" data-action="mock-submit">제출</button>' : ''}</div></div>`;
    if (mockRun.sheet) return top + renderMockSheet(n, p);
    if (p.section === 'rc-intro') return `${top}<section class="mock-intro"><h1>LC가 끝났어요</h1><p>LC ${Object.keys(p.answers).filter(no => no <= 100).length}/100문항에 답했어요. 이제부터 LC 답은 바꿀 수 없어요.</p><p>RC는 75분이에요. 시간이 0이 되면 자동으로 제출돼요.</p><button class="primary full" data-action="mock-rc">RC 시작 (75분)</button></section>`;
    const units = unitsOf(bank, p.section), unit = units[p.unit];
    return `${top}${meter(p.unit, units.length, `${p.section.toUpperCase()} 진행`)}${p.section === 'lc' ? renderMockLcControls() : ''}
      <section class="exam-question mock-unit" data-unit="${unit.first}">${renderMockUnit(n, unit, p)}</section>${p.section === 'lc' ? renderMockNav(units, p) : ''}`;
  }

  function renderMockIntro(n) {
    const latest = attemptsFor(n).at(-1);
    return `${back('#/exam', '문제 홈')}${intro('실전 모의고사', `${n}회`, '200문항 · 약 2시간')}<section class="mock-intro">
      <ul><li><strong>LC 100문항 · 약 45분</strong> 시험처럼 음성이 끊김 없이 이어져요. 문항마다 다시 듣기는 없고 전체 일시정지만 있어요.</li>
      <li><strong>RC 100문항 · 75분</strong> 문항 사이를 자유롭게 오가요. 시간이 0이 되면 자동으로 제출돼요.</li>
      <li><strong>답안지</strong>에서 언제든 답을 확인하고, 안 푼 문항을 찾을 수 있어요.</li><li>중간에 나가도 이어서 풀 수 있어요.</li></ul>
      ${!supportsSpeech ? '<p class="exam-note">이 기기는 음성을 재생할 수 없어 LC 대본을 화면에 보여 줘요.</p>' : ''}
      <button class="primary full" data-action="mock-start" data-test="${n}">시작하기</button>${latest ? `<a class="button-link full" href="#/exam/mock/${n}/result">최근 결과 보기</a>` : ''}</section>`;
  }

  function renderMockLcControls() {
    const fallback = mockRun.fallback;
    return `<div class="button-row exam-audio-controls">${fallback ? '' : `<button id="mock-play" class="secondary" data-action="${mockRun.playing ? 'mock-pause' : 'mock-play'}">${icon(mockRun.playing ? 'pause' : 'play')} ${mockRun.playing ? '전체 일시정지' : '듣기 계속'}</button>`}</div>
      <p id="mock-status" class="exam-note exam-audio-status" aria-live="polite">${fallback ? '음성을 재생할 수 없어 대본을 표시해요 · 다음을 눌러 넘어가요' : escape(mockRun.status || '듣기 계속을 누르면 이 문항부터 이어서 읽어요')}</p>`;
  }

  // Previous/next: in the RC toolbar (always visible above the two-column panes); in LC below the script, only when it
  // replaces the audio.
  function renderMockNav(units, p) {
    if (p.section === 'lc' && !mockRun.fallback) return '';
    const lastUnit = p.unit === units.length - 1;
    const buttons = `<button data-action="mock-move" data-step="-1" aria-label="이전 문항" ${p.unit === 0 ? 'disabled' : ''}>${icon('arrow-left')} 이전</button>
      ${lastUnit && p.section === 'lc' ? '<button class="primary" data-action="mock-lc-end">LC 마치기</button>' : `<button class="secondary" data-action="mock-move" data-step="1" aria-label="다음 문항" ${lastUnit ? 'disabled' : ''}>다음 ${icon('arrow-right')}</button>`}`;
    return p.section === 'rc' ? buttons : `<div class="button-row mock-nav">${buttons}</div>`;
  }

  // LC answers can change only during LC; RC answers only during RC.
  const mockLocked = (no, p) => no <= 100 ? p.section !== 'lc' : p.section !== 'rc';

  function mockChoices(item, p, withText) {
    const picked = p.answers[item.no], locked = mockLocked(item.no, p);
    return `<div class="choices ${withText ? 'exam-set-choices' : `exam-letter-choices${item.part === 1 ? ' is-four' : ''}`}">${item.q.choices.map((text, index) =>
      `<button id="mock-choice-${item.no}-${index}" class="choice exam-choice ${picked === index ? 'is-picked' : ''}" data-action="mock-answer" data-no="${item.no}" data-index="${index}" aria-pressed="${picked === index}" aria-label="${item.no}번 (${letter(index)})${withText ? ` ${escape(text)}` : ''}" ${locked ? 'disabled' : ''}><span class="choice-number">${withText ? `(${letter(index)})` : letter(index)}</span>${withText ? `<span class="choice-text" lang="en">${escape(text)}</span>` : ''}</button>`).join('')}</div>`;
  }

  function renderMockUnit(n, unit, p) {
    const items = mockBanks[n].items.slice(unit.first, unit.last + 1), entry = unit.entry, fallback = mockRun.fallback;
    const title = item => `<h2 class="mock-question-title"><span class="exam-set-number">${item.no}.</span> ${item.part === 6 ? '빈칸' : `<span lang="en">${escape(item.q.q)}</span>`}</h2>`;
    if (unit.part === 1) return `<h1 class="mock-number">${unit.first}.</h1><img class="exam-photo" src="${escape(entry.image)}" alt="${escape(entry.alt)}" width="1024" height="768">${fallback ? renderExamScript(entry, false) : ''}${mockChoices(items[0], p, false)}`;
    if (unit.part === 2) return `<h1 class="mock-number">${unit.first}.</h1><p class="exam-instruction">질문과 세 응답을 듣고 알맞은 답을 고르세요</p>${fallback ? renderExamScript(entry, false) : ''}${mockChoices(items[0], p, false)}`;
    if (unit.part === 5) return `<h1 class="mock-number">${unit.first}.</h1><p class="exam-stem" lang="en">${entry.q.split('-------').map(escape).join('<span class="exam-blank"><span aria-hidden="true">-------</span><span class="sr-only">빈칸</span></span>')}</p>${mockChoices(items[0], p, true)}`;
    const questions = `<ol class="exam-set-questions">${items.map(item => `<li class="exam-set-question">${title(item)}${mockChoices(item, p, true)}</li>`).join('')}</ol>`;
    if (unit.part <= 4) return `<p class="exam-set-direction" lang="en">Questions ${unit.first}–${unit.last} refer to the following ${EXAM_TALKS[entry.talkType]}${entry.graphic ? ' and graphic' : ''}.</p>
      ${fallback ? renderSetScript(entry, false) : ''}${entry.graphic ? renderExamGraphic(entry.graphic, false) : ''}${questions}`;
    const {passage, direction} = readingPassage(entry, unit.part, false, -1, unit.first);
    return `<p class="exam-set-direction" lang="en">${escape(direction)}</p><div class="exam-reading"><section class="reading-passage" aria-label="지문" tabindex="0">${passage}</section><section class="reading-questions" aria-label="문항">${questions}</section></div>`;
  }

  function renderMockSheet(n, p) {
    const bank = mockBanks[n], open = bank.items.slice(1).filter(item => p.answers[item.no] === undefined).length;
    const canGo = section => section === p.section && (section === 'rc' || mockRun.fallback);
    return `<section class="mock-sheet" aria-label="답안지"><h1>답안지</h1><p class="exam-note">안 푼 문항 <strong id="mock-open">${open}</strong>개 · 지금 구간의 번호를 누르면 그 문항으로 가요</p>
      ${[1, 2, 3, 4, 5, 6, 7].map(part => {
        const items = bank.items.filter(item => item?.part === part);
        return `<h2>Part ${part} <small>${items[0].no}–${items.at(-1).no}</small></h2><div class="omr">${items.map(item => {
          const picked = p.answers[item.no], locked = mockLocked(item.no, p);
          return `<div class="omr-row${picked === undefined ? ' is-open' : ''}">${canGo(item.unit.section) ? `<button class="omr-no" data-action="mock-goto" data-no="${item.no}" aria-label="${item.no}번으로 이동">${item.no}</button>` : `<span class="omr-no">${item.no}</span>`}${Array.from({length:choiceCount(part)}, (_, index) => `<button id="omr-${item.no}-${index}" class="omr-bubble" data-action="mock-answer" data-no="${item.no}" data-index="${index}" aria-pressed="${picked === index}" aria-label="${item.no}번 ${letter(index)}" ${locked ? 'disabled' : ''}>${letter(index)}</button>`).join('')}</div>`;
        }).join('')}</div>`;
      }).join('')}<button class="secondary full" data-action="mock-sheet">문제로 돌아가기</button></section>`;
  }

  function refreshMock() {
    if (!mockRun || mockRun.route !== location.hash) return;
    const focused = document.activeElement?.id, position = window.scrollY;
    render();
    window.scrollTo(0, position);
    if (focused) document.getElementById(focused)?.focus({preventScroll:true});
  }

  function answerMock(no, index) {
    const p = mockRun && progressOf(mockRun.test), item = p && mockBanks[mockRun.test].items[no];
    if (!item || !Number.isInteger(index) || index < 0 || index >= choiceCount(item.part) || mockLocked(no, p)) return;
    p.answers[no] = index;
    saveMockState();
    refreshMock();
  }

  function moveMock(step) {
    const p = mockRun && progressOf(mockRun.test);
    if (!p || p.section === 'rc-intro' || p.section === 'lc' && !mockRun.fallback) return;
    const units = unitsOf(mockBanks[mockRun.test], p.section), next = p.unit + step;
    if (next < 0 || next >= units.length) return;
    p.unit = next;
    saveMockState();
    render();
    window.scrollTo(0, 0);
  }

  function gotoMock(no) {
    const p = mockRun && progressOf(mockRun.test), item = p && mockBanks[mockRun.test].items[no];
    if (!item || item.unit.section !== p.section || p.section === 'lc' && !mockRun.fallback) return;
    p.unit = unitsOf(mockBanks[mockRun.test], p.section).indexOf(item.unit);
    mockRun.sheet = false;
    saveMockState();
    render();
    // The first question of a set opens at its passage; later ones scroll to the question itself.
    if (item.no === item.unit.first) window.scrollTo(0, 0);
    else document.getElementById(`mock-choice-${no}-0`)?.scrollIntoView({block:'center'});
  }

  function toggleMockSheet() {
    if (!mockRun) return;
    mockRun.sheet = !mockRun.sheet;
    render();
    window.scrollTo(0, 0);
  }

  function endMockLc() {
    const p = mockRun && progressOf(mockRun.test);
    if (!p || p.section !== 'lc') return;
    stopMockAudio();
    p.section = 'rc-intro';
    p.unit = 0;
    saveMockState();
    render();
    window.scrollTo(0, 0);
  }

  function startMockRc() {
    const p = mockRun && progressOf(mockRun.test);
    if (!p || p.section !== 'rc-intro') return;
    p.section = 'rc';
    p.unit = 0;
    p.rcEndsAt = Date.now() + MOCK_RC_MS;
    saveMockState();
    render();
    window.scrollTo(0, 0);
  }

  function startMockClock(n) {
    clearInterval(mockClock);
    mockClock = setInterval(() => {
      const p = progressOf(n);
      if (!p || p.section !== 'rc' || location.hash !== `#/exam/mock/${n}`) { clearInterval(mockClock); return; }
      const left = p.rcEndsAt - Date.now();
      const timer = document.getElementById('mock-timer');
      if (timer) timer.textContent = `남은 시간 ${clock(left)}`;
      if (left <= 0) { clearInterval(mockClock); submitMock(n, true); }
    }, 1000);
  }

  function submitMock(n, timeUp = false) {
    const p = progressOf(n), bank = mockBanks[n];
    if (!p || bank.status !== 'ready') return;
    if (!timeUp) {
      const open = 200 - Object.keys(p.answers).length;
      if (!confirm(open ? `안 푼 문항이 ${open}개 있어요. 제출할까요?` : '답안을 제출할까요?')) return;
    }
    stopMock();
    const right = from => bank.items.slice(from, from + 100).filter(item => p.answers[item.no] === item.q.answer).length;
    mockState.attempts.push({test:n, at:Date.now(), answers:p.answers, lc:right(1), rc:right(101)});
    delete mockState.progress[n];
    saveMockState();
    mockRun = null;
    if (timeUp) toast('시간이 끝나 답안을 제출했어요.');
    location.hash = `#/exam/mock/${n}/result`;
  }

  // ---- LC audio ----

  const activeMockAudio = token => token === mockAudioGeneration && mockRun?.playing && mockRun.route === location.hash && !document.hidden;

  function playMock() {
    const run = mockRun, p = run && progressOf(run.test);
    if (!p || p.section !== 'lc' || run.fallback || !supportsSpeech || document.hidden || run.route !== location.hash) return;
    stopMockAudio();
    stopExamAudio();
    haltListening();
    run.playing = true;
    run.status = '음성을 준비하고 있어요';
    const token = mockAudioGeneration;
    refreshMock();
    mockVoiceCleanup = whenVoices(voices => {
      if (!activeMockAudio(token)) return;
      const english = voices.filter(voice => voice.lang.toLowerCase().startsWith('en'));
      const unit = mockBanks[run.test].lc[p.unit];
      const queue = examAudioQueue(unit.part, unit.entry, english, unit.first);
      if (unit.part <= 2) queue.unshift({text:`Number ${unit.first}.`, voice:queue[0].voice, label:`${unit.first}번`});
      queue.forEach(item => { if (item.question) item.gap = MOCK_GAP.question; });
      if (unit.part <= 2) queue.at(-1).gap = MOCK_GAP.item;
      speakQueue(queue, {
        active:() => activeMockAudio(token),
        timer:(fn, ms) => (mockAudioTimer = setTimeout(fn, ms)),
        onItem:item => {
          run.status = `${item.label} 재생 중`;
          const status = document.getElementById('mock-status');
          if (status) status.textContent = run.status;
        },
        done:() => {
          if (p.unit < mockBanks[run.test].lc.length - 1) {
            p.unit++;
            saveMockState();
            run.playing = false;
            render();
            window.scrollTo(0, 0);
            playMock();
          } else endMockLc();
        },
        fail:() => {
          stopMockAudio();
          run.fallback = true;
          refreshMock();
        }
      });
    });
  }

  function pauseMock() {
    if (!mockRun?.playing) return;
    stopMockAudio();
    mockRun.status = '일시정지 · 듣기 계속을 누르면 이 문항을 처음부터 읽어요';
    refreshMock();
  }

  function stopMockAudio() {
    mockAudioGeneration++;
    clearTimeout(mockAudioTimer);
    mockVoiceCleanup?.();
    mockVoiceCleanup = null;
    if (mockRun?.playing) { mockRun.playing = false; cancelSpeech(); }
  }

  function stopMock() {
    stopMockAudio();
    clearInterval(mockClock);
  }

  // ---- result ----

  function renderMockResult(n) {
    const attempts = attemptsFor(n), attempt = attempts.at(-1), bank = mockBanks[n];
    if (!attempt) return empty('아직 응시 기록이 없어요', '모의고사를 풀고 제출하면 결과가 여기에 나와요.', `#/exam/mock/${n}`, `${n}회 시작`);
    const score = scoreOf(attempt), answers = attempt.answers;
    const parts = [1, 2, 3, 4, 5, 6, 7].map(part => {
      const items = bank.items.filter(item => item?.part === part);
      return {part, total:items.length, right:items.filter(item => answers[item.no] === item.q.answer).length};
    });
    const wrongUnits = bank.units.filter(unit => bank.items.slice(unit.first, unit.last + 1).some(item => answers[item.no] !== item.q.answer));
    return `${back('#/exam', '문제 홈')}${intro('실전 모의고사', `${n}회 결과`, `${day(attempt.at)} 응시`)}
      <section class="result-hero mock-score"><p class="mock-score-label">예상 점수</p><div class="result-score">${score.lc + score.rc}<small>점</small></div>
        <p>LC ${attempt.lc}/100 → ${score.lc}점 · RC ${attempt.rc}/100 → ${score.rc}점</p>
        <p class="exam-note">근사치예요(섹션별 ±50점). 공식 환산표는 공개되지 않아, 알려진 근사표의 구간 중간값을 이어서 계산했어요.</p></section>
      <section class="exam-card"><h2>파트별 정답률</h2><dl class="exam-type-results">${parts.map(r => `<div><dt>Part ${r.part} ${escape(EXAM_PARTS[r.part].name)}</dt><dd>${r.right} / ${r.total} · ${Math.round(r.right / r.total * 100)}%</dd></div>`).join('')}</dl></section>
      <section class="mock-review"><h2>틀린 문항 ${200 - attempt.lc - attempt.rc}개</h2><p class="exam-note">안 푼 문항도 틀린 문항에 들어가요. 누르면 해설·번역·대본이 열려요.</p>
        ${[1, 2, 3, 4, 5, 6, 7].map(part => {
          // One fold per part: with many misses, 200 unit rows made the page several screens long.
          const units = wrongUnits.filter(unit => unit.part === part);
          const count = units.reduce((sum, unit) => sum + mockBanks[n].items.slice(unit.first, unit.last + 1).filter(item => answers[item.no] !== item.q.answer).length, 0);
          return units.length ? `<details class="mock-review-part"><summary>Part ${part} ${escape(EXAM_PARTS[part].name)} · ${count}개</summary>${units.map(unit => renderMockReview(n, unit, answers)).join('')}</details>` : '';
        }).join('')}</section>
      ${attempts.length > 1 ? `<section class="exam-card"><h2>응시 기록</h2><dl class="exam-type-results">${attempts.slice().reverse().map(a => { const s = scoreOf(a); return `<div><dt>${day(a.at)}</dt><dd>${s.lc + s.rc}점 (LC ${a.lc} · RC ${a.rc})</dd></div>`; }).join('')}</dl></section>` : ''}
      <div class="stack exam-result-actions"><button class="secondary full" data-action="mock-start" data-test="${n}">다시 응시</button><a class="button-link full" href="#/exam">문제 홈으로</a></div>`;
  }

  // One screen unit with wrong answers: the unit's script, translation or passage once, then each wrong question.
  function renderMockReview(n, unit, answers) {
    const items = mockBanks[n].items.slice(unit.first, unit.last + 1), entry = unit.entry;
    const wrong = items.filter(item => answers[item.no] !== item.q.answer);
    const verdict = item => {
      const mine = answers[item.no];
      return `<div class="exam-set-feedback is-incorrect"><p class="exam-set-verdict">${item.no}번 · 내 답 ${mine === undefined ? '없음' : `(${letter(mine)})`} · 정답 (${letter(item.q.answer)}) · ${escape(EXAM_TYPES[item.q.type || entry.photoType] || '')}</p><p>${escape(item.q.explain)}</p></div>`;
    };
    // Set questions (Part 3, 4, 6, 7) list their choices with translations; Part 1/2/5 show them in the script above.
    const choices = item => [3, 4, 6, 7].includes(item.part) ? `${item.q.q ? `<p lang="en">${item.no}. ${escape(item.q.q)}</p>${item.q.ko?.q ? `<p class="exam-set-ko" lang="ko">${escape(item.q.ko.q)}</p>` : ''}` : `<p>${item.no}. 빈칸</p>`}
      <ol class="mock-review-choices">${item.q.choices.map((text, i) => `<li class="${i === item.q.answer ? 'script-correct' : ''}">(${letter(i)}) <span lang="en">${escape(text)}</span> <small lang="ko">${escape(item.q.ko.choices[i])}</small></li>`).join('')}</ol>` : '';
    let body;
    if (unit.part === 1) body = `<img class="exam-photo" src="${escape(entry.image)}" alt="${escape(entry.alt)}" width="1024" height="768" loading="lazy">${renderExamScript(entry, true)}`;
    else if (unit.part === 2) body = renderExamScript(entry, true);
    else if (unit.part === 5) body = `<p class="exam-stem" lang="en">${escape(entry.q.replace('-------', `(${entry.choices[entry.answer]})`))}</p><p class="exam-translation" lang="ko">${escape(entry.ko)}</p>`;
    else if (unit.part <= 4) body = `${entry.graphic ? renderExamGraphic(entry.graphic, true) : ''}${renderSetScript(entry, true)}`;
    else { const {passage, translation} = readingPassage(entry, unit.part, true, -1, unit.first); body = `<div class="reading-passage">${passage}<details class="reading-ko"><summary>번역 보기</summary>${translation}</details></div>`; }
    return `<details class="mock-review-unit"><summary>Part ${unit.part} · ${unit.first === unit.last ? `${unit.first}번` : `${unit.first}–${unit.last}번 중 ${wrong.length}개`}</summary>
      ${body}${wrong.map(item => choices(item) + verdict(item)).join('')}</details>`;
  }
