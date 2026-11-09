# 토익 단어 난이도 분류표 만들기 (OpenCode, 반복 작업)

목적: 나중에 packages/toeic.json을 난이도순으로 정렬하고 levels를 붙이기 위한 **분류표만** 만든다.
packages/toeic.json은 다른 워커가 지금 수정 중이라 **읽기만** 하고 절대 수정하지 말 것. 다른 파일(packages/*, 코드, test/)도 수정 금지.

## 출력
새 파일 `docs/toeic-levels.json` 하나:
```json
{ "levels": ["Lv1 기초", "Lv2 기본", "Lv3 중급", "Lv4 고급", "Lv5 고난도"],
  "map": { "accommodate": 3, "acquire": 2, "...": 1 } }
```
- key: toeic.json의 영단어(en)를 소문자로. 값: 1~5 정수.
- toeic.json의 **모든** 영단어를 빠짐없이 분류 (중복 key 없음).

## 기준 (토익 학습자 관점)
- 1 기초: 중학 수준 일상어 (provide, order, meeting)
- 2 기본: 토익 Part 1~4 빈출 기본 업무어 (invoice, schedule, deadline)
- 3 중급: Part 5~7 빈출 어휘 (accommodate, reimburse, expedite)
- 4 고급: 출제 빈도 낮은 고급 어휘·숙어 (stipulate, remuneration)
- 5 고난도: 900점 이상용 희귀 어휘
- 비율은 대략 1:20% 2:25% 3:30% 4:17% 5:8% 를 목표로 하되 억지로 맞추지 말 것.
- 여러 단어로 된 숙어는 의미 난이도로 판단.

## 완료 기준
아래 명령 출력에서 첫 두 수가 같고 missing 0, bad 0:
```
node -e "const t=require('./packages/toeic.json').words.map(w=>w[0].toLowerCase()),m=require('./docs/toeic-levels.json').map;const miss=t.filter(w=>!(w in m)),bad=Object.values(m).filter(v=>![1,2,3,4,5].includes(v));console.log(t.length,Object.keys(m).filter(k=>t.includes(k)).length,'missing',miss.length,'bad',bad.length);const c={};Object.values(m).forEach(v=>c[v]=(c[v]||0)+1);console.log(c)"
```
(toeic.json 단어 수가 작업 중 늘어나면 마지막에 새 단어만 추가 분류.)
보고: 위 출력 + 레벨별 예시 단어 각 5개.
