# 검토 36차 R2 — 모의고사 16~20회 Part 7

**R2 담당 범위 배포 가능: 확인한 필수 수정·보강을 반영했으며, 정답 유일성·지문 일관성·연계 기능·구조 검증 기준으로 조립에 사용할 수 있다.** 권장 사항은 아래에 남긴다. 실제 모의고사 조립·배포를 수행한 결과를 뜻하지 않는다.

| 파일 | 전수 검토 | 필수 수정·보강 | 권장 | 내용 수정 ID 수 |
|---|---:|---:|---:|---:|
| m-p7s-4.json | 50세트 / 145문항 | 14건 | 6건 | 12세트 |
| m-p7m-4.json | 25세트 / 125문항 | 31건 | 5건 | 18세트 |
| 합계 | 75세트 / 270문항 | 45건 | 11건 | 30세트 |

필수 건수는 아래 번호가 붙은 발견 사항의 수다. 한 건을 고치며 영어·한국어·해설 여러 필드를 함께 바꾼 경우도 한 건으로 셌다. 단일 27개, 복수 124개 내용 필드가 바뀌었다. 복수 지문의 crossRefValidation 45개는 독립 재검토 결과로 갱신했으므로 메타데이터까지 포함하면 복수 25세트 모두 변경이다.

**고친 ID — 단일 내용:** `m-p7s-16-08`, `m-p7s-16-10`, `m-p7s-17-10`, `m-p7s-18-07`, `m-p7s-18-09`, `m-p7s-19-01`, `m-p7s-19-09`, `m-p7s-20-01`, `m-p7s-20-04`, `m-p7s-20-07`, `m-p7s-20-09`, `m-p7s-20-10`.

**고친 ID — 복수 내용:** `m-p7-16-11`, `m-p7-16-12`, `m-p7-16-13`, `m-p7-16-14`, `m-p7-16-15`, `m-p7-17-13`, `m-p7-17-14`, `m-p7-17-15`, `m-p7-18-12`, `m-p7-18-13`, `m-p7-18-15`, `m-p7-19-12`, `m-p7-19-14`, `m-p7-20-11`, `m-p7-20-12`, `m-p7-20-13`, `m-p7-20-14`, `m-p7-20-15`.

**보존:** 세트 순서·id·test·difficulty·setType·문항 수·각 문항의 type·answer·crossRef 플래그는 원본과 같다. 질문 객체나 보기 순서를 옮기지 않았다. 커밋하지 않았다. 변경 대상은 담당 JSON 두 개와 이 보고서다.

## 검토 방법과 판정 범위

docs/tasks/review-36-mock4.md의 R2 지시, mock-spec.md, exam-p167-spec.md의 누적 규칙, 33·35차 Part 7 검토 기준을 읽고 영어 지문·한국어 지문·질문·보기·정답·해설을 전부 대조했다. 수정된 세트는 다른 문항까지 다시 풀어 지문 수정의 영향을 확인했다. 동의어의 ref와 실제 단어, 의도 문항의 인용·시각, 삽입 위치와 지시어 연결도 확인했다.

원래 표시된 crossRef 45개 중 17개는 한 문서의 규정·명칭·부정 사실 소거로 답을 추정하는 경로가 있거나 그 위험이 커 재구성·보강했다. 최종 명시 45/45 통과이며, 표시가 빠진 17-11 Q5도 추가로 확인해 별도 1/1 통과를 기록했다. 구조 검사는 의미 검토의 보조로 사용했다.

기존 연습·모의 1~15회 JSON에서 이번 검토에서 식별한 주요 회사명을 검색해 동일한 전체 회사명 일치는 발견하지 못했다. 기존 Part 7 지문과의 어휘 겹침은 후보를 찾는 용도로만 사용하고, 유사 후보의 실제 지문을 읽어 아래 S1·S2를 기록했다. 어휘 점수 자체로 소재 중복을 판정하지 않았다.

## 필수 발견 사항

### 단일지문

| 번호 | 세트 / 위치 | 발견과 수정 |
|---|---|---|
| S1 | m-p7s-16-08 / Q1 도착 시각 | by 2:30 at the latest는 2시 전 도착도 허용한다. 2시 30분 전에는 도착하지 못한다고 명시해 라인 중단과 정답을 연결했다. |
| S2 | m-p7s-16-10 / 설치 전용 출입증 번역 | two days before를 개막 전 이틀 전체로 옮겼다. |
| S3 | m-p7s-17-10 / 품질유지기한 번역 | best-before를 소비기한에서 품질유지기한으로 정정했다. |
| S4 | m-p7s-17-10 / Q2 의도 | 범용 사용을 직접 말하던 인용문을 선반을 비운다는 발언으로 바꿔 앞뒤의 뚜껑 표준화 제안이 필요하게 했다. |
| S5 | m-p7s-17-10 / Q4 해설 주체 | 콜라르가 사진을 요청하는 것이 아니라 사진을 보내 바르센에 승인을 요청한다고 정정했다. |
| S6 | m-p7s-18-07 / Q2 정답 보기 | 지문에 없는 buses and trains를 public transportation으로 바꿔 영어·한국어·지문을 맞췄다. |
| S7 | m-p7s-18-09 / 청구서 총수 | 다른 청구서 세 건으로 읽히는 발언을 모두 합쳐 세 건으로 한정해 마지막 other two와 맞췄다. |
| S8 | m-p7s-19-01 / 은행 휴무일 번역 | national bank holiday를 국경일로 단정한 번역과 해설을 은행 휴무일로 정정했다. |
| S9 | m-p7s-19-09 / Q4 해설 | [1] 앞에 고객 집단이 없다는 부정확한 설명을 실제 문맥상 판매자와 재정비 제품 구매자의 차이로 정정했다. |
| S10 | m-p7s-20-01 / 안내 데스크 번역 | main reception에 없는 1층 정보를 제거했다. |
| S11 | m-p7s-20-04 / 이메일 수신 회사 | 본문·발신과 무관하게 섞인 Fairmont Catering을 Brask Food Supply 고객으로 통일했다. |
| S12 | m-p7s-20-07 / Q3 복수 정답 위험 | 5년 계약자에게도 적용되는 공통 난방 교체를 오답으로 쓰지 않도록, 다음 여름 계획과 충돌하는 계약 시작 전 교체로 바꿨다. |
| S13 | m-p7s-20-09 / 포장 상자 번역 | flat boxes를 펼친 상자가 아닌 접어 납작하게 해 둔 상자로 정정했다. |
| S14 | m-p7s-20-10 / Q3 복수 정답 | 4월에는 로비 안내도 받을 수 없다는 두 번째 답을 배제하도록, 반납 기한을 놓쳐 상실하는 혜택을 묻도록 한정했다. |

### 복수지문

| 번호 | 세트 / 위치 | 발견과 수정 |
|---|---|---|
| M1 | m-p7-16-11 / Q3 연계 | 현장 촬영이라는 사실과 Office Visit 명칭만으로 상품을 추정하지 않도록 Aster/Briar/Clover로 중립화했다. |
| M2 | m-p7-16-11 / 사진 용도 모순 | 사진은 출입증에만 쓴다는 문장을 프로필 사진 요청과 충돌하지 않는 보정 불필요 사실로 바꿨다. |
| M3 | m-p7-16-12 / Q3 연계 | 규정만으로 허용 사유를 고르던 문제를 원주문 9.20달러와 대체품 8.70달러의 차이로 바꿨다. |
| M4 | m-p7-16-12 / Q4 오답 | 늦은 배송의 구매팀 승인도 필요하다고 읽힐 수 있는 보기를 전량 3월 21일 발송이라는 명백한 오답으로 바꿨다. |
| M5 | m-p7-16-12 / Q5 환불·적립 | full credit를 현금 환불로 단정하지 않도록 전액 적립으로 맞췄다. |
| M6 | m-p7-16-13 / Q3 연계 | 창고 규정만으로 거절 사유가 유일해지는 구성을 마감일과 실제 도착일 사이의 이틀 계산으로 바꿨다. |
| M7 | m-p7-16-14 / Q3 연계 | 웹페이지에 직접 노출된 운영 시간 변경 대신 후기의 요금제와 현재 기본료를 연결하게 했다. |
| M8 | m-p7-16-14 / Q4 연계 | Extended라는 명칭의 의미로 상품을 추정하지 않도록 Alder/Briar/Cedar로 중립화했다. |
| M9 | m-p7-16-15 / Q3 연계 | 메일의 사전 연락 부재만으로 무승인을 고르던 문제를 계약·수행 사실·청구 금액을 연결하는 유효 총액으로 바꿨다. 메일의 청구가 맞다는 판단도 실제 청소 사실로 바꿨다. |
| M10 | m-p7-16-15 / Q5 해설 위치 | 수정 청구 요청이 마지막 문단에 있다는 잘못된 위치 설명을 정정했다. |
| M11 | m-p7-17-13 / Q3 연계 | 교육 참석 사실만으로 사유를 고르던 문제를 지원 마감과 교육 시작 사이의 11일 계산으로 바꿨다. |
| M12 | m-p7-17-14 / 일정 모순 | 9월에 상세 일정을 보낸다는 위원회 메일과 달리 7월에 방·시각을 확정한 후속 메일을 정리했다. |
| M13 | m-p7-17-14 / 무료 등록 범위 | 모든 발표자 무료와 정규 세션 공동 발표자 규정의 관계를 주 발표자·보조 발표자 구분으로 명확히 했다. |
| M14 | m-p7-17-14 / Q4 연계 | 웹페이지에서 계산할 수 있는 두 마감일 중 10월 10일도 보기에 넣어 10월 9일만 남는 소거를 막았다. |
| M15 | m-p7-17-15 / Q3 연계 | 기록에 직접 나오는 손상 직전 운전자 대신 운전자별 코드와 공지의 차량 종류를 연결하게 했다. |
| M16 | m-p7-18-12 / Q3 연계 | 보증 규정의 유일한 점검 면제 사유 대신 정정된 실제 배송일과 편지 작성일 사이의 엿새를 묻도록 했다. |
| M17 | m-p7-18-13 / Q3 연계 보강 | 미수료 표시가 정답에 바로 대응하는 취약점을 없애고 희망 과정과 교재 발송일을 연결했다. 세 과정의 계산 가능한 발송일을 모두 보기에 두었다. |
| M18 | m-p7-18-13 / Q4 연계 | 규정에서 유일하게 가능한 행동만 남는 구성을 수료증·승인이라는 다른 유효 경로 보기와 비교하도록 고쳤다. 희망 과정·승인 현황·실제 수료 기록을 함께 봐야 한다. |
| M19 | m-p7-18-15 / Q3 연계 | 청결·전량·무손상으로 세 오답이 지워지는 문제를 약정일·실제일·하루 일부 계산 규칙을 잇는 지연 일수로 바꿨다. |
| M20 | m-p7-18-15 / 요금 모순 | 일일 연장 요금이 연체료 40달러보다 낮다는 말이 표의 패널 45달러와 충돌해 비교 구절을 삭제했다. |
| M21 | m-p7-19-12 / 다음 주 번역 | following week가 메일 작성일이 아니라 배송 희망일이 있는 주의 다음 주를 가리키도록 정정했다. |
| M22 | m-p7-19-14 / 영향 방향 번역 | 채용 결정이 보너스에 영향을 미친다는 오역을 보너스가 채용 결정에 영향을 미치지 않게 한다는 뜻으로 정정했다. |
| M23 | m-p7-20-11 / Q3 연계 | 광고만으로 유료 세 오답이 지워지는 무료 혜택 대신 주문 총량과 포장 단위로 여섯 상자를 계산하게 했다. |
| M24 | m-p7-20-11 / Q4 가격 유일성 | 서로 다른 이름의 수량을 1000장+500장 할인 묶음으로 합칠 여지를 없애기 위해 이름별 별도 가격임을 명시했다. |
| M25 | m-p7-20-11 / 주 말 번역 | end of the week를 특정 주말 날짜로 좁히지 않도록 이번 주가 끝날 때까지로 옮겼다. |
| M26 | m-p7-20-12 / Q3 연계 | 메일의 정성적 지연 비교만으로 사유를 고르는 대신 두 시간대의 추가 이동량 합계 30분을 묻는다. 출발·복귀가 각각 출근 시간대·그 이후라는 사실도 명시했다. |
| M27 | m-p7-20-12 / Q4 연계 | 기사에 있는 20분도 경쟁 보기에 넣어, 이메일의 복귀 시간대를 읽어야 10분을 선택하게 했다. |
| M28 | m-p7-20-13 / 요청 대상 오류 | 고객이 판매자에게 자기 출입구 실측값을 요구하던 문장을 배송에 필요한 최소 출입구 너비를 묻는 말로 바꿨다. |
| M29 | m-p7-20-14 / Q4 연계 | 점심 후·3시 전이라는 메일 조건만으로 유일한 출발 시각을 고르는 대신 워크숍 종료·시간표·이동시간으로 도착 1시 55분을 계산하게 했다. |
| M30 | m-p7-20-15 / 보증 대상 근거 | 결함 부품만 보장한다는 규정과 normal wear 기록의 간극을 결함 기어가 롤러를 손상시킨 사실로 명확히 했다. |
| M31 | m-p7-20-15 / 추가 보장 가입 시점 | 구입 당시 미가입을 현재까지 미가입으로 단정하지 않도록 추가 플랜을 구입한 적 없다는 사실로 명시했다. |

각 필수 사항의 실제 수정 전·후 문장과 보기는 이 문서 끝의 「필수 수정 전후 원문」에 파일·id·필드별로 빠짐없이 수록했다. 영어를 바꿔 번역이나 해설을 함께 고친 내역도 같은 곳에 있다.

## 권장 목록 — 기록만

| 파일 | 번호 | 위치 | 권장 내용 |
|---|---|---|---|
| m-p7s-4.json | S1 | m-p7s-17-05 ↔ docs/questions/p7-3.json의 p7-3-010 | 단체 객실 배정·기한 뒤 미예약 객실 일반 판매·이후 요금/가용성 제한이라는 구체적인 전개가 겹친다. 수치·회사·문장은 다르지만 소재 다양성을 위해 차기 개편 권장. |
| m-p7s-4.json | S2 | m-p7s-17-01 ↔ questions/toeic-part7.json의 p7-001 | 기사가 기다림→사무실 안 동료가 내려와 처리→잠시 대기 요청이라는 넓은 흐름이 비슷하다. 이번은 계약 서명, 기존은 카드키를 이용한 물품 수령이라 핵심 업무는 구별된다. |
| m-p7s-4.json | S3 | m-p7s-18-05 Q2, m-p7s-19-06 Q2, m-p7s-20-05 Q3 | 동의어 오답인 released from prison, shy/kept secret, joined in a song/supported financially는 문맥에서 너무 쉽게 제거된다. |
| m-p7s-4.json | S4 | m-p7s-18-04 Q1 | 이전 고객에게 해 준 전례라는 발언과 '요청 수락 가능'의 연결이 매우 직접적이다. 문맥은 필요하지만 오답이 약해 난도가 낮다. |
| m-p7s-4.json | S5 | m-p7s-19-09 | 제목·헤딩·삽입 표기를 제외하고 공백 기준으로 센 본문이 196단어로 4문항 권장 하한 200에 조금 못 미친다. 길이 권장으로만 기록했다. |
| m-p7s-4.json | S6 | m-p7s-19-09 Q4 | [1] 앞에도 corporate customers가 있어 them의 형식상 선행사는 존재한다. 실제 재정비 제품 구매자 바로 뒤인 [3]이 가장 자연스럽지만, 더 명확한 삽입문을 검토할 수 있다. 부정확했던 해설은 필수 항목으로 고쳤다. |
| m-p7m-4.json | M1 | m-p7-17-11 Q5 | 첫 주문 보증금(A)+에제의 이용 이력(B)이 필요한데 crossRef가 없다. 유형·표시 문제는 기록만 하라는 지시에 따라 플래그는 유지했고, 아래 별도 검증 1행을 추가했다. |
| m-p7m-4.json | M2 | m-p7-16-13 Q2 | 예약 없는 상자가 may wait several hours라는 규정은 즉시 하역을 사전 예약의 확정 증거로 만들지는 않는다. most likely 문항으로는 예약이 유력하지만, 인과 단서를 더 단단히 할 수 있다. |
| m-p7m-4.json | M3 | m-p7-16-11, 16-14, 18-14, 19-15, 20-11 | 가격/서비스 표와 고객 수요·인원·조건을 매칭하는 흐름이 세 세트 이상 반복된다. 다른 거래 문서 형식과 계산을 쓰지 않는 추론을 늘리는 편이 좋다. |
| m-p7m-4.json | M4 | m-p7-16-12 Q3, 16-13 Q3, 17-13 Q3, 18-12 Q3, 18-13 Q3, 18-15 Q3, 20-12 Q3, 20-14 Q4 등 | 한 문서로 답이 보이는 경로를 없애며 날짜 차·수량·금액 계산형이 늘었다. 이번에는 연계성과 정답 위치 보존을 우선해 고쳤으며, 후속 집필에서는 비교·순서·대상 추론으로 분산할 필요가 있다. |
| m-p7m-4.json | M5 | 19회 복수지문 25문항 | 같은 정답이 한 번도 연속하지 않는다(최장 1). 분포와 4연속 금지 기준은 통과하지만 지나치게 교대하는 배열은 실전 자연스러움 측면에서 재검토할 수 있다. 정답 위치 유지 지시에 따라 바꾸지 않았다. |

## crossRef 전수 가림 검증

A/B/C는 지문의 순서이며 정답 기호가 아니다. 각 열은 해당 지문 하나와 해당 질문·보기만 주었을 때의 결과다. 다른 문항·해설은 힌트로 주지 않았다. 질문·보기만 열은 지문을 전부 가린 경우다. 불가는 정답을 지문 근거로 하나로 확정할 수 없다는 뜻이다. 일부 보기의 소거, 상식적 추측, 우연히 정답을 고르는 것은 통과 근거로 삼지 않았다.

삼중에서는 C 단독도 확인했다. 두 문서만으로 풀리는 삼중 문항도 연계 문항으로 인정한다. 결합 근거 열은 충분한 연결 경로이며 모든 삼중 문항이 세 지문 전부를 필요로 한다고 주장하지 않는다.

### 16회 — 명시 11/11 통과

| 문항 | A만 | B만 | C만 | 질문·보기만 | 결합 근거 / 정답 |
|---|---|---|---|---|---|
| m-p7-16-11 Q3 | 불가: 인원·촬영 장소·보정 수요 없음 | 불가: Aster/Briar/Clover의 서비스 대응 없음 | 해당 없음 | 불가: 임의 패키지명의 조건을 알 수 없음 | 14명 현장·보정 불필요(B) + 15명 현장·보정 없음(A) → Briar/B |
| m-p7-16-11 Q4 | 불가: 추가 인원·예약일 없음 | 불가: 추가 단가·할인 기준 없음 | 해당 없음 | 불가: 추가 수량·단가 없음 | 2장×$25, 6/2→6/12는 한 달 미만 → $50/B |
| m-p7-16-12 Q3 | 불가: 대체품 단가 없음 | 불가: 주문서 원래 단가 없음 | 해당 없음 | 불가: 두 단가 없음 | $9.20(A)−$8.70(B)=$0.50/D |
| m-p7-16-12 Q4 | 불가: 실제 잔여분 출고일 없음 | 불가: 지점의 필요일 없음 | 해당 없음 | 불가: 출고·필요일 없음 | 3/18까지 필요(A), 8상자3/21발송(B) → 일부 지연/C |
| m-p7-16-13 Q2 | 불가: T2 무게·하역 결과 없음 | 불가: 장비 예약 절차·실제 하역 속도 없음 | 불가: T1/T2 중 큰 상자의 식별·예약 규칙 없음 | 불가: T2 무게·예약 내역 없음 | T2=520kg(B), 500초과 지게차 사전예약(A), 큰 상자 즉시 하역(C) → 사전예약 추론/C |
| m-p7-16-13 Q3 | 불가: T3 실제 창고 도착일 없음 | 불가: 실제 도착일·창고 마감일 없음 | 불가: 창고 마감일 없음 | 불가: 마감·도착일 없음 | 창고10/8마감(A), 10/11메일의어제=10/10(C) → 2일/B |
| m-p7-16-13 Q4 | 불가: T3 무게·배송 방식 없음 | 불가: 취급 단가 없음 | 불가: 무게·단가 없음 | 불가: 무게·요금 없음 | T3=60kg(B), 직접배송(C), $0.95/kg(A) → $57/B |
| m-p7-16-14 Q3 | 불가: 후기에서 사용한 요금제 없음 | 불가: 현재 요금 없음 | 불가: 후기 작성자가 사용한 요금제·요금 없음 | 불가: 요금제 식별 없음 | 후기의 Alder(B) + 현재 기본료$190(A) → $190/C |
| m-p7-16-14 Q4 | 불가: 바르가의 수요 없음 | 불가: 현행 서비스·바르가 수요 없음 | 불가: Alder/Briar/Cedar 서비스 대응 없음 | 불가: 중립 요금제명별 조건 없음 | 260통·토요일(C) + 현행300통·월토Briar(A) → Briar/B |
| m-p7-16-15 Q2 | 불가: 취소 주체·실제 미완료 여부 없음 | 불가: 방문 미완료·취소 주체 없음 | 불가: 청구액·계약 감액률 없음 | 불가: 취소 사실·금액 없음 | 업체장비고장으로미실시(C)→업체미완료0청구(A), 외부창문$420(B) → $420/B |
| m-p7-16-15 Q3 | 불가: 이번 달 수행·승인 사실 없음 | 불가: 실제 미완료·승인 여부 없음 | 불가: 서비스 금액·계약 승인 요건 없음 | 불가: 유효 항목·금액 없음 | 미실시 외부창문·관리자미승인카펫(C)+계약(A) 제외, $2400+$180(B)=$2580/C |

### 17회 — 명시 8/8 통과, 표시 누락 추가 1/1 통과

| 문항 | A만 | B만 | C만 | 질문·보기만 | 결합 근거 / 정답 |
|---|---|---|---|---|---|
| m-p7-17-11 Q3 | 불가: 에제의 근무층 없음 | 불가: 층별 수령 시간 없음 | 해당 없음 | 불가: 근무층·시간 대응 없음 | 6층(B)→5~7층12:15(A) → 12:15/C |
| m-p7-17-11 Q5 (표시 누락) | 불가: 에제의 첫 이용 여부 없음 | 불가: 첫 주문 보증금 규정 없음 | 해당 없음 | 불가: 이용 이력·보증금 규정 없음 | 이미이용(B)+첫주문$2보증금(A) → 납부/B |
| m-p7-17-12 Q3 | 불가: 초기 처리율 정정 없음(기사만으로40만은 오답) | 불가: 기사가 제시한 연간 수치 없음 | 해당 없음 | 불가: 기준량·가동 비율 없음 | 40만(A)×60%(B)=24만/A |
| m-p7-17-13 Q3 | 불가: 브룩의 교육 시작일 없음 | 불가: 지원 마감일 없음 | 불가: 지원 마감일·교육일 없음 | 불가: 두 날짜 없음 | 마감5/9(A)→교육시작5/20(B)=11일/B |
| m-p7-17-13 Q4 | 불가: 브룩의 실제 면접일·방 사용 제한 없음 | 불가: 면접 후 과제 내용·교육실 제한 없음 | 불가: 면접 뒤 기다리는 이유·컴퓨터 과제 규칙 없음 | 불가: 일정·후속 과제 없음 | 면접후컴퓨터과제(A)+5/22오전면접·교육실1시까지예약(C) → 컴퓨터과제/D |
| m-p7-17-14 Q3 | 불가: 하틀리 역할·채택 형식 없음 | 불가: 하틀리의 보조 발표 역할·무료 규칙 없음 | 불가: 채택 형식의 무료 동반자 규칙 없음 | 불가: 하틀리 역할·등록 규정 없음 | short talk채택(B)+하틀리보조발표(C)+short talk무료등록은lead만(A) → 무료없음/D |
| m-p7-17-14 Q4 | 불가: 해당 발표 형식 없음: 10/9·10/10 둘 다 가능 | 불가: 행사 날짜·업로드 간격 없음 | 불가: 행사 날짜·업로드 간격 없음 | 불가: 발표일·마감 규칙 없음 | short talk(B)→첫날10/16(A)−7일=10/9/B |
| m-p7-17-15 Q3 | 불가: 코의 차량 코드 없음 | 불가: KX-31의 차량 종류 없음 | 불가: 코의 차량·차종 없음 | 불가: 운전자별 코드 대응 없음 | Koh=KX-31(B)+KX-31=소형차(A) → 소형차/C |
| m-p7-17-15 Q4 | 불가: 실제 이용자·배터리 상태 없음 | 불가: 차량 종류·충전 규칙·다음 날 배터리 상태 없음 | 불가: 전날 전기차 이용자 없음 | 불가: 전날 이용 기록·이상 상태 없음 | 전기차=KX-52와충전규칙(A)+Penn이용(B)+다음날방전(C) → Penn/C |

### 18회 — 명시 8/8 통과

| 문항 | A만 | B만 | C만 | 질문·보기만 | 결합 근거 / 정답 |
|---|---|---|---|---|---|
| m-p7-18-11 Q3 | 불가: 프라이스 창고 위치 없음 | 불가: Ostley의 지역별 마감일 없음 | 해당 없음 | 불가: 고객 지역·마감일 없음 | Ostley(B)→Northern12/15(A) → 12/15/D |
| m-p7-18-12 Q3 | 불가: 정정된 실제 배송일 없음(5/3은 오인) | 불가: 그레이가 편지를 쓴 날짜 없음 | 해당 없음 | 불가: 실제 배송·편지 날짜 없음 | 실배송5/6(B)→편지5/12(A)=6일/B |
| m-p7-18-13 Q3 | 불가: 루이스가 신청한 과정 없음: 9/16·9/30·10/14 후보 | 불가: 과정 시작일·교재 발송 간격 없음 | 불가: 희망 과정·발송 일정 없음 | 불가: 희망 과정·시작일 없음 | Advanced신청(B)+10/21시작−7일(A)=10/14/C |
| m-p7-18-13 Q4 | 불가: 요청 과정·이미 갖춘 자격 없음 | 불가: 과정 입학 요건·실제 수료 기록 없음 | 불가: 요청 과정·대체 입학 경로 없음 | 불가: 희망 과정·현재 자격 없음 | Advanced요청·관리자승인(B)+Intermediate미수료(C)+대체퀴즈(A) → 퀴즈통과/A |
| m-p7-18-14 Q3 | 불가: 코리건의 후원 등급 없음 | 불가: $3000에 대응하는 로고 혜택 없음 | 불가: 후원 등급·로고 매체 없음 | 불가: 등급·혜택 없음 | $3000(B)→Silver인쇄프로그램(A) → 프로그램/A |
| m-p7-18-14 Q4 | 불가: 후원 등급·이미 초대한 수 없음 | 불가: 등급별 좌석·초대 수 없음 | 불가: 총 배정 좌석 없음 | 불가: 배정·사용 좌석 없음 | $3000(B)→Silver10석(A)−8명(C)=2명/D |
| m-p7-18-15 Q3 | 불가: 약정·실제 반납일 없음 | 불가: 실제 반납일·일부 일수 처리 규칙 없음 | 불가: 약정 반납일 없음 | 불가: 약정·실제 반납일 없음 | 6/9까지(B), 6/11오전(C), 하루일부도하루(A) → 2일/B |
| m-p7-18-15 Q4 | 불가: 보증금·반납일 없음 | 불가: 연체 단가·실제 반납일 없음 | 불가: 보증금·약정일·단가 없음 | 불가: 보증금·지연일·단가 없음 | $400(B)−(6/10+6/11일부)×$40(A,C)=$320/D |

### 19회 — 명시 8/8 통과

| 문항 | A만 | B만 | C만 | 질문·보기만 | 결합 근거 / 정답 |
|---|---|---|---|---|---|
| m-p7-19-11 Q3 | 불가: 브란트의 노트북 구입 시점 없음 | 불가: 교체 연한 기준 없음 | 해당 없음 | 불가: 구입 시점·연한 기준 없음 | 5년전구입(B)+4년이상교체(A) → 연한충족/D |
| m-p7-19-12 Q3 | 불가: 번의 주문일·품목 없음 | 불가: 품목별 인상일 없음 | 해당 없음 | 불가: 주문일·인상 일정 없음 | 3/15주문·3/25배송(B)+테이프3/1·라벨4/1인상(A) → 테이프만/B |
| m-p7-19-13 Q2 | 불가: 신청한 요일·접수 시점 없음 | 불가: 요일별 휴무·최소 사전일 규정 없음 | 불가: 원래 희망일·휴무 규정 없음 | 불가: 희망 요일·운영일 없음 | 희망6/13금(B)+금요일폐쇄(A) → 그요일휴무/C |
| m-p7-19-13 Q3 | 불가: 확정 촬영일 없음 | 불가: 확정 촬영일·사전 반입 시한 없음 | 불가: 전영업일4시 반입 규정 없음 | 불가: 확정 촬영일·시한 없음 | 6/12목촬영(C)−전영업일4시(A) → 6/11오후4시/A |
| m-p7-19-14 Q3 | 불가: 소렌슨·웹의 부서와 역할 없음 | 불가: 동일 부서 추천 제한 없음 | 불가: 부서·역할별 제한 없음 | 불가: 부서·추천 제한 없음 | Fleet팀장이Fleet채용추천(B)+동일부서금지(A) → 같은부서/C |
| m-p7-19-14 Q4 | 불가: 말릭이 추천한 직원의 입사일 없음 | 불가: 보너스 첫 지급 간격 없음 | 불가: 말릭 추천·입사일·지급 규칙 없음 | 불가: 입사일·지급 간격 없음 | Lin2/3입사(B)+3개월뒤급여(A) → 5/3이후/B |
| m-p7-19-15 Q3 | 불가: 확정 인원 없음 | 불가: 최저 청구·확정 인원 변경 없음 | 불가: 인당 요금·최소 인원 규정 없음 | 불가: 요금·확정 인원 없음 | 18명(C), 최소20×$65(A) → $1300/A |
| m-p7-19-15 Q4 | 불가: 최종 단체 인원 없음 | 불가: 최종 인원·회의실 정원 없음 | 불가: 회의실 이름·정원 없음 | 불가: 인원·회의실 대응 없음 | 최종18명(C)+강의식배치(B)+최대24명Birch(A) → Birch/B |

### 20회 — 명시 10/10 통과

| 문항 | A만 | B만 | C만 | 질문·보기만 | 결합 근거 / 정답 |
|---|---|---|---|---|---|
| m-p7-20-11 Q3 | 불가: 직원별 주문 수량·총량 없음 | 불가: 상자당 포장 수량 없음 | 해당 없음 | 불가: 총량·상자당 수량 없음 | 3명×500장(B)÷250장/상자(A)=6상자/D |
| m-p7-20-11 Q4 | 불가: 변호사 수·이름별 주문 수량·긴급 여부 없음 | 불가: 이름별 수량 가격 없음 | 해당 없음 | 불가: 가격·수량 없음 | 이름별500장$45(A)×3명(B)=$135/A |
| m-p7-20-12 Q3 | 불가: 이메일의 복귀 시간대 없음: 30·40분 모두 후보 | 불가: 시간대별 추가 이동 분량 없음 | 해당 없음 | 불가: 이동 시간대·지연 수치 없음 | 이른출발·늦은오전복귀(B)+출근20·그외10(A)=30분/A |
| m-p7-20-12 Q4 | 불가: 복귀 시간대 없음:10·20분 후보 | 불가: 시간대별 예상 추가 분량 없음 | 해당 없음 | 불가: 복귀 시간대·예상 지연 없음 | 늦은오전복귀(B)+출근시간외10분(A) → 10분/C |
| m-p7-20-13 Q2 | 불가: 식당의 기존 전원·온수·공간 없음 | 불가: 32A 요건·64cm 너비·설치 작업 범위 없음 | 불가: 기존 전원 용량·필요 용량 없음 | 불가: 설치 요건·현황 없음 | 필요32A(A)+기존16A(B)+설치5/19(C) → 별도전기공사/B |
| m-p7-20-13 Q4 | 불가: 식당의 점심 영업 시간 없음 | 불가: 시간당 처리 용량 없음 | 불가: 점심 시간·처리 용량 없음 | 불가: 영업 시간·처리율 없음 | 40랙/시(A)×12~2시2시간(B)=80랙/B |
| m-p7-20-14 Q2 | 불가: 출발 가능 시각·워크숍 시작 없음 | 불가: 출발지·회의 종료·이동 시간 없음 | 불가: 시간표·워크숍 시작·이동 시간 없음 | 불가: 출발 조건·시간표 없음 | 8:45회의종료(C)+9:50까지입실(B)+40분이동(A) → 9시/C |
| m-p7-20-14 Q4 | 불가: 워크숍 종료 시각 없음: 네 도착 시각 모두 가능 | 불가: 셔틀 시간표·소요 시간 없음 | 불가: 워크숍 종료·셔틀 시간표 없음 | 불가: 워크숍 종료·시간표·소요 없음 | 12:30종료(B)→첫North출발13:15+40분(A)=13:55/D |
| m-p7-20-15 Q3 | 불가: 구입일·연장 가입 여부·고장 원인 없음 | 불가: 부품·작업비 보증기간·연장 가입 여부 없음 | 불가: 구입일·작업비 보증기간 없음 | 불가: 보증기간·구입일 없음 | 작년3/2구입·올해10/14수리(B)+작업비1년(A)+추가플랜미가입(C) → 작업비만료/C |
| m-p7-20-15 Q4 | 불가: 작업 시간·구입일·플랜 가입 여부 없음 | 불가: 시간당 요금·작업비 보증기간·플랜 가입 여부 없음 | 불가: 작업 시간·요율·구입일 없음 | 불가: 시간·요율·보장 상태 없음 | 1.5시간(B)×$85(A), 결함부품2년이내(B,A), 연장없음(C) → $127.50/D |

## 보존·구조·분포 검증

원본 사본과 최종 JSON을 직접 파싱해 75세트·270문항의 고정 필드 일치, 중복 없는 id, 보기 4개·정답 범위·한국어 보기 수, 지문/번역 구조, synonym ref, intention 인용·시각, insertion 네 위치, crossRef 플래그와 검증 기록 45개의 대응을 검사했다. 모두 PASS다. 수정 문항은 별도로 의미·계산·정답 유일성을 재확인했다. git diff --check도 통과했다.

사용한 검증은 이 두 작성 파일을 직접 읽는 별도 검사다. 기존 test/mock.test.js는 조립된 1~15회와 fixture 중심이므로 이번 16~20회 검토의 증거로 대신하지 않았다. 웹 실행 코드 변경이 없어 앱 빌드는 수행하지 않았다.

| 파일 | 회 | 세트 / 문항 | A/B/C/D | 난도1/2/3(세트) | 최장 연속 | 같은 답 포함 세트 | 3문항 모두 다른 세트 |
|---|---:|---|---|---|---:|---|---|
| m-p7s-4 | 16 | 10 / 29 | 6/8/8/7 | 3/4/3 | 3 | 7/10 | 1/3 |
| m-p7s-4 | 17 | 10 / 29 | 7/7/8/7 | 3/4/3 | 2 | 6/10 | 0/3 |
| m-p7s-4 | 18 | 10 / 29 | 7/8/7/7 | 3/4/3 | 2 | 7/10 | 0/3 |
| m-p7s-4 | 19 | 10 / 29 | 6/7/8/8 | 3/4/3 | 2 | 7/10 | 0/3 |
| m-p7s-4 | 20 | 10 / 29 | 6/8/7/8 | 3/4/3 | 2 | 6/10 | 0/3 |
| m-p7m-4 | 16 | 5 / 25 | 6/7/6/6 | 1/2/2 | 2 | 5/5 | 해당 없음 |
| m-p7m-4 | 17 | 5 / 25 | 6/5/7/7 | 1/2/2 | 2 | 5/5 | 해당 없음 |
| m-p7m-4 | 18 | 5 / 25 | 6/7/6/6 | 1/2/2 | 2 | 5/5 | 해당 없음 |
| m-p7m-4 | 19 | 5 / 25 | 6/6/7/6 | 1/2/2 | 1 | 5/5 | 해당 없음 |
| m-p7m-4 | 20 | 5 / 25 | 7/6/6/6 | 1/2/2 | 2 | 5/5 | 해당 없음 |

매회 단일은 2문항×4→3문항×3→4문항×3이고, 복수는 이중×2→삼중×3이며 각 5문항이다. text 1·chat 1·insertion 2·단일 synonym 2와 복수 synonym 1이 매회 유지된다. text/chat/form/letter 배치는 회차별로 달랐다.

| 회 | Part 7 총 문항 | A/B/C/D | 최장 동일답 연속 |
|---|---:|---|---:|
| 16 | 54 | 12/15/14/13 | 3 |
| 17 | 54 | 13/12/15/14 | 2 |
| 18 | 54 | 13/15/13/13 | 2 |
| 19 | 54 | 12/13/15/14 | 2 |
| 20 | 54 | 13/14/13/14 | 2 |

Part 7 합산 회차별 정답 비율은 각 기호 20~30%이며 4연속은 없다. 3문항 순열 과다와 세트별 같은 답 최소 1/3 기준도 통과한다. 정답 위치는 권장 개선을 위해서도 바꾸지 않았다.

## 파일 식별값

| 파일 | 원본 SHA-256 | 최종 SHA-256 |
|---|---|---|
| m-p7s-4.json | `105c9bb7627d9c2e8ed6932d75d450bb3adc5efbec4d108737b7955660cfa4d8` | `fe9031334a5039510b5bb5eda7b6280b0de754d1f384bce446278fd7afd9dad4` |
| m-p7m-4.json | `862fddb82226339430b5e0b9a3eeeb9cf51ce177878b57c8c2670b5a5fa92efc` | `df711129f18165a99193178e2d2021cee9893162be677f4360edd285b2a3f6b9` |

## 필수 수정 전후 원문

아래는 내용 변경 151개 필드의 완전한 전후 기록이다. crossRefValidation 메타데이터는 위 전수 가림 표의 최종 결과로 갱신했다. 배열 보기는 순서 그대로 표기하며 answer는 모두 원래 값이다.

### m-p7s-4.json

<details>
<summary>m-p7s-16-08 — 수정 전후</summary>

#### passages.0.lines.5.t

Q1 도착 전 라인 중단 근거 명확화

> **수정 전:** We could move the pricing presentation to this afternoon. They'll be here by 2:30 at the latest. That still leaves time for them to check into the hotel first.

> **수정 후:** We could move the pricing presentation to this afternoon. With the airport transfer and hotel check-in, they won't reach the plant before 2:30. We could start the presentation at 3:00.

#### passagesKo.0.lines.5

도착 시각 영한 동기화

> **수정 전:** 가격 발표를 오늘 오후로 옮기면 돼요. 늦어도 2시 30분에는 여기 도착할 거예요. 그래도 먼저 호텔에 체크인할 시간은 있어요.

> **수정 후:** 가격 발표를 오늘 오후로 옮기면 돼요. 공항 이동과 호텔 체크인을 마치면 2시 30분 전에는 공장에 도착하지 못해요. 발표는 3시에 시작하면 되겠네요.

#### questions.0.explain

정답 근거 갱신

> **수정 전:** 10시 6분 메시지에서 성형 라인은 2시까지만 돌아가는데 일행은 1시 15분에 착륙해 2시 30분쯤 도착한다. 수리 이야기는 없다.

> **수정 후:** 10시 6분 메시지에서 성형 라인은 2시에 가동을 멈추며, 10시 12분에는 공항 이동과 호텔 체크인 때문에 일행이 2시 30분 전에는 공장에 도착하지 못한다고 한다. 따라서 도착 전에 라인 가동이 끝난다.

</details>

<details>
<summary>m-p7s-16-10 — 수정 전후</summary>

#### passagesKo.0.body.1

two days before의 이틀 전체 반영

> **수정 전:** 추가 출입증은 개막 열흘 전까지 출품업체 포털에서 구매할 수 있습니다. 그 이후에는 현장 등록 창구에서만 더 높은 가격으로 살 수 있습니다. [2] 부스 설치나 철거만 돕는 직원의 출입증은 무료이고 수량 제한이 없지만, 박람회 이틀 전과 다음 날에만 유효합니다.

> **수정 후:** 추가 출입증은 개막 열흘 전까지 출품업체 포털에서 구매할 수 있습니다. 그 이후에는 현장 등록 창구에서만 더 높은 가격으로 살 수 있습니다. [2] 부스 설치나 철거만 돕는 직원의 출입증은 무료이고 수량 제한이 없지만, 개막 전 이틀과 폐막 다음 날에만 유효합니다.

</details>

<details>
<summary>m-p7s-17-10 — 수정 전후</summary>

#### passagesKo.0.lines.1

best-before 오역 수정

> **수정 전:** 뭐가 문제죠? 소비 기한은 늘 하던 대로 일, 월, 연 순서로 찍는데요. 다른 수출 고객들은 한 번도 그 얘기를 한 적이 없어요.

> **수정 후:** 뭐가 문제죠? 품질유지기한은 늘 하던 대로 일, 월, 연 순서로 찍는데요. 다른 수출 고객들은 한 번도 그 얘기를 한 적이 없어요.

#### passages.0.lines.3.t

Q2 의도 인용문을 문맥 의존으로 변경

> **수정 전:** We could print the month as letters, like 04 JUL. That reads the same way everywhere, so we wouldn't need a separate lid for each customer.

> **수정 후:** We could print the month as letters, like 04 JUL, on every customer's lids for future orders as well. That would save us a shelf.

#### passagesKo.0.lines.3

의도 발언 영한 동기화

> **수정 전:** 월을 04 JUL처럼 글자로 찍으면 돼요. 어디서나 똑같이 읽히니까 고객마다 뚜껑을 따로 만들 필요가 없어요.

> **수정 후:** 앞으로 들어올 주문도 모든 고객의 뚜껑에 월을 04 JUL처럼 글자로 찍으면 돼요. 그러면 선반 하나를 비울 수 있겠네요.

#### questions.1.q

인용문 일치

> **수정 전:** At 11:06 A.M., what does Ms. Rauh most likely mean when she writes, "That reads the same way everywhere"?

> **수정 후:** At 11:06 A.M., what does Ms. Rauh most likely mean when she writes, "That would save us a shelf"?

#### questions.1.ko.q

질문 번역 동기화

> **수정 전:** 오전 11시 6분에 라우가 “That reads the same way everywhere”라고 쓴 의도는 무엇인가?

> **수정 후:** 오전 11시 6분에 라우가 “That would save us a shelf”라고 쓴 의도는 무엇인가?

#### questions.1.explain

의도 해설 갱신

> **수정 전:** 월을 글자로 쓰면 어느 시장에서도 순서를 헷갈리지 않으므로 고객마다 다른 뚜껑이 필요 없다는 뜻이다. 바로 뒤의 '따로 만들 필요가 없다'와 이어진다.

> **수정 후:** 월을 글자로 표시한 뚜껑을 모든 고객에게 쓰자는 제안에 이어 나온 말이므로, 거래처별 뚜껑을 따로 보관하지 않아도 된다는 뜻이다. 선반 자체를 바꾸거나 현재 번역을 평가하는 발언이 아니다.

#### questions.3.explain

사진 전송·승인 요청 주체 정정

> **수정 전:** 11시 12분 메시지에서 문의가 오기 전에 거래처 담당자들에게 알리겠다고 한다. 사진은 콜라르가 바르센에 요청하는 것이다.

> **수정 후:** 11시 12분 메시지에서 라우는 문의가 오기 전에 거래처 담당자들에게 알리겠다고 한다. 콜라르는 시험 뚜껑 사진을 보내 바르센에 형식 승인을 요청한다.

</details>

<details>
<summary>m-p7s-18-07 — 수정 전후</summary>

#### questions.1.choices.1

Buses and trains라는 미제시 교통수단 단정 제거

> **수정 전:** Buses and trains from the airport run often.

> **수정 후:** Public transportation from the airport runs frequently.

</details>

<details>
<summary>m-p7s-18-09 — 수정 전후</summary>

#### passages.0.lines.6.t

다른 세 건/총 세 건 모순 해소

> **수정 전:** There are only three. I'll correct them all before the close tomorrow and add a note explaining the change.

> **수정 후:** There are only three euro invoices in total. I'll correct them all before the close tomorrow and add a note explaining the change.

#### passagesKo.0.lines.6

총수 영한 동기화

> **수정 전:** 세 건밖에 없어요. 내일 결산 전에 모두 고치고 변경 이유를 적은 메모를 붙일게요.

> **수정 후:** 유로화 청구서는 모두 합쳐 세 건뿐이에요. 내일 결산 전에 모두 고치고 변경 이유를 적은 메모를 붙일게요.

</details>

<details>
<summary>m-p7s-19-01 — 수정 전후</summary>

#### passagesKo.0.body.0

bank holiday는 국경일을 뜻하지 않음

> **수정 전:** 급여는 보통 매달 마지막 근무일에 지급됩니다. 그런데 올해 5월에는 마지막 근무일이 은행이 이체를 처리하지 않는 5월 30일 국경일입니다. 따라서 5월 급여는 하루 앞당겨 5월 29일 목요일에 지급합니다.

> **수정 후:** 급여는 보통 매달 마지막 근무일에 지급됩니다. 그런데 올해 5월에는 마지막 근무일이 은행이 이체를 처리하지 않는 5월 30일 은행 휴무일입니다. 따라서 5월 급여는 하루 앞당겨 5월 29일 목요일에 지급합니다.

#### questions.0.explain

번역 근거 정정

> **수정 전:** 첫 문단에서 마지막 근무일이 은행이 이체를 처리하지 않는 국경일이라 하루 앞당긴다고 한다.

> **수정 후:** 첫 문단에서 평소 지급일인 5월 30일이 은행이 이체를 처리하지 않는 은행 휴무일이라 하루 앞당긴다고 한다.

</details>

<details>
<summary>m-p7s-19-09 — 수정 전후</summary>

#### questions.3.explain

[1]에 고객 집단이 없다는 부정확한 설명 정정

> **수정 전:** them은 바로 앞의 재정비 제품 주요 구매자인 소규모 회사와 신생 기업을 가리키므로 [3]이 알맞다. [1] 앞에는 보증이 나오지만 them이 가리킬 구매자 집단이 없다.

> **수정 후:** them이 바로 앞의 재정비 제품 구매자인 소규모 회사와 신생 기업을 가리키므로 [3]이 가장 알맞다. [1]은 가구를 되파는 기존 고객과 재정비 절차를 소개하는 문맥이어서, 주요 구매자의 선택 이유를 덧붙이는 [3]보다 연결이 약하다.

</details>

<details>
<summary>m-p7s-20-01 — 수정 전후</summary>

#### passagesKo.0.body.0

영문에 없는 1층 정보 제거

> **수정 전:** 회의실, 로비, 직원 탕비실 등 캘버트 하우스 공용 공간에서 발견된 물건은 이제 각 입주사 사무실이 아니라 1층 안내 데스크에서 보관합니다. 물건마다 발견 날짜와 장소를 대장에 기록합니다.

> **수정 후:** 회의실, 로비, 직원 탕비실 등 캘버트 하우스 공용 공간에서 발견된 물건은 이제 각 입주사 사무실이 아니라 중앙 안내 데스크에서 보관합니다. 물건마다 발견 날짜와 장소를 대장에 기록합니다.

</details>

<details>
<summary>m-p7s-20-04 — 수정 전후</summary>

#### passages.0.heading.0

발신·본문과 고객 회사명 통일

> **수정 전:** To: Ordering contacts, Fairmont Catering customers

> **수정 후:** To: Ordering contacts, Brask Food Supply customers

#### passagesKo.0.heading.0

수신 회사 영한 동기화

> **수정 전:** 수신: 페어몬트 케이터링 고객 주문 담당자

> **수정 후:** 수신: 브라스크 식자재 고객 주문 담당자

</details>

<details>
<summary>m-p7s-20-07 — 수정 전후</summary>

#### questions.2.choices.0

전체 건물 공통 혜택으로도 참인 오답 제거

> **수정 전:** Replace their heating system for free

> **수정 후:** Replace the heating system before the lease begins

#### questions.2.ko.choices.0

오답 번역 동기화

> **수정 전:** 난방 설비를 무료로 교체한다

> **수정 후:** 임대 기간이 시작되기 전에 난방 설비를 교체한다

#### questions.2.explain

명확한 오답의 시간 근거 반영

> **수정 전:** 셋째 문단에서 5년 계약을 선택하면 소유주 부담으로 사무실을 칠하고 카펫을 교체해 준다고 한다. 난방 설비 교체는 건물 전체 계획이다.

> **수정 후:** 셋째 문단에서 5년 계약을 선택하면 소유주 부담으로 사무실을 칠하고 카펫을 교체해 준다고 한다. 난방 설비 교체는 1월 계약 시작 전이 아니라 그다음 여름의 건물 전체 계획이다.

</details>

<details>
<summary>m-p7s-20-09 — 수정 전후</summary>

#### passagesKo.0.lines.4

flat boxes 상태 오역 정정

> **수정 전:** 그러면 한 가지가 아니라 두 가지 크기가 필요하네요. 포장대에는 펼친 상자 한 더미를 둘 자리밖에 없어요.

> **수정 후:** 그러면 한 가지가 아니라 두 가지 크기가 필요하네요. 포장대에는 접어 납작하게 해 둔 상자 한 더미를 둘 자리밖에 없어요.

</details>

<details>
<summary>m-p7s-20-10 — 수정 전후</summary>

#### questions.2.q

4월에는 로비 안내도 없다는 복수 정답 해소: 반납 기한을 놓쳐 상실한 혜택을 질문

> **수정 전:** What will a member who returns a key card on April 2 most likely not receive?

> **수정 후:** Which benefit would a member forfeit by returning a key card on April 2 rather than by March 31?

#### questions.2.ko.q

질문 영한 동기화

> **수정 전:** 4월 2일에 출입 카드를 반납한 회원은 무엇을 받지 못할 것 같은가?

> **수정 후:** 회원이 출입 카드를 3월 31일 대신 4월 2일에 반납하면 어떤 혜택을 놓치게 되는가?

#### questions.2.explain

반납 지연과 직접 관련된 정답 명확화

> **수정 전:** 3월 31일까지 반납한 회원만 4월 회의실 2시간 무료 이용권을 받으므로 4월 2일 반납자는 받지 못한다.

> **수정 후:** 3월 31일까지 카드를 반납하면 4월 회의실 2시간 무료 이용권을 받으므로, 4월 2일 반납으로 놓치는 혜택은 회의실 무료 이용이다. 로비 안내 테이블의 운영 기간은 3월 첫 주로, 카드 반납 기한 준수 여부와 관계없다.

</details>

### m-p7m-4.json

<details>
<summary>m-p7-16-11 — 수정 전후</summary>

#### passages.0.body.1

Q3 상품명 단독 의미 힌트 제거

> **수정 전:** Studio Session — up to 8 people at our Calder Street studio. Choose from three background colors. $480.

> **수정 후:** Aster Session — up to 8 people at our Calder Street studio. Choose from three background colors. $480.

#### passages.0.body.2

Q3 상품명 중립화

> **수정 전:** Office Visit — up to 15 people at your workplace. We bring our own lighting and a portable backdrop, and we need only a space about the size of a small meeting room. $850.

> **수정 후:** Briar Session — up to 15 people at your workplace. We bring our own lighting and a portable backdrop, and we need only a space about the size of a small meeting room. $850.

#### passages.0.body.3

Q3 상품명 중립화

> **수정 전:** Office Visit Plus — up to 30 people at your workplace, with professional retouching of every final image. $1,600.

> **수정 후:** Clover Session — up to 30 people at your workplace, with professional retouching of every final image. $1,600.

#### passagesKo.0.body.1

상품명 영한 동기화

> **수정 전:** 스튜디오 촬영 — 캘더 스트리트 스튜디오에서 최대 8명. 배경색 세 가지 중 선택. 480달러.

> **수정 후:** 애스터 세션 — 캘더 스트리트 스튜디오에서 최대 8명. 배경색 세 가지 중 선택. 480달러.

#### passagesKo.0.body.2

상품명 영한 동기화

> **수정 전:** 사무실 방문 — 귀사 사업장에서 최대 15명. 조명과 이동식 배경을 직접 가져가며, 작은 회의실 정도의 공간만 있으면 됩니다. 850달러.

> **수정 후:** 브라이어 세션 — 귀사 사업장에서 최대 15명. 조명과 이동식 배경을 직접 가져가며, 작은 회의실 정도의 공간만 있으면 됩니다. 850달러.

#### passagesKo.0.body.3

상품명 영한 동기화

> **수정 전:** 사무실 방문 플러스 — 귀사 사업장에서 최대 30명, 모든 최종 사진에 전문 보정 포함. 1,600달러.

> **수정 후:** 클로버 세션 — 귀사 사업장에서 최대 30명, 모든 최종 사진에 전문 보정 포함. 1,600달러.

#### passages.1.body.2

출입증에만 사용한다는 문장과 프로필용 사진 요청 모순 해소

> **수정 전:** The images will appear only on badges, so we do not need any retouching. However, two of the new employees, both of whom will be visiting customers regularly, have asked for a second image that they can use on their business profiles. Please include these in the booking.

> **수정 후:** We do not need retouching for any of the photographs. However, two of the new employees, both of whom will be visiting customers regularly, have asked for a second image that they can use on their business profiles. Please include these in the booking.

#### passagesKo.1.body.2

사진 사용 범위 동기화

> **수정 전:** 사진은 출입증에만 쓰이므로 보정은 필요 없습니다. 다만 신입 직원 중 고객을 정기적으로 방문할 두 사람이 업무용 프로필에 쓸 사진을 한 장 더 원합니다. 이것도 예약에 포함해 주십시오.

> **수정 후:** 어떤 사진에도 보정은 필요 없습니다. 다만 신입 직원 중 고객을 정기적으로 방문할 두 사람이 업무용 프로필에 쓸 사진을 한 장 더 원합니다. 이것도 예약에 포함해 주십시오.

#### questions.2.choices

Q3 상품명 중립화

> **수정 전:** ["Studio Session","Office Visit","Office Visit Plus","Two Studio Sessions"]

> **수정 후:** ["Aster Session","Briar Session","Clover Session","Two Aster Sessions"]

#### questions.2.ko.choices

Q3 상품명 중립화

> **수정 전:** ["스튜디오 촬영","사무실 방문","사무실 방문 플러스","스튜디오 촬영 두 번"]

> **수정 후:** ["애스터 세션","브라이어 세션","클로버 세션","애스터 세션 두 번"]

#### questions.2.explain

Q3 상품명 중립화

> **수정 전:** 이메일의 14명·현장 촬영·보정 불필요라는 조건에 광고에서 맞는 것은 15명까지 사업장에서 찍는 사무실 방문이다. 플러스는 보정이 포함된 더 비싼 상품이고 스튜디오 촬영은 현장이 아니다.

> **수정 후:** 이메일의 14명·현장 촬영·보정 불필요라는 조건을 광고의 상품별 내용과 연결하면 15명까지 현장에서 찍는 브라이어 세션이 맞는다. 클로버는 필요 없는 보정이 포함된 더 비싼 상품이며 애스터는 스튜디오 촬영이다.

</details>

<details>
<summary>m-p7-16-12 — 수정 전후</summary>

#### questions.2.q

Q3 규정 단독 소거를 두 문서 가격 비교로 교체

> **수정 전:** Why was Merrin Medical Supply permitted to send Halvik pouches without asking first?

> **수정 후:** How much less per pack will Calloway Dental Group pay for the Halvik pouches than for the pouches on its purchase order?

#### questions.2.choices

Q3 규정 단독 소거를 두 문서 가격 비교로 교체

> **수정 전:** ["The goods will arrive before March 18.","Partial shipments are acceptable to the branch.","The goods must be received by March 18.","The replacement is cheaper than the item ordered."]

> **수정 후:** ["$0.20","$0.30","$0.40","$0.50"]

#### questions.2.ko.q

Q3 규정 단독 소거를 두 문서 가격 비교로 교체

> **수정 전:** 메린 의료 용품이 먼저 묻지 않고 할빅 파우치를 보낼 수 있었던 이유는 무엇인가?

> **수정 후:** 캘러웨이 치과 그룹은 할빅 파우치 한 묶음에 대해 구매 주문서의 파우치보다 얼마를 덜 내는가?

#### questions.2.ko.choices

Q3 규정 단독 소거를 두 문서 가격 비교로 교체

> **수정 전:** ["물품이 3월 18일 전에 도착한다.","지점이 분할 배송을 받는다.","물품을 3월 18일까지 받아야 한다.","대체품이 주문한 품목보다 싸다."]

> **수정 후:** ["0.20달러","0.30달러","0.40달러","0.50달러"]

#### questions.2.explain

Q3 규정 단독 소거를 두 문서 가격 비교로 교체

> **수정 전:** 주문서는 단가 10달러 미만 품목을 같은 크기, 같거나 낮은 가격으로 바꿀 때만 연락 없이 대체할 수 있다고 한다. 이메일의 할빅 파우치는 같은 규격이며 9.20달러 품목을 8.70달러로 바꿨으므로 조건을 충족한다. 다른 보기는 두 지문에 나오는 사실이지만 대체 허용 이유가 아니다.

> **수정 후:** 주문서의 파우치 단가는 9.20달러이고 이메일의 할빅 파우치 단가는 8.70달러다. 두 문서의 가격 차이는 묶음당 0.50달러다.

#### questions.3.choices.1

Q4 지연 승인도 필요하다는 두 번째 참 보기 제거

> **수정 전:** They must be approved by the purchasing office.

> **수정 후:** All twenty boxes will be sent on March 21.

#### questions.3.ko.choices.1

Q4 오답 동기화

> **수정 전:** 구매팀의 승인을 받아야 한다.

> **수정 후:** 스무 상자 모두 3월 21일에 발송될 것이다.

#### questions.3.explain

Q4 변경 오답 근거

> **수정 전:** 주문서는 3월 18일까지 받아야 한다고 하고, 이메일은 나머지 여덟 상자를 3월 21일에 보낸다고 한다. 발송 전에는 청구하지 않으며 상표 변경은 파우치에 관한 이야기다.

> **수정 후:** 주문서는 3월 18일까지 받아야 한다고 하고, 이메일은 나머지 여덟 상자를 3월 21일에 보낸다고 한다. 열두 상자는 먼저 배송되므로 스무 상자 모두를 21일에 보내는 것은 아니다.

#### questions.4.choices.0

full credit를 현금 환불로 단정한 보기 정정

> **수정 전:** Take back an item and refund its cost

> **수정 후:** Collect unsuitable pouches and credit their full cost

#### questions.4.ko.choices.0

full credit 영한 동기화

> **수정 전:** 물품을 회수하고 비용을 돌려준다

> **수정 후:** 맞지 않는 파우치를 회수하고 전액을 적립한다

</details>

<details>
<summary>m-p7-16-13 — 수정 전후</summary>

#### questions.2.q

Q3 규정 단독 사유 선택을 두 날짜 차이로 교체

> **수정 전:** Why was crate T3 turned away?

> **수정 후:** How many days after the advance warehouse's final receiving date did crate T3 first reach it?

#### questions.2.choices

Q3 규정 단독 사유 선택을 두 날짜 차이로 교체

> **수정 전:** ["It weighed more than the warehouse allows.","It came after the last day the warehouse accepts crates.","No one from Tallis Acoustics was there to sign for it.","Its contents had been printed with the wrong prices."]

> **수정 후:** ["One","Two","Three","Four"]

#### questions.2.ko.q

Q3 규정 단독 사유 선택을 두 날짜 차이로 교체

> **수정 전:** 상자 T3는 왜 돌려보내졌는가?

> **수정 후:** 상자 T3가 사전 창고에 처음 도착한 것은 창고의 최종 접수일로부터 며칠 뒤인가?

#### questions.2.ko.choices

Q3 규정 단독 사유 선택을 두 날짜 차이로 교체

> **수정 전:** ["창고가 허용하는 무게를 넘었다.","창고 접수 마지막 날 이후에 도착했다.","탈리스 어쿠스틱스 직원이 인수 서명을 하러 오지 않았다.","내용물이 잘못된 가격으로 인쇄되었다."]

> **수정 후:** ["하루","이틀","사흘","나흘"]

#### questions.2.explain

Q3 규정 단독 사유 선택을 두 날짜 차이로 교체

> **수정 전:** 이메일 날짜(10월 11일) 기준 '어제'인 10월 10일에 창고로 갔고, 공지의 창고 접수 기간은 10월 8일까지다. 서명 요건은 직접 배송에 관한 것이고, 가격 정정은 따로 보낸 이유일 뿐이다.

> **수정 후:** 공지의 창고 접수 마지막 날은 10월 8일이다. 10월 11일 이메일의 '어제'는 10월 10일이므로 이틀 뒤에 도착했다.

</details>

<details>
<summary>m-p7-16-14 — 수정 전후</summary>

#### passages.0.body.1

Q4 요금제 명칭 중립화

> **수정 전:** Daytime: Monday to Friday, 8:00 A.M. to 6:00 P.M. Up to 150 calls per month. $190 per month.

> **수정 후:** Alder: Monday to Friday, 8:00 A.M. to 6:00 P.M. Up to 150 calls per month. $190 per month.

#### passagesKo.0.body.1

요금제 영한 동기화

> **수정 전:** 주간: 월~금 오전 8시~오후 6시. 월 최대 150통. 월 190달러.

> **수정 후:** 앨더: 월~금 오전 8시~오후 6시. 월 최대 150통. 월 190달러.

#### passages.0.body.2

Q4 요금제 명칭 중립화

> **수정 전:** Extended: Monday to Saturday, 7:00 A.M. to 9:00 P.M. Up to 300 calls per month. $340 per month.

> **수정 후:** Briar: Monday to Saturday, 7:00 A.M. to 9:00 P.M. Up to 300 calls per month. $340 per month.

#### passagesKo.0.body.2

요금제 영한 동기화

> **수정 전:** 확장: 월~토 오전 7시~오후 9시. 월 최대 300통. 월 340달러.

> **수정 후:** 브라이어: 월~토 오전 7시~오후 9시. 월 최대 300통. 월 340달러.

#### passages.0.body.3

Q4 요금제 명칭 중립화

> **수정 전:** Around the Clock: every day, 24 hours. Up to 500 calls per month. $560 per month.

> **수정 후:** Cedar: every day, 24 hours. Up to 500 calls per month. $560 per month.

#### passagesKo.0.body.3

요금제 영한 동기화

> **수정 전:** 24시간: 매일 24시간. 월 최대 500통. 월 560달러.

> **수정 후:** 시더: 매일 24시간. 월 최대 500통. 월 560달러.

#### passages.0.body.4

Q4 요금제 명칭 중립화

> **수정 전:** Calls beyond a plan's monthly allowance are billed at $1.10 each. Please note that on January 1 of this year, Saturday coverage was removed from the Daytime plan, which now operates on weekdays only. Customers may change plans at the start of any month without a fee.

> **수정 후:** Calls beyond a plan's monthly allowance are billed at $1.10 each. Please note that on January 1 of this year, Saturday coverage was removed from the Alder plan, which now operates on weekdays only. Customers may change plans at the start of any month without a fee.

#### passagesKo.0.body.4

요금제 영한 동기화

> **수정 전:** 요금제의 월 허용량을 넘는 통화는 통당 1.10달러가 청구됩니다. 올해 1월 1일부터 주간 요금제에서 토요일 응대가 빠져 현재는 평일에만 운영된다는 점에 유의하십시오. 고객은 매월 초에 수수료 없이 요금제를 바꿀 수 있습니다.

> **수정 후:** 요금제의 월 허용량을 넘는 통화는 통당 1.10달러가 청구됩니다. 올해 1월 1일부터 앨더 요금제에서 토요일 응대가 빠져 현재는 평일에만 운영된다는 점에 유의하십시오. 고객은 매월 초에 수수료 없이 요금제를 바꿀 수 있습니다.

#### passages.1.body.0

요금제 명칭 동기화

> **수정 전:** We have used Clearline's Daytime plan for about eight months. Our clinic opens on Saturday mornings, and the receptionists handle those appointments as smoothly as weekday calls. Patients often tell us they assumed they were speaking to someone in our own front office. Setting up the service took less than a week, and the introductory call helped us write clear instructions for the receptionists.

> **수정 후:** We have used Clearline's Alder plan for about eight months. Our clinic opens on Saturday mornings, and the receptionists handle those appointments as smoothly as weekday calls. Patients often tell us they assumed they were speaking to someone in our own front office. Setting up the service took less than a week, and the introductory call helped us write clear instructions for the receptionists.

#### passagesKo.1.body.0

요금제 명칭 동기화

> **수정 전:** 저희는 약 여덟 달 동안 클리어라인의 주간 요금제를 이용했습니다. 저희 병원은 토요일 오전에 문을 여는데, 응대 직원들이 그 시간 예약도 평일 통화처럼 매끄럽게 처리합니다. 환자들은 저희 병원 접수처 직원과 통화하는 줄 알았다고 자주 말합니다. 서비스 설정은 일주일도 걸리지 않았고, 첫 안내 통화 덕분에 응대 직원에게 줄 지침을 명확하게 쓸 수 있었습니다.

> **수정 후:** 저희는 약 여덟 달 동안 클리어라인의 앨더 요금제를 이용했습니다. 저희 병원은 토요일 오전에 문을 여는데, 응대 직원들이 그 시간 예약도 평일 통화처럼 매끄럽게 처리합니다. 환자들은 저희 병원 접수처 직원과 통화하는 줄 알았다고 자주 말합니다. 서비스 설정은 일주일도 걸리지 않았고, 첫 안내 통화 덕분에 응대 직원에게 줄 지침을 명확하게 쓸 수 있었습니다.

#### questions.2.q

Q3 변경 결론 노출을 요금제·현재 가격 연결로 교체

> **수정 전:** What is suggested about Pemberton Physiotherapy's plan?

> **수정 후:** What is the current monthly base charge for the plan named in Mr. Tolliver's review?

#### questions.2.choices

Q3 변경 결론 노출을 요금제·현재 가격 연결로 교체

> **수정 전:** ["It was canceled after the newspaper feature.","It was upgraded at no charge in March.","It once covered hours that the same plan no longer covers.","It allowed more calls than the Extended plan."]

> **수정 후:** ["$560","$1.10","$190","$340"]

#### questions.2.ko.q

Q3 변경 결론 노출을 요금제·현재 가격 연결로 교체

> **수정 전:** 펨버턴 물리치료의 요금제에 관해 암시된 것은 무엇인가?

> **수정 후:** 톨리버의 후기에 나온 요금제의 현재 월 기본료는 얼마인가?

#### questions.2.ko.choices

Q3 변경 결론 노출을 요금제·현재 가격 연결로 교체

> **수정 전:** ["신문 기사 이후 해지되었다.","3월에 무료로 상향되었다.","지금은 같은 요금제가 다루지 않는 시간대를 한때 다루었다.","확장 요금제보다 더 많은 통화를 허용했다."]

> **수정 후:** ["560달러","1.10달러","190달러","340달러"]

#### questions.2.explain

Q3 변경 결론 노출을 요금제·현재 가격 연결로 교체

> **수정 전:** 후기는 작년에 주간 요금제로 토요일 오전 응대를 받았다고 하고, 웹페이지는 올해 1월 1일 주간 요금제에서 토요일 응대가 빠졌다고 한다. 두 문서를 함께 봐야 후기 당시와 지금의 요금제 내용이 다르다는 것을 알 수 있다.

> **수정 후:** 후기에서 사용했다고 한 요금제는 앨더이며, 현재 웹페이지에서 앨더의 월 기본료는 190달러다. 후기에는 요금이 없으므로 현재 가격표와 연결해야 한다.

#### questions.3.choices

Q4 중립 요금제 명칭 동기화

> **수정 전:** ["Daytime","Extended","Around the Clock","Daytime with extra calls"]

> **수정 후:** ["Alder","Briar","Cedar","Alder with extra calls"]

#### questions.3.ko.choices

Q4 중립 요금제 명칭 동기화

> **수정 전:** ["주간","확장","24시간","주간 + 추가 통화"]

> **수정 후:** ["앨더","브라이어","시더","앨더 + 추가 통화"]

#### questions.3.explain

Q4 중립 요금제 명칭 동기화

> **수정 전:** 이메일의 월 260통·토요일 오전 조건을 웹페이지에 대입하면 토요일을 포함하고 300통까지인 확장이 가장 저렴하다. 후기만 보면 주간 요금제에 토요일이 포함된 것처럼 보이지만 올해부터는 아니다.

> **수정 후:** 이메일의 월 260통·토요일 오전 조건을 현행 웹페이지에 대입하면 토요일을 포함하고 300통까지인 브라이어가 가장 저렴하다. 과거 후기의 앨더와 달리 현재 앨더는 토요일을 다루지 않는다.

</details>

<details>
<summary>m-p7-16-15 — 수정 전후</summary>

#### questions.2.q

Q3 무승인 결론 단독 노출을 계약·사례·청구 금액 결합으로 교체

> **수정 전:** What is suggested about the carpet cleaning?

> **수정 후:** What should the revised invoice total be if only charges authorized under the agreement remain?

#### questions.2.choices

Q3 무승인 결론 단독 노출을 계약·사례·청구 금액 결합으로 교체

> **수정 전:** ["It was carried out on the wrong floor.","It was charged at the wrong rate.","It was performed without the necessary approval.","It was canceled by Lumio Design at short notice."]

> **수정 후:** ["$2,790.00","$3,000.00","$2,580.00","$3,200.00"]

#### questions.2.ko.q

Q3 무승인 결론 단독 노출을 계약·사례·청구 금액 결합으로 교체

> **수정 전:** 카펫 세척에 관해 암시된 것은 무엇인가?

> **수정 후:** 계약에 따라 승인되는 요금만 남기면 수정 청구서의 총액은 얼마여야 하는가?

#### questions.2.ko.choices

Q3 무승인 결론 단독 노출을 계약·사례·청구 금액 결합으로 교체

> **수정 전:** ["다른 층에서 이루어졌다.","잘못된 요금으로 청구되었다.","필요한 승인 없이 수행되었다.","루미오 디자인이 촉박하게 취소했다."]

> **수정 후:** ["2,790.00달러","3,000.00달러","2,580.00달러","3,200.00달러"]

#### questions.2.explain

Q3 무승인 결론 단독 노출을 계약·사례·청구 금액 결합으로 교체

> **수정 전:** 계약서 4.3은 요청 시 서비스에 시설 관리자의 서면 승인이 필요하고 임차인 요청은 승인이 아니라고 한다. 이메일은 임차인 루미오 디자인과 직접 정했고 관리 사무실에는 연락이 없었다고 한다. 200m²×3.10달러=620달러이므로 요금 계산은 맞다.

> **수정 후:** 이메일의 외부 창문은 업체 사정으로 미실시했고 카펫은 시설 관리자의 사전 서면 승인 없이 수행했으므로 계약 4.2·4.3에 따라 제외한다. 청구서에서 남는 사무실 청소 2,400달러와 실내 창문 180달러의 합은 2,580달러다.

#### passages.2.body.3

판단 결론 대신 실제 수행 사실

> **수정 전:** The office cleaning and the interior window visit are correct. Please send a revised invoice, and I will arrange payment promptly. Your crew's weekday work has been excellent, and several tenants have commented on it.

> **수정 후:** Your crew attended on the weekdays listed for May, and the interior windows were cleaned on May 6. Please send a revised invoice, and I will arrange payment promptly. Your crew's weekday work has been excellent, and several tenants have commented on it.

#### passagesKo.2.body.3

실제 수행 사실 영한 동기화

> **수정 전:** 사무실 청소와 실내 창문 방문은 맞습니다. 수정된 청구서를 보내 주시면 바로 대금을 지급하겠습니다. 귀사 작업반의 평일 작업은 훌륭했고, 여러 임차인이 칭찬했습니다.

> **수정 후:** 작업반은 5월의 기재된 평일에 방문했고 실내 창문은 5월 6일에 청소했습니다. 수정된 청구서를 보내 주시면 바로 대금을 지급하겠습니다. 귀사 작업반의 평일 작업은 훌륭했고, 여러 임차인이 칭찬했습니다.

#### questions.4.explain

마지막 문단이라는 잘못된 위치 정정

> **수정 전:** 이메일 마지막 문단에서 수정된 청구서(revised invoice)를 보내 달라고 한다.

> **수정 후:** 이메일에서 수정된 청구서(revised invoice)를 보내 달라고 한다. 고소 작업대 수리나 납부 기한 연장은 요청하지 않았다.

</details>

<details>
<summary>m-p7-17-13 — 수정 전후</summary>

#### questions.2.q

Q3 이메일 단독 사유 선택을 날짜 차이로 교체

> **수정 전:** Why was Ms. Brook most likely not given an interview on the first two days of the interview period?

> **수정 후:** How many calendar days after the application deadline does Ms. Brook's course in Pelham begin?

#### questions.2.choices

Q3 이메일 단독 사유 선택을 날짜 차이로 교체

> **수정 전:** ["She asked to meet a particular panel member.","She will attend a course on the other interview days.","The panel wanted to see her forklift certificate.","Her application arrived after the deadline."]

> **수정 후:** ["Nine","Eleven","Twelve","Thirteen"]

#### questions.2.ko.q

Q3 이메일 단독 사유 선택을 날짜 차이로 교체

> **수정 전:** 브룩은 왜 면접 기간의 첫 이틀에 면접이 잡히지 않았을 것 같은가?

> **수정 후:** 브룩의 펠럼 교육 과정은 지원 마감일로부터 달력상 며칠 뒤에 시작하는가?

#### questions.2.ko.choices

Q3 이메일 단독 사유 선택을 날짜 차이로 교체

> **수정 전:** ["특정 면접관을 만나고 싶다고 했다.","다른 면접일에는 교육 과정에 참석한다.","면접관이 지게차 자격증을 보고 싶어 했다.","지원서가 마감 후에 도착했다."]

> **수정 후:** ["9일","11일","12일","13일"]

#### questions.2.explain

Q3 이메일 단독 사유 선택을 날짜 차이로 교체

> **수정 전:** 광고에서 면접 기간은 5월 20~22일이고, 이메일에서 브룩은 5월 20·21일에 교육 과정이 있다. 지원서는 5월 6일에 보냈으므로 마감 전이다.

> **수정 후:** 광고의 지원 마감일은 5월 9일이고 브룩의 이메일에 나온 교육 시작일은 5월 20일이다. 두 날짜 사이의 간격은 11일이다.

</details>

<details>
<summary>m-p7-17-14 — 수정 전후</summary>

#### passages.0.body.2

주 발표자·보조 발표자의 무료 등록 범위 구별

> **수정 전:** Every accepted speaker receives free registration for both days of the forum. A full session may include one co-presenter, who will also be registered free of charge. Speakers must upload their final slides at least seven days before their session so that our technical team can test them on the room equipment. Slides received after that date may not be shown.

> **수정 후:** Each accepted lead speaker receives free registration for both days of the forum. For a short talk, a colleague may assist with the presentation, but only the lead speaker receives free registration. A full session may include one co-presenter, who will also be registered free of charge. Speakers must upload their final slides at least seven days before their session so that our technical team can test them on the room equipment. Slides received after that date may not be shown.

#### passagesKo.0.body.2

무료 등록 범위 영한 동기화

> **수정 전:** 채택된 발표자는 모두 포럼 이틀 동안 무료로 등록됩니다. 정규 세션에는 공동 발표자 한 명을 둘 수 있으며 이 사람도 무료로 등록됩니다. 기술팀이 발표장 장비에서 시험할 수 있도록 발표자는 세션 최소 7일 전에 최종 슬라이드를 올려야 합니다. 그 이후 받은 슬라이드는 상영되지 않을 수 있습니다.

> **수정 후:** 채택된 주 발표자는 모두 포럼 이틀 동안 무료로 등록됩니다. 짧은 발표에는 동료가 발표를 도울 수 있지만 무료 등록은 주 발표자에게만 제공됩니다. 정규 세션에는 공동 발표자 한 명을 둘 수 있으며 이 사람도 무료로 등록됩니다. 기술팀이 발표장 장비에서 시험할 수 있도록 발표자는 세션 최소 7일 전에 최종 슬라이드를 올려야 합니다. 그 이후 받은 슬라이드는 상영되지 않을 수 있습니다.

#### passages.2.body.1

9월 예정인 방·시각을 7월에 확정한 모순 제거

> **수정 전:** Good news: our proposal for the Northern Packaging Forum was accepted. The bad news is that we have less time than we planned for. Our slot will be in Seminar Room B at 11:15 A.M., and the committee has asked us to keep strictly to time because another talk follows immediately.

> **수정 후:** Good news: our proposal for the Northern Packaging Forum was accepted. The bad news is that we have less time than we planned for. We'll need to shorten the demonstration and leave time for questions. I'm looking again at the outline we submitted so that we can decide which examples to keep.

#### passagesKo.2.body.1

일정 모순 영한 동기화

> **수정 전:** 좋은 소식이에요. 북부 포장 포럼에 낸 우리 제안이 채택됐어요. 나쁜 소식은 계획보다 시간이 짧다는 거예요. 우리 순서는 세미나실 B에서 오전 11시 15분이고, 바로 다음 발표가 이어지니 시간을 엄격히 지켜 달라고 위원회가 요청했어요.

> **수정 후:** 좋은 소식이에요. 북부 포장 포럼에 낸 우리 제안이 채택됐어요. 나쁜 소식은 계획보다 시간이 짧다는 거예요. 시연을 줄이고 질문받을 시간을 남겨야겠어요. 어떤 사례를 남길지 정할 수 있도록 제출했던 개요를 다시 보고 있어요.

#### questions.2.explain

명확한 주·보조 발표자 규정 반영

> **수정 전:** 웹페이지는 공동 발표자의 무료 등록을 정규 세션에만 허용하고, 위원회 이메일은 파루크의 발표를 짧은 발표로 채택했다. 하틀리는 그 짧은 발표의 공동 발표자이므로 무료 등록 대상이 아니다. 대강당 발표는 정규 세션이다.

> **수정 후:** 위원회 이메일은 파루크의 발표를 짧은 발표로 채택했고, 마지막 이메일에서 하틀리는 비용 비교를 도울 사람으로 요청된다. 웹페이지상 짧은 발표의 무료 등록은 주 발표자에게만 제공되므로 하틀리는 무료 대상이 아니다.

#### questions.3.choices.2

A만으로 유일한 7일 전 날짜 소거를 막는 경쟁 보기

> **수정 전:** October 16

> **수정 후:** October 10

#### questions.3.ko.choices.2

경쟁 날짜 영한 동기화

> **수정 전:** 10월 16일

> **수정 후:** 10월 10일

</details>

<details>
<summary>m-p7-17-15 — 수정 전후</summary>

#### questions.2.q

Q3 기록 단독 사실 답변을 차량 코드·차종 연결로 교체

> **수정 전:** Why is Mr. Avery most likely contacting Ms. Moss?

> **수정 후:** What type of vehicle did Ms. Koh use on April 15?

#### questions.2.choices

Q3 기록 단독 사실 답변을 차량 코드·차종 연결로 교체

> **수정 전:** ["She is responsible for insurance claims.","She reported the scrape on the tablet.","She drove the van just before the damage was recorded.","She booked the electric car for Wednesday."]

> **수정 후:** ["A van","An electric car","A compact car","A delivery truck"]

#### questions.2.ko.q

Q3 기록 단독 사실 답변을 차량 코드·차종 연결로 교체

> **수정 전:** 에이버리는 왜 모스에게 연락하는 것 같은가?

> **수정 후:** 코는 4월 15일에 어떤 종류의 차량을 사용했는가?

#### questions.2.ko.choices

Q3 기록 단독 사실 답변을 차량 코드·차종 연결로 교체

> **수정 전:** ["보험 청구 담당자다.","태블릿에 긁힘을 입력했다.","손상이 기록되기 직전에 승합차를 운전했다.","수요일에 전기차를 예약했다."]

> **수정 후:** ["승합차","전기차","소형차","배송 트럭"]

#### questions.2.explain

Q3 기록 단독 사실 답변을 차량 코드·차종 연결로 교체

> **수정 전:** 이메일은 승합차 뒤 범퍼 긁힘을 묻고, 기록에 따르면 이크발이 출발 전에 긁힘을 입력했으며 그 직전에 승합차를 쓴 사람이 모스다. 긁힘을 입력한 사람은 이크발이다.

> **수정 후:** 차량 기록에서 코가 사용한 차량은 KX-31이다. 공지의 차량 코드 설명에서 KX-31은 소형차라고 하므로 두 문서를 연결해야 한다.

</details>

<details>
<summary>m-p7-18-12 — 수정 전후</summary>

#### questions.2.q

Q3 규정 단독 면제 사유 선택을 실제 날짜 비교로 교체

> **수정 전:** Why will an inspection most likely not be required?

> **수정 후:** How many days after the actual delivery date did Mr. Grey write his letter?

#### questions.2.choices

Q3 규정 단독 면제 사유 선택을 실제 날짜 비교로 교체

> **수정 전:** ["The photographs showed the damage clearly.","The damage was reported within the guarantee period.","The upholsterer has already seen the sofa.","The sofa was ordered more than a month ago."]

> **수정 후:** ["Three","Six","Nine","Eleven"]

#### questions.2.ko.q

Q3 규정 단독 면제 사유 선택을 실제 날짜 비교로 교체

> **수정 전:** 점검이 필요하지 않을 것으로 보이는 이유는 무엇인가?

> **수정 후:** 그레이는 실제 배송일로부터 며칠 뒤에 편지를 썼는가?

#### questions.2.ko.choices

Q3 규정 단독 면제 사유 선택을 실제 날짜 비교로 교체

> **수정 전:** ["사진에 손상이 분명히 보였다.","손상이 보증 기간 안에 신고되었다.","가구 수선 기사가 이미 소파를 보았다.","소파를 한 달도 더 전에 주문했다."]

> **수정 후:** ["사흘","엿새","아흐레","열하루"]

#### questions.2.explain

Q3 규정 단독 면제 사유 선택을 실제 날짜 비교로 교체

> **수정 전:** 이메일은 실제 배송일이 5월 6일이고 7일 안의 신고는 점검 없이 보상된다고 하며, 편지 날짜는 5월 12일이므로 엿새 만에 신고했다. 편지의 배송일 5월 3일만 보면 9일이 지나 점검이 필요해 보인다.

> **수정 후:** 이메일이 정정한 실제 배송일은 5월 6일이고 편지는 5월 12일에 작성되었으므로 엿새 뒤다. 편지에 잘못 적힌 배송일인 5월 3일로 계산하면 아흐레가 된다.

</details>

<details>
<summary>m-p7-18-13 — 수정 전후</summary>

#### questions.2.q

Q3 수료증 누락 표면 단서 대신 희망 과정·발송일 결합

> **수정 전:** Why is Mr. Ruiz not yet able to join the Advanced course?

> **수정 후:** On what date will the materials for the course Mr. Ruiz requested be e-mailed?

#### questions.2.choices

Q3 수료증 누락 표면 단서 대신 희망 과정·발송일 결합

> **수정 전:** ["His manager has not approved the request.","His request was sent after the deadline.","He has not earned a certificate the course requires.","The course is already full."]

> **수정 후:** ["September 16","September 30","October 14","October 7"]

#### questions.2.ko.q

Q3 수료증 누락 표면 단서 대신 희망 과정·발송일 결합

> **수정 전:** 루이스가 아직 고급 과정에 참여할 수 없는 이유는 무엇인가?

> **수정 후:** 루이스가 신청한 과정의 교재는 어느 날짜에 이메일로 발송되는가?

#### questions.2.ko.choices

Q3 수료증 누락 표면 단서 대신 희망 과정·발송일 결합

> **수정 전:** ["관리자가 신청을 승인하지 않았다.","신청을 마감 후에 보냈다.","과정에 필요한 수료증을 받지 않았다.","과정이 이미 찼다."]

> **수정 후:** ["9월 16일","9월 30일","10월 14일","10월 7일"]

#### questions.2.explain

Q3 수료증 누락 표면 단서 대신 희망 과정·발송일 결합

> **수정 전:** 공지는 고급 과정에 중급 수료증이 필요하다고 하고, 교육 기록상 루이스는 중급을 중도 포기해 수료증이 없다. 이메일은 9월 5일로 마감 전이며 관리자 승인도 받았다.

> **수정 후:** 이메일에서 루이스가 신청한 과정은 고급이다. 공지의 고급 과정 시작일 10월 21일에서 교재 발송 간격인 일주일을 빼면 10월 14일이다.

#### questions.3.q

Q4 규정 단독으로 유일하게 가능한 보기만 있는 구성 해소

> **수정 전:** What will Mr. Ruiz most likely need to do to take the Advanced course in October?

> **수정 후:** Which action would satisfy the course-entry requirement that is not already documented for Mr. Ruiz?

#### questions.3.choices

Q4 규정 단독으로 유일하게 가능한 보기만 있는 구성 해소

> **수정 전:** ["Complete a short test online","Ask Ms. Kirby to approve again","Wait until the spring session","Repeat the Foundation course"]

> **수정 후:** ["Pass the online placement quiz","Submit his existing Intermediate certificate","Provide his manager's approval","Provide his Foundation certificate"]

#### questions.3.ko.q

Q4 규정 단독으로 유일하게 가능한 보기만 있는 구성 해소

> **수정 전:** 루이스가 10월 고급 과정을 들으려면 무엇을 해야 할 것 같은가?

> **수정 후:** 루이스에게 아직 입증되지 않은 수강 요건을 충족할 수 있는 행동은 무엇인가?

#### questions.3.ko.choices

Q4 규정 단독으로 유일하게 가능한 보기만 있는 구성 해소

> **수정 전:** ["짧은 온라인 시험을 마친다","커비에게 다시 승인을 받는다","봄 과정까지 기다린다","기초 과정을 다시 듣는다"]

> **수정 후:** ["온라인 배치 퀴즈를 통과한다","보유한 중급 수료증을 제출한다","관리자의 승인을 제출한다","기초 수료증을 제출한다"]

#### questions.3.explain

Q4 규정 단독으로 유일하게 가능한 보기만 있는 구성 해소

> **수정 전:** 공지는 필요한 수료증이 없으면 언제든 볼 수 있는 30분 온라인 배치 퀴즈를 통과하면 된다고 한다. 기록상 그는 중급 수료증이 없으므로 퀴즈를 봐야 한다. 기초 수료증은 이미 있다.

> **수정 후:** 루이스는 고급 과정을 신청했고 관리자 승인은 이미 받았지만, 기록상 중급은 미수료다. 공지에서 필요한 중급 수료증을 대신할 수 있는 것은 온라인 배치 퀴즈 통과이며 기초 수료증만으로는 고급 요건을 충족하지 못한다.

</details>

<details>
<summary>m-p7-18-15 — 수정 전후</summary>

#### questions.2.q

Q3 마지막 문서의 세 부정 사실 소거를 지연 일수 계산으로 교체

> **수정 전:** Why was money deducted from Tellis Marketing Group's deposit?

> **수정 후:** For how many additional days will Tellis Marketing Group be charged a late fee?

#### questions.2.choices

Q3 마지막 문서의 세 부정 사실 소거를 지연 일수 계산으로 교체

> **수정 전:** ["The equipment needed cleaning.","The equipment was returned after the agreed date.","A microphone set was damaged.","A display stand was missing."]

> **수정 후:** ["One","Two","Three","Four"]

#### questions.2.ko.q

Q3 마지막 문서의 세 부정 사실 소거를 지연 일수 계산으로 교체

> **수정 전:** 텔리스 마케팅 그룹의 보증금에서 돈을 공제한 이유는 무엇인가?

> **수정 후:** 텔리스 마케팅 그룹에는 추가 며칠분의 연체료가 청구되는가?

#### questions.2.ko.choices

Q3 마지막 문서의 세 부정 사실 소거를 지연 일수 계산으로 교체

> **수정 전:** ["장비를 청소해야 했다.","장비를 합의한 날짜 이후에 반납했다.","마이크 세트 하나가 손상되었다.","전시대 하나가 없었다."]

> **수정 후:** ["하루","이틀","사흘","나흘"]

#### questions.2.explain

Q3 마지막 문서의 세 부정 사실 소거를 지연 일수 계산으로 교체

> **수정 전:** 계약서의 합의 반납일은 6월 9일이고 이메일에 따르면 6월 11일 아침에 반납했다. 물품은 깨끗하고 손상·누락이 없었으므로 공제 사유는 연체다.

> **수정 후:** 계약서의 약정 반납은 6월 9일 저녁까지이고 이메일의 실제 반납은 6월 11일 아침이다. 웹페이지는 하루 일부도 하루로 계산하므로 10일 하루와 11일 일부에 대해 이틀분을 청구한다.

#### passages.0.body.2

연장 요금이 $40보다 낮다는 주장이 $45 요금표와 충돌

> **수정 전:** Customers who wish to extend a rental should call us before the original return date. Extensions are charged at the standard daily rate, which is lower than the late fee.

> **수정 후:** Customers who wish to extend a rental should call us before the original return date. Extensions are charged at the standard daily rate.

#### passagesKo.0.body.2

요금 비교 모순 영한 동기화

> **수정 전:** 임대를 연장하려는 고객은 원래 반납일 전에 전화해 주십시오. 연장은 연체료보다 낮은 일반 일일 요금으로 청구됩니다.

> **수정 후:** 임대를 연장하려는 고객은 원래 반납일 전에 전화해 주십시오. 연장은 일반 일일 요금으로 청구됩니다.

</details>

<details>
<summary>m-p7-19-12 — 수정 전후</summary>

#### passagesKo.1.body.1

following week의 기준 시점 오역 정정

> **수정 전:** 켈러먼 로에 있는 저희 물류 센터로 배송할 다음 주문을 접수해 주십시오. 투명 포장 테이프(48mm) 120롤, 무지 배송 라벨 40롤, 테이프 디스펜서 6개입니다. 다음 주에 봄 판촉 행사가 시작되므로 가능하면 3월 25일까지 배송해 주시기 바랍니다.

> **수정 후:** 켈러먼 로에 있는 저희 물류 센터로 배송할 다음 주문을 접수해 주십시오. 투명 포장 테이프(48mm) 120롤, 무지 배송 라벨 40롤, 테이프 디스펜서 6개입니다. 3월 25일이 있는 주의 다음 주에 봄 판촉 행사가 시작되므로 가능하면 3월 25일까지 배송해 주시기 바랍니다.

</details>

<details>
<summary>m-p7-19-14 — 수정 전후</summary>

#### passagesKo.0.body.2

영향의 주체와 대상이 뒤바뀐 번역 정정

> **수정 전:** 관리자와 팀장은 자기 부서를 제외한 모든 부서에 지원자를 추천할 수 있습니다. 이 규정은 팀 내 채용 결정이 보너스 지급에 영향을 받지 않도록 하기 위한 것입니다. 인사팀 직원은 이 제도의 대상이 아닙니다.

> **수정 후:** 관리자와 팀장은 자기 부서를 제외한 모든 부서에 지원자를 추천할 수 있습니다. 이 규정은 보너스 지급이 팀 내 채용 결정에 영향을 미치지 않도록 하기 위한 것입니다. 인사팀 직원은 이 제도의 대상이 아닙니다.

</details>

<details>
<summary>m-p7-20-11 — 수정 전후</summary>

#### questions.2.q

Q3 광고만으로 세 유료 오답 소거하는 구성을 포장 수량 연결로 교체

> **수정 전:** What will Brightwater Legal most likely receive at no charge?

> **수정 후:** How many boxes will be used to pack the cards Ms. Pell is ordering for the three lawyers?

#### questions.2.choices

Q3 광고만으로 세 유료 오답 소거하는 구성을 포장 수량 연결로 교체

> **수정 전:** ["24-hour printing","Delivery to its office","A second box of cards","Help creating a card layout"]

> **수정 후:** ["Two","Three","Four","Six"]

#### questions.2.ko.q

Q3 광고만으로 세 유료 오답 소거하는 구성을 포장 수량 연결로 교체

> **수정 전:** 브라이트워터 법률사무소는 무엇을 무료로 받을 것 같은가?

> **수정 후:** 펠이 변호사 세 명을 위해 주문하는 명함은 상자 몇 개에 담기는가?

#### questions.2.ko.choices

Q3 광고만으로 세 유료 오답 소거하는 구성을 포장 수량 연결로 교체

> **수정 전:** ["24시간 인쇄","사무실 배달","명함 한 상자 추가","명함 배치 디자인 도움"]

> **수정 후:** ["두 개","세 개","네 개","여섯 개"]

#### questions.2.explain

Q3 광고만으로 세 유료 오답 소거하는 구성을 포장 수량 연결로 교체

> **수정 전:** 이메일에서 이번이 첫 주문이라고 하고, 광고는 첫 주문 고객에게 무료 디자인 상담을 준다고 한다. 양면 인쇄도 추가 요금이 없지만 '양면만'은 제공 조건이 아니며, 24시간 서비스는 유료다.

> **수정 후:** 이메일은 변호사 세 명이 각각 500장을 주문한다고 하므로 총 1,500장이다. 광고의 상자당 250장으로 나누면 여섯 상자다.

#### passages.0.body.1

Q4 서로 다른 이름 수량 합산 가격 $115 대안 차단

> **수정 전:** Choose from 500 cards for $45 or 1,000 cards for $70, with printing on one or both sides at no extra charge. Standard orders are ready for collection in two working days. Need them sooner? Our 24-hour service costs an additional $20 per order. Cards are packed in boxes of 250, and finished orders can also be delivered within the city center for a small fee.

> **수정 후:** Choose from 500 cards for $45 or 1,000 cards for $70, with printing on one or both sides at no extra charge. These quantities and prices apply to one name and job title; orders for different names are priced separately. Standard orders are ready for collection in two working days. Need them sooner? Our 24-hour service costs an additional $20 per order. Cards are packed in boxes of 250, and finished orders can also be delivered within the city center for a small fee.

#### passagesKo.0.body.1

이름별 가격 규정 영한 동기화

> **수정 전:** 500장 45달러 또는 1,000장 70달러 중에서 고르실 수 있으며, 단면이든 양면이든 추가 요금이 없습니다. 일반 주문은 영업일 이틀 뒤에 찾아가실 수 있습니다. 더 빨리 필요하세요? 24시간 서비스는 주문당 20달러가 추가됩니다. 명함은 250장씩 상자에 담기며, 완성된 주문은 소액의 요금으로 도심 안에서 배달도 해 드립니다.

> **수정 후:** 500장 45달러 또는 1,000장 70달러 중에서 고르실 수 있으며, 단면이든 양면이든 추가 요금이 없습니다. 이 수량과 가격은 하나의 이름과 직함에 적용되며, 이름이 다른 주문은 따로 가격을 계산합니다. 일반 주문은 영업일 이틀 뒤에 찾아가실 수 있습니다. 더 빨리 필요하세요? 24시간 서비스는 주문당 20달러가 추가됩니다. 명함은 250장씩 상자에 담기며, 완성된 주문은 소액의 요금으로 도심 안에서 배달도 해 드립니다.

#### questions.3.explain

이름별 과금 근거 반영

> **수정 전:** 이메일에서 세 명이 각각 500장이 필요하고 서두르지 않는다고 했으며, 광고에서 500장은 45달러이므로 45×3=135달러다. 155달러는 24시간 서비스 요금을 더한 값이다.

> **수정 후:** 광고의 가격은 이름별로 계산하며 500장은 45달러다. 이메일의 서로 다른 변호사 세 명이 각각 500장씩 일반 서비스를 쓰므로 45×3=135달러이며, 이름이 다른 수량을 1,000장 할인 묶음으로 합산할 수 없다.

#### passagesKo.1.body.2

end of week를 주말 날짜로 좁힌 번역 정정

> **수정 전:** 새 명함에는 첨부한 로고를 넣고 회사 색상인 짙은 녹색과 회색을 써 주시기 바랍니다. 세 변호사의 이름, 직함, 연락처는 이번 주말까지 보내 드리겠습니다. 변호사들의 첫 출근일 전에만 준비되면 되므로 특별히 서두를 필요는 없습니다. 전체 주문을 인쇄하기 전에 견본 명함을 받을 수 있는지도 알려 주십시오.

> **수정 후:** 새 명함에는 첨부한 로고를 넣고 회사 색상인 짙은 녹색과 회색을 써 주시기 바랍니다. 세 변호사의 이름, 직함, 연락처는 이번 주가 끝날 때까지 보내 드리겠습니다. 변호사들의 첫 출근일 전에만 준비되면 되므로 특별히 서두를 필요는 없습니다. 전체 주문을 인쇄하기 전에 견본 명함을 받을 수 있는지도 알려 주십시오.

#### questions.4.explain

발송 시점 번역 동기화

> **수정 전:** 이메일 셋째 문단에서 세 변호사의 이름, 직함, 연락처를 주말까지 보내겠다고 한다. 로고는 이미 첨부했다.

> **수정 후:** 이메일 셋째 문단에서 세 변호사의 이름, 직함, 연락처를 이번 주가 끝날 때까지 보내겠다고 한다. 로고는 이미 첨부했다.

</details>

<details>
<summary>m-p7-20-12 — 수정 전후</summary>

#### questions.2.q

Q3 이메일의 정성 비교만으로 가능한 사유를 두 시간대 합계로 교체

> **수정 전:** Why will the first loading shift start twenty minutes earlier?

> **수정 후:** Using the outbound and return times described in Mr. Ellison's e-mail, how much extra travel time should a driver allow for the two trips combined?

#### questions.2.choices

Q3 이메일의 정성 비교만으로 가능한 사유를 두 시간대 합계로 교체

> **수정 전:** ["The morning journey north will take longer.","The warehouse will open later.","More customers have been added.","The drivers asked for earlier hours."]

> **수정 후:** ["Thirty minutes","Twenty minutes","Ten minutes","Forty minutes"]

#### questions.2.ko.q

Q3 이메일의 정성 비교만으로 가능한 사유를 두 시간대 합계로 교체

> **수정 전:** 첫 상차 근무가 20분 일찍 시작되는 이유는 무엇인가?

> **수정 후:** 엘리슨의 이메일에 나온 출발·복귀 시간대를 기준으로, 기사는 두 번의 운행에 합계 얼마의 추가 이동 시간을 잡아야 하는가?

#### questions.2.ko.choices

Q3 이메일의 정성 비교만으로 가능한 사유를 두 시간대 합계로 교체

> **수정 전:** ["북쪽으로 가는 아침 이동이 더 오래 걸릴 것이다.","창고가 더 늦게 연다.","고객이 더 늘었다.","기사들이 더 이른 근무를 요청했다."]

> **수정 후:** ["30분","20분","10분","40분"]

#### questions.2.explain

Q3 이메일의 정성 비교만으로 가능한 사유를 두 시간대 합계로 교체

> **수정 전:** 이메일에서 첫 배송지는 모두 북부 지역이고 8시까지 도착해야 한다고 하며, 기사는 다리 폐쇄로 아침 출근 시간대에 약 20분이 더 걸린다고 한다. 이메일 자체는 다리나 우회로를 언급하지 않는다.

> **수정 후:** 이메일은 첫 배송 운행이 출근 시간대이고 복귀는 그 시간대가 끝난 뒤라고 명시한다. 기사의 출근 시간대 추가 20분과 그 밖의 시간대 추가 10분을 각각 적용하면 왕복 추가 시간은 30분이다.

#### questions.3.choices.3

Q4 기사 단독 수치 선택을 막는 출근 시간대 경쟁 보기

> **수정 전:** They will start at 8:00 A.M.

> **수정 후:** They will be delayed by about twenty minutes.

#### questions.3.ko.choices.3

경쟁 수치 영한 동기화

> **수정 전:** 오전 8시에 시작할 것이다.

> **수정 후:** 약 20분 늦어질 것이다.

#### passages.1.body.2

왕복 계산에 적용하는 출근 시간대와 그 이후의 구분을 명시

> **수정 전:** From June 16 until further notice, the first loading shift will begin at 6:10 A.M. instead of 6:30 A.M. Please also allow extra time for your return trips, although these happen later in the morning and should be less affected. I have asked the warehouse team to have the morning orders packed the evening before so that you can leave as soon as you arrive. The new loading schedule will be posted on the board by the drivers' room.

> **수정 후:** From June 16 until further notice, the first loading shift will begin at 6:10 A.M. instead of 6:30 A.M. Our outbound journeys take place during the morning rush hour, while the return trips take place after it ends, later in the morning. Please allow extra time for both. I have asked the warehouse team to have the morning orders packed the evening before so that you can leave as soon as you arrive. The new loading schedule will be posted on the board by the drivers' room.

#### passagesKo.1.body.2

왕복 시간대 사실 영한 동기화

> **수정 전:** 6월 16일부터 별도 안내가 있을 때까지 첫 상차 근무는 오전 6시 30분이 아니라 6시 10분에 시작합니다. 돌아오는 길도 시간을 넉넉히 잡아 주세요. 다만 돌아오는 길은 오전 늦게라서 영향이 덜할 겁니다. 도착하자마자 출발할 수 있도록 창고팀에 오전 주문을 전날 저녁에 포장해 달라고 했습니다. 새 상차 일정은 기사 대기실 옆 게시판에 붙여 둘게요.

> **수정 후:** 6월 16일부터 별도 안내가 있을 때까지 첫 상차 근무는 오전 6시 30분이 아니라 6시 10분에 시작합니다. 출발 운행은 아침 출근 시간대에 이루어지고, 복귀 운행은 출근 시간대가 끝난 뒤인 오전 늦게 이루어집니다. 두 운행 모두 시간을 넉넉히 잡아 주세요. 도착하자마자 출발할 수 있도록 창고팀에 오전 주문을 전날 저녁에 포장해 달라고 했습니다. 새 상차 일정은 기사 대기실 옆 게시판에 붙여 둘게요.

#### questions.3.explain

출근 시간 이후라는 직접 사실 반영

> **수정 전:** 이메일은 복귀 운행이 오전 늦게 이루어져 영향이 덜하다고 하고, 기사는 출근 시간대 외에는 약 10분이 늘어난다고 한다.

> **수정 후:** 이메일은 복귀 운행이 아침 출근 시간대가 끝난 뒤 이루어진다고 하고, 기사는 출근 시간대 외에는 약 10분이 늘어난다고 한다. 20분은 출근 시간대의 수치다.

</details>

<details>
<summary>m-p7-20-13 — 수정 전후</summary>

#### passages.1.body.2

판매자에게 고객 출입구 실측값을 요구한 대상 오류 정정

> **수정 전:** The space where the machine will go is 70 cm wide, and the existing outlet is the same one our old dishwasher used, a standard 16-amp kitchen socket. Hot water is already available at that location. If you can, please also send me the dimensions of the delivery entrance, since the machine arrives fully assembled.

> **수정 후:** The space where the machine will go is 70 cm wide, and the existing outlet is the same one our old dishwasher used, a standard 16-amp kitchen socket. Hot water is already available at that location. If you can, please also tell me the minimum entrance width required for delivery, since the machine arrives fully assembled.

#### passagesKo.1.body.2

배송 요구 규격 영한 동기화

> **수정 전:** 기계를 둘 공간은 너비 70cm이고, 기존 콘센트는 예전 식기세척기가 쓰던 일반 16암페어 주방 콘센트입니다. 그 자리에는 이미 온수가 연결되어 있습니다. 기계가 완전히 조립된 상태로 오므로 가능하면 배송 출입구 크기도 보내 주십시오.

> **수정 후:** 기계를 둘 공간은 너비 70cm이고, 기존 콘센트는 예전 식기세척기가 쓰던 일반 16암페어 주방 콘센트입니다. 그 자리에는 이미 온수가 연결되어 있습니다. 기계가 완전히 조립된 상태로 오므로 가능하면 배송에 필요한 최소 출입구 너비도 알려 주십시오.

</details>

<details>
<summary>m-p7-20-14 — 수정 전후</summary>

#### questions.3.q

Q4 이메일의 점심 후·3시 전 조건만으로 유일 출발시각을 고르는 구성을 도착시각 연결로 교체

> **수정 전:** Which shuttle will Mr. Ferreira most likely take back to South Campus?

> **수정 후:** If Mr. Ferreira takes the first North Campus shuttle scheduled to leave after the workshop ends, when should he arrive at South Campus under normal traffic conditions?

#### questions.3.choices

Q4 이메일의 점심 후·3시 전 조건만으로 유일 출발시각을 고르는 구성을 도착시각 연결로 교체

> **수정 전:** ["The 10:00 A.M. bus","The 9:10 A.M. bus","The 4:30 P.M. bus","The 1:15 P.M. bus"]

> **수정 후:** ["9:50 A.M.","10:40 A.M.","5:10 P.M.","1:55 P.M."]

#### questions.3.ko.q

Q4 이메일의 점심 후·3시 전 조건만으로 유일 출발시각을 고르는 구성을 도착시각 연결로 교체

> **수정 전:** 페헤이라는 남부 캠퍼스로 돌아갈 때 어느 셔틀을 탈 것 같은가?

> **수정 후:** 페헤이라가 워크숍 종료 후 북부 캠퍼스에서 출발하는 첫 셔틀을 타면, 교통 상황이 평소와 같을 때 남부 캠퍼스에 언제 도착하는가?

#### questions.3.ko.choices

Q4 이메일의 점심 후·3시 전 조건만으로 유일 출발시각을 고르는 구성을 도착시각 연결로 교체

> **수정 전:** ["오전 10시 버스","오전 9시 10분 버스","오후 4시 30분 버스","오후 1시 15분 버스"]

> **수정 후:** ["오전 9시 50분","오전 10시 40분","오후 5시 10분","오후 1시 55분"]

#### questions.3.explain

Q4 이메일의 점심 후·3시 전 조건만으로 유일 출발시각을 고르는 구성을 도착시각 연결로 교체

> **수정 전:** 워크숍은 12시 30분에 끝나고 그 뒤 점심이며, 그는 점심 후 돌아가 3시 통화를 해야 한다. 북부 캠퍼스 출발 중 점심 후이면서 3시 전에 도착하는 것은 1시 15분 버스(1시 55분 도착)다. 4시 30분 버스는 통화에 늦는다.

> **수정 후:** 안내 이메일의 워크숍 종료는 12시 30분이다. 시간표에서 그 이후 북부 캠퍼스 첫 출발은 1시 15분이고 보통 40분이 걸리므로 1시 55분에 도착한다. 다른 보기는 다른 셔틀의 정상 도착 시각이다.

</details>

<details>
<summary>m-p7-20-15 — 수정 전후</summary>

#### passages.1.body.0

결함 부품 보증과 정상 마모 기록의 불일치 해소

> **수정 전:** Technician's note: Rollers showed normal wear. No signs of damage from unapproved supplies. The customer was advised to clean the paper trays every three months. An invoice for any charges not covered by the warranty will be sent separately. Next recommended preventive check: April.

> **수정 후:** Technician's note: The drive gear was defective and had damaged the feed roller. No signs of damage from unapproved supplies. The customer was advised to clean the paper trays every three months. An invoice for any charges not covered by the warranty will be sent separately. Next recommended preventive check: April.

#### passagesKo.1.body.0

결함 부품 원인 영한 동기화

> **수정 전:** 기술자 메모: 롤러는 정상 마모 상태였음. 승인되지 않은 소모품으로 인한 손상 흔적 없음. 고객에게 3개월마다 용지함을 청소하라고 안내함. 보증으로 보장되지 않는 요금의 청구서는 따로 발송함. 다음 권장 예방 점검: 4월.

> **수정 후:** 기술자 메모: 구동 기어에 결함이 있어 급지 롤러를 손상시켰음. 승인되지 않은 소모품으로 인한 손상 흔적 없음. 고객에게 3개월마다 용지함을 청소하라고 안내함. 보증으로 보장되지 않는 요금의 청구서는 따로 발송함. 다음 권장 예방 점검: 4월.

#### passages.2.body.2

구입 당시 미가입만으로 현재 추가 보장이 없다고 단정하지 않도록 사실 범위 명시

> **수정 전:** I was surprised, however, to receive an invoice for this repair. When we bought the printer, the salesperson told us it came with a two-year warranty, and I assumed that this meant the whole repair would be free. We did not buy any additional plan at the time. Could you please explain the charges? We have used Prisma printers in all three of our branches for several years and have generally been very satisfied with them. If the charge is correct, I would also like to know whether it is still possible to purchase additional coverage for the printer.

> **수정 후:** I was surprised, however, to receive an invoice for this repair. When we bought the printer, the salesperson told us it came with a two-year warranty, and I assumed that this meant the whole repair would be free. We have never purchased any additional plan for this printer. Could you please explain the charges? We have used Prisma printers in all three of our branches for several years and have generally been very satisfied with them. If the charge is correct, I would also like to know whether it is still possible to purchase additional coverage for the printer.

#### passagesKo.2.body.2

추가 플랜 미가입 기간 영한 동기화

> **수정 전:** 그런데 이번 수리에 대한 청구서를 받고 놀랐습니다. 프린터를 살 때 판매 직원이 2년 보증이 있다고 해서 수리 전체가 무료라고 생각했습니다. 당시 추가 플랜은 구입하지 않았습니다. 청구 내역을 설명해 주시겠습니까? 저희는 세 지점 모두에서 몇 년 동안 프리스마 프린터를 써 왔으며 대체로 매우 만족해 왔습니다. 청구가 맞다면 프린터에 추가 보장을 지금도 구입할 수 있는지도 알고 싶습니다.

> **수정 후:** 그런데 이번 수리에 대한 청구서를 받고 놀랐습니다. 프린터를 살 때 판매 직원이 2년 보증이 있다고 해서 수리 전체가 무료라고 생각했습니다. 이 프린터에 추가 플랜을 구입한 적은 없습니다. 청구 내역을 설명해 주시겠습니까? 저희는 세 지점 모두에서 몇 년 동안 프리스마 프린터를 써 왔으며 대체로 매우 만족해 왔습니다. 청구가 맞다면 프린터에 추가 보장을 지금도 구입할 수 있는지도 알고 싶습니다.

</details>

