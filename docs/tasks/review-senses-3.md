# 검토: 다의어 3단계 수능·TEPS (Codex 검토자)

대상: `docs/senses/suneung-draft.json`(150), `teps-draft.json`(120) — OpenCode 작성. 원래 단어는 `packages/suneung.json`, `teps.json`의 `words[index]` = [en, ko, pos, ex, exKo]. 지시서 `docs/tasks/toeic-senses-3.md`, 이전 검토 `docs/reviews/review-senses-2.md`(같은 기준).
기계 점검 통과(index·sense·빈칸 생성·중복). 단 수능 초안에 같은 문장 시작(틀)이 7번 반복되는 묶음이 있다 — 반복 틀은 수정 대상.
볼 것(전수): sense가 기존 예문과 다른 뜻인가(같으면 제외), 시험에 실제로 쓰이는 뜻인가, 예문이 그 뜻으로만 읽히는가, 영어 자연스러움, exKo 해라체·자연스러움, 반복 틀.
그다음 **직접 최종본을 만든다**: `docs/senses/suneung-final.json`, `teps-final.json`(제외 빼고 수정 반영, index 오름차순, 각 ex는 core.js clozeExample 통과). 검토 결과는 `docs/reviews/review-senses-3.md`(맨 위 통과/수정/제외 개수). packages 수정·커밋 금지. 끝나면 보고.
