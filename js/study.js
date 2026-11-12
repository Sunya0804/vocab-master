/* Study screens: home, word list, Day, cards, multiple-choice quiz, example cloze and wrong-answer notes. */
  'use strict';
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
    const languages = [...new Set(all.map(item => languageName(item.id)))], language = languageName(pkg.id);
    return `${intro('', pkg.name, `${days.length} Days · 하루 20단어`)}
      ${!navigator.onLine ? '<p class="offline-banner">오프라인 학습 중 · 기록은 이 기기에 저장돼요.</p>' : ''}
      <div class="home-controls">${languages.length > 1 ? `<div class="language-switch" role="group" aria-label="언어 선택">${languages.map(name => `<button class="segment" data-action="pick-language" data-language="${escape(name)}" aria-pressed="${name === language}">${escape(name)}</button>`).join('')}</div>` : ''}
      <label class="package-picker"><span class="field-label">지금 학습할 ${escape(language)} 단어장</span><select id="package-select" aria-label="${escape(language)} 단어장 선택">${all.filter(item => languageName(item.id) === language).map(item => `<option value="${escape(item.id)}" ${item.id === pkg.id ? 'selected' : ''}>${escape(item.name)}</option>`).join('')}</select></label>
      ${levels.length ? `<div class="level-filter" role="group" aria-label="난이도 레벨 선택"><button class="level-chip" data-action="filter-level" data-level="-1" aria-pressed="${selectedLevel === null}">전체</button>${levels.map((name, index) => `<button class="level-chip" data-action="filter-level" data-level="${index}" aria-pressed="${selectedLevel === name}">${escape(name)}</button>`).join('')}</div>` : ''}</div>
      ${visibleDays.length ? `<section class="hero" aria-label="오늘의 Day 카드"><div class="hero-heading"><h2>오늘의 Day ${String(continueDay + 1).padStart(2, '0')}</h2><span>${days[continueDay].length}단어</span></div><ul class="hero-words">${days[continueDay].slice(0, 3).map(word => `<li><strong lang="${escape(packageLang(pkg.id))}" title="${escape(word[0])}">${escape(word[0])}</strong><span title="${escape(word[1])}">${escape(word[1])}</span></li>`).join('')}</ul><div class="hero-meta"><span>아는 단어</span><span>${days[continueDay].filter(word => isKnown(pkg.id, word)).length} / ${days[continueDay].length}</span></div>${meter(days[continueDay].filter(word => isKnown(pkg.id, word)).length, days[continueDay].length, '아는 단어 비율', false, true)}<a class="button-link primary full continue-learning" href="${dayHash(pkg.id, continueDay)}">${nextDay === undefined ? '다시 학습' : '이어서 학습'} ${icon('arrow-right')}</a></section>` : ''}
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
    const clozeCount = words.filter(word => clozeFor({pkgId:pkg.id, word})).length;
    return `${back('#/home')}${intro(pkg.name, `Day ${String(day + 1).padStart(2, '0')}`, `${words.length}개 단어 · 카드 · 퀴즈 · 예문 빈칸 · 듣기`)}
      <div class="stack"><button class="primary" data-action="start-cards" data-pkg="${escape(pkg.id)}" data-day="${day}">카드 학습 시작 ${icon('arrow-right')}</button><div class="button-row"><button data-action="start-quiz" data-pkg="${escape(pkg.id)}" data-day="${day}" data-mode="en2ko">퀴즈 ${languageShort(pkg.id)} ${icon('arrow-right')} 한</button><button data-action="start-quiz" data-pkg="${escape(pkg.id)}" data-day="${day}" data-mode="ko2en">퀴즈 한 ${icon('arrow-right')} ${languageShort(pkg.id)}</button></div><button class="secondary" data-action="start-cloze" data-pkg="${escape(pkg.id)}" data-day="${day}" ${!clozeCount ? 'disabled' : ''}>예문 빈칸${clozeCount && clozeCount < words.length ? ` · ${clozeCount}문제` : ''} ${icon('arrow-right')}</button>${!clozeCount ? '<p class="session-note">예문에서 단어를 찾지 못해 예문 빈칸 문제를 만들 수 없어요.</p>' : ''}<button class="secondary" data-action="start-listen" data-pkg="${escape(pkg.id)}" data-day="${day}" aria-label="Day ${day + 1} 듣기" ${!supportsSpeech ? 'disabled' : ''}>${icon('headphones')} 듣기</button>${!supportsSpeech ? '<p class="session-note">이 브라우저는 음성 합성을 지원하지 않아요.</p>' : ''}</div>
      <div class="section-heading"><h2>오늘의 단어 <span class="pill">${words.length}</span></h2><label class="toggle-label"><input id="hide-meanings" type="checkbox" ${meaningsHidden ? 'checked' : ''}> 뜻 가리기</label></div>
      <ul class="word-list">${words.map((word, index) => `<li class="word-row"><div class="word-content">${wordHTML(word, meaningsHidden, true, pkg.id)}</div>${speaker(word[0], pkg.id)}<label class="check-label"><input type="checkbox" data-action="known" data-pkg="${escape(pkg.id)}" data-day="${day}" data-index="${index}" aria-label="${escape(word[0])} 알아요" ${isKnown(pkg.id, word) ? 'checked' : ''}></label></li>`).join('')}</ul>`;
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
    if (type === 'cloze') {
      next.questions = Core.shuffle(items.map(item => ({...item, ...clozeFor(item)})).filter(question => question.cloze));
      Object.assign(next, {hint:0, hinted:0, input:'', notice:'', lastCorrect:null});
      if (!next.questions.length) { toast('예문 빈칸 문제를 만들 수 있는 단어가 없어요.'); return; }
    }
    session = next;
    if (location.hash === route) render(); else location.hash = route;
  }

  function autoSpeak() {
    if (session?.type === 'cards' && !session.finished && state.settings?.autoSpeak) speak(session.items[session.index].word[0], packageLang(session.items[session.index].pkgId));
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
      <section class="study-card ${s.revealed ? 'is-revealed' : ''}" aria-label="학습 카드"><button class="card-face" data-action="reveal" aria-expanded="${s.revealed}" aria-label="${escape(item.word[0])}, ${s.revealed ? escape(item.word[1]) : '탭해서 뜻 보기'}"><span class="eyebrow">${s.revealed ? '뜻 확인' : '뜻 떠올리기'}</span><span class="english" lang="${escape(packageLang(item.pkgId))}">${escape(item.word[0])}</span>${s.revealed ? `${posBadge(item.word)}<span class="card-meaning">${escape(item.word[1])}</span>` : '<span class="card-hint">카드를 탭하면 뜻이 나타나요</span>'}</button>${s.revealed ? `${wordGrammarHTML(item.word, item.pkgId)}${exampleHTML(item.word, false, true, item.pkgId)}${sensesHTML(item.word, false, true, item.pkgId)}` : ''}</section>
      <div class="card-bottom"><p>${s.revealed ? '알고 있는 단어인지 선택해 주세요' : '뜻을 떠올려 본 뒤 카드를 뒤집어 보세요'}</p>${speaker(item.word[0], item.pkgId)}</div>
      <div class="button-row study-actions"><button class="danger-fill" data-action="card-answer" data-known="false">${icon('rotate-ccw')} 몰라요</button><button class="secondary" data-action="card-answer" data-known="true">${icon('check')} 알아요</button></div><p class="session-note">모르는 단어는 오답노트에서 다시 만나요.</p>`;
  }

  function renderQuiz() {
    const s = session;
    if (s.index >= s.questions.length) {
      const score = Math.round(s.correct / s.questions.length * 100);
      return `${back(s.returnHash, '돌아가기')}${intro('', s.type === 'cloze' ? '예문 빈칸 결과' : '퀴즈 결과')}<section class="result-hero"><span class="eyebrow">퀴즈 점수</span><div class="result-score">${score}<small> 점</small></div><p>${s.questions.length}문제 중 ${s.correct}개 정답 · ${escape(s.label)}</p>${s.type === 'cloze' ? `<p>힌트 사용 ${s.hinted}문제</p>` : ''}</section><div class="stack"><button class="secondary" data-action="retry-quiz" ${!s.missed.length ? 'disabled' : ''}>틀린 것만 다시${s.missed.length ? ` · ${s.missed.length}개` : ''}</button><button data-action="return">돌아가기</button></div><div class="section-heading"><h2>틀린 단어</h2><small>${s.missed.length}개</small></div>${s.missed.length ? `<ul class="word-list">${s.missed.map(item => `<li class="word-row"><div class="word-content">${wordHTML(item.word, false, false, item.pkgId)}</div>${speaker(item.word[0], item.pkgId)}</li>`).join('')}</ul>` : '<p class="session-note">틀린 단어가 없어요. 다음 Day에도 도전해 보세요.</p>'}`;
    }
    const question = s.questions[s.index];
    return `${back(s.returnHash, '퀴즈 나가기')}<div class="session-top"><span class="pill">${s.mode === 'en2ko' ? `${escape(languageName(question.pkgId))}에서 한국어` : `한국어에서 ${escape(languageName(question.pkgId))}`}</span><p>문제 <strong>${s.index + 1}</strong> / ${s.questions.length}</p></div>${meter(s.index, s.questions.length, '퀴즈 진행')}<div class="quiz-prompt"><span class="eyebrow">${s.mode === 'en2ko' ? '알맞은 뜻을 골라 주세요' : `알맞은 ${escape(languageName(question.pkgId))} 단어를 골라 주세요`}</span><h1 lang="${s.mode === 'en2ko' ? escape(packageLang(question.pkgId)) : 'ko'}">${escape(question.prompt)}</h1></div><div class="choices">${question.choices.map((choice, index) => {
      const correct = s.answered && choice === question.answer;
      const incorrect = s.answered && choice === s.selected && choice !== question.answer;
      return `<button class="choice ${correct ? 'correct' : ''} ${incorrect ? 'incorrect' : ''}" data-action="answer" data-index="${index}" aria-disabled="${s.answered}"><span class="choice-number">${index + 1}</span><span class="choice-text">${escape(choice)}</span><span class="choice-result">${correct ? '정답' : incorrect ? '오답' : ''}</span></button>`;
    }).join('')}</div><p class="answer-feedback">${s.answered ? s.selected === question.answer ? '정답이에요' : `정답: ${escape(question.answer)}` : '알맞은 답을 선택해 주세요'}</p><p class="session-note">오답은 2번 연속 맞히면 오답노트에서 졸업해요.</p>`;
  }

  function renderCloze() {
    const s = session;
    if (s.index >= s.questions.length) return renderQuiz();
    const q = s.questions[s.index];
    const lang = escape(packageLang(q.pkgId));
    // Hint letters run across blanks, so "a couple of" reveals "a" then "c".
    const maxHint = Math.min(2, q.cloze.answer.replace(/ /g, '').length - 1);
    let hintLeft = s.hint;
    const sentence = q.cloze.segments.map(segment => {
      if (typeof segment === 'string') return escape(segment);
      if (s.answered) return `<strong>${escape(segment.blank)}</strong>`;
      const shown = segment.blank.slice(0, hintLeft);
      hintLeft -= shown.length;
      return `<span class="cloze-blank"><span aria-hidden="true">${escape(shown)}${'_'.repeat(segment.blank.length - shown.length)}</span><span class="sr-only">빈칸 ${segment.blank.length}글자${shown ? `, ${escape(shown)}로 시작` : ''}</span></span>`;
    }).join('');
    const feedback = !s.answered ? escape(s.notice || '예문 뜻을 보고 빈칸에 들어갈 단어를 입력해 주세요')
      : s.lastCorrect ? `${icon('check')} 정답이에요`
      : `${icon('x')} 오답이에요 · 정답 <strong lang="${lang}">${escape(q.cloze.answer)}</strong> · 내 답 <span lang="${lang}">${escape(s.input.trim())}</span>`;
    return `${back(s.returnHash, '퀴즈 나가기')}<div class="session-top"><span class="pill">예문 빈칸</span><p>문제 <strong>${s.index + 1}</strong> / ${s.questions.length}</p></div>${meter(s.index, s.questions.length, '예문 빈칸 진행')}
      <section class="cloze-card${s.answered ? ` is-${s.lastCorrect ? 'correct' : 'incorrect'}` : ''}" aria-label="예문 빈칸 문제"><div class="example-line"><p class="cloze-sentence" lang="${lang}">${sentence}</p>${s.answered ? speaker(q.exWord[3], q.pkgId) : ''}</div>${q.exWord[4] ? `<p class="cloze-translation" lang="ko">${escape(q.exWord[4])}</p>` : ''}${s.answered ? `<div class="cloze-word"><span class="english" lang="${lang}">${escape(q.word[0])}</span>${posBadge(q.word)}${speaker(q.word[0], q.pkgId)}</div><p class="card-meaning">${escape(q.word[1])}</p>${q.sense ? `<p class="cloze-sense">이 예문의 뜻 · ${escape(q.sense)}</p>` : ''}` : ''}</section>
      <form id="cloze-form" class="cloze-form" novalidate><label for="cloze-input">빈칸에 들어갈 ${escape(languageName(q.pkgId))} 단어</label><div class="cloze-row"><input id="cloze-input" type="text" lang="${lang}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" value="${escape(s.input)}" aria-describedby="cloze-feedback" ${s.answered ? 'readonly' : ''}><button type="submit" class="primary" ${s.answered ? 'disabled' : ''}>확인</button></div></form>
      <p id="cloze-feedback" class="answer-feedback">${feedback}</p>
      ${s.answered ? `<button class="primary" id="cloze-next" data-action="cloze-next">${s.index + 1 >= s.questions.length ? '결과 보기' : '다음'} ${icon('arrow-right')}</button>` : `<button class="secondary" id="cloze-hint" data-action="cloze-hint" ${s.hint >= maxHint ? 'disabled' : ''}>힌트 보기 · ${s.hint}/${maxHint}</button><p class="session-note">힌트를 보면 첫 글자부터 최대 두 글자까지 보여요.</p>`}`;
  }

  function gradeCloze() {
    const s = session;
    if (!s || s.type !== 'cloze' || s.answered || s.finished) return;
    const q = s.questions[s.index];
    if (!s.input.trim()) { s.notice = '답을 입력해 주세요.'; render(); main.querySelector('#cloze-input')?.focus({preventScroll:true}); return; }
    s.answered = true;
    s.notice = '';
    s.lastCorrect = Core.clozeCorrect(s.input, q.cloze.answer, packageLang(q.pkgId).startsWith('de'));
    Core.recordAnswer(state, q.pkgId, q.word, s.lastCorrect);
    if (s.lastCorrect) s.correct++;
    else s.missed.push({pkgId:q.pkgId, word:q.word});
    if (s.hint) s.hinted++;
    if (s.index === s.questions.length - 1) completeSession();
    persist();
    render();
    quizAnnouncement.textContent = `문제 ${s.index + 1}. ${s.lastCorrect ? '정답이에요' : `오답이에요. 정답: ${q.cloze.answer}`}`;
    main.querySelector('#cloze-next')?.focus({preventScroll:true});
  }

  function renderWrong() {
    const entries = wrongEntries();
    return `${intro('', '오답노트', '2번 연속 맞힌 단어는 오답노트에서 빠져요')}<div class="section-heading"><h2>오답노트 <span class="pill">${entries.length}개</span></h2>${entries.length ? '<button class="danger" data-action="clear-wrong">전체 비우기</button>' : ''}</div>${entries.length ? `<div class="button-row"><button class="secondary" data-action="wrong-cards">오답 카드 학습</button><button class="secondary" data-action="wrong-quiz">오답 퀴즈</button><button class="secondary" data-action="wrong-cloze">예문 빈칸</button></div><p class="session-note">많이 틀린 단어부터 표시해요 · 모든 단어장 통합</p><ul class="word-list">${entries.map(([id, word]) => `<li class="word-row"><div class="word-content">${wordHTML(wrongWord(word), false, false, word.pkg)}<small>${escape(findPackage(word.pkg)?.name || '이전 단어장')} · 오답 ${word.miss}회 · 연속 정답 ${word.streak}/2</small></div>${speaker(word.en, word.pkg)}<button class="icon-button danger" data-action="delete-wrong" data-id="${escape(id)}" aria-label="${escape(word.en)} 오답노트에서 삭제">${icon('x')}</button></li>`).join('')}</ul>` : empty('오답노트가 비어 있어요', '학습 중 모르는 단어와 퀴즈에서 틀린 단어가 여기에 모여요.')}`;
  }

  const renderSession = () => session.type === 'cards' ? renderCards() : session.type === 'cloze' ? renderCloze() : renderQuiz();

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

