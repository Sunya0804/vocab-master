# 토익 문제 작성 (Codex 작성자 5명 병렬)

먼저 `docs/tasks/exam-spec.md` 전체를 읽는다. 형식·난이도·함정·금지 사항은 거기가 기준이다.

## 분담 (각 100문항, 난이도 1/2/3 = 25/45/30 문항)
| 파일 | 담당 type과 개수 |
|---|---|
| docs/questions/p5-1.json | pos 70, pronoun 20, comparison 10 |
| docs/questions/p5-2.json | verb 45, prep-conj 50, relative 5 |
| docs/questions/p5-3.json | relative 10, vocab 90 |
| docs/questions/p2-1.json | wh 90 (Who/What/When/Where/Why/How 각 15), choice 10 |
| docs/questions/p2-2.json | yesno 30, negative-tag 15, choice 5, request 25, statement 25 |

- id는 `p5-1-001`처럼 파일명 접두사 + 3자리(병합 때 총괄이 재부여).
- Part 2 파일은 간접 응답 정답 35~45문항, 정답 위치 A/B/C 각 30~37.
- Part 5 파일은 정답 위치 A~D 각 20~30.
- 25문항마다 저장하면서 진행(중간에 끊겨도 남도록). 자기 파일 외 수정 금지. git 커밋 금지.

## 품질 기준 (스스로 점검)
- 정답이 유일한가: 각 오답을 빈칸에 넣어 보고 문법·의미상 틀린 이유를 explain에 쓸 수 있어야 한다.
- 난이도 3은 실제로 어려워야 한다: 토익 900점대 수험생도 헷갈릴 만한 문항(Part 5 vocab의 미묘한 연어·의미 차이, Part 2 간접 응답과 그럴듯한 오답).
- 난이도 1을 너무 쉽게 만들지 말 것: 실제 토익 쉬운 문항 수준(그래도 비즈니스 문장, 10단어 이상).
- Part 5 문장 길이 12~25단어, 실제 시험처럼 수식어구 포함.

## 끝나면 실행·보고
```
node -e "const f=process.argv[1];const a=require('./docs/questions/'+f+'.json');const c=k=>a.reduce((m,x)=>(m[x[k]]=(m[x[k]]||0)+1,m),{});console.log(f,a.length,'type',c('type'),'diff',c('difficulty'),'answer',c('answer'),'badBlank',a.filter(x=>x.q&&x.part!==2&&f.startsWith('p5')&&x.q.split('-------').length!==2).length,'dupQ',a.length-new Set(a.map(x=>x.q)).size)" 파일명
```
보고: 위 출력, 난이도별 예시 2개씩.
