# 검토 10차: Part 6·7 새 문제 내용 검토

- 작성: 리뷰어 Claude, 2026-11-11. 지시서는 `docs/tasks/review-10-p67.md`다.
- 대상은 `docs/questions/p6-1.json`(32지문 128문항), `p7-1.json`(단일 30세트 87문항), `p7-2.json`(복수 15세트 75문항)이다.
- **범위:** 전수 검토다. 6개 구간으로 나눠 서브에이전트가 문항마다 보기 4개를 모두 대입하고 계산 문항을 재계산했다. 핵심 지적과 반복 통계는 내가 직접 다시 확인했다(아래 "직접 확인" 표시).
- 파일은 수정하지 않았다.

## 요약

| 파일 | 필수 | 권장 | 참고 |
|---|---|---|---|
| p6-1.json | **0** | 13 | 18 |
| p7-1.json | **0** | 11 | 16 |
| p7-2.json | **0** | 7 | 13 |
| 세 파일 공통 | 0 | 2 | 0 |

- **정답이 둘이거나, 정답이 틀렸거나, 지문과 모순되는 문항은 없다.**
  - 계산 문항(금액·날짜·시각·정원)은 모두 재계산해 맞았다.
  - 문장 위치 6문항은 네 위치에 모두 넣어 봤고, 들어갈 곳이 하나뿐이었다.
  - 의도 문항 6개는 모두 앞뒤 맥락으로 답이 정해진다.
- 바꿔 말하기도 잘 지켜졌다. Part 7 148문항(insertion·synonym 제외) 중 "정답만 지문 단어를 그대로 쓰고 오답은 안 쓰는" 문항은 기계 점검으로 1개뿐이었다(p7-1-029-Q3). 직접 확인했다.
- **가장 큰 문제는 반복되는 출제 틀이다.**
  - Part 6은 tense와 문장 고르기가 공식처럼 풀린다.
  - Part 7은 조건 매칭·날짜 계산 틀이 반복되고 Q1 오답이 약하다.
  - 그 결과 실제 토익보다 쉽고 단조롭다. 난이도 3도 체감은 2 정도다.
- **판정:** 배포를 막는 오류는 없다. 우선 권장 항목 중 반복 틀(P6 권장 1~4, P7-1 권장 10, P7-2 권장 4·7)과 crossRef 약화(P7-2 권장 1·2·5)를 고치기를 권한다.

---

## 세 파일 공통

1. **권장 | 6 | 소재가 지역사회·비영리 쪽에 치우침.**
   - 근거: 도서관·열람실, 공방·공예, 자원봉사, 지역 행사, 공유 시설 소재가 많다. 회사 업무(인사, 영업, 회계, 출장, 고객 계약, 제조) 비중이 실제 토익보다 낮다. 실제 Part 6·7은 회사 내부 메일·공지와 기업 간 거래가 중심이다.
   - 예: p6-1-001(바구니 공예), 013(공구 도서관), 027(커뮤니티 스튜디오), p7-1-002(기록관 자원봉사), 004(베틀 체험), 015(가구 수리 강좌), 018(도서관 행사), p7-2-002(자전거 공방), 006(극장 자원봉사), 012(공예 박람회).
   - 고칠 방법: 다음에 고치거나 새로 쓸 때 세트의 1/3 이상을 회사 맥락으로 옮긴다. 예: 공예 박람회 → 업계 전시회 부스 배정, 자원봉사 설명회 → 신입사원 오리엔테이션, 공구 도서관 → 사내 장비 대여 규정.

2. **권장 | 7 | 파일끼리 같은 소재가 겹침**(직접 확인).
   - 공구 대여소: p6-1-013 / p7-1-022
   - 옛 건물을 열람실로 개관: p6-1-003 / p7-2-003
   - 바구니 공예: p6-1-001 / p7-2-012
   - 자전거: p7-1-003 / p7-2-002
   - "작은 생산자들이 시설을 함께 쓴다" 기사 틀: p6-1-004(시험실), 021(가마), 029(상자), p7-1-013(냉장 보관), 022(공구), 028(수리 조합)
   - 고칠 방법: 위 짝마다 한쪽을 다른 업종으로 바꾼다. "공유 시설" 기사는 6개 중 2개만 남긴다.

---

## p6-1.json

### 권장

1. **공통 | 7 | 32지문의 뼈대가 같음**(직접 확인).
   - 근거: 32지문 모두 3문단이고, 빈칸 위치가 1·2·2·3문단인 지문이 29개다. 16지문(001~016)은 Q1 vocab이 1문단 끝, Q2 tense가 2문단 둘째 문장, Q3 connector가 2문단 끝, Q4 sentence가 3문단에 있다. 명세는 2~4문단이다.
   - 고칠 방법: 8~10지문을 2문단 또는 4문단으로 바꾼다. tense 빈칸을 1문단이나 3문단으로 옮긴다.

2. **공통 | 3·7 | tense가 공식처럼 풀림**(직접 확인).
   - 근거: tense 28문항 중 17개가 정답 will이고, 20개는 보기 중 will 형태가 하나뿐이다. 바로 앞 문장이 거의 항상 둘 중 하나다.
     - "아직 ~하지 않았다/준비 중"이면 will. 예: 002 still being tested, 005 not ready yet, 010 has not arrived, 019 No planting has taken place, 022 no regional deliveries have taken place, 023, 025, 027, 028.
     - "지난 ~에 끝났다"이면 과거. 예: 003, 004, 009, 012, 015.
   - 보기 묶음도 [과거 / 현재완료 / 과거완료 / will]로 고정돼 있다.
   - 고칠 방법:
     - 단서를 바꾼다. 날짜 머리글과 본문 날짜를 대비시키거나, 단서를 빈칸 뒤 문장이나 다른 문단에 둔다. 예: "{2} … The courier is expected on Thursday."
     - 오답에 will have p.p. / is being p.p. / would를 섞어 미래형끼리 고르게 한다.
     - 6~8문항은 현재완료나 현재진행이 정답이 되게 한다(예: 012-Q2를 "already this morning" 단서로 has transcribed가 정답이 되게).

3. **공통 | 3·6 | 문장 고르기가 지시어와 엉뚱한 오답으로 풀림**(직접 확인).
   - 근거: 32문항 중 19개는 빈칸 바로 뒤 문장이 This/These/That/Those로 시작해, 그 지시 대상을 가진 보기가 정답이다. 017~032 범위만 보면 16개 중 15개가 지시어 단서다.
   - 오답은 화제와 무관하거나 앞 문장과 정반대여서 지시어를 안 봐도 지워진다.
     - 무관: 007 "Our shop sells mirrors…", 009 "Reception is located beside the restaurant"
     - 정반대: 024 "pool will remain closed throughout next month", 031 "keep all products in shadow", 028 "published on the company website"
   - 고칠 방법:
     - 지문마다 오답 하나 이상을 "같은 소재지만 지시 대상이 틀린" 보기로 바꾼다. 예: 003 보기 → "Signs inside the arcade show the opening hours of each shop.", 031 보기 → "Bright overhead lamps illuminate the entire window evenly."(뒤의 "without lighting every corner equally"와 충돌).
     - 8~10지문은 지시어 대신 연결어(Instead, Unlike…)나 두 문장 뒤 내용으로 판별되게 한다.

4. **p6-1-018, 020, 024, 026 | 7 | 2문단 구조와 보기 세트가 같음.**
   - 근거: 네 지문 모두 "어제/지난 주말 사건 → 주어 {2} the … → before ~ → {3} → These/This/That …" 순서다. tense 보기도 will V / will be V-ing / is V-ing / V-ed로 같다. 021의 3문단도 비슷하다.
   - 고칠 방법: 020과 026의 Q2를 connector나 pos로 바꾸고, sentence 빈칸을 다른 문단으로 옮긴다.

5. **p6-1-007-Q2 | 5** | "Customers {2: will try on} repaired shoes in this space"라고 하면 광고가 지시하는 말처럼 들린다.
   - 고칠 방법: 보기를 will be able to try on / were able to try on / have been able to try on / had been able to try on으로 바꾼다. ko는 "신어 볼 수 있을 것입니다".

6. **p6-1-010-Q4 | 5** | 정답 "A nomination form is attached to the internal training announcement."는 이 메모 자체가 교육 공지라 어색하고, 뒤의 "that form … return it"과도 잘 안 이어진다.
   - 고칠 방법: "A nomination form is attached to this memo." / "이 메모에 추천 양식을 첨부했습니다."

7. **p6-1-014-Q3 | 5** | "when the deadline closes"는 비문에 가깝다.
   - 고칠 방법: "…will be available when applications close tomorrow."

8. **p6-1-006-Q4 | 3** | 정답에만 "shaded"가 있고 뒤가 "These shaded areas"라 단어 반복만으로 풀린다.
   - 고칠 방법: 정답을 "Important fields in the sample are marked in blue."로 바꾼다. 오답 하나를 "Shaded or blurred photographs will be returned to the sender."로 바꾼다.

9. **p6-1-008-Q4 | 3·6** | 정답에만 "line"이 있고 뒤가 "Please include that line"이다. 오답 둘("indefinitely", "exhibition will end")은 지문과 정면으로 모순된다. 난이도 3에 맞지 않는다.
   - 고칠 방법: 오답을 "A line of text on each panel should state the exhibition dates."와 "Each file is delivered on a portable drive by our courier."로 바꾼다.

10. **p6-1-004-Q4 | 6** | 오답 "Members no longer need any outside testing services."와 "Every local inspection automatically produces a safety certificate."는 앞 문장 "must still be sent to an accredited laboratory"와 정면으로 충돌한다. 그래서 난이도 3 표시가 과하다.
    - 고칠 방법: 난이도를 2로 내리거나, 오답 하나를 "The booking page also lists the accredited laboratories' fees."로 바꾼다.

11. **p6-1-024-Q1 | 5** | "Keep the wristband attached while swimming"은 attached 뒤에 대상이 없어 어색하다. ko "착용되어 있는"도 뜻이 다르다.
    - 고칠 방법: "Keep the wristband {1} to your wrist while swimming"(정답 attached 유지). 또는 "{1} on your wrist"로 바꾸고 보기를 secured / sealed / folded / printed로 한다.

12. **p6-1-024-Q3 | 3** | 정답 "A small deposit is required…" 바로 뒤가 "This deposit is returned…"라 단어 반복으로 풀린다. 앞 문장(자물쇠 이야기)에서 화제가 갑자기 바뀐다.
    - 고칠 방법: 정답을 "Visitors pay a small refundable amount when they collect a wristband."로 바꾸고, 그 앞에 "Wristbands are issued at the front desk."를 넣는다.

13. **p6-1-022 2문단 | 5·3** | "reservations are open, but no regional deliveries have taken place."는 시제 단서를 주려고 억지로 넣은 문장이다. 앞의 "begins next month"로 이미 미래가 정해진다.
    - 고칠 방법: "Our regional service begins next month, and reservations are now open."으로 합친다.

### 참고
- 001-Q4 | 2 | 2문단 "bring only a small bag"과 정답 "Bring a waterproof cover…"가 약간 충돌한다. → "We will provide a waterproof cover to wrap it in."
- 002-Q4 | 3 | 정답에만 label이 있다("green label" 다음에 "that label"). → 오답 하나를 "Those claims will receive new labels from the software team."으로 바꾼다.
- 011-Q4 | 5 | "are relevant"가 막연하다. → "Only delays that better crew allocation could have prevented will be counted."
- 014-Q1/Q2 | 5·2 | 두 문장 끝이 "against the published criteria"로 겹친다. 또 1문단 "received more applications"와 2문단 "has not opened any applications"가 잠깐 헷갈린다. → Q2 문장을 "Members {2} the eligible proposals and score each one."으로, 1문단을 "has already received…"로 바꾼다.
- 015-Q4 | 1 | 오답 "The full customer list contains several duplicate addresses."가 뒤의 "This check"와 억지로 이어질 여지가 있다. → "The full customer list was updated last month."
- 017-Q1 | 3 | 다음 문장에 정답 transfer가 다시 나온다. → 다음 문장의 transfer를 "upload"로 바꾼다.
- 018-Q3 | 3 | 정답 "It assumes…" 뒤가 "These assumptions"다. → "It uses identical operating hours and replacement rates for both bids."
- 019-Q2 | 5 | "Each plant will stand in a broad, deep container. Their roots…"는 단수 주어를 Their로 받는다. → "The plants will stand in broad, deep containers."
- 019-Q4 | 5 | 식물에 "will be installed"는 어색하다. → 보기를 planted 계열로 바꾼다.
- 019·025·027-Q4 | 3 | 빈칸 문장 안 단서("during the scheduled courtyard visit", "after the partner deadline", "at ten on opening day")만으로 풀리는 독립형이다. 허용 범위지만 권장 2와 함께 정리하면 좋다.
- 023 | 6 | difficulty 3인데 Q3(its/it's)와 Q4(아직 못 받음 → will)가 쉽다. → 2로 내린다.
- 023-Q4 | 2 | 수정 계약서를 누가 보내는지 흐름이 불분명하다. → "Once you send the revised draft, our representative {4} it to the retailer for signature."
- 026-Q1 | 5 | "mix … among regular stock" → "with regular stock".
- 028-Q2 | 5 | "Access {2} by our administrator to the people…"는 무겁다. → "Access {2} only to the people on the confirmed membership lists."
- pronoun 보기 세트 | 7 | their/theirs/them/themselves(017·019·021·027), its/it/itself/it's(023·025)가 반복된다. → 한두 개를 those, whose 등으로 바꾼다.
- 008 paragraphsKo | 5 | "네 주만 전시하고" → "4주 동안만 전시한 뒤".
- 013 paragraphsKo | 5 | "가능한 많은 사람이" → "가능한 한 많은 사람이".
- 025 paragraphsKo 3문단 | 5 | "마감 후에도 남은 좌석" → "협력 기관 마감 후 남은 좌석을".

---

## p7-1.json

### 권장
1. **p7-1-015-Q3 | 1·2 | 근거 문장이 두 가지로 읽힘**(직접 확인).
   - 근거: "can attend a single monthly advice session … This benefit is valid for three months"는 "3개월 동안 매달 1회(총 3회)"로도 읽힌다. 3회 보기가 없어 정답이 둘이 되지는 않지만 근거가 흔들린다.
   - 고칠 방법: "After the course, participants may attend one of our monthly advice sessions free of charge. This offer must be used within three months and must be reserved by telephone…"

2. **p7-1-001-Q2 | 6·5** | 인용문 "My hands are free now"는 글자 그대로 '도울 수 있다'는 뜻이라 문맥 없이도 풀리고, 오답 C·D는 상식으로 지워진다. 실내에 있는 Venn이 카드가 없어 현관을 못 연다는 설정도 어색하다.
   - 고칠 방법: 인용문을 "Leave it with me." 같은 표현으로 바꾼다. 9:12 줄은 "I'm at the front desk, but the front door only opens with a card, and mine is in my coat upstairs."로 바꾼다.

3. **p7-1-017-Q1 | 6** | 정답 "To allow an examination before installation"이 지문 "time to examine it before installation"을 거의 그대로 쓴다.
   - 고칠 방법: "To give a specialist time to inspect the object."

4. **p7-1-021 지문 | 5** | 인사말 "Dear Ms. Kelbin,"과 맺음말 "Sincerely, Owen Vestra"가 본문 문단 안에 붙어 있다.
   - 고칠 방법: 019처럼 인사말은 heading 끝으로, 맺음말은 따로 둔다.

5. **p7-1-023 10:09 줄 | 5** | "…leave as planned. They are gathering near the stall."의 They가 trays나 driver를 가리키는 것처럼 읽힌다.
   - 고칠 방법: "I will explain the change to the volunteers selling bread; they are gathering near the stall. The driver can unload the remaining trays now and leave as planned."

6. **p7-1-025 3:24 줄 | 5** | "…will not return our crate until next month, so we cannot borrow it for just one day."는 누가 무엇을 빌리는지 불분명하다.
   - 고칠 방법: "Once the crate leaves with the carrier, it will not come back until next month, so we cannot simply lend it out for a day."

7. **p7-1-026 2문단 | 5** | "Drivers therefore do not need to change their cleaning schedules"인데, 3문단의 세척 담당은 washing staff다.
   - 고칠 방법: "Washing staff therefore do not need to change their schedules when rainfall is low."

8. **p7-1-030 지문/Q4 | 5·2** | "This second check is necessary because one office may receive several similar packages"는 논리가 맞지 않는다. 같은 사무실 소포끼리는 이름 확인으로 구분되지 않는다.
   - 고칠 방법: "…because packages addressed to different offices often look alike."

9. **p7-1-002, 014(+001, 003, 013) | 7** | "정문 폐쇄 → 다른 입구로 안내" 같은 출입 소재가 5세트에 걸쳐 있다.
   - 고칠 방법: 014를 출입이 아닌 상황으로 바꾼다(예: 작업실 예약 방식 변경).

10. **p7-1-023, 025, 027(채팅 3세트) | 7** | 흐름이 같다. "물품 부족 → 다른 팀 물품을 빌리거나 대체 → 제3자 일정 제약 → 마지막 줄 I will …" 순서이고, 문항도 detail → intention → inference → "What will X do"로 같다.
    - 고칠 방법: 한 세트는 일정 조율 대화로 바꾸고, 마지막 문항을 speaker나 not-true로 바꾼다(예: 027-Q4 → "What is Mr. Cress's role?").

11. **p7-1-021/024, 017/025 | 7** | 옛 극장 매표소 소재(021, 024)와 전시 대여·운송 상자 소재(017, 025)가 겹친다.
    - 고칠 방법: 024를 옛 창고나 은행 건물로 바꾸거나, 025를 매장 이전 포장 상황으로 바꾼다.

### 참고
- 002/006/015, 008/012/013 | 7 | "Please bring …" 문장과 "X는 제공, Y는 각자 준비" 구조가 반복된다. → 2~3세트는 일정 변경이나 조건 비교 구조로 바꾼다.
- 018·019·020·021·025·027 | 7 | "X rather than Y", "does not guarantee / not conditional" 같은 단서 문장이 거의 모든 지문에 있다. 원예 소재도 016·019·022·029에 몰려 있다.
- 022·024·029·030 | 7 | 문장 위치 정답이 모두 다음 문장의 지시어로 풀린다. → 2개는 시간 순서나 대조 연결어로 풀리게 바꾼다.
- 012 표 | 5 | "Daily rate" 열에 보증금 $80이 들어 있다. → 열 제목을 "Rate"로 바꾸거나 표 밖 메모로 옮긴다.
- 001-Q1 explain | 2 | 출입 문제는 9:10이 아니라 9:12 메시지에 나온다. → "9시 12분에 문이 잠겨 카드가 없다는…"
- 006-Q2 ko C | 5 | "전화 결제를 마련한다" → "전화로 카드 결제를 한다".
- 007-Q2 | 6 | 정답이 "department name / SHARED"를 거의 그대로 쓴다. 난이도 1이라 허용한다.
- 013-Q2 | 6 | "monitor" → observe는 너무 쉬운 1:1 대응이다. → 여러 뜻을 가진 단어(reserve 등)로 바꾼다.
- 016-Q2 | 6 | "seed-saving"과 정답 "Seed saving."이 같다. 난이도 2라 허용한다.
- 017-Q3 | 2 | (D)의 근거가 "draft label description" 하나뿐이라 약하다. → "A description of the object."
- 018-Q2, 020-Q3 | 형식 | 지문에 그대로 나오는 내용인데 type이 inference다. → detail.
- 019-Q2 | 6 | "has other commitments"가 "already committed"를 거의 반복한다. → "The orchard's vehicle is needed elsewhere that week."
- 024 지문 | 5 | 개관 전이라 입주자가 없는데 "a change tenants requested"라고 쓴다. → "requested by prospective tenants".
- 024 passagesKo | 5 | insulation을 "방음·단열"로 옮겼다. → "단열".
- 025 3:31 줄 | 5 | "Its lid"가 무엇을 가리키는지 모호하다. → "The box's lid".
- 029-Q3 | 6 | "regardless of how many envelopes"만 보면 답이 나와 난이도 3치고 쉽다. 정답만 지문 단어를 그대로 쓰는 유일한 문항이다(기계 점검). Q4 explain의 [2] 배제 근거도 엉성하다.

---

## p7-2.json

### 권장
1. **p7-2-004-Q4 | 4·6 | crossRef인데 견적서와 상식만으로 풀림**(직접 확인).
   - 근거: "Water-resistant finish $60"만 보고 야외용이라고 고를 수 있어 이메일이 필요 없다.
   - 고칠 방법: q "How much more does the format required by Ms. Quill cost than the alternative?", choices ["$30","$60","$85","$15"], answer 0. explain은 "이메일은 거치대 때문에 소형만 쓴다고 하고, 견적서에서 소형 240달러·표준형 210달러이므로 차이는 30달러다."

2. **p7-2-006-Q4 | 4·1 | crossRef인데 공지만으로 풀림**(직접 확인).
   - 근거: 설명회 두 회차(7/2, 7/6)가 모두 "first week of July" 폐쇄 기간 안이라 어느 회차든 답이 같다. 이메일도 "I should follow the temporary access instructions"라며 답을 미리 말한다.
   - 고칠 방법:
     - 공지를 "The entrance on Canal Lane will be closed for repairs from July 5 to July 9; during that period, attendees must use the courtyard gate."로 바꾼다.
     - 이메일의 해당 문장은 "Could you confirm whether that entrance will be open on the day of my session?"으로 바꾼다.
     - explain은 "7월 6일 오전 회차가 폐쇄 기간(7/5~9)에 들어가므로 안뜰 문"으로 고친다.

3. **p7-2-007-Q1 | 6** | 오답 "A taxi business", "A restaurant career"가 터무니없어 상식만으로 풀린다.
   - 고칠 방법: type을 detail로 바꾼다. q "What is indicated about Wrenmere Lodge?", choices ["It serves dinner on the premises","Its shuttle operates every day","Guests may store luggage before check-in","Lake rooms cost more than garden rooms"], answer 2. 근거는 "Bags may be left at reception from eight in the morning."

4. **p7-2-001~008 | 7 | 세 가지 틀이 반복됨.**
   - 인원·준비물로 방이나 세션 고르기: 001-Q3, 008-Q3
   - 날짜 차이로 혜택·기한 충족 확인: 001-Q4, 004-Q3, 005-Q4, 007-Q3
   - 이메일로 회차를 정한 뒤 시각 계산: 002-Q3, 006-Q3, 008-Q4
   - 고칠 방법:
     - 007-Q3 → "Why will Mr. Drew be able to use the shuttle unlike some guests?"(정답 "He is arriving on the scheduled Friday bus")
     - 008-Q4 → Studio 4가 2층이라는 점과 이메일의 무릎 부상을 잇는 문항("What will Ms. Sorn most likely need to use?" / "The elevator beyond the main lobby")

5. **p7-2-011-Q4 | 1·4** | 공지에 "rescheduled outside the temporary period"도 제한을 피하는 방법으로 나와 있어서, 오답 A("Moving the arrival to February 15")를 "make the vehicle compatible"이라는 표현만으로 확실히 배제하기 어렵다. 차량 변경은 이메일 하나만 읽어도 고를 수 있다.
   - 고칠 방법: q를 "What change did Lydan Supplies make so that its shipment could be received at the annex on February 13?"로 바꾸고, A를 "Booking a refrigerated vehicle"로 교체한다.

6. **p7-2-009-Q1 | 6** | 오답 "Advertising procedures", "Packing course registration", "Equipment rental terms"가 송장과 무관하다.
   - 고칠 방법: 오답을 "Steps for returning an entire order for a refund", "Rules for changing a delivery address", "Conditions for paying invoices early"로 바꾼다.

7. **p7-2-009~015 | 7 | "요청 이메일 + 조건표에서 맞는 항목 고르기 + 탈락 이유 묻기" 틀이 반복됨.**
   - 해당 세트: 010(멘토), 012(테이블), 014(회차), 015(방).
   - 15세트 모두 Q1은 purpose이고, Q5는 마지막 이메일 끝 문단의 detail이다. 마지막 이메일이 답 없는 질문으로 끝나는 패턴도 4세트에 있다.
   - 고칠 방법: 014나 015를 기사·후기 기반 세트로 바꾼다. 2~3세트는 Q5를 앞 지문에서 묻는다.

### 참고
- 001-Q4 | 6 | 이메일이 "our booking date qualifies us…"라고 답을 미리 말한다. → "Could you tell me whether any refreshments are included?"로 바꿔 날짜 계산이 필요하게 한다.
- 002-Q2 | 6 | 동의어 정답 "set aside"가 이메일에 그대로 나온다. → 이메일을 "keep a compatible inner tube for me"로 바꾼다.
- 002-Q4 | 4 | crossRef 연결이 약하다. → 이메일에서 E42를 "reference number"로 부르고 공지의 booking number 규칙과 이어야 판단되게 한다.
- 003-Q3 | 6 | 편지 "my name would not appear on an invoice"와 기사 "may not appear in the financial records"가 거의 같다. → "I was not paid for the work, so you may have no record of it".
- 002·005·006-Q1, 012·014-Q1 | 6 | 목적 문항 오답이 지문과 동떨어져 있다. → 지문 소재를 쓴 오답으로 바꾼다(예: 006 "To recruit theater lighting staff", 005 "To announce the results of a review round").
- 007·008(삼중) | 6 | 3지문을 모두 엮는 문항이 007-Q4 하나뿐이고, 둘 다 difficulty 2다. → 007이나 008에 3지문 연계 문항을 하나 더 넣는다.
- 009-Q4 | 6 | Q3 explain이 Q4의 답을 그대로 말한다(같은 근거를 두 번 묻는다). → "Why was Mr. Tarl asked to keep the packaging until November 5?" 같은 다른 연계 문항으로 바꾼다.
- 010-Q4 | 6 | Q3 explain과 근거가 겹친다. → "What does Ms. Toven offer to do before the holiday break?" 같은 문항으로 바꾼다.
- 014-Q4 | 5 | "When should the school bus return?"은 어디로 돌아오는지 모호하다. → "At what time should the bus pick up the students at the center?"
- 015-Q1 | 형식 | type이 purpose인데 실제로는 이유를 묻는다. → detail.
- 006-Q5 ko | 5 | brother를 "동생"으로 단정했다. → "남자 형제".
- 008-Q4 ko | 5 | "출발하려는" → "떠나려는".
- 009·013·014·015 ko·explain | 5 | 숫자 앞 띄어쓰기가 빠졌다("원래의10달러", "오전10시30분"). → "원래의 10달러", "오전 10시 30분"으로 일괄 수정.

---

## 확인하지 못한 것
- passagesKo는 p7-2-012~015에서 문항 ko와 숫자만 확인했다. 그 외 구간은 뜻을 바꾸는 오류만 훑었고, 문체 전반은 보지 않았다.
- 영어 자연스러움은 원어민 감각이 아닌 텍스트 판단이다.
- 난이도 판단은 체감 기준이다. 실제 시험 정답률 자료와 대조할 수는 없다.
- Part 1(p1-1)은 이번 범위가 아니다.
