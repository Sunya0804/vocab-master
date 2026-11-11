# 검토 16차: 연습 Part 6·7(14차 수정) + 모의고사 RC(13차 수정) 재검토 (리뷰어)

대상과 기준:
- 연습 `docs/questions/p6-1.json`, `p7-1.json`, `p7-2.json` — `docs/tasks/fix-14.md`대로 수정. 기준 `docs/reviews/review-14-recheck.md`.
- 모의고사 `docs/mock/m-p5.json`, `m-p6.json`, `m-p7s.json`, `m-p7m.json` — `docs/tasks/fix-13-mock-rc.md`대로 수정. 기준 `docs/reviews/review-13-mock-rc.md`.
- 공통 규칙: `docs/tasks/exam-p167-spec.md` 끝 "검토에서 나온 규칙"(13·14·15차 추가분).

## 볼 것
1. 지적 해결 여부(해결/부분/미해결 집계). 특히 crossRef(연습 12개, 모의 37개)를 지문 하나씩 가리고 다시 푼다.
2. 고치면서 새로 생긴 문제(정답 둘, 옛 해설 남음, 새 공식).
3. 모의고사 회차 간 같은 뼈대가 풀렸는지.

## 방법
파일 수정·커밋 금지. 연습은 `git diff 0da755c -- docs/questions`, 모의는 지적 문장과 현재 텍스트 대조. 결과는 `docs/reviews/review-16-recheck.md`(맨 위 요약: 파일별 필수/권장/해결률, **파일별 "배포 가능" 여부 명시**). 끝나면 요약 보고.
