# 검토 16차: 연습 Part 6·7(14차 수정) + 모의고사 RC(13차 수정) 재검토

- 작성: 리뷰어 Claude, 2026-11-12. 지시서는 `docs/tasks/review-16-recheck.md`다.
- **대상:**
  - 연습: `p6-1.json` 32지문, `p7-1.json` 7세트(004·014·015·022·023·025·026), `p7-2.json` 15세트. 기준 커밋은 0da755c다. p6-1은 0da755c에 들어 있지 않아 이전 판과의 diff는 참고로만 썼고, 14차 문서의 지적 문장과 현재 텍스트를 대조했다.
  - 모의: `m-p5`·`m-p6`·`m-p7s`·`m-p7m` 5회분. `docs/mock`은 git에 추적되지 않는다. 또 순서를 바꾸면서 id 순번을 다시 매겼다. 그래서 13차 지적은 **인용 문장으로 찾아 현재 id에 대응시켰다.**
- **방법:**
  - 서브에이전트 10개가 나눠 다시 풀었다. 연습 4개, 모의 Part 5 1개, 모의 회차별 5개다.
  - 보기 4개를 모두 넣어 봤고, crossRef는 **지문을 하나씩 가리고** 다시 풀었다. 해설은 하나씩 현재 지문과 대조했다.
  - 필수 7건은 모두 내가 직접 다시 확인했다. 반복 통계(tense 보기 세트, 회차별 순서)도 직접 뽑았다.
- 파일은 수정하지 않았다.

## 요약

| 파일 | 필수 | 권장 | 지난 지적 해결 | **배포** |
|---|---|---|---|---|
| p6-1.json (연습) | **3** | 17 | 11건 중 해결 9, 부분 2 | **필수 3건(각 한 줄)을 고친 뒤 배포 가능** |
| p7-1.json (연습) | 0 | 8 | 12건 중 해결 5, 부분 3, 미해결 4 | **배포 가능** |
| p7-2.json (연습) | 0 | 7 | 13건 중 해결 9, 부분 4. crossRef 실패 12 → **4/30** | **배포 가능** |
| m-p5.json (모의) | 0 | 2 | 필수 1, 권장 14 **전부 해결** | **배포 가능** |
| m-p6.json (모의) | **1** | 12 | 대부분 해결. 14차 tense 규칙 위반 6 | **필수 1건을 고친 뒤 배포 가능** |
| m-p7s.json (모의) | 0 | 10 | 대부분 해결 | **배포 가능** |
| m-p7m.json (모의) | **1** | 36 | crossRef 실패 37 → **29/49** | **배포 불가.** crossRef를 한 번 더 고쳐야 한다 |

- **해결률:**
  - 연습은 지난 지적 37건 중 해결 23(62%), 부분 10, 미해결 4다.
  - 모의는 서브에이전트 집계(참고 포함 182행) 기준으로 해결 약 110(60%), 부분 약 52, 미해결 약 20이다.
  - 모의 Part 5는 100% 해결이다.
- **정답 키가 틀린 문항은 없다.** 필수 7건은 모두 "정답이 둘로 읽힘"이나 "해설이 현재 보기·지문과 다름"이다. 연습 3건과 모의 2건은 각각 한두 줄 수정이면 된다.
- **크게 나아진 점:**
  - 연습 p7-2의 crossRef 실패가 12 → 4로 줄었다.
  - 연습 Part 6의 "미래형 하나 + 정답 will"(10 → 0)과 "완료 기록" 단서(9 → 1)가 없어졌다.
  - 모의는 회차 간 같은 뼈대가 Part 5·6·7 단일에서 풀렸다.
  - 모의 Part 7의 "X does not mean Y" 공식도 크게 줄었다.
- **남은 가장 큰 문제: 모의 m-p7m의 crossRef.** 49문항 중 20문항만 통과한다(13차 12문항). 회차별 통과 수는 다음과 같다.
  - 1회 5/10
  - 2회 2/9
  - 3회 6/10
  - 4회 4/10
  - 5회 2/10

  고친 방식도 반복된다. 판단 문장을 지운 자리에 **답을 말하는 사실 문장**이 들어갔다. 예: "The origin statement is the only item still missing", "Halvern is one of our current customers".
- **또 옮겨 간 공식**(직접 확인):
  - 연습 P6 tense: "미래형 하나" 대신 두 가지가 생겼다.
    - 둘째 미래형을 수동태로 넣어 목적어 때문에 문법만으로 지워지는 구성: 007·011·013·019·022·023·027.
    - 정답이 유일한 과거형인 거울형: 001·003·004·009·017·018·021·024·028.
  - 모의 P6는 아직 "미래형 하나 + 정답 will"이 6문항이다(1-04·2-03·2-04·3-04·4-01·5-02). 또 "used to / will start / has stopped / 현재" 보기 세트가 3회·4회·5회에 반복된다(3-01·4-03·5-01, 모두 정답 현재형).

---

## 1. 연습 p6-1.json

### 지난 지적(14차) 처리
| 항목 | 상태 | 근거 |
|---|---|---|
| 필수 028-Q2 | 해결 | "now that the new folders are live", audit log 문장 삭제 |
| 권장 1 미래형 하나 + will | 부분 | 10개 모두 바뀌었다. 하지만 7개는 둘째 미래형이 수동태라 태만으로 지워진다(아래 권장 1) |
| 권장 2 완료 기록 단서 | 해결 | 9 → 1(006 "attached"류만 남음) |
| 권장 3 006-Q2 / 4 022-Q3 | 해결 | 단어 반복이 없어졌다 |
| 권장 5 색 표시 정답 | 해결 | 002·006 두 개만 남았다 |
| 권장 6 문항 순서 | 부분 | 001~016 V-T-C-S 10 → 7. 017~032 반복 묶음 5·4 → 3·3 |
| 권장 7 엉뚱한 오답 | 해결 | 다만 029 해설이 옛 보기를 설명한다(필수 3) |
| 권장 8 008↔p7-1-017 / 9 026↔006 / 10 012 | 해결 | |
| 참고 | 대부분 해결 | 남은 것: 023 난이도, 소재 012/017·015/032·004/021, Veldrin/Veldra 이름 |

### 필수 (모두 직접 확인)
1. **p6-1-017-Q1 | 정답이 둘로 읽힌다.**
   - 문장: "Since April 10, the temporary test page has displayed only a link to the permanent portal. The data team {1} that page."
   - 페이지가 아직 링크를 띄우고 있으므로, 나중에 아예 끈다는 뜻의 will deactivate도 자연스럽다. "the old page no longer accepts files"는 두 해석과 모두 맞는다.
   - 고칠 방법: 뒤에 "The link itself will stay in place until the project ends."를 넣는다. 보기는 has deactivated / was deactivating / will deactivate / will have deactivated로 바꾼다.
2. **p6-1-026-Q4 | 정답이 둘로 읽히고, 해설 논리가 틀렸다.**
   - 문장: "She {4} the shelf maps at the audit desk and is asking staff about last week's rearrangement."
   - "has examined the maps and is asking staff"(배치도는 다 봤고 지금 직원에게 묻는 중)도 성립한다. 해설의 "has examined는 전체 점검이 끝났다는 뜻"은 틀렸다.
   - 고칠 방법: "She {4} the shelf maps at the audit desk; they must stay there until she finishes."로 쓰고, 직원 질문은 다음 문장으로 옮긴다. 해설도 그에 맞게 고친다.
3. **p6-1-029-Q1 | 해설이 옛 보기를 설명한다.**
   - 해설: "선반에 표준 크기를 인쇄하는 것은…". 현재 보기는 "Operators now pick the closest standard size and add less padding."이다.
   - 고칠 방법: "가장 가까운 표준 규격을 고르는 것은 뒤의 'rather than the nearest size already in stock'과 정면으로 충돌한다."

### 권장
1. **tense: 둘째 미래형이 태로만 지워진다 | 007·011·013·019·022·023·027.**
   - 예: 011은 보기가 are applied / will apply / will be applied / would have applied인데 뒤에 목적어 "a new forecasting model"이 있다. 해설도 "will be applied는 수동태여서 목적어와 맞지 않는다"고 한다. 14차 규칙(같은 시점대 형태 2개 이상)을 형식으로만 지킨다.
   - 고칠 방법: 같은 태로 맞춘다. 011 will apply / will have applied / have applied / applied. 013 will process / will have processed / has processed / processed. 022 will check / will have checked / has checked / checked. 019 will be installed / will have been installed / has been installed / was installed.
2. **tense 거울형: 정답이 유일한 과거·완료형 | 001·003·004·009·017·018·021·024·028.**
   - 단서는 바로 옆 문장의 yesterday·last Friday·last weekend다.
   - 고칠 방법: 과거 시점대 보기를 2개로 만든다. 003 had registered, 004 had been guided, 009 had brought, 018 was entering, 024 was testing. 001에 has confirmed를 넣으면 정답이 둘이 되므로 had confirmed를 넣는다.
3. **문장 고르기 지시어 단서 재발 | 017·018·021·024·030·031·032 (7/16).** 다음 문장이 This/These/That + 명사로 정답을 받는다. → 2~3개를 시간 순서나 대조 연결로 풀리게 바꾼다.
4. **단어 반복으로 풀린다.**
   - 010-Q4: form을 쓴 보기가 정답뿐이고 다음 문장이 "that form"이다. → 오답 "A feedback form will be handed out at the end of each session."
   - 021-Q2: batch를 쓴 보기가 정답뿐이다. → 오답 D "Each unit receives a code linked to the batch's shipping date."
5. **025-Q4:** 빈칸 문장 안의 "as part of its regular weekly procedure"로 풀린다. → 이 구를 다음 문장으로 옮긴다.
6. **030-Q2:** 정답이 1문단의 "written handover notes"를 되풀이한다. → "Save each entry in the shared handover log before your shift ends."
7. **014 3문단:** 2문단은 "scoring is complete"인데 3문단은 "may receive equal scores"라 시점이 어긋난다. Accordingly의 근거 사이에 다른 문장이 끼어 있다. → "have received"로 바꾸고, "Applicants should expect…" 문장을 {3} 뒤로 옮긴다.
8. **008·015 2문단:** 단서 문장이 시제를 그대로 풀어 말한다("That stage is over…", "nothing left to assess…; no further responses will be accepted"). → 008은 그 문장을 지운다. 015는 "She sent me her notes this morning."
9. **017 구성:** 메일이 소개 없이 "the temporary test page"로 시작한다. → 그 두 문장을 3문단 끝으로 옮기고 "the temporary upload page we tested in March"로 소개한다.
10. **018:** Q3 보기가 모두 "It…"인데 가리킬 worksheet가 두 문단 앞에 있다. → "The worksheet…". 1문단 "the panel used"는 수신자를 3인칭으로 부른다. → "you used".
11. **009-Q4 ko:** 정답만 "가져와 주십시오"체다. → "가져와 달라".
12. **문장 고르기 위치:** 017~032에서 마지막 빈칸이 0/16이다. 파일 전체는 마지막 11 / 중간 16 / 첫 문단 5로 규격(16/12/4)과 다르다. → 020·024·027·030·031 중 4~5개를 {4}로 옮긴다.
13. **029~032:** 네 지문 모두 tense가 없고, 031·032는 vocab이 3개씩이다. → 031·032에서 vocab 하나씩을 tense나 pos로 바꾼다.
14. **극단어 오답:** all/every/only/entire를 쓴 오답이 본문과 정면으로 부딪쳐 지워지는 지문이 9개다(018·019·024·026·027·028·029·030·031). → 3~4개를 같은 소재의 그럴듯한 문장으로 바꾼다.
15. **파일 안 소재 겹침:** 001↔021(감사인이 원 기록을 추적한다), 004↔010(새 장비 첫 교육, 같은 수동 tense 빈칸). → 021의 검증자를 고객사 품질 담당자로 바꾼다. 010의 빈칸은 능동으로 바꾼다("Operators {2} turns…", are taking).
16. **016-Q2·022-Q3:** 정답만 "Please"로 시작한다. → 오답 하나에도 Please를 붙인다.
17. **026-Q1:** count도 어느 정도 통한다. → relabel.

참고: 004-Q4는 certification을 쓴 보기가 정답뿐이다. 013 ko에서 동사가 빠졌다. 011은 forecasting model과 scheduling model이 섞였다. 017 ko는 "자료 담당팀/데이터팀"이 섞였다. 023 3문단은 한 문장이다. 028 1문단 절이 겹친다. 017-Q4와 019-Q4는 둘 다 강조 themselves가 정답이다.

## 2. 연습 p7-1.json (바뀐 7세트)

### 지난 지적 처리
- **해결:** 014-Q1 explain, 015-Q1, 023-Q2~Q4 옛 오답, 026-Q2~Q4, 파일 안 겹침 3쌍(022/012, 024/025, 030/004), 026↔p7-2-015, 요금 + 혜택 광고, 스캐너 겹침.
- **부분:** 채팅 흐름(025는 벗어남), 다른 반복 구조.
- **미해결:** 005-Q1(다른 문항의 답이 드러남, 이번 수정 범위 밖), 013/014 뼈대, 022·028 "연습 후 독립 작업 승인", 018·022·030 "제출물 필수 기재 항목".

### 권장
1. **026-Q1:** 질문 주어는 "results"인데 정답 C만 "They…"이고 오답은 모두 "It…"라 문법만으로 풀린다. → 오답을 They로 맞춘다.
2. **025-Q2:** 인용 "The clock is ticking." 바로 뒤, 같은 발언 안에 "Please call him now…"가 있어 의도가 글자 그대로 드러난다. → 3:28 발언은 인용만 남기고, 3:31을 "I called him directly…"로 시작한다.
3. **023·025·027:** 4문항 채팅 세 세트의 순서가 같다(detail → intention → inference → detail). → 027을 purpose → detail → intention → inference로 바꾼다.
4. **005-Q1:** 질문이 Q2 정답을 전제한다(14차 그대로). → q "What is indicated about the afternoon session?"
5. **013/014:** 연속 세트의 예약 규칙 뼈대가 같다(14차 그대로).
6. **018·019·020:** "업체 제공 vs 이용자 책임"이 연속 3세트다(14차 그대로).
7. **016·018·022·028:** 사내 교육 소재와 "연습 후 독립 승인" 모티프가 반복된다.
8. **018·022·030:** "새 절차 → 제출물 필수 기재 항목"이 반복된다.

참고: 025 3:24와 3:31은 누가 연락하는지가 어긋난다. 022-Q2 오답 A와 explain은 지워진 소재(반납품 점검)를 가리킨다. 023-Q3은 type이 inference인데 실질은 detail이다. 026 ko "당국" → "회사 관계자들".

## 3. 연습 p7-2.json

### 지난 지적 처리 (14차 crossRef 12개)
| # | 문항 | 상태 |
|---|---|---|
| ① | 001-Q4 | 해결(이메일만으로 소거 추측할 여지는 약간 남음) |
| ② | 002-Q4 | 해결 |
| ③ | 003-Q3 | 해결 |
| ④ | 005-Q3 | 부분(아래 권장 1) |
| ⑤ | 007-Q3 | 해결 |
| ⑥ | 010-Q4 | 부분(아래 권장 4) |
| ⑦ | 011-Q4 | 해결 |
| ⑧ | 012-Q3 | 부분(오답 A·C가 약함) |
| ⑨ | 012-Q4 | 해결 |
| ⑩ | 013-Q3 | 해결 |
| ⑪ | 015-Q3 | 해결 |
| ⑫ | 015-Q4 | 해결 |

- **crossRef 판정:** 30문항 중 26문항 통과, 4문항 실패(005-Q3·006-Q3·006-Q4·010-Q4).
- 권장 2("두 선택지 중 고르기")는 부분 해결이다(001·002·008이 남음).

### 권장
1. **005-Q3:** 원래 예산에서 바뀐 항목이 카메라 하나뿐이라 이메일만으로 풀린다. → 수정본에서 다른 항목도 바꾼다(예: "lowers the presentation amount to $600 because the village hall waived its fee"). 그러면 Q4는 1,500으로 "$500 below the limit"가 된다.
2. **006-Q3:** 이메일과 상식만으로 엘린이 골라진다. → 엘린을 "hotel reception for one year"(소매업 아님), 오린을 "supermarket checkout for seven months"로 바꾸고 정답을 오린으로 한다.
3. **006-Q4:** 이메일이 B·C·D마다 "but…"으로 결격을 직접 짚는다. → "but"을 빼고 날짜·끝자리·명의만 중립적으로 나열한다.
4. **010-Q4:** 이메일만으로 풀리고 Q3의 답을 다시 묻는다. → q "When will Ms. Toven's final mentoring session most likely take place?" 메모에 첫 주(1월 6일)를 넣고 6주 계산을 하게 한다.
5. **새 반복 틀:** "마지막 문서가 사람이나 첨부 4개를 속성과 함께 나열하고, 규칙에 맞는 하나를 고르기"가 001-Q4·003-Q3·006-Q3·006-Q4에 있다. → 하나를 날짜·금액 계산형으로 바꾼다.
6. **"두 선택지 중 하나 고르기":** 001-Q3·002-Q3·008-Q3. → 002-Q3을 다른 축으로 바꾼다.
7. **"요청 이메일 + 표 매칭":** 008·010·014. → 014 Q3를 "What will the class's visit include?"로 바꾼다.

참고:
- 012-Q3 오답 A·C는 절대어라 눈치로 지워진다.
- 011·012·013-Q5 정답이 지문 표현 그대로다.
- 011 ko "차고" → "물류 거점".
- 012 ko 요청 내용이 바뀌었다.
- 007-Q4는 상식으로 풀린다.
- 008-Q4는 Q3과 같은 연결을 쓰고 elevator가 표면 단서다.
- 003-Q4 오답 D 날짜가 지문에 없다.
- 007 ko 셔틀 문장, 008 ko 어미, 012 P2 세미콜론 뒤 대문자.
- 소재: 013/p6-1-012, 014/p7-1-019, 015/p7-1-026.

## 4. 공통(연습 파일 간)
- p7-1-002 ↔ p7-2-006: 오전 10시·training suite 같은 세부는 빠졌지만 둘 다 "신입 입사 준비" 소재다(부분).
- p7-1-004(라벨 프린터) ↔ p7-2-002(스캐너): 이웃 소재다(참고).
- 모의 m-p6-1-03(공동 판매 수수료 배분)이 m-p7-2-13과 같은 논점이다(모의 절 참고).

---

## 5. 모의 m-p5.json
- **13차 필수 2-20(현 2-27)과 권장 14건이 모두 해결됐다.** 회차 간 유형 순서와 난이도 순서도 모두 달라졌다.
- **권장:**
  - **4-12 / 4-13:** 4-12 정답 seal이 바로 다음 4-13의 첫머리("The seal on the certificate…")에 나온다. → 4-13을 "The signature on the certificate is identical ------- the specimen…"으로 바꾼다.
  - **2-08:** 연습 p5-2-009와 보기 넷(include/including/have included/includes)과 함정이 같다. → contain 계열로 바꾸거나 시제 문항으로 바꾼다.
- **참고:**
  - comparison 자리 5개 중 진짜 비교 구문은 2-28 하나다(나머지는 도치).
  - 정답 to가 4번 나온다.
  - 오답 단어가 재사용된다(conceal, seasonal, prevalent, incidental…).
  - 4회에 neither가 3번 나온다.
  - 5-27/5-28이 연속 명사 자리다.
  - 1·2회 3단계 문항 일부가 정의를 품고 있어 쉽다.
- **난이도:** 3단계 수는 회차마다 9로 같다. 체감은 1회(가장 쉬움) < 2회 < 3·4회 < 5회(가장 어려움)다. 1·2회의 쉬운 3단계 2~3개를 바꾸면 균형이 맞는다.

## 6. 모의 m-p6.json

### 필수
1. **m-p6-4-04-Q3 | 정답이 둘로 읽힌다**(직접 확인).
   - 문장: "The agreement {3} prices for the listed carton sizes. Any change would require a written amendment…"
   - 계약은 이미 체결됐으므로 specified도 자연스럽다. 해설은 was specifying만 배제한다.
   - 고칠 방법: 보기 specified → will specify. 해설에 "계약은 현재 유효하다(첫 문장 sets)"를 더한다.

### 권장
1. **14차 규칙 위반: 미래형 하나 + 정답 will 6문항**(직접 확인).
   - 1-04 (were/have been/had been/will be sent) → had been sent를 will have been sent로
   - 2-03 (will open/has opened/is open/opened) → will open/will have opened/has opened/is open
   - 2-04 (reviewed/has/had/will review) → had reviewed를 will have reviewed로
   - 3-04 (has begun/will begin/began/had begun) → had begun을 will have begun으로
   - 4-01 (has divided/divided/will divide/had divided) → will divide/will have divided/has divided/divided
   - 5-02 (will send/has sent/was sending/had sent) → had sent를 is going to send나 will have sent로
2. **같은 보기 세트가 회차마다 반복된다**(직접 확인). "used to V / will start V-ing / has stopped V-ing / 현재형"에 정답 현재형인 문항이 3-01·4-03·5-01이다. → 둘을 다른 세트로 바꾼다.
3. **3-03-Q2:** 오답 was reported가 시제가 아니라 태로 지워진다. ko에서도 태 구별이 사라졌다. → had reported로 바꾼다.
4. **2-01-Q2:** 바로 앞 문장 "We have finished the survey of Line A."가 완료형을 그대로 드러낸다. → "Repairs on Line A are scheduled to start tomorrow."
5. **1-03·2-01·5-03 등:** 정답이 유일한 과거형인 거울형이다(5-03 renewed, 1-03 approved). → 과거 시점대 보기를 하나 더 넣는다.
6. **회차 안 소재:** 4-01(걷기 동호회 나들이)과 m-p7-4-11(강 유람)이 같은 회차의 여가 나들이다. → 4-01을 회사 소재로 바꾼다.
7. **회차 간 소재:**
   - 3-02(정산 묶음 참조 번호로 대조) ↔ m-p7-5-13(봉인 번호로 대조)
   - 4-02(배출 산정 경계) ↔ m-p7-3-13(출장 배출)
   - 1-03(공동 판매 수수료 배분) ↔ m-p7-2-13
   - → 뒤 회차 쪽을 바꾼다.
8. **4-01:** email 위치·문항 순서가 1회 P6-01과 같다(voc/ten/pos/sen). → 순서를 섞는다.

참고: 3-04·2-03 난이도 3은 체감 2다. 1-02·1-04의 verify/validate가 같은 개념이다. 5-04-Q4는 still이 양보 연결어를 끌어당긴다. 5-01-Q4는 단어가 반복된다. 5-02 ko "보냈었었다".

## 7. 모의 m-p7s.json
13차 지적은 대부분 해결됐다: 1-04·1-08·3-08 인용문, 2-04 Q1/Q2, 2-06 ko, 4회 바꿔 말하기, 4-06/4-10, 5-05 seat, 5-09 lot, 1회 소재 겹침 4쌍.

### 권장
1. **3-03-Q2:** 오답이 cargo판의 잔재라 상식으로 지워진다. 인용 "Don't hold on to the wording"이 바로 앞 질문에 대한 글자 그대로의 답이다. → 오답을 지문 소재로 바꾸고 인용을 "The impression is what travels."로 바꾼다.
2. **5-03-Q2:** "The mountain is mostly in the scale"은 창작 비유이고 글자 뜻(scale)으로 풀린다. → "The numbers aren't the problem."
3. **5-05 ↔ m-p6-5-04:** 둘 다 "정보를 숨겨 편향을 막는다"이고, 7s Q1이 이것을 직접 묻는다. → 1문단의 withheld 문장을 지운다.
4. **2-04-Q1:** 질문 "Why must the original digital file be kept?"의 전제가 본문에 없다. → 1문단 끝에 "Keep the digital file as the official copy; a printout does not carry the verification information."
5. **해설이 지문과 어긋난다:**
   - 5-07-Q2 "건물 아래 설비선" → "배관 경로가 짧아지고 접근이 쉬워진다"
   - 5-10-Q1·Q2 → "기록소에 도착하지 않았음", "셋째 문단 'A low-coverage month can omit…'"
   - 3-07-Q1 → "확대된 대장으로 반복 접근을 확인한다"
6. **2-05 / 2-07(+1-06·1-08):** "통제 비교 실험 → 처음엔 좋아 보인 쪽이 더 나은 지표에서 짐 → 확대 전 추가 자료" 전개가 반복된다. → 2-07을 실험·역전 없는 기사로 바꾼다.
7. **4-05 / 4-06:** 편지 두 개가 연속이고 뼈대가 같다(제공 → 담당·취급 → "Please confirm… by"). → 06을 공지나 이메일로 바꾼다.
8. **4-04 ↔ m-p5-5-06:** 둘 다 엠바고·조간 게재 불가 소재다(회차 간). → m-p5-5-06을 "a moratorium on hiring" 같은 다른 문맥으로 바꾼다.
9. **3회 IT 소재 3세트:** 7s-3-06 DB 복구, 7m-3-11 예약 앱 장애, 7m-3-14 설계 SW seat. → 7m-3-11을 비IT 소재(냉난방 고장 신고 대 개선 제안)로 바꾼다. S1/S2 뼈대는 유지할 수 있다.
10. **맺음말 표기:** "Yours sincerely,\nArvin Telmo"처럼 역슬래시 n이 글자로 들어간 곳이 3곳(2-06 외)이다. → 실제 줄바꿈으로 바꾼다.

참고:
- 3회 언어 소재가 3세트다(통역·번역·언어 수당).
- 3-10 ko에 "용광로"가 남았다.
- 3-01 ko 회사명 "조르베사/요르베사", 7m-3-14 "캘런/칼렌"이 섞였다.
- explain 위치 표기 오류: 4-02-Q2, 4-10-Q4.
- 4-05-Q3 type은 inference인데 실질은 detail이다.
- 5-09 ↔ 7m-5-11: 비슷한 이름 업체 소재가 겹친다.
- 2-09-Q2 인용은 글자 뜻에 가깝다(허용).
- 1회 "ten working days"와 "urgent" 문장이 반복된다.

## 8. 모의 m-p7m.json

### 필수
1. **m-p7-5-14-Q3 | 정답이 둘로 읽힌다**(직접 확인).
   - 질문: "Which part of the final submission meets the specific request in the letter?"
   - 편지에는 "Please send the records by November 12"도 있고 제출일은 11월 11일이다. 그래서 오답 B "Arrival of the files before November 12"도 편지의 요청을 충족한다. 정답 A도 편지 문구를 그대로 옮겨 편지만으로 풀린다.
   - 고칠 방법: B → "A blank copy of the redesigned receiving form"(편지 "the sample you sent is blank"로 반박된다).

### 권장: crossRef 29문항이 아직 한 지문으로 풀린다
| 회차 | 실패 문항 | 주된 경로 |
|---|---|---|
| 1 (5/10 통과) | 11-Q3·11-Q4·12-Q3·13-Q4 (+14-Q4 참고) | 이메일이 사실로 답을 말한다("has not sent the acceptance message", "occupy very little space…"). 오답이 이메일만으로 소거된다. 13-Q3·Q4가 같은 $360 계산이다 |
| 2 (2/9) | 11-Q3·11-Q4·12-Q3·14-Q3·14-Q4·15-Q3·15-Q4 | 11 "cash for the parking and transponder amounts", 12 질문의 "moved", 14 이메일의 B412·B406 상태, 15 새 문장 "Halvern is one of our current customers" |
| 3 (6/10) | 12-Q4·13-Q3·13-Q4·14-Q4 | 12 제목 "Allowance documents complete", 13 표와 상식(1분기), 13-Q4 질문의 "overstated" + Q3 누설, 14 오답이 이메일 사실로 소거된다 |
| 4 (4/10) | 11-Q4·13-Q3(약)·13-Q4·14-Q3·14-Q4·15-Q4 | 11 이메일과 소거, 13 A=가용 상식, 14 이메일 3문단 "Toven Marr's coverage hours"와 "a line explaining why I had been away", 15 양식만으로 동률 계산 |
| 5 (2/10) | 11-Q3·11-Q4·12-Q3·12-Q4·13-Q4·14-Q3·14-Q4·15-Q4 | 11 보기 D가 "two manufacturing sites"를 드러내고 이메일에 "the only item still missing"이 있다. 12 이메일에 "option two is orders"가 있다. 13 오답에만 "alone"이 붙는다. 14 기사만으로 풀린다. 15 질문 문구 + 공지 |

- 문항별 고칠 문장은 각 회차 서브에이전트 보고를 정리해 아래에 적었다. 공통 원칙은 하나다. **이메일·마지막 문서에는 답을 가리키는 사실을 쓰지 않는다.**
- **1회:**
  - 11-Q3: q "Whose reply must Ms. Fenwick receive before P64 can be archived?" 이메일 "Norin Vale, the client's reviewer, has not yet replied", Tera Sol "is confirming receipt of the final payment".
  - 11-Q4: "occupy very little space…" 문장을 지운다. B "Keep only the more recent of the two drawings", D "Delete them once the client accepts the final report".
  - 12-Q3: 오답 "Telephone the number given in Brevin's request to confirm again", "Ask Brevin to resubmit its commercial agreement", "Forward the record to a third employee for activation".
  - 13-Q4: q "What information does the editor still need to state the financial result?" / "The price per kilowatt of monthly peak demand".
- **2회:**
  - 11-Q3: "I offered the supervisor cash for part of the statement, but she refused it."
  - 11-Q4: 공지 "Repayment is arranged by the payroll officer for the driver's home depot." 이메일에서 지점별 담당자를 밝힌다(정답 Ceri Noss).
  - 12-Q3: 편지 "ceiling repairs between July 10 and July 12", q "If drilling planned for July 11 is postponed to July 14…".
  - 14-Q3: 이메일의 B412·B406 상태 문장을 지운다.
  - 14-Q4: q "Why does B412 still appear as outstanding?" / "It was left out rather than scanned at handover".
  - 15-Q3: 오답을 v3의 실제 결함으로 바꾼다.
  - 15-Q4: "Halvern is one of our current customers."를 지우고 q "What is true about R8-v3?"로 바꾼다.
- **3회:**
  - 12: 제목을 "Allowance application"으로 바꾸고, 오답을 공지로만 배제되게 한다.
  - 13: 기사에 회계 분기를 넣는다("reporting year begins in February", 정답 1,520). Q4는 "What error did the compiler make?"로 바꾼다.
  - 14-Q4: 오답 "Forward Samil's original activation link to Calen", "Move Samil's project files…", "Purchase an additional seat for Calen".
- **4회:**
  - 11-Q4: 오답을 편지로만 반박되는 것으로 바꾼다("A reservation for two bicycle spaces" 등).
  - 13: 분류 코드를 K/M으로 바꾸고, 이메일은 "The first draft used the preliminary labels."까지만 쓴다. Q4 오답 "Move 80/90 helmets…".
  - 14-Q3: 이메일 3문단을 "The working hours and coverage details in that draft were accurate."로 바꾼다.
  - 14-Q4: 초안 항목 네 개를 나열하고 q "Which item in the earlier draft should not have appeared?"로 바꾼다.
  - 15-Q4: 양식에서 "in the quiet-area pile"을 지운다.
- **5회:**
  - 11-Q3: 보기 "One line: Lydora" / "Two lines: Lydora and Senwick"* 등.
  - 11-Q4: "only item still missing"을 지우고 정답을 "The requester has not completed the final customer check"로 바꾼다.
  - 12: "option two to destination U"로 바꾸고, 이전 녹음 내용 문장을 지운다.
  - 13-Q4: "alone"을 모두 지우고 q "What should the branch do with the first advice?"로 바꾼다.
  - 14-Q4: 검토서에 "receiving entry for K20, with no production record"를 넣고 Q3과 다른 오답을 쓴다.
  - 15-Q4: q "Why can't Q7's lower price be evaluated?" / "It arrived without a technical proposal".

### 권장: 그 밖
1. **25세트 모두 "규정·요율 문서 + (기록) + 적용 이메일" 흐름이다.** Q3·Q4가 crossRef inference이고 Q5가 detail인 배치도 다섯 회차가 같다. 각 회차 첫 세트는 pur/det/inf/inf/det로 다섯 번 똑같다(직접 확인). → 회차마다 1세트는 광고 + 후기나 일정·인원 계산형으로 바꾸고, crossRef를 Q2나 Q5에 두는 세트를 하나씩 만든다.
2. **4-13 / 4-15:** 둘 다 "초안과 확정 기록 비교 → 변경 설명 요청" 틀이다.
3. **1-11 이메일:** "has not sent the acceptance message"라고 한 뒤 "the approval message"에 오류가 있다고 해서 같은 메시지로 읽힌다. → "the design-approval message dated March 3".
4. **5-14-Q4:** Q3과 정답·오답이 사실상 같다.
5. **2-13 ↔ m-p6-1-03:** 공동 판매 배분 논점이 겹친다.
6. **해설 오류:** 5-15-Q5 "새 가격 제출은 불가함을 인정한다", 2-13-Q5, 4-15-Q5 근거 위치.
7. **4회:** not-true Q1/Q2 세트가 없다(다른 회차는 있다).

참고:
- 4-14 ko "토벤 마르/토벤 마"가 섞였다. 4-15 이메일은 수신자를 3인칭으로 부른다. 4-12-Q2 "the order"는 단수다.
- 1-11 ko "프로젝트을"이 있고, project를 "사업"으로 옮긴 곳이 1·3·4회에 남았다.
- 1-13-Q2 ko "동시에 대신"이 남았다. 1-14 shift supervisor 번역이 섞였다.
- 2-12 한 문장 문단, 2-12-Q4 정답이 질문을 되풀이한다.
- 2-14 ko "이전 코드" → "인계된 코드".
- 인명·회사명 재사용: Orvessa, Rovalen, Neris, Venn.

## 9. 모의 회차 간 같은 뼈대
| 파트 | 13차 | 지금 |
|---|---|---|
| Part 5 | 1~30 유형·난이도 순서가 같음 | **풀림.** 회차마다 순서가 다르다 |
| Part 6 | 01 email, 03 email+voc/sen/ten/voc, 04 기사 1·2·3·4 | **대부분 풀림.** email 위치가 회차마다 다르다. 4회 01이 1회 01과 같은 순서인 것만 남았다 |
| Part 7 단일 | 위치별 지문 종류가 같음 | **풀림.** 2·3·4문항 구간 안에서 종류 위치가 회차마다 다르다(chat은 4문항 구간이라 08~10에 있다) |
| Part 7 복수 | 이중·이중·삼중×3, Q3·Q4 crossRef, Q5 detail, 2번 세트 Q2 synonym | **부분.** synonym 위치와 not-true 위치는 회차마다 바뀌었다. Q3·Q4 crossRef + Q5 detail 배치와 각 회차 첫 세트의 문항 유형은 다섯 회차가 같다 |

## 확인하지 못한 것
- `docs/mock`은 git에 없어서 수정 전 텍스트와 diff로 대조하지 못했다. 13차 지적은 리뷰 인용문으로 찾았다.
- 연습 p6-1도 0da755c에 들어 있지 않아 diff는 참고로만 썼다.
- 연습 p7-1에서 바뀌지 않은 23세트는 다시 풀지 않았다.
- 회차 간·파일 간 소재 겹침은 제목·핵심어 검색 위주라, 다르게 바꿔 쓴 근접 중복은 놓쳤을 수 있다.
- 서브에이전트가 낸 수정 문장, 특히 crossRef 수정안은 반영한 뒤 지문을 하나씩 가리고 다시 풀어 봐야 한다.
- passagesKo는 뜻이 바뀌는 오류만 봤다. 영어 자연스러움과 난이도는 텍스트 기준의 판단이다.
