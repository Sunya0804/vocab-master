# 토익 레벨 정렬 리뷰

검토일: 2026-11-09. 판정: **수정 필요**.

**정렬·levels 해석·화면 표시는 정상이며 정렬 적용 자체는 확인했다.** 다만 정렬 전 순서를 고정한 토익 전용 테스트와 검증 메타데이터가 현 패키지와 맞지 않아 후속 정리가 필요하다. 무작위 50개에서는 뜻·예문 연결의 보완 대상 2항목도 발견했다. 정렬로 다른 행의 필드가 섞였다는 증거는 발견하지 못했으며, 이 내용 문제가 정렬 때문에 생겼다고 단정하지 않는다.

지시서: `docs/tasks/review-toeic-sort.md`, 정렬 요구: `docs/tasks/toeic-sort.md`. 이 리뷰 문서만 작성했다. 패키지·분류표·코드·테스트·기존 리뷰는 수정하지 않았다.

## 1. 검토 대상과 검증 한계

| 파일 | SHA-256 |
| --- | --- |
| packages/toeic.json | c2371ea07144ee91885a549a6f901eb5e129ffa74d86632c37931bda8f8cd36c |
| packages/suneung.json | b2e6ea86dd4d62f8f9dd1051e1c29c7960bf665c7270bba8c5e388e4afdd68ae |
| docs/toeic-levels.json | 749a2c97b2c291efdcf26d721f4f1a0bd5e122996d16744143d4ad9384352d97 |
| core.js | aa676d3ab076728ce0abb989d5664d3141dc4e3941986a4dcc4f60b18ff58885 |

정렬 전 전체 원본이 없어 5,804개 항목의 다섯 필드가 한 글자도 바뀌지 않았는지, 전체에서 안정 정렬됐는지를 완전 대조할 수 없다. 중복·빈 필드·정렬 순서를 전수 검사하고 무작위 50개 항목의 en/ko/pos/ex/exKo를 읽었다. 추가로 출처 감사 기록에 남은 기존 entryIndex를 이용해 식별 가능한 **2,735개 고유 표제어 부분집합**에서 레벨 안의 상대 순서를 대조했고 역전은 **0건**이었다. 이는 해당 부분집합의 안정 정렬 근거이며 나머지 항목까지 확대하지 않는다.

## 2. 전체 구조·정렬·레벨 검사

| 검사 | 결과 |
| --- | --- |
| 항목 / 대소문자 무시 고유 표제어 | 5804 / 5804 |
| 중복 표제어 / 비어 있거나 문자열이 아닌 필드 | 0 / 0 |
| 5개 문자열 필드 | 5804개 모두 통과 |
| 분류표 키 누락 / 추가 / 유효하지 않은 레벨 | 0 / 0 / 0 |
| 레벨 내림 역전 | 0 |
| 최상위 키 순서 | id, name, desc, levels, words |
| levels 형식 | 수능과 같은 {name: 문자열, days: 양의 정수} 객체 배열 |
| 레벨 이름 | 분류표의 Lv1 기초 / Lv2 기본 / Lv3 중급 / Lv4 고급 / Lv5 고난도와 일치 |
| 레벨 days / 합 | 23 / 76 / 110 / 58 / 24 = 291 |
| Core.chunkDays / Core.dayLevels | 291 Days / 291개 이름, null 0 |
| 마지막 Day | Day 291, 4단어 |

| 레벨 | 실제 분류 단어 수 | 표시 Day 수 | 표시 구간 |
| --- | --- | --- | --- |
| Lv1 기초 | 454 | 23 | Day 1–23 |
| Lv2 기본 | 1528 | 76 | Day 24–99 |
| Lv3 중급 | 2195 | 110 | Day 100–209 |
| Lv4 고급 | 1168 | 58 | Day 210–267 |
| Lv5 고난도 | 459 | 24 | Day 268–291 |

앞 네 레벨의 days가 각각 `Math.round(단어 수/20)`이고 마지막이 전체 291일의 나머지인지 확인했다. 수치는 정렬 지시와 일치한다. `core.js`의 `dayLevels`는 단어별 map을 조회하지 않고 levels의 days만큼 앞에서부터 이름을 부여하며 마지막 레벨에 남은 Day를 모두 배정한다. 현 입력을 올바르게 해석했다.

## 3. 레벨 경계 Day의 혼합

| Day | 화면 레벨 | 단어별 실제 레벨 | 첫 단어 | 마지막 단어 |
| --- | --- | --- | --- | --- |
| 23 | Lv1 기초 | Lv1 14개 + Lv2 6개 | straight | attendee |
| 24 | Lv2 기본 | Lv2 20개 | audit | enroll |
| 99 | Lv2 기본 | Lv2 20개 | transport | worldwide |
| 100 | Lv3 중급 | Lv2 2개 + Lv3 18개 | worth | dependable |
| 209 | Lv3 중급 | Lv3 17개 + Lv4 3개 | use-by date | pertinent |
| 210 | Lv4 고급 | Lv4 20개 | premises | respondent |
| 267 | Lv4 고급 | Lv4 20개 | uneasy | widely publicized |
| 268 | Lv5 고난도 | Lv4 5개 + Lv5 15개 | willingness | barring |
| 291 | Lv5 고난도 | Lv5 4개 | viciously | wit |

혼합 Day는 **23·100·209·268의 4개**뿐이고 모두 인접한 두 레벨만 포함한다. 화면 Day 레벨과 다른 단어는 **16/5804 = 0.276%**다(각 혼합 Day에서 6·2·3·5개). 혼합 Day에서도 표시 레벨에 해당하는 단어가 70% 이상이며, 표시된 레벨이 전혀 없는 Day는 없다.

**허용 가능 의견:** Day당 20단어를 유지하면서 레벨별 Day 수를 반올림하라는 현 지시의 결과다. 혼합이 경계 4일에만 제한되고 대부분의 단어가 표시 레벨과 맞으므로, 대략적인 학습 난이도 안내로 수용할 수 있다. 정렬 실패나 core 해석 오류로 보지 않는다.

## 4. 테스트 결과와 수정 필요 사항

### P1. 정렬 이후 토익 전용 회귀 검사 계약 불일치

실행 결과:

```text
node test/core.test.js
41 passed, 0 failed

node test/toeic.test.js
ok - all 5,804 TOEIC entries have usable five-field metadata and original short examples
AssertionError at test/toeic.test.js:105
exit code 1
```

`test/toeic.test.js:105`는 현재 앞 260개 항목의 en/ko 순서 해시를 정렬 전 원본 해시와 비교하므로 정상적인 재정렬에도 실패한다. 실제 첫 260개 해시는 `b545bba6dc8cd2dbf549f18b51e820053a6fc1ebf45aa8034c95d8ba5086d263`, 기대값은 `4e39ae28e670f21a52dca7c6ed4214d74c8e03d6e291d76d6080e41abb20195e`였다. 이 실패 뒤의 테스트들은 일반 실행에서 중단되어 통과 여부를 주장하지 않는다.

같은 테스트에 다음 구계약도 남아 있다.

- `test/toeic.test.js:108–109`: legacy 순서와 전체 words의 순서 민감 해시를 정렬 전 값에 고정한다. 현재 words 전체 해시는 `10470dfa044918591a02a6c8ce2cf61b197e743262653d59accf90bf036e2b26`, 출처 기록의 결과 해시는 `67b38b9522f95473c10a53acace0d7bdc7e2d2f70a23df2c386cd59249297949`다. 순서 변경만으로도 달라질 수 있으므로 이 차이 자체는 내용 변조의 증거가 아니다.
- `test/toeic.test.js:116`: 토익의 dayLevels가 전부 null이어야 한다고 기대하여 이번 levels 추가와 충돌한다.
- 출처 검사의 `row.entryIndex`는 정렬 전 위치다. 기록된 **3097/3097개 출처 행**의 entryIndex가 현재 위치와 다르다(고유 표제어는 2735개). 표제어가 없다는 뜻은 아니다.

**후속 수정 제안:** 정렬 후의 테스트는 표제어를 키로 필드·출처 포함 여부를 확인하고, 정렬 전 순서 보존 검사는 당시 스냅샷/fixture 대상으로 남긴다. 단어 내용 불변 검사는 순서 독립 방식으로, 안정 정렬 검사는 정렬 전 fixture와 새 배열의 레벨 내 상대 순서로 검증하는 것이 적절하다. 기존 출처 감사의 역사적 entryIndex/해시를 무작정 덮어쓰기보다 버전 의미를 명시하거나 정렬 후 검증 기록을 별도로 둔다. 토익이 levels를 가지는 현재 계약도 검사에 반영한 뒤 두 테스트 파일을 모두 다시 실행해야 한다.

정렬 작업 지시가 패키지 파일만 수정하도록 한 점을 감안하면 이는 정렬 알고리즘의 실패와 별개인 후속 검증 정리 사항이다. 이번 읽기 전용 리뷰에서는 고치지 않았다.

### P2. 무작위 표본의 뜻·예문 연결 보완

반드시 보완할 내용은 **2/50항목 = 4.00%**다. 순번은 정렬 후 1기반 위치다. 선택적 문체 개선은 이 수치에 합산하지 않았다. 아래에서 영어 예문 자체를 다른 행과 섞였다고 판정한 것은 아니다.

| 순번 | 단어 | 필드 | 현재 값 | 제안 수정값 | 판단 근거 |
| --- | --- | --- | --- | --- | --- |
| 3599 | vaccination | ko | 백신, 예방 접종 | 예방 접종 | vaccination은 접종 행위·과정이고 백신 자체는 vaccine이다. [Cambridge vaccination](https://dictionary.cambridge.org/us/dictionary/english/vaccination?topic=immunology-and-vaccination) |
| 3599 | vaccination | exKo | 진료소는 백신에 관한 정보를 제공했다. | 진료소는 예방 접종에 관한 정보를 제공했다. | 영문의 about the vaccination과 일치하도록 수정 |
| 4444 | face away from | ko | ~으로부터 고개를 돌리다 | ~의 반대쪽을 향하다; ~에게서 고개를 돌리다 | 예문의 주어는 책상이며 방향을 향하는 상태를 뜻한다. 현재 해석은 맞지만 ko에 그 의미가 빠져 있다. [Collins face](https://www.collinsdictionary.com/us/dictionary/english/face) |

선택적 자연스러움 개선(필수 오류 수에서 제외):

| 순번 | 단어 | 필드 | 현재 값 | 제안 수정값 | 이유 |
| --- | --- | --- | --- | --- | --- |
| 3893 | gloomy | exKo | 팀은 회의에서 우울한 방에 관해 논의했다. | 팀은 회의에서 어둡고 음침한 방들에 관해 논의했다. | 공간의 gloomy를 더 자연스럽게 설명하는 선택적 개선. 우울한 방도 비유적으로 해석 가능하므로 명백한 의미 오류율에서는 제외. [Cambridge gloomy](https://dictionary.cambridge.org/dictionary/english/gloomy) |
| 5682 | lax | ex | The manager described the proposal as lax. | The manager criticized the lax safety rules. | proposal보다 규정·관리의 느슨함을 직접 보여 주는 학습 예문 권고. 현재 문장에 생략된 정책 맥락이 가능하므로 확정 오류에서는 제외. [Collins lax rules](https://www.collinsdictionary.com/dictionary/english/lax-rules) |
| 5682 | lax | exKo | 관리자는 그 제안이 느슨한 것이라고 설명했다. | 관리자는 느슨한 안전 규정을 비판했다. | 영문을 위 제안으로 바꿀 때 함께 적용할 해석 |

## 5. 무작위 50개 판정 기록

시드 `vocab-master-toeic-sort-review-2026-11-09`의 Python `random.Random`을 사용해 `sorted(rng.sample(range(5804), 50))`를 비복원 추출했다. 순번·단어 목록을 고정한 뒤 다섯 필드의 의미·품사·예문·번역 대응을 읽었다. 정렬 전 원본이 없는 상태에서 다른 항목의 필드가 기계적으로 붙은 흔적은 표본에서 발견하지 못했다. 모든 필드의 역사적 불변을 증명하는 검사는 아니다.

| 정렬 후 순번 | 레벨 | 단어 | 판정 | 메모 |
| --- | --- | --- | --- | --- |
| 2 | 1 | benefit | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 70 | 1 | control | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 107 | 1 | final | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 143 | 1 | hang | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 168 | 1 | knife | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 213 | 1 | on time | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 390 | 1 | gas | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 467 | 2 | colleague | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 703 | 2 | business management | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 790 | 2 | correction | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 814 | 2 | cut down | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 894 | 2 | escape | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 939 | 2 | flood | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 1213 | 2 | on duty | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 1278 | 2 | politics | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 1444 | 2 | stamp | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 1536 | 2 | travel agency | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 1583 | 2 | windy | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 1658 | 2 | board | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 1772 | 2 | frozen | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 1865 | 2 | penny | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 2018 | 3 | finalize | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 2305 | 3 | bulletin board | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 2952 | 3 | make a complaint | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 3040 | 3 | My schedule doesn't permit it. | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 3123 | 3 | overuse | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 3289 | 3 | reflection | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 3356 | 3 | sales trend | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 3416 | 3 | sleeve | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 3473 | 3 | strict | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 3599 | 3 | vaccination | 보완 필요 | 뜻·해석의 백신/예방 접종 구분 |
| 3686 | 3 | appetite | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 3893 | 3 | gloomy | 선택적 개선 | 방을 수식하는 해석의 자연스러움 |
| 4299 | 4 | collateral | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 4416 | 4 | dumping | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 4444 | 4 | face away from | 보완 필요 | 책상 방향이라는 예문 의미를 ko에 보완 |
| 4556 | 4 | maternity ward | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 4583 | 4 | novice | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 4645 | 4 | preferential treatment | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 4808 | 4 | sustain | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 4900 | 4 | absurd | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 4956 | 4 | breed | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 5061 | 4 | disgusting | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 5224 | 4 | railing | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 5355 | 5 | ambiance | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 5368 | 5 | elicit | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 5441 | 5 | levy | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 5568 | 5 | tranquility | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 5676 | 5 | inner-city | 통과 | 다섯 필드에서 수정 필요 미발견 |
| 5682 | 5 | lax | 선택적 개선 | 규정·관리 문맥으로 예문을 더 구체화 |

## 6. 실제 앱 표시·Playwright headless

먼저 Dochi 내장 브라우저로 접속을 시도했으나 해당 localhost HTTP origin이 프로젝트에 등록되지 않아 열리지 않았다. 이 제한을 보고한 뒤 지시서에 명시된 **설치된 Python Playwright + Chromium headless**로 실제 앱을 검사했다. 외부의 기존 브라우저 탭이나 사용자 학습 데이터는 사용하지 않았다.

- 서버: `python -B -m http.server 18764 --bind 127.0.0.1`, 주소 `http://127.0.0.1:18764/#/home`.
- Chromium `156.0.8078.4`, headless, viewport `390×844`, 새 격리 context.
- 토익 패키지 선택값 `toeic`, 전체 Day 카드 **291개**.
- Day 목록의 레벨 헤더 **Lv1 기초/Lv2 기본/Lv3 중급/Lv4 고급/Lv5 고난도**를 순서대로 확인.
- 5개 레벨 필터에서 각각 **23/76/110/58/24개** 카드와 해당 전역 Day 시작·끝을 확인.
- 전체 필터 복귀 후 Day 291을 열어 단어 행 **4개**를 확인.
- 초기 로딩·패키지 선택·필터 전환·Day 진입·홈 복귀 동안 **console error 0, uncaught page error 0, requestfailed 0**.

```text
PLAYWRIGHT_HEADLESS_UI_PASSED
consoleErrors: []
pageErrors: []
failedRequests: []
```

검사 종료 후 Playwright context와 브라우저를 닫고 이 작업에서 띄운 서버도 Ctrl+C로 종료했다. 스크린샷·trace·HTML 테스트 리포트·임시 스크립트는 저장하지 않았다. 작업 산출 파일은 이 리뷰 문서 하나다.

## 7. 판정 요약

**수정 필요.** 토익 정렬과 levels 추가, core의 Day 해석, 경계 혼합 수준, 실제 Lv 화면 표시는 통과했다. 다만 토익 전용 회귀 테스트와 정렬 전 검증 메타데이터의 관계를 정리하고, 표본에서 확인한 vaccination/face away from의 뜻·예문 연결을 보완해야 한다. 이 두 종류의 문제를 정렬 중 필드 뒤섞임으로 오인하지 않는다.

리뷰 저장 전후 검토한 패키지·분류표·코드·테스트 해시가 동일함을 확인했다. 코드·데이터 수정이나 배포는 하지 않았다.
