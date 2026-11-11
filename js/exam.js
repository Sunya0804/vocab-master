/* TOEIC questions Part 2-5: banks, sessions, screens and audio. */
  'use strict';
  const EXAM_KEY = 'vocab-master-exam';
  const EXAM_PARTS = {2:{name:'질의응답 듣기', total:200, size:25}, 3:{name:'짧은 대화', total:156, size:13, sets:true}, 4:{name:'짧은 담화', total:120, size:10, sets:true}, 5:{name:'단문 빈칸', total:300, size:30}};
  const EXAM_SET_TYPES = {topic:'주제·목적', speaker:'화자·장소', detail:'세부 정보', reason:'이유·문제', suggest:'제안·요청', next:'다음 할 일', inference:'추론', intention:'화자 의도', graphic:'시각 자료'};
  const EXAM_TALKS = {conversation:'conversation', telephone:'telephone message', announcement:'announcement', meeting:'excerpt from a meeting', advertisement:'advertisement', broadcast:'broadcast', tour:'tour', speech:'speech'};
  const EXAM_SPEAKERS = {M:'남자', W:'여자', M2:'남자 2', W2:'여자 2'};
  // One English voice per speaker when possible; pitch separates speakers who must share a voice.
  const EXAM_PITCH = {M:.9, W:1.1, M2:.8, W2:1.25};
  // Voice gender guessed from voice.name; unknown names stay neutral.
  const EXAM_VOICE_GENDER = {W:/\b(female|zira|aria|jenny|hazel|susan|samantha|karen|libby|sonia)\b/i, M:/\b(male|david|mark|guy|daniel|george|ryan)\b/i};
  const examVoiceGender = voice => EXAM_VOICE_GENDER.W.test(voice.name) ? 'W' : EXAM_VOICE_GENDER.M.test(voice.name) ? 'M' : '';
  const EXAM_ACCENTS =['en-us', 'en-gb', 'en-au', 'en-ca', 'en-ie', 'en-nz', 'en-in', 'en-za'];
  const EXAM_TYPES = {pos:'품사', verb:'동사', 'prep-conj':'전치사·접속사', pronoun:'대명사', relative:'관계사·명사절', comparison:'비교·기타 문법', vocab:'어휘', wh:'의문사 질문', yesno:'일반 의문문', 'negative-tag':'부정·부가 의문문', choice:'선택 의문문', request:'요청·제안', statement:'평서문', ...EXAM_SET_TYPES};
  const EXAM_TRAPS = {'repeat-word':'질문 단어 반복', 'similar-sound':'유사 발음', 'wh-mismatch':'다른 의문사 응답', 'yes-no-to-wh':'의문사 질문에 예·아니요 응답', 'related-word':'연상 단어', 'wrong-subject':'주체·시제 불일치'};
  const EXAM_LEVELS = ['전체', '쉬움', '보통', '어려움'];
  const examBanks = {2:{status:'idle', questions:[]}, 3:{status:'idle', questions:[]}, 4:{status:'idle', questions:[]}, 5:{status:'idle', questions:[]}};
  let examState = {answers:{}}, examDifficulty = 0, examSession = null;
  let examAudioGeneration = 0, examAudioTimer, examVoiceCleanup;

  function loadExamState() {
    let raw;
    try {
      raw = storage.getItem(EXAM_KEY);
      if (!raw) return {answers:{}};
      const value = JSON.parse(raw);
      if (!Core.validExamState(value)) throw new Error('Invalid exam state');
      return value;
    } catch (_) {
      if (raw) try { storage.setItem(EXAM_KEY + '-corrupt', raw); } catch (_) { /* Preserve current storage. */ }
      return {answers:{}};
    }
  }

  function validExamQuestion(q, part) {
    const count = part === 5 ? 4 : 3;
    return isObject(q) && new RegExp(`^p${part}-\\d+$`).test(q.id)
      && typeof q.q === 'string' && !!q.q.trim() && typeof q.explain === 'string' && !!q.explain.trim()
      && [1, 2, 3].includes(q.difficulty) && Object.hasOwn(EXAM_TYPES, q.type)
      && Array.isArray(q.choices) && q.choices.length === count
      && q.choices.every(choice => typeof choice === 'string' && !!choice.trim())
      && new Set(q.choices).size === count && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < count
      && (part === 5 ? typeof q.ko === 'string' && !!q.ko.trim() && q.q.split('-------').length === 2
        : isObject(q.ko) && typeof q.ko.q === 'string' && !!q.ko.q.trim()
          && Array.isArray(q.ko.choices) && q.ko.choices.length === count
          && q.ko.choices.every(text => typeof text === 'string' && !!text.trim())
          && Array.isArray(q.trap) && q.trap.every(tag => Object.hasOwn(EXAM_TRAPS, tag)));
  }

  const filled = value => typeof value === 'string' && !!value.trim();
  function validExamSet(set, part) {
    const rows = set?.graphic?.rows;
    return isObject(set) && new RegExp(`^p${part}-\\d+$`).test(set.id) && [1, 2, 3].includes(set.difficulty)
      && (part === 3 ? set.talkType === 'conversation' : set.talkType !== 'conversation' && Object.hasOwn(EXAM_TALKS, set.talkType))
      && Array.isArray(set.script) && set.script.length > 0
      && set.script.every(line => isObject(line) && Object.hasOwn(EXAM_SPEAKERS, line.s) && filled(line.t))
      && Array.isArray(set.scriptKo) && set.scriptKo.length === set.script.length && set.scriptKo.every(filled)
      && (set.graphic == null || isObject(set.graphic) && filled(set.graphic.title) && filled(set.graphic.titleKo)
        && Array.isArray(rows) && rows.length >= 2 && rows.every(row => Array.isArray(row) && row.length === rows[0].length && row.every(cell => typeof cell === 'string')))
      && Array.isArray(set.questions) && set.questions.length === 3
      && set.questions.every(q => isObject(q) && Object.hasOwn(EXAM_SET_TYPES, q.type) && filled(q.q) && filled(q.explain)
        && Array.isArray(q.choices) && q.choices.length === 4 && q.choices.every(filled)
        && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4
        && isObject(q.ko) && filled(q.ko.q) && Array.isArray(q.ko.choices) && q.ko.choices.length === 4 && q.ko.choices.every(filled));
  }

  async function loadExamBank(part) {
    const bank = examBanks[part];
    if (!bank || bank.status === 'loading') return;
    bank.status = 'loading';
    try {
      const response = await fetch(`./questions/toeic-part${part}.json`);
      if (!response.ok) throw new Error('Unavailable');
      const data = await response.json();
      const sets = EXAM_PARTS[part].sets, items = sets ? data.sets : data.questions;
      if (data.version !== 1 || data.part !== part || !Array.isArray(items)
        || !items.every(q => sets ? validExamSet(q, part) : validExamQuestion(q, part))
        || new Set(items.map(q => q.id)).size !== items.length) throw new Error('Invalid questions');
      bank.questions = items;
      bank.status = 'ready';
    } catch (_) { bank.status = 'error'; }
    if (location.hash.startsWith('#/exam')) render();
  }

  function ensureExamBanks() {
    for (const part of [2, 3, 4, 5]) if (examBanks[part].status === 'idle') void loadExamBank(part);
  }

  function examPool(part, wrong = false) {
    const pool = examBanks[part].questions.filter(q => !examDifficulty || q.difficulty === examDifficulty);
    return wrong ? examStatsFor(part, pool).wrong : pool;
  }

  const examStatsFor = (part, items, answers = examState.answers) => EXAM_PARTS[part].sets ? Core.examSetStats(items, answers) : Core.examStats(items, answers);
  const examAudioIdle = part => part === 2 ? '문제 듣기를 누르면 질문과 세 응답을 차례로 읽어요' : `듣기를 누르면 ${part === 3 ? '대화' : '담화'}와 질문 세 개를 차례로 읽어요`;

  function makeExamSession(part, mode) {
    stopExamAudio();
    const pool = examPool(part, mode === 'wrong');
    const questions = Core.selectExamQuestions(pool, mode === 'wrong' ? pool.length : EXAM_PARTS[part].size, examDifficulty);
    examSession = {route:`#/exam/${part}/${mode}`, part, mode, questions, index:0, selected:null, answered:false, finished:false, results:[], picks:[null, null, null], audioPlaying:false, audioStatus:examAudioIdle(part), heard:false, audioFallback:false};
  }

  function startExam(part, mode) {
    if (!EXAM_PARTS[part] || !['set', 'wrong'].includes(mode) || examBanks[part].status !== 'ready') return;
    makeExamSession(part, mode);
    if (location.hash === examSession.route) render(); else location.hash = examSession.route;
  }

  function renderExamHome() {
    return `${intro('', '토익 문제', 'Part 2 질의응답 · Part 3 짧은 대화 · Part 4 짧은 담화 · Part 5 단문 빈칸')}<div class="level-filter exam-filter" role="group" aria-label="문제 난이도">${EXAM_LEVELS.map((label, level) => `<button class="level-chip" data-action="exam-level" data-level="${level}" aria-pressed="${examDifficulty === level}">${label}</button>`).join('')}</div>
      <p class="exam-note">${examDifficulty ? '선택한 난이도의 문제로 세트를 구성해요' : '실전 세트 난이도 · 쉬움 25% · 보통 45% · 어려움 30%'}</p>
      <div class="exam-parts">${[2, 3, 4, 5].map(part => {
        const bank = examBanks[part], info = EXAM_PARTS[part], unit = info.sets ? '세트' : '문항';
        const stats = examStatsFor(part, bank.questions), pool = examPool(part), wrong = examPool(part, true);
        return `<section class="exam-card" data-exam-part="${part}"><div class="exam-card-heading"><div><span class="eyebrow">Part ${part}</span><h2>${info.name}</h2></div>${icon(part === 5 ? 'book-open' : 'headphones')}</div>
          ${bank.status === 'error' && info.sets ? '<p class="exam-note">준비 중 · 문제를 만들고 있어요</p>' : bank.status === 'error' ? `<p class="exam-note">문제를 불러오지 못했어요. 연결을 확인한 뒤 다시 시도해 주세요.</p><button class="full" data-action="exam-reload" data-part="${part}">다시 불러오기</button>`
            : bank.status !== 'ready' ? '<p class="exam-note">문제를 불러오는 중</p>'
            : `<div class="exam-mini-stats"><span>푼 문제 <strong>${stats.solved} / ${Math.max(info.total, stats.total)}</strong></span><span>첫 시도 정답률 <strong>${stats.solved ? `${stats.firstAccuracy}%` : '–'}</strong></span></div>
              <div class="button-row"><button class="primary" data-action="exam-start" data-part="${part}" data-mode="set" aria-label="Part ${part} ${EXAM_LEVELS[examDifficulty]} 실전 세트 시작" ${!pool.length ? 'disabled' : ''}>실전 세트 <span class="exam-button-count">${info.sets ? `${Math.min(info.size, pool.length)}세트 · ${Math.min(info.size, pool.length) * 3}문항` : `${Math.min(info.size, pool.length)}문항`}</span></button><button data-action="exam-start" data-part="${part}" data-mode="wrong" ${!wrong.length ? 'disabled' : ''}>틀린 ${info.sets ? '세트' : '문제'} ${wrong.length}</button></div>
              <p class="exam-note">${stats.total < info.total ? `현재 ${info.sets ? `${bank.questions.length}세트 ` : ''}${stats.total}문항 제공 · 세트는 제공된 문항으로 구성해요` : `${pool.length}${unit} 중 무작위 추출 · 실전 ${info.size}${unit}`}</p>`}</section>`;
      }).join('')}</div>`;
  }

  function renderExamScript(q, revealAnswer) {
    return `<section class="exam-script" aria-label="질문과 응답 스크립트"><h2>스크립트</h2><p lang="en">${escape(q.q)}</p><p class="muted" lang="ko">${escape(q.ko.q)}</p><ol>${q.choices.map((text, index) => `<li class="${revealAnswer && index === q.answer ? 'script-correct' : ''}"><span>(${String.fromCharCode(65 + index)})</span><div><p lang="en">${escape(text)}</p><p class="muted" lang="ko">${escape(q.ko.choices[index])}</p></div></li>`).join('')}</ol></section>`;
  }

  function renderExamResult() {
    const s = examSession, right = s.results.filter(r => r.correct).length;
    const items = EXAM_PARTS[s.part].sets ? Core.examSetStats(s.questions, {}).items : s.questions;
    const types = [...new Set(items.map(q => q.type))];
    return `${back('#/exam', '문제 홈')}${intro('', `Part ${s.part} 결과`, s.mode === 'wrong' ? '틀린 문제 다시 풀기' : '실전 세트')}
      <section class="result-hero"><div class="result-score">${Math.round(right / items.length * 100)}<small>%</small></div><p>${items.length}문항 중 ${right}문항 정답</p></section>
      <section class="exam-card"><h2>유형별 정답</h2><dl class="exam-type-results">${types.map(type => `<div><dt>${escape(EXAM_TYPES[type])}</dt><dd>${s.results.filter(r => r.type === type && r.correct).length} / ${items.filter(q => q.type === type).length}</dd></div>`).join('')}</dl></section>
      <div class="stack exam-result-actions"><button class="secondary full" data-action="exam-start" data-part="${s.part}" data-mode="wrong" ${!examPool(s.part, true).length ? 'disabled' : ''}>틀린 ${EXAM_PARTS[s.part].sets ? '세트' : '문제'} 다시 풀기</button><a class="button-link full" href="#/exam">문제 홈으로</a></div>`;
  }

  function renderExamPage(part, mode) {
    if (!EXAM_PARTS[part] || !['set', 'wrong'].includes(mode)) return empty('문제 세트를 찾을 수 없어요', '문제 홈에서 Part를 다시 선택해 주세요.', '#/exam', '문제 홈');
    if (examBanks[part].status !== 'ready') return renderExamHome();
    if (!examSession || examSession.route !== location.hash) makeExamSession(part, mode);
    const s = examSession;
    if (!s.questions.length) return empty(mode === 'wrong' ? '다시 풀 틀린 문제가 없어요' : '선택한 난이도의 문제가 없어요', '문제 홈에서 다른 난이도를 선택해 주세요.', '#/exam', '문제 홈');
    if (s.finished) return renderExamResult();
    if (EXAM_PARTS[part].sets) return renderExamSet();
    const q = s.questions[s.index], fallback = !supportsSpeech || s.audioFallback;
    const correct = s.selected === q.answer;
    return `${back('#/exam', '문제 홈')}<div class="session-top"><span class="pill">Part ${part} · ${mode === 'wrong' ? '틀린 문제' : '실전 세트'}</span><p>${s.index + 1} / ${s.questions.length}</p></div>${meter(s.index, s.questions.length, '문제 풀이 진행')}
      <section class="exam-question" data-question-id="${escape(q.id)}">${part === 5 ? `<p class="exam-instruction">빈칸에 들어갈 말을 고르세요</p><h1 class="exam-stem" lang="en">${q.q.split('-------').map(escape).join('<span class="exam-blank"><span aria-hidden="true">-------</span><span class="sr-only">빈칸</span></span>')}</h1>`
        : `<div class="exam-listening-heading">${icon('headphones')}<h1>질문과 응답 듣기</h1></div><p class="exam-instruction">질문과 세 응답을 듣고 알맞은 답을 고르세요</p><div class="button-row exam-audio-controls"><button id="exam-replay" class="secondary" data-action="exam-audio" aria-label="Part 2 질문과 응답 ${s.heard ? '다시 듣기' : '듣기'}" ${!supportsSpeech ? 'disabled' : ''}>${icon('volume-2')} ${s.heard ? '다시 듣기' : '문제 듣기'}</button>${s.audioPlaying ? '<button data-action="exam-audio-stop" aria-label="문제 음성 정지">정지</button>' : ''}</div><p class="exam-note exam-audio-status">${fallback ? '음성을 재생할 수 없어 스크립트를 표시해요' : escape(s.audioStatus)}</p>${fallback && !s.answered ? renderExamScript(q, false) : ''}`}
      <div class="choices ${part === 2 ? 'exam-letter-choices' : ''}">${q.choices.map((text, index) => {
        const letter = String.fromCharCode(65 + index), isRight = s.answered && index === q.answer, isWrong = s.answered && index === s.selected && !correct;
        return `<button id="exam-choice-${index}" class="choice exam-choice ${isRight ? 'correct' : ''} ${isWrong ? 'incorrect' : ''}" data-action="exam-answer" data-index="${index}" aria-label="${letter} ${part === 5 ? escape(text) : '응답'} 선택${isRight ? ', 정답' : isWrong ? ', 오답' : ''}" aria-disabled="${s.answered}"><span class="choice-number">${letter}</span>${part === 5 ? `<span class="choice-text" lang="en">${escape(text)}</span>` : ''}<span class="choice-result">${isRight ? `${icon('check')} 정답` : isWrong ? `${icon('x')} 오답` : ''}</span></button>`;
      }).join('')}</div></section>
      ${s.answered ? `<section id="exam-feedback" class="exam-feedback ${correct ? 'is-correct' : 'is-incorrect'}" tabindex="-1"><h2>${icon(correct ? 'check' : 'x')} ${correct ? '정답입니다' : '오답입니다'} <span>정답 (${String.fromCharCode(65 + q.answer)})</span></h2>${part === 5 ? `<p class="exam-translation" lang="ko">${escape(q.ko)}</p>` : renderExamScript(q, true)}<h3>해설 · ${escape(EXAM_TYPES[q.type])}</h3><p>${escape(q.explain)}</p>${part === 2 ? `<h3>오답 함정</h3><ul class="exam-traps">${[...new Set(q.trap)].map(tag => `<li>${escape(EXAM_TRAPS[tag])}</li>`).join('')}</ul>` : ''}</section><button id="exam-next" class="secondary full" data-action="exam-next">${s.index === s.questions.length - 1 ? '결과 보기' : '다음 문제'} ${icon('arrow-right')}</button>`
        : `<p class="exam-note">숫자 ${part === 5 ? '1~4 또는 A~D' : '1~3 또는 A~C'}로 답 선택 · 답한 뒤 Enter로 다음</p>`}`;
  }

  function renderSetScript(set, translated) {
    return `<section class="exam-script exam-set-script" aria-label="대본"><h2>대본</h2><ol>${set.script.map((line, index) => `<li><abbr title="${EXAM_SPEAKERS[line.s]}">${line.s}</abbr><div><p lang="en">${escape(line.t)}</p>${translated ? `<p lang="ko">${escape(set.scriptKo[index])}</p>` : ''}</div></li>`).join('')}</ol></section>`;
  }

  function renderExamGraphic(graphic, answered) {
    const [head, ...rows] = graphic.rows;
    return `<div class="exam-graphic"><table><caption><span lang="en">${escape(graphic.title)}</span>${answered ? ` <span lang="ko">${escape(graphic.titleKo)}</span>` : ''}</caption><thead><tr>${head.map(cell => `<th scope="col">${escape(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, index) => index ? `<td>${escape(cell)}</td>` : `<th scope="row">${escape(cell)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function renderExamSet() {
    const s = examSession, set = s.questions[s.index], part = s.part, fallback = !supportsSpeech || s.audioFallback, talk = part === 3 ? '대화' : '담화';
    const last = s.index === s.questions.length - 1, right = set.questions.filter((q, i) => s.picks[i] === q.answer).length;
    return `${back('#/exam', '문제 홈')}<div class="session-top"><span class="pill">Part ${part} · ${s.mode === 'wrong' ? '틀린 세트' : '실전 세트'}</span><p>${s.index + 1} / ${s.questions.length} 세트</p></div>${meter(s.index, s.questions.length, '세트 풀이 진행')}
      <section class="exam-question exam-set" data-question-id="${escape(set.id)}"><div class="exam-listening-heading">${icon('headphones')}<h1>세트 ${s.index + 1}</h1></div><p class="exam-set-direction" lang="en">Questions 1–3 refer to the following ${EXAM_TALKS[set.talkType]}.</p>
      <div class="button-row exam-audio-controls"><button id="exam-replay" class="secondary" data-action="exam-audio" aria-label="Part ${part} ${talk}와 질문 ${s.heard ? '다시 듣기' : '듣기'}" ${!supportsSpeech ? 'disabled' : ''}>${icon('volume-2')} ${s.heard ? '다시 듣기' : '듣기'}</button>${s.audioPlaying ? '<button data-action="exam-audio-stop" aria-label="문제 음성 정지">정지</button>' : ''}</div><p class="exam-note exam-audio-status">${fallback ? '음성을 재생할 수 없어 대본을 표시해요' : escape(s.audioStatus)}</p>${fallback && !s.answered ? renderSetScript(set, false) : ''}
      ${set.graphic ? renderExamGraphic(set.graphic, s.answered) : ''}
      <ol class="exam-set-questions">${set.questions.map((q, qi) => {
        const ok = s.picks[qi] === q.answer;
        return `<li class="exam-set-question"><h2><span class="exam-set-number">${qi + 1}.</span> <span lang="en">${escape(q.q)}</span></h2>${s.answered ? `<p class="exam-set-ko" lang="ko">${escape(q.ko.q)}</p>` : ''}<div class="choices exam-set-choices">${q.choices.map((text, index) => {
          const letter = `(${String.fromCharCode(65 + index)})`, picked = s.picks[qi] === index;
          const isRight = s.answered && index === q.answer, isWrong = s.answered && picked && !isRight;
          return `<button id="exam-choice-${qi}-${index}" class="choice exam-choice ${!s.answered && picked ? 'is-picked' : ''} ${isRight ? 'correct' : ''} ${isWrong ? 'incorrect' : ''}" data-action="exam-pick" data-q="${qi}" data-index="${index}" aria-label="${qi + 1}번 문항 ${letter} ${escape(text)}${isRight ? ', 정답' : isWrong ? ', 내 답, 오답' : ''}" ${s.answered ? 'aria-disabled="true"' : `aria-pressed="${picked}"`}><span class="choice-number">${letter}</span><span class="choice-text"><span lang="en">${escape(text)}</span>${s.answered ? `<small lang="ko">${escape(q.ko.choices[index])}</small>` : ''}</span><span class="choice-result">${isRight ? `${icon('check')} 정답` : isWrong ? `${icon('x')} 내 답` : ''}</span></button>`;
        }).join('')}</div>${s.answered ? `<div class="exam-set-feedback ${ok ? 'is-correct' : 'is-incorrect'}"><p class="exam-set-verdict">${icon(ok ? 'check' : 'x')} ${ok ? '정답' : '오답'} · 정답 (${String.fromCharCode(65 + q.answer)}) · ${escape(EXAM_TYPES[q.type])}</p><p>${escape(q.explain)}</p></div>` : ''}</li>`;
      }).join('')}</ol></section>
      ${s.answered ? `<p id="exam-feedback" class="exam-set-score" tabindex="-1">3문항 중 ${right}문항 정답</p>${renderSetScript(set, true)}<button id="exam-next" class="secondary full" data-action="exam-next">${last ? '결과 보기' : '다음 세트'} ${icon('arrow-right')}</button>`
        : `<button id="exam-grade" class="primary full" data-action="exam-grade" ${s.picks.includes(null) ? 'disabled' : ''}>채점</button><p class="exam-note">세 문항의 답을 모두 고르면 채점할 수 있어요</p>`}`;
  }

  function saveExamState() {
    try { storage.setItem(EXAM_KEY, JSON.stringify(examState)); }
    catch (_) { toast('문제 기록을 저장하지 못했어요. 저장 공간을 확인해 주세요.'); }
  }

  function pickExam(question, index) {
    const s = examSession;
    if (!s || s.route !== location.hash || s.finished || s.answered || !EXAM_PARTS[s.part].sets
      || ![0, 1, 2].includes(question) || !Number.isInteger(index) || index < 0 || index > 3) return;
    s.picks[question] = index;
    refreshExam();
  }

  function gradeExamSet() {
    const s = examSession;
    if (!s || s.route !== location.hash || s.finished || s.answered || !EXAM_PARTS[s.part].sets || s.picks.includes(null)) return;
    stopExamAudio('채점 완료 · 다시 듣기로 음성을 확인할 수 있어요');
    s.answered = true;
    const set = s.questions[s.index];
    let exam = loadExamState();
    set.questions.forEach((q, index) => {
      const id = `${set.id}-${index + 1}`, correct = s.picks[index] === q.answer;
      s.results.push({id, type:q.type, correct});
      exam = Core.recordExamAnswer(exam, id, correct);
    });
    examState = exam;
    saveExamState();
    render();
    quizAnnouncement.textContent = `채점 완료. 3문항 중 ${set.questions.filter((q, i) => s.picks[i] === q.answer).length}문항 정답`;
    document.querySelector('#exam-feedback')?.focus({preventScroll:true});
  }

  function answerExam(index) {
    const s = examSession;
    if (!s || s.route !== location.hash || s.finished || s.answered || EXAM_PARTS[s.part].sets || !Number.isInteger(index)) return;
    const q = s.questions[s.index];
    if (!q || index < 0 || index >= q.choices.length) return;
    stopExamAudio('답변 완료 · 다시 듣기로 음성을 확인할 수 있어요');
    s.selected = index;
    s.answered = true;
    const correct = index === q.answer;
    s.results.push({id:q.id, type:q.type, correct});
    examState = Core.recordExamAnswer(loadExamState(), q.id, correct);
    saveExamState();
    render();
    quizAnnouncement.textContent = `${correct ? '정답' : '오답'}. 정답 ${String.fromCharCode(65 + q.answer)}`;
    document.querySelector('#exam-next')?.focus({preventScroll:true});
  }

  function nextExam() {
    const s = examSession;
    if (!s || s.route !== location.hash || !s.answered || s.finished) return;
    stopExamAudio();
    if (s.index === s.questions.length - 1) s.finished = true;
    else { s.index++; s.selected = null; s.answered = false; s.heard = false; s.picks = [null, null, null]; s.audioFallback = false; s.audioStatus = examAudioIdle(s.part); }
    render();
    quizAnnouncement.textContent = s.finished ? '문제 세트 완료' : `${s.index + 1}/${s.questions.length} ${EXAM_PARTS[s.part].sets ? '세트' : '문제'}`;
    main.focus({preventScroll:true});
    window.scrollTo(0, 0);
  }

  function stopExamAudio(status) {
    examAudioGeneration++;
    clearTimeout(examAudioTimer);
    examVoiceCleanup?.();
    examVoiceCleanup = null;
    const active = examSession?.audioPlaying;
    if (examSession) {
      examSession.audioPlaying = false;
      if (status) examSession.audioStatus = status;
      if (examSession.audioUtterance) {
        examSession.audioUtterance.onend = null;
        examSession.audioUtterance.onerror = null;
        examSession.audioUtterance = null;
      }
    }
    if (active) cancelSpeech();
  }

  function refreshExam() {
    if (!examSession || examSession.route !== location.hash) return;
    const focused = document.activeElement?.id;
    render();
    if (focused?.startsWith('exam-')) document.getElementById(focused)?.focus({preventScroll:true});
  }

  const activeExamAudio = token => token === examAudioGeneration && examSession?.audioPlaying
    && examSession.route === location.hash && !examSession.finished && !document.hidden;

  function playExamAudio() {
    const s = examSession;
    if (!s || s.part === 5 || s.route !== location.hash || s.finished || !supportsSpeech || document.hidden) return;
    stopExamAudio();
    haltListening();
    s.audioPlaying = true;
    s.heard = true;
    s.audioFallback = false;
    s.audioStatus = '음성을 준비하고 있어요';
    const token = examAudioGeneration;
    refreshExam();
    function begin(voices) {
      if (!activeExamAudio(token)) return;
      const english = voices.filter(voice => voice.lang.toLowerCase().startsWith('en'));
      let queue;
      if (s.part === 2) {
        const questionVoice = speechVoice(english, 'en-US');
        const responseVoice = english.find(voice => voice !== questionVoice) || questionVoice;
        const q = s.questions[s.index];
        queue = [{text:q.q, voice:questionVoice, label:'질문'}].concat(q.choices.map((text, index) => ({text:`(${String.fromCharCode(65 + index)}) ${text}`, voice:responseVoice, label:`응답 (${String.fromCharCode(65 + index)})`})));
      } else {
        const set = s.questions[s.index], lang = voice => voice.lang.toLowerCase().replace('_', '-');
        // Different accents first, then any remaining English voices.
        const pool = [...new Set([...EXAM_ACCENTS.map(accent => english.find(voice => lang(voice) === accent)).filter(Boolean), ...english])];
        // Speaker code's first letter (M/W) picks a voice of that gender: an unused one first, then a reused one or a
        // neutral voice with pitch (women higher, men lower) so speakers stay distinguishable.
        const cast = {}, used = new Set();
        for (const speaker of new Set(set.script.map(line => line.s))) {
          const gender = speaker[0], same = pool.filter(voice => examVoiceGender(voice) === gender);
          const fresh = same.find(voice => !used.has(voice));
          const voice = fresh || same[0] || pool.find(voice => !examVoiceGender(voice) && !used.has(voice)) || pool.find(voice => !examVoiceGender(voice)) || pool[0];
          const alone = voice && !used.has(voice) && examVoiceGender(voice) === gender;
          used.add(voice);
          cast[speaker] = {voice, pitch:alone ? 1 : EXAM_PITCH[speaker] ?? EXAM_PITCH[gender] ?? 1};
        }
        queue = set.script.map((line, index) => ({text:line.t, ...cast[line.s], label:`${s.part === 3 ? '대화' : '담화'} ${index + 1}/${set.script.length}`}))
          .concat(set.questions.map((q, index) => ({text:`Question ${index + 1}. ${q.q}`, voice:pool[0], label:`${index + 1}번 질문`})));
      }
      function step(index) {
        if (!activeExamAudio(token)) return;
        if (index >= queue.length) {
          s.audioPlaying = false;
          s.audioStatus = s.part === 2 ? '재생 완료 · 알맞은 응답을 고르세요' : '재생 완료 · 세 문항의 답을 고르세요';
          refreshExam();
          return;
        }
        const item = queue[index], utterance = new SpeechSynthesisUtterance(item.text);
        utterance.lang = item.voice?.lang || 'en-US';
        utterance.rate = 1;
        utterance.pitch = item.pitch ?? 1;
        if (item.voice) utterance.voice = item.voice;
        s.audioUtterance = utterance;
        s.audioStatus = `${item.label} 재생 중`;
        refreshExam();
        let settled = false;
        const timeout = setTimeout(() => advance(true), Math.min(60000, Math.max(4000, item.text.length * 180 + 1500)));
        examAudioTimer = timeout;
        function advance(error) {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          utterance.onend = null;
          utterance.onerror = null;
          if (!activeExamAudio(token)) return;
          s.audioUtterance = null;
          if (error) {
            stopExamAudio('음성을 재생하지 못했어요');
            s.audioFallback = true;
            refreshExam();
          } else examAudioTimer = setTimeout(() => step(index + 1), 250);
        }
        utterance.onend = () => advance(false);
        utterance.onerror = () => advance(true);
        try { window.speechSynthesis.speak(utterance); } catch (_) { advance(true); }
      }
      step(0);
    }
    const voices = listenVoices();
    if (voices.length) { begin(voices); return; }
    const speech = window.speechSynthesis;
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      speech.removeEventListener?.('voiceschanged', changed);
      if (examVoiceCleanup === cleanup) examVoiceCleanup = null;
      begin(listenVoices());
    };
    const changed = () => { if (listenVoices().length) finish(); };
    const timeout = setTimeout(finish, 800);
    const cleanup = () => { settled = true; clearTimeout(timeout); speech.removeEventListener?.('voiceschanged', changed); };
    examVoiceCleanup = cleanup;
    examAudioTimer = timeout;
    speech.addEventListener?.('voiceschanged', changed);
  }

