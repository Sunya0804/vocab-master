# 검토 14차: 12차 수정(Part 6·7) + 11차 수정(Part 1) 재검토

- 작성: 리뷰어 Claude, 2026-11-12. 지시서는 `docs/tasks/review-14-recheck.md`다.
- **대상:**
  - `p1-1.json`: 14문항 변경. 사진 005·021·032·035 재생성.
  - `p6-1.json`: 32/32 변경.
  - `p7-1.json`: 26/30 변경.
  - `p7-2.json`: 15/15 변경.
- **비교 기준:** 커밋 95ff7fd를 기준으로 diff를 냈다. 다만 이 커밋에는 10차 수정분이 문제 파일에 들어 있지 않다(p7-1-014가 10차 원본 그대로다). 그래서 diff에는 10차와 12차 변경이 함께 나온다. 해결 여부는 diff가 아니라 **12차·11차 문서의 지적 문장과 현재 텍스트를 직접 대조**해서 판정했다.
- **방법:**
  - 서브에이전트 7개가 나눠 다시 풀었다. 구간은 p6 2개, p7-1 2개, p7-2 2개, Part 1 텍스트 1개다.
  - 보기 4개를 모두 넣어 봤다. insertion은 네 자리에 모두 넣었고, crossRef는 지문을 하나씩 가리고 풀었다. 해설은 하나씩 현재 지문과 대조했다.
  - **사진 4장은 내가 직접 열었다.** 필수 항목, P6 tense 보기 세트 통계, p7-1-026, p6-1-028도 직접 확인했다.
- 파일은 수정하지 않았다.

## 요약

| 파일 | 필수 | 권장 | 참고 | 12·11차 지적 해결률 | 판정 |
|---|---|---|---|---|---|
| p1-1.json | 0 | 3 | 3 | **18/18 (100%)** | **배포 가능** |
| p6-1.json | **1** | 10 | 15 | 11/13 해결, 2 부분 | 028-Q2 한 문항을 고치면 **배포 가능** |
| p7-1.json | 0 | 12 | 16 | 10/13 해결, 3 부분 | **배포 가능**(권장은 품질 개선) |
| p7-2.json | 0 | 14 | 14 | 9/18 해결, 9 부분 | 오류는 없지만 연계 문항이 기준에 못 미쳐 **한 번 더 수정 권장** |
| 공통(파일 간 소재) | 0 | 1 | – | 0/1 해결, 1 부분 | – |

**전체 해결률:** 63건 중 해결 48건(76%), 부분 15건, 미해결 0건이다. Part 6·7만 보면 45건 중 해결 30건(67%)이다.

**결론:**
- **정답 키가 틀린 문항은 없다.** 사라진 문제와 남은 문제는 다음과 같다.
  - 12차 필수 3건(옛 해설 2, 정답 둘 1)은 모두 해결됐다.
  - Part 1 필수 8건(putting on 번역 7, 021 신발 무늬)도 모두 해결됐다.
  - 새 필수는 p6-1-028-Q2 하나다. 지문 시점과 정답이 어긋나 정답이 둘로 읽힌다(직접 확인).
- **사진 4장은 모두 표식이 없어졌고 정답도 그대로다**(직접 확인).
- **사라진 공식:**
  - P6 "화면 진행", "still open", `{3} own`.
  - P6 3문단 + 빈칸 1·2·2·3 배치가 18 → 9로 줄었다.
  - P6 빈칸 뒤 지시어 단서가 8 → 6으로 줄었다.
  - p7-2 Q1 purpose가 15 → 11로 줄었다.
- **그러나 공식이 옮겨 갔다**(직접 확인).
  - P6 tense: 보기가 {과거, has p.p., had p.p., will}이고 미래형이 하나뿐이며 정답이 will인 문항이 10개다(006·008·010·011·013·014·016·022·025·027). 미래 단서 하나만 보고 "유일한 비과거형"을 고르면 풀린다.
  - "완료 기록" 단서도 9지문에 남았다(001·003·005·012·015·018·021·024·028). 13차 규칙에서 금지한 것이다.
- **p7-2 연계 문항:** 30문항 중 12개가 아직 한 지문, 질문 문구, 또는 상식만으로 풀린다.
  - 12차 표의 10개 중 해결은 3개(004-Q4·008-Q3·009-Q4)이고, 7개는 고쳤지만 다른 경로로 풀린다.
  - 이번에 새로 걸린 것이 5개다(005-Q3·010-Q4·012-Q3·012-Q4·013-Q3).
  - 공통 원인은 두 가지다. 오답이 한 지문만으로 지워지고, 질문에 규정 단어가 들어 있다.
- **고치면서 새로 생긴 사소한 문제:**
  - 옛 지문 기준으로 남은 오답·해설: p7-1-014-Q1·015-Q1 explain, 023-Q2~Q4 오답, 026-Q3·Q4 explain.
  - 새 소재 겹침: p7-1 파일 안 3쌍, 파일 간 5쌍.

---

## 1. 12·11차 지적 처리 상태

### p1-1 (11차 필수 8 · 권장 10)
| 항목 | 상태 | 근거 |
|---|---|---|
| 필수 007·013·017·020·023·026·037 번역 | 해결 | 모두 "~입는/끼는/쓰는 중이다"로 바뀌었다. 60문항 전체에서 putting on·trying on·removing 번역을 다시 확인했고, 동작과 상태가 뒤바뀐 번역은 남아 있지 않다 |
| 필수 021 사진 | 해결(직접 확인) | 신발이 무늬 없는 검정 단화가 됐다. 정답 B(쓸기)만 참이다. 자전거는 벽에 기대 있고 바구니는 이미 달려 있으며, 벤치를 칠하는 동작도 없다 |
| 권장 005 사진 | 해결(직접 확인) | 운동화 혀에 엠블럼이 없다. 정답 B(앉아서 끈 묶기)만 참이다 |
| 권장 032 사진 | 해결(직접 확인) | 실험복에 문자가 없고 병에도 라벨이 없다. 정답 D만 참이고, 현미경을 보는 사람은 남자뿐이다 |
| 권장 035 사진 | 해결(직접 확인) | 톱 날 덮개가 무지다. 정답 D(줄자로 재기)만 참이고, 톱은 옆 작업대에 놓여 있다 |
| 권장 018·025·034·044·049·053·057 | 해결 | 번역·해설을 고쳤고, 사물 사진 오답을 위치·방향·개폐 상태로 다시 썼다 |
| 참고 사물 사진 오답 반복 | 부분 | 044·049·053·057은 바뀌었다. 나머지 14문항은 "being + 없는 작업자" 오답이 그대로다 |

### p6-1 (12차 필수 3 · 권장 10)
| 항목 | 상태 | 근거 |
|---|---|---|
| 필수 007-Q3 해설 | 해결 | "개인 탈의 칸에 더해 동작 확인 구역" |
| 필수 019-Q3 해설 | 해결 | 대명사 문항이 Q4로 옮겨졌고 해설이 현재 지문과 맞다 |
| 필수 027-Q4 정답 둘 | 해결 | 소재가 급여 체계 설명회로 바뀌었다. 남은 tense 보기에 진행형이 없다 |
| 권장 1 뼈대 | 부분 | 1·2·2·3 배치가 18 → 9로 줄었다. 그러나 문항 순서 틀이 번갈아 고정된다(아래 권장 6) |
| 권장 2 tense 단서 | 부분 | 화면·still open 단서는 없어졌다. 대신 미래형이 하나뿐인 보기 세트와 완료 기록 단서가 남았다(아래 권장 1·2) |
| 권장 3 023-Q4 / 019 | 해결 | has forwarded / was installed로 바뀌었다 |
| 권장 4 008-Q4 | 해결 | "must be shown with the statement…" |
| 권장 5 015-Q2 | 해결 | "no further responses will be accepted" |
| 권장 6 018-Q3 | 해결 | "…this shared usage level matches our machine logs…" |
| 권장 7 엉뚱한 오답 021·022·028·030 | 해결 | 네 보기 모두 바뀌었다. 다른 곳에 남은 엉뚱한 오답은 아래 권장 7 |
| 권장 8 `{3} own` | 해결 | its는 025에만 남았다 |
| 권장 9 013 on site | 해결(소재 교체) | 출장비 선지급이 됐다 |
| 권장 10 003/006 겹침 | 해결 | 006이 송장 발주번호 소재가 됐다 |

참고 항목은 대부분 해결됐다. 남은 것은 023 난이도 3, 004-Q4 오답 0, 019·027의 같은 대명사 보기 세트다.

### p7-1 (12차 권장 13)
| 항목 | 상태 | 근거 |
|---|---|---|
| 1 회사 맥락 | 해결 | 21/30이다(비회사 006·008·011·017·019·020·021·023·029) |
| 2 014-Q2 | 해결 | "Released times immediately appear as open to all sales teams." |
| 3 005 it | 해결(재작성) | |
| 4 001 9:14 | 해결 | |
| 5 Q1 오답 013·017·019 | 해결 | |
| 6 바꿔 말하기 018·027·029 | 해결 | |
| 7 023-Q2 의도 | 해결 | 인용문이 "That will be a short afternoon."으로 바뀌었다. 다만 오답이 옛 지문 기준이다(아래 권장 4) |
| 8 024-Q2 explain | 해결 | |
| 9 채팅 흐름 | 부분 | 005·027은 벗어났다. 009·023·025는 여전히 "문제 → 있는 것으로 대체"이고, 023·025·027은 문항 순서가 같다 |
| 10 기사 흐름 | 해결 | 결말이 서로 달라졌다 |
| 11 013/014 뼈대 | 부분 | 018은 벗어났다. 013·014는 연속 세트인데 여전히 "N 근무일 전 예약·정보 → 없으면 밀림·해제" 틀이다 |
| 12 반복 구조 | 부분 | Please bring은 해결됐다. "업체 제공 vs 이용자 책임"이 018·019·020(연속 3세트)에 남았고, "요금 + 기간 내 혜택" 광고가 004·015·020에 남았다 |
| 13 018-Q2 type | 해결 | detail |

참고 항목은 대부분 해결됐다. 남은 것은 014 ko "회의실"(Q3 B)이다.

### p7-2 (12차 권장 18)
| 항목 | 상태 | 근거 |
|---|---|---|
| 1-① 001-Q4 | 부분 | 음식 반입 규칙으로 바뀌었지만 "portable grill"은 상식만으로 고를 수 있다 |
| 1-② 002-Q4 | 부분 | 이메일 문장은 지웠다. 하지만 오답 셋이 이메일만으로 지워진다 |
| 1-③ 003-Q3 | 부분 | 이제 편지만으로는 안 풀리지만, 대신 메모만으로 풀린다 |
| 1-④ 004-Q4 | 해결 | Selection 열이 "Option"이 됐고, 질문이 총액 계산으로 바뀌어 이메일이 필요하다 |
| 1-⑤ 007-Q3 | 부분 | 권고 문구를 그대로 썼지만, "most likely" 소거로 드루 이메일만으로 풀린다 |
| 1-⑥ 008-Q3 | 해결 | floor plan과 tactile sign 연결이 세 지문에 나뉘어 있다 |
| 1-⑦ 009-Q4 | 해결 | 답신의 "marked C"와 송장 규칙이 모두 필요하다 |
| 1-⑧ 011-Q4 | 부분 | 권고 문항을 그대로 넣었다. 하지만 길이에 관한 보기가 하나뿐이라 이메일만으로 소거된다 |
| 1-⑨ 015-Q3 | 부분 | 평가문의 "The new surfaces addressed…"가 결론을 미리 말한다 |
| 1-⑩ 015-Q4 | 부분 | 시간 수치 보기가 D 하나뿐이라 평가문만으로 풀린다 |
| 2 001-Q1 | 해결 | |
| 3 004 날짜 | 해결 | "later this month" |
| 4 006 출입문 | 해결 | 날짜별 집합 장소로 바뀌었다. 대신 p7-1-002와 겹친다(공통) |
| 5 010-Q5·015-Q5 | 해결 | |
| 6 날짜 비교 틀 | 해결 | 004-Q3에만 남았다 |
| 7 요청 이메일 + 표 | 부분 | 012는 결정 기록으로 바뀌었다. 010·014는 그대로이고 011·012도 비슷한 구성이다 |
| 8 Q1 purpose | 해결 | 11/15다(007·009·011·013이 다른 유형) |

참고 항목은 대부분 해결됐다(003 용어, 005-Q3, 008, 007 ko, 015-Q4 "12.5분", 013-Q1, 012 이메일). 남은 것은 006-Q4 오답 약함과 007·008 난이도다.

### 공통 (12차 권장 1)
| 겹침 | 상태 |
|---|---|
| 신입 오리엔테이션 | 부분. p6-1-001·027은 바뀌었지만 **p7-1-002와 p7-2-006**이 둘 다 "신입 교육, 오전 10시, training suite, 시연"이다 |
| 사내 장비 대여 | 해결. p6-1-013과 p6-1-022가 바뀌었다 |
| 임시 수령 + 냉장 예외 | 해결. p7-1-030이 문서 전달 전산화로 바뀌었다 |
| 옛 공간 개관 | 해결. p7-1-024가 사무실 이전으로 바뀌었다 |
| 스캐너(참고) | 미해결. p7-1-004 / p7-2-002 |

---

## 2. 새로 생긴 문제

### p1-1.json

**권장**
- **034 explain:** "유리 피처은" → "유리 피처는".
- **044 B ko:** "탁자 윗면에서 바깥쪽을 향하도록" → "의자들이 탁자 반대쪽을 향해 놓여 있다."
- **053 B ko:** "포장 해체되고 있다" → "사무용품들의 포장이 책상 옆에서 풀리고 있다."

**참고**
- **사물 사진 18문항이 모두 난이도 3이다.** 명세 규칙은 "사물 사진은 난이도 1~3을 섞는다"다. 전체 비율 15/27/18을 지키려면 사물 4~5문항을 2로 내리고, 인물 사진을 같은 수만큼 3으로 올린다.
- 사물 사진 14문항(043·045~048·050~052·054~056·058~060)에 "being + 없는 작업자" 오답이 남아 있다. 044·049처럼 위치·방향·개폐 상태 오답으로 바꾼다.
- 044: 확대하면 영사기 앞면에 작은 글자가 보인다(원본 크기에서는 읽히지 않는다). 044·049는 trap 값이 모두 "position"이라 방향·상태 문항과 구분되지 않는다.

### p6-1.json

#### 필수
1. **p6-1-028-Q2 | 1 | 지문 시점과 정답이 어긋나 정답이 둘로 읽힌다**(직접 확인).
   - 근거: 1문단은 "We are replacing the single shared folder… Please {1} the existing files by campaign **before the transfer**"라고 한다. 아직 전환 전이라는 말이다.
   - 그래서 "Access {2} only to the people on the confirmed membership lists."에는 will be granted가 자연스럽다. 정답 has been granted를 받치는 근거는 이어지는 "The audit log records every approved account as activated." 하나뿐이다. 이 문장은 13차 규칙에서 금지한 완료 기록 단서이기도 하다.
   - 고칠 방법(둘 중 하나):
     - 정답을 will be granted로 바꾸고 로그 문장을 지운다. 보기는 will be granted / was granted / had been granted / is granting으로 한다.
     - has been granted를 유지한다면 시점을 맞춘다. "before the transfer" → "now that the new folders are live", 로그 문장 → "Several partners have already opened their new folders."

#### 권장
1. **tense 새 공식 | 3·7 | 미래형이 하나뿐인 보기 세트에 정답 will**(직접 확인).
   - 근거: 보기 {과거, has p.p., had p.p., will}에 정답이 will인 문항이 10개다(006·008·010·011·013·014·016·022·025·027, 007은 able to 변형). 단서도 대부분 인접 문장의 예약·개시일이다("booked for…", "due on…", "begins next Monday"). had p.p.는 늘 바로 지워진다.
   - 고칠 방법:
     - 4~5문항은 보기에 미래형을 2개 넣는다(will V / will be V-ing / will have p.p.). had p.p. 자리는 is V-ing나 would로 바꾼다.
     - 2~3문항은 정답을 현재진행이나 현재완료로 돌린다.
     - "booked" 단서(006·019·023)는 하나만 남긴다.
2. **완료 기록 단서 | 7 | 13차 규칙 위반.**
   - 근거:
     - 001 "signed scope sheet was circulated", 003 "attendance sheets are now filed", 005 "Both delivery receipts are attached"
     - 012 "completed transcript on my desk", 015 "The attached summary covers every response", 018 "It was circulated"
     - 021 "signed findings reached management", 024 "completed inspection report was filed", 028 "audit log records…"
   - 고칠 방법: 4~5지문의 단서를 사건 순서·결과 상태·관계자 발언으로 바꾼다. 예: 024 → "The lockers were fitted last weekend, and staff began using them on Monday." 012는 2문단 자체가 단서용이라 Q2를 pos나 connector로 바꾸고 1문단에 합친다. 헤딩의 "11:30 A.M."은 옛 판의 흔적이니 지운다.
3. **006-Q2 | 3 | 정답이 단어 반복으로 풀린다.**
   - 근거: 정답 "…are highlighted in blue."와 다음 문장 "These highlighted areas…". highlighted를 쓴 보기가 정답뿐이다.
   - 고칠 방법: 다음 문장 → "These fields must remain readable when an invoice is uploaded." 오답 "advertising slogans" → "The shaded sections show where suppliers may add optional delivery notes."
4. **022-Q3 | 3 | 정답이 단어 반복으로 풀린다.**
   - 근거: 정답 "laptop **normally** used by your **presenters**"와 두 문장 뒤 "computer that **normally** runs your **presentations**". 또 "the test"는 가리키는 말이 없다.
   - 고칠 방법: 정답 → "Please have your own presentation laptop ready for the assessment." / "for the test" → "for the assessment".
5. **문장 고르기 정답이 "색 표시"인 지문 3개 | 7.**
   - 근거: 002 green label, 006 highlighted in blue, 012 highlight yellow. 셋 다 다음 문장이 그 표시를 가리킨다.
   - 고칠 방법: 012나 002 하나를 절차형 정답으로 바꾼다.
6. **문항 순서·빈칸 위치가 번갈아 고정 | 7.**
   - 근거:
     - vocab/tense/sentence/pos: 018·022·024·026·028
     - vocab/sentence/대명사·관계사/tense: 017·021·023·025
     - sentence가 Q1이고 1문단 셋째 문장: 019·029·030·032
     - 001~016에서도 vocab → tense → connector → sentence가 10/16이고, 010·011·012가 3연속이다
   - 고칠 방법: 위 각 묶음에서 1~2지문씩 순서를 바꾼다.
7. **엉뚱한 오답 | 6 | 규칙 위반.**
   - 029-Q1 A "prints the standard carton sizes on warehouse shelves" → "Operators now pick the closest standard size and add less padding."
   - 025-Q2 D "…performers seeking rehearsal space" → "Partners on the waiting list will be contacted in the order they applied."
   - 018-Q3 D "suppliers' office hours" → "It applies last year's parts usage to one bid only."
   - 021-Q2 D "product catalog … retail price" → "Each unit receives a code linked to the inspector who tested it."
   - 013-Q1 오답 2 "permanent salary increase" → "Employees may instead request reimbursement after returning from the trip."
8. **008 ↔ p7-1-017 | 7 | 파일 간 소재 겹침.** 둘 다 시제품 대여, 반환 시 점검, "판매 상품 아님" 표기다. → 008을 "시제품 패널 성능 시험 결과 통보"로 바꾼다.
9. **026 ↔ 006 | 7 | 파일 안 소재 겹침.** 둘 다 주문 번호가 맞지 않는 문서를 대조하는 이야기다. → 026의 불일치를 "선반 위치 코드와 시스템 위치 불일치"로 바꾼다.
10. **012 2문단 | 5.** "Our editor {2} the recording in full. I have the completed transcript on my desk."는 1문단 "Attached is the transcript"와 겹친다. 해설 "현재 검토하고 있으므로"도 지문에 없는 내용이다. → 권장 2와 함께 고친다.

#### 참고
- 001-Q3: 보기 넷이 모두 "The reviewers"인데 지문은 "auditors"다. → auditors.
- 002 2문단: 새 체계를 소개하기 전에 "The last branch cannot yet use…"가 나온다. → "The software team {2} the replacement system across all five branches. Four branches already use it; technicians are still configuring the last one."
- 009-Q4: 정답의 reference가 다음 문장 "the visitor's reference"와 겹친다. → "Please bring the claim number L72 when you arrive."
- 010-Q4: 정답과 오답 1이 같은 "~ form" 틀이다.
- 011: "The start date is…" → "The trial begins on…".
- 012 4문단: designer → editor.
- 017 3문단: "the old address"와 "the temporary test page"가 소개 없이 나온다. → "Since April 10, the temporary test page has displayed only a link to the permanent portal. The data team {4} that page."
- 022-Q1: 관사 "A"가 optional을 먼저 지운다. → selective.
- 023-Q1: 오답 transfer가 약간 통한다. → publish.
- 023: 난이도 3이 과하다. → 2.
- 027: 초대장에 설명회 일시·장소가 없다. → "The briefing will take place in Room 4B on May 9 at 2 P.M."
- 027-Q3 해설: 주어를 잘못 짚었다. → "to speak의 의미상 주어 a supervisor와 일치하지 않는다."
- 022·027 ko: 빈칸 뒤 동사가 빠졌다. 021 ko: 존대·평서가 섞였다.
- 소재가 가깝다: 003/013(출장 경비), 012/017(인터뷰 녹음), 015/032(설문), 004/021(하우징 검사).
- 회사명이 비슷하다: Veldrin Components(001) / Veldrin Systems(p7-1-018) / Veldra(029).

### p7-1.json

#### 권장
1. **005-Q1 | 1 | 다른 문항의 답이 드러난다.** "Why is Mr. Pell suited to the afternoon session?"이 Q2 정답("willing to take the afternoon presentation")을 전제한다. → q "What is indicated about the afternoon session?" / 정답 "It allows extra time for discussion." / 오답 "It will be introduced by Ms. Brin", "It focuses on measuring liquids", "It is intended for sales staff".
2. **014-Q1 explain | 2 | 옛 지문 기준이다.** 해설은 "서로 다른 직원이 요청을 받아"인데, 지문은 "Reception maintained separate lists for emailed requests"다. → "첫 문단에서 접수팀이 이메일 요청을 별도 목록으로 관리해 두 팀이 같은 방을 받기도 했다고 한다."
3. **015-Q1 | 6·2.**
   - 오답 "A manufacturer designing industrial machines."와 "A retailer planning a tool sale."이 엉뚱하다. → "A professional restorer seeking advanced techniques." / "A furniture supplier training its delivery crews."
   - explain의 "전문 가구 복원가를 양성하는 과정은 아니다"는 지워진 옛 문장을 가리킨다. → "골동품 감정이나 공구 판매와는 관련이 없다."
4. **023-Q2·Q3·Q4 | 2·6 | 오답이 옛 지문 기준이다.** "information desk", "signs", "labels", "accessible route", "tasting table"은 현재 대화에 없는 말이라 바로 지워진다.
   - Q2: C → "The stage performances should begin later." / D → "Every printed program must be replaced."
   - Q3: A → "The bread sellers have already left the square." q → "Why does Ms. Voss rule out a second delivery?"
   - Q4: A → "Ask the stage host to make an announcement" / C → "Request a second delivery from the bakery"
5. **026-Q2·Q3·Q4 | 2·6**(직접 확인).
   - Q2: 정답 "Water from the regular supply can be added."는 지문 그대로다. → "The tank is topped up with ordinary tap water."
   - Q3 explain: "제어판이 잘 보이지 않아"라고 했지만 지문은 "level display was behind the workshop"이다. 오답 A "second depot had received funding"도 옛 지문 소재다. → explain "작업장 뒤에 있는 수위 표시를 보지 못해…" / A → "To show when the second filter needs cleaning".
   - Q4 explain: [4]를 배제하는 근거가 틀렸다. → "[3] 앞에서 경고등을 소개하고 뒤에서 직원이 이 신호에 따랐다고 하므로 불빛의 의미는 그 사이에 와야 한다. [4]는 관리자 발언과 세척 기준 유지 사이라 황색등 설명이 끼어들 자리가 아니다."
6. **채팅 흐름·문항 순서 | 7 | 규칙 위반.**
   - "문제 → 있는 것으로 대체" 흐름이 009·023·025다. 009와 023은 시식 + 인쇄물 정정 소재까지 같다.
   - 4문항 채팅 023·025·027은 문항 순서가 셋 다 detail → intention → inference → detail이다.
   - 고칠 방법: 027을 purpose → detail → intention → inference 순서로 바꾼다. 009나 023 중 하나를 일정·담당 조율 대화로 바꾼다.
7. **013 / 014 | 7.** 연속 세트가 같은 뼈대다(N 근무일 전 예약·정보 제출 → 없으면 밀림·해제). → 013의 목적을 "견적 오류 감소 확인"으로 바꾼다. 아래 8의 p6-1-003 겹침도 함께 풀린다.
8. **파일 간 새 겹침 | 7.**
   - 013 ↔ p6-1-003: 시범 상담 창구 → 수요 기록 → 인력 배치 결정
   - 017 ↔ p6-1-008: 시제품 대여(p6 권장 8과 같은 쌍이니 한쪽만 바꾼다)
   - 026 ↔ p7-2-015: 시범 완료 보고 + 기록표 → 026을 4개월 차 중간 보고로 바꾼다
9. **파일 안 새 겹침 | 7.**
   - 022 / 012: 장비 대여 + 반납 후 점검 → 022 1문단 마지막 문장을 "Each item's location is shown in a shared online list."로 바꾼다.
   - 024 / 025: 연속 세트가 이전·포장 소재다 → 025를 지점 간 비품 이송으로 바꾼다.
   - 030 / 004: 스캔해서 검색 가능한 파일을 만드는 소재다 → 004를 라벨 프린터 광고로 바꾼다(공통의 스캐너 겹침도 함께 풀린다).
10. **반복 구조 | 7.**
    - "업체 제공 vs 이용자 책임"이 018·019·020으로 연속 3세트다. → 019 마지막 두 문장을 수령 일정 안내로 바꾸고, Q2를 수령 기간 문항으로 바꾼다.
    - "요금 + 기간 내 혜택" 광고가 004·015·020이다(위 9에서 004를 바꾸면 해소된다).
11. **사내 교육 소재가 016·018·028(+027 고객 교육) | 7.** 022·028의 "연습 후 독립 작업 승인" 모티프도 같다. → 016을 외부 현장 점검 일정표로 바꾼다.
12. **"새 절차 → 제출물 필수 기재 항목" | 7.** 018·022·030에 있다. 11과 함께 정리한다.

#### 참고
- 008-Q2: 본문이 바뀌어 질문의 "four-week"가 무의미해졌다. → "What is included with every rental in Bellmere?"로 바꾸고 마지막 절을 지운다.
- 012-Q2: 질문의 "immediate deposit refund"는 전제부터 어긋난다. → "What could delay the return of the deposit?"
- 014: "Released times immediately appear…"와 "the calendar displays these changes immediately"가 반복된다. 뒷문장을 지운다. ko Q3 B "회의실" → "시연실", organizer "주최자" → "예약 담당자".
- 005 2:05 "That sounds like my corner of the field" → "That's more my territory."
- 001 9:12: 카드 출입 설정이 약하다. → "The courier can't come in—the entrance only opens with a staff card, and mine is in my coat upstairs."
- 015 1문단: 광고 문체가 아니다. → "The course is designed for staff who look after office furniture alongside their administrative duties."
- 013 ko: "최소 하루의 근무일을 두고" → "최소 근무일 하루 전에".
- 025-Q4 explain: "보내겠다고 한다"는 지문에 없다.
- 024-Q3, 030-Q2: 지문에 직접 나오는 내용인데 type이 inference다. → detail.
- 016-Q1 "first check-in" → "By what time must the team check in?"
- 030: 삽입문 its 지시 → "check that every line is legible." heading과 본문의 날짜 형식이 섞였다.
- 형식: 029-Q2 보기 마침표, 019 ko Q2 D 어미, 023 ko "시작할 때" → "시작될 때".
- 회사명 유사: Veldrin Systems / Velrin Consulting.

### p7-2.json

#### 권장
1. **연계 문항이 한 지문만으로 풀린다 | 4 | 12문항.**

   | # | 문항 | 한 지문으로 풀리는 이유 | 고칠 방법 |
   |---|---|---|---|
   | ① | 001-Q4 | "portable grill"은 광고 없이 상식으로 고른다. 질문에 "conflicts with Merevale's rules"가 들어 있다 | 광고 "Customers may bring their own food, but reception cannot accept deliveries on customers' behalf." / 이메일 "Rina will have hot soup delivered to our room from a café" / q "Whose lunch plan will Merevale be unable to accommodate?" |
   | ② | 002-Q4 | 오답 셋이 이메일만으로 지워진다 | 오답을 공지가 있어야 지워지는 것으로 바꾼다: "He has been placed on a waiting list", "He has received only an automatic acknowledgment", "He has been assigned to the advanced class" |
   | ③ | 003-Q3 | 메모만으로 풀린다(정답이 메모 문장을 바꿔 말한 것) | 보기를 보스 씨에 관한 편지상 사실로 바꾼다: A* "She is not on the company's staff" / "She hopes to bring a guest" / "She found an assembly-line photograph" / "Her repair work took place last spring". 편지 문장은 "I run an independent joinery business."로 줄인다 |
   | ④ | 005-Q3 | 질문 "Why does the revised equipment expense meet the grant rules?"와 웹페이지 규칙 하나로 정해진다 | q "Which item in Mr. Merrow's original budget would most likely have been rejected?" / A* "The camera purchase" / "The camera rental" / "The transport costs" / "The village hall presentation" |
   | ⑤ | 007-Q3 | 드루 이메일만으로 "most likely" 소거가 된다. 놀린 이메일의 noon이 시험되지 않는다 | 보기: A* "A lodge shuttle will meet his bus" / "He must arrange transport because his bus is not covered" / "His request will be refused as too late" / "He will be able to enter his room at noon" |
   | ⑥ | 010-Q4 | 표 지문의 "not an additional selection interview"만으로 풀린다 | q "What is true about Ms. Toven's mentoring sessions?" / 정답 "They will be held on Tuesday mornings for the whole cycle"(메모 6주 동일 시간 + 표 Oris 화 10:00 + 이메일 조건) |
   | ⑦ | 011-Q4 | 길이에 관한 보기가 하나뿐이라 이메일만으로 소거된다 | C → "It was too long for the main warehouse's loading yard" (별관 8m 제한을 확인하려면 공지가 필요해진다) |
   | ⑧ | 012-Q3 | 질문의 "comply with the expo's indoor restrictions" + 이메일의 규정 재진술 + 상식으로 풀린다 | 이메일 뒷절 → "Assembly is the step visitors would see." / q "What is suggested about the work Ms. Benn's factory does before shipment?" / 정답 "It would not be permitted in the exhibition hall" |
   | ⑨ | 012-Q4 | 기록 지문만으로 소거된다 | q "When will Ms. Benn's customer call take place?" / ["Between her two morning demonstrations", "Between her second morning demonstration and her afternoon one", "After her afternoon demonstration", "Before her first demonstration"], answer 1 |
   | ⑩ | 013-Q3 | 웹페이지 "Payment follows publication"만으로 시점이 정해져 소거된다 | 보기 ["$180 after publication", "$220 after publication", "$180 upon acceptance", "$220 upon acceptance"] |
   | ⑪ | 015-Q3 | 평가문 "The new surfaces addressed a recurring practical difficulty…"가 결론을 미리 말한다 | 그 문장을 지운다 |
   | ⑫ | 015-Q4 | 시간 수치 보기가 D뿐이라 평가문 "less than half the time"만으로 풀린다 | 표에 "Longest reset" 열(Maple 20 / Birch 31)을 넣고 보기 B를 "Twenty minutes compared with thirty-one minutes"로 바꾼다 |

   - **판정:** 30문항 중 18문항은 통과한다. 통과한 것은 001-Q3, 002-Q3, 003-Q4, 004-Q3·Q4, 005-Q4, 006-Q3·Q4, 007-Q4, 008-Q3·Q4, 009-Q3·Q4, 010-Q3, 011-Q3(오답 약함), 013-Q4, 014-Q3·Q4다.
   - **공통 원인:** 오답이 한 지문만으로 지워진다(②⑤⑦⑨⑩⑫). 질문이나 후속 지문이 규정이나 결론을 말한다(①④⑧⑪).
   - **수정 원칙(13차와 같음):** 오답 셋은 "다른 지문에서는 참이지만 이 질문의 답은 아닌 것"으로 쓴다.
2. **"두 선택지 중 이메일 조건으로 하나 고르기" | 7.**
   - 해당 문항: 001-Q3, 002-Q3, 006-Q3·Q4, 008-Q3.
   - 002와 006은 뼈대까지 같다(교육 2회차 공지 + 참가 이메일 + 시각 계산 + 준비물).
   - "요청 이메일 + 표 매칭"도 010·014에 남았다(011·012도 비슷하다).
   - 고칠 방법: 006의 연계를 서류·자격 축으로 바꾼다. 002·005의 Q5(무엇을 요청하는가)를 inference나 not-true로 바꾼다.

#### 참고
- 006-Q4: 오답 C·D가 어느 지문에도 없어 사실상 2지선다다. → "At the store's delivery entrance", "In the display sample storage area". Q3과 같은 연결(morning → July 6)을 두 번 쓴다.
- 006-Q5: 첫 문서에서 출제돼 이메일 뒷부분이 군더더기가 됐다.
- 001-Q3: 오답 두 개가 실제 대여 공간이 아니다.
- 004-Q3 오답 B → "It is one day after the deadline".
- 008-Q1 오답 B → "To announce a change in session times".
- 011-Q3: 오답 A·C가 지문에 없다. → "In the main loading yard after February 14" 등.
- 012 이메일 → "I have a call scheduled with a customer at twelve thirty that day to discuss a contract." 012 기록 "remains twenty minutes" → "will last twenty minutes".
- 009-Q3 explain "이메일의 승인 수량" → "답신에서 승인한 수량". 009-Q1 ko "근무일" → "영업일". 009-Q5, 014-Q5: 정답이 지문 표현 그대로다.
- ko 용어 통일:
  - 003-Q5 B "강연 프로그램" → "기술 설명회 프로그램"
  - 007 K1 셔틀 문장 어순
  - 008: badge "명찰/출입증", main lobby "메인/중앙"
  - 008 영어: lift/elevator
- 소재가 가깝다(흐름은 다름): 013/p6-1-012, 014/p7-1-019, 012/p7-1-005·p7-2-008.
- 007·008 난이도 2(삼중 지문)는 그대로다. 파일 전체 분포는 명세와 맞는다.

### 공통 (파일 간)
**권장 1 | 7 | 신입 오리엔테이션 겹침이 남았다.** p7-1-002와 p7-2-006이 둘 다 "신입 첫 교육, 오전 10시, training suite, 시연"이다. 이번 수정으로 006에 training suite와 시연이 들어가면서 더 가까워졌다.
- 고칠 방법: 12차 원칙(앞쪽 파일을 바꾼다)대로 p7-1-002를 "기존 직원 대상 생산 추적 시스템 전환 교육"으로 바꾼다. Q2(계정 활성화)는 그대로 쓸 수 있다.
- 참고: 스캐너 겹침(p7-1-004 / p7-2-002)은 p7-1 권장 9에서 004를 바꾸면 함께 풀린다.

---

## 3. 새 공식·반복 틀 정리
| 파트 | 없어진 것 | 새로 굳은 것 |
|---|---|---|
| P6 | 화면·진행 단서, still open, `{3} own`, 지시어 단서 다수, 1·2·2·3 배치 절반 | {과거, has, had, will} 보기에 정답 will 10문항, 완료 기록 단서 9지문, 색 표시 정답 3, 문항 순서 교대 고정 |
| P7-1 | 출입 소재, Please bring, 기사 결말 반복, rather than 단서 | 채팅 "문제 → 대체" 3세트, 4문항 채팅 순서 3세트, "업체 제공 vs 이용자 책임" 연속 3세트, 사내 교육·제출 절차 소재 |
| P7-2 | Q1 purpose 일색, 날짜 비교 틀, 출입문 폐쇄 | "두 선택지 중 조건으로 고르기" 4세트, 오답이 한 지문으로 지워지는 crossRef |

수정할 때마다 같은 자리에 다른 공식이 생기는 경향이 있다. 다음 수정 지시에 아래 세 줄을 함께 넣기를 권한다.
1. P6 tense 보기에는 미래형을 0개나 2개 넣는다.
2. 단서 종류(일정, 기록, 결과, 발언)를 파일 안에서 고르게 섞는다.
3. crossRef 오답 셋은 다른 지문에서 참인 문장으로 쓴다.

## 확인하지 못한 것
- Part 1에서 바뀌지 않은 46문항의 사진은 다시 열지 않았고, 번역 텍스트만 다시 확인했다.
- p7-1의 바뀌지 않은 4세트(003·007·009·011)는 다시 풀지 않았다.
- passagesKo·paragraphsKo는 뜻이 바뀌는 오류만 봤고 문체는 보지 않았다.
- Part 2~5와의 소재 겹침은 키워드 검색으로만 봤다.
- 영어 자연스러움과 난이도는 텍스트 기준의 판단이다.
