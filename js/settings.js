/* Settings: import preview, package deletion, backup and restore. */
  'use strict';
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
      <section class="settings-section"><h2>학습 환경</h2><label class="toggle-row"><span><strong>카드 자동 발음</strong><span class="toggle-description">${supportsSpeech ? '다음 카드를 열면 단어장 언어로 발음을 들려줘요.' : '이 브라우저에서는 발음을 지원하지 않아요.'}</span></span><input type="checkbox" id="auto-speak" aria-label="카드 자동 발음" ${state.settings?.autoSpeak ? 'checked' : ''} ${!supportsSpeech ? 'disabled' : ''}></label></section>
      <section class="settings-section"><h2>백업과 복원</h2><p>단어·문제 학습 기록과 가져온 단어장을 JSON 파일로 보관하세요. 복원하면 백업에 포함된 기록이 교체돼요.</p><button class="secondary full" data-action="export">백업 내보내기 ${icon('download')}</button><label class="field" style="margin-top:16px">백업 JSON 복원<input id="restore-file" type="file" accept=".json,application/json"></label></section>
      <section class="settings-section"><h2>학습 기록 초기화</h2><p>아는 단어, 오답노트와 Day별 기록을 지워요. 가져온 단어장, 자동 발음 설정과 문제 기록은 유지해요.</p><button class="danger full" data-action="reset">학습 기록 초기화</button></section><section class="settings-section"><h2>문제 기록 초기화</h2><p>문제 풀이 횟수, 첫 시도 정답률과 틀린 문제 기록을 지워요. 단어 학습 기록은 유지해요.</p><button class="danger full" data-action="reset-exam">문제 기록 초기화</button></section><p class="app-footer">Vocab Master<br>기록은 이 브라우저에 저장됩니다.</p>`;
  }

  function updatePreview() {
    draft.words = Core.parseImport(draft.text);
    main.querySelector('#import-preview').innerHTML = previewHTML();
    const submit = main.querySelector('#import-submit');
    submit.disabled = !draft.words.length;
    submit.textContent = draft.words.length ? `${draft.words.length}개 단어 가져오기` : '단어 가져오기';
  }

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
    const blob = new Blob([JSON.stringify({version:1, exportedAt:new Date().toISOString(), state, exam:examState, mock:mockState}, null, 2)], {type:'application/json'});
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
      const restoredExam = json.exam === undefined ? examState : json.exam;
      if (!Core.validExamState(restoredExam)) throw new BackupError('문제 학습 기록의 형식이 올바르지 않아요.');
      // Backups made before mock tests existed keep the current mock records.
      const restoredMock = json.mock === undefined ? mockState : json.mock;
      if (!Core.validMockState(restoredMock)) throw new BackupError('모의고사 기록의 형식이 올바르지 않아요.');
      if (!confirm('백업으로 복원할까요? 현재 학습 기록과 가져온 단어장이 백업 내용으로 교체됩니다.')) return;
      // Feed the validated payload through Core's storage boundary as well.
      const restored = Core.loadState({getItem:key => key === 'vocab-master-v1' ? JSON.stringify(value) : null, setItem:() => {}});
      const previous = state, previousExam = examState, previousMock = mockState;
      const before = ['vocab-master-v1', 'vocab-master-preferences-v1', EXAM_KEY, MOCK_KEY].map(key => [key, storage.getItem(key)]);
      state = restored;
      state.settings = value.settings || {autoSpeak:false};
      try {
        storage.setItem(EXAM_KEY, JSON.stringify(restoredExam));
        storage.setItem(MOCK_KEY, JSON.stringify(restoredMock));
        if (!persist()) throw new Error('Restore unavailable');
      } catch (_) {
        state = previous;
        examState = previousExam;
        mockState = previousMock;
        for (const [key, raw] of before) try { if (raw === null) storage.removeItem(key); else storage.setItem(key, raw); } catch (_) { /* Keep the save error visible. */ }
        toast('백업을 저장하지 못했어요. 저장 공간과 브라우저 설정을 확인해 주세요.');
        return;
      }
      examState = restoredExam;
      mockState = restoredMock;
      stopExamAudio(); examSession = null;
      stopMock(); mockRun = null;
      session = null; render(); toast('백업을 복원했어요.');
    } catch (error) {
      const reason = error instanceof SyntaxError ? 'JSON 형식이 아니에요. 백업 JSON 파일을 선택해 주세요.'
        : error instanceof BackupError ? error.message : '파일을 읽거나 복원하지 못했어요. 백업 파일을 다시 확인해 주세요.';
      toast(`백업을 복원하지 못했어요. ${reason}`);
    }
  }

