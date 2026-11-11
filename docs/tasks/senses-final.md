# 다의어 최종본 만들기 (작성자 A)

네 검토 `docs/reviews/review-senses-2.md`(통과 297, 수정 90, 제외 24)를 그대로 반영해 최종본을 만든다.
- 입력: `docs/senses/draft-2.json`, `docs/senses/draft-1b.json`. 출력: `docs/senses/final.json` = `[{"index","en","sense","pos","ex","exKo"}]`(index 오름차순, 제외 항목 빼고, 수정 항목은 고친 문장·sense로).
- 같은 index에 여러 뜻이면 항목을 여러 개 둔다. 각 ex는 `core.js`의 `clozeExample([en,"","",ex], false)`가 null이 아니어야 한다(story·high-rise 포함).
- 끝나면 개수와 clozeExample 실패 0 확인 출력 보고. 다른 파일 수정·커밋 금지.
