# 9차 리뷰: Part 3·4 수정 재확인 + 예문 빈칸 + 파일 분리

사용자: "다음 순서로 진행". 8차 리뷰(`docs/reviews/review-8-exam-lc.md`)의 데이터 지적을 작성자들이 `docs/tasks/exam-lc-fix-1.md`대로 고쳤다.
**수정하지 말고** 결과를 `docs/reviews/review-9.md`에 쓴다(심각도 순, 항목마다 파일·id·근거·제안). 마지막에 "배포 가능 / 수정 필요" 판정.
주의: UI 워커가 동시에 js/exam.js·js/shared.js 음성 개선을 하고 있다(이번 리뷰 대상 아님).

## 1. Part 3·4 데이터 (questions/toeic-part3.json, toeic-part4.json)
- 8차 리뷰 표의 지적 항목이 하나씩 실제로 고쳐졌는지 표로(id, 8차 지적, 지금 상태: 해결/미해결/새 문제).
- 고치면서 새로 생긴 문제: 정답 유일성, 그래픽 보기 = 표 순서 + 표만으로 안 풀림, 의도 문항 인용문이 대본에 그대로 있고 맥락으로만 풀림, 난이도 2·3 바꿔 말하기, scriptKo·ko·explain이 바뀐 대본과 맞는지.
- 범위: 바뀐 세트 전부 + 나머지 표본 20%. 범위를 보고서에 적기.

## 2. 예문 빈칸 (js/study.js, core.js, docs/tasks/cloze-quiz.md 명세)
- 명세 대비 동작: 빈칸 찾기·정답 비교(움라우트, 따옴표, 구동사), 힌트 1·2회, 기록, 결과 화면 "힌트 사용 N문제", 접근성(sr-only, 키보드, 색 외 표시). 스크린샷 docs/reviews/cloze/.

## 3. app.js 분리 (app.js, js/*.js, index.html, sw.js)
- 코드 이동만 했는지, 스크립트 순서·전역 이름 충돌(window 기본 속성과 겹치는 최상위 함수/let 이름), sw.js APP_SHELL 누락.
- 로컬 서버 + Playwright 390px로 홈·Day·카드·퀴즈·예문 빈칸·듣기·문제 홈·Part 3 세트·설정 진입, 콘솔 에러 0.

node test/*.test.js 결과도 기록.
