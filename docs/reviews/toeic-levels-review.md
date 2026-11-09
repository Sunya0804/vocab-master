# 토익 난이도 분류표 리뷰

검토일: 2026-11-09  
판정: **부분 수정 후 사용. 특히 Lv4·Lv5는 전체 재검토 권고.**

이 문서는 직전 B 리뷰 결과를 보존한 기록이다. 분류 기준은 [토익 레벨 작업 지시의 기준 절](../tasks/toeic-levels-map.md)이며, 패키지에 수록된 한국어 뜻을 기준으로 판정했다. 난이도는 리뷰어 판단이며 1단계 경계에는 판단 여지가 있다. 아래 수치와 ‘현재’ 값은 최초 리뷰 시점의 스냅샷이다. 이후 분류표를 수정하더라도 이 최초 리뷰 수치는 소급 변경하지 않는다.

## 검토 대상과 표본

- [토익 패키지](../../packages/toeic.json): 4,132개.
- [난이도 분류표](../toeic-levels.json): 키 4,132개. 누락 0, 추가 키 0, 범위 밖 또는 정수가 아닌 레벨 0.
- 각 레벨의 키를 JavaScript 기본 `sort()`로 정렬한 뒤, 고정 시드 `20261109`의 LCG와 Fisher–Yates로 섞어 앞 30개를 비복원 추출했다. 난수 상태는 Lv1부터 Lv5까지 이어 쓴다. 표본은 총 150개이며 교체하지 않았다.
- ‘일치’는 리뷰어 제안 레벨과 정확히 같은 경우이다. 레벨별 동일 개수의 층화 표본이므로 전체 4,132개의 정확도로 직접 해석하지 않는다.

원본 SHA-256:

| 파일 | SHA-256 |
|---|---|
| packages/toeic.json | `6085204029a813d19b811ad30bdb3a424d9427e6a37515fdfee9a963c08d5755` |
| docs/toeic-levels.json | `2206edbe77668496f9dbcd61c201ec356868260f886881d2cf09a4ea9da22a06` |

## 표본 결과

| 레벨 | 전체 개수 (비중) | 표본 일치 | 1단계 차이 | 2단계 이상 차이 |
|---|---:|---:|---:|---:|
| 1 | 344 (8.3%) | 28/30 (93.3%) | 1 | 1 |
| 2 | 1,130 (27.3%) | 23/30 (76.7%) | 7 | 0 |
| 3 | 1,286 (31.1%) | 14/30 (46.7%) | 15 | 1 |
| 4 | 894 (21.6%) | 14/30 (46.7%) | 13 | 3 |
| 5 | 478 (11.6%) | 12/30 (40.0%) | 5 | 13 |
| 합계 | 4,132 (100%) | **91/150 (60.7%)** | **41** | **18 (12.0%)** |

±1단계까지 포함하면 132/150, **88.0%**이다. Lv5 표본에서는 13/30개(43.3%)가 2단계 이상 하향 대상으로 판단되었다.

## 2단계 이상 차이가 있는 표본 전체 목록

| 단어 | 현재 | 제안 | 판단 근거 |
|---|---:|---:|---|
| second | 1 | 3 | 수록 뜻은 서수가 아닌 동사 ‘찬성하다, 지지하다’이다. |
| scare | 3 | 1 | ‘겁주다’라는 기초 일상어이다. |
| boast | 4 | 2 | 일반적인 ‘자랑하다’이다. |
| storage compartment | 4 | 2 | 기본 사물·수납 공간 표현이다. |
| overhead rack | 4 | 2 | 교통·여행의 기본 사물 표현이다. |
| replenish | 5 | 3 | 재고·물품 보충 업무어이다. |
| stylishly | 5 | 2 | 일상적인 외양·방식 표현이다. |
| insecurely | 5 | 3 | 의미가 투명한 상태 부사이다. |
| commemorate | 5 | 3 | 행사·기념 관련 중급어이다. |
| unforeseen | 5 | 3 | 예상하지 못한 상황을 나타내는 중급어이다. |
| in commemoration of | 5 | 3 | 기념행사 관련 표현이다. |
| justly | 5 | 3 | ‘공정하게’라는 비교적 투명한 의미이다. |
| reclaim | 5 | 3 | 수록 뜻이 ‘분실물을 되찾다’이다. |
| versatile | 5 | 3 | 능력·제품 활용성을 설명하는 중급어이다. |
| sequel | 5 | 3 | 영화·출판의 일반적인 ‘속편’이다. |
| unveil | 5 | 3 | 발표·공개 관련 중급어이다. |
| remit | 5 | 3 | 송금·납부 관련 업무어이다. |
| rebound | 5 | 3 | 경기·실적 회복을 나타내는 중급어이다. |

## 전체 분류표에서 확인한 패턴

1. **상위 레벨 과대 배정 후보.** Lv5 표본의 13/30개가 2단계 이상 하향 대상이다. 위 18개만 고치고 끝내기보다 Lv4·Lv5 전체를 다시 검토하는 편이 좋다.
2. **파생형과 수록 의미 점검 필요.** `stylish 4 → stylishly 5`, `insecure 4 → insecurely 5`, `right 1 → rightly 4`처럼 파생형에 높은 레벨을 준 사례가 있다. 부사형이라는 이유만으로 희귀 어휘로 판단하지 않는다. `second`는 익숙한 표제어보다 실제 수록 뜻(찬성하다, 지지하다)을 기준으로 판단해야 한다.
3. **기초 비중 부족.** 레벨별 비중은 8.3/27.3/31.1/21.6/11.6%이다. 목표 20/25/30/17/8%를 강제할 필요는 없지만, 표본의 과대 배정 결과와 함께 재점검할 근거가 된다.
4. **숙어 일괄 배정 징후는 발견하지 못했다.** 공백을 포함한 여러 단어 표현은 Lv1~5에 102/551/560/246/50개로 분산되어 있다. 이는 구조상 공백 포함 표현의 집계이며, 모두 관용적 숙어라는 뜻은 아니다.
5. **알파벳 순서에 따른 일괄 배정 징후는 발견하지 못했다.** 알파벳순 위치와 레벨의 Pearson 상관은 약 0.046이다. 알파벳 정렬 기준 가장 긴 동일 레벨 연속 구간은 8개이다. 이 수치만으로 모든 형태의 편향이 없다고 단정하지는 않는다.
6. **구조적 무결성은 통과했다.** 전체 표제어의 키와 레벨 범위가 유효하다. 구조 검증 통과와 의미상 난이도 적합성은 별개이다.

## OpenCode 적용 규칙

### 1. 명시적 수정 목록을 최우선으로 적용

아래 JSON은 2단계 이상 차이가 있는 18개 표본의 기계 적용 목록이다. `en`은 소문자 키이다. 현재 값이 `expected`와 같으면 `target`으로 바꾸고, 이미 `target`이면 건너뛴다. 둘 다 아니거나 키가 없으면 기존 후속 변경을 덮어쓰지 말고 재검토 목록으로 남긴다. 값만 수정하고 키·레벨 이름·패키지 순서는 유지한다.

```json
[
  {
    "en": "second",
    "expected": 1,
    "target": 3
  },
  {
    "en": "scare",
    "expected": 3,
    "target": 1
  },
  {
    "en": "boast",
    "expected": 4,
    "target": 2
  },
  {
    "en": "storage compartment",
    "expected": 4,
    "target": 2
  },
  {
    "en": "overhead rack",
    "expected": 4,
    "target": 2
  },
  {
    "en": "replenish",
    "expected": 5,
    "target": 3
  },
  {
    "en": "stylishly",
    "expected": 5,
    "target": 2
  },
  {
    "en": "insecurely",
    "expected": 5,
    "target": 3
  },
  {
    "en": "commemorate",
    "expected": 5,
    "target": 3
  },
  {
    "en": "unforeseen",
    "expected": 5,
    "target": 3
  },
  {
    "en": "in commemoration of",
    "expected": 5,
    "target": 3
  },
  {
    "en": "justly",
    "expected": 5,
    "target": 3
  },
  {
    "en": "reclaim",
    "expected": 5,
    "target": 3
  },
  {
    "en": "versatile",
    "expected": 5,
    "target": 3
  },
  {
    "en": "sequel",
    "expected": 5,
    "target": 3
  },
  {
    "en": "unveil",
    "expected": 5,
    "target": 3
  },
  {
    "en": "remit",
    "expected": 5,
    "target": 3
  },
  {
    "en": "rebound",
    "expected": 5,
    "target": 3
  }
]
```

적용 결과에서 `scare`는 1, `boast/storage compartment/overhead rack/stylishly`는 2, 나머지 13개는 3이 된다. 수록 뜻이 ‘찬성하다, 지지하다’인 `second`도 3이다.

### 2. 기초 일상어의 추가 하향 제안

아래는 표본에서 2→1로 제안한 7개이다. 1단계 차이 항목으로, 위 18개의 우선 수정과 구분한다. 기존 값 2가 유지되어 있다면 1로 조정하는 제안이다.

```json
["talented", "endless", "first step", "enjoyable", "up to", "gently", "pass by"]
```

표본 150개 전체의 ‘현재/제안’은 부록에 있어 나머지 1단계 차이도 기계적으로 추출할 수 있다.

### 3. 파생 부사의 상한 규칙은 의미가 확인된 쌍에 적용

규칙은 `부사 레벨 <= 기준형 레벨 + 1`이다. 현재 원본에서 의미 연관성을 확인한 다음 두 쌍에 한해 기계적으로 적용할 수 있다.

```json
[
  {"en":"rightly","base":"right","expected":4,"expectedBase":1,"target":2},
  {"en":"repeatedly","base":"repeat","expected":3,"expectedBase":1,"target":2}
]
```

이 목록은 표본 외 패턴의 수정안(`rightly`)과 표본의 1단계 차이(`repeatedly`)를 구체화한 것이다. 최초 표본 결과 91/150 및 18개 목록에는 추가 합산하지 않는다. 현재 값과 기준형 값이 각각 기대값과 일치할 때 적용하며, 1번의 명시적 수정값이 있으면 그것을 우선한다.

새 후보는 접미사만 잘라 기준형을 확정하지 말고, 실제 기준형 키가 존재하며 수록 의미가 연결되는지 먼저 확인한다. 이를 확인한 후보에서 `부사 > 기준형 + 1`이면 검토 대상으로 표시한다. `fine`이 ‘벌금’인 경우의 `finely`, `express`가 ‘표현하다’인 경우의 `expressly`처럼 수록 의미가 달라지는 쌍에는 이 상한을 바로 적용하지 않는다. `stylish/insecure`는 기준형 자체가 높게 책정된 후보라서 이 상한만으로 해결되지 않는다. `stylishly/insecurely`는 1번의 명시적 수정값을 적용하고 기준형은 별도로 재검토한다.

### 4. 여러 단어 표현과 목표 비율

- 공백 포함 여부나 단어 수를 레벨 결정 규칙으로 사용하지 않는다. 표본의 `storage compartment/overhead rack`는 2, `in commemoration of`는 3으로 명시적 목록을 적용한다.
- 공백 포함 표현의 레벨별 비중은 편향 탐지 지표로만 쓰고, 한 레벨로 일괄 배정하지 않는다.
- 목표 비율은 진단 지표로만 쓴다. 비율에 맞추기 위한 임의 승급·강등은 하지 않는다.
- 표본에서 유지된 항목도 전체 레벨의 정답 목록으로 확대 해석하지 않는다. Lv4·Lv5는 의미와 사용 맥락을 기준으로 전체 재검토한다.

### 5. 후속 검증

수정 담당자는 4,132개 전체 키의 누락·추가와 1~5 정수 여부를 다시 확인한다. 표제어 수가 달라졌다면 최신 패키지 집합으로 비교한다. 명시적 수정 목록의 적용/이미 적용/기대값 불일치 건수를 보고하고, 전체 레벨별 개수·비중과 대표 사례도 함께 확인한다. 새 평가는 별도 결과로 기록하며 이 최초 리뷰의 표본 일치율을 사후 수정하지 않는다.

이 문서 저장 작업은 분류표와 패키지를 수정하지 않는다. 실제 분류표 수정은 총괄이 OpenCode에 배분한다.

## 부록: 150개 표본 전체 판정

현재 및 제안은 최초 검토 스냅샷이다. 0단계 차이 91개, 1단계 차이 41개, 2단계 이상 차이 18개이다.

| 번호 | 단어 | 수록 뜻 | 현재 | 제안 | 판정 |
|---|---|---|---:|---:|---|
| 1 | bus stop | 버스 정류장 | 1 | 1 | 일치 |
| 2 | shower | 소나기 | 1 | 1 | 일치 |
| 3 | at the moment | 지금 | 1 | 1 | 일치 |
| 4 | adventure | 모험 | 1 | 1 | 일치 |
| 5 | second | 찬성하다, 지지하다 | 1 | 3 | 2단계 이상 |
| 6 | single | 단 하나의 | 1 | 1 | 일치 |
| 7 | celebration | 축하 | 1 | 1 | 일치 |
| 8 | beach | 해변 | 1 | 1 | 일치 |
| 9 | plus | ~을 더한, ~을 더하여 | 1 | 1 | 일치 |
| 10 | anymore | 이제는, 더 이상은 | 1 | 1 | 일치 |
| 11 | bring | 가져오다 | 1 | 1 | 일치 |
| 12 | perhaps | 아마, 어쩌면 | 1 | 1 | 일치 |
| 13 | if possible | 가능하다면 | 1 | 1 | 일치 |
| 14 | take a vacation | 휴가를 얻다 | 1 | 1 | 일치 |
| 15 | make a mistake | 실수하다 | 1 | 1 | 일치 |
| 16 | take a walk | 산책하다 | 1 | 1 | 일치 |
| 17 | sidewalk | 보도 | 1 | 1 | 일치 |
| 18 | beginning | 시작; 초기의 | 1 | 1 | 일치 |
| 19 | airport | 공항 | 1 | 1 | 일치 |
| 20 | useful | 유용한 | 1 | 1 | 일치 |
| 21 | confirm | 확인하다 | 1 | 2 | 1단계 차이 |
| 22 | take a photograph | 사진을 찍다 | 1 | 1 | 일치 |
| 23 | try on | (옷 따위를) 입어 보다 | 1 | 1 | 일치 |
| 24 | friendly | 친절한 | 1 | 1 | 일치 |
| 25 | owner | 주인, 소유주 | 1 | 1 | 일치 |
| 26 | product | 생산품 | 1 | 1 | 일치 |
| 27 | a glass of | ~ 한 잔 | 1 | 1 | 일치 |
| 28 | vote | 투표하다; 투표 | 1 | 1 | 일치 |
| 29 | cereal | 시리얼 | 1 | 1 | 일치 |
| 30 | next to | ~ 옆에 | 1 | 1 | 일치 |
| 31 | journal | 신문, 잡지, 일지 | 2 | 2 | 일치 |
| 32 | butcher's shop | 정육점 | 2 | 2 | 일치 |
| 33 | talented | 유능한, 재능이 있는 | 2 | 1 | 1단계 차이 |
| 34 | overtime hours | 초과 근무 시간 | 2 | 2 | 일치 |
| 35 | endless | 끝이 없는, 영원히 계속하는 | 2 | 1 | 1단계 차이 |
| 36 | crash | (주가의) 폭락, 추락, 충돌 | 2 | 2 | 일치 |
| 37 | by check | 수표로 | 2 | 2 | 일치 |
| 38 | city official | 시 공무원 | 2 | 2 | 일치 |
| 39 | first step | 첫 단계 | 2 | 1 | 1단계 차이 |
| 40 | outstanding | 뛰어난; 미지불된 | 2 | 2 | 일치 |
| 41 | steering wheel | 핸들 | 2 | 2 | 일치 |
| 42 | notify | 통지하다 | 2 | 2 | 일치 |
| 43 | enjoyable | 재미있는, 즐거운 | 2 | 1 | 1단계 차이 |
| 44 | bank teller | 은행 출납원 | 2 | 2 | 일치 |
| 45 | gallery | 화랑, 미술관 | 2 | 2 | 일치 |
| 46 | up to | ~까지 | 2 | 1 | 1단계 차이 |
| 47 | take action | 조치를 취하다 | 2 | 2 | 일치 |
| 48 | audience | 청중, 관객 | 2 | 2 | 일치 |
| 49 | take down | ~을 적다, 내리다 | 2 | 2 | 일치 |
| 50 | report a problem | 문제점을 보고하다 | 2 | 2 | 일치 |
| 51 | customer survey | 고객 설문 조사 | 2 | 2 | 일치 |
| 52 | gently | 다정하게, 부드럽게 | 2 | 1 | 1단계 차이 |
| 53 | pass by | 지나가다 | 2 | 1 | 1단계 차이 |
| 54 | arrange the furniture | 가구를 배치하다 | 2 | 2 | 일치 |
| 55 | go over | ~을 다시 읽어보다, 복습하다 | 2 | 2 | 일치 |
| 56 | latest | 최신의 | 2 | 2 | 일치 |
| 57 | agent | 대리인 | 2 | 2 | 일치 |
| 58 | sign up for | ~에 등록하다, 신청하다 | 2 | 2 | 일치 |
| 59 | tree trunk | 나무 줄기 | 2 | 2 | 일치 |
| 60 | minimum | 최소한도; 최소한의 | 2 | 2 | 일치 |
| 61 | be held up in traffic | 교통 체증에 걸리다 | 3 | 3 | 일치 |
| 62 | urgently | 급히 | 3 | 3 | 일치 |
| 63 | commuter | 통근자 | 3 | 2 | 1단계 차이 |
| 64 | reset | (기계를) 다시 맞추다 | 3 | 2 | 1단계 차이 |
| 65 | rental agreement | 임대 계약서 | 3 | 2 | 1단계 차이 |
| 66 | forwarding address | (우편물의) 전송 주소 | 3 | 3 | 일치 |
| 67 | fluently | 유창하게 | 3 | 2 | 1단계 차이 |
| 68 | separation | 분리, 구분 | 3 | 3 | 일치 |
| 69 | preview | 예고편, 시사회 | 3 | 2 | 1단계 차이 |
| 70 | statistics | 통계학 | 3 | 3 | 일치 |
| 71 | converse | 대화하다 | 3 | 3 | 일치 |
| 72 | mow the lawn | 잔디를 깎다 | 3 | 2 | 1단계 차이 |
| 73 | draft | 초안을 작성하다; 초안 | 3 | 3 | 일치 |
| 74 | chairperson | 의장 | 3 | 2 | 1단계 차이 |
| 75 | medical facility | 의료시설 | 3 | 2 | 1단계 차이 |
| 76 | take steps | 조치를 취하다 | 3 | 3 | 일치 |
| 77 | be anxious to do | 몹시 ~하고 싶다 | 3 | 3 | 일치 |
| 78 | call for | ~을 요구하다, ~을 가지러 들르다 | 3 | 3 | 일치 |
| 79 | on a regular basis | 정기적으로 | 3 | 3 | 일치 |
| 80 | lighthouse | 등대 | 3 | 2 | 1단계 차이 |
| 81 | parade | 퍼레이드, 행렬 | 3 | 2 | 1단계 차이 |
| 82 | achiever | 크게 성공한 사람 | 3 | 3 | 일치 |
| 83 | handwritten | 손으로 쓴 | 3 | 2 | 1단계 차이 |
| 84 | carry-on baggage | 기내 휴대 수하물 | 3 | 2 | 1단계 차이 |
| 85 | newcomer | 새로온 사람, 신입사원 | 3 | 2 | 1단계 차이 |
| 86 | scare | 겁주다 | 3 | 1 | 2단계 이상 |
| 87 | recruit | 채용하다 | 3 | 3 | 일치 |
| 88 | repeatedly | 되풀이하여, 여러 차례 | 3 | 2 | 1단계 차이 |
| 89 | crop | 농작물, 산출량 | 3 | 2 | 1단계 차이 |
| 90 | deliberately | 고의로, 신중하게 | 3 | 3 | 일치 |
| 91 | boast | 자랑하다 | 4 | 2 | 2단계 이상 |
| 92 | offset | 상쇄하다, 벌충하다 | 4 | 4 | 일치 |
| 93 | impressively | 인상적으로, 인상 깊게 | 4 | 3 | 1단계 차이 |
| 94 | storage compartment | 짐 싣는 곳 | 4 | 2 | 2단계 이상 |
| 95 | presumably | 아마, 생각건대 | 4 | 3 | 1단계 차이 |
| 96 | vocation | 직업, 천직, 사명감 | 4 | 4 | 일치 |
| 97 | utilization | 이용, 활용 | 4 | 3 | 1단계 차이 |
| 98 | all walks of life | 모든 계층 | 4 | 4 | 일치 |
| 99 | be towed away | (차가) 견인되다 | 4 | 3 | 1단계 차이 |
| 100 | recommendable | 추천할 수 있는 | 4 | 4 | 일치 |
| 101 | restoration | 복원, 복구 | 4 | 3 | 1단계 차이 |
| 102 | overhead rack | (머리 위의 짐 넣는) 선반 | 4 | 2 | 2단계 이상 |
| 103 | entrust a with b | A에게 B의 책임을 맡기다 | 4 | 4 | 일치 |
| 104 | variable | 변하기 쉬운, 변덕스러운 | 4 | 3 | 1단계 차이 |
| 105 | sarcastic | 풍자적인, 빈정거리는 | 4 | 4 | 일치 |
| 106 | barter | 물물 교환하다; 물물 교환 | 4 | 4 | 일치 |
| 107 | squeaky | 삐걱대는 | 4 | 4 | 일치 |
| 108 | undergraduate | 대학생 | 4 | 3 | 1단계 차이 |
| 109 | hazardous | 위험한 | 4 | 3 | 1단계 차이 |
| 110 | segment | 부분, 조각 | 4 | 3 | 1단계 차이 |
| 111 | on edge | 흥분하여, 안절부절못하여 | 4 | 4 | 일치 |
| 112 | unfavorable | 불리한, 호의적이지 않은 | 4 | 3 | 1단계 차이 |
| 113 | run the risk of | ~의 위험을 무릅쓰다 | 4 | 4 | 일치 |
| 114 | gourmet | 미식가 | 4 | 4 | 일치 |
| 115 | hammering | 쿵쾅거리는 | 4 | 3 | 1단계 차이 |
| 116 | deploy | 배치하다 | 4 | 4 | 일치 |
| 117 | unbeatable | (가격·가치 등이) 더 이상 좋을 수 없는 | 4 | 3 | 1단계 차이 |
| 118 | on the spot | 현장에, 즉시 | 4 | 3 | 1단계 차이 |
| 119 | counteroffer | 수정 제안, 대안 | 4 | 4 | 일치 |
| 120 | nightfall | 해질녘 | 4 | 4 | 일치 |
| 121 | succinct | 간결한 | 5 | 5 | 일치 |
| 122 | replenish | 다시 채우다, 보충하다 | 5 | 3 | 2단계 이상 |
| 123 | disparately | 본질적으로 다르게 | 5 | 5 | 일치 |
| 124 | stylishly | 현대식으로, 유행에 따르게 | 5 | 2 | 2단계 이상 |
| 125 | yearn | 열망하다 | 5 | 5 | 일치 |
| 126 | insecurely | 불안하여 | 5 | 3 | 2단계 이상 |
| 127 | entail | ~을 수반하다, ~을 유발하다 | 5 | 4 | 1단계 차이 |
| 128 | rapport | 친밀한 관계 | 5 | 4 | 1단계 차이 |
| 129 | reach unanimous agreement | 만장일치로 합의하다 | 5 | 4 | 1단계 차이 |
| 130 | infusion | 주입, 혼합 | 5 | 5 | 일치 |
| 131 | stringently | 엄격히, 엄중하게 | 5 | 5 | 일치 |
| 132 | inconclusively | 결론 없이, 요점 없이 | 5 | 5 | 일치 |
| 133 | commemorate | 기념하다 | 5 | 3 | 2단계 이상 |
| 134 | incumbent | 현직의 | 5 | 5 | 일치 |
| 135 | unforeseen | 예상하지 못한 | 5 | 3 | 2단계 이상 |
| 136 | in commemoration of | ~을 기념하여 | 5 | 3 | 2단계 이상 |
| 137 | discerning | 통찰력이 있는 | 5 | 5 | 일치 |
| 138 | justly | 공정하게 | 5 | 3 | 2단계 이상 |
| 139 | reclaim | (분실물을) 되찾다 | 5 | 3 | 2단계 이상 |
| 140 | versatile | 다재다능한 | 5 | 3 | 2단계 이상 |
| 141 | sequel | 속편, 결과 | 5 | 3 | 2단계 이상 |
| 142 | bilateral | 쌍방의 | 5 | 5 | 일치 |
| 143 | redemption | 구원, 구함 | 5 | 5 | 일치 |
| 144 | rugged | 울퉁불퉁한 | 5 | 4 | 1단계 차이 |
| 145 | practitioner | 전문의 | 5 | 5 | 일치 |
| 146 | unveil | 밝히다 | 5 | 3 | 2단계 이상 |
| 147 | remit | 송금하다, 면제해 주다 | 5 | 3 | 2단계 이상 |
| 148 | impartially | 공명정대하게, 치우치지 않게 | 5 | 4 | 1단계 차이 |
| 149 | rebound | 회복; 다시 일어서다 | 5 | 3 | 2단계 이상 |
| 150 | confiscate | 압수하다, 몰수하다 | 5 | 5 | 일치 |

## 부록: 표본 추출 재현 코드

최초 원본 해시와 일치하는 데이터로 실행해야 같은 표본이 나온다. 아래 코드는 읽기 전용이며 레벨별 30개 키를 출력한다.

```js
const { map } = require('./docs/toeic-levels.json');
let seed = 20261109;
function rand() {
  seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
  return seed / 4294967296;
}
for (let level = 1; level <= 5; level += 1) {
  const pool = Object.keys(map).filter(en => map[en] === level).sort();
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  console.log(level, pool.slice(0, 30));
}
```


## 재검증 (2026-11-09)

**판정: 추가 수정 필요.** 기존 명시적 수정 27건은 모두 반영됐지만, 최신 토익 5,804개와 분류표의 키 집합이 맞지 않는다 (누락 **1,676개**, 추가 **4개**). 새 표본의 정확 일치율은 **45/100 = 45.0%**, 2단계 이상 차이는 **12/100 = 12.0%**로 상위 레벨 과대 배정도 남아 있다.

기준: `docs/tasks/data-reverify.md`, `docs/tasks/opencode-data-fixes.md`, `docs/tasks/toeic-levels-map.md`의 토익 학습자 기준. 이 절만 추가했으며 기존 리뷰의 표본·일치율·현재 값은 보존했다. 데이터 파일은 수정하지 않았다.

### 검증 도중 바뀐 토익 원본과 최신 기준

처음 읽었을 때 토익은 4,132개, SHA-256 `6085204029a813d19b811ad30bdb3a424d9427e6a37515fdfee9a963c08d5755`였다. 검토 도중 다른 작업으로 5,804개(5필드 항목) 원본이 저장돼 다시 읽었다. 아래 결과와 최종 표본은 **최신 원본** 기준이며 처음 뽑았던 중간 표본은 사용하지 않았다.

| 파일 | 최종 재검증 SHA-256 |
| --- | --- |
| packages/toeic.json | 386c6349f7da44b8e36c2e64ddf502e46ee7185c7a5e25c54fe15fe7b2efd5b4 |
| docs/toeic-levels.json | 895836823c0bc40c194620f87cc41573d2a004f46ffd5532e7d1dc828aaeb4e7 |

| 검사 | 결과 |
| --- | --- |
| 최신 토익 항목 / 고유 소문자 표제어 | 5804 / 5804 |
| 분류표 전체 키 / 최신 토익과 공통 키 | 4132 / 4128 |
| 누락 키 / 불필요한 추가 키 | 1676 / 4 |
| 1~5 정수 밖의 값 / JSON 중복 키 | 0 / 0 |

직접 실행한 수정 지시서의 키 비교 명령 출력:

```text
5804 1676 4
{ '1': 351, '2': 1129, '3': 1603, '4': 753, '5': 296 }
```

### 기존 명시적 수정과 기계적 규칙

2단계 이상 수정 18건, 추가 2→1 제안 7건, 의미를 확인한 부사 쌍 2건을 현재 값과 대조했다. **27/27건 일치**, 불일치·누락 0건이다. 실행 로그 없이 적용/이미 적용을 구분하지 않으며, 현재 기대값 일치를 확인한 결과다.

| 단어 | 요청 레벨 | 현재 레벨 | 반영 |
| --- | --- | --- | --- |
| second | 3 | 3 | 일치 |
| scare | 1 | 1 | 일치 |
| boast | 2 | 2 | 일치 |
| storage compartment | 2 | 2 | 일치 |
| overhead rack | 2 | 2 | 일치 |
| replenish | 3 | 3 | 일치 |
| stylishly | 2 | 2 | 일치 |
| insecurely | 3 | 3 | 일치 |
| commemorate | 3 | 3 | 일치 |
| unforeseen | 3 | 3 | 일치 |
| in commemoration of | 3 | 3 | 일치 |
| justly | 3 | 3 | 일치 |
| reclaim | 3 | 3 | 일치 |
| versatile | 3 | 3 | 일치 |
| sequel | 3 | 3 | 일치 |
| unveil | 3 | 3 | 일치 |
| remit | 3 | 3 | 일치 |
| rebound | 3 | 3 | 일치 |
| talented | 1 | 1 | 일치 |
| endless | 1 | 1 | 일치 |
| first step | 1 | 1 | 일치 |
| enjoyable | 1 | 1 | 일치 |
| up to | 1 | 1 | 일치 |
| gently | 1 | 1 | 일치 |
| pass by | 1 | 1 | 일치 |
| rightly | 2 | 2 | 일치 |
| repeatedly | 2 | 2 | 일치 |

`right=1, rightly=2`, `repeat=1, repeatedly=2`이므로 두 확인된 부사 쌍의 `부사 ≤ 기준형+1` 규칙도 충족한다. 접미사만 잘라 전체 부사를 일괄 하향하는 검사는 하지 않았다.

### 분포 변화와 해석

| 레벨 | 최초 리뷰 개수 | 현재 분류표 개수 | 변화 | 현재 비중 |
| --- | --- | --- | --- | --- |
| 1 | 344 | 351 | 7 | 8.49% |
| 2 | 1130 | 1129 | -1 | 27.32% |
| 3 | 1286 | 1603 | 317 | 38.79% |
| 4 | 894 | 753 | -141 | 18.22% |
| 5 | 478 | 296 | -182 | 7.16% |

Lv4+Lv5는 1,372→1,049개로 323개 줄었다. 이는 분포의 감소를 확인한 것이며 이전 상위 레벨의 모든 항목을 실제로 재검토했는지 증명하는 실행 기록은 아니다. 현재 분포는 미분류 1,676개를 포함하지 않는 4,132개 키의 분포다. 목표 비율에 맞추기 위한 임의 재배정은 권하지 않는다.

### 새 무작위 표본 100개

현재 분류표와 최신 토익의 **공통 키** 중, 기존 150개 표본을 제외하고 비복원 추출했다. 시드 `vocab-master-data-reverify-2026-11-09:toeic-levels`로 Python `random.Random`을 한 번 만들고 Lv1부터 Lv5까지 난수 상태를 이어 사용했다. 각 레벨의 소문자 키를 정렬한 뒤 `sorted(rng.sample(pool, n))`을 취했다. 배분은 **5/5/40/30/20**, 즉 Lv3~5가 90개다. 최초 리뷰 150개 표본과 겹치는 항목은 0개다. 구버전을 읽어 뽑았던 중간 표본은 최종 통계에 합산하지 않고 최신 뜻과 새 추출 결과로 다시 판정했다.

정확 일치는 제안 레벨과 현재 레벨이 같은 경우다. 1단계 차이는 경계 검토 의견으로 구분하고 2단계 이상은 우선 수정 목록으로 제시했다. 수록된 한국어 뜻을 중심으로 판단했고, 최신 예문은 다의어의 문맥을 확인하는 보조 자료로 읽었다. 빈출도 실측이나 공인 레벨 판정이 아니라 지시서에 따른 리뷰어 판단이다.

| 현재 레벨 | 표본 | 정확 일치 | 일치율 | 1단계 차이 | 2단계 이상 |
| --- | --- | --- | --- | --- | --- |
| 1 | 5 | 5 | 100.0% | 0 | 0 |
| 2 | 5 | 5 | 100.0% | 0 | 0 |
| 3 | 40 | 22 | 55.0% | 18 | 0 |
| 4 | 30 | 8 | 26.7% | 15 | 7 |
| 5 | 20 | 5 | 25.0% | 10 | 5 |
| 합계 | 100 | 45 | 45.0% | 43 | 12 |

±1단계 허용 시 **88/100 = 88.0%**다. 상위 레벨을 중심으로 뽑고 이전 표본도 제외했으므로, 최초 150개 표본의 60.7%와 직접 비교해 개선·악화 폭으로 해석하지 않는다. 미분류 단어는 추출 대상 밖이므로 이 일치율은 전체 5,804개의 적용 가능성이나 정확도도 아니다.

### 추가 수정 필요 목록

1. **키 집합부터 동기화:** 다음 4개는 최신 원본에서 표제어가 교정된 사례다. 구형 키를 제거하고 신형 키를 추가하되, 옛 레벨을 무조건 복사하지 말고 현재 뜻을 보고 결정한다.

| 불필요한 구형 키 | 현재 원본의 신형 키 | 상태 |
| --- | --- | --- |
| claim refund | claim a refund | 구형 키 존재 / 신형 키 누락 |
| put a rush | put a rush on | 구형 키 존재 / 신형 키 누락 |
| set down to work | get down to work | 구형 키 존재 / 신형 키 누락 |
| take an action against | take action against | 구형 키 존재 / 신형 키 누락 |

2. **누락 1,676개 모두 분류:** 신형 키 4개와 그 밖의 1,672개가 포함된다. 원본 키를 삭제해 누락 수를 줄이지 말고 최신 토익 집합 전체를 분류해야 한다. 아래는 정렬된 누락 키 전체 목록이다.

<details><summary>누락 키 전체 1,676개 (JSON)</summary>

```json
[
  "a maximum of",
  "abolish",
  "abridge",
  "abrupt",
  "absence",
  "absentee vote",
  "absorb",
  "abstract",
  "absurd",
  "abundance",
  "academic",
  "accent",
  "accentuate",
  "acceptable",
  "access",
  "acclaim",
  "acclaimed",
  "accomplished",
  "account for",
  "accountable",
  "accurately",
  "accusation",
  "accustom",
  "achievement",
  "acquaint",
  "acquisition",
  "act as",
  "activation",
  "activity",
  "actual",
  "acutely",
  "additive",
  "adequate",
  "adhesive",
  "adjoining",
  "adjourn",
  "adjust",
  "adjustable",
  "adjustment",
  "administration",
  "admirably",
  "admiring",
  "admission",
  "admit",
  "admittance",
  "admittedly",
  "advance",
  "advantage",
  "advantageous",
  "advertisement",
  "advisable",
  "advise",
  "aesthetically",
  "aesthetics",
  "affiliate",
  "afford",
  "afraid",
  "against",
  "agency",
  "agitate",
  "agree",
  "agreement",
  "agriculture",
  "aid",
  "aim",
  "alarm",
  "alien",
  "align",
  "all the time",
  "allege",
  "alleviate",
  "alliance",
  "alongside",
  "alter",
  "altercate",
  "alternate route",
  "alumni",
  "alumnus",
  "amazing",
  "ambulance",
  "amendment",
  "amid",
  "amount",
  "amphitheater",
  "amplifier",
  "amusement",
  "amusing",
  "analyze",
  "anchor",
  "ancient",
  "anecdote",
  "announce",
  "announcement",
  "annual",
  "annual leave policy",
  "annually",
  "annulment",
  "anxious",
  "apartment",
  "apologize",
  "apparent",
  "appeal",
  "appeal to",
  "appearance",
  "appendix",
  "appetite",
  "applicable",
  "apply",
  "appraise",
  "appreciate",
  "apprehensive",
  "approach",
  "appropriate",
  "approval",
  "approximate",
  "argue",
  "arise",
  "arithmetic",
  "arrange",
  "arrival",
  "artisan",
  "artwork",
  "as though",
  "ashamed",
  "aspect",
  "aspiring",
  "assent",
  "assert",
  "assertiveness",
  "asset",
  "associate",
  "associated",
  "association",
  "assumption",
  "assurance",
  "assured",
  "assuredly",
  "astronomy",
  "at last",
  "at one's convenience",
  "at one's discretion",
  "at your earliest convenience",
  "atmosphere",
  "attach",
  "attachment",
  "attend",
  "attendance",
  "attention",
  "attentive",
  "attentive to",
  "attentiveness",
  "attest",
  "attitude",
  "attract",
  "attraction",
  "attractive",
  "attribute",
  "auction",
  "authority",
  "autobiography",
  "autograph",
  "automaker",
  "automate",
  "automated",
  "average",
  "avid",
  "award",
  "aware",
  "awful",
  "bag",
  "bald",
  "ballroom",
  "ban",
  "banner",
  "barbershop",
  "bark",
  "bass",
  "be about to do",
  "be comprised of",
  "be convinced of",
  "be due to do",
  "be eager to do",
  "be outfitted with",
  "be willing to",
  "bear in mind",
  "bearer",
  "beforehand",
  "believe",
  "belong",
  "belt loop",
  "beneficial",
  "beside",
  "beverage",
  "beyond one's control",
  "bill",
  "billion",
  "bin",
  "biodegradable",
  "biography",
  "blame",
  "blimp",
  "block",
  "bloom",
  "blue-chip",
  "board",
  "board up",
  "bonanza",
  "bond",
  "book",
  "bottling machine",
  "bottom",
  "brake",
  "breakable",
  "breakdown",
  "breathe",
  "breathtaking",
  "breathtakingly",
  "breed",
  "bribery",
  "brief",
  "brief a on b",
  "briefly",
  "broad",
  "broadband",
  "browse",
  "bruise",
  "bud",
  "bumpy",
  "burden",
  "bureau",
  "burglar",
  "burst",
  "bury",
  "buyout",
  "calculate",
  "calibrate",
  "callback",
  "campaign",
  "campground",
  "canceled",
  "candid",
  "capability",
  "capable",
  "car dealership",
  "cardholder",
  "care",
  "carefully",
  "carpenter",
  "carry-on items",
  "carton",
  "carve",
  "cash",
  "categorize",
  "celebrity",
  "cell",
  "cement",
  "ceramic",
  "certain",
  "certification",
  "changeable",
  "chaperone",
  "chapter",
  "charm",
  "cheer",
  "cherish",
  "chief",
  "chief operating officer",
  "cholesterol",
  "chronicle",
  "circuit",
  "cityscape",
  "claim a refund",
  "clarify",
  "clarity",
  "classical",
  "classically",
  "classify",
  "cleaning solution",
  "clearance",
  "clipping",
  "close",
  "closely",
  "closet",
  "cloud",
  "co-host",
  "coalition",
  "coastal",
  "coincide",
  "coincide with",
  "collar",
  "collect",
  "collection",
  "collective",
  "combine",
  "come by",
  "committee",
  "commodity",
  "commonly",
  "communal",
  "communication",
  "community",
  "company retreat",
  "comparable",
  "compare",
  "compatible",
  "compensation",
  "compete",
  "competition",
  "compile",
  "complaint",
  "complement",
  "compliance",
  "complication",
  "component",
  "composer",
  "compost",
  "comprehend",
  "compromise",
  "compulsory",
  "concentrate",
  "concept",
  "concern",
  "conciliatory",
  "conclusion",
  "concretely",
  "conduct",
  "conductor",
  "confectioner",
  "confidence",
  "confirmation",
  "conflict",
  "conform",
  "confuse",
  "congestion",
  "congregate",
  "congress",
  "connoisseur",
  "conquer",
  "conquest",
  "conscious",
  "consciousness",
  "conscription",
  "consensus",
  "consent",
  "consequence",
  "conservative",
  "conserve",
  "consider",
  "considerable",
  "consistency",
  "consistently",
  "consolidation",
  "conspire",
  "constantly",
  "constructive",
  "construe",
  "contact",
  "contain",
  "container",
  "contamination",
  "contemporary",
  "contempt",
  "continental",
  "contingent",
  "continual",
  "contractor",
  "contribute to",
  "contribution",
  "contributor",
  "convenience",
  "convert",
  "conviction",
  "convince",
  "convinced",
  "cook",
  "cooperate",
  "cooperation",
  "core",
  "corporate",
  "corporation",
  "corresponding",
  "corrosion",
  "cost overrun",
  "court",
  "courtesy",
  "coverage",
  "coward",
  "cramped",
  "credibility",
  "credibly",
  "criminal",
  "crisp",
  "critical",
  "critically",
  "critique",
  "cross",
  "crossing",
  "crowded",
  "crush",
  "culminate",
  "cultivate",
  "cultural",
  "curator",
  "curbside",
  "curfew",
  "curiosity",
  "current",
  "curtail",
  "custody",
  "customized",
  "damage",
  "damaged",
  "damages",
  "daunting",
  "deadlock",
  "deadly",
  "deaf",
  "deal",
  "dealership",
  "debris",
  "debut",
  "decay",
  "deceased",
  "deceitful",
  "deceive",
  "decent",
  "decision",
  "decision-maker",
  "decisively",
  "declare",
  "dedicate",
  "dedicated",
  "deed",
  "deem",
  "deepen",
  "defection",
  "defend",
  "defer",
  "define",
  "define a as b",
  "definitely",
  "defy",
  "degree",
  "dehydrate",
  "delicatessen",
  "delineate",
  "delinquent",
  "deliver",
  "demand",
  "demonstration",
  "denial",
  "dense",
  "density",
  "dent",
  "dental",
  "depart",
  "department",
  "dependent",
  "deplete",
  "derive",
  "descend",
  "descendant",
  "description",
  "destination",
  "destroy",
  "detach",
  "detect",
  "deteriorative",
  "determined",
  "detour",
  "detrimental",
  "develop",
  "device",
  "diagnosis",
  "differ",
  "difficulty",
  "dig",
  "diligent",
  "dim",
  "dime",
  "diplomacy",
  "dire",
  "directions",
  "director",
  "directory",
  "disappoint",
  "disappointed",
  "disaster",
  "discharge",
  "disclaimer",
  "disclose",
  "discreetly",
  "discretion",
  "discretionary",
  "discuss",
  "discussion",
  "disgusting",
  "dismay",
  "dismiss",
  "disposable",
  "dispose",
  "dispute",
  "disreputable",
  "dissertation",
  "distinct",
  "distinctive",
  "distraught",
  "distributed",
  "distribution",
  "district",
  "disturb",
  "divert",
  "divide",
  "division",
  "doctoral",
  "documentation",
  "domain",
  "donation",
  "doubt",
  "downplay",
  "downtown",
  "dramatic",
  "dramatically",
  "drape",
  "drastically",
  "draw",
  "dreadful",
  "dreadfully",
  "drought",
  "due",
  "dull",
  "dumb",
  "duplicate",
  "duplication",
  "durability",
  "duration",
  "dustpan",
  "dusty",
  "duty",
  "dye",
  "dynamite",
  "earn",
  "earnest",
  "earnings",
  "eccentricity",
  "ecological",
  "ecology",
  "economize",
  "ecosystem",
  "effectiveness",
  "efficiently",
  "elaborate details",
  "electrical cord",
  "electricity",
  "elegant",
  "element",
  "embassy",
  "embezzle",
  "emerge",
  "emergency",
  "emission",
  "emphasis",
  "employee retention",
  "employer",
  "employment",
  "enact",
  "encase",
  "enclosed",
  "encourage",
  "encrusted",
  "encryption",
  "end up with",
  "endangered",
  "enforcement",
  "engineer",
  "enlarge",
  "enrich",
  "enrollment",
  "enter a raffle",
  "enter into a contract",
  "entertainment",
  "entrance",
  "entrant",
  "entrepreneur",
  "entrust",
  "entry",
  "entry-level",
  "entrée",
  "environment",
  "environmentally friendly",
  "envision",
  "envy",
  "episode",
  "equal",
  "equator",
  "ergonomic",
  "erode",
  "escalate",
  "espionage",
  "essential",
  "establish",
  "estimation",
  "eternal",
  "evaluation",
  "even",
  "evenly",
  "eventual",
  "eventually",
  "evidence",
  "evident",
  "exam",
  "examine",
  "exasperate",
  "exception",
  "exceptional",
  "excessive",
  "exclusion",
  "exclusively",
  "execute",
  "exemption",
  "exert",
  "exhaust",
  "exhausted",
  "exhaustive",
  "exhibition",
  "existing",
  "exotic",
  "expect",
  "expendable",
  "expense",
  "experience",
  "expiration",
  "explain",
  "explicitly",
  "explode",
  "exploit",
  "explore",
  "exponentially",
  "expose",
  "extension cord",
  "extent",
  "extravagant",
  "exude",
  "fabric",
  "face",
  "face-to-face",
  "fairly",
  "faith",
  "fall into disrepair",
  "fall off",
  "familiar",
  "familiarity",
  "fan",
  "fare",
  "farm",
  "fascinating",
  "fast-paced",
  "fate",
  "fatigue",
  "favorably",
  "fear",
  "feasibility",
  "ferocity",
  "fiber optic cable",
  "fiction",
  "fierce",
  "fill up",
  "finalist",
  "financial",
  "financing",
  "firecracker",
  "fitting",
  "flame",
  "flashlight",
  "flavor",
  "flavorful",
  "flaw",
  "fleet",
  "flick",
  "flier",
  "flip",
  "flooding",
  "floral arrangement",
  "flour",
  "foam",
  "follow",
  "food critic",
  "food station",
  "foothill",
  "foothold",
  "force",
  "forcefully",
  "foresee",
  "forgetful",
  "forgettable",
  "forgiveness",
  "form",
  "formula",
  "forum",
  "foster",
  "found",
  "foundation",
  "frank",
  "fraud",
  "free of",
  "freelance",
  "freeway",
  "frequent",
  "freshman",
  "freshness",
  "fright",
  "frigid",
  "frisbee",
  "frost",
  "frozen",
  "fruitful",
  "frustrated",
  "fuel",
  "fulfillment",
  "function",
  "functional",
  "fundraiser",
  "fundraising",
  "funny",
  "furnace",
  "furnished",
  "fuss",
  "gala",
  "gas",
  "generalization",
  "generalize",
  "geologist",
  "get around",
  "get down to work",
  "get to work",
  "getaway",
  "given",
  "glacier",
  "glance",
  "gleaming",
  "gloomy",
  "glory",
  "glow",
  "glue",
  "good",
  "gorgeous",
  "gradually",
  "graduate",
  "gratify",
  "gratifyingly",
  "gratitude",
  "gravity",
  "greasy",
  "greed",
  "greeter",
  "grinding noise",
  "grossly",
  "growth",
  "guarantee",
  "habitat",
  "hairnet",
  "handle",
  "handy",
  "hardware store",
  "harnessing",
  "hassle",
  "hatred",
  "head back to",
  "head out",
  "headhunting",
  "health-conscious",
  "heat up",
  "heed",
  "heir",
  "herd",
  "hereby",
  "hiatus",
  "high-profile",
  "high-rise",
  "highest priority",
  "hire",
  "hoarse",
  "holder",
  "holdup",
  "honor",
  "horizontal",
  "horrendous",
  "horseplay",
  "hospitable",
  "hospitality",
  "host",
  "hostile",
  "housing",
  "hug",
  "hypothesis",
  "ideal",
  "identify",
  "idle",
  "ill-equipped",
  "illustrate",
  "imaginary",
  "imaginative",
  "imagine",
  "imbalance",
  "imitation",
  "immediately",
  "impatient",
  "implausible",
  "implication",
  "imply",
  "impose",
  "impressed",
  "impression",
  "imprint",
  "improve",
  "improvement",
  "improvise",
  "in common",
  "in consultation with",
  "in honor of",
  "in no time",
  "in numerical order",
  "in the company of",
  "in the interim",
  "in violation of",
  "in-house",
  "inaccuracy",
  "inarticulate",
  "inauguration",
  "inception",
  "include",
  "inconceivable",
  "inconvenience",
  "indentation",
  "independent",
  "independently",
  "indistinctly",
  "individually",
  "indoor",
  "industry",
  "inefficient",
  "inevitability",
  "inexperienced",
  "infant",
  "infectious",
  "inferior",
  "inflation",
  "influence",
  "inform",
  "infraction",
  "infrequently",
  "ingenious",
  "inherently",
  "initially",
  "injure",
  "inland",
  "innate",
  "inner-city",
  "inquire",
  "inquisitive",
  "insect",
  "insect repellent",
  "insider",
  "insightful",
  "inspection",
  "inspiration",
  "inspire",
  "inspiring",
  "installment",
  "instantly",
  "instruct",
  "instructive",
  "insubordinate",
  "integral",
  "intelligence",
  "intelligent",
  "intensely",
  "interaction",
  "intercom",
  "interest",
  "interior",
  "interoffice",
  "interpersonal",
  "interpret",
  "intersection",
  "interview",
  "interviewee",
  "intolerable",
  "introduce",
  "introductory",
  "intrusive",
  "invent",
  "invest",
  "investment",
  "irrelevant",
  "irritate",
  "isolation",
  "janitorial",
  "job",
  "job placement",
  "judgment",
  "junior",
  "jury",
  "keep to",
  "keep up with",
  "kiosk",
  "kit",
  "kneel down",
  "labor",
  "lack",
  "lakeshore",
  "land",
  "language",
  "largely",
  "late payment",
  "latter",
  "laundry",
  "lax",
  "layout",
  "lazy",
  "lead",
  "leadership",
  "leak",
  "leave",
  "lecture",
  "legislation",
  "lessen",
  "letterhead",
  "liable",
  "liaison",
  "liberate",
  "license",
  "lifeguard",
  "lifetime",
  "light",
  "likelihood",
  "limb",
  "limited",
  "linger",
  "liquor",
  "litigation",
  "live",
  "loaf",
  "loan",
  "local",
  "locate",
  "located",
  "location",
  "lock",
  "lodge",
  "lonely",
  "long",
  "long-awaited",
  "long-haul",
  "long-standing",
  "lottery",
  "lower",
  "loyal",
  "luggage",
  "lure",
  "lust",
  "magistrate",
  "magnificent",
  "mailer",
  "make good use of",
  "make one's way to",
  "makeover",
  "male",
  "malfunction",
  "manage",
  "managerial",
  "mandate",
  "manipulate",
  "manual",
  "manufacturer",
  "manuscript",
  "markedly",
  "martial arts",
  "mass",
  "masterpiece",
  "mastery",
  "material",
  "materially",
  "mature",
  "mean",
  "measure",
  "mechanic",
  "mediator",
  "medical",
  "medical practice",
  "meeting",
  "melt",
  "memorandum",
  "memorize",
  "mental",
  "mention",
  "mercy",
  "method",
  "microorganism",
  "migration",
  "mind",
  "minimize",
  "misdirect",
  "mishap",
  "misplace",
  "missing",
  "mode",
  "moderately",
  "modernize",
  "momentary",
  "monopoly",
  "mop",
  "mortgage",
  "mosquito",
  "mount",
  "move",
  "mud",
  "multiple",
  "mute",
  "mutually",
  "narrow",
  "narrow down",
  "nasty",
  "naturally",
  "naughty",
  "neglect",
  "neighborhood",
  "nervous",
  "news outlet",
  "nickel",
  "nightly",
  "no more than",
  "noble",
  "nominee",
  "noncommittal",
  "normally",
  "notice",
  "notification",
  "novel",
  "nowadays",
  "numerous",
  "nutrition",
  "object",
  "observation",
  "observe",
  "obstruct",
  "obstruction",
  "occasionally",
  "occupancy",
  "odds",
  "odometer",
  "odor",
  "of one's choice",
  "official",
  "offspring",
  "omit",
  "on a case-by-case basis",
  "on a first-come, first-served basis",
  "on a large scale",
  "on a monthly basis",
  "one-on-one",
  "opening",
  "openness",
  "operation",
  "oppression",
  "oppressive",
  "optical",
  "oratorical",
  "organization",
  "organize",
  "out of medicine",
  "outer",
  "outfit",
  "outgoing",
  "outgrow",
  "outing",
  "outline",
  "outspoken",
  "oven",
  "overhead bin",
  "overhear",
  "override",
  "overtake",
  "overtime",
  "overturn",
  "overview",
  "overwhelmingly",
  "ownership",
  "oxygen",
  "oyster",
  "paid time off",
  "pain",
  "painful",
  "pale",
  "palm",
  "paralegal",
  "pardon",
  "park ranger",
  "particle",
  "particular",
  "particularly",
  "pass a on to b",
  "passenger",
  "passive",
  "pastor",
  "patented",
  "patience",
  "patient",
  "patronage",
  "payable",
  "payment",
  "peninsula",
  "penny",
  "percentage",
  "perennial",
  "perfectly",
  "performance",
  "perfume",
  "period",
  "periodic",
  "perishable",
  "permanent",
  "permit",
  "persist",
  "persistence",
  "personal",
  "personality",
  "pertain",
  "petitioner",
  "pharmaceutical",
  "phase",
  "phenomenal",
  "photograph",
  "photography",
  "physician",
  "pillow",
  "pitch",
  "pitcher",
  "place",
  "place emphasis on",
  "placid",
  "plain",
  "plainly",
  "plaintiff",
  "plantar",
  "plaster",
  "plastic",
  "play a role as",
  "playwright",
  "pleasant",
  "plot",
  "plumbing",
  "plummet",
  "podium",
  "poison",
  "policy",
  "pollute",
  "popular",
  "popularity",
  "population",
  "portion",
  "pose a risk",
  "postmark",
  "postsecondary",
  "potential",
  "poverty",
  "power failure",
  "power outage",
  "power outlet",
  "praise",
  "precision",
  "preconditioned",
  "predict",
  "prefer",
  "preferential",
  "premature",
  "premier",
  "premium",
  "preparation",
  "prescription",
  "preselect",
  "preside",
  "presume",
  "pretty",
  "prevent",
  "prevention",
  "price",
  "primary",
  "prime",
  "priority",
  "proactive",
  "probable",
  "probably",
  "proceed with",
  "proceedings",
  "process",
  "procession",
  "proclaim",
  "procrastinate",
  "produce",
  "production",
  "productive",
  "proficiency",
  "profile",
  "profit",
  "progress",
  "project",
  "prominence",
  "prominently",
  "promising",
  "promptly",
  "promptly at",
  "properly",
  "propose",
  "proprietary",
  "proscription",
  "prosecute",
  "prosecution",
  "prospect",
  "prosperous",
  "proudly",
  "provide",
  "proximity",
  "pruning",
  "public relations",
  "publicist",
  "publicize",
  "punish",
  "pure",
  "purify",
  "purpose",
  "pursuant",
  "put a rush on",
  "put together",
  "qualify",
  "quality",
  "queue",
  "quicken",
  "quite a",
  "quote",
  "radiator",
  "radius",
  "rage",
  "railing",
  "raise",
  "rapidly",
  "rapids",
  "rate",
  "rating",
  "rave",
  "re-energize",
  "reach into",
  "react",
  "realistic",
  "realistically",
  "reassurance",
  "receive and route",
  "recently",
  "reception",
  "recklessness",
  "recognize",
  "recommend",
  "reconvene",
  "record-breaking",
  "recovery",
  "recreational",
  "rectangle",
  "rectangular",
  "rectify",
  "recurrent",
  "reduction",
  "redundant",
  "refinish",
  "refrain",
  "refreshments",
  "refrigeration",
  "refuse",
  "regain",
  "regard",
  "register",
  "regret",
  "regular",
  "regularly",
  "regulatory",
  "rehearse",
  "reject",
  "relate",
  "relative",
  "relatively",
  "relaxed",
  "release",
  "reliability",
  "reliable",
  "relief",
  "relieve",
  "relieved",
  "reluctantly",
  "remain",
  "remarkable",
  "remind",
  "removal",
  "renew",
  "renounce",
  "renovation",
  "reorganize",
  "repair",
  "reparation",
  "repay",
  "repetition",
  "replace",
  "replacement",
  "represent",
  "repression",
  "repudiation",
  "repute",
  "request",
  "rescue",
  "reside",
  "residence",
  "resignation",
  "resistance",
  "resistant",
  "resistant to",
  "resolve",
  "resounding",
  "resource",
  "respectable",
  "responsibility",
  "rest",
  "restless",
  "restock",
  "restrict",
  "restrictively",
  "restroom",
  "restructuring",
  "result",
  "resurface",
  "resurfacing",
  "retailer",
  "retaliation",
  "retire",
  "retroactive",
  "reveal",
  "reverend",
  "review",
  "revitalize",
  "revolutionary",
  "revolutionize",
  "reward",
  "richly",
  "rid",
  "ridge",
  "rim",
  "roam",
  "room",
  "roomy",
  "root",
  "roster",
  "rot",
  "row",
  "rsvp",
  "ruin",
  "run",
  "run through",
  "run-through",
  "rust",
  "sacrifice",
  "sales associate",
  "sanction",
  "sanitation",
  "satellite",
  "satisfaction",
  "satisfy",
  "scam",
  "scandal",
  "scar",
  "scary",
  "scent",
  "schooling",
  "scooter",
  "scope",
  "seam",
  "seasonal",
  "seating",
  "secure",
  "securely",
  "security",
  "seductive",
  "seek",
  "seize",
  "select",
  "selection",
  "selfish",
  "sell",
  "semiconductor",
  "sensitive",
  "separate",
  "serious",
  "seriously",
  "set apart",
  "settle in",
  "settlement",
  "sever",
  "severely",
  "shaft",
  "shatter",
  "shave",
  "shelving unit",
  "shift",
  "shock-resistant",
  "shortcoming",
  "shorten",
  "shortly thereafter",
  "shrewd",
  "shutter",
  "shy",
  "siege",
  "signal",
  "simplification",
  "simply",
  "simultaneously",
  "sin",
  "sink",
  "skeptical",
  "skewed",
  "skilled",
  "sleek",
  "slightly",
  "slowing",
  "smash",
  "smooth",
  "snap",
  "soak",
  "soap dispenser",
  "soar",
  "sober",
  "sociable",
  "socialize",
  "soil",
  "sole",
  "solution",
  "sonic",
  "soothe",
  "sophisticated",
  "sound",
  "southbound",
  "sow",
  "spark",
  "specialization",
  "specify",
  "speculation",
  "spillage",
  "spin-off",
  "spread out",
  "square",
  "stage",
  "stagnant",
  "stair",
  "stand out against",
  "stare",
  "start-up",
  "starve",
  "statement",
  "statue",
  "stay",
  "steadily",
  "steel",
  "step into",
  "stir",
  "stitch",
  "storage",
  "story",
  "straight",
  "strain",
  "stranger",
  "strategy",
  "stray",
  "strictly",
  "stringent",
  "stub",
  "stuck in traffic",
  "stunned",
  "stunning",
  "sturdy",
  "subject",
  "subscribe",
  "subsequently",
  "substance",
  "substantially",
  "substitute",
  "subtle",
  "subtotal",
  "successive",
  "suddenness",
  "sufficiently",
  "suggestion",
  "suited",
  "sum",
  "superb",
  "superconductor",
  "superior",
  "supervise",
  "supplementary",
  "supply",
  "support",
  "surcharge",
  "sure thing",
  "surpass",
  "survive",
  "susceptible",
  "suspense",
  "swear",
  "sweep",
  "symptom",
  "synchronization",
  "table saw",
  "tackle",
  "tactic",
  "tad",
  "take action against",
  "take advantage of",
  "take inventory of",
  "take out",
  "take up",
  "tale",
  "tardiness",
  "tardy",
  "target",
  "team building",
  "teenage",
  "temporarily",
  "temptation",
  "tendency",
  "tension",
  "terrible",
  "terror",
  "the third year in a row",
  "theatergoer",
  "theatrical",
  "theory",
  "therapy",
  "thesis",
  "thigh",
  "thoroughly",
  "thoughtful",
  "thrive",
  "thumb",
  "ticket",
  "tighten",
  "time off",
  "time slot",
  "timely",
  "tissue",
  "to and from",
  "to be fair",
  "toe-tapping",
  "token",
  "tolerantly",
  "tolerate",
  "top-notch",
  "tourist",
  "tournament",
  "track",
  "tradition",
  "tragedy",
  "trailer",
  "trait",
  "transatlantic flight",
  "transform",
  "transmission",
  "transport",
  "transportation",
  "tray",
  "treadmill",
  "treatment",
  "trend",
  "troubleshooter",
  "troubleshooting",
  "troublesome",
  "turn",
  "tutorial",
  "twist",
  "typically",
  "ultimate",
  "unbearable",
  "uncomfortable",
  "uncomfortably",
  "underhanded",
  "understanding",
  "understated",
  "undertaking",
  "undesirable",
  "undue",
  "unease",
  "uneasy",
  "unemployed",
  "uneven",
  "unexpected",
  "unify",
  "union",
  "universal",
  "unlimited",
  "unoccupied",
  "unrivaled",
  "unstable",
  "unveiling",
  "up for sale",
  "up-and-coming",
  "upholster",
  "upholstery",
  "upon receipt of",
  "upright",
  "upward",
  "urge",
  "usage",
  "use caution",
  "use-by date",
  "used to",
  "usefulness",
  "utilities",
  "utility",
  "utter",
  "vaccinate",
  "vacuum",
  "valley",
  "vandalize",
  "variation",
  "variety",
  "various",
  "veil",
  "vent",
  "ventilate",
  "verification",
  "vertical",
  "vet",
  "viable",
  "vibration",
  "vicious",
  "viciously",
  "vital",
  "voluntary",
  "vulnerable",
  "wage",
  "waist",
  "wallet",
  "wane",
  "warning",
  "waste",
  "wastepaper",
  "wave",
  "weak",
  "weed",
  "welcome",
  "well ahead of time",
  "whereabouts",
  "whistle",
  "wide-scale",
  "widely",
  "widely publicized",
  "widen",
  "width",
  "willingness",
  "wind",
  "winning",
  "wireless charger",
  "wit",
  "with regard to",
  "wool",
  "work one's way up",
  "world-renowned",
  "worldwide",
  "worth",
  "worthwhile",
  "worthy",
  "wrist",
  "youth"
]
```

</details>

3. **새 표본의 2단계 이상 과대 배정 우선 수정:** 아래 현재 값과 일치할 때 제안 값을 적용하는 방식으로 후속 작업이 가능하다. 현재 값이 달라졌으면 덮어쓰지 말고 다시 검토한다.

| 단어 | 수록 뜻 | 현재 | 제안 | 차이 | 판단 근거 |
| --- | --- | --- | --- | --- | --- |
| blackout | 정전 | 4 | 2 | 2 | 수록 뜻은 기억 상실·정보 차단이 아닌 일상 시설 상황 정전 |
| give way to | ~에게 양보하다 | 4 | 2 | 2 | 수록 뜻과 예문은 보행자에게 양보하는 기본 교통 표현 |
| have control over | ~을 제어하다 | 4 | 2 | 2 | 무엇을 제어·통제한다는 기본 업무 표현 |
| have little chance of -ing | -할 확률이 적다 | 4 | 2 | 2 | 가능성이 낮음을 말하는 투명한 기본 표현 |
| lace | 끈; 끈을 묶다 | 4 | 2 | 2 | 수록 뜻은 끈·끈 묶기라는 기본 사물·행동 의미 |
| lamppost | 가로등 기둥 | 4 | 2 | 2 | 사진·거리의 기본 사물 명사 |
| reinstall | 재설치하다 | 4 | 2 | 2 | 재설치라는 일상적인 기본 사무·컴퓨터 동작 |
| flourish | 번창하다, 융성하다 | 5 | 3 | 2 | 사업의 번창이라는 중급 경제·업무 동사 |
| illegible | 읽기 어려운 | 5 | 3 | 2 | 문서·필체를 읽기 어렵다는 중급 사무 표현 |
| in observance of | ~을 기념하여 | 5 | 3 | 2 | 기념일·휴무 안내의 중급 표현; 기존 in commemoration of→3과 일관 |
| prop against | ~에 받쳐 놓다 | 5 | 3 | 2 | 사다리 등을 벽에 받쳐 두는 중급 사물 배치 표현 |
| restraint | 억제, 금지 | 5 | 3 | 2 | 억제·금지라는 중급 추상 명사 |

```json
[
  {
    "en": "blackout",
    "expected": 4,
    "target": 2
  },
  {
    "en": "give way to",
    "expected": 4,
    "target": 2
  },
  {
    "en": "have control over",
    "expected": 4,
    "target": 2
  },
  {
    "en": "have little chance of -ing",
    "expected": 4,
    "target": 2
  },
  {
    "en": "lace",
    "expected": 4,
    "target": 2
  },
  {
    "en": "lamppost",
    "expected": 4,
    "target": 2
  },
  {
    "en": "reinstall",
    "expected": 4,
    "target": 2
  },
  {
    "en": "flourish",
    "expected": 5,
    "target": 3
  },
  {
    "en": "illegible",
    "expected": 5,
    "target": 3
  },
  {
    "en": "in observance of",
    "expected": 5,
    "target": 3
  },
  {
    "en": "prop against",
    "expected": 5,
    "target": 3
  },
  {
    "en": "restraint",
    "expected": 5,
    "target": 3
  }
]
```

1단계 차이 항목은 아래 전체 판정표의 검토 의견으로 구분했다. 그 밖의 Lv4·Lv5에도 비슷한 기본 사물·투명한 표현이 남는지 의미를 보며 재검토한다.

### 새 표본 전체 판정

| 번호 | 단어(소문자 키) | 최신 수록 뜻 | 현재 | 제안 | 차이 | 판단 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | brand | 상표, 브랜드 | 1 | 1 | 0 | 상표라는 기초 일상 의미 |
| 2 | fresh | 신선한 | 1 | 1 | 0 | 신선한이라는 기초 일상 형용사 |
| 3 | have a long day | 힘든 하루를 보내다 | 1 | 1 | 0 | 일상적인 피곤한 하루 표현 |
| 4 | holiday | 휴가, 방학 | 1 | 1 | 0 | 휴가·방학이라는 기초 일상어 |
| 5 | pack | 짐; 짐을 꾸리다 | 1 | 1 | 0 | 짐·짐 꾸리기라는 기초 일상 의미 |
| 6 | accept the offer | 제안을 수락하다 | 2 | 2 | 0 | 제안을 수락하는 기본 업무 표현 |
| 7 | economy | 경기, 경제 | 2 | 2 | 0 | 기본 경제·업무 명사 |
| 8 | ingredient | 재료, 성분 | 2 | 2 | 0 | 음식·제품 재료를 말하는 기본어 |
| 9 | inn | 여관 | 2 | 2 | 0 | 여행·숙박의 기본 사물 명사 |
| 10 | objective | 목표; 객관적인 | 2 | 2 | 0 | 목표·객관적인이라는 기본 업무 의미 |
| 11 | assorted | 여러 가지 종류의, 다채로운 | 3 | 3 | 0 | 여러 종류가 섞인 구성을 나타내는 중급 수식어 |
| 12 | be advised to do | ~할 것을 권유받다 | 3 | 3 | 0 | 공식 안내문의 권고 표현 |
| 13 | be determined to do | ~하기로 결심하다 | 3 | 3 | 0 | 의지·결심을 나타내는 중급 구문 |
| 14 | be irrelevant to | ~과 무관하다 | 3 | 3 | 0 | 관련성 판단의 중급 추상 표현 |
| 15 | bold | 대담한, 용감한 | 3 | 2 | 1 | 대담한·용감한이라는 일반 형용사 |
| 16 | business attire | 비즈니스 정장 | 3 | 2 | 1 | 직장 복장에 관한 기본 업무 명사구 |
| 17 | cease | 중지하다, 그치다 | 3 | 3 | 0 | 운영·활동 중단을 나타내는 문어 동사 |
| 18 | discrepancy | 불일치 | 3 | 3 | 0 | 문서·수치 불일치를 다루는 중급 업무어 |
| 19 | dispatch | 발송하다 | 3 | 3 | 0 | 물품 발송의 중급 업무 동사 |
| 20 | distributor | 분배자, 판매자 | 3 | 2 | 1 | 유통·판매 담당자를 나타내는 기본 업무 명사 |
| 21 | first priority | 최우선 사항 | 3 | 2 | 1 | 최우선 사항이라는 투명한 기본 업무 표현 |
| 22 | fluctuate | 변동하다 | 3 | 3 | 0 | 가격·수치 변동의 중급어 |
| 23 | for a change | 기분 전환으로 | 3 | 2 | 1 | 기분 전환을 뜻하는 기본 일상 표현 |
| 24 | hiccup | 딸꾹질 | 3 | 2 | 1 | 수록 뜻은 비유적 차질이 아닌 일상 신체 현상 딸꾹질 |
| 25 | hold the line | (전화를) 끊지 않고 기다리다 | 3 | 2 | 1 | 전화 응대의 기본 표현 |
| 26 | in the meantime | 그동안에 | 3 | 2 | 1 | 대기·일정 안내의 기본 시간 표현 |
| 27 | in the process of | ~이 진행 중인 | 3 | 3 | 0 | 업무 진행 상태를 나타내는 중급 표현 |
| 28 | inadequate | 부적절한, 불충분한 | 3 | 3 | 0 | 적절성·충분함을 평가하는 중급어 |
| 29 | lawsuit | 소송, 고소 | 3 | 3 | 0 | 분쟁·법적 절차의 중급 업무 명사 |
| 30 | lengthy | (시간이) 긴, 오랜 | 3 | 3 | 0 | 기간이 긴 것을 평가하는 문어 형용사 |
| 31 | life expectancy | 평균 수명 | 3 | 3 | 0 | 통계·건강 지문의 중급 명사구 |
| 32 | memorial | 기념물; 기념의 | 3 | 3 | 0 | 기념물·기념의라는 중급 행사·사회 어휘 |
| 33 | minutes | 회의록 | 3 | 3 | 0 | 시간 단위가 아닌 회의록이라는 업무 전문 의미 |
| 34 | not that i'm aware of. | 내가 아는 한 아니다. | 3 | 3 | 0 | 자신의 인지 범위를 한정하는 응답 표현 |
| 35 | pay raise | 임금 인상 | 3 | 2 | 1 | 기본 임금·인사 표현 |
| 36 | pity | 유감, 동정 | 3 | 2 | 1 | 유감·동정이라는 일반 감정어 |
| 37 | portrait | 초상화 | 3 | 2 | 1 | 그림·전시의 기본 명사 |
| 38 | possession | 소유물, 소유 | 3 | 3 | 0 | 소유·소유물을 나타내는 추상 명사 |
| 39 | project management | 프로젝트 관리 | 3 | 3 | 0 | 업무 관리의 중급 명사구 |
| 40 | province | 지방 | 3 | 2 | 1 | 지역·행정구역의 기본 명사 |
| 41 | registration confirmation | 등록 확인 | 3 | 2 | 1 | 예약·등록 확인의 기본 업무 표현 |
| 42 | reimburse | 변제하다, 상환하다 | 3 | 3 | 0 | 지시서가 중급 예시로 제시한 비용 상환 동사 |
| 43 | resign | 사임하다 | 3 | 3 | 0 | 사임이라는 중급 인사·업무 동사 |
| 44 | rising cost | 비용 상승 | 3 | 2 | 1 | 비용 상승이라는 투명한 기본 업무 명사구 |
| 45 | riverside | 강변 | 3 | 2 | 1 | 지역·위치를 설명하는 기본 합성어 |
| 46 | skyscraper | 고층 빌딩 | 3 | 2 | 1 | 사진·도시·건물의 기본 명사 |
| 47 | supervisory | 감독의, 관리의 | 3 | 3 | 0 | 직장 내 감독·관리 책임의 중급 수식어 |
| 48 | take effect | 효과가 나타나다 | 3 | 3 | 0 | 규정·정책의 효력 발생이라는 중급 표현 |
| 49 | visual aid | (그림ᆞ도표ᆞ비디오 등의) 시각 보조 자료 | 3 | 2 | 1 | 발표·수업의 기본 시각 자료 표현 |
| 50 | windshield | 바람막이 창 | 3 | 2 | 1 | 사진·교통의 기본 차량 부품 명사 |
| 51 | accordance | 일치, 조화 | 4 | 3 | 1 | 일치·조화라는 의미와 규정 준수 문맥의 중급어 |
| 52 | at the discretion of | ~의 재량으로 | 4 | 4 | 0 | 권한·재량의 고급 정책 표현 |
| 53 | blackout | 정전 | 4 | 2 | 2 | 수록 뜻은 기억 상실·정보 차단이 아닌 일상 시설 상황 정전 |
| 54 | clientele | 고객층 | 4 | 4 | 0 | 고객 집단을 집합적으로 가리키는 고급 명사 |
| 55 | cluster | 무리, 집단, 송이 | 4 | 3 | 1 | 집단·무리라는 일반 독해 중급 의미 |
| 56 | depict | 묘사하다 | 4 | 3 | 1 | 묘사·표현의 중급 문어 동사 |
| 57 | depot | 창고, 저장소 | 4 | 3 | 1 | 물류 저장소의 중급 명사 |
| 58 | dumping | 덤핑(투매) | 4 | 4 | 0 | 투매라는 전문 무역 개념 |
| 59 | give way to | ~에게 양보하다 | 4 | 2 | 2 | 수록 뜻과 예문은 보행자에게 양보하는 기본 교통 표현 |
| 60 | have control over | ~을 제어하다 | 4 | 2 | 2 | 무엇을 제어·통제한다는 기본 업무 표현 |
| 61 | have little chance of -ing | -할 확률이 적다 | 4 | 2 | 2 | 가능성이 낮음을 말하는 투명한 기본 표현 |
| 62 | heart ailment | 심장병 | 4 | 3 | 1 | 기본 질환 개념에 문어적 ailment가 결합한 중급 표현 |
| 63 | knock off | 업무를 마치다 | 4 | 4 | 0 | 단순 타격과 다른 비문자적 퇴근·업무 종료 의미 |
| 64 | lace | 끈; 끈을 묶다 | 4 | 2 | 2 | 수록 뜻은 끈·끈 묶기라는 기본 사물·행동 의미 |
| 65 | lamppost | 가로등 기둥 | 4 | 2 | 2 | 사진·거리의 기본 사물 명사 |
| 66 | lock oneself out of one's house | 열쇠를 집 안에 두고 문을 잠그다 | 4 | 3 | 1 | 실수로 집에 못 들어가게 되는 상황을 나타내는 중급 구동사 |
| 67 | make no exception | 예외를 두지 않다 | 4 | 3 | 1 | 예외를 두지 않는다는 중급 규정·업무 표현 |
| 68 | meticulous | 꼼꼼한 | 4 | 4 | 0 | 세밀한 주의·꼼꼼함을 나타내는 고급 형용사 |
| 69 | prolong | 연장시키다 | 4 | 3 | 1 | 기간 연장의 중급 문어 동사 |
| 70 | reinstall | 재설치하다 | 4 | 2 | 2 | 재설치라는 일상적인 기본 사무·컴퓨터 동작 |
| 71 | representation | 묘사, 표현 | 4 | 3 | 1 | 수록 뜻은 법적 대리권이 아닌 묘사·표현의 중급 의미 |
| 72 | respiratory system | 호흡 기관 | 4 | 4 | 0 | 해부·건강 분야의 전문 명사구 |
| 73 | retrieve | 되찾다 | 4 | 3 | 1 | 자료·물건을 되찾는 중급 업무 동사 |
| 74 | run an article | 기사를 게재하다 | 4 | 3 | 1 | 기사를 게재한다는 중급 출판·업무 의미 |
| 75 | stay ahead of | ~보다 앞서 있다 | 4 | 3 | 1 | 경쟁상 우위를 유지한다는 중급 표현 |
| 76 | straightforward | 정직한, 간단한 | 4 | 3 | 1 | 정직함·간단명료함을 평가하는 중급 형용사 |
| 77 | surgical instrument | 수술 도구 | 4 | 4 | 0 | 의료 분야의 전문 사물 명사구 |
| 78 | to one's advantage | ~에게 유리하게 | 4 | 3 | 1 | 유리하게 활용한다는 중급 업무 표현 |
| 79 | unanimous | 만장일치의 | 4 | 4 | 0 | 만장일치의라는 고급 합의·의사결정 의미 |
| 80 | without the consent of | ~의 동의 없이 | 4 | 3 | 1 | 동의 없이 행함을 나타내는 중급 계약·업무 표현 |
| 81 | bureaucracy | 관료 제도 | 5 | 4 | 1 | 제도·정치의 고급 추상 명사지만 최고 희귀층으로 보기는 어려움 |
| 82 | excavation | 발굴 | 5 | 4 | 1 | 발굴이라는 전문 작업 명사로 고급이 적절 |
| 83 | expectancy | 기대, 예상 | 5 | 4 | 1 | 기대 상태를 가리키는 비교적 문어적인 고급 명사 |
| 84 | flourish | 번창하다, 융성하다 | 5 | 3 | 2 | 사업의 번창이라는 중급 경제·업무 동사 |
| 85 | illegible | 읽기 어려운 | 5 | 3 | 2 | 문서·필체를 읽기 어렵다는 중급 사무 표현 |
| 86 | in defiance of | ~에 반항하여 | 5 | 4 | 1 | 반항·무시라는 고급 문어 전치사구 |
| 87 | in observance of | ~을 기념하여 | 5 | 3 | 2 | 기념일·휴무 안내의 중급 표현; 기존 in commemoration of→3과 일관 |
| 88 | menace | 위협하다 | 5 | 4 | 1 | 위협하다라는 고급 문어 동사 |
| 89 | multilateral | 다국간의 | 5 | 5 | 0 | 다국간의라는 외교·협정의 고난도 수식어; 기존 bilateral 유지 판단과 일관 |
| 90 | nationalize | 국영화하다 | 5 | 5 | 0 | 국영화라는 전문 경제·정책 동사 |
| 91 | obfuscate | 모호하게 하다, 이해하기 어렵게 만들다 | 5 | 5 | 0 | 의도적으로 불분명하게 함을 뜻하는 희귀 정밀 동사 |
| 92 | paralysis | 마비 | 5 | 5 | 0 | 마비라는 전문 의학 명사로 토익 고난도 배정 허용 |
| 93 | preclude | 막다 | 5 | 4 | 1 | 가능성을 막는다는 고급 논리·업무 동사 |
| 94 | prop against | ~에 받쳐 놓다 | 5 | 3 | 2 | 사다리 등을 벽에 받쳐 두는 중급 사물 배치 표현 |
| 95 | put forth | 제시하다, 내놓다; 뻗다 | 5 | 4 | 1 | 최신 뜻·예문은 제안을 제시하는 고급 문어 표현 |
| 96 | recede | 물러나다, 줄어들다 | 5 | 4 | 1 | 최신 뜻은 물러남·줄어듦이라는 고급 문어 동사 |
| 97 | restraint | 억제, 금지 | 5 | 3 | 2 | 억제·금지라는 중급 추상 명사 |
| 98 | ridership | (공공 교통 기관의) 이용자 수, 승객 수 | 5 | 4 | 1 | 교통 이용자 집계를 뜻하는 전문 고급 명사 |
| 99 | sparsely | 드문드문하게 | 5 | 4 | 1 | 밀도가 낮은 상태를 정밀하게 표현하는 고급 부사 |
| 100 | strew | 흩뿌리다 | 5 | 5 | 0 | 흩뿌리다라는 희귀 문어 동사 |

사전은 뜻·용례를 확인하는 보조 근거로 사용했다. [Cambridge blackout](https://dictionary.cambridge.org/us/dictionary/english/blackout)은 정전 의미, [Cambridge illegible](https://dictionary.cambridge.org/us/dictionary/english/illegible)은 문서·필체의 읽기 어려움이라는 의미를 확인하는 데 참고했다. 이 자료가 위 토익 레벨 숫자를 직접 부여하는 것은 아니다.

### 범위 밖에서 함께 발견한 최신 토익 예문 문제

분류용으로 예문을 읽다가 확인한 다음 2건은 난이도 일치율에 합산하지 않았다. 토익 예문 전체를 이번에 내용 감사한 것은 아니다. 토익 데이터 담당자가 별도로 확인할 수정 제안이다.

| 단어 | 필드 | 현재 값 | 제안 수정값 | 이유 |
| --- | --- | --- | --- | --- |
| assorted | ex | We reviewed the assorted report at the meeting. | We reviewed assorted reports at the meeting. | 여러 종류가 섞였다는 뜻에 맞게 복수 보고서를 사용 |
| assorted | exKo | 우리는 회의에서 여러 가지 종류의 보고서를 검토했다. | 우리는 회의에서 여러 종류의 보고서를 검토했다. | 고친 영문과 맞춘 해석 |
| excavation | ex | The chef prepared the excavation for the guests. | The excavation uncovered an ancient wall. | 요리사가 손님을 위해 발굴을 준비한다는 문맥은 부자연스러움 |
| excavation | exKo | 요리사는 손님들을 위해 발굴을 준비했다. | 그 발굴 작업으로 고대 성벽이 드러났다. | 고친 영문에 맞춘 해석 |

### 적용 전 다시 확인할 조건

최신 토익과 분류표의 누락/추가 키를 모두 0으로 만들고, 1~5 정수·JSON 중복 키 검사를 다시 통과해야 한다. 우선 수정 목록과 1단계 경계 의견을 검토한 뒤 새 평가를 별도 기록한다. 이번 재검증은 읽기 전용이므로 실제 수정이나 분류표 적용은 하지 않았다.

보존 검증: 기존 문서 첫 20,435바이트의 SHA-256 `2f5c572fcfac03b1ceaf43ef6dd707fd3518f7af82d58318e2494d18951db09b`를 보존하고 이 절만 추가했다. 최신 기준 원본 두 파일의 재검증 전후 해시도 일치함을 확인했다. 최초 4,132개 토익에서 최신 5,804개 토익으로 바뀐 외부 변경은 위에 별도 기록했다.


## 재검증 2 (2026-11-09)

**판정: 추가 수정 필요.** 정확 일치 **94/150 = 62.67%**, ±1단계 허용 **140/150 = 93.33%**, 2단계 이상 차이 **10/150 = 6.67%**.

근거 지시서: `docs/tasks/data-reverify-2.md`, `docs/tasks/toeic-levels-v2.md`, `docs/tasks/toeic-levels-map.md`의 토익 학습자 기준. 기존 내용은 보존하고 이 절만 추가했다. 패키지와 분류표는 읽기만 했다.

### 판정 기준 적용

| 조건 | 이번 결과 | 충족 |
| --- | --- | --- |
| ±1 허용 일치율 ≥90% | 140/150 = 93.33% | 예 |
| 2단계 이상 차이 ≤5% | 10/150 = 6.67% | 아니오 |
| 연속 구간에서 뒤섞임 흔적 없음 | 검토한 6구간·72항목에서 체계적 한 칸 밀림 미발견 | 표본 범위에서 예 |

150개에서 5% 이하는 최대 7개다. 따라서 나머지 두 조건을 만족해도 이번 10개의 큰 차이가 남는 한 적용 가능으로 판정하지 않는다. 레벨은 공인 정답이나 실제 출제 횟수 집계가 아니라, 수록 뜻과 지시 기준에 따른 리뷰어 판단이다. 1단계 차이는 경계 검토 의견으로 따로 읽어야 한다.

### v2 원본과 전체 무결성

| 파일 | 재검증 SHA-256 |
| --- | --- |
| packages/toeic.json | 386c6349f7da44b8e36c2e64ddf502e46ee7185c7a5e25c54fe15fe7b2efd5b4 |
| docs/toeic-levels.json | f9d22b7fe333ef75548799ae0db3157b1f0abd9a3aaf1595a0d4100dbe414e1e |

최신 토익 5,804항목/고유 소문자 키 5,804개와 분류표 5,804키가 정확히 일치한다. 누락 0, 추가 0, 1~5 정수 밖 값 0, 중복 JSON 키 0이다.

직접 실행한 지시서 검증 명령 출력:

```text
5804 missing 0 extra 0 bad 0
{ '1': 453, '2': 1514, '3': 2187, '4': 1182, '5': 468 }
```

### 직전 수정 목록과 교정된 키

직전 재검증의 2단계 이상 수정 목록은 **12/12건 모두 요청값과 일치**했다.

| 단어 | 직전 요청 레벨 | 현재 레벨 | 반영 |
| --- | --- | --- | --- |
| blackout | 2 | 2 | 일치 |
| give way to | 2 | 2 | 일치 |
| have control over | 2 | 2 | 일치 |
| have little chance of -ing | 2 | 2 | 일치 |
| lace | 2 | 2 | 일치 |
| lamppost | 2 | 2 | 일치 |
| reinstall | 2 | 2 | 일치 |
| flourish | 3 | 3 | 일치 |
| illegible | 3 | 3 | 일치 |
| in observance of | 3 | 3 | 일치 |
| prop against | 3 | 3 | 일치 |
| restraint | 3 | 3 | 일치 |

교정된 표제어도 **4/4건 새 키로 존재**하고, 구형 키는 모두 제거됐다. 후속 전체 재검토로 레벨을 하향한 경우도 있으므로 구형 레벨 그대로인지와 키 이전 여부를 혼동하지 않았다.

| 제거된 구형 키 | 현재 신형 키 | 현재 수록 뜻 | 현재 레벨 |
| --- | --- | --- | --- |
| claim refund | claim a refund | 환불을 요구하다 | 3 |
| put a rush | put a rush on | 서두르다 | 3 |
| set down to work | get down to work | 일에 착수하다 | 3 |
| take an action against | take action against | ~에 대해 조치를 취하다 | 3 |

### 새 표본 설계

신규 분류 집합은 직전 재검증에 남긴 누락 키 목록 **1,676개** 그대로다(교정된 신형 키 4개 포함). 나머지 **4,128개**를 기존 키 집합으로 정의했다. 신규 80개, 기존 70개를 비복원 무작위 추출했다. 최초 150개와 직전 100개, 합계 250개 이전 표본은 제외했으며 이번 150개는 모두 새 단어다.

각 집합의 현재 레벨 비중에 표본 수를 곱하고, 정수 부분을 먼저 배정한 뒤 소수 부분이 큰 순서로 남은 수를 배분했다(최대 잔여 방식, 동률은 낮은 레벨 우선). 레벨 배정 기준은 제외 전 집합의 현재 분포다. 각 레벨에서 이전 표본을 뺀 소문자 키를 정렬하여 Python `random.Random("vocab-master-data-reverify-2-2026-11-09")`으로 `sorted(rng.sample(pool, n))`을 뽑았다. 신규→기존, 각 집합 안에서는 Lv1→Lv5 순서로 난수 상태를 이어 사용했다.

| 집합 | 모집단 | Lv1 | Lv2 | Lv3 | Lv4 | Lv5 | 표본 합 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| new | 1676 | 5 | 18 | 25 | 22 | 10 | 80 |
| existing | 4128 | 6 | 19 | 28 | 13 | 4 | 70 |

표의 new는 신규, existing은 기존이다. 두 집합의 표본 비율 80:70은 모집단 비율 1676:4128과 다르고, 이전 표본도 제외했으므로 단순 합계 일치율을 전체 5,804개의 정확도로 확대하지 않는다. 직전 100개 표본과 구성도 달라 45% 대비 개선 폭을 직접 계산하지 않았다.

### 새 표본 결과

| 집합 | 표본 | 정확 일치 | 정확 일치율 | ±1 허용 | ±1 허용률 | 2단계 이상 | 2단계 이상 비율 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| new | 80 | 52 | 65.00% | 75 | 93.75% | 5 | 6.25% |
| existing | 70 | 42 | 60.00% | 65 | 92.86% | 5 | 7.14% |
| all | 150 | 94 | 62.67% | 140 | 93.33% | 10 | 6.67% |

### 2단계 이상 추가 수정 필요 목록

| 집합 | 단어 | 수록 뜻 | 현재 | 제안 | 차이 | 판단 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| new | changeable | 변하기 쉬운 | 4 | 2 | 2 | 변하기 쉬운이라는 투명한 일반 형용사 |
| new | wastepaper | 폐지, 휴지 | 4 | 2 | 2 | 폐지라는 기본 사물·재활용 명사 |
| new | widen | 넓히다, 넓어지다 | 4 | 2 | 2 | 넓히다라는 일반적인 기본 동사 |
| new | misdirect | 잘못 안내하다, 엉뚱한 곳으로 보내다 | 5 | 3 | 2 | 잘못 안내·배송한다는 중급 업무 의미; direct=2와 의미 연결 |
| new | obstruct | 막다, 방해하다 | 5 | 3 | 2 | 통행·업무 등을 막는 중급 동사 |
| existing | not only a but also b | A뿐만 아니라 B도 | 3 | 1 | 2 | A뿐 아니라 B도라는 기초 학교 문법 표현 |
| existing | make a conclusion | 결론을 내리다 | 4 | 2 | 2 | 수록 뜻은 결론을 내린다는 기본 사고 표현 |
| existing | mend | 수선하다 | 4 | 2 | 2 | 수선하다라는 일상적인 기본 행동 |
| existing | nourish | ~에 영양분을 주다, 장려하다 | 5 | 3 | 2 | 영양 공급·장려의 중급 건강·일반 독해 동사 |
| existing | remembrance | 추억 | 5 | 3 | 2 | 수록 뜻은 추억이라는 일반 중급 개념 |

후속 담당자가 현재 값과 대조할 수 있는 적용 제안이다. 이미 값이 바뀌었으면 덮어쓰지 말고 재검토한다.

```json
[
  {
    "en": "changeable",
    "expected": 4,
    "target": 2
  },
  {
    "en": "wastepaper",
    "expected": 4,
    "target": 2
  },
  {
    "en": "widen",
    "expected": 4,
    "target": 2
  },
  {
    "en": "misdirect",
    "expected": 5,
    "target": 3
  },
  {
    "en": "obstruct",
    "expected": 5,
    "target": 3
  },
  {
    "en": "not only a but also b",
    "expected": 3,
    "target": 1
  },
  {
    "en": "make a conclusion",
    "expected": 4,
    "target": 2
  },
  {
    "en": "mend",
    "expected": 4,
    "target": 2
  },
  {
    "en": "nourish",
    "expected": 5,
    "target": 3
  },
  {
    "en": "remembrance",
    "expected": 5,
    "target": 3
  }
]
```

참고로 `direct=2/misdirect=5`는 수록 뜻이 안내/잘못 안내로 연결되므로 원형+1 이내 점검에서도 하향 검토 근거가 있다. 반면 `change=1`의 수록 뜻은 잔돈이어서 `changeable=4`와 의미가 다르다. 이 쌍에는 기계적 상한을 적용하지 않았고, changeable→2는 변하기 쉬운이라는 뜻 자체에 대한 별도 판단이다. 다른 파생형까지 접미사만으로 일괄 판정하지 않았다.

### 신규 분류 연속 구간의 한 칸 밀림 점검

확인 가능한 작업자 완료 출력에는 인덱스 오류를 고친 배치의 정확한 시작·끝이 없었다. 그래서 현재 JSON `map`의 삽입 순서에서 신규 1,676키만 추린 연속 순번을 기준으로 시작·중간·끝 **6구간 ×12개 =72개**를 확인했다. 구간 순번은 전체 패키지 순번이나 무작위 표본 번호가 아니다.

각 항목의 뜻을 읽어 제안 레벨을 정하고, 같은 가운데 10개 단어에 대해 현재 정렬 그대로의 평균 절대 차이(MAE)와 저장된 레벨 열을 앞/뒤 한 칸 옮겼을 때의 MAE를 비교했다. `-1`은 앞 항목의 저장 레벨을 해당 단어에 부여, `+1`은 뒤 항목의 레벨을 부여하는 가정이다. 경계 두 항목을 제외해 세 경우가 같은 10개 단어를 비교하도록 했다. 이 비교는 인덱스 오류의 증명이 아니라 뜻 기반 판정을 보조하는 진단이다.

| 신규 순번 | 현재 정렬 MAE | 앞 항목 레벨(-1) | 뒤 항목 레벨(+1) | 진단 |
| --- | --- | --- | --- | --- |
| 1–12 | 0.10 | 0.70 | 0.80 | 현재 정렬보다 한 칸 이동이 개선되지 않음 |
| 331–342 | 0.20 | 1.00 | 0.80 | 현재 정렬보다 한 칸 이동이 개선되지 않음 |
| 661–672 | 0.40 | 1.40 | 1.40 | 현재 정렬보다 한 칸 이동이 개선되지 않음 |
| 991–1002 | 0.30 | 1.40 | 1.30 | 현재 정렬보다 한 칸 이동이 개선되지 않음 |
| 1321–1332 | 0.60 | 1.30 | 1.40 | 현재 정렬보다 한 칸 이동이 개선되지 않음 |
| 1665–1676 | 0.80 | 1.00 | 1.10 | 현재 정렬보다 한 칸 이동이 개선되지 않음 |

**검토한 구간에서는 체계적인 한 칸 밀림 흔적을 발견하지 못했다.** fear=1, ferocity=5, fiction=2, meeting=1, microorganism=5, rest=1, wrist=1처럼 서로 난이도가 다른 이웃의 값이 각 단어 의미와 대체로 맞았고, 상하 이동으로 전반적인 정합도가 좋아지지 않았다. 다만 모든 신규 단어의 뒤섞임이 없다는 보증이나 문제 배치 전체의 재현 검사는 아니다. 일부 상위 배정은 일관된 한 칸 이동보다 개별 어휘의 과대 평가로 보인다.

신규 순번 1–12:

| 신규 순번 | 단어 | 수록 뜻 | 현재 | 제안 | 판단 근거 |
| --- | --- | --- | --- | --- | --- |
| 1 | claim a refund | 환불을 요구하다 | 3 | 3 | 환불 요구의 중급 업무 표현 |
| 2 | put a rush on | 서두르다 | 3 | 3 | 처리를 서두르게 하는 중급 관용 표현 |
| 3 | get down to work | 일에 착수하다 | 3 | 3 | 본격적 업무 착수의 중급 구동사 |
| 4 | take action against | ~에 대해 조치를 취하다 | 3 | 3 | 조치를 취하는 중급 업무 표현 |
| 5 | a maximum of | 최대 ~의 | 3 | 2 | 상한 수량을 나타내는 기본 표현 |
| 6 | abolish | 폐지하다 | 4 | 4 | 제도 폐지의 고급 문어 동사 |
| 7 | abridge | 요약하다, 축약하다 | 4 | 4 | 요약·축약의 고급 문어 동사 |
| 8 | abrupt | 갑작스러운, 퉁명스러운 | 3 | 3 | 갑작스러움·태도의 중급 의미 |
| 9 | absence | 부재, 결석 | 2 | 2 | 부재·결석의 기본 의미 |
| 10 | absentee vote | 부재자 투표 | 4 | 4 | 부재자 투표의 전문 사회 명사구 |
| 11 | absorb | 흡수하다, 받아들이다; 비용을 부담하다 | 3 | 3 | 비용 부담을 포함한 중급 다의어 |
| 12 | abstract | 추상적인; 요약 | 4 | 4 | 추상성·요약의 고급 의미 |

신규 순번 331–342:

| 신규 순번 | 단어 | 수록 뜻 | 현재 | 제안 | 판단 근거 |
| --- | --- | --- | --- | --- | --- |
| 331 | confectioner | 과자 제조업자, 제과점 | 4 | 4 | 제과업을 가리키는 전문 명사 |
| 332 | confidence | 자신감, 신뢰 | 2 | 2 | 자신감·신뢰의 기본 의미 |
| 333 | confirmation | 확인, 확정 | 2 | 2 | 확인의 기본 업무 명사 |
| 334 | conflict | 갈등, 충돌; 상충하다 | 3 | 3 | 갈등·상충의 중급 의미 |
| 335 | conform | 순응하다, 따르다 | 4 | 4 | 순응의 고급 문어 동사 |
| 336 | confuse | 혼동하다, 혼란스럽게 하다 | 3 | 2 | 혼동이라는 기본 의미 |
| 337 | congestion | 혼잡, 울혈 | 3 | 3 | 혼잡·울혈의 중급 의미 |
| 338 | congregate | 모이다 | 4 | 4 | 집합의 고급 문어 동사 |
| 339 | congress | 의회, 대규모 회의 | 4 | 4 | 의회·대규모 회의의 고급 의미 |
| 340 | connoisseur | 감정가, 애호가 | 5 | 5 | 감정가·애호가의 희귀 정밀 명사 |
| 341 | conquer | 정복하다, 극복하다 | 4 | 3 | 정복·극복의 중급 일반 독해 의미 |
| 342 | conquest | 정복 | 4 | 4 | 정복이라는 문어 명사 |

신규 순번 661–672:

| 신규 순번 | 단어 | 수록 뜻 | 현재 | 제안 | 판단 근거 |
| --- | --- | --- | --- | --- | --- |
| 661 | fate | 운명 | 3 | 3 | 운명의 중급 추상 명사 |
| 662 | fatigue | 피로 | 4 | 3 | 피로의 중급 건강·업무 의미 |
| 663 | favorably | 호의적으로, 유리하게 | 4 | 3 | 호의·유리함의 중급 부사 |
| 664 | fear | 두려움; 두려워하다 | 1 | 1 | 두려움의 기초 명사·동사 |
| 665 | feasibility | 실현 가능성 | 4 | 3 | 사업 실현 가능성의 중급 업무 명사 |
| 666 | ferocity | 사나움, 맹렬함 | 5 | 5 | 사나움의 희귀 정밀 명사 |
| 667 | fiber optic cable | 광섬유 케이블 | 5 | 4 | 광섬유 케이블의 전문 기술 명사구 |
| 668 | fiction | 소설, 허구 | 2 | 2 | 소설·허구의 기본 의미 |
| 669 | fierce | 사나운, 치열한 | 3 | 3 | 사나움·치열함의 중급 의미 |
| 670 | fill up | 가득 채우다 | 2 | 2 | 채우기의 기본 구동사 |
| 671 | finalist | 결승 진출자, 최종 후보 | 3 | 3 | 최종 후보의 중급 명사 |
| 672 | financial | 재정의, 금융의 | 2 | 2 | 재정·금융의 기본 업무 수식어 |

신규 순번 991–1002:

| 신규 순번 | 단어 | 수록 뜻 | 현재 | 제안 | 판단 근거 |
| --- | --- | --- | --- | --- | --- |
| 991 | medical | 의료의 | 2 | 2 | 의료의 기본 수식어 |
| 992 | medical practice | 진료, 의원 | 3 | 3 | 진료·의원의 중급 의료 의미 |
| 993 | meeting | 회의, 만남 | 1 | 1 | 회의의 기초 업무 명사 |
| 994 | melt | 녹다, 녹이다 | 2 | 2 | 녹음의 기본 동사 |
| 995 | memorandum | 업무 메모, 각서 | 3 | 3 | 각서·업무 메모의 중급 의미 |
| 996 | memorize | 암기하다 | 3 | 2 | 암기의 기본 학습 동사 |
| 997 | mental | 정신의, 마음의 | 2 | 2 | 정신·마음의 기본 수식어 |
| 998 | mention | 언급하다; 언급 | 1 | 2 | 언급의 기본 업무 의미 |
| 999 | mercy | 자비 | 4 | 3 | 자비의 중급 추상 명사 |
| 1000 | method | 방법 | 2 | 2 | 방법의 기본 명사 |
| 1001 | microorganism | 미생물 | 5 | 5 | 미생물의 전문 과학 명사 |
| 1002 | migration | 이주, 이동 | 3 | 3 | 이주·이동의 중급 의미 |

신규 순번 1321–1332:

| 신규 순번 | 단어 | 수록 뜻 | 현재 | 제안 | 판단 근거 |
| --- | --- | --- | --- | --- | --- |
| 1321 | resignation | 사직, 체념 | 3 | 3 | 사직·체념의 중급 의미 |
| 1322 | resistance | 저항, 내성 | 4 | 3 | 저항·내성의 중급 의미 |
| 1323 | resistant | 저항하는, 잘 견디는 | 4 | 3 | 저항·내성을 나타내는 중급 수식어 |
| 1324 | resistant to | ~에 잘 견디는, ~에 반대하는 | 4 | 3 | 견딤·반대의 중급 결합 표현 |
| 1325 | resolve | 해결하다, 결심하다 | 3 | 3 | 해결·결심의 중급 의미 |
| 1326 | resounding | 울려 퍼지는, 대단한 | 5 | 5 | 소리·강도를 정밀하게 나타내는 희귀 수식어 |
| 1327 | resource | 자원, 자료 | 3 | 2 | 자원·자료의 기본 업무 의미 |
| 1328 | respectable | 존경할 만한, 상당한 | 4 | 3 | 존경·상당함의 중급 수식어 |
| 1329 | responsibility | 책임, 담당 업무 | 2 | 2 | 책임의 기본 업무 명사 |
| 1330 | rest | 나머지, 휴식; 쉬다 | 1 | 1 | 휴식·나머지의 기초 의미 |
| 1331 | restless | 가만히 있지 못하는, 불안한 | 4 | 3 | 불안·초조의 중급 상태 수식어 |
| 1332 | restock | 재고를 다시 채우다 | 4 | 3 | 재고 보충의 중급 업무 동사 |

신규 순번 1665–1676:

| 신규 순번 | 단어 | 수록 뜻 | 현재 | 제안 | 판단 근거 |
| --- | --- | --- | --- | --- | --- |
| 1665 | wireless charger | 무선 충전기 | 3 | 2 | 일상 충전 기기의 기본 명사구 |
| 1666 | wit | 재치 | 5 | 3 | 재치라는 일반 독해 중급 의미 |
| 1667 | with regard to | ~에 관하여 | 4 | 3 | 관련 사항을 잇는 중급 업무 표현 |
| 1668 | wool | 양모, 모직 | 3 | 2 | 기본 의류·섬유 재료 |
| 1669 | work one's way up | 노력하여 승진하다 | 4 | 3 | 노력으로 승진하는 중급 업무 표현 |
| 1670 | world-renowned | 세계적으로 유명한 | 4 | 3 | 명성을 표현하는 중급 복합 형용사 |
| 1671 | worldwide | 전 세계의; 전 세계적으로 | 2 | 2 | 전 세계 범위의 기본 수식어 |
| 1672 | worth | ~의 가치가 있는; 가치 | 2 | 2 | 가치의 기본 의미 |
| 1673 | worthwhile | 가치 있는 | 3 | 2 | 가치 있음을 나타내는 기본 수식어 |
| 1674 | worthy | 가치 있는, 자격이 있는 | 4 | 3 | 가치·자격의 중급 평가 수식어 |
| 1675 | wrist | 손목 | 1 | 1 | 기초 신체 명사 |
| 1676 | youth | 청년, 젊음 | 2 | 2 | 청년·젊음의 일반 의미 |

연속 구간에서 별도로 발견한 2단계 이상 조정 제안(무작위 150개 통계에 합산하지 않음):

| 단어 | 현재 | 제안 | 수록 뜻 | 판단 근거 |
| --- | --- | --- | --- | --- |
| wit | 5 | 3 | 재치 | 재치라는 일반 독해 중급 의미 |

### 무작위 150개 전체 판정

아래 표에서 0은 정확 일치, 1은 경계 검토 의견, 2 이상은 우선 수정 의견이다. 수록 뜻을 기준으로 판정했으며 현재 예문이 단순하다는 이유로 레벨을 낮추지 않았다.

| 번호 | 집합 | 단어 | 수록 뜻 | 현재 | 제안 | 차이 | 판단 근거 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | new | handle | 다루다, 처리하다; 손잡이 | 1 | 1 | 0 | 다루기·손잡이라는 기초 일상 의미 |
| 2 | new | lonely | 외로운 | 1 | 1 | 0 | 기초 감정 형용사 |
| 3 | new | prefer | 더 좋아하다 | 1 | 1 | 0 | 선호를 나타내는 기초 동사 |
| 4 | new | sell | 팔다 | 1 | 1 | 0 | 매매의 기초 동사 |
| 5 | new | wallet | 지갑 | 1 | 1 | 0 | 기초 소지품 명사 |
| 6 | new | aim | 목표; 겨냥하다 | 2 | 2 | 0 | 목표·겨냥이라는 기본 의미 |
| 7 | new | commonly | 흔히, 일반적으로 | 2 | 2 | 0 | 일반성을 나타내는 기본 부사 |
| 8 | new | contribute to | ~에 기여하다, ~의 원인이 되다 | 2 | 2 | 0 | 기여·원인을 나타내는 기본 업무 표현 |
| 9 | new | corporation | 기업, 법인 | 2 | 2 | 0 | 기본 기업·법인 명사 |
| 10 | new | fuel | 연료; 부채질하다 | 2 | 2 | 0 | 연료라는 기본 의미와 일반적인 비유 용법 |
| 11 | new | in common | 공통으로 | 2 | 2 | 0 | 공통점을 나타내는 기본 표현 |
| 12 | new | inform | 알리다 | 2 | 2 | 0 | 기본 업무 알림 동사 |
| 13 | new | lecture | 강의; 강의하다 | 2 | 2 | 0 | 강의·강의하다라는 기본 교육 의미 |
| 14 | new | mosquito | 모기 | 2 | 2 | 0 | 일반 생활의 곤충 명사 |
| 15 | new | naughty | 장난이 심한 | 2 | 2 | 0 | 일상 행동·성격 형용사 |
| 16 | new | percentage | 백분율, 비율 | 2 | 2 | 0 | 기본 수치·비율 명사 |
| 17 | new | separate | 분리하다; 별개의 | 2 | 2 | 0 | 기본 분리·구별 의미 |
| 18 | new | shift | 교대 근무, 변화; 옮기다 | 2 | 2 | 0 | 교대 근무·변화라는 기본 업무 의미 |
| 19 | new | slightly | 조금 | 2 | 2 | 0 | 정도를 조절하는 기본 부사 |
| 20 | new | stair | 계단 한 단 | 2 | 1 | 1 | 계단이라는 기초 일상 사물 |
| 21 | new | time off | 휴가, 쉬는 시간 | 2 | 2 | 0 | 휴가·휴무의 기본 업무 표현 |
| 22 | new | transport | 운송하다; 운송 | 2 | 2 | 0 | 운송이라는 기본 업무 의미 |
| 23 | new | youth | 청년, 젊음 | 2 | 2 | 0 | 청년·젊음이라는 일반 의미 |
| 24 | new | abrupt | 갑작스러운, 퉁명스러운 | 3 | 3 | 0 | 갑작스러움·퉁명스러움의 중급 형용사 |
| 25 | new | absorb | 흡수하다, 받아들이다; 비용을 부담하다 | 3 | 3 | 0 | 흡수·비용 부담이라는 중급 다의어 |
| 26 | new | associate | 관련짓다; 동료 | 3 | 3 | 0 | 관련짓기·동료라는 중급 업무 의미 |
| 27 | new | atmosphere | 분위기, 대기 | 3 | 3 | 0 | 분위기·대기라는 중급 추상·환경 의미 |
| 28 | new | component | 부품, 구성 요소 | 3 | 3 | 0 | 구성 요소·부품의 중급 업무어 |
| 29 | new | coverage | 보도, 보장 범위 | 3 | 3 | 0 | 보도·보장 범위의 중급 업무 의미 |
| 30 | new | ecology | 생태학, 생태계 | 3 | 3 | 0 | 생태 관련 중급 독해 명사 |
| 31 | new | existing | 기존의, 현존하는 | 3 | 2 | 1 | 기존 계정·서비스 등을 말하는 기본 업무 수식어 |
| 32 | new | explicitly | 명시적으로, 분명하게 | 3 | 3 | 0 | 명시성·분명함을 표현하는 중급 부사 |
| 33 | new | financing | 자금 조달, 융자 | 3 | 3 | 0 | 자금 조달이라는 중급 금융 의미 |
| 34 | new | found | 설립하다 | 3 | 3 | 0 | find의 과거형이 아닌 설립하다라는 수록 의미 |
| 35 | new | freelance | 프리랜서의; 프리랜서로 일하다 | 3 | 3 | 0 | 고용 방식의 중급 업무 의미 |
| 36 | new | frustrated | 좌절한, 답답한 | 3 | 3 | 0 | 좌절·답답함을 표현하는 중급 형용사 |
| 37 | new | head back to | ~로 돌아가다 | 3 | 2 | 1 | 돌아가는 방향을 말하는 기본 이동 표현 |
| 38 | new | illustrate | 설명하다, 삽화를 넣다 | 3 | 3 | 0 | 설명·도해의 중급 문어 동사 |
| 39 | new | imply | 암시하다, 함축하다 | 3 | 3 | 0 | 함축·암시의 중급 동사 |
| 40 | new | likelihood | 가능성 | 3 | 3 | 0 | 가능성을 평가하는 중급 추상 명사 |
| 41 | new | mass | 덩어리, 대량; 대량의 | 3 | 3 | 0 | 덩어리·대량의 다의적 중급 의미 |
| 42 | new | numerous | 수많은 | 3 | 3 | 0 | 수량의 많음을 말하는 중급 문어 수식어 |
| 43 | new | promptly | 신속히, 정각에 | 3 | 3 | 0 | 신속성·정시성을 표현하는 중급 업무 부사 |
| 44 | new | renew | 갱신하다, 재개하다 | 3 | 3 | 0 | 갱신·재개의 중급 업무 동사 |
| 45 | new | scooter | 스쿠터, 킥보드 | 3 | 2 | 1 | 사진·교통의 기본 탈것 명사 |
| 46 | new | severely | 심하게, 엄격하게 | 3 | 3 | 0 | 정도·엄격함의 중급 부사 |
| 47 | new | unemployed | 실업 상태인 | 3 | 2 | 1 | 실업 상태라는 기본 고용 표현 |
| 48 | new | wireless charger | 무선 충전기 | 3 | 2 | 1 | 일상·사무용 충전 기기의 기본 명사구 |
| 49 | new | alumni | 졸업생들, 동문들 | 4 | 3 | 1 | 교육·채용·동문 안내의 중급 집합 명사 |
| 50 | new | avid | 열성적인 | 4 | 4 | 0 | 열성적 성향을 정밀하게 표현하는 고급 형용사 |
| 51 | new | changeable | 변하기 쉬운 | 4 | 2 | 2 | 변하기 쉬운이라는 투명한 일반 형용사 |
| 52 | new | chronicle | 연대기; 기록하다 | 4 | 4 | 0 | 연대기·기록의 고급 문어 의미 |
| 53 | new | clipping | 신문 스크랩, 잘라낸 조각 | 4 | 3 | 1 | 신문 스크랩·잘라낸 조각이라는 중급 명사 |
| 54 | new | compulsory | 의무적인 | 4 | 3 | 1 | 의무적 요구를 나타내는 중급 업무 형용사 |
| 55 | new | cramped | 비좁은 | 4 | 3 | 1 | 숙박·공간의 비좁음을 나타내는 중급 형용사 |
| 56 | new | deadlock | 교착 상태 | 4 | 4 | 0 | 협상 교착이라는 고급 추상 의미 |
| 57 | new | debris | 잔해, 부스러기 | 4 | 4 | 0 | 잔해를 가리키는 고급 명사 |
| 58 | new | decisively | 단호하게, 결정적으로 | 4 | 3 | 1 | 결정·태도의 중급 부사 |
| 59 | new | dedicate | 바치다, 전념하다 | 4 | 3 | 1 | 전념·헌신이라는 중급 동사 |
| 60 | new | interpersonal | 대인 관계의 | 4 | 3 | 1 | 대인 관계라는 중급 인사·업무 수식어 |
| 61 | new | limb | 팔다리, 큰 나뭇가지 | 4 | 3 | 1 | 팔다리·큰 가지라는 일반 독해 중급 의미 |
| 62 | new | loaf | 빵 한 덩어리; 빈둥거리다 | 4 | 3 | 1 | 빵 뜻 외에 빈둥거리다라는 동사도 있어 기초로만 보지 않음 |
| 63 | new | modernize | 현대화하다 | 4 | 3 | 1 | 현대화라는 중급 경제·업무 동사 |
| 64 | new | noble | 고귀한, 훌륭한 | 4 | 3 | 1 | 가치·품성 평가의 중급 형용사 |
| 65 | new | offspring | 자녀, 새끼 | 4 | 4 | 0 | 자녀·새끼를 가리키는 문어·생물학 명사 |
| 66 | new | periodic | 주기적인 | 4 | 3 | 1 | 주기적 업무·현상의 중급 수식어 |
| 67 | new | publicize | 알리다, 홍보하다 | 4 | 3 | 1 | 홍보라는 중급 업무 동사 |
| 68 | new | reluctantly | 마지못해 | 4 | 3 | 1 | 태도·망설임을 나타내는 중급 부사 |
| 69 | new | wastepaper | 폐지, 휴지 | 4 | 2 | 2 | 폐지라는 기본 사물·재활용 명사 |
| 70 | new | widen | 넓히다, 넓어지다 | 4 | 2 | 2 | 넓히다라는 일반적인 기본 동사 |
| 71 | new | dire | 매우 심각한, 절박한 | 5 | 5 | 0 | 매우 심각함·절박함이라는 희귀 정밀 형용사 |
| 72 | new | embezzle | 횡령하다 | 5 | 5 | 0 | 횡령이라는 전문 금융·법률 동사 |
| 73 | new | encrusted | 표면에 두껍게 덮인 | 5 | 5 | 0 | 두꺼운 표면 피복이라는 희귀 상태 수식어 |
| 74 | new | insubordinate | 지시에 불복하는 | 5 | 5 | 0 | 명령 불복종이라는 희귀 조직·태도 수식어 |
| 75 | new | lure | 유인하다; 매력, 미끼 | 5 | 4 | 1 | 유인·미끼의 고급 동사·명사 |
| 76 | new | misdirect | 잘못 안내하다, 엉뚱한 곳으로 보내다 | 5 | 3 | 2 | 잘못 안내·배송한다는 중급 업무 의미; direct=2와 의미 연결 |
| 77 | new | mishap | 작은 사고, 불상사 | 5 | 4 | 1 | 불상사라는 비교적 문어적인 고급 사건 명사 |
| 78 | new | obstruct | 막다, 방해하다 | 5 | 3 | 2 | 통행·업무 등을 막는 중급 동사 |
| 79 | new | revitalize | 활력을 되찾게 하다 | 5 | 4 | 1 | 활력 회복을 정밀하게 표현하는 고급 동사 |
| 80 | new | underhanded | 부정직한, 은밀한 | 5 | 5 | 0 | 부정직·은밀함을 함축하는 희귀 태도 수식어 |
| 81 | existing | avoid | 방지하다 | 1 | 1 | 0 | 일상적인 회피·방지의 기초 동사 |
| 82 | existing | brand new | 아주 새로운, 새것인 | 1 | 1 | 0 | 아주 새롭다는 기초 일상 표현 |
| 83 | existing | company | 동료, 일행, 손님, 회사 | 1 | 1 | 0 | 회사·일행이라는 기초 대표 뜻 |
| 84 | existing | e-mail | 이메일; 이메일을 보내다 | 1 | 1 | 0 | 기초 일상 통신 수단 |
| 85 | existing | full | 가득 찬, 완전한 | 1 | 1 | 0 | 기초 상태 형용사 |
| 86 | existing | practice | 연습, 관행 | 1 | 1 | 0 | 연습이라는 기초 대표 뜻 |
| 87 | existing | back injury | 허리 부상 | 2 | 2 | 0 | 기본 건강·부상 명사구 |
| 88 | existing | bother | 괴롭히다 | 2 | 2 | 0 | 괴롭힘·번거로움의 기본 의미 |
| 89 | existing | bounce | (수표 등이) 부도가 나 되돌아오다 | 2 | 2 | 0 | 수록 뜻은 공이 튀는 의미가 아닌 수표 반송의 기본 금융 용법 |
| 90 | existing | companion | 동반자 | 2 | 2 | 0 | 동반자라는 기본 명사 |
| 91 | existing | cross the street | 길을 건너다 | 2 | 1 | 1 | 길을 건너는 기초 일상 행동 |
| 92 | existing | currency exchange | 환전 | 2 | 2 | 0 | 기본 여행·환전 표현 |
| 93 | existing | dislike | 싫어하다 | 2 | 1 | 1 | 기초 선호·감정 동사 |
| 94 | existing | elect | 선출하다 | 2 | 2 | 0 | 기본 선출 의미 |
| 95 | existing | figure | 수치; 인물 | 2 | 2 | 0 | 수치·인물이라는 기본 다의어 |
| 96 | existing | file folder | 서류철 | 2 | 2 | 0 | 기본 사무용품 명사구 |
| 97 | existing | free admission | 무료 입장 | 2 | 2 | 0 | 기본 입장·행사 표현 |
| 98 | existing | investor | 투자가 | 2 | 2 | 0 | 기본 금융·업무 명사 |
| 99 | existing | network | 통신망, 인적 관계망 | 2 | 2 | 0 | 기본 통신·인적 관계 의미 |
| 100 | existing | pick up passengers | 승객을 태우다 | 2 | 2 | 0 | 기본 교통 행동 표현 |
| 101 | existing | relaxing | 긴장을 풀어 주는 | 2 | 2 | 0 | 편안함을 나타내는 기본 형용사 |
| 102 | existing | release date | 발표 일시 | 2 | 2 | 0 | 기본 일정·발표 표현 |
| 103 | existing | role | 역할 | 2 | 2 | 0 | 기본 역할 명사 |
| 104 | existing | take an examination | 시험을 치르다 | 2 | 1 | 1 | 시험을 치른다는 기초 학교 표현 |
| 105 | existing | turn out | ~으로 판명되다 | 2 | 3 | 1 | 판명되다라는 비문자적 중급 구동사 의미 |
| 106 | existing | alteration | 변화, 개조 | 3 | 3 | 0 | 변화·개조의 중급 업무 명사 |
| 107 | existing | biannual | 연 2회의 | 3 | 3 | 0 | 연 2회라는 중급 일정 수식어 |
| 108 | existing | commonplace | 평범한 일, 흔한 일; 평범한, 흔한 | 3 | 3 | 0 | 평범함·흔함을 나타내는 문어 중급 의미 |
| 109 | existing | consultation | 상담, 협의 | 3 | 3 | 0 | 상담·협의의 중급 업무 명사 |
| 110 | existing | conversion | 전환 | 3 | 3 | 0 | 전환의 중급 추상 명사 |
| 111 | existing | defeat | 패배시키다; 패배 | 3 | 2 | 1 | 일반 경기·경쟁의 기본 의미 |
| 112 | existing | diminish | 줄어들다 | 3 | 3 | 0 | 감소의 중급 문어 동사 |
| 113 | existing | in short | 요컨대 | 3 | 2 | 1 | 요약을 나타내는 기본 연결 표현 |
| 114 | existing | injection | 주사 | 3 | 3 | 0 | 건강·의료의 중급 명사 |
| 115 | existing | landing | 착륙 | 3 | 2 | 1 | 일반 항공·여행의 기본 명사 |
| 116 | existing | landscaping | 조경 | 3 | 3 | 0 | 조경의 중급 시설·업무 의미 |
| 117 | existing | leftover | 남은; (-s) 남은 음식 | 3 | 2 | 1 | 남은 음식·물건의 기본 일상 의미 |
| 118 | existing | loaded with | (짐을) 실은 | 3 | 2 | 1 | 수록 뜻은 비유가 아닌 짐을 실은 기본 사진·운송 표현 |
| 119 | existing | maintenance cost | 유지비 | 3 | 2 | 1 | 기본 유지비·비용 표현 |
| 120 | existing | not only a but also b | A뿐만 아니라 B도 | 3 | 1 | 2 | A뿐 아니라 B도라는 기초 학교 문법 표현 |
| 121 | existing | partnership | 제휴, 협력 | 3 | 3 | 0 | 제휴·협력의 중급 업무 의미 |
| 122 | existing | proofread | 교정보다 | 3 | 3 | 0 | 교정이라는 중급 출판·업무 동사 |
| 123 | existing | ramp | 경사로 | 3 | 2 | 1 | 기본 시설·접근로 사물 명사 |
| 124 | existing | realization | 깨달음, 자각, 인식 | 3 | 3 | 0 | 깨달음·인식의 중급 추상 명사 |
| 125 | existing | renewable | 갱신 가능한; 재생 가능한 | 3 | 3 | 0 | 갱신·재생 가능성의 중급 수식어 |
| 126 | existing | rewarding | 보람 있는, 만족감을 주는 | 3 | 3 | 0 | 보람·만족의 중급 평가 형용사 |
| 127 | existing | stack | 더미; 쌓아 올리다 | 3 | 2 | 1 | 일상 사물의 더미·쌓기라는 기본 의미 |
| 128 | existing | standing room | 입석 | 3 | 2 | 1 | 기본 입석·좌석 안내 표현 |
| 129 | existing | stay tuned | 채널을 고정시키다 | 3 | 2 | 1 | 방송을 계속 시청하라는 기본 안내 표현 |
| 130 | existing | suite | (호텔의) 스위트룸 | 3 | 2 | 1 | 숙박 예약의 기본 객실 명사 |
| 131 | existing | telecommute | 재택근무하다 | 3 | 3 | 0 | 재택근무라는 중급 고용 의미 |
| 132 | existing | turn up | 나타나다, 찾게 되다 | 3 | 3 | 0 | 나타남·발견이라는 중급 구동사 의미 |
| 133 | existing | whipped cream | 휘핑크림 | 3 | 2 | 1 | 기본 음식 명사구 |
| 134 | existing | be of particular interest to | ~가 특별히 관심을 가질만하다 | 4 | 3 | 1 | 특별한 관심 대상이라는 중급 문어 표현 |
| 135 | existing | brokerage | 중개, 중개업소 | 4 | 4 | 0 | 중개업의 전문 금융·업무 의미 |
| 136 | existing | censure | 비난; 비난하다 | 4 | 4 | 0 | 공식 비난이라는 고급 문어 의미 |
| 137 | existing | compilation | 편집, 편집물 | 4 | 4 | 0 | 편집·편집물의 고급 명사 |
| 138 | existing | confine | 제한하다, ~에 한정시키다 | 4 | 3 | 1 | 제한·한정의 중급 문어 동사 |
| 139 | existing | contagious | 전염성의 | 4 | 3 | 1 | 전염성이라는 중급 건강 수식어 |
| 140 | existing | dehydration | 탈수(증) | 4 | 4 | 0 | 탈수라는 전문 건강 명사 |
| 141 | existing | make a conclusion | 결론을 내리다 | 4 | 2 | 2 | 수록 뜻은 결론을 내린다는 기본 사고 표현 |
| 142 | existing | mend | 수선하다 | 4 | 2 | 2 | 수선하다라는 일상적인 기본 행동 |
| 143 | existing | neutral | 중립적인 | 4 | 3 | 1 | 중립성의 중급 평가 형용사 |
| 144 | existing | striking difference | 두드러지는 차이점 | 4 | 3 | 1 | 차이를 강조하는 중급 문어 표현 |
| 145 | existing | surrender | 반납하다, 양도하다; 항복하다 | 4 | 4 | 0 | 반납·양도·항복의 고급 다의어 |
| 146 | existing | testimony | 증언 | 4 | 4 | 0 | 증언이라는 고급 법률 명사 |
| 147 | existing | fortify | 강화하다, 튼튼히 하다 | 5 | 4 | 1 | 강화라는 고급 문어 동사 |
| 148 | existing | nourish | ~에 영양분을 주다, 장려하다 | 5 | 3 | 2 | 영양 공급·장려의 중급 건강·일반 독해 동사 |
| 149 | existing | remembrance | 추억 | 5 | 3 | 2 | 수록 뜻은 추억이라는 일반 중급 개념 |
| 150 | existing | without respect to | ~을 고려하지 않고, ~을 무시하고 | 5 | 4 | 1 | 고려하지 않음·무시라는 고급 문어 표현 |

### 후속 확인과 보존

위 큰 차이 목록과 연속 구간의 별도 제안을 반영하고 신규·기존 상위 레벨의 유사 사례를 검토한 뒤, 새 버전에서 키 무결성과 독립 표본을 다시 확인하는 것이 적절하다. 현재 파일을 수정하거나 분류표를 적용·배포하지 않았다.

기존 문서 첫 67,153바이트의 SHA-256 `d2dc55ebba7c2771979d378177f5f7d56659b7c2e7397c779f768b8b63e22a65`를 보존하고 이 절만 추가했다. 저장 후 표본150개/집합80·70/레벨별 배분, 수정 목록·통계·연속72개를 재확인했으며 데이터 파일의 검토 전후 해시도 동일함을 확인했다.
