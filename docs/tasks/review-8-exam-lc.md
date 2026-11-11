# 8차 리뷰: 토익 Part 3·4 (데이터 + 화면)

사용자 요청: "파트 3, 4도 만들자. 지금처럼 파트별로 문제를 모아둬." 명세는 `docs/tasks/exam-lc-spec.md`(데이터), `docs/tasks/exam-lc-ui.md`(화면). 형식 예시는 `docs/reviews/review-7-exam.md`.
**수정하지 말고** 결과를 `docs/reviews/review-8-exam-lc.md`에 쓴다(심각도 순, 항목마다 파일·id·근거·제안).
주의: 작업 폴더에 독일어 단어 작업(packages/german-*, app.js 일부)이 섞여 있는데 이번 리뷰 대상이 아니다.

## 데이터 (questions/toeic-part3.json 52세트, toeic-part4.json 40세트)
병합 id: p3-001~026 = docs/questions/p3-1.json 순서, p3-027~052 = p3-2, p4-001~020 = p4-1, p4-021~040 = p4-2. 형식·개수는 test/questions.test.js가 이미 검사함 → 내용을 본다.
- 전 세트 정답 유일성: 대본만으로 답이 하나로 정해지는지, 다른 보기도 성립하지 않는지, 상식만으로 풀리지 않는지.
- 그래픽 문항: 대본+표를 함께 봐야 풀리는지, 표만으로 풀리지 않는지.
- 의도 문항: 인용문 단독으론 모호하고 맥락으로만 정해지는지.
- 난이도 2·3에서 정답이 대본 단어를 그대로 쓰는지(바꿔 말하기 위반), 문항 순서 = 단서 순서인지.
- 영어 자연스러움, scriptKo·ko 번역 오류, explain 정확성, 세트 간 반복된 상황 틀.
- 출판사 기출 복사 의심 문장.
시간이 부족하면 난이도 3 전부 + 나머지 표본 30% 이상, 범위를 보고서에 적기.

## 화면 (app.js·core.js·style.css·sw.js 변경, test/core.test.js)
- 기록 id(p3-001-1), recordExamAnswer/validExamState·백업 복원, 틀린 세트 판정(core.examSetStats), 첫 시도 처리.
- 음성: 화자별 음성/pitch, 화면 이동 시 중단, 음성 미지원 대체, 채점 전 대본 숨김.
- 접근성: 표 th scope, 보기 aria-label, 키보드 조작, 정답/오답 색 외 표시.
- 스크린샷 docs/reviews/exam-lc/ 2·3번에서 "본문으로 건너뛰기" 링크가 본문 중간에 보임 → 실제 버그인지 캡처 문제인지 확인.
- node test/core.test.js, test/toeic.test.js, test/questions.test.js 실행 결과 기록.
