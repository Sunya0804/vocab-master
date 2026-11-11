# 검토 12차: 10차 수정 재검토 (Part 6·7)

- 작성: 리뷰어 Claude, 2026-11-11. 지시서는 `docs/tasks/review-12-recheck.md`다.
- **범위:** 이번에는 p6-1·p7-1·p7-2만 봤다. Part 1(p1-1, 11차 지적)은 총괄 지시로 제외했다. 수정이 아직 끝나지 않았기 때문이다.
- **바뀐 세트:** 공유 폴더 커밋 7a5e3f6과 비교했다.
  - p6-1: 32/32
  - p7-1: 22/30 (안 바뀐 세트: 003, 007~011, 016, 020)
  - p7-2: 15/15
- **방법:**
  - 6개 구간으로 나눠 서브에이전트가 바뀐 세트의 문항마다 보기 4개를 모두 넣어 보고, 계산 문항을 다시 계산했다.
  - 연계 문항(crossRef)은 지문을 하나씩 가리고 풀었다.
  - 필수 항목, 정답 둘 소지 항목, crossRef 핵심 항목, 반복 통계는 내가 직접 다시 확인했다("직접 확인" 표시).
- 파일은 수정하지 않았다.

## 요약

| 파일 | 필수 | 권장 | 참고 |
|---|---|---|---|
| p6-1.json | **3** | 10 | 11 |
| p7-1.json | 0 | 13 | 11 |
| p7-2.json | 0 | 18 | 15 |
| 세 파일 공통 | 0 | 1 | 0 |

**10차 권장 33건 처리 결과:** 해결 22건(67%), 부분 11건, 미해결 0건이다. 손대지 않은 항목은 없다.

| 구분 | 해결 | 부분 |
|---|---|---|
| p6-1 권장 13 | 9 | 4 (권장 1·2·3·4) |
| p7-1 권장 11 | 10 | 1 (권장 9) |
| p7-2 권장 7 | 3 | 4 (권장 1·4·5·7) |
| 공통 2 | 0 | 2 |

**결론:**
- 고친 결과는 10차보다 확실히 좋다.
  - 회사 맥락 비중이 크게 늘었다.
  - P6 tense 정답 will: 17/28 → 14/28. 보기 중 will 형태가 하나뿐인 문항: 20 → 16.
  - P6 문장 고르기에서 빈칸 뒤 문장이 지시어로 시작하는 문항: 19/32 → 8/32.
  - 3문단 + 빈칸 1·2·2·3 문단 배치: 29/32 → 18/32(직접 확인).
  - 정답이 틀린 문항은 없다.
- 그러나 세 가지가 남았다.
  1. **P6 필수 3건.** 해설 2개가 옛 지문 내용 그대로 남았고, 정답이 둘로 읽히는 문항이 1개 있다.
  2. **P7-2 연계 문항 10개가 여전히 한 지문만으로 풀린다.** 10차에서 고친 004-Q4·011-Q4도 다시 걸렸다.
  3. **옛 틀을 없앤 자리에 새 공식이 생겼다.**
     - P6: "완료 증거 + still open" 단서, "화면이 절반 진행" 단서, `{3} own`.
     - P7-1: 채팅 다섯 세트가 "문제 → 대체 → I'll"로 같다.
     - P7-2: 15세트 모두 Q1이 purpose다.
- 규칙 위반:
  - p7-1의 회사 맥락은 19/30으로 2/3(20)에 1세트 모자란다.
  - 신입 오리엔테이션 소재가 세 파일에 걸쳐 4번 나온다.
- **판정:** p6-1 필수 3건은 배포 전에 고쳐야 한다. 모두 한 줄 수정이다. 그다음 P7-2 crossRef 10건과 반복 틀을 고치기를 권한다.

---

## 1. 10차 지적 처리 상태

### p6-1 (권장 13)
| 10차 항목 | 상태 | 근거 |
|---|---|---|
| 권장 1 뼈대 | 부분 | 문단 수는 2문단 4 / 3문단 22 / 4문단 6이다. 그러나 3문단 + 빈칸 1·2·2·3 배치가 18/32 남았다(직접 확인). 아래 권장 1 |
| 권장 2 tense 공식 | 부분 | 정답이 will 14 / 진행 5 / 현재완료 4 / 과거 5로 다양해졌다. 010 "has not arrived, so no practice sessions have taken place"는 10차 지적 문장 그대로다. 새 공식은 아래 권장 2 |
| 권장 3 지시어·엉뚱 오답 | 부분 | 지시어 단서는 8/32로 줄었다. 엉뚱한 오답은 021·022·028·030 등에 남았다(아래 권장 7) |
| 권장 4 018/020/024/026 같은 틀 | 부분 | 020·026은 4문단으로 바뀌었다. 하지만 017과 함께 "화면 단서 + 진행형" 새 틀을 이룬다 |
| 권장 5 007-Q2 | 해결 | 보기가 will be able to try on 계열이고, ko는 "입어 볼 수 있을 것입니다"다 |
| 권장 6 010-Q4 | 해결 | "attached to this memo" |
| 권장 7 014-Q3 | 해결 | "when applications close tomorrow" |
| 권장 8 006-Q4 | 해결 | 정답이 "marked in blue"로 바뀌었다(참고 사항 있음) |
| 권장 9 008-Q4 | 해결 | 소재가 바뀌었다. 새 문제는 아래 권장 4 |
| 권장 10 004-Q4 | 해결(교체) | 새 오답 0도 뒤 문장과 충돌한다(참고) |
| 권장 11 024-Q1 | 해결 | "{1} to your wrist" |
| 권장 12 024-Q3 | 해결 | 앞에 "Wristbands are issued at the security desk."가 들어갔고, 정답에 deposit이라는 단어가 없다 |
| 권장 13 022 | 해결 | 문장을 합쳤다 |

참고 18건은 대부분 해결됐다. 남은 것은 다음과 같다.
- 023 난이도 3 유지
- 대명사 보기 세트: 019·021은 their/them/themselves/theirs, 023·025는 its/it/itself/it's 그대로

### p7-1 (권장 11)
| 10차 항목 | 상태 | 근거 |
|---|---|---|
| 권장 1 015-Q3 | 해결 | 제안 문장이 그대로 반영됐다 |
| 권장 2 001-Q2 | 해결 | 인용문이 "Leave it with me."로 바뀌었고, 9:12 줄도 고쳤다 |
| 권장 3 017-Q1 | 해결 | |
| 권장 4 021 인사말 | 해결 | |
| 권장 5 023 They | 해결 | |
| 권장 6 025 3:24 | 해결(세트 재작성) | |
| 권장 7 026 Drivers | 해결 | |
| 권장 8 030 논리 | 해결 | |
| 권장 9 출입 소재 | 부분 | 013·014는 다른 소재로 바뀌었다. 001(카드 출입)·002(Q1이 "staff door"를 묻는다)·003·011에 출입 소재가 남았다 |
| 권장 10 채팅 3세트 | 해결 | 027은 일정 조율 대화와 역할 문항으로 바뀌었다. 다만 023·025는 흐름이 여전히 같다(아래 권장 9) |
| 권장 11 021/024, 017/025 | 해결 | 024는 옛 은행, 025는 매장 이전이다 |

참고에서 남은 것은 다음과 같다.
- 018-Q2 type이 아직 inference다(아래 권장).
- 020-Q3 type이 아직 inference다.
- "rather than / not" 단서가 남았다(012·015·019·021·025·027).
- 원예 소재가 016·019·029에 남았다.

### p7-2 (권장 7)
| 10차 항목 | 상태 | 근거 |
|---|---|---|
| 권장 1 004-Q4 | 부분 | 권고대로 고쳤다. 하지만 견적서 표에 "Alternative only"가 있어 견적서만으로 풀린다(직접 확인, 아래 권장 1-④) |
| 권장 2 006-Q4 | 해결 | 7/5~9 폐쇄로 바뀌었고, 이메일은 질문형이 됐다. 대신 소재 문제가 새로 생겼다(아래 권장 4) |
| 권장 3 007-Q1 | 해결 | type은 purpose 그대로이고, 오답이 지문 소재로 바뀌었다 |
| 권장 4 001~008 틀 | 부분 | 007-Q3·008-Q4는 바뀌었다. "날짜 비교 → 조건 판정"은 001·004·005·006 네 세트에 남았다 |
| 권장 5 011-Q4 | 부분 | 2월 15일 혼동은 없어졌다. 하지만 이메일만으로 풀린다(직접 확인, 아래 권장 1-⑧) |
| 권장 6 009-Q1 | 해결 | |
| 권장 7 009~015 틀 | 부분 | 015는 기사형으로 바뀌었고, Q5 출처도 다양해졌다(010·011·012). "요청 이메일 + 표 매칭"은 010·012·014에 남았고, Q1은 15/15 purpose다(직접 확인) |

참고에서 남은 것은 다음과 같다.
- 003 편지 Regarding과 Q2에 "reading room" 용어가 남았다.
- 007·008의 difficulty 2가 그대로다.

### 공통 (권장 2)
| 10차 항목 | 상태 | 근거 |
|---|---|---|
| 공통 1 회사 맥락 | 부분 | p6-1과 p7-2는 충족했다. p7-1은 19/30으로 1세트 모자란다(아래 3장) |
| 공통 2 파일 간 겹침 | 부분 | 10차 쌍 5개 중 4개는 풀렸다. 공구 대여소 쌍(p6-1-013 / p7-1-022)은 두 세트가 모두 사내 장비 대여로 바뀌어 다시 겹친다. 새 겹침은 아래 공통 권장 |

---

## 2. 새로 생긴 문제

### 세 파일 공통

**권장 1 | 7 | 파일 간 소재 겹침**(직접 확인).
- **신입 입문·오리엔테이션 4세트:** p6-1-001, p6-1-027, p7-1-002, p7-2-006.
  - p6-1-001(Veldrin Components)과 p7-1-002(Brindle Components)는 둘 다 "부품 회사 신입 교육, 4월 12일"이다.
  - p6-1-027과 p7-1-002는 둘 다 training suite에 모인다.
- **사내 장비 대여:** p6-1-013(출장용 노트북 대여)과 p7-1-022(사내 장비 대여 서비스). 10차 쌍이 모양만 바뀌어 다시 겹쳤다. 장비 대여 업체 소재도 p6-1-022와 p7-1-012가 겹친다.
- **공사 중 임시 수령 장소 + 냉장품 예외:** p7-1-030과 p7-2-011. 순서까지 같다.
- **옛 공간을 새 용도로 개관:** p7-1-024(옛 은행)와 p7-2-003(옛 기록실). 규칙의 금지 예다.
- 참고: 스캐너 소재가 p7-1-004(평가)와 p7-2-002(교육)에 있다.
- **고칠 방법:** 겹침 쌍의 앞쪽 파일을 바꾼다.
  - p6-1-001 → 품질 감사 일정 안내
  - p6-1-027 → 급여 체계 변경 공지
  - p6-1-013 → 출장비 선지급 절차
  - p7-1-030 → 사내 문서 전달 방식 변경
  - p7-1-024 → 사무실 이전 공지
  - p7-2-006은 오리엔테이션을 유지한다.

### p6-1.json

#### 필수
1. **p6-1-007-Q3 | 2 | 해설이 옛 지문 내용이다**(직접 확인).
   - explain: "2문단에서 벤치와 거울에 보행 구역이라는 시설을 추가하므로…"
   - 그런데 지문은 "The area will have private changing booths. {3}, a marked exercise zone will let staff check…"이다.
   - 고칠 문장: "2문단에서 개인 탈의 칸에 더해 동작 확인 구역이라는 시설을 추가하므로 In addition이 맞다. Instead는 앞의 시설을 대체한다는 뜻이 되어 맞지 않는다."
2. **p6-1-019-Q3 | 2 | 해설이 옛 정원 지문 내용이다**(직접 확인).
   - explain: "2문단에서 주민이 직접 색을 고른다는…"
   - 그런데 지문은 "Your fleet supervisors can assign the spaces {3}, using the vehicle list…"이다.
   - 고칠 문장: "2문단은 차량 감독자가 동봉된 목록으로 구획을 직접 배정한다는 뜻이므로 강조 용법의 재귀대명사 themselves가 맞다. their는 뒤에 명사가 필요한 소유격이다."
3. **p6-1-027-Q4 | 1 | 정답이 둘로 읽힌다**(직접 확인).
   - 문장: "Our HR team {4} the new recruits in the training suite. The session begins next Monday at nine."
   - 정답 will welcome 외에 보기 are welcoming도 정해진 미래 일정을 나타내는 현재진행으로 맞다.
   - 고칠 방법: 보기 are welcoming → have welcomed. 문장은 "will welcome you"로 해서 2인칭을 유지한다.

#### 권장
1. **공통 | 7 | 뼈대 반복이 줄었지만 새로 굳은 틀이 있다**(배치 통계는 직접 확인).
   - 3문단 + 빈칸 1·2·2·3이 18/32다.
   - 001~016: 14/16이 vocab → tense → connector(pos) → sentence 순서이고, sentence는 16/16이 마지막 문단의 Q4다.
   - 017~032는 두 틀이 번갈아 나온다.
     - 홀수 지문(017·019·021·023·025·027): vocab / sentence(2문단 첫 문장) / pronoun / tense
     - 짝수 지문(018·022·024·028): vocab / tense / sentence / pos
   - 029~032는 sentence가 모두 1문단 셋째 문장이다.
   - 고칠 방법: 4~5지문은 sentence를 1문단이나 2문단 중간으로 옮긴다(016, 019, 023, 031 등). Q1은 tense나 connector로 바꾼다.
2. **tense 단서가 새 공식이 됐다 | 3·7.**
   - "완료 증거 + still open" 문장이 붙어 나온다: 005 "…attached, and the current evaluation period remains open through Friday", 012 "…on my desk, and today's review window remains open until four", 015 "…so far, and we are keeping the questionnaire open". 뒷절은 시제 단서용으로 억지로 넣은 문장이다.
   - "화면이 절반 진행" 단서 + 진행형 정답: 017 "live status panel shows the removal process halfway through", 020 "monitor shows her halfway through the script", 026 "shared screen shows her working through page twelve of twenty".
   - 보기 세트 is V-ing / will have p.p. / will / would에 정답 will인 지문이 4개다(019·022·023·027).
   - 단서 위치: 12문항 중 10개가 빈칸 바로 다음 문장이다(017~032).
   - 고칠 방법:
     - 005·012는 뒷절을 지운다. 정답은 앞절만으로 정해진다.
     - 017은 "Since April 10, its address has displayed only a link to the permanent portal."로 바꿔 정답을 has deactivated로 한다.
     - 020은 Q2를 connector로 바꾼다.
     - 010은 "has not arrived" 문장을 일정 문장("The unit is due on October 2.")으로 바꾼다.
3. **p6-1-023-Q4 | 1 | 정답 근거가 약하다.**
   - 문장: "She {4} it to the retailer for signature… our representative has reserved Thursday for dispatch."
   - 보기 is forwarding이 예정된 일정으로 읽힐 여지가 있다. 앞 문장 "once your legal team approves"라는 조건 때문에 will이 더 낫지만 결정적이지 않다.
   - 고칠 방법: is forwarding → has forwarded. 019의 is being installed도 → was installed.
4. **p6-1-008-Q4 | 5.**
   - 정답 "Each image carries the statement…"는 이미 이미지에 문구가 들어 있다는 말이다. 그런데 바로 뒤가 "Please include that wording beneath every image"라 서로 맞지 않는다.
   - 고칠 문장: "Each image must be shown with the statement 'Prototype: not yet released for sale'." / ko "각 이미지에는 … 문구를 함께 표시해야 합니다."
5. **p6-1-015-Q2 | 1.**
   - 앞에 "we are keeping the questionnaire open for late participants"가 있어 의견이 계속 들어오므로 is reviewing도 옹호할 수 있다.
   - 고칠 문장: 뒷절을 "and no further responses will be accepted"로 바꾼다.
6. **p6-1-018-Q3 | 1·2.**
   - 오답 A "It uses each supplier's preferred replacement rate without adjustment."도 다음 문장 "compare the usage figures with our machine logs"와 이어진다.
   - 고칠 문장: 다음 문장을 "Reviewers should confirm that this shared usage level matches our machine logs before accepting the cost totals."로 바꾼다.
7. **문장 고르기 오답이 엉뚱하다(규칙 위반) | 6.**
   - 021 B "…code that opens the staff parking gate" → "Each tray receives a code showing only the date it entered the factory."
   - 022 D "…choose a screen size after the presentation begins" → "We recommend booking a larger screen if more than fifty people will attend."
   - 028 C "…view only the office holiday calendar" → "Partners can view every campaign folder but edit only their own files."
   - 030 B "keep a written list of staff birthdays" → "Please report interrupted conversations to the duty manager by phone."
8. **pronoun 문항이 같은 틀이다 | 7.**
   - "{3} own + 명사"에 정답 their인 지문이 3개다(017·021·027).
   - "Each party/organization … {3} 명사"에 정답 its인 지문이 2개다(023·025).
   - 고칠 방법: 021을 관계사 문항으로 바꾼다. 문장은 "…ask the person {3} recorded an unusual reading", 보기는 who/whom/whose/which.
9. **p6-1-013 2문단 | 5.**
   - "while the laptop is still on site"는 1문단의 "client site" 때문에 고객사에 있을 때로 읽힌다. ko는 "사내에 있는 동안"이다.
   - 고칠 문장: "…can restore it before you leave the office."
10. **p6-1-003 / 006 | 7 | 같은 파일 안에서 소재가 겹친다.**
    - 둘 다 경비 영수증 이야기다. 003은 경비 청구 반려 → 영수증 상담, 006은 품목별 영수증 누락 → 경비 신청이다.
    - 고칠 방법: 006을 "공급업체 송장의 발주번호 누락 → 구매 포털 시연"으로 바꾼다.

#### 참고
- 005: 2문단은 "two replacement samples"인데 3문단과 정답은 단수("the sample", "Its shade")다. → samples / Their shade.
- 005-Q4: 오답 2 "The coating changes how the fabric feels…"도 이어질 여지가 약간 있다. → "The coating protects the fabric from spills in the seating area."
- 003 1문단: "The two-week service ended last Friday."가 문단 끝에 붙어 있다. → 문단 첫 문장으로 옮긴다. ko "출입 기록" → "참석 기록".
- 006-Q4: 정답은 "marked in blue"인데 다음 문장은 "These shaded areas"다. → "highlighted in blue" / "These highlighted areas".
- 004-Q4 오답 0, 010-Q4 오답 2, 015-Q4 오답 0: 앞뒤 문장과 정면으로 모순되거나 소재와 무관하다. 015는 "The rating labels will also be translated for overseas respondents."로 바꾼다.
- 023: 난이도 3이 과하다. Q3(its/it's)가 쉽다. → 2.
- 025 1문단: "an allocation is not a guarantee of attendance"는 뜻이 흐리다. → "but some organizations may not be able to use all of them."
- 027: "Your orientation…"으로 독자에게 말하다가 "the new recruits"로 3인칭이 된다. 필수 3과 함께 고친다.
- 020 ko 1문단: "스튜디오에서 수정한 도입부를" → "수정된 도입부를 스튜디오에서".
- 001/010: 생산 현장 안전 교육 소재가 비슷하다.
- 029-Q4 explain: [2]가 왜 안 되는지 설명이 없다.

### p7-1.json

#### 권장
1. **회사 맥락 19/30 | 6 | 규칙 미달**(아래 3장). 비회사 세트는 006·008·010·011·016·017·019·020·021·023·029다. 안 바뀐 세트 중 하나를 회사 소재로 바꾼다(예: 010 품절 대체 → 거래처 부품 대체 납품).
2. **p7-1-014-Q2 | 1·2.**
   - NOT-true 문항인데 (D) "Released times may be booked by other teams."가 지문에 직접 나오지 않는다. 지문에는 "the slot is released automatically", "choose another open slot"뿐이다.
   - 고칠 방법: 2문단 "…released automatically" 뒤에 "Released times immediately appear as open to all sales teams."를 넣는다.
3. **p7-1-005 2:08 | 5.** "I'll reserve the company van and collect it"의 it이 van으로 읽힌다. → "…and pick up the table from storage before the exhibition opens."
4. **p7-1-001 9:14 | 5.** "The driver has another delivery nearby, so he can wait a few minutes."는 앞뒤가 안 맞는다. → "The driver says he can wait a few minutes before his next delivery."
5. **Q1 오답이 상식만으로 지워진다 | 6.**
   - 013 (B) "compare the prices charged by regional customers" → "To decide which regions need additional sales representatives." / (D) → "To train customer service staff on product compatibility."
   - 017 (B) "To copy the designer's workshop." → "To photograph the chair for an exhibition catalog."
   - 019 (C) "To recruit pupils for market deliveries." → "To invite the class to a summer sales event."
6. **바꿔 말하기 위반 | 6.**
   - 018-Q3: "Specialized equipment needed for a demonstration"은 지문 "specialist demonstration equipment"와 같다. → "Devices a session requires beyond the basic setup."
   - 027-Q4: 정답 "Coordinating training with the customer's office"가 1:21 줄의 설명문을 그대로 옮겼다. 그 줄도 채팅으로 어색하다. → 1:21 줄은 "I'll call their finance office now—they route all scheduling through me.", 정답은 "Serving as the client's main point of contact."
   - 029-Q2: 정답 "Describe the plant on the envelope"는 지문 그대로다. → "Note the plant's characteristics instead of a name."
7. **p7-1-023-Q2 | 6 | 의도 문항 규칙 위반.** 인용문 "Those signs are making a promise we cannot keep"는 글자 그대로의 뜻만으로 정답 A가 골라진다. → "That will be a short afternoon." 같은 문맥 의존형 표현으로 바꾼다.
8. **p7-1-024-Q2 explain | 2.** "창문 밖 교통 소음이 나오지만"이라고 했지만 지문에는 소음이 없다(단열·난방비 이야기다). → "넷째 문단에 quiet가 나오지만 여기서 sound는 '튼튼한'이라는 형용사다."
9. **채팅 흐름 반복 | 7 | 규칙 위반.**
   - 채팅 5세트(001·005·009·023·025)가 모두 "준비 중 문제 → 가진 것이나 빌린 것으로 대체 → 마지막 줄 I'll…" 흐름이다.
   - 005·009와 009·023은 거의 같다. "still in storage" / "We still have a marker", 시식 행사 표지 고쳐 쓰기.
   - 023·025는 문항 순서도 같다(detail → intention → inference → 다음 행동).
   - 고칠 방법: 023은 해결책을 안내 방송으로 바꾼다("I'll ask the stage host to announce…"). 005나 009 중 하나는 일정·담당 조율 대화로 바꾼다.
10. **기사 흐름 반복 | 7 | 규칙 위반.**
    - 022·026·028이 모두 "도입 → 초기 문제 → 개선 → 마지막 문단 향후 평가·확대" 순서다. 4번째 문항도 모두 insertion이다.
    - 고칠 방법: 028은 마지막 문단을 교육생 인용으로 끝낸다. 026은 결과 보고(완료형)로 바꾼다.
11. **p7-1-013 / 014(+018) | 7 | 연속 세트의 뼈대가 같다.**
    - 흐름: 새 사내 예약 절차 → N 근무일 전 정보 제출 → 안 하면 자동 해제 → 별도 기한.
    - 고칠 방법: 014를 구·신 조건 비교형이나 일정 변경 공지로 바꾼다.
12. **반복 구조 | 7.**
    - "Please bring X" 지참 요청: 005·006·011·016·019
    - "업체 제공 vs 고객 책임": 008·012·018·019·020
    - "요금 + 기간 안 조건부 혜택" 광고: 004·008·015·020
    - 고칠 방법: 바꿀 세트를 고를 때 위 목록에서 고른다(권장 1과 함께).
13. **p7-1-018-Q2 | 형식.** 지문이 이유를 직접 말한다("so another proposal … would not receive priority"). → type을 detail로 바꾼다.

#### 참고
- 002-Q1: 정답 "a door on Alder Lane"이 지문과 같고, 출입 소재다. → q "What should Ms. Cole show on arrival?" / 정답 "A confirmation stored on her mobile device."
- 004-Q2: "within thirty days"의 기준 시점이 없다. → "within thirty days of your session".
- 014 ko: Q3 A "별도로 확인해야 한다" → "별도의 장비 확인 결과에 달려 있다". Q1 B "회의실" → "시연실".
- 019 passagesKo 맺음말: "With best wishes" → "안부를 전하며".
- 021-Q2, 022-Q2, 020-Q3: 지문에 그대로 나오는 내용인데 type이 inference다. → detail.
- 023-Q1: 정답 "lacks space for the tasting plates"가 지문 반복이다. → "It is too small to hold the samples as well."
- 025 3:31: "The box's lid must close securely."는 이유가 빠졌다. → "…as long as its lid closes flat, it will hold the products."
- 029-Q4 explain: [2] 위치를 배제하는 근거가 없다.
- 단서 문장 "rather than / not"이 012·015·019·021·025·027에 남았다.
- 원예 소재가 016·019·029에 남았다.

### p7-2.json

#### 권장
1. **연계 문항이 한 지문만으로 풀린다 | 4 | 10문항**(①④⑧은 직접 확인).

   | # | 문항 | 한 지문으로 풀리는 이유 | 고칠 방법 |
   |---|---|---|---|
   | ① | 001-Q4 | 광고에 무료로 나오는 다과가 커피 하나뿐이라 날짜 계산이 필요 없다 | 보기 B를 "None, since the booking was made too late"로 바꾼다 |
   | ② | 002-Q4 | 이메일의 "only my existing place is needed"가 답을 말한다. booking number와 reference number가 같은 것인지도 애매하다 | 이메일 문장을 지운다. 공지는 "A reply that includes a reference number confirms a place; an automatic acknowledgment, which has no number, does not."로 바꾼다 |
   | ③ | 003-Q3 | 오답 셋이 편지만으로 지워진다 | 오답 하나를 "Her repair work was listed in the project register"(메모가 있어야 반박됨)로 바꾼다 |
   | ④ | 004-Q4 | 견적서에 "Alternative only"와 "The standard format is shown for comparison"이 있어 이메일이 필요 없다 | Selection 열을 둘 다 "Option"으로 바꾼다. 총액 문장은 "The total will be confirmed once you specify a format."으로 바꾼다 |
   | ⑤ | 007-Q3 | 질문의 "unlike guests arriving on other services"가 답을 말하고, 오답이 상식만으로 지워진다 | q "What will most likely happen when Mr. Drew arrives?" / ["A lodge shuttle will meet his bus", "He will need to hire a taxi", "He will be able to enter his room at noon", "His transport request will be rejected as too late"], answer 0 |
   | ⑥ | 008-Q3 | 이메일 "printed workplace sign"과 일정표 "Tactile Sign Design"이 sign이라는 같은 단어로 이어진다 | 공지를 "The tactile signs workshop requires a printed floor plan of the participant's workplace."로, 이메일을 "I will bring a printed floor plan of our reception area."로 바꾼다 |
   | ⑦ | 009-Q4 | 이메일 "I will retain the damaged goods and packaging until you advise otherwise"가 답을 말한다 | 이 문장을 "I have kept the damaged jars and their packaging for now."로 바꾼다 |
   | ⑧ | 011-Q4 | 질문에 "vehicle restrictions"가 있고, 이메일에 9m → 7m 환적이 있어 공지가 필요 없다 | q "Why was the originally assigned truck not used for the February 13 delivery?" / ["It was too long for the annex yard", "It had no refrigeration unit", "It could not carry the full quantity", "It was unavailable on that date"], answer 0 |
   | ⑨ | 015-Q3 | 기록표("no changes to staffing")만으로도, 후기("less than half the time")만으로도 풀린다 | B를 "Smaller classes in Maple produced the shorter reset times"로 바꾼다(학급 인원이 같다는 정보는 기사에만 있다). 기사 끝은 "the preparation figures alone will not determine their decision."으로 바꾼다 |
   | ⑩ | 015-Q4 | 질문이 "how quickly the rooms became ready"라고 밝혀서 표만으로 풀린다 | q "Which figures in the summary record support the impression Mr. Darel states in paragraph 2 of his assessment?" |

2. **p7-2-001-Q1 | 6.** 오답 "A photography course"가 지문과 무관하다. → "A monthly coworking membership".
3. **p7-2-004 이메일 | 1(문항 영향 없음).** 8월 3일 이메일에 "a new visitor trail next month"라고 하면 9월이 되는데, 같은 이메일의 "opening event begins on August 20"과 어긋난다. → "later this month" / ko "이달 말".
4. **p7-2-006 소재 | 7 | 규칙 위반.**
   - 공지 "The entrance on Canal Lane will be closed… must use the courtyard gate"는 규칙이 금지 예로 든 "출입문 폐쇄 → 다른 입구" 그대로다. p3-1-016 "That gate is closed for repairs. Everyone should use the north entrance"와도 겹친다(직접 확인).
   - 10차 권장 2를 고치면서 생긴 문제다.
   - 고칠 방법: Q4를 "회차 날짜 → 그날만 집합 장소가 창고 견학 대신 교육실"로 바꾼다. 폐쇄 기간 대신 날짜별 장소 차이로 연계한다.
5. **바꿔 말하기 위반 | 6.**
   - 010-Q5: 정답 "Confirmation of attendance"와 오답 B가 메모 문구 그대로다. → "Records showing that employees took part" / "Advice on which employees to promote".
   - 015-Q5: 정답 "Labeled compartments for spare materials"가 후기와 거의 같다. → "Marked storage spaces for extra supplies".
6. **"날짜 비교 → 조건 판정" 틀 | 7 | 규칙 위반.** 001-Q4, 004-Q3, 005-Q4, 006-Q4 네 세트다. → 001-Q4는 음식 반입 규칙과 연계하고, 005-Q4는 다른 연계로 바꾼다.
7. **"요청·신청 이메일 + 표 조건 매칭" 틀 | 7 | 규칙 위반.** 010·012·014 세 세트다. → 014를 후기·기사 기반으로 바꾸거나, 012의 배정표를 회의 메모로 바꾼다.
8. **Q1이 15/15 purpose다 | 7**(직접 확인).
   - 구성도 대부분 "안내문 + 한 사람의 요청 이메일"이다.
   - 고칠 방법: 3~4세트의 Q1을 detail이나 not-true로 바꾼다(예: 011-Q1 "What will continue at the main warehouse during the work?" / "Processing of outgoing orders").
   - 10차 수정 지시가 "type 유지"였으므로 총괄 판단이 필요하다.

#### 참고
- 003: 정답 Q1 "The conversion of a former records office"가 지문 그대로다. → "A new use for an existing company space". 편지 Regarding과 Q2의 "reading room" → "resource room".
- 005-Q3: 오답 둘이 이메일만으로 지워진다. → "It was arranged with a nearby studio".
- 006-Q4: 오답 "bakery's side entrance", "delivery-only stockroom door"가 약하다. 006-Q5 정답 "A payroll information form"은 지문 그대로다. explain "첫 공지의"도 틀렸다(공지는 하나뿐이다).
- 006 이메일 제목 "Briefing attendance"는 극장 버전의 흔적이다. → "Orientation attendance".
- 008 공지 "collect badges before going upstairs"는 지상층 Gallery 2와 어긋난다. → "before going to their sessions". 008-Q4 explain 오타 "표상 장소는" → "일정표상 장소는".
- 007 passagesKo: 놀린 메일만 평서체다.
- 012 이메일: "customer contract discussion" → "that call" 지칭이 어긋난다. → "I have a phone call with a customer about a contract scheduled for twelve thirty that day."
- 013-Q1: 오답 "Relocation instructions", "Photo archive subscriptions"가 약하다. → "Rules for a photography competition", "Rates for advertising in the magazine".
- 015-Q4 explain: "12. 5분" → "12.5분". 숫자 띄어쓰기를 일괄 처리할 때 생긴 것으로 보인다.
- 009 passagesKo 3지문: "차감 전표와 계정에 남습니다" → "차감 전표와 함께 계정에 남습니다".
- 011·013 Q5: 정답이 지문 명사를 그대로 쓴다. 허용 범위다.
- 015 기사: "Birch retained its original wooden tables as a comparison room." → "Birch, used as a comparison room, kept its original wooden tables."
- 007·008(삼중): difficulty 2 유지. 3지문 연계 문항은 늘었다.

---

## 3. 규칙 점검

| 규칙 | p6-1 | p7-1 | p7-2 |
|---|---|---|---|
| 회사 맥락 2/3 이상 | 29/32 ✅ (비회사 009·014·025) | **19/30 ❌** (기준 20) | 11/15 ✅ (비회사 005·007·013·014) |
| 같은 뼈대·흐름 3세트 이상 | ❌ 3문단+1223 18개, tense 단서 3종, `{3} own` | ❌ 채팅 5, 기사 3, 예약 절차 3, Please bring 5 | ❌ 날짜 비교 4, 이메일+표 3, Q1 purpose 15 |
| 파일 간 소재 겹침 | ❌ 001·027 오리엔테이션, 013 장비 대여 | ❌ 002·022·024·030 | ❌ 006 출입문(+p3-1) |
| P6 tense 시간 부사 | ✅ 빈칸 문장만으로 풀리는 문항 0 | – | – |
| P6 문장 고르기 오답 | △ 엉뚱한 오답 4~7개 | – | – |
| P7 바꿔 말하기·Q1 오답 | – | △ 6문항 | △ 4문항 |
| P7 crossRef | – | – | ❌ 10문항 |
| P7 의도 문항 | – | △ 023-Q2 | – |

- 회사/비회사 분류는 서브에이전트 판단을 내가 목록으로 확인했다. 경계 세트(p7-1-003·012·015)는 회사로 셌다.
- 세트 수·문항 type·난이도·지문 종류 수치는 이번 범위 밖이다. 총괄이 자동 점검했다.

## 확인하지 못한 것
- Part 1(p1-1, 이미지 021·005·032·035)은 이번 범위에서 뺐다.
- p7-1의 안 바뀐 세트 8개는 소재와 흐름만 분류했고 다시 풀지 않았다.
- passagesKo는 뜻이 바뀌는 오류만 훑었고 문체는 보지 않았다.
- 규칙이 말하는 `questions/toeic-part*.json`은 이 저장소에 없다. Part 2~5(p2~p5)와의 겹침은 키워드 검색으로만 봤다(006 출입문만 발견).
- 영어 자연스러움과 난이도는 텍스트 기준의 판단이다.
