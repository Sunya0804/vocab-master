# 검토 31차: 연습 문제 3차 추가분 (리뷰어)

지시 `docs/tasks/review-31-expand3.md`. 이번 대상은 `docs/questions/p5-5.json`(72문항)뿐이다. 나머지 파일(p1-3, p3-4, p4-4, p6-3, p2-4, p7-5)은 총괄이 알려 주면 이어서 본다.

## 요약

| 파일 | 필수 | 권장 | 고친 id | 배포 가능 |
|---|---|---|---|---|
| p5-5.json | 1 (직접 수정함) | 10 | p5-5-005(문장·번역·해설), p5-5-026(번역) | **가능** |

- 72문항 모두 보기 4개를 하나씩 넣어 다시 풀었다(서브에이전트 2개가 나눠 풀고, 리뷰어가 전 문항을 한 번 더 봄).
  - 정답 키 오류, 해설이 정답과 어긋나는 문항, 없는 보기를 말하는 해설은 없다.
- 정답이 둘인 문항은 005 하나였고 직접 고쳤다. 정답 위치(answer)는 바꾸지 않았다. JSON 파싱과 72문항을 확인했다.
- 분포는 명세와 맞다.
  - 유형 수가 명세대로다. 다만 071은 라벨이 틀렸다(R2).
  - 난이도 1/2/3 = 18/32/22.
  - 정답 위치 A/B/C/D = 18씩. 같은 기호 3연속은 040~042 한 번뿐이다.
- 기존 연습·모의 517문항(문장 기준 중복 제외)과 비교했다.
  - 문장을 통째로 베낀 문항은 없다(difflib 최고 0.56, 4단어 n-gram 공유 사실상 0).
  - 같은 틀이나 같은 포인트가 반복되는 문항이 있다(R3).
- 커밋하지 않았다. p5-5.json은 git에서 아직 추적하지 않는 파일이다.

## 필수 (직접 고침)

### F1. p5-5-005: 정답이 둘

- **수정 전:** "Although it has neither received nor sent funds for five years, the company's ------- bank account remains open." (overdrawn / joint / secured / *dormant)
- **문제:** 이 Although절은 "거래가 없는데도 계좌가 열려 있다"는 대조만 만든다. 빈칸에 들어갈 형용사를 dormant로 좁혀 주지 않는다.
  - "the company's joint bank account remains open"도 자연스럽게 성립한다.
  - overdrawn과 secured도 문맥에서 배제되지 않는다.
- **수정 후:** "Because it has neither received nor sent funds for five years, the company's bank account has been classified as -------."
  - 보기와 정답(D dormant)은 그대로 두었다.
  - 이제 빈칸은 "거래가 없어서 분류되는 상태"여야 한다. 그래서 overdrawn(초과 인출), joint(공동 명의), secured(담보)가 모두 빠진다.
- **ko:** "5년 동안 입출금이 전혀 없었기 때문에 회사의 은행 계좌는 휴면 계좌로 분류되었다."
- **explain:** "오랫동안 거래가 없어서 분류되는 계좌 상태는 dormant(휴면)다. overdrawn은 잔액보다 더 많이 인출한 상태, joint는 여러 명의 공동 명의, secured는 담보가 있는 상태로, 모두 거래가 없다는 이유로 정해지지 않는다."

### (번역 수정) p5-5-026

- 필수는 아니지만 고치기 쉬워서 고쳤다.
- **수정 전 ko:** "…야간조 직원들이 실망스럽게도 마감 직전에 두 번째 트럭이 도착했다." 주어 "직원들이"와 서술어 "도착했다"가 맞지 않는다.
- **수정 후 ko:** "…야간조 직원들에게는 실망스럽게도 마감 직전에 두 번째 트럭이 도착했다."

## 권장 (기록만)

### R1. 문장·보기

| id | 문제 | 제안 |
|---|---|---|
| 060 | "only several have arrived"는 문법은 맞다. 다만 several은 "꽤 여러 개"라는 느낌이라 "기대보다 적다"는 only와 잘 어울리지 않는다. 원어민은 보통 only a few라고 쓴다. | 보기 A를 `a few`로 바꾸고, 해설의 several도 a few로 바꾼다. 정답 위치는 그대로 둔다. |
| 001 | 오답 stir, weave, drain이 접착지와 관련이 없어 문맥을 읽기 전에 빠진다(27차 R3과 같은 유형). | 포장·부착 맥락의 동사로 바꾼다. 예: fold, seal. remove처럼 정답이 둘이 되는 동사는 피한다. |
| 064 | 해설이 as by와 as in만 다루고 as for는 다루지 않는다. 정답에는 영향이 없다. | 해설에 "as for는 '~에 관해서는'이라는 화제 표현"을 덧붙인다. |

### R2. 유형 라벨: 071

- "------- the independent distributor to close…, our company would…"(정답 Were)는 if를 생략한 도치 가정법이다. 비교 구문이 아닌데 comparison으로 붙어 있다.
- 그래서 실제 비교 문항은 066 하나뿐이다. 명세의 comparison 2문항을 채우지 못한다.
- **제안:**
  - 071의 type을 verb로 바꾼다.
  - 비교 문항을 하나 새로 쓴다. 예: 비교급 강조 even/much, the + 비교급 the + 비교급, 최상급 of all 등. 새 문항은 verb 한 문항과 바꿔서 수량을 맞춘다.
- 라벨을 바꾸면 유형 수가 명세와 어긋나기 때문에 작성자가 결정하도록 남겨 두었다.

### R3. 기존 문항과 틀·포인트 겹침

문장을 베낀 것은 아니고, 문장 틀과 묻는 포인트가 같다.

| p5-5 | 기존 | 겹침 |
|---|---|---|
| 027 insofar as | p5-2-076, p5-4-038 | "only ------- + 절" 조건 틀이 세 번째 나온다. |
| 037 whichever | p5-2-100 | "------- of the three … best …" 틀이 거의 같다. |
| 040 by | p5-2-059 | "must reach + 대상 + ------- + 마감" 틀이 같다. |
| 057 attendance | p5-3-055 | 같은 연어 record attendance다. |
| 003 is | p5-2-007, m-p5-3-05 | "단수 집합명사 + of + 복수명사" 수 일치가 세 번째다. |
| 016 during | p5-2-053 | "will remain + 상태 + ------- + 기간" 틀이 같다. |
| 042 legible | m-p5-2-13 | remain 뒤 legible이 다시 나온다. |
| 054 impartiality | m-p5-1-06 | 같은 정답어를 같은 pos 유형으로 냈다. |
| 018 remain | 기존 4문항 | 요구·제안 동사 + that + 동사원형 포인트다. |
| 022 irrespective of, 033 with regard to, 064 as of | p5-2-080 외 7문항 이상 | "복합 전치사의 빠진 한 단어" 포인트가 많이 쌓였다. |

- 027, 037, 040, 057은 다음 작성 때 틀을 바꾸기를 권한다.
- 나머지는 흔한 포인트라 참고만 한다.

### R4. 파일 안 반복과 치우침

- **문두:** "The"로 시작하는 문장이 38/72다.
- **기기 조작 명령문:** 001 peel, 025 Tie, 041 inflate 세 문항이다.
- **"the ------- of" pos 틀:** 002, 026, 054 세 문항이다.
- **유형별 정답 위치:**
  - pos 정답 C가 8/17이다.
  - vocab 정답 A가 9/22다.
  - prep-conj 정답 C는 1/12뿐이다.
- **유형별 난이도:** pos 17개 중 8개가 난이도 1, vocab 22개 중 11개가 난이도 3이다.
- **소재:** 공예와 사물 어휘가 많다(tailor, silversmith, loom, knot, hinge, stapler, pretzel, lacquer flute). 명세의 회사 맥락 비중에 못 미칠 수 있다. 개수는 세지 않았다.

## 배포 가능 여부

- **p5-5.json: 배포 가능.**
  - 필수 1건(005)은 고쳤다.
  - 남은 권장 중 071 라벨(R2)은 유형 표시가 틀린 것이라 다음 수정 때 먼저 처리하기를 권한다.

---

# 이어서: p6-3.json(10지문)·p7-5.json(15세트)

총괄 갱신 지시에 따라 같은 방식으로 검토했다. 필수는 직접 고쳤고 권장은 기록만 했다. 커밋하지 않았다(두 파일 모두 git에서 아직 추적하지 않는 파일이다).

## 요약

| 파일 | 필수 | 권장 | 고친 id | 배포 가능 |
|---|---|---|---|---|
| p6-3.json | 6 (모두 직접 수정함) | 약 20 | 001(headingKo, 4번 ko 보기), 002(3번 빈칸 지문·보기·ko·해설), 004(paragraphsKo), 007(첫 문장 EN·ko), 009(2번 보기 A·ko·해설) | **가능** (권장 R-6 tense 틀 반복은 다음 수정 때 정리 권장) |
| p7-5.json | 1 (직접 수정함) | 약 15 | 005(본문 below→above, EN·ko) | **가능** |

- **p6-3:** 40개 빈칸 모두 보기 4개를 하나씩 넣어 봤다(16번 대입). 문장 고르기는 후보 문장을 하나씩 넣었다.
- **p7-5:** 54문항을 모두 지문만 보고 풀었다. 정답 키는 전부 맞고, 계산 문항(011, 013, 014, 015)도 다시 계산해 맞다.
- **crossRef:**
  - 9문항이 정답 기준 9/9 통과다.
  - 18차 오답 규칙까지 넣으면 8/9다. 012-Q3의 오답 B·C가 기사 하나만으로 지워진다(R-P7-1).
- **명세:**
  - 개수, 지문 종류, 난이도, 정답 분포, 단어 수, 빈칸 번호, ko 줄 수가 모두 맞다.
  - p6-3 정답 분포는 A·B·C·D 각 10, p7-5는 A 13 / B 14 / C 13 / D 14다.
- 수정 뒤 세 파일(p5-5, p6-3, p7-5)이 모두 JSON으로 정상적으로 읽힌다. 수량과 정답 위치(answer)는 그대로다.

## p6-3 필수 (직접 고침)

| id | 문제 | 수정 전 | 수정 후 |
|---|---|---|---|
| 007 문단1 | 지문 안에서 서로 모순된다. 포장이 2월 이후 "바뀌어 왔다"는데, 바로 뒤 문장은 같은 구성을 그 기간 내내 써 왔다고 한다. | "Our return packaging has changed since the pilot began in February." / ko "2월 시범 사업을 시작한 뒤 반송 포장이 바뀌었습니다." | "Our return packaging changed when the pilot began in February." / ko "2월 시범 사업을 시작하면서 반송 포장이 바뀌었습니다." 정답 D(has used)와 해설은 그대로 둔다. 다시 대입해 보니 정답은 하나다. |
| 009-2 | 정답이 둘로 읽힌다. A "The old covers will be hidden beneath new plastic ones."도 앞 문장(원래 표지를 남김)과 뒤 문장(This preserves the marks)에 이어진다. | A "The old covers will be hidden beneath new plastic ones." / ko "기존 표지는 새 플라스틱 표지 아래 감춥니다." | A "New paper covers will be cut to match the originals." / ko "원래 것과 똑같은 새 종이 표지를 재단합니다." 원래 표지를 남긴다는 앞 문장과 맞지 않아 빠진다. 해설에 A와 D를 지우는 근거를 넣었다. 정답 B는 그대로다. |
| 002-3 | 정답이 둘로 읽힌다. "단자가 아직 연결되지 않음"과 "11시에 끝낼 예정"이 will connect와도 맞는다. 빈칸 문장 안에 "It is now nine thirty"라는 시각 단서가 있어 10차·18차 규칙에도 어긋난다. | "…arrived at eight this morning. It is now nine thirty, and an electrician {3} it. She has removed the cover and is laying out the cables; the power terminals are still disconnected. She expects to finish at eleven." 보기: has connected / *is connecting / had connected / will connect | "…arrived at eight this morning, and an electrician {3} it. She started an hour after it arrived and expects to finish at eleven. Until then, please keep the area around the grinder clear." 보기: has installed / *is installing / had installed / will install. ko 보기, paragraphsKo, 해설도 함께 고쳤다. 이미 시작했으니 will이 빠지고, 아직 끝나지 않았으니 완료형이 빠진다. |
| 004 paragraphsKo[0] | 번역이 뜻을 바꾼다. "…잘라 새 종이로 바꾸면"은 공급업체가 잘라서 바꾸는 것으로 읽힌다. 원문은 "이미 재단했으므로 바꾸려면 추가 비용"이다. | "회의 시작 전에 공급업체가 종이를 크기에 맞게 잘라 새 종이로 바꾸면 두 번째 물량 비용이 듭니다." | "회의가 시작되기 전에 공급업체가 이미 종이를 규격에 맞게 재단했기 때문에, 종이를 바꾸려면 두 번째 물량 값을 내야 합니다." |
| 001 headingKo | 단어가 겹친다. | "제목: 작업대 작업대" | "제목: 포장 작업대" |
| 001-4 ko 보기 A | 조사가 틀렸다. | "모든 작업대을" | "모든 작업대를" |

## p7-5 필수 (직접 고침)

| id | 문제 | 수정 |
|---|---|---|
| 005 본문 | 표를 가리키는 말이 틀렸다. 화면(`js/exam.js`의 readingDoc)은 form 지문의 표를 본문보다 먼저 그린다. 그런데 본문은 표를 "below"(아래)라고 부른다. | P0 "The items below…" → "The items listed above…" / ko "아래 물건들은" → "위에 기재된 물건들은". P1 "the original print listed below" → "listed above" / ko "아래에 기재된" → "위에 기재된". 정답과 해설은 그대로 둔다. |

## p6-3 권장 (기록만)

- **R-6-1 tense 틀 반복 (가장 큼).** tense 9문항 중 7문항이 두 틀이다.
  - "보는 사람이 도착한 순간 작업이 진행 중" 틀이 4문항이다: 002, 005, 006, 009.
    - 005와 009는 "as I entered" 문장이 같다.
    - 보기 세트(had p.p. / has p.p. / will / was V-ing)와 정답 위치 D도 같다. 16차 "같은 보기 세트 반복 금지"에 걸린다.
  - "방문·시험이 끝남 → 단순과거" 틀이 3문항이다: 001, 003, 008.
  - 003(compared)과 008(tested)은 보기 중 과거형이 정답 하나뿐이다(16차 금지 구성).
  - 006은 will have arranged / will be arranging 짝이다(18차 금지 짝). 빈칸 다음 문장이 답을 그대로 말한다.
  - 004-1은 had accepted / was accepting 짝(18차 금지 짝과 거의 같음)이다.
  - 제안:
    - 009-4는 단서를 진행형 관찰 문장 대신 시각 사실로 바꾼다.
    - 005-2와 009-4 가운데 하나는 보기 세트를 바꾼다.
    - 003과 008은 오답 하나를 used to나 다른 과거형으로 바꾼다.
- **R-6-2 문장 고르기 오답이 약하다.** 오답이 지문과 정반대이거나 엉뚱한 명령문이다(10차 규칙).
  - 해당 문항: 001 "Move all the worktables…", 005 "Mix both heights…", 007 "Discard the cushioning…", 010 "Delete the lighting reference…". 003-4 D, 009-2 C도 비슷하다.
  - 001-4 정답은 앞 문장의 "unstable worktables"를 그대로 반복한다.
  - 001-4 해설의 "앞 문단과 어긋난다"는 실제로는 "관련 없음"이다.
- **R-6-3 vocab 오답이 약하다.**
  - 해당 문항: 001-1 polish/borrow/weigh, 002-2 expand/erase/decorate, 003-1 wrap/fold/dissolve, 005-1, 010-2 rarely/secretly/briefly.
  - 009-3의 replace는 "제자리에 돌려놓다"라는 뜻이 있어 답이 될 여지가 있다. discard로 바꾸기를 권한다.
  - 010-2의 정답 fairly는 "꽤"로도 읽힌다. accurately로 바꾸기를 권한다.
- **R-6-4 단서가 지나침.**
  - 001-2: 같은 단서가 넷이다. "after checking every packing bench"를 지우기를 권한다.
  - 006-3: 빈칸 문장의 "adding practical background"가 In addition을 직접 알려 준다.
  - 010-4: 정답만 "that lighting reference"로 앞 명사를 받는다. 또 customers가 갑자기 명령형 your로 바뀐다.
- **R-6-5 연결어.** 002와 003의 연결어 정답이 둘 다 인과다(Consequently, As a result). 25차에서 지적한 "인과 정답 편중"이 이어진다.
- **R-6-6 기존 문항과 소재 겹침.**
  - 003(빵집 스텐실 밀가루 무늬)은 m-p7s-9-02와 같은 소재다. 가장 강한 겹침이다.
  - 004(점자 점 간격)는 m-p7-8-11, m-p7s-10-03, p7-2-008에 이어 네 번째다.
  - 006과 010이 모두 조명·촬영 소재다.
  - 008(메뉴 번역 슬리브)은 p7-5-011(메뉴 번역 견적)과 같은 확장 회차에서 겹친다.
  - 009(박물관 자원봉사)는 회사 업무가 아니다.
- **R-6-7 이름.**
  - p6-3 안에서 성이 겹친다: Vilm(001, 004), Noll(005, 007).
  - 005 "Orvani House"(호텔)는 m-p7-10-15 "Orvani Lodging"(호텔)과 업종까지 같다.
  - 005 memo에는 Date 줄이 없다.
- **R-6-8 기타.**
  - 002 heading "A separate route for strong spices"가 본문(순한 혼합물 전용 분쇄기)과 맞지 않는다.
  - 007-1 보기 used to / will / has는 16차에서 반복하지 말라고 한 세트에 가깝다.
  - 정답 위치는 10지문 중 9지문이 "세 기호 + 하나 반복" 꼴이다. 순열만 기계적으로 피한 것으로 보인다.

## p7-5 권장 (기록만)

- **R-P7-1 crossRef 012-Q3 오답 (18차).** B "commissioned by Lethari"와 C "painted by the canteen manager"가 기사 하나만 봐도 지워진다.
  - 제안(정답 위치 유지):
    - B → "It was painted after the business became Narell Metalworks."
    - C → "It was painted in the same year the bridge was rebuilt."
  - explain에 다음 문장을 덧붙인다. "금속공업 이후나 1986년 제작은 Foundry 간판이 함께 찍힌 사진과 맞지 않는다."
- **R-P7-2 복수 지문 흐름 반복.**
  - 011, 013, 014, 015의 4세트가 "조건표 + 사례 → Q3 고르기 → Q4 그 결과로 계산" 흐름이다. 같은 흐름 3세트 이상 금지 규칙에 걸린다.
  - 013과 014는 문항 유형 순서도 같다.
  - 제안: 014-Q4를 계산이 아닌 crossRef로 바꾼다. 예: "What is indicated about the four sets sold at 9:20 A.M.?"
  - crossRef 9문항이 모두 Q3·Q4에 몰려 있다. 012는 Q3과 Q4를, 015는 Q4와 Q5를 맞바꾸기를 권한다.
- **R-P7-3 "부정 사실로 오답 지우기" 문장이 많다.**
  - 복수 지문의 마지막 문서에 반복된다:
    - 011 "We have not yet transferred…"
    - 012 "I have not posted…"
    - 014 "I am not reporting…"
    - 015 "No part of the shipment…"
  - 단일 지문 7세트에도 약 20회 있다. 010은 16문장 중 7, 014는 32문장 중 9가 부정문이다.
  - 오답을 지문이 바로 부정하는 문항: 005-Q3 B, 008-Q1 A, 007-Q2 A, 010-Q1 A.
  - 25차 p7-3 권장 4와 같은 문제다.
- **R-P7-4 정답이 지문을 거의 그대로 옮김.** 003-Q1, 004-Q1, 005-Q3.
  - 제안 1: 003 C → "A custom lettering service for mailing envelopes"
  - 제안 2: 004 D → "Relocating the tear point to leave more material over the closure"
  - 제안 3: 005 C → "Verification of personal details on the cards"
- **R-P7-5 상식만으로 지워지는 오답.** 002-Q2 D, 003-Q2 D, 004-Q2 A·B, 009-Q1 A·C, 009-Q4 B.
- **R-P7-6 약한 오답과 해설.**
  - 011-Q3 오답 18은 이메일 하나로 지워진다. 보기를 26/24/*20/22로 바꾸기를 권한다.
  - 011-Q4 해설이 $232를 설명하지 않는다.
- **R-P7-7 소재·이름 겹침.**
  - 003과 004가 연속으로 같은 흐름이다("견본 사진·승인 → 전체 작업"). p7-3-004·008, p7-4-004와도 견본 승인 소재가 겹친다.
  - 005와 006이 연속으로 "창립기념 직원 행사"다.
  - 014(화면 재고와 실제 재고의 차이 계산)는 m-p7-9-12, m-p7s-7-10과 흐름이 같다.
  - 011은 p6-3-008과 메뉴 번역 소재가 겹친다.
  - 015 "Selvara Inlet"(선박)은 m-p7-4-11 "Selvara River Trips"(선박)와 업종까지 같다.
  - 014 "Pelvessa"는 p6-2-010, p6-3-004 "Delvani"는 p7-4-006의 회사 이름을 다시 쓴다.
- **R-P7-8 정답 위치.**
  - 4문항 순열은 없다.
  - 5문항 5세트는 모두 "A~D 전부 + 하나 반복" 꼴이다.
  - 013 Q2~Q5는 ABCD, 015 Q1~Q4는 DCBA로 차례대로 나열한 순열이다.
  - 세트 첫 문항 정답이 네 세트마다 A~D를 한 번씩 돈다.
- **R-P7-9 유형 라벨과 형식.**
  - 004-Q2, 009-Q4, 008-Q3은 지문에 그대로 나온 내용인데 inference로 붙어 있다. detail로 바꾸기를 권한다.
  - 008 synonym 질문에 "in the article", "line N" 표기가 없다.
  - 007-Q3 날짜 보기가 시간순이 아니다(July / September / August / October).
- **R-P7-10 번역과 지문.**
  - 008 ko: 매장 고객을 "관람객"으로 옮겼다. "방문객"이 맞다.
  - 009 ko: 인용문 번역에 원문에 없는 "도"가 붙었다.
  - 013 지문 C ko: 주어가 빠져 지시한 사람이 바뀐다. "제가 요청했습니다"로 바꾼다.
  - 006: 경품 수령 장소가 흐리다(People Services와 Telven의 사무실).

## crossRef 3단계 검증 (p7-5)

| id-Qn | A만 | B만 | C만 | 질문+보기만 | 판정 |
|---|---|---|---|---|---|
| 011-Q3 | ✗ | ✗ | – | ✗ | 통과 (오답 18은 약함) |
| 011-Q4 | ✗ | ✗ | – | ✗ | 통과 |
| 012-Q3 | ✗ (오답 B·C는 기사만으로 지워짐) | △ | – | ✗ | 정답 기준 통과, 오답 규칙 실패 |
| 013-Q3 | ✗ | ✗ | ✗ | ✗ | 통과 |
| 013-Q4 | ✗ | ✗ | ✗ | ✗ | 통과 |
| 014-Q3 | ✗ | ✗ | ✗ | ✗ | 통과 |
| 014-Q4 | ✗ | ✗ | ✗ | ✗ | 통과 |
| 015-Q3 | ✗ | ✗ | ✗ | ✗ | 통과 |
| 015-Q4 | ✗ | ✗ | ✗ | ✗ | 통과 |

정답 기준 **9/9**, 오답 규칙 포함 **8/9**. crossRef 표시가 없는 문항 중 두 지문 이상이 필요한 문항은 없다.

## 배포 가능 여부 (p6-3, p7-5)

- **p6-3.json: 배포 가능.**
  - 필수 6건은 고쳤다.
  - tense 틀 반복(R-6-1)과 약한 오답(R-6-2, R-6-3)은 품질 문제지만 정답이 하나인 것은 확인했다.
- **p7-5.json: 배포 가능.**
  - 필수 1건은 고쳤다.
  - 012-Q3 오답(R-P7-1)과 복수 지문 흐름 반복(R-P7-2)은 다음 수정 때 먼저 처리하기를 권한다.
