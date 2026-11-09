# 6차 리뷰: 토익 데이터 품질 + 디자인 다듬기 (Claude 리뷰어, 읽기 전용)

기준: docs/tasks/review-6.md, docs/tasks/toeic-examples-v2.md, docs/tasks/ui-8-unslop.md.
테스트: `node test/core.test.js` 41 통과, `node test/toeic.test.js` 6 통과, `node --check app.js sw.js` OK.
브라우저: `npx serve -l 5180 .` + Playwright headless(Chromium), 390×844, 라이트/다크 각각 새 컨텍스트(SW 차단, speechSynthesis 모킹).

## 판정: **수정 필요** (작은 범위)
- **데이터:** 이번에 새로 쓴 2780 예문은 표본 오류율 1%(1/100)로 **통과**다. 다만 작성 대상에서 빠진 기존 예문 중 `The chef prepared the X for the guests.` 틀 24개와 `The report describes the detail in detail.` 1개가 남아 있다.
  - 이 중 15개는 뜻이 성립하지 않는다(구급차·동굴·채굴을 손님에게 "준비").
  - 이 15개(문제 1번)와 중복 예문(문제 3번)을 고치면 배포 가능하다.
- **디자인:** 지시서 방향을 잘 지켰고 로직 회귀가 없다. 작은 글씨 muted 색의 대비 부족(문제 2번)만 고치면 배포 가능하다.

## 문제 (심각도 순)

### 1. [높음] 데이터: 틀 예문 25개가 남아 있고 15개는 뜻이 성립하지 않음
- **파일:줄** `packages/toeic.json` 아래 표의 index
- **문제** 총괄 확인의 "남은 템플릿 예문 0"과 다르다.
  - 작성 대상(targets-1..4, 2780개)에 들어가지 않은 3024개 중 `The chef prepared the X for the guests.`가 24개, `The report describes the detail in detail.`이 1개 남아 있다.
  - 9119042의 1차 수정에서 같은 틀의 wagon(3614)은 고쳤지만, 같은 틀의 나머지는 그대로다.
- **재현** `node -e "const W=require('./packages/toeic.json').words;W.forEach((w,i)=>/The chef prepared the|describes the detail in detail/.test(w[3])&&console.log(i,w[0],w[3]))"` → 25줄.
- **고칠 방향**
  - 아래 표의 15개를 제안값으로 교체한다.
  - 뜻은 통하지만 틀인 10개(55 cereal, 593 appetizer, 1380 seafood, 1433 spice, 1652 beverage, 1767 flour, 5159 loaf, 5187 oyster, 5229 refreshments, 5623 entrée)는 우선순위 낮음으로, v2와 같은 방식으로 다시 쓴다.
  - 전수 검사에 틀 검출(같은 틀 3회 이상)을 추가하길 권한다.

| index | en | 필드 | 현재 ex | 제안 ex / exKo |
|---|---|---|---|---|
| 20 | bakery | ex, exKo | The chef prepared the bakery for the guests. | The bakery across the street sells fresh bread every morning. / 길 건너편 제과점은 매일 아침 갓 구운 빵을 판다. |
| 509 | procedure | ex, exKo | The chef prepared the procedure for the guests. | Follow the safety procedure before operating the machine. / 기계를 작동하기 전에 안전 절차를 따르세요. |
| 628 | automobile | ex, exKo | The chef prepared the automobile for the guests. | The automobile plant hired two hundred new workers this year. / 그 자동차 공장은 올해 신규 직원 200명을 채용했다. |
| 731 | cave | ex, exKo | The chef prepared the cave for the guests. | The tour includes a short walk through a limestone cave. / 그 관광에는 석회암 동굴을 잠깐 걷는 일정이 포함된다. |
| 769 | compact car | ex, exKo | The chef prepared the compact car for the guests. | A compact car is easier to park in the city center. / 소형차는 도심에서 주차하기가 더 쉽다. |
| 836 | detail | ex, exKo | The report describes the detail in detail. | Please check every detail of the contract before signing it. / 서명하기 전에 계약서의 세부 사항을 모두 확인하세요. |
| 886 | energy drink | ex, exKo | The chef prepared the energy drink for the guests. | He bought an energy drink before the long drive. / 그는 장거리 운전 전에 에너지 음료를 샀다. |
| 960 | free parking | ex, exKo | The chef prepared the free parking for the guests. | The hotel offers free parking to all registered guests. / 그 호텔은 투숙객 모두에게 무료 주차를 제공한다. |
| 1341 | rental car | ex, exKo | The chef prepared the rental car for the guests. | Please return the rental car with a full tank of gas. / 임대 자동차는 연료를 가득 채워 반납해 주세요. |
| 1619 | ambulance | ex, exKo | The chef prepared the ambulance for the guests. | An ambulance arrived within minutes of the emergency call. / 응급 전화 후 몇 분 만에 구급차가 도착했다. |
| 2888 | layover | ex, exKo | The chef prepared the layover for the guests. | Our flight to Lisbon has a three-hour layover in Paris. / 리스본행 우리 항공편은 파리에서 3시간 경유한다. |
| 3014 | mining | ex, exKo | The chef prepared the mining for the guests. | The mining company plans to open a new site next year. / 그 채굴 회사는 내년에 새 현장을 열 계획이다. |
| 3470 | streetcar | ex, exKo | The chef prepared the streetcar for the guests. | The streetcar stops right in front of the convention center. / 그 전차는 컨벤션 센터 바로 앞에 선다. |
| 4463 | formality | ex, exKo | The chef prepared the formality for the guests. | Signing the visitor log is just a formality at this office. / 이 사무실에서 방문자 명부에 서명하는 것은 형식적인 절차일 뿐이다. |
| 5379 | excavation | ex, exKo | The chef prepared the excavation for the guests. | Excavation of the building site will begin next Monday. / 건설 부지의 발굴 작업은 다음 주 월요일에 시작된다. |

### 2. [중간] 디자인: muted 글자색이 작은 글씨에서 대비 4.5:1 미달
- **파일:줄** `style.css:1` `:root --muted:#7b7266`(라이트), 다크 블록 `--muted:#85858b`
- **문제** 12~13px 텍스트에 쓰인 muted 색의 대비가 부족하다. 지시서 색값을 그대로 쓴 결과라 워커 실수는 아니다.
  - **라이트:** raised(#efe9df) 위 3.92, 배경(#f7f4ee) 위 4.31.
  - **다크:** raised(#232325) 위 4.28.
  - 해당 요소: pos 배지("동", "명/형"), Day 카드의 "Day", 카드 학습 "뜻 떠올리기"·"카드를 탭하면 뜻이 나타나요", 퀴즈 "알맞은 뜻을 골라 주세요", 홈 "학습 완료 0 / 150 Days", 듣기 목록 번호.
  - 주요 버튼(이어서 학습·카드 학습 시작·선택된 칩·하단 메뉴)은 라이트 최소 4.58, 다크 최소 4.79로 통과.
- **재현** 390px 라이트 홈·Day·카드·오답노트에서 계산된 color와 배경으로 WCAG 대비를 계산. 홈은 150개, Day는 21개 요소가 4.5 미만.
- **고칠 방향** 계산값으로 바꾼다. 둘 다 세 배경 모두에서 4.5 이상이다.
  - 라이트 `--muted:#6f665a` → surface 5.46 / bg 5.14 / raised 4.67
  - 다크 `--muted:#939399` → 5.75 / 6.03 / 5.14

### 3. [중간] 데이터: 두 표제어가 같은 예문을 씀
- **파일:줄** `packages/toeic.json` index 3505(take on), 4816(take on responsibility)
- **문제** 두 항목 모두 "We intend to take on responsibility for the new branch."다. 3505(take on: 역할·일을 떠맡다)에는 responsibility가 아닌 일·역할 목적어가 더 맞다.
- **고칠 방향** 3505만 교체한다: `She agreed to take on two new clients this month.` / `그녀는 이번 달에 새 고객 두 명을 맡기로 했다.`

### 4. [낮음] 데이터: practitioner의 ko "전문의"가 예문 해석을 틀리게 만듦 (표본에서 발견된 유일한 오류)
- **파일:줄** `packages/toeic.json` index 5480
- **문제** "medical practitioner"는 의사(일반 개업의 포함)이고 전문의(specialist)가 아니다. exKo가 "경험 많은 전문의"로 옮겨 뜻이 바뀌었다.
- **고칠 방향** ko는 이번 작업에서 불변이었으므로 다음 데이터 작업에서 다음과 같이 고친다.
  - ko: `개업의, (전문직) 종사자`
  - exKo: `경험 많은 의사가 새 진료소에서 환자들을 진찰할 예정이다.`

### 5. [낮음] 데이터: 1차 수정 71건 중 뜻이 좁아진 것 3건 (나빠진 것은 없음)
| index | en | 필드 | 현재 | 제안값 |
|---|---|---|---|---|
| 2342 | cite | ko | 인용하다 | 인용하다, (이유·예로) 들다 — 토익 빈출 "cited rising costs" 용법이 빠짐 |
| 3604 | vary from A to B | ko | A에서 B까지 다양하다 | A에서 B까지 다양하다, ~마다 다르다 — 예문(vary from region to region)은 "지역마다 다르다" |
| 2395 | conjunction | ko | 결합, 접속사 | 결합; (in conjunction with) ~와 함께 — 예문이 in conjunction with |

- **나머지 68건:** 수정이 맞다. 특히 형용사구·부사구를 명사 자리에 넣은 비문 5건(861, 911, 3614, 3821, 4455)의 교체가 적절하다.
- **로그 이유 오류(결과 ko는 무난):**
  - 2631 fluid의 "마실 것 뜻 없음"은 틀렸다(fluids = 수분·음료).
  - 2509 distraction의 "기분 전환 뜻 없음"도 틀렸다.
  - 4326 constituency의 "고객층 뜻 없음"도 틀렸다.
- **로그와 현재 값 차이:** exKo 5건(123, 1337, 1340, 1520, 4346)은 로그의 after와 현재 값이 다르다. v2에서 예문 전체를 새로 쓴 결과라 정상이다.
- **표제어 문제:** 로그에 적힌 5584 whereabout(5802 whereabouts와 중복 가능)는 아직 그대로다. 표제어 정리 때 함께 처리하길 권한다.

### 6. [낮음] 데이터: 파트 간 문체 차이 (A-3)
- **문제** exKo 문말이 파트마다 다르다. 같은 Day 안에서 문체가 섞인다.

  | 파트 | 합니다체 비율 |
  |---|---|
  | 1 | 694/695 |
  | 2 | 63/695 |
  | 3 | 58/695 |
  | 4 | 24/695 |

  내용 품질 차이는 표본에서 눈에 띄지 않았다. 문장 길이 평균도 비슷하다(9.5~11.1단어).
- **고칠 방향** 해라체로 통일한다(파트 1만 변환, 사람 검토 필요).

### 7. [낮음] 데이터: 작성 대상 밖 기존 예문의 틀 문장 다수 (참고)
- **문제** 위 1번 외에도 3024개 중 같은 틀이 많다. 문법은 맞지만 단어 쓰임을 보여 주지 못한다.
  - "We intend to"(373), "We would like"(282), "We decided to"(262), "We agreed to"(261), "The team discussed the [형] [명] at the meeting."(165), "Please inspect the X before use."(76) 등.
  - "The team discussed the …" 틀은 exKo가 "진짜의 문서", "전염성의 감염"처럼 어색한 "~의"가 된다.
  - 어색한 용례도 있다: 4396 displace ("displace the temporary shelving with permanent storage" — replace가 맞음), 4400 distort ("agreed to distort the image").
- **고칠 방향** 다음 데이터 라운드에서 "The team discussed the"·"Please inspect the"·"The inspector/interviewer described … as" 틀(약 300개)을 우선 다시 쓴다.

### 8. [낮음] app.js: 사용하지 않게 된 계산 + 라벨 문자열로 스타일 분기
- **파일:줄** `app.js:346`, `app.js:101`(meter)
- **문제**
  - 홈 재설계 후 `known`(단어장 전체 아는 단어 수)을 계산만 하고 쓰지 않는다. 5804단어를 홈 렌더마다 순회한다.
  - `meter()`가 `label === '아는 단어 비율'` 문자열 비교로 형광펜 클래스를 붙인다. 문구를 바꾸면 스타일이 조용히 빠진다.
- **고칠 방향**
  - `known` 줄을 삭제한다.
  - meter에 `known` 인자(또는 class 인자)를 받게 한다. 렌더 템플릿 범위 안의 변경이다.

## 확인 결과 (문제 없음)

**A-2 새 예문 표본 100개** (out-1..4 각 25개, 고정 시드 무작위)
- 오류: 1개(위 4번), 오류율 **1%**로 2% 기준 통과.
- 품사·뜻 일치, 문법, exKo 일치는 모두 양호하다.
- 출판사 복사가 의심되는 문장은 없다. 모두 일반적인 업무 맥락의 고유 문장이다(원문 대조는 하지 않음, 추측).
- 병합: 2780개 모두 out 파일과 toeic.json이 일치한다. 9119042 대비 en·ko·pos 변경 0, ex·exKo 변경 2780.
- 중복·누락: out 안의 중복 예문 0, 예문·해석 누락 0. 표제어 포함 검사에서 걸린 45개는 하이픈 표제어를 내 검사식이 잘못 처리한 것이고 실제 누락은 0.

**B-1** app.js diff는 렌더 문자열·아이콘 SVG·문구뿐이다.
- 로직·라우팅·저장 코드 변경 없음.
- 정답/오답 피드백 2줄(app.js:530, 532)도 문자열만 바뀌었다.

**B-2** 390px 라이트/다크에서 홈·Day·카드(앞/뒤/결과)·퀴즈(문제/채점/결과)·오답노트·설정·듣기를 확인했다.

| 항목 | 결과 |
|---|---|
| 가로 스크롤 | 모든 화면 0 |
| 이모지·문자 아이콘 | 0. 설정의 "→" 4개는 가져오기 형식 설명문 속 화살표라 허용으로 판단 |
| 콘솔 에러 | 0 (SW 차단 안내 1건은 내 테스트 설정) |
| 레벨 칩 | 한 줄, overflow-x auto, 높이 52px, 넘치는 칩은 가로 스크롤 |
| 오늘의 Day 카드 | 첫 단어 3개, 아는 단어 막대(형광펜), 이어서 학습 버튼 |
| 결과 점수 | primary 색 (라이트 #157964 / 다크 #5fcf9f) |
| focus-visible | 2px solid primary, offset 2 |

**B-3** 기존 동작 회귀 없음.

| 동작 | 결과 |
|---|---|
| 아는 단어 체크 | 체크 후 `known` 저장 1건 |
| 뜻 가리기 | 0 → 40개 hidden |
| 발음 버튼 | 예문 발화 |
| 듣기 | 재생 시 aria-pressed true |
| 백업 내보내기 | 다운로드 `vocab-master-2026-11-09.json` |
| 카드·퀴즈 끝까지 진행 | 결과 화면 정상 |

- **sw.js:** `CACHE_VERSION = vocab-master-shell-v11-unslop`, 셸 목록은 이전과 같은 10개.
- **manifest·index.html:** manifest theme/background와 index.html theme-color(라이트/다크 media)가 새 배경색이다.

**B-4** 지시서 방향 이탈은 없다.
- **굵기:** 400/500/600만 쓴다.
- **글자 모양:** 대문자 변환·자간 벌림 없음(letter-spacing은 0만).
- **반경:** 6/8/10/16/20만 쓰고, 알약 모양 99px은 없다.
- **간격:** margin·padding·gap·높이는 모두 4의 배수다(`.icon` 18px은 지시서 허용 아이콘 크기).
- **강조색·형광펜:** `--primary`는 주요 버튼·선택 칩·현재 탭 글자·결과 점수·focus 링에만, `--highlight`는 아는 단어 막대·예문 표제어에만 쓴다.
- **그림자:** 다크 none, 라이트 `0 1px 2px rgba(0,0,0,.05)`.
- **transition:** 허용 속성만 140ms로 쓴다.
- 이 밖에 주의할 점은 2번 대비뿐이다.

## 확인 못 한 것
- 1024px 화면(지시서 검증 항목이지만 review-6은 390px만 요구), 실기기, 스크린리더.
- 출판사 교재 원문과의 직접 대조.

## 정리
- 5180 서버를 종료했다(리스너 없음). Playwright 브라우저를 닫았다.
- 스크린샷과 9119042 추출본은 스크래치에만 만들었고 삭제했다. 프로젝트에 `.playwright-mcp/`는 없다.
- `git status`는 리뷰 전과 같다(이 문서만 추가).
