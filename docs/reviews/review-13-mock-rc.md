# 검토 13차: 모의고사 RC(Part 5·6·7) 내용 검토

- 작성: 리뷰어 Claude, 2026-11-11. 지시서는 `docs/tasks/review-13-mock-rc.md`다.
- 대상은 `docs/mock/m-p5.json`(150), `m-p6.json`(20지문), `m-p7s.json`(50세트), `m-p7m.json`(25세트)이고, 5회분 전부를 봤다.
- **방법:**
  - 서브에이전트 6개가 전수로 풀었다. Part 5 150문항에 1개, 회차별 Part 6·7에 5개다.
  - 보기 4개를 모두 넣어 봤고, 계산 문항은 다시 계산했으며, crossRef는 지문을 하나씩 가리고 풀었다.
  - 필수 항목, crossRef 표본(2-11-Q3, 4-12-Q3), 재발한 P6 단서(3-02, 4-01), 회차 간 반복 통계, 소재 겹침은 내가 직접 다시 확인했다("직접 확인" 표시).
- **심각도 기준은 10·12차와 같다.** 필수는 정답이 둘이거나 틀렸거나 지문과 모순되는 경우다. crossRef가 한 지문으로 풀리는 것은 12차처럼 **권장**으로 분류했다. 다만 12차에서 지적한 문제가 다시 나온 것이라 "재발" 표시를 붙였다. 서브에이전트 일부는 이를 필수로 올렸지만 기준을 맞췄다.
- 파일은 수정하지 않았다.

## 요약

| 파일 | 1회 | 2회 | 3회 | 4회 | 5회 | 회차 공통 | 합계 필수 / 권장 / 참고 |
|---|---|---|---|---|---|---|---|
| m-p5 | 0 / 2 | **1** / 3 | 0 / 2 | 0 / 2 | 0 / 6 | 0 / 1 | **1** / 16 / 9 |
| m-p6 | 0 / 2 | 0 / 3 | 0 / 1 | 0 / 6 | 0 / 4 | 0 / 2 | 0 / 18 / 15 |
| m-p7s | 0 / 1 | 0 / 5 | 0 / 5 | 0 / 6 | 0 / 3 | 0 / 2 | 0 / 22 / 19 |
| m-p7m | 0 / 8 | 0 / 12 | 0 / 8 | 0 / 14 | 0 / 11 | 0 / 2 | 0 / 55 / 22 |
| 파트 간(회차 안·회차 간 소재) | 0 / 1 | 0 / 1 | 0 / 1 | 0 / 4 | 0 / 2 | 0 / 1 | 0 / 10 / – |

(칸 안은 필수 / 권장 수다.)

**결론:**
- **정답 키가 틀린 문항은 없다.** 정답이 둘인 문항은 Part 5 2-20 하나뿐이다(필수, 직접 확인). 계산 문항은 모두 맞았고, insertion 10문항은 모두 자리가 하나뿐이다.
- **가장 큰 문제: crossRef 49문항 중 37문항(76%)이 한 지문, 질문 문구, 또는 상식만으로 풀린다.**
  - 회차별: 1회 6/10, 2회 8/9, 3회 5/10, 4회 9/10, 5회 9/10.
  - 12차에서 지적한 문제가 연습 문제보다 더 심하게 다시 나왔다.
  - 원인은 거의 하나다. **마지막 이메일이 규정을 다시 말하거나 결론을 미리 말한다**("Please arrange the appropriate repayment rather than…", "I will keep the ticket reference for any later review" 등).
- **회차 간 같은 뼈대(직접 확인).** 다섯 회차의 파트별 순서가 사실상 같은 틀이라, 2회차부터는 문항 위치만 보고 유형을 예측할 수 있다.
  - Part 5: 1~30번의 유형 순서와 번호별 난이도가 다섯 회차에서 같다(26번은 늘 도치·가정법, 30번은 늘 쉬운 사물 어휘).
  - Part 6: 01은 email, 03은 늘 email에 vocab/sentence/tense/vocab 순서, 04는 4문단 기사·광고에 빈칸 1·2·3·4다.
  - Part 7 단일: 위치별 지문 종류가 다섯 회차에서 같다. 04 text, 06 form, 08 chat, 09 article+insertion, 10 webpage+insertion.
  - Part 7 복수: 다섯 회차 모두 이중·이중·삼중·삼중·삼중이다. Q3·Q4가 inference crossRef, Q5가 detail이고, 두 번째 세트 Q2는 synonym이다.
- **12차 공식이 다시 나왔다.**
  - Part 6 tense의 "화면·진행률" 단서: 3-02 "live status reads 'processing'", 4-01 "progress indicator is at 60 percent", 5-04 "six of the fifteen exercises marked".
  - "완료 기록 증거" 단서: 1회 네 문항 모두, 2회 세 문항.
  - Part 7은 거의 모든 세트에 "X does not mean Y / rather than"과 "원본은 보존하고 정정은 추가" 문장이 있다.
- **소재:**
  - 회사 맥락은 5회 모두 2/3를 넘는다(1~4회 19/19, 5회 17/19). 오히려 비회사 소재가 거의 없어 실제 시험보다 단조롭다.
  - 같은 회차 안, 그리고 회차 사이에 같은 소재가 반복된다(아래 6장).
  - 연습 문제와 실질적으로 겹치는 것은 4건이다(참고~권장).
- **난이도 균형:**
  - Part 5는 3회가 가장 어렵다(demurrage, recuse, amortize). 5회가 가장 쉽다(3단계 어휘 diversify, tangible, dormant).
  - Part 6·7은 회차 간 차이가 작다. 난이도 3으로 표시된 P6-04는 1·2·3회 모두 체감 2다.
  - crossRef가 약해 P7m 전체가 표시보다 쉽다.
- **판정:**
  - 배포 전 필수는 2-20 하나다.
  - 실전 모의고사로서 가장 시급한 것은 crossRef 37문항을 고치는 것이다. 마지막 이메일에서 규정 재진술과 결론을 빼는 수정만으로 대부분 해결된다.
  - 그다음은 회차 간 순서를 섞는 일이다(Part 5 유형 순서, Part 7 단일의 지문 종류 위치).

---

## 1. 회차 공통 (구조·공식)

**권장 1 | 7 | 회차 간 같은 뼈대**(직접 확인).
- 근거: 요약의 네 항목이다. 실제 토익은 회차마다 Part 5 유형 순서와 Part 7 지문 종류 순서가 다르다.
- 고칠 방법:
  - Part 5: 회차마다 30문항 순서를 섞는다. 유형과 난이도 수량은 유지한다.
  - Part 6: 회차마다 email 위치를 01/02/03/04 중에서 바꾼다. 03의 "voca/sent/tens/voca" 순서는 2개 회차만 남긴다.
  - Part 7 단일: chat과 text의 위치, form/letter/webpage의 위치를 회차마다 바꾼다. 2문항·3문항·4문항 세트 구간은 그대로 둔다.
  - Part 7 복수: synonym 위치를 바꾸고, 회차마다 Q1이나 Q2를 not-true로 한 세트씩 둔다.

**권장 2 | 4 | crossRef 공통 원인과 수정 원칙**(재발).
- 마지막 이메일이 ① 규정을 다시 말하거나("rather than changing the recorded quantity"), ② 결론을 미리 말한다("I will keep the ticket reference", "If a single project approval can support both orders").
- 오답이 상식만으로 지워져 정답이 소거법으로 남는 경우도 있다("presenter's personal calendar", "larger bags").
- 수정 원칙:
  - 이메일에는 **사실만** 쓰고 판단은 지운다.
  - 질문 문구에 규정 단어를 넣지 않는다(예: "vehicle restrictions", "calendar suggestion", "project approval threshold").
  - 오답 셋은 "다른 지문에서는 참이지만 이 질문의 답은 아닌 것"으로 쓴다.
  - 고친 뒤 지문을 하나씩 가리고 다시 풀어 본다.

**권장 3 | 7 | Part 6 tense 단서 공식 재발.**
- 화면·진행률 단서: 3-02, 4-01, 5-04.
- 완료 기록 증거 단서: 1-01~04(네 문항 모두 정답이 과거·완료형이고 보기 세트도 will / is V-ing / would / 과거로 같다), 2-01·02·03(단서는 "attached", "log records completion"), 5-01, 4-04.
- 고칠 방법: 문항별 수정은 회차 절에 있다. 회차마다 tense 정답을 미래 1 / 과거·완료 1 / 현재 1 이상으로 섞는다. 단서는 일정·조건 문장으로 둔다.

**권장 4 | 7 | Part 7 문체 공식.**
- "X does not mean Y / not … merely because / rather than" 구별 문장이 회차마다 10~15세트에 있다. 3회는 15세트 중 10세트, 4회는 "rather than"이 19세트 중 15세트다.
- "원본은 대체하지 말고 정정을 추가" 주제가 2회 6세트, 4회 2세트(06·10), 5회 7세트다.
- 고칠 방법: 회차마다 절반 이상의 세트에서 이 문장과 그것을 묻는 문항을 빼고, 일정·수치 비교나 요청·응답 같은 전개로 바꾼다.

---

## 2. m-p5.json

### 필수
1. **m-p5-2-20 | 1 | 정답이 둘이다**(직접 확인).
   - 문장: "…neither team can submit its files using the ------- template."
   - 정답 other's 외에 보기 other로 만든 "the other template"(상대 팀 서식)도 문법과 의미가 모두 맞다.
   - 고칠 방법: 보기를 other's / each / others / another로 바꾼다(answer 0 유지). explain은 "명사 template 앞에서 상대 팀의 소유를 나타내는 것은 other's뿐이다. others·another·each는 the 뒤에서 이 명사를 한정하지 못한다."로 바꾼다.

### 권장
| id | 근거 | 고칠 방법 |
|---|---|---|
| 2-08 | 연습 문제 p5-3-061과 같은 단어(contingent on)·같은 틀이다 | "remains ------- to a shareholder vote" / subject·incidental·prevalent·redundant (answer 0) |
| 2-22 | 다음 문항 2-23 dilution과 어근이 겹친다. 문장 안에서 뜻이 풀려 있어 3단계가 과하다 | "…operators must ------- it through a fine mesh…" / distill·filter·extract·ferment (filter, 난이도 2) |
| 2-17 | "difficult to remove"는 기본 구문인데 3단계다 | 난이도 2로 내리고, 같은 회차의 2단계 문항 하나를 어렵게 바꾼다 |
| 3-17 | "would prefer the fund manager discussed"는 비표준이다 | "The trustees would rather the fund manager ------- any change…"(보기·정답 유지) |
| 3-18 | demurrage는 해운 전문용어로 토익 범위 밖이다 | 보기를 brokerage·royalties·gratuities·surcharges로 바꾼다(정답 surcharges). explain·ko도 수정 |
| 4-23 | "unfinished online purchases"는 쓰지 않는 표현이다 | "abandoned online orders" |
| 4-18 | obsolete의 정의가 문장에 그대로 있는데 3단계다 | 난이도 2 |
| 5-05 | "either party … by mutual agreement"는 '어느 한쪽'과 '상호 합의'가 모순된다 | "allowing the two parties to extend it by mutual agreement" / ko "양측이 상호 합의로" |
| 5-20 | 시제가 맞지 않는다(elected … have chosen). 연습 문제 p5-1-082와 같은 틀(others)이다 | "Two of the five partners elected …, while ------- chose additional ownership units instead." / other·another·the others·each other |
| 5-13 | 보기 whose("The online workspace whose illustrators…")도 겨우 성립한다 | 보기 whose → what |
| 5-28 | 같은 회차 5-21과 정답(if)·오답 세트가 겹친다 | 보기 if·unless·in case of·rather than (once는 넣지 않는다. 정답이 둘이 된다) |
| 5-26 | 보기가 1-26과 완전히 같다(was / it was / being / had) | 보기를 was·were·did·being으로 바꾼다 |
| 5-22, 1-18 | diversify, "meaning that…" 풀이가 있어 3단계가 과하다 | 난이도 2로 내리고 같은 회차에서 3단계 하나를 보충한다 |
| 회차 공통 | 1~30 유형 순서와 번호별 난이도가 같다(위 1장 권장 1) | 회차마다 순서를 섞는다 |

### 참고
- 난이도를 내리면 회차당 3단계 9개를 맞추기 위해 같은 회차에서 하나를 어렵게 바꿔야 한다.
- 2-30 "To separate … detach it"은 같은 말 반복이다. → tear.
- 4-07 ko "남성 사진가" → "사진가".
- 1-26, 4-26, 5-26은 type이 comparison인데 실제로는 도치다(명세 허용 범위).
- 회차 안 반복:
  - 1-07 문장의 jointly와 1-09 정답 jointly → 1-07을 collectively로 바꾼다.
  - 4회 tasting 3회(4-10·15·25).
  - 2-06·2-18이 둘 다 "The chart…"로 시작한다. 3-08·3-14가 둘 다 "The editor…"로 시작한다.
- 회차 간 반복:
  - 2-11·4-28(whereas + despite/during 오답).
  - 정답 to가 1-04·1-28·3-04·4-16에 나온다.
  - 같은 오답이 재사용된다(conceal, seasonal, prevalent, incidental, quantify, incentive, reciprocal).
- 연습 문제와 약하게 겹치는 것: 5-17/p5-2-011, 4-27/p5-1-005, 1-13/p5-3-009, 1-05/p5-1-065, 5-01/p5-1-007.
- 비즈니스 문맥은 회차당 73~83%다. 인명이 두 개(Neri Varo, Liora)뿐이다.

---

## 3. m-p6.json

### 권장
| id | 종류 | 근거 | 고칠 방법 |
|---|---|---|---|
| 1-01~04 tense | 3·7 | 정답 4개가 모두 과거·완료형이고, 보기 세트와 단서(다음 문장의 기록 증거)가 같다 | 04-Q4를 미래로 바꾼다. 뒤 문장을 "The accounts team is preparing a short guide…, which will accompany them when they go out on June 2."로 하고 정답 will be sent. 01이나 02 하나는 보기 세트를 "has been V-ed / had V-ed / V-s / will V"로 바꾼다 |
| 1-03 / 1-04 | 7 | 정답 verify/validate가 같은 개념이고 오답 conceal이 반복된다 | 04-Q2 오답 conceal → publish (참고 수준) |
| 2-01·02·03 tense | 7 | "완료 증거 + 첨부" 단서와 보기 틀(will / is -ing / would / 완료)이 같다 | 03-Q3: "Our purchasing manager {3} the proposed terms. She has asked for the revised quotation by Friday…" (정답 will review) |
| 2-03-Q2 | 3·5 | 정답 "…exclusive ownership."에만 mold가 없어 뒤 문장 "Your factory may use it"의 it이 가리킬 말이 없다 | "…exclusive ownership of the mold." |
| 2-04-Q3 | 3 | 오답 D "covers product packaging but excludes occupied business spaces"가 첫 문장과 바로 충돌한다 | "The trial area is installed only after the full system has been paid for." |
| 3-02-Q2 | 3·7 재발 | "Its live status reads 'processing,' and only half of the transactions have cleared." 정답 is processing이 'processing'을 반복해서 풀린다(직접 확인) | "The settlement team {2} each batch once the business day closes." (정답 processes / processed·will have processed·had processed). 상태 문장은 지운다 |
| 4-01-Q2 | 7 재발 | "The progress indicator is at 60 percent"(직접 확인) | "Entries for the northern offices have been corrected, but the other regions are still being processed." |
| 4-01 1·2문단 | 2 | 1문단은 현지 표시를 믿으라 하고, 2문단은 현지 표시가 틀릴 수 있다고 해서 지시가 모순된다 | 1문단 끝을 "Please {1} the updated entry in your calendar rather than relying on the previous invitation." |
| 4-02-Q1 | 3 | 뒤의 "rather than an unfiltered list"가 정답 filter를 드러낸다 | "rather than a long list of every possible match" |
| 4-02-Q4 | 3 | 다음 문장의 adviser를 언급하는 보기가 정답뿐이다 | 오답 C → "Forward the report to your adviser only after telling the other business it has committed a violation." |
| 4-02-Q2 / 4-03-Q3 | 7 | 보기 세트(used to / will begin / has stopped / 현재)와 단서 틀이 같다 | 03-Q3 보기 → specified·was specifying·specifies·had specified. 단서 → "Any change would require a written amendment signed by both parties." |
| 4-04-Q2 | 5·7 | "recorded at its completed session"은 어색하고 완료 증거 공식이다 | "The decision appears in the minutes of the committee's March meeting, and the reporting instructions now reflect it." |
| 5-03-Q4 | 1 | 보기 is changing이 확정된 예정으로 읽힐 수 있다. "has not started"는 진행 중만 막는다 | is changing → was changing |
| 5-01-Q2 / 5-04-Q2 | 7 재발 | "dashboard shows that the renewal is complete", "six of the fifteen exercises marked" | 01: "Finance settled the provider's invoice for it on February 6." / 04: "Assessors received the submissions on Monday and expect to release scores at the end of the month." |
| 5-02 ko | 5 | "법원에서 귀가하도록 하면"은 주어와 행위가 원문과 다르게 읽힌다 | "법원이 예상보다 일찍 귀가시키면" / 보기 B "일찍 귀가 조치되더라도" |
| 회차 공통 | 7 | 위 1장 권장 1·3 | – |

### 참고
- 1-04, 2-04, 3-04: 난이도 3으로 표시됐지만 체감 2다.
- 2-04-Q4, 3-04-Q4 ko: has opened/opened, has begun/began이 같은 번역이다. → "개방된 상태다", "시작된 상태다".
- 3-01-Q4: 정답이 앞 두 문장의 반복이다. → "Probation normally lasts three months from the start date."
- 3-03-Q2: 과거형 보기가 정답 하나뿐이다. → 오답 하나를 had reported로 바꾼다.
- 3-02의 3문단, P7m-3-12 공지 4문단은 한 문장짜리 문단이다.
- 2-03-Q3: is reviewing도 약하게 읽힌다(권장 수정과 함께 해결).
- 4-01 "join the correct session" → "join at the right time".
- 4-04-Q1: "This distinction matters" → "Keeping the two sources apart matters".
- 2-02 explain "무작위 목록" → "선별되지 않은 목록".
- 5-03: 반올림 소재가 모의고사에서 세 번째로 나온다(7s-1-05, 7s-2-09).

---

## 4. m-p7s.json

### 권장
| id | 종류 | 근거 | 고칠 방법 |
|---|---|---|---|
| 1-04-Q2 | 2·5·6 | "Let's not ring that bell yet"은 ring(전화)이라는 글자 뜻으로 답이 나온다. 관용구 오용이고 ko도 뜻이 안 통한다 | "Let's hold off on that for now." / "그건 잠시 보류합시다" |
| 2-04-Q1·Q2 | 1·6 | Q1과 Q2의 정답이 사실상 같다(시간대 혼동). "two different clocks"도 글자 뜻대로 읽힌다 | Q1 → "What will Tavi Relsen most likely do next?" / "Reschedule a factory appointment" |
| 2-06 ko | 5 | "클릭만이 아니라 등록 완료"는 클릭도 포함한다는 뜻이 된다 | "성과 지표는 클릭 수가 아니라 등록 완료 수입니다." |
| 2-08-Q2 | 5 | "step off the scale entirely"는 쓰지 않는 표현이다 | "I'd rather step aside for the whole round." |
| 2-03-Q1·Q2 | 6 | 오답 C·D가 상식만으로 지워지고, Q2 정답이 본문 그대로다 | D → "It can be edited more easily than a printed copy." / Q2 → "By forwarding a link that opens the stored file" |
| 2-10 | 7 | 배치 추적 소재가 연습 문제 p6-1-021과 겹친다 | 소재를 바꾼다 |
| 3-04-Q2, 3-08-Q2 | 5·6 | 인용 "The words are not the cargo.", "We need two lenses, not one eraser."는 실제로 쓰지 않는 창작 비유다 | "Don't hold on to the wording." / "It's not an either-or situation." |
| 3-10-Q3 | 2 | 정답이 지문 그대로다 | "Obtain the insurer's agreement in advance" |
| 3-06 ↔ P7m-3-11 (+3-13) | 7 | 같은 회차에 IT 장애·시스템 소재가 3세트다 | P7m-3-11을 IT가 아닌 업무로 바꾼다 |
| 3회 전반 | 7 | "X does not mean Y"가 15세트 중 10세트다(1장 권장 4) | – |
| 4-02-Q2, 4-03-Q1, 4-08-Q3 | 2 | 정답이 지문 그대로다 | "Consent from her home team and the host team" / "Which recipient's copy was circulated further" / "Two results, each labeled with how the device was used" |
| 4-05 / 4-07 | 7 | 둘 다 공급업체 계약 조건 편지이고 전개가 같다 | 07을 내부 메모나 위탁 정산 양식으로 바꾼다 |
| 4-06 / 4-10 | 7 | 둘 다 "원본 기록 보존, 대체 금지"가 핵심이다 | 06의 3문단을 재검사 범위 중심으로 바꾼다 |
| 4-07 | 7 | m-p6-3-03(위탁 재고는 판매 전까지 공급사 소유)과 겹친다 | 시연품 무상 대여 등으로 바꾼다 |
| 5-05 | 7 | m-p7-3-13(소프트웨어 seat, 비밀번호 공유 금지, 추가 구매 전 검토)과 거의 같다(직접 확인) | 소재를 바꾼다 |
| 5-06 ↔ m-p6-5-04 | 7 | 같은 회차에서 둘 다 "코드로 신원 숨김 → 결과 확정 후 공개" 장치를 쓴다(직접 확인) | 5-06을 숨김 장치 없이 바꾼다: "The laboratory was told which batch each sample came from, but not that F08 was a certified reference." |
| 5-09-Q1 | 6 | 지문에 lot의 뜻풀이가 있어 정답이 그대로 나온다 | "Each lot was described aloud as the auctioneer invited bids." |

### 참고
- 1-08-Q3 "That bridge is not built yet" → "We're not there yet."
- 1-06-Q2: type inference인데 실질은 detail이다.
- 1-03 ko consultant "상담원" → "전문 조사원".
- 1-01 제목 "Say my name" → "Name recordings now available".
- 3-09-Q3: 바꿔 말하기가 약하다. 3-09 ko furnace "용광로" → "용해로".
- 4-02-Q1, 4-10-Q1: 오답이 약하다. 4-10 "the tester / link"는 앞에 소개 없이 나온다. 4-08 난이도 3은 체감 2다.
- 4-04-Q2: 인용의 글자 뜻이 정답과 가깝다(허용).
- 5-04 / 5-08: 채팅 흐름이 같다(2세트, 기준 미만).
- 5-02-Q2 (D) → "A doctor's note describing any discomfort". 5-02 ko "영상 예약에서" → "영상 상담 중에".
- 2-05: 판지 낭비 소재가 p6-1-029와 겹친다. 2-03: 링크 공유가 p7-1-030과 비슷하다.
- 이름 Orrel, Neris가 연습 문제와 겹친다. Venn이 2회에 두 번 나온다.
- 1-07 / 1-10: "ten working days"가 반복된다. 1-10과 P7m-1-12의 "urgent" 문장이 거의 같다.

---

## 5. m-p7m.json

### 권장: crossRef가 한 지문으로 풀린다(재발, 37문항)
| id | 한 지문으로 풀리는 이유 | 고칠 방법 |
|---|---|---|
| 1-11-Q3 | 이메일 "I initially thought P64 could be archived. However, the acceptance message has not arrived…"가 답을 말한다 | 첫 문장을 "The client paid the final invoice yesterday. The acceptance message has not arrived, and our engineer has one open task…"로 바꾼다. 보기는 모두 이메일상 사실로 한다(정답 "The client has not confirmed acceptance") |
| 1-11-Q4 | 이메일 "…so I plan to keep those versions" | "…I am not sure whether they should stay in the folder." / q "What should Ms. Fenwick do with the two older drawings?" |
| 1-12-Q3 | 이메일 "activate the account when you are satisfied" | 이 문장을 지운다 |
| 1-12-Q4 | 이메일로 B·C·D가 지워지고, "their transfers are ready"가 A를 말한다 | 그 구절을 지운다. 오답은 공지로만 반박되는 것으로 한다("Let Mr. Sol activate the details since he made the call" 등) |
| 1-14-Q4 | 표로 A·B·C가 지워지고, 이메일 "distinguish the total energy used…"가 D를 말한다 | 보기를 모두 자료상 참인 문장으로 바꾼다(정답 "The demand charge fell by $360 while energy use stayed at 10,000 kWh…") |
| 1-15-Q3 | 상식만으로 70분이 나온다 | 양식을 "The May 8 work was announced on May 7"로 바꿔 E31이 포함되게 한다(정답 120분, 보기 90/70/120/155) |
| 2-11-Q3 | 이메일만으로 $6이 나온다(직접 확인) | 영수증에 "$8 engine oil (not covered by any maintenance instruction)"을 넣고 "six dollars" 문장을 지운다(정답 $14) |
| 2-11-Q4 | 이메일 "Please arrange the appropriate repayment rather than changing the recorded quantity" | 그 문장을 지운다. q "Why did the supervisor refuse the cash?" / "Repayment must go through the accounts team" |
| 2-12-Q3 | 편지 "These activities use no powered equipment and produce no significant sound" | 그 문장을 지운다 |
| 2-13-Q3 | 이메일 "belongs in the next month's calculation" | "Please explain why it was left out and when it will be paid." |
| 2-14-Q3 | 이메일 "B406, however, left with the earlier collection" | "Please correct whichever entry the attached receipt supports."까지만 쓴다(이메일-영수증 모순도 함께 해결) |
| 2-14-Q4 | 이메일 "B412 was still being used…" | q "What must Ms. Dinn's staff do to clear B412 from a later statement?" / "Scan its code when giving it to an authorized driver" |
| 2-15-Q3 | 이메일만으로, 또는 메모만으로 풀린다 | q "Why must the presenter's local copy be replaced?" / "Its hidden tab still contains account identifiers" |
| 2-15-Q4 | 메모 "adding a real customer's recent service note… No review has been requested" | "adding the Halvern account's recent service note to v2"로 바꾸고 둘째 문장을 지운다 |
| 3-11-Q3 | 질문의 "calendar suggestion"이 메모 "Suggestions … improvement queue"와 바로 짝지어진다 | q "Where should the item Ms. Dane's colleague raised be directed?" |
| 3-11-Q4 | 메모만으로도, 이메일 "I will keep the ticket reference for any later review"만으로도 풀린다 | 이메일 2문단을 "Two colleagues have asked whether they should now tell customers the fault has been fixed."로 바꾼다. q "What should Ms. Dane tell her colleagues?" |
| 3-12-Q4 | 질문에 "unsubmitted course certificate"가 있어 공지만으로 풀린다 | q "What is true about the document Ms. Pell mentions in her final paragraph?" |
| 3-13-Q4 | 메모 규칙과 소거법으로 풀린다. 정답의 "Samil"이 Q3 답을 누설한다 | "The previous user's access must be disabled first". 오답은 배정표와 관련된 것으로 바꾼다 |
| 3-14-Q4 | 표와 상식(1분기=1~3월)으로 풀린다. 질문이 Q3 보기를 소거해 준다 | q "Why might the draft summary have overstated quarter-one travel?" / "It counted a journey by purchase date rather than travel date" |
| 4-11-Q3 | 이메일 "cover the period after our free entitlement ends" | "Please quote storage terms that would keep the mold with you until that run." |
| 4-11-Q4 | 이메일 "I now handle this product and should receive future storage notices" | "Please update your records accordingly." |
| 4-12-Q3 | 질문의 "threshold"와 이메일만으로 $6,000이 나온다(직접 확인) | 메모에 "Delivery and installation charges for project items count toward the total."을 넣고, 이메일에 "$250 delivery charge"를 넣는다(정답 $6,250) |
| 4-12-Q4 | 이메일 "If a single project approval can support both orders…" | "Please tell me whether the two orders can stay separate." |
| 4-13-Q4 | 양식의 R3 설명과 표만으로 풀린다 | R3 설명을 "Where an inspector's classification differs from a production label, the inspector's classification is recorded."로 일반화한다 |
| 4-14-Q3 | 질문의 "afternoon response"와 표만으로 풀린다 | q "Who should give the customer on case V90 the promised update?" |
| 4-14-Q4 | 이메일 "a private note about my absence"만으로 풀리고 오답이 엉뚱하다 | "a line explaining why I had been away" / 오답 "It listed Toven Marr's hours incorrectly" |
| 4-15-Q3 | 보기 A에 풀이가 들어 있다("46 of 90 valid votes"). 이메일이 분모 규칙을 미리 말한다 | 보기를 lockers / quiet area / "Neither, so a second ballot is needed" / "Both, within the fixed budget"로 바꾸고 이메일 둘째 문장을 지운다 |
| 4-15-Q4 | 이메일과 소거법으로 풀린다 | 오답 "A tie became a narrow lead for the quiet area", "The lockers' lead grew from two votes to four" |
| 5-11-Q3 | 이메일 "may explain why the draft currently shows only one origin line…" | 두 문장을 "Please prepare the statement for X73."으로 바꾼다 |
| 5-11-Q4 | 이메일 "I have not authorized dispatch. Once you return…" | "Packing is nearly finished, and the driver is booked for Thursday." |
| 5-12-Q3 | 이메일과 소거법으로 풀린다(T는 틀렸고 R만 남음) | 웹페이지에 "destination S reaches billing"을 넣고 보기 C를 S로 바꾼다 |
| 5-12-Q4 | 이메일 "…verified that it works with the current destinations" | 그 구절을 지운다 |
| 5-13-Q3 | 오답 B·C·D가 상식만으로 지워진다 | 오답 하나를 "Arrival of the files before the November 12 deadline"(검토서의 사실이지만 부족 사항은 아님)으로 바꾼다 |
| 5-13-Q4 | 검토서 "This evidence demonstrates… can therefore be closed" | "…closed under the current follow-up policy." / 오답 "The supplier has committed in writing to use the new form" |
| 5-14-Q4 | 메모만으로 풀리고 정답이 메모 문구 그대로다 | 이메일의 "Keep this message…"를 지운다. q "…what should be filed with the corrected advice as the explanation?" / "The bank's December 6 message" |
| 5-15-Q3 | 이메일 "we attached only the price schedule… reached your office after four" | "We then sent a third version." |
| 5-15-Q4 | 이메일 "…combining them would not accurately represent either offer" | 그 문장을 지운다. 정답 "It would create a package that was never submitted complete before the deadline" |

연계가 제대로 성립하는 문항(참고용 모범): 1-13-Q3, 1-15-Q4, 2-13-Q4, 5-14-Q3.

### 권장: 그 밖
| id | 근거 | 고칠 방법 |
|---|---|---|
| 1-14 ko | passagesKo에 원문에 없는 "기사에 설명한 요율을 적용했다"가 있다(연계 단서를 더하는 오역) | 그 구절을 지운다 |
| 1회 5세트, 2회 11·13·14, 4회 13·15, 5회 11·12·14·15 | 모든 세트가 "규정 문서 + (기록) + 그 규정을 적용하는 직원 이메일" 흐름이다. 4-13과 4-15는 Q4 틀까지 같다 | 회차마다 1~2세트를 기사·광고 + 후기·일정표 조합이나 일정·인원 계산형으로 바꾼다 |
| 2-14 이메일 | 이메일은 영수증 R72를 마지막 수거라고 하는데, B406이 "earlier collection"에 나갔다고 해서 서로 모순된다 | crossRef 수정과 함께: "B406 was handed over on June 30; its damaged handle may explain why the driver set it aside for inspection." |
| 2-11-Q1, 2-15-Q1, 4-15-Q1 | Q1 오답이 엉뚱하다("nutritional rules for drivers' meals", "presenter's personal calendar", "larger bags") | "Limits on monthly fuel spending per vehicle" / "The approval steps for creating fictional records" / "How facilities staff will select a locker supplier" |
| 2-11 | 항목별 영수증 소재가 p6-1-006과 겹친다 | 통행료 카드 등으로 바꾼다 |
| 3-11 이메일 | 수신자가 Application support인데 "I have forwarded it to you"라고 해서 지원팀 메시지를 지원팀에 다시 보내는 꼴이다 | "I have forwarded it to the branch manager" |
| 3-14-Q2 | 정답이 지문 그대로이고 오답이 상식만으로 지워진다 | "A specialist who applies standard factors" / 오답 finance team, each traveling employee, travel administrator |
| 3-15 ko | "바닥에서 번호를 읽었다"는 floor로 읽힌다 | "선풍기 받침 밑면에서" |
| 4-12-Q5 | 정답 "Begin the work"가 지문 그대로다 | "Proceed with filling the order" |
| 4-15 메모 | 오타 "additional additional personal lockers" | 한 번만 쓴다 |
| 4-11 | m-p6-2-03(금형 소유권)과 논점이 같다(직접 확인) | 다른 거래 조건으로 바꾼다 |
| 5-11-Q2 ko | 영어는 "What information"인데 ko는 "누구에게"다 | "무엇을 확인해야 하는가?" |

### 참고
- 1-13-Q4: 오답 B가 상식만으로 지워진다. → "It was refilled after the warning was circulated".
- 1-11-Q2·Q5, 2-15-Q2, 2-14-Q5: 정답이 지문 그대로다.
- 1-14-Q1 ko, 1-11·3-13 ko: 비문이 있다("동시에 대신"). project를 "사업"으로 옮겼다(→ 프로젝트).
- 2-12-Q4: 정답이 질문을 되풀이한다.
- 2-13: 메모에 분기가 없다. → "Second-quarter sales plan".
- 2-14: 재사용 용기 소재가 p7-2-012와 겹친다.
- 2-11·2-12: 끝에 한 문장짜리 문단이 있다.
- 3-14-Q3: 거의 상식으로 풀린다. 3-15-Q3: explain "세 문서 결합"이 과장이다.
- 4-13-Q3: 통과하지만 상식으로 짐작된다. 4-14: Q2·Q5가 모두 연장 관련이다. 4-11 ko: 문체가 섞였다. 4-11-Q1: 오답이 약하다.
- 5-11 이메일 "revise the request" → "revise the draft statement". 5-13-Q5 explain "두 번째 편지" → "편지(두 번째 지문)".
- **passagesKo 문체:** P7m 전체가 "~다"체로, P7s의 "~합니다"체와 다르다. 통일을 권한다.

---

## 6. 소재

### 회사 맥락
| 회차 | P6 | P7s | P7m | 합계 |
|---|---|---|---|---|
| 1 | 4/4 | 10/10 | 5/5 | 19/19 |
| 2 | 4/4 | 10/10 | 5/5 | 19/19 |
| 3 | 4/4 | 10/10 | 5/5 | 19/19 |
| 4 | 4/4 | 10/10 | 5/5 | 19/19 |
| 5 | 4/4 | 8/10 | 5/5 | 17/19 |

- 규칙(2/3 이상)은 모두 충족한다.
- 다만 비회사 소재(일반 소비자 광고, 지역 행사, 여행)가 회차당 0~2개라 실제 시험보다 좁다(참고).
- 소재가 전문적인 것이 많아 실제 토익보다 어휘·배경 부담이 크다. 예: 소스 코드 위탁, 배출 경계, 부피 중량, 원산지 증명, 정산 배치.

### 같은 회차 안 겹침 (권장)
- **1회**(직접 확인): P6-01과 P7s-01은 직원 명부 이름이다. P6-02와 P7s-02는 영업 구역·거래처 담당이다. P6-04와 P7s-05는 체결 부품 가격이다. P6-03과 P7s-05는 단위 착오다. → P7s-01은 회의실 예약 규칙, P7s-02는 출장 경비 마감, P7s-05는 포장재로 바꾼다.
- **2회:** 독점 소재(P6-03, P7s-07). 공장 손실 측정(P6-02, P7s-05). 기록 원본 보존(P7s-03·10, P7m-11·13·14·15).
- **3회:** IT 장애·시스템(P7s-06, P7m-11·13). 출장(P7s-02, P7m-14, 참고).
- **4회:** 탐지 서비스 광고 + 면책(P6-02, P7s-03). 구매 조건(P6-03, P7s-05, P7m-12). 환경 보고 범주 분리(P6-04, P7m-13). 임시 배치 + 연장은 자동 아님(P7s-02, P7m-14).
- **5회:** 결제 요청 확인·웹 주소(P6-01, P7s-01). 익명 코드(P6-04, P7s-06).

### 회차 간 겹침 (권장, 직접 확인)
- 금형 소유권: m-p6-2-03 / m-p7-4-11
- 지사별 통화 시간 표시: m-p6-4-01 / m-p7s-2-04
- 소프트웨어 seat: m-p7s-5-05 / m-p7-3-13
- 위탁 재고 소유: m-p6-3-03 / m-p7s-4-07
- 배출 보고: m-p6-4-04 / m-p7-4-13 / m-p7-3-14
- 반올림 순서: m-p7s-1-05 / m-p7s-2-09 / m-p6-5-03
- 참고: 생산량 지표 기사(m-p7s-1-09 / 2-05), 영업 구역(m-p7s-1-02 / 2-07), 통화 환산(m-p6-5-03 / m-p7s-4-01)
- 고칠 방법: 각 쌍에서 뒤 회차 쪽을 바꾼다.

### 연습 문제와 겹침
- 권장: m-p7s-2-10 / p6-1-021(배치 추적), m-p7-2-11 / p6-1-006(항목별 영수증)
- 참고: m-p7s-2-05 / p6-1-029(포장 낭비), m-p7-2-14 / p7-2-012(재사용 운송 용기), m-p6-2-03 / p6-1-023(독점 범위), m-p7-3-15 / p6-1-021(생산 배치 결함)
- Part 5 겹침은 2장에 정리했다.

## 7. 회차 간 난이도
| 회차 | Part 5 | Part 6 | Part 7 단일 | Part 7 복수 |
|---|---|---|---|---|
| 1 | 보통 | 04는 3 표시에 체감 2 | 표시와 비슷 | 쉬움(연계 약함) |
| 2 | 보통 | 04는 3 표시에 체감 2 | 표시와 비슷 | 쉬움(연계 8/9 약함) |
| 3 | **가장 어려움**(demurrage, recuse, amortize) | 04는 3 표시에 체감 2 | 10은 3 표시에 체감 2 | 보통 |
| 4 | 보통 | 표시와 비슷 | 08은 3 표시에 체감 2 | 쉬움(연계 9/10 약함) |
| 5 | **가장 쉬움**(3단계 어휘가 쉬움) | 04는 3 표시에 체감 3 | 06은 3 표시에 체감 2 | 쉬움(연계 9/10 약함) |

- 3회 Part 5는 3-18과 3-17을 고치면 보통 수준이 된다.
- 5회 Part 5는 3단계 문항 2~3개를 더 어려운 어휘로 바꾼다.
- Part 7 복수는 crossRef를 고치면 표시 난이도에 가까워진다.

## 확인하지 못한 것
- Part 1~4(LC)는 이번 범위가 아니다.
- 규칙이 말하는 `questions/toeic-part5|6|7.json`은 이 저장소에 없다. 그래서 `questions/p5-1~3.json`, `p6-1.json`, `p7-1.json`, `p7-2.json`과 비교했다. 비교는 제목·핵심어·정답 단어 기준이라, 다르게 바꿔 쓴 근접 중복은 놓쳤을 수 있다.
- 서브에이전트가 낸 수정 문장 중 crossRef 수정안은 반영한 뒤 지문을 하나씩 가리고 다시 풀어 봐야 한다. 나는 표본만 다시 풀었다.
- passagesKo·paragraphsKo는 뜻이 바뀌는 오류만 훑었다. 영어 자연스러움과 난이도는 텍스트 기준의 판단이다.
