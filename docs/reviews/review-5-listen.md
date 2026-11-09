# 5차 리뷰: 듣기 모드 (Claude 리뷰어, 읽기 전용)

기준: docs/tasks/review-5-listen.md. 대상 app.js(듣기), style.css, sw.js(v9-listen), SPEC.md.
방법: 코드 읽기 + Playwright headless(Chromium)에서 `speechSynthesis`·`SpeechSynthesisUtterance` 모킹(정상 onend / onend 없음 / cancel 뒤 늦은 onend·onerror / 음성 목록 변형 / 미지원). 서버는 `npx serve -l 5180 .`.
테스트: `node test/core.test.js` 41 통과, `node test/toeic.test.js` 6 통과, `node --check app.js sw.js` OK.

## 판정 요약
**출시 가능.** 큐 세대 토큰·화면 이동 정지·타임아웃·Day 끝 정지·설정 복구가 모두 의도대로 동작했고 콘솔 에러 0이다.
아래 1번(스페이스 키)은 출시 전에 고치길 권한다. 몇 줄 수정이다. 나머지는 낮음/참고.

## 문제 (심각도 순)

### 1. [중간] 버튼에 포커스가 있을 때 스페이스가 그 버튼 대신 재생/일시정지를 실행
- **파일:줄** `app.js:762-768`
- **문제** keydown 처리기는 input·select·textarea·contenteditable만 제외하고 `preventDefault()` 후 `toggleListening()`을 호출한다. 그래서 포커스된 버튼의 기본 동작(스페이스로 누르기)이 막힌다.
- **재현(확인됨)**
  - `#listen-next`에 포커스 → 스페이스: 위치는 1/20 그대로, 재생이 시작됨.
  - 목록의 `#listen-word-3`에 포커스 → 스페이스: 3번으로 이동하지 않고 재생/정지만 토글됨.
  - 키보드·스위치 사용자에게는 "다음"이나 목록 선택을 스페이스로 누를 수 없다(Enter는 동작).
- **고칠 방향** 제외 목록에 `button, a, summary, [role=button]`를 추가한다. 재생 버튼 자체는 네이티브 스페이스로 눌리므로 동작이 같다.
  ```js
  if (event.target.closest('input, select, textarea, [contenteditable], button, a')) return;
  ```

### 2. [낮음] aria-live 영역이 단어마다 새 요소로 교체됨 (스크린리더 낭독 여부 추측)
- **파일:줄** `app.js:166-171`(refreshListening → render → `main.innerHTML`), `app.js:298-299`
- **문제** 단계마다 main 전체를 다시 그려서 `.listen-card[aria-live]`와 `#listen-status[role=status]`가 새 노드가 된다(재생 2초 동안 교체 확인). 많은 스크린리더는 새로 삽입된 live 영역의 내용을 읽지 않으므로 aria-live가 의도대로 동작하지 않을 수 있다.
  - 실제 스크린리더로는 확인하지 못함(추측).
  - 반대로 낭독된다면 TTS와 겹쳐 들릴 수 있다.
- **고칠 방향** 둘 중 하나를 고른다.
  - 위치·단어·상태만 기존 노드의 textContent로 갱신한다.
  - 듣기 화면에서는 카드의 aria-live를 빼고 짧은 상태 문구만 유지되는 live 노드에 넣는다(TTS와 중복 방지).

### 3. [낮음, 추측] 음성 목록이 800ms 뒤에 오면 그 재생 내내 한국어를 건너뜀
- **파일:줄** `app.js:253-267`, `app.js:207`
- **문제** 처음 받은 `voices` 배열을 다음 단어에도 계속 넘긴다(`readListenWord(token, voices)`). Android Chrome처럼 voiceschanged가 늦으면 첫 판정이 "한국어 없음"이 된다. 그러면 일시정지 후 다시 재생할 때까지 뜻·해석이 빠지고, "한국어 음성이 없어 영어만 읽어요" 토스트도 잘못 뜬다(실기기 미확인).
- **고칠 방향** `readListenWord`에서 단어마다 `listenVoices()`를 다시 읽는다(빈 배열이면 이전 값 유지).

### 4. [낮음, 추측] 음성 목록이 빈 경우 첫 발화가 사용자 제스처 밖에서 시작됨
- **파일:줄** `app.js:255-267`
- **문제** voices가 비어 있으면 첫 `speak()`가 최대 800ms 타이머 뒤에 실행된다. iOS Safari는 제스처 밖의 첫 발화를 막는 경우가 있어 "재생 중"인데 소리가 안 날 수 있다. 소리가 안 나도 4초 타임아웃으로 단어는 넘어간다.
- **고칠 방향**
  - 실기기(iPhone)에서 확인한다.
  - 문제가 나오면 재생 버튼 클릭 안에서 빈 utterance(또는 첫 영어 단어)를 즉시 `speak()`한 뒤 목록을 기다린다.

## 참고 (결함 아님)
- **업데이트 직후 첫 실행은 이전 버전으로 열림.** 이번 테스트 브라우저에 이전 SW가 남아 있어 첫 로드에서 Day 화면에 [듣기]가 없었고, 새로고침하니 나타났다. 셸 cache-first 설계상 예상된 동작이고 이전 리뷰와 같다.
- **프로젝트 루트에 `%SystemDrive%/ProgramData/` 폴더가 있음.** 오늘 00:08에 생긴 것으로 이번 리뷰와 무관하다. 환경 변수가 풀리지 않은 채 실행된 도구의 생성물로 보인다(추측). 내용 확인 후 삭제를 권한다.
- **toeic 패키지 이름이 "토익 종합 보카 5804"로 바뀌어 있음.** packages/ 작업분이라 리뷰 대상 밖이다.

## 확인 항목별 결과
| # | 항목 | 결과 |
|---|---|---|
| 1 | 큐 세대 토큰 | 진입 시 자동 재생 0회. 재생 순서 `en 단어@0.85 → ko 뜻 → en 다음 단어…`가 목록과 일치. 재생 중 다음 5연타: 각 클릭마다 cancel 후 해당 단어만 발화, 겹친 발화(대기 중 speak) 0, cancel 뒤 120ms에 도착한 늦은 onend·onerror가 단계를 건너뛰지 않음. 속도 변경 시 현재 단어부터 1.2로 재시작, 목록 선택은 11번부터 재생, 일시정지 후 1.2초 동안 발화 0 |
| 2 | 화면 이동 정지 | Day로 hash 이동: cancel 1, 이후 발화 0. 뒤로가기로 듣기 복귀: 1/20·정지 상태, 발화 0. 재생 중 다른 Day 듣기로 이동: 새 큐 1/20·정지, 발화 0. 브라우저 뒤로가기도 동일. visibilitychange(hidden): cancel 1, "화면을 벗어나 일시정지했어요…" 표시. 다시 보임: 자동 재생 없음 |
| 3 | onend 누락 타임아웃 | onend가 오지 않는 모킹에서 단계 간격 4.17초 / 4.82초(4초 하한 + 150·650ms 간격)로 진행. 상한 공식 `max(4s, (글자수×180+1500)/rate)`, 최대 60초 → 150자 예문 @0.7배속 ≈ 40초로 충분 |
| 4 | 회귀 | 듣기 재생 중 카드로 이동: cancel 후 카드 자동 발음 `en-US available@0.88`. Day 🔊 버튼 `en-US @0.88` 그대로. `vocab-master-v1` 키 구성 `known,wrong,custom,progress,settings` 불변, `vocab-master-listen`은 백업 코드에서 참조 없음(app.js:15,129,139만). 손상값 `garbage{`, 범위 밖 `{"rate":5,"repeats":9,"examples":"yes"}`, `null`, `[1,2]`, 문자열 숫자 → 모두 0.85×/1회/예문 끔으로 복구 |
| 5 | 예외 처리 | 한국어 음성 없음: 영어만 발화, 안내 문구와 토스트 1회. 음성 목록 빈 경우: 800ms 대기 후 영어만. 미지원: Day의 [듣기] 비활성 + 안내, 듣기 화면 버튼 비활성·안내, 에러 0. Day 끝: 20/20에서 "이 Day의 듣기를 마쳤어요" 후 정지, 다시 재생하면 1번부터. 마지막 단어에서 다음·첫 단어에서 이전 비활성 |
| 6 | 접근성·모바일 | 이전/재생/다음 aria-label, aria-pressed, 목록 버튼 aria-label·aria-current 있음, 라벨 없는 버튼 0. 스페이스: 재생 버튼·select·체크박스에서는 정상(select는 토글 안 함, 체크박스는 체크만). 버튼 포커스 시 문제는 위 1번. 390px: scrollWidth 375 = clientWidth 375(가로 스크롤 없음), 컨트롤 91·127·91 × 52px. 재생 중 다시 그려도 스크롤 위치·포커스(`listen-word-12`) 유지 |
| 7 | 콘솔·SW | 모든 시나리오 콘솔 에러·경고 0(내 첫 모킹의 가짜 voice 객체로 생긴 에러는 모킹 오류라 제외). `CACHE_VERSION = vocab-master-shell-v9-listen`, 셸 목록 10개 모두 캐시됨, 이전 셸 캐시 삭제·PACKAGE_CACHE 유지 |

## 확인 못 한 것
- 실기기 확인을 못 했다(iOS Safari·Android Chrome 실제 TTS, 화면 잠금 중 재생).
- 실제 스크린리더 낭독을 확인하지 못했다.
- 모킹이라 Chrome의 "cancel 직후 speak 누락" 같은 엔진 버그는 재현 대상이 아니다. 그런 누락이 있어도 타임아웃으로 진행되는 것까지만 확인했다.

## 정리
- 5180 서버를 종료했다(리스너 없음). Playwright 브라우저를 닫았다.
- `.playwright-mcp/`와 스크래치 파일을 삭제했다. 테스트용 `__mock` localStorage 키는 브라우저 프로필 안에만 있었다.
