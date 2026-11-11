/* Listening mode: settings, playback and screen. */
  'use strict';
  const LISTEN_KEY = 'vocab-master-listen';
  const LISTEN_RATES = [.7, .85, 1, 1.2];
  let listenSettings = {rate:.85, examples:false, repeats:1};
  let listening = null, listenGeneration = 0, listenTimer, listenVoiceCleanup;
  let koreanVoiceWarningShown = false;
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
    cancelSpeech();
  }

  const activeListening = token => token === listenGeneration && listening?.playing
    && listening.route === location.hash && !document.hidden;

  function refreshListening() {
    if (!listening || listening.route !== location.hash) return;
    const focused = document.activeElement?.id;
    render();
    if (focused?.startsWith('listen-')) document.getElementById(focused)?.focus({preventScroll:true});
  }

  function readListenWord(token, voices) {
    if (!activeListening(token)) return;
    const currentVoices = listenVoices();
    if (currentVoices.length) voices = currentVoices;
    const word = listening.words[listening.index];
    const voiceFor = language => speechVoice(voices, language);
    const korean = voiceFor('ko-KR');
    listening.notice = korean ? '' : '한국어 음성이 없어 뜻과 예문 해석은 건너뛰어요. 기기의 한국어 음성을 설치해 주세요.';
    if (!korean && !koreanVoiceWarningShown) {
      koreanVoiceWarningShown = true;
      toast('한국어 음성이 없어 단어와 예문만 읽어요.');
    }
    warnMissingVoice(packageLang(listening.pkgId), voices, voiceFor(packageLang(listening.pkgId)));
    const queue = Array.from({length:listenSettings.repeats}, () => ({text:Core.spokenText(word[0]), lang:packageLang(listening.pkgId)}));
    if (korean) queue.push({text:word[1], lang:'ko-KR'});
    if (listenSettings.examples) {
      if (word[3]) queue.push({text:word[3], lang:packageLang(listening.pkgId)});
      if (word[4] && korean) queue.push({text:word[4], lang:'ko-KR'});
    }
    listening.status = `재생 중 · ${languageName(listening.pkgId)} 단어 → 뜻` + (listenSettings.examples ? ' → 예문 → 해석' : '');
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
      <section class="listen-card" aria-label="현재 듣는 단어"><h2 class="english" lang="${escape(packageLang(pkg.id))}">${escape(word[0])}</h2>${posBadge(word)}<p class="listen-meaning" lang="ko">${escape(word[1])}</p>${wordGrammarHTML(word, pkg.id)}${exampleHTML(word, false, false, pkg.id)}</section>
      <p id="listen-status" class="session-note">${supportsSpeech ? escape(s.status) : '이 브라우저는 음성 합성을 지원하지 않아요. 음성을 지원하는 브라우저에서 열어 주세요.'}</p>
      ${s.notice ? `<p class="offline-banner listen-notice">${escape(s.notice)}</p>` : ''}
      <div class="button-row listen-controls"><button id="listen-prev" data-action="listen-prev" aria-label="이전 단어" ${!supportsSpeech || s.index === 0 ? 'disabled' : ''}>${icon('arrow-left')} 이전</button><button id="listen-toggle" class="secondary" data-action="listen-toggle" aria-label="듣기 ${s.playing ? '일시정지' : '재생'}" aria-pressed="${s.playing}" ${!supportsSpeech ? 'disabled' : ''}>${s.playing ? `${icon('pause')} 일시정지` : `${icon('play')} 재생`}</button><button id="listen-next" data-action="listen-next" aria-label="다음 단어" ${!supportsSpeech || s.index === s.words.length - 1 ? 'disabled' : ''}>다음 ${icon('arrow-right')}</button></div>
      <div class="listen-options"><label class="field">재생 속도<select id="listen-rate" ${!supportsSpeech ? 'disabled' : ''}>${LISTEN_RATES.map(rate => `<option value="${rate}" ${rate === listenSettings.rate ? 'selected' : ''}>${rate.toFixed(rate === .85 ? 2 : 1)}×</option>`).join('')}</select></label><label class="field">단어 반복<select id="listen-repeats" ${!supportsSpeech ? 'disabled' : ''}>${[1, 2, 3].map(count => `<option value="${count}" ${count === listenSettings.repeats ? 'selected' : ''}>${count}회</option>`).join('')}</select></label><label class="toggle-label"><input id="listen-examples" type="checkbox" ${listenSettings.examples ? 'checked' : ''} ${!supportsSpeech ? 'disabled' : ''}> 예문과 해석 읽기</label></div>
      <p class="session-note">화면을 벗어나거나 기기가 잠기면 재생이 멈출 수 있어요. 스페이스 키로 재생·일시정지할 수 있어요.</p>
      <div class="section-heading"><h2>듣기 순서</h2><small>단어를 누르면 그 위치부터 재생</small></div><ol class="listen-list">${s.words.map((item, index) => `<li><button id="listen-word-${index}" class="listen-word" data-action="listen-jump" data-index="${index}" ${index === s.index ? 'aria-current="true"' : ''} aria-label="${index + 1}번째 단어 ${escape(item[0])}부터 재생" ${!supportsSpeech ? 'disabled' : ''}><span class="listen-number">${String(index + 1).padStart(2, '0')}</span><span class="listen-word-text"><strong lang="${escape(packageLang(pkg.id))}">${escape(item[0])}</strong><span lang="ko">${escape(item[1])}</span></span>${icon('play')}</button></li>`).join('')}</ol>`;
  }

