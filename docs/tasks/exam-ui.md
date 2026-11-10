# UI 9차: 토익 문제 풀기 화면 (Codex UI 워커)

먼저 `docs/tasks/exam-spec.md`(데이터 형식)와 `docs/tasks/ui-8-unslop.md`(디자인 방향: 무채색, 강조색 제한, 인라인 lucide SVG, 4px 그리드)를 읽는다.
수정 가능: app.js, style.css, index.html, sw.js, core.js(순수 함수 추가 시), test/core.test.js. packages·questions 데이터 수정 금지(지금 questions/ 파일은 샘플 1~2문항, 나중에 300/200문항으로 교체됨).

## 기능
- 하단 메뉴에 "문제" 탭 추가(아이콘 lucide `pencil-line` 또는 `clipboard-check`). 라우트 `#/exam`, 풀이는 `#/exam/<part>/<mode>`. **`#/practice`는 기존 복습 세션이 쓰므로 쓰지 말 것.**
- 데이터: `fetch('./questions/toeic-part5.json')`, `toeic-part2.json`. sw.js에서 packages처럼 캐시(오프라인)하고 CACHE_VERSION 올림.
- 문제 홈: Part 5 / Part 2 카드, 각 카드에 "푼 문제 N/300 · 정답률 N%". 난이도 필터(전체/1/2/3 — 표시는 "쉬움·보통·어려움"), "실전 세트" 버튼(실제 비율대로 Part 5는 30문항, Part 2는 25문항, 난이도 25/45/30 비율로 무작위 추출), "틀린 문제" 버튼.
- Part 5 풀이: 문장(빈칸 강조), 보기 (A)~(D). 선택 즉시 정답/오답 표시, ko 번역·explain 표시, "다음". 끝나면 결과(점수, 유형별 정답 수).
- Part 2 풀이: 텍스트 숨긴 채 질문 → "(A) … (B) … (C) …" 순서로 speechSynthesis 재생(기존 듣기 모드의 음성 선택·취소 로직 재사용, 질문과 응답은 가능하면 서로 다른 영어 음성). 다시 듣기 버튼. 보기 버튼은 A/B/C만. 답한 뒤 스크립트(영문+ko)와 explain, 함정 태그 한국어 이름 공개. 음성 미지원 기기는 텍스트를 바로 보여 주는 대체 표시.
- 기록: 별도 localStorage 키 `vocab-master-exam` = `{answers:{[id]:{correct:bool, at:ms, tries:n}}}`. 틀린 문제는 다시 맞히면 목록에서 빠짐. 문항별 정답률은 나중에 난이도 재조정에 쓸 수 있게 tries·correct 보존. 설정의 백업/복원에 포함.
- 접근성: 보기 버튼 aria-label, 정답/오답을 색만으로 표시하지 않음(아이콘/글자), 키보드 1~4·A~D 선택, Enter 다음.

## 검증
- node test/core.test.js, node test/toeic.test.js 통과(순수 함수 추가했으면 테스트도).
- 로컬 서버 + Playwright headless 390px 라이트/다크: 문제 홈, Part 5 풀이(정답·오답 후), 결과, Part 2 풀이 화면. 콘솔 에러 0, 가로 스크롤 없음. 스크린샷 docs/reviews/exam/ (6장 이내). 서버·생성물 정리.
보고: 변경 요약, 스크린샷 경로, 남은 문제.
