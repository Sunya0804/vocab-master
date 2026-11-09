# Vocab Master — 스펙 (총괄 작성, 워커는 이 문서 기준으로 작업)

한-영 보카 단어장 **PWA** (빌드 도구 없음, 순수 HTML/CSS/JS, 의존성 0). 폰 브라우저에서 "홈 화면에 추가"로 앱처럼 사용, 오프라인 동작.
UI 참고: 이투스 워드마스터(Day 단위 학습, 아는/모르는 단어 체크), 말해보카(큰 카드, 진행바, 밝은 포인트 컬러). **브랜드/로고/디자인 복제 금지 — 구성만 참고.**

## 파일 구조 (담당)
```
index.html, style.css, app.js, sw.js, manifest.json, icon.svg   ← UI 워커
core.js, test/core.test.js                                      ← 코어 워커
packages/index.json, packages/toeic.json                        ← 총괄 (수정 금지)
```
다른 담당의 파일은 수정하지 말 것. 인터페이스가 부족하면 총괄에게 보고.

## 단어 패키지 포맷
`packages/index.json` = 패키지 파일명 배열. 각 파일:
```json
{ "id": "toeic", "name": "토익 필수 보카 240", "desc": "...", "words": [["accommodate", "수용하다, 숙박시키다"], ...] }
```
단어 항목 = `[en, ko, pos?, ex?, exKo?]` (뒤 3개는 선택, 없으면 생략 또는 `""`):
- `pos` 품사 약어: `명` `동` `형` `부` `전` `접` `대` `감`, 여러 개면 `동/명`
- `ex` 영어 예문 (해당 단어가 그대로 또는 활용형으로 포함, 15단어 이내, 토익/수능 맥락)
- `exKo` 예문 한글 해석
예: `["accommodate", "수용하다, 숙박시키다", "동", "The hotel can accommodate up to 300 guests.", "그 호텔은 최대 300명의 투숙객을 수용할 수 있다."]`
기존 2칸 데이터도 유효해야 함 (코드는 `w[2] || ""` 식으로 처리). 출판사 단어장 예문을 그대로 옮기지 말고 직접 작성.

난이도(선택): 패키지에 `"levels": [{"name": "Lv1 기초", "days": 20}, ...]`. words는 쉬운→어려운 순으로 정렬돼 있고, 앞에서부터 각 레벨이 `days`개 Day를 차지(마지막 레벨은 남은 Day 전부로 간주). Day 인덱스는 레벨과 무관한 전역 번호 그대로라 progress 키가 바뀌지 않음. levels가 없거나 형식이 틀리면 무시(레벨 없이 표시).
- core: `dayLevels(pkg)` → Day 인덱스별 레벨 이름 배열(레벨 없으면 전부 `null`).
- UI: 홈 Day 리스트를 레벨 헤더로 묶고, 상단 레벨 칩(전체/Lv1…)으로 필터. "이어서 학습"은 선택된 레벨 안에서 첫 미완료 Day.

Day = words를 20개씩 자른 묶음 (Day 1 = 0~19번). 새 패키지(수능 등)는 JSON 파일 추가 + index.json에 이름 추가만으로 끝나야 함.

## core.js 인터페이스 (브라우저: `window.Core`, Node: `module.exports`)
DOM 사용 금지. 순수 함수 + localStorage 래퍼.
- `chunkDays(words, size = 20)` → `[[...20 words], ...]`
- `wordId(pkgId, word)` → `"toeic:accommodate"`
- `shuffle(arr, rand = Math.random)` → 새 배열
- `makeChoices(answer, pool, n = 4, rand)` → answer 포함, 중복 없는 n개 문자열(셔플). pool이 작으면 가능한 만큼.
- `buildQuiz(words, mode, pool, rand)` → `[{ word:[en,ko], prompt, answer, choices }]`. mode `"en2ko"`(영어 보고 뜻 고르기) | `"ko2en"`. pool = 오답 보기 후보 단어 배열(같은 패키지 전체).
- `parseImport(text)` → `[[en, ko]]`. 줄 단위, 구분자 탭 또는 첫 번째 쉼표, `"..."` 따옴표 지원, 빈 줄·`#` 주석 무시, en/ko 둘 중 하나라도 비면 무시. PDF에서 복사해 붙인 "word 뜻" 형태도 고려: 구분자가 없으면 첫 공백 기준으로 영문/한글 분리 (영어 부분은 한글 시작 전까지).
- 상태: `defaultState()` → `{ known:{}, wrong:{}, custom:[], progress:{} }`
  - `known[id] = true` : 아는 단어
  - `wrong[id] = { pkg, en, ko, pos, ex, exKo, miss, streak }` : 오답노트 (pos/ex/exKo 없으면 "")
  - `custom` : 가져오기로 만든 패키지 객체 배열 (패키지 포맷과 동일, id는 `custom-<timestamp>`)
  - `progress["<pkg>:<dayIndex>"] = { studied:bool, best:number(0~100) }`
- `recordAnswer(state, pkgId, [en,ko], correct)` : 틀리면 오답노트에 추가/miss+1, streak=0, known 해제. 맞으면 오답노트에 있을 때만 streak+1, **streak ≥ 2면 오답노트에서 제거**.
- `markKnown(state, pkgId, [en,ko], known)` : 학습 카드 "알아요/몰라요". 몰라요 → 오답노트에도 추가(miss+1). 오답노트에 있는 단어를 알아요 → recordAnswer(correct)와 동일(streak+1, 2 이상 졸업).
- `buildQuiz`는 정답과 같은 prompt를 가진 단어(동의어 뜻 등)를 오답 보기에서 제외.
- `parseImport` 결과 배열에 `.duplicates`(중복으로 버린 개수).
- `parseImport` 구분 규칙 확정: 줄에 탭이 있으면 탭으로 최대 5칸. 탭이 없으면 **첫 번째 쉼표에서만** 2칸으로 분리(뜻 안의 쉼표 보존, 예: `accommodate, 수용하다, 숙박시키다` → `["accommodate","수용하다, 숙박시키다"]`). 따옴표로 감싼 칸은 따옴표 제거. 쉼표 5칸 CSV는 지원하지 않음(5칸은 탭으로).
- `loadState(storage)` / `saveState(storage, state)` : key `"vocab-master-v1"`, JSON 파싱 실패 시 defaultState (데이터 날리지 말고 손상 원본은 `"vocab-master-v1-corrupt"`로 백업).

## 화면 (app.js, 해시 라우팅, 모바일 우선 max-width 480px 중앙)
하단 탭: **단어장 / 오답노트 / 설정**
1. **단어장(홈)**: 패키지 선택(드롭다운 또는 칩) → Day 리스트 카드 (Day N, 단어 수, 아는 단어 수/진행바, 퀴즈 최고점).
2. **Day 상세**: 단어 목록 (영어 / 뜻, 🔊 발음 버튼, 뜻 가리기 토글, 아는 단어 체크 표시) + 버튼 [카드 학습] [퀴즈 영→한] [퀴즈 한→영] [듣기].
3. **카드 학습**: 큰 카드에 영어 → 탭하면 뜻 공개, 하단 [몰라요] [알아요], 상단 진행바 n/20, 자동 발음(설정). 끝나면 요약(알아요 x / 몰라요 y) + [모르는 단어 퀴즈] [돌아가기].
4. **퀴즈**: 4지선다, 정답 초록/오답 빨강 표시 후 0.8초 뒤 다음, 진행바, 끝나면 점수 + 틀린 단어 목록 + [틀린 것만 다시]. 결과는 recordAnswer + progress.best 반영.
5. **오답노트**: 패키지 구분 없이 모아보기 (miss 많은 순), 개수 배지, [오답 카드 학습] [오답 퀴즈] (오답 퀴즈 보기 pool은 해당 단어 패키지 전체), 개별 삭제, 전체 비우기(confirm).
6. **설정**: 단어장 가져오기(텍스트 붙여넣기 + .txt/.csv 파일 선택 → parseImport → 이름 입력 → custom 저장, 미리보기 개수 표시), 가져온 단어장 삭제(confirm), 자동 발음 on/off, 학습 기록 초기화(confirm), 백업 내보내기/복원(JSON 파일).
7. **듣기 모드** (`#/listen/<pkg>/<day>`): 영어 단어 → 한국어 뜻 → 선택한 예문·해석 순서로 읽고 Day 끝에서 정지. 재생·일시정지, 이전·다음, 목록에서 시작 위치 선택, 속도·영어 반복·예문 옵션 제공. 설정은 `vocab-master-listen`에 별도 저장하며 학습 기록은 바꾸지 않음. 화면 이동·탭 숨김 시 중단하고 재생 시 현재 단어부터 다시 시작; 한국어 음성이 없으면 뜻·해석을 건너뛰며 화면이 꺼진 상태의 재생은 보장하지 않음.

발음: `speechSynthesis` + `lang="en-US"`, 미지원이면 버튼 숨김.
접근성: 버튼은 `<button>`, 충분한 터치 영역(44px), 색만으로 정오 구분하지 말고 ✓/✗ 텍스트 병기.
오프라인: sw.js가 앱 셸 + packages/* 캐시 (cache-first, 버전 상수로 갱신).

## 실행/검증
- `npx serve .` 또는 `python -m http.server 8080` 후 브라우저 접속 (file:// 은 fetch 불가)
- `node test/core.test.js` (node:assert 사용, 프레임워크 없음) 통과
