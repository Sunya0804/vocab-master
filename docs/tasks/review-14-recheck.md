# 검토 14차: 12차 수정(Part 6·7) + 11차 수정(Part 1) 재검토 (리뷰어)

대상:
- `docs/questions/p6-1.json`, `p7-1.json`, `p7-2.json` — `docs/tasks/fix-12-p67.md`대로 2차 수정됨. 기준 `docs/reviews/review-12-recheck.md`.
- `docs/questions/p1-1.json` + `images/part1/p1-1-*.webp` — `docs/tasks/fix-11-p1.md`대로 수정됨. 기준 `docs/reviews/review-11-p1.md`. 재생성 사진(021·005·032·035)은 직접 열어 본다.
공통 기준: `docs/tasks/exam-p167-spec.md` 끝 "검토에서 나온 규칙"(13차 crossRef 원칙 포함).

## 볼 것
1. 12차·11차 지적 해결 여부(해결/부분/미해결 집계).
2. 고치면서 새로 생긴 문제(바뀐 세트 전수 재풀이, crossRef는 지문 하나씩 가리고).
3. 새 공식·반복 틀이 또 생겼는지.

## 방법
파일 수정·커밋 금지. 바뀐 부분은 공유 폴더에서 `git diff 95ff7fd -- docs/questions images/part1`로 찾는다. 결과는 `docs/reviews/review-14-recheck.md`(맨 위 요약: 파일별 필수/권장, 해결률). **필수가 0이고 권장이 사소하면 "배포 가능"이라고 명시.** 끝나면 요약 보고.
