# 수정 22차 결과 (리뷰어 직접 수정)

## 요약
- **m-p7m.json:** crossRef 49문항(crossRef 표시 기준)을 3단계 가림 검증으로 다시 풀었다. 수정 전 통과 **45/49**(실패: 1-12-Q4 약함, 2-12-Q3, 3-14-Q4, 5-11-Q2) → 수정 후 **49/49**.
- 함께 고친 것: 2-12-Q4(crossRef 표시는 없으나 24차가 실패로 셈. 정답을 드러내던 "without using power tools" 제거), 2-12 Q1·Q2에 남아 있던 "broadcast"·"방송"(파일 안 0건).
- 바꾼 id: `m-p7-1-12`(이메일 2문단 1문장 삭제 + Q4), `m-p7-2-12`(Q1·Q2·Q3·Q4), `m-p7-3-14`(Q4), `m-p7-5-11`(Q2). 영어·ko·explain을 함께 고쳤고, 지문을 바꾼 1-12는 passagesKo도 고쳤다.
- id·세트 수(25)·문항 수(125)·type·정답 위치는 그대로다(스크립트에서 answer 불변 assert). JSON 파싱 확인. 기존 들여쓰기(2칸)·ensure_ascii=False를 유지했다.
- **p3-3.json:** 29차 필수 2묶음 모두 **작성자가 이미 해결**했다(파일 SHA가 29차 검토본과 다름). 내가 고친 것은 없다.
- 커밋하지 않았다.

## 1. m-p7m.json 변경 내역

### m-p7-1-12 (이메일 2문단 + Q4)
- 지문(이메일 2문단) 삭제: "Calto and Mardo have made no requests to alter their payment details." → 삭제(답을 말하는 사실 문장, 16차 규칙). passagesKo의 대응 문장 "칼토와 마르도는 지급 정보를 바꾸어 달라는 요청을 하지 않았습니다."도 삭제.
- Q4 보기(정답 A 유지):
  - C: "Hesk only" → "Brevin, Calto, and Mardo"
  - D: "Brevin and Hesk" → "All four, using the details currently on file"
  - 이전 C·D는 공지의 보류 규칙이나 상식만으로 지워졌다. 새 C는 브레빈이 아직 활성화되지 않았다는 이메일 사실 + 활성화 전 보류 규칙(공지)이, 새 D는 "옛 계좌가 등록돼 있어도 보류"(공지) + 대기 중인 업체(이메일)가 있어야 지워진다.
- ko 보기·explain 갱신.

### m-p7-2-12 (Q1·Q2·Q3·Q4)
- Q1 C: "The broadcast’s intended customers" → "The neighboring businesses’ customers" (ko "방송 대상 고객" → "이웃 업체의 고객")
- Q2 B: "Naming a replacement broadcast customer" → "Inviting customers to the Unit 16 briefing" (ko "대체 방송 고객 지정" → "16호 브리핑에 고객 초대")
- Q3 D(정답 A 유지): "Moving the July 12 afternoon drilling to nine o'clock that morning" → "Wiping the shelves on July 14 after the drilling is finished". 이제 편지만 보면 7월 14일 보기가 둘(A·D)이라 고를 수 없고, 청소는 통지 대상이 아니라는 공지 문장이 있어야 D가 지워진다. 24차가 지적한 틀린 D 해설도 다시 썼다.
- Q4 보기(정답 D 유지):
  - A "Continue drilling after changing the named contact" → "Continue drilling while the named contact stays on site"
  - B "Choose a new ceiling color with management approval" → "Ask management to approve a different ceiling color"
  - C "Extend drilling into the reserved briefing period" → "Resume drilling as soon as the briefing finishes early"
  - D "Put labels on the trays without using power tools" → "Label the storage trays"
  - C는 편지(드릴 재개 1시) + 공지(확인된 시간 밖 작업 불허)를 둘 다 봐야 지워진다.
- ko 보기 4문항·explain(Q3·Q4) 갱신. Q1·Q2 explain은 broadcast를 언급하지 않아 그대로 두었다.

### m-p7-3-14 (Q4, 정답 C 유지)
- A "Reassign it to the new designer after disabling its current access" → "Reassign it to Calen after disabling its current access"
- B "Renew its subscription before its holder returns" → "Release it when the subscription is reviewed at quarter-end"
- C* "Keep it assigned for its holder to use after approved leave" → "Keep it with its current holder"
- D "Retain its current assignment for tasks being performed this week" → "Transfer it to Pera Lin for her current assignments"
- 이전 B·C가 "holder returns / after approved leave"로 휴가 사실을 드러내 이메일 없이 풀렸다. 새 보기에는 휴가·복귀 표현이 없다. ko·explain 갱신.

### m-p7-5-11 (Q2, 정답 B 유지)
- A "Two lines, both identifying the central warehouse" → "Two lines, both naming the central warehouse"
- B* "Two lines, one for Lydora and one for Senwick" → "Two lines, one per manufacturing site"
- C "One line combining Lydora and Senwick" → "One line covering both batches"
- D "One line for Lydora, following the previous shipment" → "One line, following last month's order"
- 보기에서 공장명을 뺐다. 이제 공지만으로는 X73에 제조지가 몇 곳인지 알 수 없다. ko·explain 갱신.

### 보기 대입(정답 하나 확인)
| id-Qn | A | B | C | D | 결과 |
|---|---|---|---|---|---|
| 1-12-Q4 | 칼토·마르도: 대기 중인 변경 없음 → 지급 ○ | 헤스크 확인 통화 전 → 보류 × | 브레빈 활성화 전 → 보류 × | 옛 정보가 등록돼 있어도 대기 중 지급은 보류 × | A 하나 |
| 2-12-Q1 | 색 검토 안 함 × | 연락 담당자 ○ | 통지 항목 아님 × | 통지 항목 아님 × | B 하나 |
| 2-12-Q2 | 관리실이 조정함 × | 16호 일, 입주업체에 맡긴 것 아님 × | 관리실이 확인함 × | 천장 색은 업체 소관 ○ | D 하나 |
| 2-12-Q3 | 소음 작업을 미기재 날짜로 이동 → 새 통지 ○ | 기재 날짜 안 × | 기재 날짜 안 중단 후 허용 시간 재개 × | 청소는 통지 대상 아님 × | A 하나 |
| 2-12-Q4 | 11:30~1시는 드릴 시간 밖 × | 색은 관리실 승인 대상 아님 × | 1시 전 드릴은 확인된 시간 밖 × | 조용한 작업은 중단 시간에 가능 ○ | D 하나 |
| 3-14-Q4 | 칼렌은 D12(사밀) × | 베라 다음 주 복귀·필요 × | 유지 ○ | 페라는 이미 D11 사용 × | C 하나 |
| 5-11-Q2 | 원산지는 제조지 기준 × | 제조지 2곳 → 두 줄 ○ | 두 제조지를 한 줄 × | 지난달은 A18만, 이번엔 2곳 × | B 하나 |

## 2. crossRef 3단계 검증 표 (수정 후, 49문항)
삼중 세트는 A=첫 지문, B=둘째, C=셋째. 이중 세트는 C 칸이 "—". "×"는 그 정보만으로 정답이 하나로 정해지지 않음(통과 조건).

| id-Qn | A만 | B만 | C만 | 질문+보기만 | 판정 |
|---|---|---|---|---|---|
| 1-11-Q2 | × 폴더 현황 없음 | × 이전 기준 없음(경계: "although its invoice is unpaid"가 P64 쪽으로 기울게 함) | — | × | 통과(경계) |
| 1-11-Q4 | × 도면 내용 없음 | × 보존 규칙 없음 | — | × | 통과 |
| 1-12-Q3 | × 누구에게 보냈는지 없음 | × 활성화 권한 규칙 없음 | — | × | 통과 |
| 1-12-Q4 (수정) | × 업체 현황 없음 | × 보류 규칙 없음, C·D가 남음 | — | × | 통과(수정 전 약함) |
| 1-13-Q2 | × 시범 달 없음 | × 후속 기간 없음 | × 기간 길이 없음 | × | 통과 |
| 1-13-Q4 | × 피크 수치 없음 | × 요금 없음 | × | × | 통과 |
| 1-14-Q3 | × 기계별 주입 없음 | × 기계별 지정 제품·정지 규칙 없음(C22·C24 모두 절단기) | × | × | 통과 |
| 1-14-Q4 | × C22 기능 모름 | × 절단기가 L6·L9 둘 다 | × | × | 통과 |
| 1-15-Q3 | × 사건 없음 | × 제외 규칙 없음 | × | × | 통과 |
| 1-15-Q4 | × 금액 없음 | × | × 시간 합계 판단 불가 | × | 통과 |
| 2-11-Q3 | × 금액 없음 | × 개인 부담 규칙 없음 | — | × | 통과 |
| 2-11-Q5 | × 인물 없음 | × 담당 규칙 없음 | — | × | 통과 |
| 2-12-Q3 (수정) | × 승인 날짜 없음(A·B·D 남음) | × 7월 14일 보기 둘(A·D) | — | × A·D 모두 14일 | 통과(수정 전 실패) |
| 2-13-Q3 | × 팀 일정 없음 | × 시각 없음 | × 시각 없음 | × | 통과 |
| 2-13-Q5 | × 인원·점심 없음 | × 가격 없음 | × | × | 통과 |
| 2-14-Q3 | × 코드 없음 | × 어느 항목이 미반납인지 없음 | × 수거 기록 없음 | × | 통과 |
| 2-14-Q4 | × 코드 없음 | × 요금 없음 | × | × | 통과(질문에 코드가 있어 이메일은 불필요, 두 지문 결합은 필요) |
| 2-15-Q3 | × | × 어느 파일을 여는지 없음 | × 검토자 없음 | × | 통과 |
| 2-15-Q4 | × v3 내용 없음 | × | × Halvern이 실제 고객인지 없음 | × | 통과 |
| 3-11-Q1 | × 제안 내용 없음 | × 처리 경로 없음 | — | × | 통과 |
| 3-11-Q4 | × S2 수신 여부 없음 | × S2 뜻 없음 | — | × | 통과 |
| 3-12-Q2 | × 날짜 없음 | × 개시 규칙 없음 | — | × | 통과 |
| 3-12-Q4 | × 증명서 사정 없음 | × 학교 증명서 불필요 규칙 없음 | — | × | 통과 |
| 3-13-Q3 | × 여정 없음 | × 분기 범위 없음 | × | × | 통과 |
| 3-13-Q4 | × | × 초안 구성 없음 | × 분기 범위·거리 없음 | × | 통과 |
| 3-14-Q3 | × 좌석 정보 없음 | × 사정 없음(D12·D13 모두 비활동) | × 좌석 번호 없음 | × | 통과 |
| 3-14-Q4 (수정) | × D13 정보 없음 | × 보유자 사정 없음(A·B 남음) | × D13이 누구 것인지 없음 | × (C가 기본값처럼 보이는 정도) | 통과(수정 전 실패) |
| 3-15-Q2 | × | × 점검 결과 없음 | × 4100의 부서 없음 | × | 통과 |
| 3-15-Q4 | × 보관실 모델 없음 | × 공지 범위 없음(4150은 범위 안) | × | × | 통과 |
| 4-11-Q4 | × 일행 시각 없음 | × 운항·식사 시각 없음 | — | × | 통과 |
| 4-11-Q5 | × 여행 날짜 없음 | × 7일 규칙 없음 | — | × | 통과 |
| 4-12-Q3 | × 금액 없음 | × 합산 규칙 없음 | — | × | 통과 |
| 4-12-Q5 | × 주문 사정 없음 | × 승인 규칙 없음 | — | × | 통과 |
| 4-13-Q3 | × 트레이 수치 없음 | × K의 뜻 없음(경계: 열 이름으로 짐작 가능) | × | × | 통과(경계) |
| 4-13-Q4 | × | × 초안이 예비 라벨을 썼는지 없음 | × 수치 없음 | × | 통과 |
| 4-14-Q2 | × | × 답변 시각 없음 | × 담당자 없음 | × | 통과 |
| 4-14-Q5 | × | × 근무일 없음 | × 하루 시간 없음 | × | 통과 |
| 4-15-Q3 | × 득표 없음 | × 과반 규칙 없음 | × | × | 통과 |
| 4-15-Q4 | × | × 유권자 수 없음 | × 제출 수 없음 | × | 통과 |
| 5-11-Q2 (수정) | × X73 제조지 수 없음(B·C·D 남음) | × 줄 규칙 없음(B·C 남음) | — | × | 통과(수정 전 실패) |
| 5-11-Q4 | × X73 진행 상황 없음 | × 코드 뜻 없음 | — | × | 통과 |
| 5-12-Q3 | × 승인 순서 없음 | × R의 뜻 없음 | — | × | 통과 |
| 5-12-Q4 | × | × U의 뜻 없음 | — | × | 통과 |
| 5-13-Q3 | × | × 정정 내용 없음 | × 지점 수치 없음 | × | 통과 |
| 5-13-Q4 | × V86 없음 | × | × 파일 규칙 없음 | × | 통과 |
| 5-14-Q4 | × | × 요청 배치 없음 | × 등록부 연결 없음 | × | 통과 |
| 5-14-Q5 | × | × 제출 기록 없음 | × 등록부 연결 없음 | × | 통과 |
| 5-15-Q3 | × 수령 기록 없음 | × 규칙 없음 | × | × | 통과 |
| 5-15-Q4 | × 어느 판이 낮은 가격인지 없음(A·B·D 남음) | × | × 규칙 없음 | × | 통과 |

참고(crossRef 표시 없음): **2-12-Q4** — 수정으로 정답 노출 수식어는 없어졌다. 그러나 공지 + 질문만으로도 "중단 시간에는 조용한 작업"을 적용해 드릴 보기(A·C)와 색 보기(B)를 지울 수 있다. crossRef 문항이 아니라 추론 문항이어서 남겨 두었다. 더 엄격히 하려면 오답에 "조용하지만 이 작업 계획에 없는 일" 같은 편지 의존 보기를 넣어야 한다.

## 3. p3-3.json — 29차 필수 2묶음
| 항목 | 상태 | 전 → 후 |
|---|---|---|
| 필수 1: p3-3-009 Q1 의도 보기 | **해결(작성자)** | 전: A 회사 카드로 보증금 결제 / B* 시간 확보 선택권 / C 출입 카드 반납 / D 새 임대 서명 완료. 비유적 '선택권' 보기는 B 하나였다. → 후: "To note an option to renegotiate the current rent / reserve the new premises / extend the existing tenancy*(C) / cancel a signed lease". 네 보기가 모두 '남은 선택권'이고, 대본의 "stay for up to three extra months at the current rent"가 있어야 C가 정해진다. 대입: 재협상·예약·취소는 대본에 없으므로 정답은 C 하나. (정답 기호가 B → C로 바뀐 것은 이후 정답 위치 분산 커밋 때문이며, 이번 수정과 관계없다.) |
| 필수 2: 오해 → 정정 → 수정 반복(002·011·016) | **해결(작성자)** | 011 전: 무료 견본이라 금액 칸을 비움 → 신고 금액 필요로 정정 → 양식 완성. 후: 처음부터 신고 가치에 원가를 쓰기로 합의한 상태에서 통화(M)·원가 수합(W2)·서류 확인·제출(W)로 역할을 나누는 인수인계. 016 전: 낮은 연봉을 직무 변경으로 오해 → 시간 기준 설명 → 재발송. 후: 40시간·30시간 두 근무안을 비교해 30시간 안을 고르고, 시간이 병기된 제안서를 받기로 함. 정정 관계가 없다. 같은 틀은 002 한 세트만 남는다(기준 두 세트 이하). 세 문항 대입: 011 D/B/C, 016 D/A/D 모두 정답 하나. 016 Q2 D("The woman’s weekly working hours")는 40 ↔ 30이 달라 오답이 분명하다(29차 권장 항목도 해소). |

남은 것: 없음(필수). 권장 005·007·010·015는 이번 범위가 아니어서 다시 확인하지 않았다.

## 확인하지 못한 것
- crossRef가 아닌 m-p7m 문항은 2-12 Q1·Q2·Q4 말고는 다시 풀지 않았다.
- 1-11-Q2의 "although"(경계)는 통과로 판정해 고치지 않았다.
- 정답 위치 분포는 바꾸지 않았으므로 다시 세지 않았다.
