# UI 10차: 토익 Part 3·4 풀이 화면 (Codex UI 워커)

먼저 `docs/tasks/exam-lc-spec.md`(세트 형식)를 읽는다. 기존 Part 5·2 문제 기능(app.js `renderExamHome`·`makeExamSession`·`playExamAudio`, core.js `selectExamQuestions`·`recordExamAnswer`·`examStats`)을 **확장**하는 작업이다. 새 화면 체계를 따로 만들지 말 것.
수정 가능: app.js, core.js, style.css, index.html, sw.js, test/core.test.js. questions/·docs/questions/ 데이터 수정 금지.
지금 `questions/toeic-part3.json`, `toeic-part4.json`은 없다. 개발용으로 명세 형식대로 세트 2~3개짜리 샘플 파일을 직접 만들어 써도 된다(작성자 4명이 쓰는 중이고 총괄이 나중에 실제 52/40세트로 덮어씀).

## 기능
- 문제 홈: Part 3·4 카드 추가(순서: Part 2, 3, 4, 5 — 시험 순서). 카드 문구 "푼 문제 N/전체 문항 수 · 첫 시도 정답률 N%"(문항 = 세트×3). 홈 소개 문구도 네 파트로.
- 데이터: `questions/toeic-part3.json`, `toeic-part4.json` = `{version, part, sets:[...]}`. sw.js QUESTION_FILES에 추가, CACHE_VERSION 올림. 파일이 없거나 형식이 틀리면 그 카드만 "준비 중" 표시(다른 파트는 정상).
- 실전 세트: Part 3 = 13세트(39문항), Part 4 = 10세트(30문항). `selectExamQuestions`를 세트 배열에 그대로 써서 세트 난이도 25/45/30 비율로 추출(세트에도 id·difficulty 있음). 난이도 필터·틀린 문제 모드도 세트 단위(틀린 문제 = 아직 다시 맞히지 못한 문항이 하나라도 있는 세트).
- 세트 풀이 화면(실제 시험처럼):
  1. 상단에 "Questions 1–3 refer to the following conversation." (Part 4는 talkType에 맞게 telephone message / announcement / excerpt from a meeting / advertisement / broadcast / tour / speech) 와 세트 번호.
  2. `graphic`이 있으면 표로 표시(title, 머리글 행, `titleKo`는 답한 뒤 공개).
  3. 질문 3개와 보기 (A)~(D)를 **처음부터 보여 줌**(실제 시험도 시험지에 인쇄). 대본은 숨김.
  4. "듣기" 버튼: 대본을 줄마다 speechSynthesis로 읽고(화자 코드마다 다른 영어 음성, 가능하면 en-US/en-GB/en-AU 등 서로 다른 억양. 음성이 하나뿐이면 pitch로 구분: M 0.9, W 1.1, M2 0.8, W2 1.25), 이어서 질문 3개를 읽음. 기존 Part 2 음성 선택·취소 로직 재사용, 화면 이동 시 중단, 다시 듣기, 음성 미지원 기기는 대본을 바로 보여 주는 대체 표시.
  5. 세 문항 각각 보기 선택(바꾸기 가능) → 세 개 다 고르면 "채점" 활성화. 채점 후 문항마다 정답/오답(색만으로 표시하지 않음), ko 질문·보기, explain, 그리고 대본 전체(화자 표시 + 영문 + scriptKo) 공개. "다음 세트".
  6. 결과: 점수(문항 기준), 문항 type별 정답 수(type 한국어 이름: 주제·목적, 화자·장소, 세부 정보, 이유·문제, 제안·요청, 다음 할 일, 추론, 화자 의도, 시각 자료).
- 기록: 기존 `vocab-master-exam` 그대로, 문항 id = `p3-001-1`(세트 id + 문항 번호). `recordExamAnswer`의 id 검사를 Part 2·3·4·5 형식 모두 허용하게, 백업 검증·복원도 같이. 첫 시도(`first`) 처리 동일. "문제 기록 초기화"는 전 파트.
- 접근성: 보기 버튼 aria-label("3번 문항 (B) …"), 표는 `<table>`·`<th scope>`, 키보드로 모든 조작 가능(단축키는 필수 아님).
- **하지 말 것**: 실전 모의고사(여러 파트 연속·타이머)는 나중 작업. 재생 속도 조절·줄별 다시 듣기 같은 추가 기능 금지.

## 검증
- node test/core.test.js, test/toeic.test.js, test/questions.test.js 통과. core 순수 함수(세트 오답 판정, id 검사 등) 바꾸거나 추가하면 테스트 추가.
- 로컬 서버 + Playwright headless 390px 라이트/다크: 문제 홈(4 파트), Part 3 세트(그래픽 포함, 채점 전·후), Part 4 결과. 콘솔 에러 0, 가로 스크롤 없음. 스크린샷 docs/reviews/exam-lc/ (5장 이내). 내장 브라우저가 http를 막으면 Playwright headless로. 서버·생성물·개발용 샘플 정리(샘플 questions/toeic-part3·4.json은 지우지 말고 보고에 "샘플"이라고 적기).
보고: 변경 요약, 스크린샷 경로, 남은 문제.
