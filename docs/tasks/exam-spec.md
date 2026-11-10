# 토익 문제 기능 명세: Part 5 + Part 2 (실제 토익 난이도 기준)

사용자 요청: "실제 토익 난이도에 맞춰서 만들어봐". 실제 기출·교재 문제 복사 금지, 유형·난이도 구조만 따른 **창작 문제**.

## 파일
- 최종: `questions/toeic-part5.json`, `questions/toeic-part2.json` = `{"version":1,"part":5|2,"questions":[...]}`
- 작성자 출력: `docs/questions/p5-N.json`, `docs/questions/p2-N.json` (배열만). 총괄이 병합·id 재부여.

## Part 5 문항 (총 300)
```json
{"id":"p5-001","type":"pos","difficulty":2,
 "q":"Ms. Tanaka's ------- of the budget proposal impressed the board members.",
 "choices":["analyze","analytical","analysis","analytically"],"answer":2,
 "ko":"타나카 씨의 예산안 분석은 이사회 구성원들에게 깊은 인상을 주었다.",
 "explain":"소유격(Ms. Tanaka's)과 전치사 of 사이는 명사 자리이므로 analysis."}
```
- 빈칸은 `-------`(하이픈 7개) 한 번. 보기 4개, answer는 0~3 인덱스. 정답 위치는 고르게 분포(각 20~30%).
- type과 개수(실제 Part 5 30문항 중 출제 비율을 10회분으로 환산):

| type | 내용 | 개수 |
|---|---|---|
| pos | 품사 자리(같은 어근 4개) | 70 |
| verb | 시제·태·수일치·준동사 | 45 |
| prep-conj | 전치사 vs 접속사 vs 접속부사, 상관접속사 | 50 |
| pronoun | 인칭·재귀·소유·지시대명사, 수량 한정사 | 20 |
| relative | 관계사·명사절 접속사 | 15 |
| comparison | 비교·최상급·기타 문법(도치, 가정법 등) | 10 |
| vocab | 어휘(같은 품사 4개, 의미·연어로 구분) | 90 |

## Part 2 문항 (총 200)
```json
{"id":"p2-001","type":"wh","difficulty":3,
 "q":"When will the new office furniture be delivered?",
 "choices":["To the third floor, please.","The supplier hasn't confirmed yet.","It was delivered by hand."],"answer":1,
 "ko":{"q":"새 사무실 가구는 언제 배송되나요?","choices":["3층으로 부탁해요.","공급업체가 아직 확인해 주지 않았어요.","그건 직접 전달됐어요."]},
 "trap":["wh-mismatch","repeat-word"],
 "explain":"When 질문에 시간을 직접 말하지 않고 '아직 모른다'로 돌려 답한 간접 응답. (A)는 Where 응답, (C)는 delivered 반복 함정."}
```
- 보기 3개, answer 0~2, 정답 위치 고르게. 질문·보기 모두 15단어 이하, 실제 음성으로 읽을 문장.
- type과 개수: wh 90(Who/What/When/Where/Why/How 고르게), yesno 30, negative-tag 15(부정·부가 의문문), choice 15(선택 의문문), request 25(요청·제안·권유), statement 25(평서문).
- **간접 응답(되묻기·모른다·다른 사람에게 미루기·상황 설명)을 정답으로 하는 문항이 전체의 35~45%**. 최근 실제 시험 경향.
- 오답 함정 `trap` 태그: `repeat-word`(질문 단어 반복), `similar-sound`(유사 발음: copy/coffee 등), `wh-mismatch`(다른 의문사 응답), `yes-no-to-wh`(Wh 질문에 Yes/No), `related-word`(연상 단어), `wrong-subject`(주체·시제 불일치). 오답 2개 각각 최소 하나의 함정.

## 난이도 (1 쉬움 / 2 보통 / 3 어려움) — 실제 시험 분포 추정
- 비율: **1 = 25%, 2 = 45%, 3 = 30%** (Part 5, Part 2 각각).
- Part 5 기준
  - 1: 문장 구조만 보면 풀림(관사 뒤 명사, be + 형용사 등), 쉬운 어휘(토익 단어 레벨 1~2).
  - 2: 문장 전체 해석 필요(시제 단서, 수일치 거리 있음, 전치사 vs 접속사), 레벨 2~4 어휘.
  - 3: 보기 4개가 모두 문법적으로 가능해 의미·연어로만 구분(vocab), 수식어가 길어 구조 파악이 어려움, 도치·가정법·복합관계사, 레벨 4~5 어휘.
- Part 2 기준
  - 1: 직접 응답, 함정 단순(Wh 질문에 해당 정보로 답함).
  - 2: 직접 응답이나 함정이 강함(유사 발음·연상어), 또는 부정·부가·선택 의문문.
  - 3: 간접 응답 정답, 평서문, 오답이 모두 그럴듯함.
- 어휘는 `packages/toeic.json` 단어를 적극 활용(레벨이 곧 어휘 난이도). 실제 토익 맥락: 사무실·회의·인사·마케팅·출장·배송·고객·시설·재무·행사.

## 공통 규칙
- 완전한 창작. 기출·교재(ETS, 해커스, YBM 등) 문장 복사·변형 금지. 인명·회사명은 가상의 다양한 이름.
- 정답은 오직 하나(다른 보기가 문법·의미상 가능하면 안 됨). 문법은 미국식 비즈니스 영어 표준.
- `ko`: 정답이 들어간 완성 문장의 자연스러운 번역(Part 5), Part 2는 질문·보기 모두 번역. Part 5는 해라체(…다), Part 2는 대화라 해요체(…요).
- `explain`: 한국어 1~2문장, 정답 근거 + 대표 오답 이유.
- 같은 문장 틀 반복 금지, 스크립트 생성 금지(단어마다·문제마다 직접 작성).
