# UI 9차 후속: 7차 리뷰 반영 (Codex UI 워커)

docs/reviews/review-7-exam.md 의 화면 항목 5~8 을 고친다. questions/·docs/questions/ 데이터 수정 금지.
- 5: 기록에 첫 시도 정답 여부 `first`(bool, 처음 답할 때만 기록)를 추가하고 문제 홈은 첫 시도 정답률을 표시("첫 시도 정답률 N%"). 기존 기록(first 없음)은 correct 로 대체. 백업 검증·복원도 first 를 허용(선택 필드).
- 6: 안내 문구 Part 2 는 "1~3 또는 A~C".
- 7: 설정에 "문제 기록 초기화" 버튼(확인 대화상자 후 vocab-master-exam 삭제) 추가, 기존 "학습 기록 초기화" 설명에 문제 기록은 유지된다고 적기.
- 8: 빈칸 마크업을 `<span class="exam-blank"><span aria-hidden="true">-------</span><span class="sr-only">빈칸</span></span>` 로(.sr-only 없으면 추가).
- sw.js CACHE_VERSION 올림. node test/core.test.js, test/toeic.test.js, test/questions.test.js 통과(순수 함수 바꿨으면 테스트 추가). 보고: 변경 요약.
