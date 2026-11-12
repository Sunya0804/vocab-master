# 검토 33차 — m-p5-2 (작성자 F)

- 대상: `docs/mock/m-p5-2.json`, 6~10회 Part 5 150문항. 작성자 B2의 결과를 작성자 F가 검토했다.
- 지시: `docs/tasks/review-33-mock2.md` 끝 추가 지시. 기준: mock-spec, mock-2, exam-spec, exam-p167-spec의 누적 규칙 및 review-13-mock-rc·review-16-recheck·review-19.
- 방법: 150문항 각각에 A~D를 대입(600개 보기), 번역·해설 대조. 수정한 16문항은 네 보기를 다시 대입(64개). 프로그램은 형식·분포·보존·문자열 중복 검사를 담당했고, 정답 유일성은 문장별로 판단했다.
- 결과: **필수 9문항, 경계 해석 예방을 위한 권장 7문항을 직접 수정했다.** 정답 키·ID·test·type·difficulty는 모두 유지했다. 나머지 134문항 객체는 수정 전과 동일하다. 커밋하지 않았다.
- **배포 판단:** 이번 검토에서 확인한 복수답 문제는 수정했으며 정답·형식 기준으로 조립 가능하다. 다만 완전 신규 소재와 실전 난이도까지 충족했다고 판정할 수는 없다. 아래 미반영 권장 사항, 특히 7-12의 기존 문항과의 강한 유사성은 정식 배포 전 보완을 권한다.

## 1. 필수 수정 — 9문항

아래 ID는 `m-p5-` 접두사를 생략했다. 필수는 오답도 자연스러운 문장·상황을 만드는 경우다. 원래 정답이 가장 전형적이라는 사실만으로 다른 보기를 배제하지 않았다.

| ID | 수정 전 문제 | 반영한 수정 | 정답 |
|---|---|---|---|
| 7-19 | cardboard **segments**도 접시 사이에 넣는 골판지 조각으로 성립한다. 기능 명칭 dividers가 더 구체적이어도 segments가 틀린 것은 아니다. | B segments → estimates, 해설 교체 | C dividers |
| 7-24 | **they**가 앞의 our test samples를 받아도 된다. 파란 번호와 초록 라벨을 동시에 붙일 수 있으므로 내용상 모순도 없다. | C they → themselves, 해설 교체 | D theirs |
| 9-19 | store the trays **horizontal**은 트레이를 수평 상태로 보관한다는 보어/상태 해석이 가능하다. 형용사는 동사 뒤에 올 수 없다는 원 해설이 충분하지 않다. | `a ------- oriented storage rack`으로 바꾸어 oriented 수식 자리로 한정. 번역·해설 동반 수정 | B horizontally |
| 9-24 | 타일이 **in installments**로 도착하면서 파손되었을 수도 있다. 뒤의 broken pieces는 배송을 나누어 받았다는 해석을 배제하지 않는다. | `were found to have shattered into -------`로 물리적 파손 결과를 직접 질문. 번역·해설 수정 | D fragments |
| 9-26 | **grips**도 물체를 잡아 고정하는 부품으로 읽혀 공구 없는 탈착과 양립한다. | D grips → vents, 해설 교체 | A clips |
| 10-13 | wants to know **that** the freezer can maintain…는 성능이 보장된다는 사실을 확인하고 싶다는 뜻으로 성립한다. whether와 의미가 달라도 문법 오류가 아니다. | B that → whom, 해설 교체 | D whether |
| 10-21 | **protection housing**은 보호용 하우징이라는 명사+명사 수식이 가능하다. protective가 더 자연스럽다는 연어 선호만으로 유일성이 확보되지 않는다. | B protection → protects, 해설 교체 | A protective |
| 10-22 | 고객이 반송료를 내기 **because**에 회사가 교환품 배송료를 부담한다는 인과 해석도 가능하다. unless도 다른 비용 정책으로 해석할 여지가 있다. | A despite / B instead of / C because of / D but로 변경. 대조 의미 및 절 연결 해설 | D but |
| 10-27 | calls for the wooden dowels **soaked overnight**는 뒤에서 수식하는 과거분사를 포함한 명사구(밤새 담근 촉을 요구)로 성립한다. | C soaked → have soaked. 본문에 by an assistant를 넣어 담기는 수동 관계 명시. 번역·해설 수정 | D to be soaked |

## 2. 권장 경계 수정 — 7문항, 모두 반영

아래는 명백한 복수답 9건과 별도로 센 보수적 예방 수정이다. 덜 전형적인 용법·정책·상품 해석에 의존하므로 원문을 반드시 오답 문항이라고 단정하지 않는다.

| ID | 경계 해석 | 반영한 수정 |
|---|---|---|
| 6-01 | motor runs quiet / quieter처럼 run 뒤에 조용한 작동 상태를 나타내는 용법을 읽을 수 있다. | `The technician ------- tested…while a colleague was on the telephone.`로 동사 앞 부사 자리 명시. 번역·해설 갱신 |
| 6-26 | 두 제품도 하나의 series(제품군)로 판매할 수 있어 series는 수가 둘이라는 이유만으로 배제하기 어렵다. | D series → forecast |
| 7-10 | attach … at/over/by the handle을 위치·경로 표현으로 읽을 여지가 있다. | during / unless / among / to로 교체 |
| 8-10 | whose technical skills were essential은 어떤 사람의 기술이 필요한지 묻는 해석이 가능하다. | C whose → whom |
| 8-21 | collective service는 공동 서비스라는 별도 의미가 가능하다. | C collective → collects |
| 9-15 | keep upright의 keep을 상태 유지의 자동사로 읽을 수 있어, 반드시 목적어가 필요하다는 해설은 과도하다. | C keep → kept, 수동 조동사 구조 해설로 갱신 |
| 9-16 | unless/although/whereas는 문법상 절을 연결하며, 설명되지 않은 정책·대조 상황을 상정하면 다툼이 생긴다. | despite / because / because of / in addition to로 변경 |

## 3. 수정 후 네 보기 재대입 기록

O는 정답, X 뒤는 이 문장에서 배제되는 이유다. 이 표는 수정된 16문항의 추가 64회 대입 결과이며, 나머지 134문항도 수정 전 전수 검토에 포함했다.

| ID | A | B | C | D |
|---|---|---|---|---|
| 6-01 | X 형용사 quiet가 tested 앞 수식 불가 | O quietly | X 명사 quietness | X 비교 형용사 quieter |
| 6-26 | X deposit는 두 솔의 묶음 명칭 아님 | O pair | X pile은 쌓인 무더기로 상호 보완하는 두 제품의 짝과 다름 | X forecast는 예측 |
| 7-10 | X during+handle은 시간 관계 아님 | X unless 뒤 절 없음 | X among+단일 handle 부적합 | O to |
| 7-19 | X pledges는 약속 | X estimates는 추정치 | O dividers | X coupons는 쿠폰 |
| 7-24 | X their 뒤 명사 필요 | X them은 목적격 | X themselves는 여기서 독립 주어 불가 | O theirs |
| 8-10 | O which | X that이 간접의문문에서 skills 한정 불가 | X whom이 skills 한정 불가 | X who가 skills 한정 불가 |
| 8-21 | O collection | X collect는 동사 | X collects는 동사 | X collectively는 명사 service 수식 불가 |
| 9-15 | X must keeping 불가 | X must keeps 불가 | X 수동 be 누락 | O be kept |
| 9-16 | X despite 뒤 완전한 절 불가 | O because | X because of 뒤 완전한 절 불가 | X in addition to 뒤 완전한 절 불가 |
| 9-19 | X horizontal이 oriented를 부사 수식하지 못함 | O horizontally | X horizon은 명사 | X horizons는 복수 명사 |
| 9-24 | X phases는 부서진 조각 아님 | X installments는 분할 지급·공급분 | X columns는 기둥·열 | O fragments |
| 9-26 | O clips | X dials는 조절 손잡이·눈금판 | X gauges는 계측기 | X vents는 통풍구 |
| 10-13 | X which가 맡을 명사 자리 없음 | X whom이 맡을 명사 자리 없음 | X what이 맡을 명사 자리 없음 | O whether |
| 10-21 | O protective | X protects는 동사 | X protect는 동사 | X protectively는 명사를 직접 수식 불가 |
| 10-22 | X despite+완전한 절 불가 | X instead of+완전한 절 불가 | X because of+완전한 절 불가 | O but |
| 10-27 | X soaking은 assistant가 촉을 담그는 수동 의미 아님 | X call for 뒤 bare verb 연결 불가 | X have soaked를 목적어 뒤 정형동사로 연결 불가 | O to be soaked |

## 4. 회차별 검증

| 회차 | 문항 | 난이도 1/2/3 | A/B/C/D | 최대 동일 정답 연속 | vocab/pos/prep-conj/verb/pronoun/relative/comparison |
|---|---:|---|---|---:|---|
| 6 | 30 | 8/13/9 | 7/8/7/8 | 2 | 9/7/5/5/2/1/1 |
| 7 | 30 | 8/13/9 | 8/7/7/8 | 2 | 9/7/5/4/2/2/1 |
| 8 | 30 | 7/14/9 | 7/8/7/8 | 2 | 9/7/5/4/2/2/1 |
| 9 | 30 | 8/13/9 | 8/7/8/7 | 2 | 9/7/5/5/2/1/1 |
| 10 | 30 | 7/14/9 | 7/7/8/8 | 2 | 9/7/5/5/2/1/1 |

- JSON 파싱, 150개 고유 ID, 회차별 01~30 순서, 빈칸 `-------` 정확히 1개, 서로 다른 보기 4개, 정수 answer 0~3, ko/explain 존재 검사 통과.
- 회차별 유형 순서는 모두 다르며, 다섯 회차 모두에서 같은 유형으로 고정된 문항 번호는 없다.
- Part 5는 독립 문항이므로 지문 안 정답 순열 금지의 세트 비율은 적용하지 않았다. 회차별 균형과 4연속 금지는 통과했다.
- 난이도는 **저장된 등급 분포** 검사이며 실제 체감 난이도의 균등함을 보증하지 않는다.
- 원본 대비 16개 객체의 q/choices/ko/explain만 변경. 모든 정답·유형·등급·번호는 보존했다.

## 5. 미반영 권장 사항

### 기존 문항과의 유사성

가장 먼저 바꿀 후보는 **7-12**다. 기존 `questions/toeic-part5.json`의 **p5-363**은 `A collection of ceramic tiles … ------- displayed in the executive dining room.`이고, 새 문항은 `A collection of miniature staircases … ------- displayed in the architect's reception area.`이다. 둘 다 전시물 모음+장소+단수 collection 수일치이며 정답 is도 같다. 단순한 동일 문법 유형을 넘어 문장 뼈대와 상황이 매우 가깝다. 별도 상황의 동사 문항으로 다시 쓰기를 권한다.

다음은 더 약한 유사성이다. 같은 문법·어휘 자체의 재출제를 모두 금지한다는 뜻은 아니다.

- **9-30 / p5-421:** 직원이 stapler로 종이를 고정하는 도구 어휘. 새 문항은 나무 상자에 가격표를 붙이므로 세부 용도는 다르지만 정답 도구와 기능이 같다.
- **8-04 / p5-107:** The series of + 복수 명사 + 단수 동사. 시연 집객과 검사 일정은 다르지만 함정이 같다.
- **10-13 / m-p5-3-09:** wants to know whether + 완전한 가능 여부 절. 상황은 냉동고/촬영으로 다르다.
- **6-13 / p3-062·p6-023:** 원단 swatch를 받아 확인하는 소재가 이미 있다. 새 문항은 촉감 확인, 기존 것은 절단 전 승인·무늬 참고여서 같은 문항이라고 할 정도는 아니다.

검색 범위: 기존 연습 `questions/toeic-part1~7.json` 7개와 모의 1~5회 `docs/mock/m-p*.json` 8개, 합계 15파일. 그중 기존 Part 5 582문항과 문자열 유사도 후보를 대조하고, 전 파트의 관련 소재 핵심어를 검색했다. 새 문제 문장과 기존 영어 문제·본문의 **연속 12단어 일치 0건**이다. 이는 문자 복제 검사이며 의미상 중복 없음의 증거로 삼지 않았다. 기존 15파일 전체를 문항별로 다시 푼 것은 아니므로 검색에 잡히지 않은 소재 중복은 남을 수 있다.

### 파일 내부 반복과 문항 질

- 동일 보기 집합(순서 무시)이 6쌍이다: 6-03/10-01, 6-07/9-28, 6-16/9-07, 7-07/9-12, 7-12/9-08, 7-25/9-25. 인칭대명사 등은 자연스러운 반복이지만, 특히 **7-25/9-25**는 stable 보어 구분까지 같다.
- **6-06/9-20**은 translucent/opaque와 빛 투과 정의가 서로 뒤집힌 형태다. **7-15/9-28**도 고르지 않은 바닥에서 개별 다리·받침발 조절 소재가 가깝다.
- 소매·제조·수리 업무 맥락이 충분한 반면, 제품 부품·재질·물성 설명이 지배적이다. 채용·출장·회계·고객 조율 등의 상황을 늘리면 회차 체감이 다양해진다.
- 난이도 3 중 **6-12, 7-12, 8-18, 9-26** 등은 단순 시점·수일치·도구 지식만으로 쉽게 소거된다. **6-06, 6-17, 7-11, 9-20**은 문장 안에 어휘 정의가 그대로 있다. 등급 수만 맞추기보다 일부 문항 자체를 어렵게 다시 쓰는 편이 낫다.
- **6-21** free of charge는 실질적으로 고정 어휘 결합이다. prep-conj로 저장돼 있으나 전치사·접속사 자체를 고르는 문제는 아니다. 엄격한 유형 비중을 원하면 진짜 전치사 문항으로 바꾸기를 권한다.
- 9-16·10-22의 예방 수정으로 절/명사구 구분만으로도 풀 수 있게 됐다. 정답 유일성을 우선했으며, 향후 난이도를 올릴 때 접속사를 다시 넣는다면 네 문장의 정책·인과·대조 해석을 다시 검토해야 한다.

## 6. 저장 확인

- 원본 SHA-256: `e19bf4fab0fc0c6b7428fb8ab38167036c50a28985e500661267d02fe3d3f770`
- 수정본 SHA-256: `de5938b5de8b80a60687099c0ef5f61368e876997d050ca1007fdef110edc36e`
- 공유 폴더의 문제 JSON과 이 보고서에 직접 저장했다. 앱 배포나 모의고사 조립은 실행하지 않았다.
