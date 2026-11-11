# 8차 리뷰: 토익 Part 3·4 (데이터 + 화면)

리뷰어: Claude (읽기 전용, 파일 수정 없음) · 기준: `docs/tasks/exam-lc-spec.md`, `docs/tasks/exam-lc-ui.md`

## 판정: **수정 필요** (데이터 중심, 화면은 1건 외 통과)

- 정답 유일성: 확정 오류 **0 / 276문항** (기준 1% 이하 → 통과). 상식만으로 풀리는 약한 오답 의심 4문항.
- 기타 오류: 대본 논리·영어·번역·해설·그래픽·의도 설계 **약 21건 (7.6%)**, 별도로 난이도 2·3 바꿔 말하기 위반 **약 21문항** → 기준 3% 초과.
- 화면: 기능·기록·백업·음성 취소·대체 표시·접근성 모두 동작. 화자 음성 성별 불일치 1건(중간).
- "본문으로 건너뛰기"가 본문 중간에 보이는 것은 **캡처 문제**(실제 화면에서는 숨겨져 있음).

## 범위
- **데이터:** Part 3 52세트, Part 4 40세트, 276문항을 **전부** 검토했습니다. 작성자 파일별로 하나씩 병렬 검토했고, 핵심 지적(p3-010, p4-030)과 통계는 제가 직접 다시 확인했습니다.
- **병합 확인:** `questions/toeic-part3·4.json`과 `docs/questions/p3-1·p3-2·p4-1·p4-2.json`을 비교했습니다. 순서와 내용이 같고 id만 바뀌었습니다(불일치 0).
- **화면:** 로컬 서버와 Playwright headless로 390px, 실제 데이터, 라이트·다크에서 확인했습니다.
  - speechSynthesis는 가짜(mock)로 바꿔 넣었습니다. 영어 음성 3개(en-US, en-GB, en-AU)를 주고, 음성 미지원 상황도 따로 확인했습니다.
  - 내장 브라우저 대신 Playwright를 쓴 이유는 음성 mock과 화면 모드 지정이 필요했기 때문입니다.
- **테스트:**
  - `node test/core.test.js` 48 passed
  - `node test/toeic.test.js` 6 passed
  - `node test/questions.test.js` 14 passed

---

## 1. [중간] 데이터: 난이도 2·3에서 정답이 대본 단어를 그대로 씀 (약 21문항)
명세는 "난이도 2·3에서는 정답을 대본과 같은 단어로 쓰지 말 것"입니다. 대표 사례만 표에 넣었습니다.

| id(원 id) | 문항 | 대본 | 정답 보기 | 제안값 |
|---|---|---|---|---|
| p3-013 (p3-1-013) | Q3 | Your manager must endorse the application | Ask her manager to authorize the application. | Get approval from her supervisor. |
| p3-023 (p3-1-023) | Q3 | scenario / abilities | Create a new scenario measuring the same abilities. | Design a different case testing the same skills. |
| p3-015 (p3-1-015) | Q3 | the disputed clause | Seek guidance about a disputed contract term. | Seek legal advice on an unresolved condition. |
| p3-041 (p3-2-015) | Q1 | information counter | At a municipal information counter | At a city government office |
| p3-036 (p3-2-010) | Q3 | debit card … at the machine | Make a card payment at a machine | Pay using an automated device |
| p3-037 (p3-2-011) | Q1 | Orndale Appliances / demonstrations | Arranging an appliance demonstration | Scheduling a chance to try a product |
| p3-040 (p3-2-014) | Q3 | travel history | … copy of her travel history | Submit a screenshot of her trip records |
| p3-044 (p3-2-018) | Q3 | route image … marked | Send a marked route image | Send a map to the man's phone |
| p3-049 (p3-2-023) | Q3 | temporary arrangement / handovers | … temporary handover arrangements | Inform customers of a new pickup procedure |
| p3-051 (p3-2-025) | Q1·Q3 | window advertising / send me a preview | window advertisements / preview | Ordering promotional signage for a store opening / Email a draft design for review |
| p3-035 (p3-2-009) | Q3 | sticker for each filling | filling labels | Prepare tags describing the contents |
| p4-015 (p4-1-015) | Q3 | Arrange a free remote demonstration | Arrange an online product demonstration | Schedule a virtual walkthrough of the service |
| p4-019 (p4-1-019) | Q3 | submit an expense claim … evidence of the payment | File a claim with payment evidence | Request reimbursement with a receipt |
| p4-018 (p4-1-018) | Q1 | uncover concerns … purchasing workflow | To gather concerns about a proposed workflow | To collect feedback on a new procedure |
| p4-017 (p4-1-017) | Q3 | itemized labor estimate | A detailed estimate for installation labor | A cost breakdown for installation work |
| p4-004 (p4-1-004) | Q2 | which recommendation | … recommendation … | Listeners missed the presenter's key proposal |
| p4-039 (p4-2-019) | Q1 | coordinate … rentals | Coordinating the availability of rental machinery | Managing which rental equipment can be booked |
| p4-040 (p4-2-020) | Q3 | check the items list in the current leasing guide | Consult the approved inventory in the leasing guide | Consult an up-to-date list of included items |

- **고칠 방향:** 위 보기를 교체합니다. 같은 작성자 파일에서 난이도 2·3 정답과 대본의 내용어(명사·동사)가 겹치는지 기계적으로 한 번 더 찾아보면 좋습니다.
- **작성자별 쏠림:** p3-2가 가장 많습니다(약 9문항).

## 2. [중간] 데이터: 그래픽 문항 설계 (그래픽 20문항 중)

| id(원 id) | 문항 | 문제 | 제안 |
|---|---|---|---|
| p4-030 (p4-2-010) | Q2 | 질문 "Which counter handles approved replacements?"만 봐도 replacement가 표의 Exchanges와 바로 이어집니다. 대본 4행도 "should use Exchanges on the sign"이라고 직접 말해서 대본이 필요 없습니다. | 질문을 "Look at the graphic. Which counter does the speaker tell customers with broken items not to use?"로 바꾸고 정답을 Counter 2로 합니다. 근거는 5행입니다. |
| p3-010 (p3-1-010) | Q2 | 표에 방이 3개뿐이라 (D)를 "None of the listed rooms."로 채웠습니다. 실제 시험에는 없는 보기 형식입니다. 정답(Juniper)은 하나로 정해지므로 정답 오류는 아닙니다. | 표에 `["Cedar","30","Yes"]`를 추가하고 (D)를 "Cedar."로 바꿉니다. 대본 5행은 "Neither of the smaller rooms with a video link would fit"으로 바꿉니다. |
| p3-002 (p3-1-002) | Q2 | 대본의 "organize data in spreadsheets"가 표의 "Spreadsheet Shortcuts"와 같은 단어입니다. 다른 강좌가 빠진다는 것까지 말해 줘서 너무 쉽습니다. | 대본을 "quicker ways to handle large data tables"로 바꿉니다. |
| 9문항 | 보기 순서 | 보기가 표 순서와 다르게 섞여 있습니다. 실제 시험은 표 순서대로 냅니다. 해당: p3-002, p3-010, p3-012, p3-018, p3-044, p3-048, p4-014, p4-035, p4-038 | 보기를 표 순서로 정렬하고 answer를 다시 매깁니다. 정렬 후 정답 위치 분포(A~D 각 20~30%)를 다시 확인합니다. |

## 3. [중간] 데이터: 의도 문항에서 인용문 바로 뒤에 뜻을 풀어 줌

| id(원 id) | 문항 | 문제 | 제안 |
|---|---|---|---|
| p4-003 (p4-1-003) | Q2 | 바로 다음 줄 "I'm referring to the unpaid items in our shared queue, not the printed training materials…"가 뜻을 직접 설명합니다. 또 "That folder"는 앞에서 가리키는 대상이 없습니다. | 3행에 "…in the shared approval folder"를 먼저 넣고, 5행은 "Some of those invoices are already past their due dates."로 바꿉니다. 그러면 오답 (A)의 근거가 사라지니 (A)도 바꿉니다. |
| p4-015 (p4-1-015) | Q2 | 다음 줄 "That means less repetitive checking…"이 뜻을 그대로 말합니다. | 4행을 "Most clients finish the weekly pay run in minutes, and your staff's hours and pay dates stay exactly the same."로 바꿉니다. |
| p4-008 (p4-1-008) | Q2 | (추측) "We don't have to start from zero"는 관용 의미가 분명해서 인용문만으로 풀립니다. | 인용문을 "Most of the packet still holds up."로 바꾸거나, 오답 (C)를 그럴듯하게 바꿉니다. |
| p4-040 (p4-2-020) | Q2 | 앞 문장이 "The camera has been generous"의 뜻을 바로 말해 줘서 난이도 3치고 쉽습니다. | 앞 문장을 덜 직접적인 표현으로 바꿉니다. |

- 참고로 Part 3 의도 문항 8개는 모두 맥락으로만 풀리게 잘 만들어졌습니다.

## 4. [중간] 화면: 화자 음성이 성별과 무관하게 배정됨 — `app.js:765-767`
- **문제:** 음성 목록은 억양 순서(en-US → en-GB → en-AU …)로 만들고, 화자는 대본에 처음 나온 순서대로 음성을 받습니다(`pool[speakers.indexOf(line.s)]`). 그래서 남자 화자가 여성 음성으로 읽힐 수 있습니다.
  - 여러 기기에서 기본 en-US 음성이 여성입니다(예: Windows의 Zira, iOS의 Samantha). 이런 기기에서는 남자가 먼저 말하는 세트마다 남자가 여성 음성으로 읽힙니다(추측).
  - 질문이 "What does the man suggest?"인데 여성 음성이 말한 내용을 찾아야 하면 실제 시험 감각과 어긋납니다.
- **재현:** mock 음성 US, GB, AU로 확인했습니다.
  - p3-050(화자 M W M2): M→US, W→GB, M2→AU
  - p3-020(화자 W M): W→US, M→GB
  - 성별이 아니라 등장 순서로 정해집니다.
- **고칠 방향:**
  - `voice.name`에 들어 있는 흔한 이름으로 성별을 추정합니다(남: David, Mark, Guy, Ryan, Daniel, Alex 등 / 여: Zira, Aria, Jenny, Samantha, Karen, Libby, Sonia 등). M·M2는 남성 후보에서, W·W2는 여성 후보에서 고릅니다.
  - 후보가 없으면 지금처럼 pitch로 구분합니다(M 0.9, W 1.1 …).
  - 단, 성별을 추정한 음성이 하나뿐일 때만 pitch를 쓰는 지금 방식(`shared`)은 3인 대화 + 음성 2개일 때 M과 M2가 같은 음성에 pitch 0.9 대 0.8이 되어 거의 구분되지 않습니다. 같은 음성을 공유하는 화자끼리만 pitch 차이를 더 크게 주는 편이 낫습니다.

## 5. [중간] 데이터: 구조 반복과 약한 오답 (실제 시험보다 쉬움)
- **1번·3번 문항 유형이 고정됩니다.** 92세트 기준으로 1번 문항은 topic 75, speaker 16, reason 1이고, 3번 문항은 next 69, suggest 19, 기타 4입니다.
  - 발문도 대부분 "What are the speakers discussing?"와 "What will the man/woman do next?"입니다.
  - 고칠 방향: 각 파일에서 4~5세트의 1번을 speaker·장소 문항으로, 3번을 suggest·request·offer 문항으로 바꿉니다.
- **줄거리 틀이 반복됩니다.**
  - p3-1: 6세트(003, 009, 014, 019, 024, 026)가 "서류 오류 발견 → 수정본 요청 → 승인 후 배포"입니다.
  - p3-2: 12세트가 이메일·문자·업로드로 무언가를 보내며 끝납니다. p3-035와 p3-046은 둘 다 "스티커 인쇄"로 끝납니다.
  - p4-1: p4-001과 p4-002가 같은 틀입니다(장소 변경 → "X는 안 가져와도 된다" → "사원증 지참").
  - p4-2: 3세트(p4-026, 029, 034)가 "이제 같이 해 보자"로 끝나고, 4세트(p4-025, 028, 033, 037)가 "방문 전 웹사이트·이메일로 ○○하라"로 끝납니다.
- **정답이 가장 긴 보기인 비율이 높습니다.** 전체 92/276(33%), 우연이면 약 25%입니다. 작성자별로는 p3-1 42%, p4-2 55%로 높고, p4-1 32%(정답이 가장 짧은 경우도 같은 비율)는 쏠림이 없습니다.
- **상식만으로 풀리는 약한 오답 의심 (정답 유일성 추측):**
  - p4-029 Q2: 오답이 광고판 크기 재기, 표지 찾기, 시간표 준비입니다.
  - p4-039 Q2: 오답이 가격표, 웹사이트 사진, 배송비입니다.
  - p3-021 Q3: 정답 "Seek permission from a potential participant"는 본인에게 직접 묻는 것처럼 읽히는데, 대본은 팀장을 통합니다. "Find a willing colleague through a team leader."로 바꿉니다.
  - p3-017 Q3: 정답이 제안서의 점검 쪽만 담고 있습니다. "Write a proposal for the temporary schedule."로 바꿉니다.
  - p4-1은 대본마다 "You don't need to… / This does not mean…"처럼 오답을 미리 하나씩 반박하는 줄이 들어 있어 대본이 부자연스럽습니다.
- **고칠 방향:** 오답 하나는 대본 단어를 쓴 그럴듯한 함정으로 바꿉니다. 정답 길이가 튀는 문항은 오답을 늘리거나 정답을 줄입니다.

## 6. [낮음] 데이터: 대본 논리·영어·번역·해설 오류

| id(원 id) | 위치 | 문제 | 제안값 |
|---|---|---|---|
| p3-048 (p3-2-022) | Q1 explain | "창고에서 위층 로비로"는 대본에 없습니다(대본은 "must go upstairs before visitors arrive"뿐). | "포장된 진열장을 위층으로 옮기는 준비이므로 … (C)" |
| p3-047 (p3-2-021) | Q1 explain | 해설은 "recurring malfunction"이라고 하지만 보기 원문은 "Repeated failure of a cooling unit"입니다. | "repeated failure로 바꿔 말한 (B)" |
| p3-006 (p3-1-006) | Q1 explain | 질문은 부서를 묻는데 해설은 "업종이 아니다"라고 합니다. | "여자의 부서가 아니다" |
| p3-050 (p3-2-024) | 대본 2행 | W가 "가구 배치를 바꿔도 제한은 같다"고 한 직후 M2가 배치 변경을 제안합니다. 흐름이 어색하고 의도 인용문의 뜻도 미리 드러납니다. | 2행 둘째 문장을 지우고 "That room is approved for no more than forty diners."만 남깁니다. |
| p4-031 (p4-2-011) | 대본 1·2행 | "tonight's restaurant briefing"에서 "three this afternoon" 배송을 말합니다. | "this morning's briefing", scriptKo "오늘 아침 업무 회의" |
| p4-035 (p4-2-015) | 대본 2·5행 | (추측) 통로가 막혔는데 왜 유리 공방 버스만 바뀌는지 근거가 없습니다. | 2행 뒤에 "Only the glass studio coach normally boards in that section." |
| p3-005 (p3-1-005) | 대본 2행 | 인원이 줄었는데 even though(양보)를 씁니다. | "That's fewer than last year, so the same room will be fine." |
| p3-024 (p3-1-024) | 대본 6행 | "those projects"가 가리키는 대상이 없습니다. | "a revised note about those invoices" |
| p3-040 (p3-2-014) | 대본 2행 | 확인하는 동작 없이 곧바로 결과를 말합니다. | 앞에 "Let me check your account." |
| p3-052 (p3-2-026) | 대본 | (추측) "Our spare van"과 M의 차고 이동이 어긋나 화자들의 소속이 헷갈립니다. | W 2행을 "The depot's spare van is only two point four."로 |
| p4-025 (p4-2-005) | Q1 보기 | "refillable cleaning products"는 어색합니다. | "A shop that refills cleaning products" |
| p4-027 (p4-2-007) | Q3 | Q2는 "next destination", Q3는 "first destination"으로 같은 곳을 다르게 부릅니다. | Q3를 "after arriving at the workshop"으로 |
| p4-036 (p4-2-016) | Q2 (B) | fish는 대본에 없는 단어라 함정 역할을 못 합니다. | "To check how long food stays cold overnight" |
| p4-038 (p4-2-018) | Q3 type | during 활동을 묻는 질문이라 next가 아니라 detail입니다. | type을 `detail`로 |
| p3-008 (p3-1-008) | 의도 ko | "시간이 아주 빠듯하네요"의 "시간이"는 원문에 없고 정답을 노출합니다. | "빠듯하네요"(scriptKo 3행도) |
| p4-011 (p4-1-011) | scriptKo·ko | "기회를 포착했습니다"가 정답을 미리 풀어 씁니다. | "빈틈을 보았습니다" |
| p3-005 (p3-1-005) | scriptKo 8행 | catering을 "급식"으로 옮겼습니다. | "출장 요리" |
| p4-022 (p4-2-002) | scriptKo 7행 | 수리를 "공사"로 옮겼습니다. | "수리가 끝날 때까지" |
| p3-046 (p3-2-020) | Q2 난이도 | 난이도 3 세트의 추론 문항인데 근거 문장이 대본에 그대로 있습니다. | W 3행을 "Every inner bag has code R17."로 줄입니다. |
| p3-039 (p3-2-013) | Q3 보기 | "Raise the merchandise"는 대본("move the cartons there")보다 높이 올리는 쪽으로 치우친 해석입니다. | "Relocate the stock away from the leak" |

- **참고:** p4-2의 Part 4 의도 문항은 "the man/woman mean"이라고 씁니다. 실제 시험은 "the speaker … when he/she says"입니다(명세상 허용).

## 7. [낮음] 화면: 소소한 점
- **`app.js:768` 질문 낭독 음성:** 질문을 첫 화자와 같은 음성(`pool[0]`)으로 읽습니다. 실제 시험은 별도 진행자가 읽습니다. 화자가 쓰지 않은 음성이 남아 있으면 그 음성으로 읽게 하면 됩니다.
- **(추측) 버전이 다른 탭 동시 사용:** 업데이트 직후 예전 앱(v14) 탭과 새 탭이 동시에 열려 있으면, 예전 탭의 `validExamState`가 p3/p4 id를 거부합니다. 그러면 기록을 `-corrupt`로 옮기고 빈 기록으로 시작합니다. 예전 탭에서 하나라도 답하면 Part 2·5 기록까지 덮어쓸 수 있습니다. 서비스 워커가 바뀔 때 새로고침을 안내하면 막을 수 있습니다. 확인하지는 않았습니다.

## 8. 「본문으로 건너뛰기」 링크 — 캡처 문제, 실제 버그 아님
- **근거 1:** `.skip-link`는 `position:fixed; top:-100px`이고 포커스를 받을 때만 `top:12px`가 됩니다. 실제 화면에서 위치를 재 보니 스크롤 0에서도, 800px로 스크롤한 뒤에도 top이 −100px이었습니다. 화면 밖에 있다는 뜻입니다.
- **근거 2:** 같은 상태에서 Playwright로 전체 페이지(fullPage) 캡처를 하면 링크가 본문 중간(약 550px)에 찍혀 그대로 재현됩니다. 전체 페이지 캡처는 화면을 늘려 다시 배치하면서 fixed 요소를 엉뚱한 곳에 그리기 때문입니다. 스크린샷 3번에서 아래 탭 바가 본문 중간에 찍힌 것도 같은 원인입니다.
- **고칠 방향:** 코드는 고칠 필요가 없습니다. 스크린샷을 찍기 전에 `scrollTo(0,0)`을 하거나, 화면 크기만큼만 캡처하거나, 캡처할 때 `.skip-link`를 숨기면 됩니다.

---

## 확인한 동작 (통과)
- **문제 홈:** 카드가 Part 2·3·4·5 순서이고 문구가 맞습니다. Part 3은 "푼 문제 0 / 156 · 첫 시도 정답률 0% · 실전 세트 13세트 · 39문항", Part 4는 "0 / 120 · 10세트 · 30문항"입니다.
- **실전 세트 추출:** Part 3 13세트의 난이도가 3/6/4로 25/45/30 비율의 최대 잔여 배분값과 같습니다. Part 4는 "1 / 10 세트"로 시작합니다. 머리글은 talkType에 맞게 "excerpt from a meeting"으로 나옵니다.
- **채점 전후 화면 (13세트 모두):**
  - 채점 전에는 대본이 숨겨져 있고, 세 문항을 다 고르기 전에는 "채점"이 비활성입니다.
  - 채점 후에는 대본 전체(화자, 영문, scriptKo 줄 수 일치)와 ko 질문·보기, 해설이 나오고, 포커스가 점수로 이동합니다.
- **결과 화면:** 점수는 "39문항 중 34문항 정답 87%"였고, 유형별 결과가 한국어 이름으로 나옵니다(주제·목적, 화자 의도, 다음 할 일, 이유·문제, 세부 정보, 추론, 시각 자료, 제안·요청).
- **기록:**
  - `vocab-master-exam`에 `p3-050-1` 형식으로 39개가 저장되고, `first`와 `tries`가 있습니다.
  - 틀린 세트는 5개였고, 하나를 다시 다 맞히자 4개로 줄었습니다. 첫 시도 정답률은 87%로 그대로입니다.
  - core 테스트로 id 형식(p3-001-0, p3-1-001, p6 거부)과 `examSetStats`를 확인했습니다.
  - 백업 복원은 `Core.validExamState`로 검사합니다(`app.js:1130`).
- **음성:**
  - 화자별로 서로 다른 억양 음성이 배정되고, 대본 뒤에 질문 3개를 "Question N."으로 읽습니다.
  - 재생 중 화면을 옮기면 cancel이 호출되고, 늦게 도착한 onend가 와도 다음 줄을 읽지 않습니다.
  - 화면이 숨겨질 때(visibilitychange)도 멈춥니다(코드 확인).
- **음성 미지원 (다크 모드):** 듣기 버튼이 비활성이 되고 "음성을 재생할 수 없어 대본을 표시해요"와 함께 채점 전에는 영문 대본만 보입니다(ko 0개).
- **접근성:**
  - 표는 `th scope="col"`(머리글)과 `scope="row"`(각 행 첫 칸)를 씁니다.
  - 보기 aria-label은 "1번 문항 (A) … " 형식이고 `aria-pressed`가 붙습니다.
  - 오답 표시는 아이콘과 "내 답" 글자, aria-label ", 내 답, 오답"으로 색 외에도 구분됩니다.
  - 키보드로는 Enter·Space로 보기를 고르고 Tab으로 이동합니다. 다시 그린 뒤에도 포커스가 유지됩니다.
- **화면 공통:** 라이트·다크 모두 scrollWidth 375(가로 스크롤 없음), 콘솔 에러 0입니다.
- **sw.js:** QUESTION_FILES에 part3·4가 추가됐고, CACHE_VERSION이 `v17-german-advanced-exam-lc`로 올라갔습니다.

## 작성자별 품질
| 파일 | 정답 오류 | 주요 약점 | 강점 |
|---|---|---|---|
| p3-1 (p3-001~026) | 0 (약한 오답 2) | 정답 최장 42%, 1번=topic·3번=next 고정, "수정본 요청" 줄거리 반복 | 그래픽(012·018·022)·의도 설계가 좋고 영어가 자연스러움 |
| p3-2 (p3-027~052) | 0 | 바꿔 말하기 위반이 가장 많음(약 9), 그래픽 보기 순서, "보내며 끝남" 12세트 | 함정 오답을 일관되게 쓰고 해설 품질이 좋음 |
| p4-1 (p4-001~020) | 0 | 의도 문항 바로 뒤에 뜻 풀이, 오답을 미리 반박하는 대본 | 키 정확도가 높고 길이 쏠림이 없음, 정답 위치 15×4 |
| p4-2 (p4-021~040) | 0 (약한 오답 2) | 정답 최장 55%, p4-030 그래픽, 대본 논리 2건 | 소재가 다양하고 번역·해설이 정확함 |

기출·교재 복사로 의심되는 문장은 네 파일 모두 찾지 못했습니다. 다만 기억에 기댄 판단입니다.

## 확인하지 못한 것
- 실기기 음성(실제 음성 이름과 성별, 속도), 스크린리더 낭독
- 1024px 화면, 서비스 워커를 켠 실제 오프라인 동작
- 백업 내보내기 파일의 p3/p4 기록은 코드와 core 테스트로만 확인했고, 화면에서 직접 내보내 보지는 않았습니다.
- Part 2·5 회귀는 홈 카드 표시만 확인했습니다(7차 이후 바뀐 부분은 공통 함수뿐).
- 대본 영어의 자연스러움은 텍스트로만 판단했습니다.
