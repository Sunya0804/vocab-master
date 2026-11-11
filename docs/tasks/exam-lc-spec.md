# 토익 LC Part 3·4 문제 명세 + 작성 분담

사용자 요청: "파트 3, 4도 만들자. 지금처럼 파트별로 문제를 모아둬. 나중에는 실전문제도 만들자."
Part 5·2와 같은 원칙(`docs/tasks/exam-spec.md`의 "공통 규칙"·난이도 비율 25/45/30)을 따른다. **기출·교재 복사·변형 금지, 완전 창작.**
나중에 실전 모의고사(LC/RC 전체)를 이 파트별 문제에서 조립하므로 형식을 꼭 지킬 것.

## 파일
- 최종: `questions/toeic-part3.json`, `questions/toeic-part4.json` = `{"version":1,"part":3|4,"sets":[...]}` (총괄이 병합·id 재부여)
- 작성자 출력: `docs/questions/p3-1.json`, `p3-2.json`, `p4-1.json`, `p4-2.json` (세트 배열만)

## 세트 형식 (Part 3 예: 짧게 줄인 예시, 실제 대본은 아래 길이 기준)
```json
{"id":"p3-1-001","difficulty":2,"talkType":"conversation",
 "script":[
  {"s":"W","t":"Hi, Daniel. Did the printer vendor ever call back about the repair?"},
  {"s":"M","t":"Not yet. I left a message this morning, but the technician is booked until Thursday."},
  {"s":"W","t":"That's a problem. We need to print the brochures for the trade fair by Wednesday."},
  {"s":"M","t":"Why don't we send the files to the copy shop on Elm Street? They did a good job last year."}],
 "scriptKo":["안녕하세요, 대니얼. 프린터 업체가 수리 건으로 다시 연락했어요?","아직이요. 오늘 아침에 메시지를 남겼는데, 기술자가 목요일까지 예약이 꽉 찼대요.","곤란하네요. 무역 박람회용 안내 책자를 수요일까지 인쇄해야 하거든요.","엘름 가에 있는 복사점에 파일을 보내면 어때요? 작년에 일을 잘해 줬잖아요."],
 "graphic":null,
 "questions":[
  {"type":"topic","q":"What are the speakers mainly discussing?","choices":["A broken machine","A new product line","A hiring decision","A delayed shipment"],"answer":0,
   "ko":{"q":"화자들은 주로 무엇에 대해 이야기하는가?","choices":["고장 난 기계","새 제품군","채용 결정","지연된 배송"]},
   "explain":"프린터 수리(repair) 연락을 기다리는 대화이므로 printer → a broken machine 으로 바꿔 말한 (A)."},
  {"type":"detail", "...":"..."},
  {"type":"suggest", "...":"..."}]}
```
- `script[].s` 화자 코드: `M`, `W`, `M2`, `W2`(3인 대화에서 같은 성별 둘째 사람). Part 4는 한 사람(`M` 또는 `W`)만.
- `scriptKo`: script와 같은 길이, 줄마다 자연스러운 해요체 번역(Part 4 공식 발표·방송은 합니다체 가능).
- `talkType`: Part 3는 `"conversation"`. Part 4는 `telephone`(전화 메시지), `announcement`(공지·안내 방송), `meeting`(회의 발췌), `advertisement`(광고), `broadcast`(뉴스·라디오), `tour`(견학·관광 안내), `speech`(연설·소개·워크숍).
- `graphic`(시각 자료 문항이 있는 세트만, 나머지 `null`): `{"title":"Conference Schedule","titleKo":"회의 일정","rows":[["Time","Session"],["9:00","Keynote"],...]}` — 첫 행이 머리글, 3~6행, 칸은 짧은 텍스트. 지도·평면도처럼 그림이 필요한 것은 표로 표현 가능한 것만(예: 층별 안내).
- `questions`: 정확히 3개, 보기 4개(answer 0~3), `ko:{q,choices}`, `explain`(한국어 1~2문장, 대본 근거 + 바꿔 말하기 + 대표 오답 이유). 질문 ko는 해라체.
- 문항 `type`: `topic`(주제·목적), `speaker`(화자 직업·장소·회사 업종), `detail`(세부 정보), `reason`(이유·문제점), `suggest`(제안·요청), `next`(다음에 할 일), `inference`(추론), `intention`(화자 의도: `What does the woman mean when she says, "..."?` 식, 인용문은 script에 그대로 있어야 함), `graphic`(`Look at the graphic. ...`).

## 실제 시험 구조를 따른 규칙
- 문항 순서 = 대본에 정답 단서가 나오는 순서(1번 단서가 앞, 3번이 뒤). 1번은 보통 topic·speaker, 3번은 보통 next·suggest.
- **정답은 대본 표현을 바꿔 말한 보기**(printer → machine, call back → contact). 난이도 2·3에서는 정답을 대본과 같은 단어로 쓰지 말 것. 오답에는 대본에 나온 단어를 넣은 함정을 섞는다(실제 시험식).
- 정답은 오직 하나, 대본만으로 판단 가능해야 함. 상식만으로 풀리면 안 됨.
- 질문 15단어 이하, 보기 각 10단어 이하. 질문에서 화자는 성별로 지칭(the man / the woman / the men / the speaker).
- 대본 길이: Part 3 **90~150단어, 6~10줄**(3인 대화는 7~11줄). Part 4 **100~160단어, 5~9줄**(문장 단위로 줄 나눔). 실제 음성으로 읽을 자연스러운 구어.
- 인명·회사명·장소명 모두 가상, 다양하게. 같은 상황 틀 반복 금지(스크립트로 찍어내기 금지, 세트마다 직접 작성).
- 그래픽 세트: 그래픽 문항은 3개 중 1개(주로 2·3번), 대본과 표를 함께 봐야 풀리게(대본엔 표의 다른 칸 정보만 언급).
- 의도 문항: 인용 문장만 보면 뜻이 여러 가지라 앞뒤 맥락으로만 정답이 정해지게(예: "That's the third time this week." → 불만 표현).

## 난이도(세트 단위, 1 쉬움/2 보통/3 어려움)
- 1: 정답 단서가 직접 들리고 보기가 대본 표현과 가까움, 흔한 주제(일정·예약·배송).
- 2: 바꿔 말하기 필요, 단서가 한 문장에 몰려 있지 않음.
- 3: 의도·그래픽·추론 문항 포함, 3인 대화, 오답이 대본 단어를 써서 그럴듯함, 정보 밀도가 높음.
- 의도·그래픽 문항이 든 세트는 난이도 2 또는 3.

## 분담 (세트 수, 난이도 1/2/3)
| 파일 | 세트 | 난이도 | 필수 포함 |
|---|---|---|---|
| p3-1.json | 26 | 7/12/7 | 3인 대화 5, 그래픽 6, 의도 문항 4(그래픽 세트와 겹치지 않게) |
| p3-2.json | 26 | 7/12/7 | 같음 |
| p4-1.json | 20 | 5/9/6 | 그래픽 4, 의도 문항 6, talkType: telephone 4, announcement 4, meeting 3, speech 3, advertisement 2, broadcast 2, tour 2. 화자 M/W 반반 |
| p4-2.json | 20 | 5/9/6 | 같음 |

- 주제(사무실·회의·인사·마케팅·출장·배송·고객 응대·시설 관리·재무·행사·소매·식당·교통) 고르게. p3-1/p4-1은 사무실·인사·재무·행사 쪽, p3-2/p4-2는 소매·고객·시설·교통·식당 쪽을 더 많이(겹쳐도 됨).
- 정답 위치: 파일 전체 문항 기준 A~D 각 20~30%.
- id는 `p3-1-001`처럼 파일명 접두사 + 3자리.
- **5세트마다 저장**하면서 진행. 자기 파일 외 수정 금지, git 커밋 금지.

## 끝나면 실행·보고
```
node -e "const f=process.argv[1];const a=require('./docs/questions/'+f+'.json');const c=(xs,k)=>xs.reduce((m,x)=>(m[x[k]]=(m[x[k]]||0)+1,m),{});const qs=a.flatMap(s=>s.questions);const w=s=>s.script.map(l=>l.t).join(' ').split(/\s+/).length;console.log(f,'sets',a.length,'diff',c(a,'difficulty'),'talk',c(a,'talkType'),'qtype',c(qs,'type'),'answer',c(qs,'answer'),'graphic',a.filter(s=>s.graphic).length,'3spk',a.filter(s=>new Set(s.script.map(l=>l.s)).size>=3).length,'bad',a.filter(s=>s.questions.length!==3||s.scriptKo.length!==s.script.length||s.questions.some(q=>q.choices.length!==4||!q.ko||q.ko.choices.length!==4)).map(s=>s.id),'words',Math.min(...a.map(w)),Math.max(...a.map(w)))" p3-1
```
보고: 위 출력, 난이도별 세트 예시 id 1개씩, 스스로 점검한 정답 유일성 의심 문항.
