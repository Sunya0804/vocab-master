# 연습 문제 늘리기 1차 (작성자 A·B·C·D)

형식·규칙: `docs/tasks/exam-p167-spec.md` 전체(**끝의 "검토에서 나온 규칙" 10~19차 전부 적용**), 실제 시험 분석 `docs/research/toeic-p1-p6-p7.md`.
**기존 연습·모의 문제(`questions/*.json`, `docs/mock/*.json`)와 소재·상황·문장이 겹치지 않게** — 쓰기 전에 기존 제목·첫 문장을 훑는다. 회사 맥락 2/3 이상.

| 담당 | 출력 | 수량 |
|---|---|---|
| 작성자 A | `docs/questions/p1-2.json` + `images/part1/p1-2-*.webp` | Part 1 30문항(single 12 / group 9 / object 9, 사물 사진 난이도 1~3 섞기) |
| 작성자 B | `docs/questions/p6-2.json` | Part 6 16지문(64문항) — Part 6 수정 절차(16번 대입)를 쓸 때도 적용 |
| 작성자 C | `docs/questions/p7-3.json` | Part 7 단일 20세트(2문항 8, 3문항 6, 4문항 6; text 2, chat 2, insertion 4) |
| 작성자 D | `docs/questions/p7-4.json` | Part 7 이중 4 + 삼중 6세트 — crossRef는 3단계 검증(A만/B만/질문만) 표를 보고에 첨부 |

id는 파일 접두사(`p1-2-001` 등). 난이도 25/45/30, 정답 위치 A~D 20~30%. 5세트마다 저장, 자기 파일만, 커밋 금지. 끝나면 명세 점검 명령 출력 + 스스로 의심되는 문항 보고.
