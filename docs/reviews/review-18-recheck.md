# 검토 18차: m-p7m crossRef 재작성 + Part 6(연습·모의) 16차 수정 재검토

- 작성: 리뷰어 Claude, 2026-11-12. 지시서는 `docs/tasks/review-18-recheck.md`, 기준은 `docs/reviews/review-16-recheck.md`다.
- **대상:**
  - `docs/mock/m-p7m.json`: crossRef 49문항 전부를 다시 검증했다.
  - `docs/questions/p6-1.json`, `docs/mock/m-p6.json`
- **방법:**
  - 서브에이전트 6개가 나눠 맡았다(m-p7m 1·2회 / 3·4회 / 5회, 연습 p6 001~016 / 017~032, 모의 m-p6).
  - crossRef는 문항마다 **① 지문 A만 ② 지문 B만 ③ 지문 C만 ④ 질문 + 보기만**으로 풀어 봤다. 넷 중 어느 것으로도 정답이 하나로 정해지지 않을 때만 통과로 쳤다. 나머지 문항도 보기 4개를 모두 넣어 다시 풀었고, 해설은 현재 지문과 하나씩 대조했다.
  - **필수 5건은 모두 내가 직접 다시 확인했다.** tense 보기 세트 통계도 직접 뽑았다.
- **심각도 기준(10~17차와 같음):** 필수는 정답이 둘이거나 틀렸거나, 해설·지문이 모순되는 경우다. crossRef가 한 지문으로 풀리는 것은 권장이다.
- 파일은 수정하지 않았다.

## 요약

| 파일 | 필수 | 권장 | crossRef 통과 | 16차 지적 해결 | **배포** |
|---|---|---|---|---|---|
| m-p7m.json | **3** | 14 | **37/49** (16차 20/49) | 대부분 해결. 일부는 새 경로로 다시 풀림 | **필수 3건을 고친 뒤 배포 가능** (실패 10·경계 2는 권장) |
| p6-1.json | **2** | 9 | – | 필수 3 중 해결 2, 부분 1 / 권장 대부분 해결 | **필수 2건(각 보기 하나)을 고친 뒤 배포 가능** |
| m-p6.json | 0 | 8 | – | 필수 1 해결 / 권장 8 중 해결 5, 부분 3 | **배포 가능** |

**crossRef 회차별 통과 수:**
- 1회 7/10
- 2회 4/9
- 3회 8/10
- 4회 9/10
- 5회 9/10

3·4회에는 경계 2문항(3-11-Q1, 4-14-Q3)이 있는데 통과로 셌다.

**결론:**
- **정답 키가 틀린 문항은 없다.** 필수 5건은 모두 "정답이 둘로 읽힘"이나 "해설·지문 결함"이고, 각각 한두 줄 수정이면 된다.
- **m-p7m crossRef가 크게 나아졌다(20 → 37/49).**
  - "X is the only item still missing"처럼 답을 그대로 말하는 문장은 없어졌다.
  - 남은 실패의 원인은 두 가지다.
    - **16차 수정안을 그대로 넣었더니 오답 셋이 규정 지문만으로 지워지는 경우:** 1-12-Q3, 1-15-Q4, 2-15-Q3. 오답이 "규정이 직접 금지한 행동"이나 "다른 판의 특징"이면 한 지문으로 지워진다.
    - **질문·제목이 답을 가리키는 경우:** 1-11 메일 제목 "P64", 2-14-Q4 "two disputed entries", 5-14-Q4 "require a linking reference".
- **Part 6 tense:** 16차 공식은 모두 없어졌다(태로 지워지는 둘째 미래형, 정답만 과거형인 거울형, 미래형 하나). 대신 새 공식이 생겼다(직접 확인).
  - 연습: **정답 had p.p. + 오답 "was/were still V-ing"**이 6문항이다(001·003·009·018·021·024). 018과 024는 보기 틀이 글자 하나까지 같다. "still" 오답은 8개다.
  - 연습: **"halfway through 합류" + 정답 미래진행 / 오답 "will have finished V-ing"**이 3문항이다(006·007·022).
  - 모의: **정답 will have p.p. + 오답 "will still be V-ing"**이 3문항이다(1-04·4-01·5-02). **현재형 정답 + "이것은 상시 절차다" 설명 문장**이 6문항이다.
  - 완료형 정답은 모두 기준 시점이 있어 문법상으로는 맞다. 다만 단서가 빈칸 문장 안의 When/By the time 절로 몰려 있다.

---

## 1. m-p7m.json

### 필수 (모두 직접 확인)
1. **m-p7-2-12 공지 | 문단이 중복되고, 해설이 근거로 드는 규정이 지문에 없다.**
   - 3문단이 2문단의 앞 네 문장을 그대로 반복한다("Contractors should keep a copy… provided they do not interfere with the broadcast."). passagesKo도 마찬가지다.
   - 그래서 Q1 해설("공지 두 번째 문단은 작업 중 연락 가능한 담당자를 요구한다")과 Q3 해설("기간 밖 날짜로 옮기면 새 통지가 필요하다")에 맞는 문장이 공지에 없다. Q3은 결국 상식으로만 풀린다.
   - 고칠 방법: 3문단을 "Each notice must name a contact person who can be reached while the work is under way. An acknowledgment covers only the dates listed; noisy work moved to any other date requires a new notice."로 바꾸고, ko도 같이 바꾼다. Q3 오답 B·D는 "Tell Unit 16 about the new date", "Drill on July 14 within the hours in the letter"로 바꾼다.
2. **m-p7-5-11-Q2 | 해설의 정답 기호가 틀렸다.**
   - 키는 B("Two lines, one for Lydora and one for Senwick")인데, 해설은 "…요구하므로 D다"라고 한다.
   - 고칠 방법: "D다" → "B다".
3. **m-p7-5-15-Q4 | 정답이 둘로 읽힌다.**
   - 이메일은 "We then sent a third version."이라고만 해서 3판(16:12, 마감 후)의 가격을 밝히지 않는다. 3판에도 인하 가격이 들어 있었다면 오답 A "It was submitted after 16:00"도 이유가 된다.
   - 고칠 방법: A를 "It was sent under a different bidder code"로 바꾼다(명부와 공지로 반박된다). 또는 이메일에 "The third version repeated the original price because the staffing plan was still under review."를 넣는다.

### crossRef 3단계 판정 (49문항)
| 회차 | 통과 | 실패(권장) | 주된 경로 |
|---|---|---|---|
| 1 | 7 | 1-11-Q2, 1-12-Q3, 1-15-Q4 | 1-11: 메일 제목·지문 제목 "P64", 본문 "preparing the P64 folder index"가 답을 가리킨다. 1-12·1-15: 오답 셋이 공지·웹페이지만으로 지워진다 |
| 2 | 4 | 2-12-Q3, 2-14-Q4, 2-15-Q3, 2-15-Q4 (+필수 2-12) | 2-12: 날짜 + 상식, 보기 셋이 "current notice"로 시작해 A만 튄다. 2-14-Q4: 질문 문구가 답을 흘린다. 2-15: 오답이 메모의 v3 특징이거나, 메모의 정황 문장으로 풀린다 |
| 3 | 8 (+경계 3-11-Q1) | 3-13-Q4 | 2×2 보기 중 두 항목을 모두 바꾸는 것이 하나뿐이고, 이메일 "did not use the status column"이 오류를 진단해 준다. Q3(1,520)을 풀면 Q4 답이 나온다 |
| 4 | 9 (+경계 4-14-Q3) | – | 4-14-Q3: "I will finish at my planned time today"와 상식 오답 |
| 5 | 9 | 5-14-Q4 | 검토서만으로 번호가 어긋난 쌍(K20)이 보이고, 질문 "require a linking reference"에 규정 조건이 들어 있다 |

### 권장: crossRef 고칠 방법
- **1-11-Q2:** 제목을 "Archive preparation: four folders", "Status of four project folders"로 바꾼다. 2문단은 "I am preparing indexes for the folders. The P64 index includes…"로 바꾼다.
- **1-12-Q3:** 오답 → "Ask Mr. Sol to activate the details himself" / "Ask Brevin to confirm the change from its usual email address" / "Release today's Brevin transfer to the old account".
- **1-15-Q4:** 오답 → "No credit, because qualifying interruptions total 70 minutes" / "No credit, because the request arrives too late" / "A credit equal to ten percent of the call charges".
- **2-12-Q3:** 필수 1과 함께 고친다.
- **2-14-Q4:** q → "What service charge will Pemra owe for B406 and B412 for June?"
- **2-14 광고:** 마감 시점이 정의되지 않았다. → "The cutoff is midnight on the last day of each month."
- **2-15-Q3:** 오답을 이메일로만 반박되게 바꾼다 → "Its chart no longer shows the monthly pattern" / "It has no review record" / "Its visible fields still show customer names".
- **2-15-Q4:** 메모 → "adding a Halvern service note to v2"로 바꾸고 정황 문장을 지운다. 오답 B → "Its added note may be shown once Halvern's name is removed".
- **3-13-Q4:** 이메일의 "and did not use the status column"을 지운다. q → "By how much does the corrected total differ from the draft total?" / "100 km higher"* / "800 km lower" / "900 km higher" / "100 km lower".
- **3-11-Q1(경계):** 메모에 기준을 넣는다("Display preferences a user can change personally are set in the Preferences menu; changes for all users go to the improvement queue."). 오답은 실제 경로로 바꾼다.
- **4-14-Q3(경계):** "I will finish at my planned time today"를 지운다. 양식에 실명(Morning backup: Ilsa Danor 등)을 넣고 그것을 오답으로 쓴다.
- **5-14-Q4:** q → "Which other batch in the submission could not be followed in the way the letter describes?" 연결 번호 조건은 편지에만 남긴다.

### 권장: 그 밖
1. **같은 세트 안에서 Q4가 Q3의 여집합이거나 Q3 답을 드러낸다:** 1-14(Q3 C22 → Q4 P17·C24), 3-14(Q4 질문의 "seat D12"가 Q3 답), 4-11(Q5가 Q4 결론을 다시 묻는다). → 1-14-Q4 "Which product should be used when C22 is refilled after draining?", 3-14-Q4 "How should seat D13 be handled now?"로 바꾼다. 4-11-Q5는 다른 연계로 바꾼다.
2. **"초안·첫 집계 → 확정 기록 대조" 틀이 3-13·4-13·4-14·4-15에 반복된다.** 4회에서만 3세트라 규칙 위반이다. "코드 정의 + 코드 사례"도 3-11·4-13·4-14로 세 번이다. → 4-14 이메일의 초안 비교를 지운다. 4회 삼중 세트 하나는 표 없이 기사·편지·일정으로 바꾼다.
3. **구조:**
   - 25세트 중 24세트가 "규정·조건 문서 + (양식) + 적용 이메일" 흐름이다.
   - 삼중 세트 15개는 다섯 회차 모두 Q3·Q4 crossRef + Q5 detail이다. 각 회차 첫 세트 유형과 이중 세트의 crossRef 위치는 풀렸다.
   - 고칠 방법: 회차마다 삼중 세트 하나는 crossRef를 Q2나 Q5에 두고, 흐름 하나는 "광고 + 후기 비교" 등으로 바꾼다.
4. **3-13 날짜 모순:** 1분기가 2~4월인데 이메일 날짜가 April 7이다. → May 7.
5. **4-11 지문 종류:** review인데 내용은 업체에 보내는 편지다. → email/letter로 바꾼다.
6. **3회 IT 소재**(3-11 예약 앱 장애, 3-14 설계 SW)가 그대로다. 4회에는 not-true 세트가 없다.
7. **m-p7s-5-09와의 겹침이 남았다:** 5-11 이메일 "Harven Retail is a separate business"와 Q5. → 그 문장과 Q5를 바꾼다.
8. **한국어:**
   - 2-14 "이전 코드" → "인계된 코드".
   - 표기 혼용: 1-14 shift supervisor "교대 책임자/교대 관리자", 3-14 "캘런/칼렌".
   - 4-12 "프로젝트과", 4-11-Q4 해설 "후기은", 5-12 해설 "후기은".

참고:
- 4-13-Q4와 4-15-Q3은 질문 + 보기만으로 찍힐 여지가 있다(약함).
- 5-11-Q2는 공지 + 보기만으로 B·D까지 좁혀진다.
- 5-12 광고 나열이 비문이다.
- 회사명 Neris가 1-15·5-14와 다른 파일에서 재사용된다.

## 2. p6-1.json

### 16차 지적 처리
| 항목 | 상태 | 근거 |
|---|---|---|
| 필수 017-Q1 | 해결 | 빈칸이 Q4로 옮겨졌고 "The link… will stay in place until the project ends."가 들어갔다 |
| 필수 026-Q4 | **부분** | has examined는 약해졌지만 will examine이 정답 후보가 됐다(아래 필수 2) |
| 필수 029-Q1 | 해결 | 해설이 현재 보기를 설명한다 |
| 권장 1 태로 지워지는 둘째 미래형 | 해결 | 007·011·013·019·022·023·027 모두 태가 맞춰졌다 |
| 권장 2 정답만 과거형 | 형식상 해결 | 과거 시점대 보기가 2개가 됐지만, "was still V-ing"로 채워 새 공식이 생겼다 |
| 권장 3 지시어 단서 | 대부분 해결 | 018 "this shared usage level", 032 "That difference in recruitment" 둘만 남았다 |
| 권장 4~10·15~17 | 해결 | 010-Q4, 014, 008, 009 ko, 004/010, 016-Q2, 021-D, 025, 030, 017 소개, 018, 021 검증자, 022-C, 026 relabel |
| 권장 12 문장 고르기 위치 | 해결 | 017~032의 {4}가 0 → 5 |
| 권장 13 029~032 tense 없음 | 부분 | vocab 쏠림은 줄었지만 tense는 아직 0개다 |
| 권장 14 극단어 오답 | 미해결 | 9지문에 남아 있다 |

### 필수 (모두 직접 확인)
1. **p6-1-010-Q2 | 정답이 둘로 읽힌다.**
   - 문장: "The first lesson is under way, and the instructor is explaining the controls. Operators {2} turns at the training unit…"
   - 강사가 아직 조작부를 설명하는 중이므로 실습은 그 뒤다. 그래서 will take도 are taking만큼 자연스럽다. 해설은 will take를 다루지 않는다.
   - 고칠 방법: 보기 will take → were taking. 앞 문장 끝을 "…, and the second operator is now at the controls."로 바꾼다.
2. **p6-1-026-Q4 | 정답이 둘로 읽힌다(16차부터 계속).**
   - 문장: "She {4} the shelf maps at the audit desk; they must stay there until she finishes."
   - will examine도 "앞으로 볼 테니 끝날 때까지 그대로 두라"로 자연스럽다. 다음 문장 "She is also asking…"의 also가 현재진행 쪽으로 기울게 하지만 결정적이지는 않다.
   - 고칠 방법: 보기 will examine → was examining. 뒤 절은 "…until she has finished going through them"으로 바꾼다.

### 권장
1. **tense 공식 ①: had p.p. 정답 + "was/were still V-ing" 오답 | 001·003·009·018·021·024.**
   - 018과 024는 보기 틀이 같다(will V / was still V-ing / is V-ing / had V-ed). 기준 시점도 빈칸 문장 안의 When/By the time 절이다. 21번은 같은 틀의 수동태다.
   - 고칠 방법:
     - 003: had registered / were registering / have registered / will have registered
     - 009: had brought / was bringing / has brought / would bring
     - 024: "A maintenance team {2} each lock; doors marked with red tape have not yet been checked." + is testing / has tested / will test / tested
     - 018: 회의를 오늘 오후(미래)로 옮기고 has entered / had entered / was entering / will be entering
2. **tense 공식 ②: "halfway through 합류" + 미래진행 정답 / "will have finished V-ing" 오답 | 006·007·022.** 007은 trying on을 "갈아입기"로 읽으면 will have finished trying on도 참이 될 여지가 있다. → 007 동사를 testing으로 바꾸고, 022는 다른 단서(후속 통화 일정)로 바꾼다.
3. **tense 공식 ③: "아직 남음 / 이미 끝남" 진술 하나로 풀리는 진행 vs 완료 이분법 | 002·008·012·013·014·015.** → 2~3문항을 단순과거 대 진행 같은 다른 대비로 바꾼다(예: 008 passed / are passing / will pass / had been passing).
4. **019-Q3:** 보기 "will still be being installed"는 거의 쓰지 않는 형태이고 still이 답을 흘린다. → "is going to be installed".
5. **028-Q2:** 보기 used to be granted / will be granted / has been granted / is being granted는 16차가 금지한 세트 꼴이다. 다음 문장 "everyone on the lists can now use them"이 답을 말한다. → D를 had been granted로 바꾸고 그 문장을 지운다.
6. **008-Q2:** 정답만 동사가 다르다(have passed vs undergo). → 동사를 통일한다(have completed / are completing / will complete / were completing).
7. **003-Q1:** 빈칸 문장이 앞 문장을 되풀이하고 "sign-in was complete"가 두 번 나온다. → 첫 문장을 지운다.
8. **지시어 단서 잔여(018-Q3·032-Q1)와 극단어 오답 9지문.** → 018-A "…taken from the higher of the two bids.", 032-B "Last year's invitations went to all customers, while this year's went out a week later." 극단어 오답은 3~4개를 바꾼다.
9. **029~032:** tense 문항이 없다. → 하나를 진행형이나 단순형 시제 문항으로 바꾼다.

참고:
- 015 "and has turned to a different project"가 완료를 다시 말해 준다(지운다).
- 004-Q4: certification을 쓴 보기가 정답뿐이다.
- 021: quality manager가 두 사람을 가리킨다(→ the line supervisor).
- 022-Q3 해설 "여분 어댑터 시험"은 지문에 없다(→ "제공").
- 014·013 표현, 017-Q3·019-Q4 강조 themselves 중복, 023 한 문장 문단.

## 3. m-p6.json — 배포 가능

### 16차 지적 처리
- **해결:** 필수 4-04-Q3(보기 will specify로 교체), 미래형 하나 6문항, used to 세트의 회차 반복, 3-03-Q2 태, 거울형, 4-01 여가 소재.
- **부분:**
  - 2-01-Q2: 빈칸 문장 안의 now가 단서다. 앞 문장 "scheduled to start tomorrow"와도 어긋난다.
  - 회차 간 소재: 3-02 ↔ m-p7-5-13 "참조 번호로 대조"가 남았다.
  - 4-01 순서: 2-01과 3-01이 둘 다 voc/ten/con/sen이고, email이 1·3·4회 모두 첫 지문이다.

### 권장
1. **will have p.p. 정답 + "will still be V-ing" 오답 | 1-04·4-01·5-02.** 해설 문구까지 같다. → 둘째 미래형을 will be V-ing나 is going to V로 바꾼다(예: 5-02 will have sent / will be sending / has sent / sent).
2. **현재형 정답 + 상시 절차 설명 문장 | 2-02·3-01·4-03·5-01(+1-01·3-02).**
   - 설명 문장 예: "This review is part of the regular procedure", "This is our standing practice", "That is the current coverage", "This is the active setting".
   - 2-02와 3-02는 보기 세트가 완전히 같다(16차 규칙 위반).
   - 고칠 방법: 설명 문장 둘 이상을 지운다. 3-02 보기를 has processed / is processing 계열로 바꾼다.
3. **2-03-Q4·3-04-Q4:** 빈칸 문장이나 다음 문장이 답을 말한다("the doors will remain open until four", "continue without interruption…"). 오답도 둘 다 "will have stopped V-ing"다. → 그 구절을 지운다.
4. **1-04-Q4:** 빈칸 문장 안의 "by the time those calls start, so…"만으로 풀린다. → so절을 다음 문장으로 떼고, "When those calls start"로 바꾼다.
5. **2-04-Q2 ↔ 5-04-Q2:** 같은 보기 세트가 회차 간 반복된다(has finished / will / had finished / is V-ing). → 5-04를 has been evaluating / will have evaluated / evaluated / is evaluating으로 바꾼다.
6. **과거 "아직 안 함" 오답 4문항:** 1-03·3-03·4-02·5-03(was still considering, had yet to report…). → 하나둘은 다른 오답 유형으로 바꾼다.
7. **연결어:** 2-01-Q3과 4-02-Q3이 둘 다 Otherwise에 보기도 거의 같다. 인과 연결어 정답이 5/10, For example 오답이 9/10이다. → 4-02를 다른 관계로 바꾸고, For example 오답 3~4개를 바꾼다.
8. **3-02 ↔ m-p7-5-13:** "참조 번호로 대조" 논점이 같다. → 3-02 Q4와 마지막 문장을 환불 차감 내역 확인 같은 다른 기능으로 바꾼다.

참고:
- 3-04-Q4 ko: had been operating과 was operating이 둘 다 "작동하고 있었다"다.
- 5-02 3문단: 약속한 사람과 보내는 사람이 다르다.
- 3-02 1·2문단 중복.
- 4-01 ↔ m-p4-1-02: 직원 사진 소재가 겹친다.
- verify/validate가 1-02·1-04·5-03에 반복된다.
- tense 문항 11/20이 2번 빈칸에 있다.

## 확인하지 못한 것
- `docs/mock`은 git에 없어서 수정 전 텍스트와 diff로 대조하지 못했다. 16차 지적은 인용 문장으로 찾았다.
- m-p7m의 passagesKo는 뜻이 바뀌는 오류만 봤다.
- 회차 간·파일 간 소재 겹침은 지적된 쌍과 핵심어 검색 위주로 확인했다.
- 위 수정안, 특히 crossRef 오답 교체는 반영한 뒤 지문을 하나씩 가리고 다시 풀어 봐야 한다.
