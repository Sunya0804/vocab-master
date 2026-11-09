# 토익 정렬 리뷰 (Codex 데이터 리뷰어, 읽기 전용 — 파일 수정 금지)

OpenCode가 docs/tasks/toeic-sort.md 대로 packages/toeic.json 을 레벨순 정렬하고 levels를 추가했다.
총괄이 확인한 것: 5804단어, unsorted 0, 5필드 문자열, days 합 291, dayLevels 291개 전부 이름 있음, 테스트 41개 통과.

## 확인할 것
1. 항목 내용 불변: 정렬 전 원본이 없으니 대신 (a) 중복 표제어·빈 필드 없음 (b) 무작위 50개에서 en/ko/pos/ex/exKo가 서로 맞는지(정렬 중 필드가 다른 항목과 섞이지 않았는지) 확인.
2. levels 형식이 packages/suneung.json 과 같고 core.js dayLevels가 올바로 해석하는지.
3. 레벨 경계 Day(각 레벨 마지막·다음 레벨 첫 Day)에 두 레벨이 섞이는 정도 — 허용 범위인지 의견.
4. 앱 표시: 서버를 띄워 토익 패키지 Day 목록에 Lv 표시가 나오는지 Playwright headless로 확인, 콘솔 에러 0. 끝나면 서버·생성물 정리.

결과를 docs/reviews/toeic-sort-review.md 로 작성. 판정: "적용 완료" / "수정 필요(목록)".
