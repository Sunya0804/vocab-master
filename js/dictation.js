/* Word dictation shares cloze spelling rules and the existing wrong-answer store. */
'use strict';
function renderDictation(pkg, day, unit) {
  if (!supportsSpeech) return empty('받아쓰기를 지원하지 않는 브라우저예요', '음성 합성을 지원하는 브라우저에서 이용해 주세요.', dayHash(pkg.id, day), 'Day로 돌아가기');
  if (!session || session.route !== location.hash) {
    session = {type:'dictation', route:location.hash, items:Core.shuffle(unit.words.map(word => ({pkgId:pkg.id, word}))), index:0, input:'', answered:false, correct:0, missed:[], returnHash:dayHash(pkg.id, day), label:unit.label};
  }
  const s = session;
  if (s.index >= s.items.length) return `${back(s.returnHash)}${intro('', '받아쓰기 결과')}<section class="result-hero"><div class="result-score">${Math.round(s.correct / s.items.length * 100)}<small> 점</small></div><p>${s.items.length}문제 중 ${s.correct}개 정답</p></section>${s.missed.length ? '<button class="secondary" data-action="dictation-retry">틀린 단어 다시 듣기</button><p class="session-note">틀린 단어는 오답노트에도 모았어요.</p>' : '<p class="session-note">모든 단어를 맞혔어요.</p>'}<a class="button-link full" href="${s.returnHash}">Day로 돌아가기</a>`;
  const item = s.items[s.index];
  return `${back(s.returnHash, '학습 나가기')}<div class="session-top"><span class="pill">${escape(s.label)} · 받아쓰기</span><p>${s.index + 1} / ${s.items.length}</p></div>${meter(s.index, s.items.length, '받아쓰기 진행')}
    <section class="dictation-card"><h1>듣고 철자를 입력해 주세요</h1><button class="secondary" data-action="dictation-play">${icon('volume-2')} 발음 듣기</button><p class="session-note">${packageLang(pkg.id).startsWith('de') ? '대소문자는 구분하지 않아요. ä·ö·ü·ß는 ae·oe·ue·ss로 입력해도 돼요.' : '대소문자는 구분하지 않아요.'}</p></section>
    <form id="dictation-form" class="cloze-form"><label for="dictation-input">들은 단어</label><div class="cloze-row"><input id="dictation-input" lang="${escape(packageLang(pkg.id))}" value="${escape(s.input)}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-describedby="dictation-feedback" ${s.answered ? 'readonly' : ''}><button type="submit" class="primary" ${s.answered ? 'disabled' : ''}>확인</button></div></form>
    <div id="dictation-feedback" aria-live="polite">${s.answered ? `<p class="answer-feedback">${s.lastCorrect ? '정답이에요' : '오답이에요'}</p><div class="stats-book"><strong lang="${escape(packageLang(pkg.id))}">${escape(Core.dictationAnswer(item.word))}</strong><p>${escape(item.word[1])}</p></div><button class="primary full" data-action="dictation-next">${s.index + 1 === s.items.length ? '결과 보기' : '다음'}</button>` : `<p class="answer-feedback">${escape(s.notice || '발음 듣기를 누른 뒤 입력해 주세요.')}</p>`}</div>`;
}

main.addEventListener('input', event => {
  if (event.target.id === 'dictation-input' && session?.type === 'dictation') session.input = event.target.value;
});
main.addEventListener('submit', event => {
  if (event.target.id !== 'dictation-form') return;
  event.preventDefault();
  const s = session;
  if (s?.type !== 'dictation' || s.answered) return;
  if (!s.input.trim()) { s.notice = '답을 입력해 주세요.'; render(); main.querySelector('#dictation-input')?.focus(); return; }
  const item = s.items[s.index];
  s.lastCorrect = Core.clozeCorrect(s.input, Core.dictationAnswer(item.word), packageLang(item.pkgId).startsWith('de'));
  s.answered = true;
  Core.recordAnswer(state, item.pkgId, item.word, s.lastCorrect);
  if (s.lastCorrect) s.correct++; else s.missed.push(item);
  persist(); render();
  quizAnnouncement.textContent = s.lastCorrect ? '정답이에요' : `오답이에요. 정답: ${Core.dictationAnswer(item.word)}`;
  main.querySelector('[data-action="dictation-next"]')?.focus();
});
main.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  if (button.dataset.action === 'start-dictation') { location.hash = `#/dictation/${path(button.dataset.pkg)}/${button.dataset.day}`; return; }
  const s = session;
  if (s?.type !== 'dictation') return;
  if (button.dataset.action === 'dictation-play' && s.items[s.index]) speak(Core.dictationAnswer(s.items[s.index].word), packageLang(s.items[s.index].pkgId));
  if (button.dataset.action === 'dictation-next' && s.answered) {
    cancelSpeech(); Object.assign(s, {index:s.index + 1, input:'', answered:false, notice:''}); render(); main.querySelector('#dictation-input, [data-action="dictation-retry"]')?.focus();
  }
  if (button.dataset.action === 'dictation-retry') {
    Object.assign(s, {items:Core.shuffle(s.missed), index:0, input:'', answered:false, correct:0, missed:[], notice:''}); render(); main.querySelector('[data-action="dictation-play"]')?.focus();
  }
});
