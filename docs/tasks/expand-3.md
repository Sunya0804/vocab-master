# 연습 문제 늘리기 3차 — 지금 비율 유지 (Codex 작성자)

사용자: "남는 워커들은 파트별 문제를 더 추가하는 작업을 진행하자. 지금의 문제수 비율을 유지하며 작업해줘"
현재: P1 90 · P2 250 · P3 68세트 · P4 52세트 · P5 360 · P6 48지문 · P7 75세트 → 각 약 +20%.
형식·규칙은 1·2차와 같다(`docs/tasks/expand-1.md`, `expand-2.md`, `docs/tasks/exam-p167-spec.md` 끝 규칙 전부 — **25차 정답 위치 규칙 포함**: 3문항 세트도 세 정답이 모두 다른 세트가 절반 이하). 기존 연습·모의 문제와 소재·문장 겹침 금지, 회사 맥락 2/3 이상.

| 담당 | 출력 | 수량 |
|---|---|---|
| 작성자 A | `docs/questions/p1-3.json` + `images/part1/p1-3-*.webp` | Part 1 18문항(single 7 / group 6 / object 5) |
| 작성자 B | `docs/questions/p5-5.json` | Part 5 72문항(vocab 22, pos 17, prep-conj 12, verb 11, pronoun 5, relative 3, comparison 2) |
| 작성자 C | `docs/questions/p3-4.json` | Part 3 14세트(3인 3, 그래픽 3, 의도 2) |
| 작성자 D | `docs/questions/p4-4.json` + `p6-3.json` | Part 4 10세트(그래픽 2, 의도 3) + Part 6 10지문 |
| 84ac18a8 | `docs/questions/p2-4.json` + `p7-5.json` | Part 2 50문항(wh 22, yesno 8, neg-tag 4, choice 4, request 6, statement 6) + Part 7 단일 10세트·이중 2·삼중 3 |

난이도 25/45/30, 정답 위치 A~D(Part 2는 A~C) 고르게. 5세트마다 저장(사용량 한도가 끝나도 저장분은 남게), 자기 파일만, 커밋 금지. 끝나면 명세 점검 출력 보고.
