# 토익 Part 1·6·7 문제 명세 + 작성 분담

사용자: "파트 1을 포함해서 6, 7도 만들어 줘. 실제 토익 문제를 분석해서, 난이도와 유형 및 그림이 최대한 유사하도록 구현해줘."
근거 자료: `docs/research/toeic-p1-p6-p7.md`(실제 시험 분석, 반드시 먼저 읽기). 공통 원칙은 `docs/tasks/exam-lc-spec.md`와 같다.
- **기출·교재·공식 샘플 복사·변형 금지, 완전 창작.** 저장소는 공개다. 실존 인물·회사·브랜드 금지, 인명·회사·장소는 가상.
- 같은 상황 틀 반복 금지. 스크립트로 찍어내지 말고 세트마다 직접 쓴다.
- 난이도(1 쉬움/2 보통/3 어려움) 비율 약 25/45/30. 정답 위치는 파일 전체 A~D 각 20~30%, 같은 기호 4연속 금지.
- 한국어: 질문·보기 번역은 해라체, 지문 번역은 자연스러운 문어체(이메일·편지는 합니다체 가능), explain은 한국어 1~2문장(근거 위치 + 바꿔 말하기 + 대표 오답 이유).
- **5세트(또는 5문항)마다 저장.** 자기 출력 파일 외 수정 금지, git 커밋 금지.
- 출력은 `docs/questions/<파일>.json`(배열만). 총괄이 `questions/toeic-part1|6|7.json`으로 병합하고 id를 다시 매긴다.

---

## Part 1 (사진 묘사) — 파일 p1-1.json, 이미지 images/part1/

```json
{"id":"p1-1-001","difficulty":1,"photoType":"single","place":"office",
 "image":"images/part1/p1-1-001.webp",
 "alt":"사무실 서류 캐비닛 앞에 선 여자와 책상, 전화기가 보이는 흑백 사진",
 "choices":["She's making a call.","She's holding a folder.","She's wiping the desk.","She's sitting at the desk."],
 "answer":1,"ko":{"choices":["...","...","...","..."]},
 "trap":["action","association","position"],
 "explain":"..."}
```
- 수량: **60문항**. photoType `single` 24 / `group` 18 / `object` 18. 난이도 15/27/18.
- `place`: office, outdoor-work, store, restaurant, street, transport, warehouse, lab, home 중 하나. 분석 문서 1-3 비율대로 고르게.
- `trap` 값: action(동작 혼동), being(상태 vs 진행 수동), wearing(입는 중 vs 입은 상태), absent(사진에 없는 명사), sound(유사 발음), position(위치·수 오류), association(연상 단어). 오답 3개 각각에 하나씩.
- 정답 문장 틀은 분석 문서 1-4 표로 제한(현재/현재진행/현재완료만, 과거·미래 금지). object 사진은 상태 수동·현재완료 수동·There is/위치 표현. 사람 사진에서 배경 사물이 정답인 문항도 5~6개.
- 난이도 3 문항에는 상위어 바꿔 말하기(car → vehicle), being 함정, railing/awning/propped against 같은 덜 쓰는 어휘.
- 문장 길이 4~12단어. 보기 4개 모두 사진과 관련된 명사를 써서 그럴듯하게.
- **이미지:** 시범(`docs/pilot/part1/p1-pilot-report.json`)과 같은 방법으로 직접 생성. 분석 문서 1-7 체크리스트 전부 지킬 것(실사 질감, 흑백, 4:3, 1024×768, webp ≤120KB, 인물은 카메라를 보지 않음, 글자·로고 없음, 판별 사물 3~6개). **사진을 먼저 만들고, 사진을 보고 문제를 쓴다.** 사진에서 정답이 확정되지 않으면 사진을 다시 만든다.
- 원본 PNG는 저장소 밖(생성 도구 기본 위치)에 두고 webp만 `images/part1/`에 저장.

## Part 6 (장문 빈칸) — 파일 p6-1.json

```json
{"id":"p6-1-001","difficulty":2,"passageType":"email",
 "heading":["To: All staff","From: Facilities Office","Date: 3 March","Subject: Elevator maintenance"],
 "paragraphs":["The east elevator {1} next Tuesday ...", "... {2} ... {3} ...", "... {4} Thank you for your patience."],
 "headingKo":["수신: 전 직원","..."],
 "paragraphsKo":["동쪽 엘리베이터는 다음 주 화요일 {1} ...","...","..."],
 "questions":[
  {"blank":1,"type":"tense","choices":["was serviced","will be serviced","has serviced","services"],"answer":1,"ko":{"choices":["...","...","...","..."]},"explain":"..."},
  {"blank":2,"type":"vocab", "...":"..."},
  {"blank":3,"type":"connector", "...":"..."},
  {"blank":4,"type":"sentence","choices":["Full sentence A.","Full sentence B.","Full sentence C.","Full sentence D."],"answer":2,"ko":{"choices":["...","...","...","..."]},"explain":"..."}]}
```
- 수량: **32지문 × 4문항 = 128문항**. 난이도 8/14/10.
- `passageType`: email 13, memo 4, notice 3, article 4, advertisement 4, letter 2, webpage 1, invitation 1. email·memo·letter는 heading(To/From/Date/Subject 등), 나머지는 heading에 제목 1줄 또는 빈 배열.
- 길이: 본문 **100~160단어, 문단 2~4개**. 빈칸은 `{1}`~`{4}`로, 본문 순서대로. paragraphsKo에도 같은 자리에 같은 표시(번역은 빈칸에 정답을 넣은 뜻으로 써도 되지만 표시는 남긴다).
- 지문마다 `sentence`(문장 고르기) **정확히 1개**, 나머지 3개는 vocab/tense/pos/connector/pronoun 중. 32지문 전체: sentence 32, vocab 36~40, tense 26~30, connector 14~16, pos/pronoun/relative 나머지.
- 문장 고르기 위치: 마지막 빈칸 16지문, 중간 12, 첫 문단 4. 보기 4개는 모두 문법적으로 맞는 문장이고 지시어·연결어·앞뒤 내용으로만 구분된다.
- **문맥 의존**: tense는 빈칸 문장만으로는 여러 시제가 가능하고 앞뒤 문장의 시점 단서로만 정해지게. connector도 앞뒤 문장 관계로 정해지게. 전체 128문항 중 약 65%가 문맥 의존.
- 보기는 Part 5와 같은 형식(같은 어근 4형태, 같은 품사 4어휘 등).

## Part 7 (독해) — 파일 p7-1.json(단일), p7-2.json(복수)

```json
{"id":"p7-1-001","difficulty":1,"setType":"single",
 "passages":[
  {"type":"text","title":"Text message chain",
   "lines":[{"time":"9:12 A.M.","name":"Dana Ortiz","t":"..."},{"time":"9:14 A.M.","name":"Kevin Hall","t":"..."}]}
 ],
 "passagesKo":[{"title":"문자 메시지","lines":["...","..."]}],
 "questions":[
  {"type":"purpose","q":"Why did Ms. Ortiz write to Mr. Hall?","choices":["...","...","...","..."],"answer":0,"ko":{"q":"...","choices":["...","...","...","..."]},"explain":"..."},
  {"type":"intention","q":"At 9:15 A.M., what does Mr. Hall most likely mean when he writes, \"...\"?", "...":"..."}]}
```
- 지문 객체 형식(`type`에 따라 하나):
  - 글: `{"type":"email","title":"E-mail","heading":["To: ...","From: ...","Date: ...","Subject: ..."],"body":["문단1","문단2"]}` — type: email, letter, memo, notice, article, advertisement, webpage, review, announcement.
  - 대화: `{"type":"text"|"chat","title":"...","lines":[{"time","name","t"}]}` — text는 2인 6~8줄, chat은 3인 이상 8~12줄.
  - 표·양식: `{"type":"form","title":"Invoice","heading":[...],"table":[["Item","Qty","Price"],["...","...","..."]],"body":["표 아래 메모(선택)"]}` — 송장·주문서·일정표·영수증·설문·장바구니. 표는 3~7행.
- `passagesKo`: passages와 같은 길이·같은 구조(heading/body/lines는 문자열 배열, table은 번역한 표).
- 문장 위치 문항(`insertion`)이 있는 지문은 body 안에 `[1]`~`[4]`를 넣고, 질문은 `In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong? "..."`. 보기는 `["[1]","[2]","[3]","[4]"]`.
- 동의어 문항(`synonym`)은 `"ref":{"passage":0,"paragraph":1}`(0부터)과 질문 `In the e-mail, the word "..." in paragraph 2, line 3, is closest in meaning to`. 그 단어는 해당 문단에 그대로 있어야 한다.
- 의도 문항(`intention`)의 인용문과 시각은 lines에 그대로 있어야 한다.
- 복수 지문의 연계 문항은 `"crossRef":true`(두 지문 이상을 봐야만 풀림). 나머지 문항은 생략 또는 false.
- 문항 type: detail, inference, purpose, not-true, synonym, intention, insertion, speaker(인물·직업·장소 추론).
- 정답은 지문 표현을 바꿔 말한 보기. 오답은 지문에 나온 단어를 쓴 함정. 상식만으로 풀리면 안 된다.

### p7-1.json — 단일 지문 30세트(문항 87개 안팎)
- 2문항 세트 12, 3문항 세트 9, 4문항 세트 9.
- 지문 종류: text 3(2문항 세트, 의도 문항 1개씩), chat 3(4문항 세트, 의도 문항 1개씩), email·letter 8, notice·memo·announcement 5, advertisement 4, article 4(주로 4문항), form 2, webpage·review 1.
- insertion 문항은 4문항 세트 중 6세트의 마지막 문항. synonym 3~4개.
- 길이: 2문항 세트 80~150단어, 3문항 150~220, 4문항 200~280.
- 난이도 8/13/9(2문항 세트 쪽이 쉬움, 4문항·기사 쪽이 어려움).

### p7-2.json — 복수 지문 이중 6세트 + 삼중 9세트(세트당 5문항, 75문항)
- 이중: 두 문서 합계 300~420단어. 삼중: 세 문서 합계 400~550단어.
- 조합 예: 광고+이메일, 이메일+양식, 기사+편지, 웹페이지+후기+이메일, 공지+일정표+이메일, 송장+이메일+이메일. 첫 문서로 광고·공지·웹페이지가 자주, 2·3번째로 양식·표가 자주.
- 연계 문항(crossRef): 이중 세트당 1~2개, 삼중 세트당 2개(가끔 3). 표의 조건(가격·등급·날짜)과 이메일 속 사실을 이어서 고르게.
- 세트 안 순서: 1번은 보통 첫 문서의 주제·목적, 연계 문항은 3·4번, 마지막은 마지막 문서의 세부 사항.
- synonym 4~5개(세트당 최대 1), 나머지는 detail·inference·not-true·purpose.
- 난이도 3/7/5(삼중 쪽이 어려움).

---

## 분담
| 파일 | 담당 | 수량 |
|---|---|---|
| p1-1.json + images/part1/ | Codex 작성자 A | 60문항 + 사진 60장 |
| p6-1.json | Codex 작성자 B | 32지문(128문항) |
| p7-1.json | Codex 작성자 C | 단일 30세트 |
| p7-2.json | Codex 작성자 D | 이중 6 + 삼중 9세트 |

## 끝나면 실행·보고
```
node -e "const f=process.argv[1];const a=require('./docs/questions/'+f+'.json');const c=(xs,k)=>xs.reduce((m,x)=>(m[x[k]]=(m[x[k]]||0)+1,m),{});const qs=a.flatMap(s=>s.questions||[s]);console.log(f,'items',a.length,'questions',qs.length,'diff',c(a,'difficulty'),'kind',c(a,a[0].photoType?'photoType':a[0].passageType?'passageType':'setType'),'qtype',c(qs,'type'),'answer',c(qs,'answer'),'bad',qs.filter(q=>q.choices.length!==4||!q.ko||q.ko.choices.length!==4||q.answer<0||q.answer>3).length)" p6-1
```
Part 1은 추가로 이미지 수·크기(최대 KB)·누락 파일 수를 출력. 보고: 위 출력, 난이도별 예시 id, 스스로 의심되는 문항(정답 유일성·사진 애매함).
