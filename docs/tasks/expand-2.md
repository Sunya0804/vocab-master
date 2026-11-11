# 연습 문제 늘리기 2차 (작성자 B·C·D)

형식: Part 3·4 `docs/tasks/exam-lc-spec.md`, Part 5 `docs/tasks/exam-spec.md`. 규칙: `docs/tasks/exam-p167-spec.md` 끝 "검토에서 나온 규칙" 전부(특히 15·17차 LC: 그래픽 문항 위치 Q1~Q3 분산, 의도 문항은 맥락으로만, 같은 흐름 3세트 이상 금지, 같은 소재 금지).
**기존 연습·모의 문제(`questions/*.json`, `docs/mock/*.json`)와 소재·상황·문장이 겹치지 않게**. 회사 맥락 2/3 이상.

| 담당 | 출력 | 수량 |
|---|---|---|
| 작성자 B | `docs/questions/p5-4.json` | Part 5 60문항(vocab 18, pos 14, prep-conj 10, verb 9, pronoun 4, relative 3, comparison 2) |
| 작성자 C | `docs/questions/p3-3.json` | Part 3 16세트(3인 대화 3, 그래픽 4, 의도 문항 3) |
| 작성자 D | `docs/questions/p4-3.json` | Part 4 12세트(그래픽 2, 의도 문항 3, talkType 고르게) |

id는 파일 접두사(`p5-4-001` 등). 난이도 25/45/30, 정답 위치 A~D 20~30%. 5세트마다 저장, 자기 파일만, 커밋 금지. 끝나면 명세 점검 명령 출력 + 스스로 의심되는 문항 보고.

## 추가 (작성자 A)
| 작성자 A | `docs/questions/p2-3.json` | Part 2 50문항(wh 22, yesno 8, negative-tag 4, choice 4, request 6, statement 6; 간접 응답 정답 35~45%) |
- 형식은 `docs/tasks/exam-spec.md` Part 2. 21차 검토(`docs/reviews/review-21-p2.md`)에서 나온 문제 — 오답 중 "실행 방법·대안 제시·정보 출처 안내"가 자연스러운 간접 응답이 되어 정답이 둘로 읽히는 것 — 를 만들지 않는다. 쓴 뒤 세 응답을 모두 대입해 확인.
