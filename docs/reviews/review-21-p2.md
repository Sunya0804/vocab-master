# 21차 검토: 연습 Part 2 전수 재검토

## 요약

- **판정: 필수 5건 수정 후 사용 권장. 권장 9건(개별 경계 4건 + 반복·배열·번역 5건).**
- 필수: **p2-107, p2-143, p2-171, p2-174, p2-189**. 지정 정답은 적절하지만 다른 응답도 자연스럽게 성립한다. 107은 직접 긍정, 나머지는 실행 방법·대안 제시를 오답으로 처리한 문제다.
- 권장 개별 경계: **p2-101, p2-108, p2-120, p2-149**. 추가 추론이 필요하므로 필수와 구분했다.
- 명백히 잘못 지정된 정답 키·정답 부재는 발견하지 못했다. 유형 표시와 수량, 난이도 수량, 정답 분포, 길이 제한은 통과했다.
- 연습 **200/200문항**의 세 응답·번역·해설을 모두 읽었다. 비교용 모의 **125/125문항**은 발문·세 응답·정답을 읽고 소재·응답 틀을 비교했다.
- 문제 JSON과 코드는 수정하지 않았다. 이 보고서만 작성했으며 커밋하지 않았다.

## 범위와 판단 기준

작성: 작성자 B / Codex, 2026-11-12.

대상은 공유 폴더의 최신 `questions/toeic-part2.json`, 비교 대상은 `docs/mock/m-p2.json`이다. `docs/tasks/exam-spec.md`의 Part 2 규칙을 적용했다. 지시서가 지정한 `docs/reviews/review-9.md`도 읽었으나 그 문서는 Part 3·4 및 앱 기능 검토여서 Part 2의 이전 문항별 판정은 들어 있지 않다. 따라서 “9차 지적 해결 여부”를 확인했다는 주장은 하지 않는다.

각 문항에서 질문 뒤에 A/B/C를 차례로 붙여 읽었다. 요청·제안·평서문은 수락·거절뿐 아니라 선행 조건 확인, 대안, 실행 경로 안내도 응답이 될 수 있다고 판단했다. 반대로 단순히 같은 주제라는 이유만으로 모든 응답을 복수 정답으로 세지는 않았다. 별도 배경을 더 가정해야 하는 사례는 권장으로 낮췄다.

## 1. 필수 — 정답 유일성 5건

### F1. p2-107 — B가 명시적으로 Yes라고 답한다

- 질문: “Do employees need identification badges to enter the building on weekends?”
- 지정 정답 C: “Security checks everyone's badge at the entrance.”
- 문제 보기 B: “Yes, the identification badges show each employee's department and photograph.”
- **근거:** B의 Yes는 신분증 필요 여부를 긍정한다. 뒤 문장도 바로 그 신분증에 관한 부연으로, Yes를 다른 질문에 대한 응답으로 돌릴 근거가 없다. 해설은 B의 뒤 절만 보고 “기재 내용만 말한다”고 배제했다.
- 대입 판정: A는 수하물 라벨로 대상 불일치 / **B는 긍정+부연 가능 / C는 확인 절차로 긍정 가능**.
- **고칠 문장(B):** “The badge printer is leased from a local company.”
- 번역: “출입증 프린터는 지역 업체에서 임대했어요.”
- 해설의 B 설명도 “출입증 프린터의 임대 정보여서 주말 출입 요건에 답하지 않는다”로 변경. 정답 C 유지.

### F2. p2-143 — 청구서 발송 제안에 주소 안내도 성립한다

- 질문: “Shouldn't we send the invoice to the distributor today?”
- 지정 정답 B: “The system emails it automatically when the shipment leaves.”
- 문제 보기 A: “The distributor's billing address is on the contract.”
- **근거:** “오늘 보내야 하지 않나요?”라는 제안에 발송할 주소를 찾을 자료를 알려 주는 것은 실행을 돕는 간접 응답이다. 정답 B도 오늘 보내야 하는지를 직접 Yes/No로 답하지 않고 발송 절차를 말한다. 따라서 A만 “주소를 말하므로 오답”으로 제외하는 기준은 일관되지 않다.
- 대입 판정: **A는 발송에 필요한 정보 출처 안내 / B는 자동 발송 절차 안내** / C는 보관 순서로 발송 제안과 기능이 다름.
- **고칠 문장(A):** “The distributor's address label uses a smaller font.”
- 번역: “그 유통업체의 주소 라벨은 더 작은 글꼴을 써요.”
- 해설은 주소의 소재가 아니라 라벨 서식 정보라는 점을 설명. 정답 B 유지.

### F3. p2-171 — 과거에 줄인 휴식 시간이 대안이 된다

- 발화: “Let's remove the safety briefing to shorten the orientation.”
- 지정 정답 A: “Isn't that a condition of our insurance coverage?”
- 문제 보기 C: “We shortened the coffee break last time.”
- **근거:** 오리엔테이션을 단축하자는 말에 지난번에는 커피 휴식 시간을 줄였다고 답하면, 안전 설명 대신 그 시간을 줄이자는 대안으로 자연스럽게 들린다. 해설의 “과거 사실이므로 이번 제안에 대한 응답이 아니다”는 간접 응답을 배제할 충분한 이유가 아니다.
- 대입 판정: **A는 삭제에 대한 이의 / C는 같은 목적을 달성하는 대안의 상기** / B는 언어 정보.
- **고칠 문장(C):** “The orientation booklet has a photograph of the cafeteria.”
- 번역: “오리엔테이션 안내 책자에는 구내식당 사진이 있어요.”
- 해설·trap도 새 보기의 단어 반복에 맞춘다. 정답 A 유지.

### F4. p2-174 — 자료 공개 요청에 전달 경로를 알려 줄 수 있다

- 발화: “Please release the revised specifications to our external partners today.”
- 지정 정답 A: “Has engineering signed off on the latest changes?”
- 문제 보기 B: “Our partners receive updates through a secure portal.”
- **근거:** 자료를 협력사에 공개해 달라는 요청에 통상 배포 채널을 알려 주는 것은 요청 실행 방법을 설명하는 간접 응답이다. 발화에는 포털 공개를 배제하는 조건이 없다. 승인 확인(A)과 전달 경로 안내(B) 모두 같은 업무의 후속 대화가 된다.
- 대입 판정: **A는 공개 전 승인 확인 / B는 공개 경로 안내** / C는 협력사가 수정한 배송 조건으로 대상이 다름.
- **고칠 문장(B):** “The partners' company logos appear at the top of the portal.”
- 번역: “포털 상단에는 협력사들의 회사 로고가 표시돼요.”
- 해설의 B를 “포털 화면 구성”으로 변경. 정답 A 유지.

### F5. p2-189 — 설명서가 자가 조치라는 대안을 암시한다

- 발화: “The replacement technician won't arrive until after our event.”
- 지정 정답 B: “There's another repair company across the street.”
- 문제 보기 C: “The replacement parts come with detailed instructions.”
- **근거:** 기술자가 제때 오지 못한다는 말에 부품에 자세한 설명서가 있다고 답하면 직접 작업할 수 있다는 대안을 암시한다. B 역시 다른 업체가 지금 출동할 수 있다고 명시하지 않고 존재만으로 대안을 암시한다. C만 “도착 지연의 해결책이 아니다”라고 단정할 수 없다.
- 대입 판정: A는 견적 항목 / **B는 다른 업체 이용 / C는 설명서를 이용한 자체 조치 가능성**.
- **고칠 문장(C):** “The replacement parts are packed in separate cartons.”
- 번역: “교체 부품은 각각 다른 상자에 포장돼 있어요.”
- 해설의 C를 “부품 포장 방식”으로 변경. 정답 B 유지.

위 대체 보기들은 모두 15단어 이하이며 정답 위치·유형·난이도 수량을 바꿀 필요가 없다. 예시 수정안은 문제 파일에 적용하지 않았다.

## 2. 권장 — 개별 경계 4건

| 번호 | id | 근거와 필수로 세지 않은 이유 | 고칠 문장 |
|---|---|---|---|
| R1 | p2-101 C | “The schedule includes three workshops.”는 수령한 일정 내용을 설명하는 긍정으로 들릴 여지가 있다. 다만 내용을 안다는 것이 본인이 수정본을 수령했다는 뜻은 아니므로 B가 더 직접적이다. | C → “Last year's schedule included three workshops.” / “작년 일정에는 워크숍 세 개가 포함됐어요.” |
| R2 | p2-108 B | “The heating in that room is inspected every Thursday morning.”은 목요일 회의실 이용에 대한 제약 안내로 들릴 수 있다. 하지만 점검이 회의실 사용을 막는지, 회의가 오전인지 명시되지 않아 필수로 단정하지 않는다. | B → “The heating was inspected last Thursday morning.” / “난방은 지난 목요일 아침에 점검했어요.” |
| R3 | p2-120 A | “The payment was made by bank transfer.”는 결제 실행을 들어 조건 수락을 암시할 수 있다. 다만 수정 조건이 이체 방식인지 알 수 없어 추론이 더 필요하다. | A → “The bank transfer fee increased last month.” / “계좌 이체 수수료는 지난달에 올랐어요.” |
| R4 | p2-149 B | “The repair invoice lists separate charges for labor and scanner parts.”는 실제 수리 청구서가 있다는 점에서 수리 쪽을 선택했다고 암시할 수 있다. 다만 그 청구서가 이번 스캐너의 것인지 확정되지는 않는다. | B → “The scanner's model number is printed beside the power switch.” / “스캐너 모델 번호는 전원 스위치 옆에 인쇄돼 있어요.” |

이 네 건도 보기 교체 시 해당 한국어·해설·trap을 함께 맞춘다.

## 3. 권장 — 반복·배열·번역 5건

### R5. p2-021 ↔ p2-165 — 점심시간 접수처 대체 인력 소재 반복

- 021: 점심시간에 접수처를 누가 대신 맡을지 묻고 “Everyone on my team is with a client.”로 불가 사정을 말한다.
- 165: 정오 점심시간에 접수처를 대신 봐 달라고 하고 “I'm scheduled to interview a candidate at noon.”으로 거절한다.
- wh/request 표면 유형은 다르지만 **점심시간 접수처 대체 인력 요청 → 다른 업무 때문에 불가**가 같다.
- 165를 다른 업무로 변경하는 예:
  - q: “Would you oversee the software migration during my afternoon appointment?”
  - B: “I'm presenting the quarterly results then.”
  - A: “The software license is valid for another year.”
  - C: “The appointment letter uses our new company logo.”
- request·난이도 2·정답 B를 유지하면서 번역·해설도 재작성한다.

### R6. p2-003·036·043·049·056·061 등 — 일정 질문에 미완료 선행 조건을 반복

- 003 부품 대기, 036 은행 인증 대기, 043 명단 대기, 049 일정 확인 중, 056 수리 승인 대기, 061 근무표 논의 중이다.
- 개별적으로는 가능한 정답이다. 문제는 간접 응답의 어려움이 반복해서 “아직 안 됐으니 모른다/기다린다” 하나로 수렴하는 점이다.
- 일부는 기존의 간접 응답 비율을 유지하며 전제 정정으로 바꾼다.
  - 003 C 예: “We're collecting it ourselves instead of having it delivered.”
  - 번역: “배송받는 대신 저희가 직접 가지러 가기로 했어요.”
- 이 경우 기존 A의 배송비를 묻는 정보가 아니라 배송 자체를 정정하는 응답임을 해설에 반영한다. 모든 대기형을 없애라는 뜻은 아니다.

### R7. p2-006·011·018·028·039 등 — 자료·담당자 존재를 되묻는 정답 반복

- 006 교육 동영상, 011 수정 일정표, 018 프린터 공지, 028 권장 안내문, 039 유사 청구를 처리한 동료를 되묻는다.
- 특히 “Didn't … send …?”가 011·028에서 같은 정보 출처 안내 기능을 맡는다. “Why …?”의 간접 답도 058·078·098에서 되묻기로 원인을 상기시킨다.
- 대체 예: 028 A → “Let's confirm the wording with IT before contacting anyone.”
- 번역: “누구에게 연락하기 전에 전산팀과 안내 문구를 확인해 봐요.”
- 자료 존재를 되묻는 틀을 협의 제안으로 바꾸되, 다른 문항들까지 동일한 “Let's confirm”으로 바꾸지 않는다.

### R8. p2-001~200 — 유형·난이도 배치가 블록으로 드러남

- 001~100은 매 10번째가 choice이고 나머지가 wh다.
- 101~130 yesno, 131~145 negative-tag, 146~150 choice, 151~175 request, 176~200 statement로 묶인다.
- 101~115는 난이도 1, 151~160도 난이도 1이 연속이고, 186~200은 난이도 3 평서문에 간접 응답이 몰린다.
- 수량은 정확하지만 원본 순서로 연속 학습할 경우 다음 문항의 유형과 응답 방식을 예상하기 쉽다. **문항 문장 수정 대신 학습·출제 단계의 순서 혼합 권장.** 앱에서 이미 매번 무작위로 출제한다면 파일 재배열은 불필요하다. 이번 검토는 앱의 출제 순서까지 확인하지 않았다.
- id·정답 키를 임의로 재부여할 필요는 없다.

### R9. p2-135 ko.q — 동일 인명 표기 통일

- 041의 Ms. Okafor는 “오카포르 씨”, 135는 “오카포 씨”다.
- 정답 판정에 영향을 주는 오역은 아니지만 같은 이름 표기가 다르다.
- **고칠 문장(135 ko.q):** “오카포르 씨가 해외 채용을 담당하는 거죠?”
- 그 외 질문·응답의 의미 또는 부정 의문문 정답 극성을 뒤집는 명백한 번역 오류는 발견하지 못했다. 132의 Yes → “예약했어요”, 137의 No → “네, 없어요”는 한국어 응답 관습에 맞으므로 수정 대상이 아니다.

## 4. 모의고사와의 소재·응답 패턴 비교

125문항의 발문과 세 보기를 모두 대조했다. 대소문자·문장부호·공백을 정규화한 발문 완전 일치, 보기 완전 일치는 각각 0건이다. 이는 의미상 중복이 없다는 자동 증명은 아니며, 아래는 별도 독해 결과다.

**같은 구체적 상황과 해결책을 그대로 다시 쓴 것으로 단정할 만한 쌍은 발견하지 못했다.** 연습의 일반 사무·행사·출장과 달리 모의는 제조 공정·기술 설정·계약 권리 등 구체적인 소재를 더 사용한다. 다만 다음 응답 기능은 공통이다.

| 연습 | 모의 | 공통점 및 판단 |
|---|---|---|
| p2-171 안전 설명 삭제 → 보험 조건 확인 | m-p2-3-13 연령 확인 생략 → 판매 허가 조건 | 필요한 절차를 없애자는 제안에 의무 조건으로 반대. 틀은 같지만 소재·조건은 다름. 연습 171의 복수 응답부터 수정. |
| p2-175 출입 권한 연장 → 보안 관리자 | m-p2-1-19 독점 조항 삭제 → 법률 자문가 | 권한 있는 담당자에게 미룸. 업무 대상은 달라 직접 소재 복제로 보지 않음. |
| p2-036 사용 개시 → 은행 인증 대기 | m-p2-1-25 인수 발표 → 매도자 이사회 의결 대기 | 선행 승인 대기라는 응답 기능 반복. R6의 연습 내부 반복과 함께 조정 권장. |
| p2-164 경비 DB 접속 승인 | m-p2-5-07 실제 고객자료 없이 스캐너 시험 | 둘 다 데이터 접근이지만 권한 부여 담당자 안내와 시험용 자료 확보로 과업이 다름. 중복 판정하지 않음. |

모의고사의 정답 유일성·번역까지 재검토한 것은 아니다. 이번 모의 읽기는 연습 파일과의 소재·패턴 비교 목적이다.

## 5. 유형·난이도·간접 응답 판정

- wh 90개는 Who/What/When/Where/Why/How 각 15개다. 042의 “What time”은 시간 질문이지만 표면 의문사 집계에서는 What에 포함된다.
- 018 “Why aren't …?”는 이유를 묻는 wh로, 167 “Why don't we …?”는 제안 기능의 request로 맞다.
- 179 “I think we should …”는 제안 기능도 있지만 평서문 형식의 statement로 분류한 것이 명백한 오류는 아니다. 181의 간접 전달 요청도 원 발화가 평서문이므로 statement를 유지할 수 있다.
- 난이도 수량 50/90/60은 명세와 일치한다. 쉬운 직접 응답, 보통의 부정·선택 의문문, 어려운 간접 응답이라는 큰 구분도 유지된다.
- 간접 응답은 **80/200 = 40%**로 기준 35~45% 안이다. 단순히 Yes/No가 없다는 이유로 세지 않고, 모름·확인 유보·담당자 안내·상황 추론·되묻기 등을 확인했다. 해설의 “간접” 표시 80개와도 일치했다.
- 유형별 간접 응답: wh 36, choice 4, yesno 10, negative-tag 5, request 10, statement 15.
- `trap`은 문항 단위 태그 배열이다. 두 오답의 태그를 독립적으로 지정하는 스키마는 아니므로 태그 수가 1개인 경우만으로 누락 판정하지 않았다. 필수 보기 교체 시 기존 해설·태그의 근거도 다시 맞춰야 한다.

## 6. 기계 점검 출력

공유 원본을 Node.js로 읽어 집계했다. 단어 수는 공백 기준이다.

```text
questions: 200
type: wh=90, choice=15, yesno=30, negative-tag=15, request=25, statement=25
difficulty: 1=50, 2=90, 3=60
answer: A=68, B=66, C=66
wh first word: Who=15, What=15, When=15, Where=15, Why=15, How=15
bad choices/ko/answer/explain/trap: 0
max question words: 13
max choice words: 12
over 15 words: 0
exact duplicate practice questions: 0
normalized exact practice/mock questions: 0
normalized exact practice/mock choices: 0
indirect responses: 80/200 (40%)
```

수량·형식 통과는 위 필수 5건의 언어적 유일성을 보장하지 않는다.

검토 시점 공유 원본 SHA-256:

- `questions/toeic-part2.json`: `6538c01601a86e2dbb94cd77c288e710da21e4057b55fc5cae465500a19fb17b`
- `docs/mock/m-p2.json`: `648e366be0d0054deb197bbbcb9727282c71198d194c54973af7c4161ca8add5`

## 7. 제한 및 전달

- 실제 음성·TTS 발음·억양·재생 속도는 확인하지 않았다. similar-sound 태그는 텍스트 수준에서만 검토했다.
- 해설로 정답을 먼저 정당화하지 않고 세 응답을 대입했지만, 자연 대화의 허용 범위에 대한 판정은 언어적 검토다. 그래서 추가 상황 가정이 큰 101·108·120·149는 권장 경계로 따로 남겼다.
- 보고서의 교체안은 수정 담당자가 적용할 구체적인 문장이다. 이번 작업에서는 문제 파일·코드 변경과 커밋을 하지 않았다.

