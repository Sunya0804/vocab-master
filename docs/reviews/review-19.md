# 검토 19차: 18차 수정 재검토 (m-p7m crossRef, Part 6 연습·모의)

- 작성: 리뷰어 Claude, 2026-11-12. 지시서는 `docs/tasks/review-19.md`, 기준은 `docs/reviews/review-18-recheck.md`다. 대상은 이미 배포됐고(4c8785b), 이번 검토는 남은 문제를 찾는 것이다.
- **방법:**
  - 서브에이전트 6개가 나눠 다시 풀었다(m-p7m 1·2회 / 3·4회 / 5회 + 구조, p6-1 001~016 / 017~032, m-p6).
  - crossRef는 문항마다 지문 A만, B만, C만, 질문 + 보기만으로 풀어 봤다. 넷 중 어느 것으로도 정답이 하나로 정해지지 않을 때만 통과로 쳤다.
  - 나머지 문항도 보기 4개를 모두 넣어 다시 풀었고 해설을 대조했다. **필수 4건은 모두 내가 직접 확인했다.** tense 보기 세트 통계도 직접 뽑았다.
- **심각도 기준(10~18차와 같음):** 필수는 정답이 둘이거나 틀렸거나, 지문·해설이 모순되는 경우다. crossRef가 한 지문으로 풀리는 것은 권장이다.
- 파일은 수정하지 않았다.

## 요약

| 파일 | 필수 | 권장 | crossRef 통과 | 18차 지적 |
|---|---|---|---|---|
| m-p7m.json | **1** | 9 | **45/49** (18차 37) | 필수 3 모두 해결. 실패 10 중 9 해결, 2-12-Q3만 남음 |
| p6-1.json | **2** | 8 | – | 필수 2 모두 해결. 대신 새 필수 2(015-Q2, 028-Q2) |
| m-p6.json | **1** | 8 | – | 권장 8 중 해결 1, 부분 3, 미해결 4 |

**crossRef 회차별 통과:**
- 1회 8/10
- 2회 8/9
- 3회 9/10
- 4회 10/10
- 5회 10/10

경계 판정이 1-11-Q2, 5-11-Q2, 5-13-Q3, 5-15-Q4에 있는데 모두 통과로 셌다.

**결론:**
- **정답 키가 틀린 문항은 없다.** m-p7m crossRef는 45/49로 실제 시험 수준에 가까워졌다.
  - 남은 실패 4개 중 3개는 18차 수정안의 질문 문구가 다른 문항의 답을 드러내거나(1-14-Q4, 1-12-Q4), 오답이 "규정이 직접 금지한 행동"인 경우다(1-12-Q4, 2-12-Q3).
- **Part 6는 고칠 때마다 정답이 둘인 문항이 새로 생긴다.**
  - p6-1-015-Q2: 18차가 지우라고 한 문장 때문에 완료 단서가 사라졌다.
  - p6-1-028-Q2: 012·014·016·18차에 이어 같은 빈칸이 또 걸렸다. 지운 문장 대신 넣은 문장이 진행형을 지지한다.
  - m-p6-3-01-Q3: 연결어 For instance도 성립한다.
  - 원인은 두 가지다. 단서 문장을 지우거나 바꾸면서 남은 보기와의 관계를 다시 풀어 보지 않았다. 그리고 tense 단서를 "다음 문장 하나"에만 기대고 있다.
- **Part 6 tense의 새 반복**(직접 확인).
  - 연습: 진행 대 완료 대비가 12/27문항이고 현재완료 정답이 9문항이다. "will have p.p. 정답 + will be V-ing 오답"이 011·022(+019), "현재형 정답 + 상시 절차 설명"이 016·025·027이다(18차 규칙 위반).
  - 모의: 회차 간 같은 보기 구조의 짝이 6쌍이다(1-03=5-03, 2-04=5-04, 2-03=3-04, 1-04=4-01, 1-02=3-02, 3-03≈4-02). 18차 m-p6 권장 중 4건(2-03·3-04 단서, 2-04/5-04 세트, "아직 안 함" 오답, 연결어)은 손대지 않았다.

---

## 1. m-p7m.json

### 18차 지적 처리
| 항목 | 상태 |
|---|---|
| 필수 2-12 공지 문단 중복 | 해결. 3문단이 새 규정 문장이 됐고 Q1·Q3 해설과 맞다 |
| 필수 5-11-Q2 해설 기호 | 해결("B다") |
| 필수 5-15-Q4 정답 둘 | 해결(A → "It was sent under a different bidder code") |
| crossRef 실패 1-11-Q2 | 부분(경계). 제목과 색인 문장은 고쳤지만 "although its invoice is unpaid"가 P64 쪽으로 기울게 한다 |
| 1-12-Q3, 1-15-Q4, 2-14-Q4, 2-15-Q3, 2-15-Q4, 3-13-Q4, 5-14-Q4 | 해결 |
| 2-12-Q3 | 부분. 규정 문장은 생겼지만 공지만으로 풀린다 |
| 경계 3-11-Q1, 4-14-Q3 | 해결 |
| 3-14-Q4(D12 노출) | 부분. D12는 빠졌지만 보기가 D13 보유자의 휴가를 드러내 Q3이 풀린다 |
| 4-11-Q5, 3-13 날짜, 4-11 지문 종류, 2-14 마감 정의, 한국어 표기 다수 | 해결 |
| 초안 → 확정 대조 틀 | 부분. 3-13·4-13·4-15에 남았다(4회 2세트) |
| 삼중 세트 Q3·Q4 crossRef 고정 | 해결. 15세트 중 10세트가 Q3·Q4이고, 5세트(회차마다 1개)는 다른 위치다 |
| 3회 IT 소재, 4회 not-true 세트 없음 | 미해결 |

### 필수
1. **m-p7-5-11 이메일 | 지문이 모순된다(정답에는 영향 없음).**
   - 1문단은 "Please prepare the statement for X73."라고 하는데, 2문단은 "The coordinator returned statement OS73 this morning."이라고 한다. 이미 돌아온 문서를 다시 작성해 달라는 셈이다. 또 수신자(Export coordinator)를 3인칭으로 부른다.
   - 고칠 방법: 1문단의 "Please prepare…" 문장을 지우고, 2문단을 "You returned statement OS73 for X73 this morning."으로 바꾼다. ko도 함께 고친다.

### 권장
1. **crossRef 실패 4문항.**
   - **1-12-Q4:** 오답 B·C·D가 공지가 직접 금지한 행동이라 공지만으로 지워진다. 이메일 "There are no account-change requests for the other three suppliers"도 답을 말한다. Q4 질문의 "before Ms. Norr finishes her review"는 Q3 답(Norr)을 흘린다.
     - → 이메일 2문단을 "Today's payment list includes Brevin, Calto, Hesk, and Mardo. Hesk sent an account-change request last week; its verification call is booked for tomorrow."로 바꾼다.
     - → q "Which of today's transfers may be released now?" / "Calto and Mardo only"* / "Calto, Hesk, and Mardo" / "Hesk only, to its existing account" / "Brevin and Hesk, to their existing accounts".
   - **1-14-Q4:** 질문 "…when C22 is refilled after draining?"가 C22 오주입(Q3 답)을 드러내서 양식만으로 풀린다. 18차 수정안이 만든 누설이다.
     - → q "Which product is specified for machine C22?"
   - **2-12-Q3:** 공지 "moved to any other date requires a new notice"만으로 풀린다. 보기 셋이 "without another notice / existing acknowledgment"라서 A만 튄다.
     - → 공지 "…moved to a date not listed requires a new notice", q "Which change would require Siven Design to submit a new notice?" / "Moving the July 11 drilling to July 14"* / "Moving the July 10 drilling to July 12" / "Pausing the July 11 drilling for the briefing and resuming at one" / "Moving the July 12 afternoon drilling to nine o'clock that morning".
   - **3-14-Q4:** 보기 B "before its holder returns", C "for its holder to use after approved leave"가 휴가 사실을 드러내 Q3이 풀린다.
     - → "Reassign it to Calen after disabling its current access" / "Release it when the subscription is reviewed at quarter-end" / "Keep it with its current holder"* / "Transfer it to Pera Lin for her current assignments".
2. **경계 문항:**
   - 1-11-Q2: "although its invoice is unpaid" → "P64 has the client's final acceptance and no open tasks; its invoice is unpaid."
   - 5-11-Q2: 오답 A·C가 공지만으로 지워진다.
   - 5-15-Q3: 오답 D가 공지만으로 지워진다.
3. **오답이 한 지문이나 상식만으로 지워져 사실상 둘 중 하나가 되는 문항(18차 규칙):**
   - 3-12-Q4, 4-12-Q5, 3-11-Q4, 4-11-Q4.
   - 예: 4-12-Q5 C → "Include the $300 stationery request in the same approval".
4. **2-14-Q4 해설:** 질문에 B406·B412가 직접 적혀 이메일 없이 풀린다. 그런데 해설은 "세 지문이 모두 필요하다"고 한다. → 해설의 해당 문장을 지우거나 q를 "…for the bins listed on its statement?"로 바꾼다.
5. **2-12 공지:** "provided they do not interfere with the broadcast"의 the broadcast가 가리키는 대상이 없다. → "provided they do not disturb neighboring units".
6. **계산형 crossRef 몰림:** 4회 crossRef 10문항 중 6문항이 산술이다. 4-13·4-15·3-13은 한 세트 안에 계산형이 둘이다. → 4-13-Q4나 4-15-Q4 하나를 비계산형으로 바꾼다.
7. **"역할 한 줄 인물 나열 → 규정상 역할로 이름 고르기" 틀:** 1-12·2-11·2-15. → 회차마다 1세트만 둔다.
8. **인명 재사용:** Pell이 4명(1-12·2-11·3-12·4-14), Lora가 3명, Tavin Mer 동명이인(1-12·2-15), Renn·Venn·Voss가 중복이다. 4-14 이메일 "I worked the scheduled hours on … and today"는 근무 중인데 끝낸 것처럼 말한다. 5-12 두 번째 지문은 type이 review인데 내용은 서신이다.
9. **구조:** 25/25세트가 "규정·조건 문서 → (양식) → 적용하는 마지막 문서" 흐름이다. 마지막 지문은 email 21개다. 3회 IT 소재 2세트, 4회 not-true 0개, 초안 대조 틀 3세트가 남았다.

참고:
- 한국어 혼용: 3-11 "개선 업무함/개선 대기 목록"(경로가 둘로 읽힌다), 2-14 "미반납/미반환", 5-11 "라이도라/리도라".
- 4-13-Q4와 4-15-Q3은 질문 + 보기로 찍힐 여지가 있다.
- 5-14 ko 문체가 섞였다. Neris를 재사용한다.

## 2. p6-1.json

### 18차 지적 처리
| 항목 | 상태 |
|---|---|
| 필수 010-Q2 | 해결(보기 will take 삭제, "second operator is now at the controls") |
| 필수 026-Q4 | 해결(was examining, "until she has finished going through them") |
| 권장 1 had p.p. + "was still V-ing" | 해결(018·021·024 교체, 001·003·009는 still 삭제). 다만 001·003·009가 모두 "had p.p. + 과거진행 + 바로 앞 문장 과거 시점" 구조다 |
| 권장 2 halfway | 부분. 007·022는 바뀌었지만 006에 남았다. 006과 007은 보기 틀이 같다 |
| 권장 3 진행 vs 완료 이분법 | 미해결. 12/27문항으로 오히려 늘었다 |
| 권장 4 019-Q3 / 6 008-Q2 / 7 003-Q1 | 해결 |
| 권장 5 028-Q2 | 부분. 바뀐 문장 때문에 정답이 둘이 됐다(필수 2) |
| 권장 8 지시어·극단어 | 부분. 018 "this shared usage level", 032 "That difference"가 남았다. 극단어 오답은 5지문에 남았다 |
| 권장 9 029~032 tense 없음 | 미해결 |
| 참고 015 문구 삭제 | 해결. 하지만 그 결과 정답이 둘이 됐다(필수 1) |

### 필수 (모두 직접 확인)
1. **p6-1-015-Q2 | 정답이 둘로 읽힌다.**
   - 문장: "Our analyst {2} all the written comments received during the pilot. She sent me her notes this morning."
   - 오늘 아침 보낸 메모는 중간 메모일 수도 있어서 is reviewing도 자연스럽다. 해설은 is reviewing을 다루지 않는다. 12차에 고친 문제가 18차 문구 삭제로 다시 생겼다.
   - 고칠 방법: 보기 is reviewing → would review(또는 was going to review). 해설에 반영한다.
2. **p6-1-028-Q2 | 정답이 둘로 읽힌다.**
   - 문장: "Access {2} only to the people on the confirmed membership lists. Several partners have already opened their new folders."
   - is being granted("권한을 차례로 주는 중이고, 몇몇은 이미 열었다")도 자연스럽다. 해설은 is being granted를 다루지 않는다.
   - 고칠 방법: 보기 is being granted → was being granted. 해설에 A가 틀린 이유를 한 줄 넣는다.

### 권장
1. **진행 vs 완료 대비 편중:** 12/27문항(002·008·010·012·013·014·015·017·018·023·024·026)이고, 현재완료 정답이 9문항이다. 대부분 "아직 진행 중 / 이미 끝남" 문장 하나로 풀린다. → 3~4문항을 단순과거·미래 대비로 바꾼다(예: 013 has processed / processed / will process / had been processing, 025 "Last month our ticket office sold…" + sold / had sold / is selling / will sell).
2. **"will have p.p. 정답 + will (still) be V-ing 오답" | 011·022(+019).** 011은 18차 규칙에 이름이 오른 짝 그대로다(will still be applying). 011과 022는 뼈대도 같다(정한 날 검토·통화, 전날 작업 완료). → 011 A → "is going to apply", 022는 현재 결과 문항으로 바꾼다("Specialists have already assessed three offices in your area." / have assessed / were assessing / will assess / would assess).
3. **"현재형 정답 + 상시 절차 설명" | 016·025·027(18차 규칙 위반).** → 016을 다른 유형으로 바꾸고, 025는 위 1처럼 바꾼다.
4. **빈칸 문장 안의 단서:**
   - 006 "so the observer must enter quietly while instruction continues"
   - 007 "while the fitter watches"
   - 010 "; each must wait until…"
   - 018 "which you can now use"
   - → 단서를 앞뒤 문장으로 옮긴다.
5. **006·007:** 보기 틀이 같다(will be V-ing / will have finished V-ing / were V-ing / had finished V-ing). → 하나는 단순미래 대 현재진행 같은 다른 대비로 바꾼다.
6. **025-Q4:** 한 번뿐인 행사의 예정이므로 is selling도 미래 예정으로 읽힐 여지가 있다. → 위 1의 수정으로 함께 해결한다.
7. **023 지문 논리:** 1문단은 제한을 좁혀 달라고 요청하는데, 4문단은 "Your legal team approved the revised categories this morning… has forwarded the draft"라고 해서 이미 끝난 것으로 읽힌다. → 4문단을 "Once your legal team approves…"로 바꾸고, 시제 문항은 다른 대상(견본 원단 발송 등)으로 옮긴다.
8. **연결어:** 006·020·030의 보기 세트가 같다(결과 / For example / Nevertheless / Similarly). 020과 030은 정답 Therefore까지 같다. 인과 정답이 10/16이다. → 030-Q2를 Instead나 In addition 정답으로 바꾼다.

참고:
- 018-Q3 해설이 지워진 옛 보기를 설명한다. A도 "shared usage level"과 이어진다. → A "The worksheet uses each supplier's own estimate of parts usage.", 다음 문장 "the usage figures".
- 022-Q2 "For that call" → "By that call".
- 028-Q3 정답만 assigned를 반복한다.
- 017-Q4 해설 근거, 021 "her assistant", 014-Q2 ranked/scored, 014 1문단 콜론 위치.
- 017-Q3·019-Q4는 둘 다 강조 themselves가 정답이다.
- 029~032에는 tense 문항이 없다.

## 3. m-p6.json

### 18차 지적 처리
| 항목 | 상태 |
|---|---|
| 1 will have p.p. + "will still be V-ing"(1-04·4-01·5-02) | 부분. still은 빠졌지만 세 문항의 뼈대("A는 N일, B는 다음 날 → When B, A will have p.p.")와 오답 will be V-ing가 같다 |
| 2 현재형 + 상시 절차 | 부분. 설명 문장 4개는 지웠다. 현재형 정답 6/20이 남았고, 3-01 해설과 5-01 앞 문장이 같은 역할을 한다 |
| 3 2-03·3-04 단서 + "will have stopped" | **미해결** |
| 4 1-04 빈칸 안 단서 | 해결 |
| 5 2-04/5-04 같은 세트 | **미해결** |
| 6 "아직 안 함" 과거 오답 | **미해결**(1-03 was still considering은 18차 규칙에 이름이 오른 짝 그대로다) |
| 7 연결어 | **미해결** |
| 8 3-02 ↔ m-p7-5-13 | 부분(참조 번호 논점은 사라졌다) |
| 2-01-Q2 now 단서, 4-01 순서 | 미해결 |

### 필수 (직접 확인)
1. **m-p6-3-01-Q3 | 정답이 둘로 읽힌다.**
   - 문장: "An employee earns a referral bonus only if the recommended candidate joins the company and completes the probationary period. {3}, no payment is due when a candidate merely accepts an offer."
   - 뒤 문장은 앞 규칙의 구체적 사례라서 오답 For instance도 자연스럽다.
   - 고칠 방법: For instance → In contrast(또는 Similarly).

### 권장
1. **회차 간 tense 보기 구조 짝 6쌍(16차 규칙 위반):** 1-03=5-03, 2-04=5-04, 2-03=3-04, 1-04=4-01(=5-02 뼈대), 1-02=3-02(보기 세트 완전 동일), 3-03≈4-02. → 각 짝에서 한쪽의 보기 구성을 바꾼다.
2. **18차 미해결 4건:**
   - 2-03·3-04: 단서 구절("the doors will remain open until four", "continue without interruption…")을 지우고 "will have stopped" 오답을 바꾼다.
   - 5-04: has been evaluating / will have evaluated / evaluated / is evaluating으로 바꾼다.
   - 1-03·3-03·4-02·5-03: "아직 안 함" 오답 중 둘을 다른 유형으로 바꾼다.
   - 4-02-Q3: Otherwise를 다른 관계로 바꾸고, For example 오답 3~4개를 바꾼다.
3. **5-03-Q2:** 빈칸 문장 "By the time Finance settled … on February 6"만으로 had p.p.가 정해진다(18차 규칙 위반). → By the time 절을 지우고, 단서는 다음 문장에만 둔다.
4. **결과절 단서:** 3-02 "and the net payment is now in your bank account", 2-01 "so technicians can now…", 1-03 "so managers could use it…", 3-03 "so I found no discrepancy…". 단서가 빈칸 문장 안의 so/and 절에 있다. → 다음 문장으로 떼어 낸다.
5. **2-01-Q2:** 앞 문장 "scheduled to start tomorrow"와 빈칸 문장 "can now begin"이 어긋난다.
6. **5-01-Q3:** 16차 규칙에 예시로 든 세트(used to / will start / has stopped / 현재)를 그대로 쓴다. 1-01-Q2와 보기 3개가 겹친다.
7. **2-02-Q2:** 단서가 빈칸 문장 안의 "only after the provider confirms"(시제 일치)뿐이다.
8. **문항 순서:** 2-01·3-01·4-03이 voc/ten/con/sen이고, email이 1·3·4회 모두 첫 지문이다.

참고:
- 3-04 ko: had been operating과 was operating이 둘 다 "작동하고 있었다"다.
- 2-02 P2 "that list", 5-02 P3 "the plan"이 가리키는 대상이 없다.
- verify/validate/check가 5문항에 반복된다.
- tense 문항 11/20이 2번 빈칸에 있다.
- 4-01 ↔ m-p4-1-02: 직원 사진 소재가 겹친다.

## 수정 방식에 대한 제안
- 이번 회차 새 필수 4건 중 3건은 직전 수정이 만든 것이다(015 문구 삭제, 028 대체 문장, 1-14·1-12 질문 문구).
- 다음 수정 지시에 두 가지를 넣기를 권한다.
  1. 문장 하나를 바꾸거나 지울 때마다 그 지문의 **모든 보기를 다시 대입**한다.
  2. tense 단서는 **두 곳 이상**(앞 문장 + 뒤 문장)에 둔다.
- m-p6은 18차 지적 8건 중 4건을 손대지 않았다. 다음 지시에서 명시적으로 넘기기를 권한다.

## 확인하지 못한 것
- `docs/mock`은 git에 없어서 수정 전과 diff로 대조하지 못했다.
- 1~4회 m-p7m의 passagesKo는 지문 단위로만 대조했다.
- 다른 파일과의 소재 겹침은 지적된 쌍만 확인했다.
- 경계 판정은 주관이 들어가므로, 다른 검토자는 실패로 셀 수 있다.
