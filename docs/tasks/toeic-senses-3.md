# 다의어 3단계: 수능·TEPS 단어장 (OpenCode)

1·2단계(`docs/tasks/toeic-senses-1.md`, `toeic-senses-2.md`, 검토 `docs/reviews/review-senses-2.md`)와 같은 규칙·형식으로 `packages/suneung.json`, `packages/teps.json`에 대해 한다. **packages는 읽기만.**
- 후보: 각 단어장에서 ko에 뜻이 여러 개이고 기존 예문(ex)이 보여 주지 않는 뜻이 시험에 자주 나오는 단어 — 수능 150개, TEPS 120개. 출력 `docs/senses/suneung-candidates.json`, `teps-candidates.json`.
- 예문: `docs/senses/suneung-draft.json`, `teps-draft.json` = `[{"index","en","sense","pos","ex","exKo"}]`. 수능은 고등학생 수준 일반 상황, TEPS는 생활·학술 상황.
- 2단계 검토에서 나온 실수 금지: 기존 예문과 같은 뜻(제외 대상), sense에 두 뜻을 함께 적기, 어색한 직역, 활용형 때문에 빈칸 불가.
50개마다 저장, 커밋 금지. 끝나면 개수와 무작위 10개 보고.
