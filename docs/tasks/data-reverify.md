# 데이터 수정분 재검증 (Codex 데이터 리뷰어, 읽기 전용)

OpenCode가 docs/tasks/opencode-data-fixes.md 대로 수정을 적용했다. 수정하지 말고 확인만.

1. TEPS: docs/reviews/teps-review.md 의 오류 목록·선택적 보완이 packages/teps.json에 **모두 정확히** 반영됐는지 항목별 확인. 다른 항목이 망가지지 않았는지(이전 리뷰 표본 100개 재확인).
2. 수능: docs/reviews/suneung-review.md 의 오류 목록·선택적 보완 반영 확인 + 표본 150개 재확인.
3. 토익 분류표: docs/toeic-levels.json — docs/reviews/toeic-levels-review.md 의 명시적 수정 목록 반영 확인, 그리고 Lv4·Lv5 재검토 결과를 새 무작위 표본 100개(Lv3/4/5 위주)로 재리뷰해 일치율 산출.

결과를 각 리뷰 파일 끝에 "## 재검증 (날짜)" 절로 추가(기존 내용 수정 금지). 판정: TEPS/수능 각각 "등록 가능 / 추가 수정 필요(목록)", 토익 분류표 "적용 가능 / 추가 수정 필요(목록)".
보고: 세 판정 요약.
