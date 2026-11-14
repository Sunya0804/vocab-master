# 36차 검토 — 모의 16~20회 R1 (Part 3·4)

**판정: 수정본은 R1 담당 범위에서 조립·배포 가능. 미해결 필수 오류 0건.** 실제 앱 조립·배포를 실행했다는 뜻은 아니다. 다른 파트의 배포 판정은 각 담당 검토 결과에 따른다.

| 파일 | 전수 검토 | 필수 발견·수정 | 권장 기록·미반영 |
|---|---:|---:|---:|
| `docs/mock/m-p3-4.json` | 65세트·195문항 | 6건 / 6개 ID | 5항목 |
| `docs/mock/m-p4-4.json` | 50세트·150문항 | 5건 / 5개 ID | 5항목 |
| 합계 | 115세트·345문항 | 11건 / 11개 ID | 10항목 |

권장 수는 아래 번호별 묶음 항목 수다. 여러 ID에 걸친 반복 흐름은 한 항목으로 셌다. 권장은 지시대로 기록만 했다.

- Part 3 수정 ID: `m-p3-16-04`, `m-p3-17-10`, `m-p3-19-08`, `m-p3-19-13`, `m-p3-20-06`, `m-p3-20-10`.
- Part 4 수정 ID: `m-p4-16-01`, `m-p4-16-07`, `m-p4-17-05`, `m-p4-18-07`, `m-p4-20-07`.
- ID·배열 순서·test·difficulty·talkType·문항 수·345문항의 type/answer는 유지했다. 수정 대상 외 Part 3 59세트, Part 4 45세트는 원본과 객체 단위로 동일하다. 커밋하지 않았다.

## 범위와 방법

`review-36-mock4.md`의 R1 범위에 대해 `mock-spec.md`, `exam-lc-spec.md`, `exam-p167-spec.md` 끝 누적 규칙, 34·35차 LC 검토를 적용했다. 115세트의 영어 대본, 한국어 대본, 345문항·1,380보기, 질문/보기 번역과 해설을 전수 대조했다. 특히 의도 25문항은 인용문+질문·보기만으로 정답을 고를 수 있는지, 그래픽 25문항은 대본만/표만/질문·보기만으로 풀리는지 별도로 검토했다.

기존 연습 LC 144세트와 모의 1~15회 LC 345세트, 합계 489세트의 도입부를 훑고 근접 후보의 본문·표·문항을 추가 비교했다. `docs/mock`의 이전 회차와 `docs/questions`의 전 파트 영어 필드를 대상으로 고유명사 후보와 문장 중복도 검색했다. 새 대본의 정규화한 연속 12단어 일치는 0건이었다. 이는 복제 단서 확인이며 의미상 신규성을 전부 증명하는 검사는 아니다. 이전 전 파트의 모든 문항을 재풀이한 것은 아니다. 음성 파일·TTS·앱 UI는 이번 데이터 검토 범위 밖이다.

## 필수 수정 — Part 3

### 1. m-p3-16-04 — 근무일 교환과 동반 근무의 모순

리타는 토요일에 나올 수 없고 일요일만 가능하다. 그런데 두 번째 남자는 리타와 근무를 **교환**하겠다고 한 뒤, 뒤에서는 리타와 **함께 일요일**에 일하겠다고 했다. 일요일 동반 근무로 통일했다.

- 전: “Actually, I'd rather switch with Rita. My daughter has a swim meet on Saturday afternoon.”
- 후: “Actually, I'd rather join Rita on Sunday. My daughter has a swim meet on Saturday afternoon.”
- 번역 전: “사실 저는 리타와 바꾸고 싶어요.” → 후: “사실 저도 리타와 일요일에 함께 하고 싶어요.”
- 세 문항의 C/D/D는 그대로다. 구역별 분담 제안과 시간제 직원 연락이라는 근거도 유지된다.

### 2. m-p3-17-10 Q2 — 금형 보관의 일반적 의미만으로 정답 선택 가능

기존 인용 “We kept the molds”와 D “The original shape could be made again easily”는 금형의 일반적 기능만으로 연결됐다. 인용을 넓은 표현으로 바꾸고 네 보기 모두 어떤 준비가 이미 되어 있는지를 묻게 했다.

- 대본 전: “… We kept the molds.”
- 대본 후: “… We kept the molds. We wouldn't be starting from scratch.”
- 질문 전: “What does the woman imply when she says, \"We kept the molds\"?”
- 질문 후: “Why does the woman say, \"We wouldn't be starting from scratch\"?”
- 보기 전 A/B/C/D: “The bamboo version could restart right away.” / “The molds could be sold to another maker.” / “Most production costs were paid off long ago.” / “The original shape could be made again easily.”
- 보기 후 A/B/C/D: “A new bamboo supplier has already been found.” / “The online store already has replacement stock available.” / “Marketing already has a suitable name for the relaunch.” / “The plastic version can use the existing production tools.”
- 대본·질문·네 보기 번역과 해설 동기화. D 유지. 새 인용만으로 공급처·재고·이름·금형 중 어느 준비를 가리키는지 알 수 없고, 대본에서 플라스틱 대체와 보관 금형을 연결해야 한다.

### 3. m-p3-19-08 — 신규 노트북 납기가 인턴 시작일을 넘김

5월 15일에 주문하고 배송에 3주가 걸리면 6월 5일이다. 기존 6월 3일 시작일에는 영상 편집 인턴용 새 노트북 두 대가 도착하지 않는다. 재사용 네 대만으로 일정 문제가 해결된 것처럼 끝나는 부분을 고쳤다.

- 전: “Our six summer interns start on June third. Have we ordered their laptops yet?”
- 후: “Our six summer interns start on June sixth. Have we ordered their laptops yet?”
- 번역 “6월 3일” → “6월 6일”. Q1 해설도 “6월 6일에 시작한다고 했으므로 (B)이다. 5월 15일은 오늘 날짜이며, 그날 주문해 3주 뒤인 6월 5일에 도착하면 근무 시작 전에 준비할 수 있다.”로 변경했다.
- Q1 B “In early June”와 나머지 두 정답 C/C는 유지했다.

### 4. m-p3-19-13 Q1 — 정규 토요일 개점을 특별 조기 개점으로 설명

대본은 토요일에 원래 7시에 연다고 정정한다. 특별히 평소보다 일찍 여는 일정 변경은 없다.

- 해설 전: “큰 고객이 토요일에 주문품을 찾으러 온다고 했으므로 (D)이다. 카운터는 오히려 7시로 일찍 연다.”
- 해설 후: “큰 고객이 토요일에 주문품을 찾으러 온다고 했으므로 (D)이다. 토요일 개점 시각은 7시이며, 평소보다 늦게 연다는 말은 없다.”
- 영어와 D/B/A 정답은 그대로다.

### 5. m-p3-20-06 Q1 — 인용의 일반적 함의가 정답 보기와 일치

“That's the easy part”만 보고도 A “Other records will be harder to prepare”를 고를 수 있었다. 네 보기 모두 어려운 후속 작업 후보가 되도록 바꿨다.

- 전 A/B/C/D: “Other records will be harder to prepare.” / “The audit should be simple overall.” / “The auditors will mainly check paper receipts.” / “She expects to finish everything by Monday.”
- 후 A/B/C/D: “The app submissions need additional work before the audit.” / “Sorting paper receipts by month will take longer.” / “Finding last year's paper files will be more difficult.” / “Arranging the auditors' travel will require more effort.”
- 네 보기 번역·해설 동기화. A 유지. 종이 영수증은 이미 정리됐고, 앱 사진이 흐릿해 재제출을 받아야 한다는 후속 대본이 있어야 A를 고를 수 있다.

### 6. m-p3-20-10 Q2 — 자기 경쟁의 대상이 사실상 보기에서 주어짐

기존 오답에는 자기 기록 경신·메뉴 교체처럼 고객 잠식과 다른 뜻이 섞여 있어 인용의 일반적 사업 의미가 C를 강하게 가리켰다. 네 보기 모두 두 매장 사이 경쟁의 구체적 대상을 묻게 했다.

- 전 A/B/C/D: “They would be trying to beat their own sales record.” / “Their two managers would compete for staff.” / “A nearby shop would draw customers from the first.” / “A new menu would replace their old one.”
- 후 A/B/C/D: “Both shops would bid against each other for suppliers.” / “The two locations would compete to hire local staff.” / “The nearby branch would draw away existing café customers.” / “The managers would compete for a limited advertising budget.”
- 네 보기 번역·해설 동기화. C 유지. 두 블록 거리, 현재 대기 줄을 포기하는 고객, 기존 매장 확장이라는 대본을 함께 보아야 고객 중복으로 정해진다.

## 필수 수정 — Part 4

### 1. m-p4-16-01 — 길이를 천장 높이 제한의 원인으로 설명

- 전: “It's a little longer, so please note that it won't fit in some parking garages with low ceilings.”
- 후: “It's a little taller, so please note that it won't fit in some parking garages with low ceilings.”
- 번역 “조금 더 길어서” → “조금 더 높아서”. Q2 해설은 이미 낮은 천장 제한을 올바르게 설명하므로 유지했다. B/A/D 유지.

### 2. m-p4-16-07 — 물류센터 docks 오역

- 대본 번역 전: “트럭이 더는 부두에서 줄 서 기다리지 않게 했고” → 후: “트럭이 더는 하역장에서 줄 서 기다리지 않게 했고”.
- Q3 D 번역 전: “부두 견학을 안내한다” → 후: “하역장 견학을 안내한다”.
- 물류센터 상차 일정의 docks이므로 항만 부두가 아니다. 영어와 C/D/A 유지.

### 3. m-p4-17-05 — 최초 폐쇄 요일과 반복 폐쇄 요일의 모순

- 전: “Starting this Saturday, the Arden Street Bridge will close for repairs on three consecutive weekends, from Friday night until early Monday morning.”
- 후: “Starting this Friday night, the Arden Street Bridge will close for repairs on three consecutive weekends, from Friday night until early Monday morning.”
- 한국어도 “이번 주 토요일부터” → “이번 주 금요일 밤부터”. A/A/D 유지. 세 문항의 도로 폐쇄·페리 증편·승선권 할인 근거는 바뀌지 않는다.

### 4. m-p4-18-07 Q2 — 소프트웨어 도입을 확실한 오답으로 배제하기 어려움

해럴드는 설득 끝에 회계 소프트웨어로 전환했다. 부서장이 그 소프트웨어를 “introduced”했다는 기존 B는 전환을 도입으로 읽으면 참이 될 여지가 있다. 개발 여부로 바꾸어 A의 유일성을 확보했다.

- B 전: “He introduced the accounting software.” / “회계 소프트웨어를 도입했다.”
- B 후: “He developed the company's first accounting software.” / “회사의 첫 회계 소프트웨어를 개발했다.”
- 해설 전: “지금 관리자 대부분을 그가 가르쳤다고 했으므로 (A)이다. 소프트웨어는 주변에서 몇 년간 설득해서 바꿨다.”
- 해설 후: “지금 관리자 대부분을 그가 가르쳤다고 했으므로 (A)이다. 회계 소프트웨어는 설득 끝에 사용하기 시작했을 뿐 직접 개발했다는 말은 없다.”
- 세 정답 C/A/D 유지.

### 5. m-p4-20-07 Q3 — 계약했다는 인용을 ‘조건을 수락했다’로만 바꿈

- 대본 전: “The other offices on your floor have already signed.”
- 대본 후: “The other offices on your floor have already signed. That may put the increase in perspective.”
- 질문 전: “Why does the speaker say, \"The other offices on your floor have already signed\"?”
- 질문 후: “Why does the speaker say, \"That may put the increase in perspective\"?”
- 보기 전 A/B/C/D: “To explain that no offices are vacant” / “To warn that her office may be moved” / “To point out that the deadline has passed” / “To suggest similar tenants accepted the terms”.
- 보기 후 A/B/C/D: “Comparable buildings have cut their rents this year.” / “A longer lease would avoid future rent increases.” / “Her current rent already includes the building upgrades.” / “Similar tenants have accepted the proposed renewal terms.”
- 대본·질문·보기 번역과 해설 동기화. D 유지. 새 인용만으로 어떤 비교 근거인지 알 수 없고, 직전 문장의 다른 입주사 수락이 필요하다.

## 권장 — 기록만, Part 3 5항목

1. **기존 소재·계산 재등장:** `17-13`은 `m-p3-9-13`과 조기 지급 한 건을 골라 할인율 대신 실제 할인액을 최대화하는 과업이 겹친다. 기존 것은 기한 만료 제외가 추가되고, 이번 것은 고객 대금 지연·할인 유효성 문의가 추가되지만 중심 선택 원리는 같다.
2. **기존 그래픽 판단 반복:** `18-13`은 `m-p3-14-11`과 규모가 다른 지역/지점의 감소 비율을 비교하고 가장 큰 곳의 관계자를 방문·면담하는 흐름이 가깝다. 판매 감소와 인력 이탈로 데이터 대상은 다르다.
3. **세트 전개 반복:** `16-02` 배터리 수리 중 대체 노트북, `19-04` 고장 프로젝터 대신 다른 층 기기, `20-02` 토너 주문 지연 대신 창고 여분은 ‘즉시 필요한 장비 문제 → 내부 대체품 안내 → 수령/준비 행동’이라는 뼈대를 공유한다. 세부 원인과 과업은 다르지만 이후 작성에서는 협상·인수인계·판단 유보 등으로 전개를 넓히는 편이 좋다.
4. **유형 라벨:** `17-04 Q3`은 “Why does the man choose Priya?”이므로 `detail`보다 `reason`이 더 정확하다. 지시대로 type은 유지했다.
5. **보기·질문 정밀도:** `16-06 Q3`의 ‘관리자 면담 뒤 지급’ 같은 오답은 근거가 약하다. `20-08 Q1`의 made-to-order와 out-of-stock은 주문 제작과 일시 품절을 더 분명히 구분할 여지가 있다. `16-11 Q2`는 추가 할인 문의가 남으므로 “listed rate before discounts”라 쓰면 표 요금이라는 뜻이 더 분명하다. 정답이 공동 최장 보기인 경우는 136/195(69.7%), 단독 최장은 58/195(29.7%)다. 공동 최장 비율에는 동률이 많다는 점을 함께 고려해야 한다.

## 권장 — 기록만, Part 4 5항목

1. **기존 핵심 소재 재사용:** `17-03`과 `m-p4-3-02`는 파쇄 트럭의 사업장 방문, 고객의 현장 관찰, 파기 증명서라는 핵심 서비스·Q1/Q2를 공유한다. 신규 고객 첫 수거 무료와 기존 지문의 철심 제거 불필요 등 세부 사항은 다르지만 신규성은 약하다.
2. **광고 전개 반복:** `16-05`, `17-03`, `19-05`, `20-01`은 문제 제기 → 기업 서비스·혜택 소개 → 가입/계약 혜택 → 연락처의 흐름이다. 광고라는 장르의 관행은 있으나 세트 간 차이를 넓힐 수 있다.
3. **부정 사실로 오답 소거:** `18-01`의 자수가 잘 나왔다는 언급은 자수 오류 오답을, `19-09`의 철거가 예정대로 끝났다는 언급은 철거 지연 오답을 직접 지운다. 이후에는 별도 인물·시점·조건의 참인 사실을 오답에 활용하는 편이 좋다.
4. **공간 표현:** `16-02 Q3`의 “Holding them on the bottom floor”는 대본의 ground-floor conference rooms보다 범위가 넓다. 지하층 유무를 추가 추정할 필요가 없도록 “Holding them in ground-floor conference rooms”와 ‘1층 회의실’로 맞추는 것을 권한다.
5. **보기 길이·난도:** 정답이 공동 최장인 경우는 102/150(68.0%), 단독 최장은 52/150(34.7%)다. `18-10`, `19-10`, `20-10`의 그래픽은 두 자료가 필요하지만 해당 층·부서·음식의 직접 대응이어서 다른 난도3 계산 문항보다 쉬운 편이다. 실제 수험생 자료로 난도를 검증한 수치는 아니다.

영문 복수 단어 고유명사 후보를 기존 전 파트 작성 파일에서 검색한 결과, 회사·기관명으로 확인되는 정확한 재등장은 찾지 못했다. Human Resources 같은 일반 부서명은 제외했다. 같은 회차 Part 3·4의 그래픽 3+2개도 대조했으며, 구체적 소재와 계산 규칙이 함께 같은 경우는 발견하지 않았다. 업무·기업 서비스·인사·회계·구매·물류·고객 계약 상황은 양 파일 모두 2/3 이상이다.

## 의도 문항 25개 — 수정 후 문맥 검증

각 행은 인용문+질문·보기만으로 대상/이유를 확정할 수 없고, 전체 대본에서는 아래 한 답으로 정해짐을 뜻한다. 보기를 개선한 4개 의도 문항도 다시 풀었다.

| Part / ID 끝부분 | 문항·정답 | 대본에서 필요한 구분 |
|---|---|---|
|3 / 16-06|Q2 B|합계 전표 제출 뒤 상세 영수증을 다시 모은 수고|
|3 / 16-10|Q1 C|3월 입사가 아니라 일부 요일 재택 수락|
|3 / 17-07|Q3 B|판매량이 아니라 상자 비교표를 읽는 고객|
|3 / 17-10|Q2 D|플라스틱 생산에 보관 금형 재사용|
|3 / 18-07|Q1 D|초대장이 이미 나가 날짜 변경 곤란|
|3 / 18-10|Q3 C|예전 개방형 사무실에서 집중하기 어려웠음|
|3 / 19-07|Q2 A|시차 때문에 한 회차로 모든 지역을 맞추기 어려움|
|3 / 19-09|Q3 D|요금이 아니라 객실 보유 명단 기한의 연장 한계|
|3 / 20-06|Q1 A|종이 정리보다 앱 제출 영수증 재확보가 남음|
|3 / 20-10|Q2 C|직원/공급업체 경쟁이 아니라 인근 지점의 고객 잠식|
|4 / 16-04|Q1 B|과거 화면 변경 때 늘어난 상담 전화 경험|
|4 / 16-07|Q2 D|수치 외에 후배 지도 공로도 인정|
|4 / 16-08|Q3 C|주문량이 아니라 혼합유의 요리 적합성 평가|
|4 / 17-04|Q2 C|휴식·인력 부족이 아니라 자동 조정으로 적은 현장 인원|
|4 / 17-06|Q3 A|근속 기간이 아니라 응답 시간으로 근무제 계속 여부 판단|
|4 / 17-08|Q1 D|낮은 급여를 보완하는 이사비·교육비 등 혜택|
|4 / 18-04|Q3 D|짧은 회의에 여러 차례 비행한 비용 대비 효과|
|4 / 18-07|Q1 C|낡은 계산기·소프트웨어 전환 일화가 나타내는 절약 성향|
|4 / 18-08|Q2 D|소음 보고서 작성·검토로 착공 일정 변경|
|4 / 19-05|Q1 B|회사 차가 이미 예약되어 없는 상황의 흔함|
|4 / 19-06|Q3 D|기계가 아니라 직원이 개며 시트를 확인|
|4 / 19-08|Q2 C|기존 거래 유지에 필요한 지연 해결 요청|
|4 / 20-04|Q2 C|품질 결함이 아니라 첫해 보고 수치의 추정 허용|
|4 / 20-06|Q1 D|사전 공지 여부가 아니라 과거부터 반복된 대기 불만|
|4 / 20-07|Q3 D|인상 폭 판단 근거로 다른 입주사의 갱신 수락 제시|

## 그래픽 25개 — 가림 검증

각 문항에 대해 대본+질문·보기만, 표+질문·보기만, 질문·보기만으로 각각 풀었다. 모두 하나의 정답을 확정할 수 없었고 결합했을 때 아래 한 답이었다. **Part 3 15/15, Part 4 10/10 통과.** crossRef 표 작성 의무는 R2 사항이며, 이 표는 R1의 LC 그래픽 검증이다.

| Part / ID 끝부분 | 문항·정답 | 결합 근거 |
|---|---|---|
|3 / 16-11|Q2 A $24|카탈로그 포함 4.5kg, 목적지 Zone3의 표 요금|
|3 / 16-12|Q3 D $130|구입 26개월 → 1~3년, 약정은 12개월 이하|
|3 / 16-13|Q1 B 3%|84,000−12,000=72,000|
|3 / 17-11|Q1 B 8:15|10:05 도착+도보20분=10:25, 10:30 회의 전에 준비|
|3 / 17-12|Q3 D Brio|팔걸이 조절 가능 및 $300 이하|
|3 / 17-13|Q2 A Kline|할인액 80/90/60/100달러 중 최대|
|3 / 18-11|Q3 B $520|5월3일 비회원, 3명이라 단체 할인 없음|
|3 / 18-12|Q1 B Long|900kg·3.3m를 수용하는 가장 작은 차|
|3 / 18-13|Q2 C South|감소율 North15/South20/East15/West10%|
|3 / 19-11|Q2 A M1|완충재 양쪽 2cm씩 → 내부 최소39×29×14cm|
|3 / 19-12|Q1 D 12:00|−15°C보다 높은 첫 기록 −14°C|
|3 / 19-13|Q3 A Leah|네 시간 추가 후10시간 이하, Jun은 결혼식으로 불가|
|3 / 20-11|Q3 A Table4|정확히8석인3/4 중 입구3 제외|
|3 / 20-12|Q2 C Express|15:40 현재, 내일10시 배송·수거 마감 충족|
|3 / 20-13|Q1 B Data Visualization|초과 정원 두 개 중 Public Speaking은 원래 방 유지|
|4 / 16-09|Q3 D Verbalis|최소 인원 반영 총액3150/3360/3800/3640달러|
|4 / 16-10|Q1 D Cedar|3층 제외, 2층 방 중 최대65석|
|4 / 17-09|Q2 C SessionC|3월20일 전, A마감·B야간전용 제외 → 3월19일|
|4 / 17-10|Q3 B Damaged products|최대34%는 이미 대응, 두 번째28% 선택|
|4 / 18-09|Q1 C Kestrel|배송≥4 중 합계8.8 최대, 합계8.9업체는 배송3.9|
|4 / 18-10|Q2 C ElevatorC|26층에 서는 승객용21~30층 엘리베이터|
|4 / 19-09|Q3 C June6|선반5월30일 시작을 일주일 연기|
|4 / 19-10|Q1 C P2|목요일 폐쇄 대상은 Engineering 배정 주차장|
|4 / 20-09|Q2 D OptionC|400㎡ 이상 B/C/D 중 단가10/9.5/10달러|
|4 / 20-10|Q1 D Tuesday|평소 파스타 메뉴인 Vegetable lasagna의 요일|

## 회차별 점검

난도는 저장된 세트 등급이다. allDistinct는 세 답이 모두 다른 세트 수이며, 최대 연속은 회차·파트의 문항 순서대로 계산했다.

|Part|회차|세트/문항|난도1/2/3|A/B/C/D|allDistinct|최대 연속|대본 단어|
|---|---|---|---|---|---|---|---|
|3|16|13/39|3/6/4|10/10/9/10|5|2|96~121|
|3|17|13/39|3/6/4|9/11/10/9|6|2|98~127|
|3|18|13/39|3/6/4|9/11/10/9|6|3|94~118|
|3|19|13/39|3/6/4|11/10/9/9|4|3|90~129|
|3|20|13/39|3/6/4|9/9/10/11|6|3|90~123|
|4|16|10/30|3/4/3|7/7/8/8|4|3|103~131|
|4|17|10/30|3/4/3|7/7/7/9|5|3|101~119|
|4|18|10/30|3/4/3|8/8/7/7|4|3|102~116|
|4|19|10/30|3/4/3|8/7/7/8|3|2|100~117|
|4|20|10/30|3/4/3|8/7/7/8|2|3|102~122|

- Part 3의 3인 대화는 회차별2/1/2/1/1세트다. 의도는 각2문항, 그래픽은 마지막11~13세트에 각1문항이다. 의도 배치는 16회06Q2·10Q1, 17회07Q3·10Q2, 18회07Q1·10Q3, 19회07Q2·09Q3, 20회06Q1·10Q2다.
- Part 4는 매회 의도3문항, 그래픽은 마지막09~10세트에 각1문항이다. 의도 배치는 16회04Q1·07Q2·08Q3, 17회04Q2·06Q3·08Q1, 18회04Q3·07Q1·08Q2, 19회05Q1·06Q3·08Q2, 20회04Q2·06Q1·07Q3다.
- 그래픽 Q1~Q3 위치는 위 검증 표처럼 분산돼 있다. Part 4 talkType 합계는 telephone10/announcement10/meeting10/tour5/advertisement5/broadcast5/speech5이며 매회7유형이 모두 존재한다.
- Part 3 유형: reason39/detail72/suggest18/topic12/next23/intention10/speaker6/graphic15. Part 4 유형: topic16/detail62/suggest19/speaker5/next9/intention15/reason14/graphic10.
- 회차별 정답 위치20~30%, 같은 기호4연속 금지, 세 답이 모두 다른 세트 절반 이하 규칙을 모두 통과했다. 같은 답이 있는 세트는 Part 3 38/65, Part 4 32/50이다.

## 검증 및 인계

수정 전 백업과 객체를 비교해 115개 ID 및 345개 type/answer 불변, 회차 수량, 고유 ID, 세트당3문항, 보기/번역4개, 대본/번역 줄수, 화자 수, 의도 인용문 일치, 그래픽 행/열·문항 수·배치, 대본 길이, 질문15단어·보기10단어 제한을 자동 검사했다. 오류0건이다. 변경된 11세트의 33문항도 수정 후 다시 대조했다. `git diff --check`를 통과했다.

|파일|수정 전 SHA-256|수정 후 SHA-256|
|---|---|---|
|m-p3-4.json|`bceba71db07bdbd16145bccb4e6a713002059aef21c6df9f4d229e3bbe679f23`|`fa48377ba4383895c03719025610d6135579943962fb69253cf60c50dd7d0048`|
|m-p4-4.json|`9e1dd015fd2d479fb5f480000248f7f04a82ba478c7da11b888c7d6e319e4b5c`|`2082f1283f9875b8c57725546ca5d5d0e25f91b512788e10e1c5675a36f52541`|

해시는 격리 작업 사본의 원시 바이트 기준이다. 공유 반영 시 줄바꿈 변환이 있다면 객체 동일성으로도 확인한다. 인계 파일은 두 JSON과 이 보고서뿐이다. 검토 판정의 배포 가능 여부는 데이터 품질에 대한 것이며 앱 빌드·출시를 포함하지 않는다.
