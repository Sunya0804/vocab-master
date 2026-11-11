# 구조 정리: app.js 역할별 분리 (UI 워커)

사용자 요청: "파일을 역할별로 분리하면 편하지 않을까?" "우선 분리하고 수정하면 더 작업이 빠르지 않을까?"
목적: 여러 워커가 동시에 작업해도 같은 파일을 고치지 않게. **동작은 하나도 바꾸지 않는다**(코드 이동만).

## 시작 전
- 공유 폴더 `C:/Users/정우진/Documents/vocab_master`의 최신 파일을 작업 폴더로 가져온다(app.js, core.js, style.css, sw.js, index.html, test/, packages/, questions/). 예문 빈칸·독일어 B2~C2·Part 3·4가 모두 합쳐진 상태다.
- 이 작업 중에는 다른 워커가 app.js를 건드리지 않는다. 데이터(questions/, docs/questions/)는 다른 워커가 고칠 수 있으니 손대지 말 것. 커밋 금지.

## 방법
- 빌드 도구 없음 유지. 지금 app.js는 IIFE 하나에 상태(state, session, examSession, listening 등)를 클로저로 공유한다.
- 권장: 일반 `<script defer>` 여러 개 + 전역 네임스페이스 하나(예: `window.VM`)에 공유 상태·헬퍼를 둔다. ES 모듈로 해도 되지만 그러면 서로 바꾸는 `let` 상태는 공유 객체로 옮겨야 한다. 더 단순한 쪽을 골라 보고에 이유 한 줄.
- 나누는 단위(예시, 실제 코드에 맞게 조정 가능):
  - `js/shared.js`: escape·icon·toast·저장(persist)·패키지 조회·발음(speak, speechVoice) 등 공통
  - `js/study.js`: 홈·단어장·Day·카드·객관식 퀴즈·예문 빈칸·오답노트
  - `js/listen.js`: 듣기 모드
  - `js/exam.js`: 토익 문제(Part 2~5)
  - `js/settings.js`: 설정·백업·가져오기
  - `app.js`: 라우팅·이벤트 위임·init만
- 파일마다 맨 위 한 줄 주석으로 역할. 코드 내용 수정·정리·이름 변경은 하지 말 것(이동에 꼭 필요한 최소 변경만). 리팩터링 욕심 금지.
- index.html 스크립트 순서, sw.js APP_SHELL에 새 파일 추가, CACHE_VERSION 올림.
- test/german.test.js가 app.js 소스를 직접 읽는다(113행) → 새 파일 위치를 읽도록 테스트만 맞춤.

## 검증
- node test/*.test.js 전부 통과(현재 core 49, german 6, german-advanced 7, questions 14, toeic 6).
- 로컬 서버 + Playwright headless 390px: 홈, Day, 카드, 객관식 퀴즈, 예문 빈칸, 듣기 화면, 문제 홈, Part 3 세트, 설정 — 각 화면 진입·조작 1번씩, 콘솔 에러 0. 분리 전(공유 폴더 원본)과 분리 후 같은 화면 HTML(main.innerHTML)이 같은지 비교하면 가장 좋음. 스크린샷은 남기지 않아도 됨.
- 오프라인: 서비스 워커 설치 후 새 js 파일이 캐시에 들어가는지 확인.
보고: 파일별 줄 수, 공유 방식과 이유, 검증 결과, 남은 문제.
