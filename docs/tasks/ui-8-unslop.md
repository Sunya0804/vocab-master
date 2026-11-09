# UI 8차: 디자인 다듬기 (unslop, Codex UI 워커)

사용자 승인: "그 방향으로 진행해". 기능·화면 순서·데이터 구조·접근성 동작은 그대로. 바꾸는 것은 색·글꼴·아이콘·문구·간격·부품 모양.
수정 가능: style.css, index.html, app.js(렌더 템플릿 문자열·아이콘 마크업만, 로직·라우팅·저장 변경 금지), sw.js(캐시 버전), manifest.json(theme/background color만). core.js·packages·test 금지.

## 방향
- 제품: 토익·수능·TEPS 준비생이 하루 20단어씩 카드·퀴즈·듣기로 외우고 틀린 단어를 다시 보는 한영 단어장.
- 성격: 차분하고, 정확하고, 손때 묻은.
- 세계: 종이 단어장·인덱스 카드·연필 밑줄·형광펜. 바탕은 거의 무채색, 기존 초록은 강조색 하나로만.
- 눈에 띄는 곳(이 둘만): ① 홈의 초록 블록 → "오늘의 Day 카드": 인덱스 카드처럼 오늘(이어서 학습할) Day의 첫 단어 3개(영어 + 뜻)를 보여 주고 아는 단어 진행 막대·이어서 학습 버튼 포함 ② 퀴즈 결과 점수.
- 시그니처(형광펜): 연노랑 `--highlight`를 **아는 단어 진행 막대 채움**과 **예문 속 표제어 강조(형광펜 띠: `background: linear-gradient(transparent 60%, var(--highlight) 60%)` 처럼 같은 색 한 톤)** 에만 쓴다. 다른 곳 금지.

## 1. 간격
- 모든 margin/padding/gap/고정 높이를 4의 배수로(22→24, 15→16, 25→24, 13→12, 9→8, 7→8, 59→60 또는 56, 35→36, 27→28, 118→120 등). 컨트롤 내부 2px 미세 조정만 허용.
- 같은 종류는 같은 값: 카드 패딩 하나(16 또는 20), 카드 사이 gap 하나(8 또는 12), 섹션 사이 32.
- 레벨 칩은 한 줄 가로 스크롤(overflow-x:auto, 스크롤바 숨김) 또는 6개가 한 줄에 들어가게 — 두 줄로 넘치지 않게.

## 2. 색 (라이트·다크 둘 다)
- 다크 graphite: bg #141415, card #19191b, raised #232325, 텍스트 #ededed/#a1a1a6/#85858b, 경계선 = 주 텍스트 8% 불투명.
- 라이트 warm 쪽 종이 느낌: bg #f7f4ee, card #fdfbf7, raised #efe9df, 텍스트 #1f1b16/#5e554a/#7b7266, 경계선 8%.
- 강조 `--primary`: 라이트 #157964(흰 글자 대비 OK), 다크 #5fcf9f 계열에 어두운 글자(대비 4.5:1 확인). **사용처는 주요 버튼(이어서 학습/카드 학습 시작), 선택 상태(레벨 칩 선택·하단 메뉴 현재 탭 글자색), 퀴즈 결과 점수**뿐. 레벨 제목·Day 번호·소제목·pos 배지·하단 메뉴 배경 등은 중립색으로.
- `--highlight`: 라이트 #f3e3a0, 다크 #6b5c2a 정도(다크에서 텍스트 대비 확인).
- 정답/오답 색은 의미용만, 톤 다운 유지.
- 그림자: 다크는 제거(표면 단계+경계선), 라이트는 `0 1px 2px rgba(0,0,0,.05)`만.
- index.html theme-color, manifest theme/background를 새 배경색으로.

## 3. 아이콘
- 이모지·문자 아이콘 전부 교체: 하단 메뉴 ▤ ↺ ⚙, 발음 🔊, 듣기 ♫, 빈 화면 ✧, 결과 아이콘, 버튼 속 →, Day 카드 ›.
- lucide 모양을 **인라인 SVG**로 직접 넣는다(외부 스크립트·CDN 금지, 오프라인 PWA): book-open, rotate-ccw, settings, volume-2, headphones, chevron-right, arrow-right, check 등 필요한 것만. 18px(메뉴 20px 허용), stroke-width 1.5, `stroke=currentColor`, fill none, aria-hidden. 버튼 aria-label 유지.
- 아이콘은 글자색 역할(secondary/muted)을 따르고 자기 색 없음.

## 4. 문구
- 홈 제목 "매일 조금씩, 확실하게." 등 구호 제거 → 제목은 맥락: 선택된 단어장 이름(예: "토익 종합 보카 5804")과 한 줄 사실 정보("291 Days · 하루 20단어").
- 머리말 "조금씩, 매일." 제거(제목과 중복).
- "한 단어씩 쌓이는 나의 영어 습관", "ONE DAY, TWENTY WORDS", "MY VOCABULARY" 제거(오늘의 Day 카드로 대체).
- Day 카드 제목 "20개의 새로운 기회" → 그 Day 첫 단어 3개 "available · benefit · confirm"(길면 말줄임). "퀴즈 도전" 알약·"카드 · 퀴즈" 반복 문구 제거, 대신 점수가 있으면 "최고 85점" 같은 조용한 텍스트만.
- 짧은 제목·라벨·버튼 끝 마침표 제거. 느낌표 금지. 여러 문장 문단은 마침표 유지.

## 5. 글꼴
- 시스템 글꼴 유지(오프라인·한글). 웹폰트 추가 금지.
- 굵기 400/500, 강조 600까지. 800/750/720/650 전부 정리. 로고 600.
- 대문자+넓은 자간 라벨 제거, 한글 자간 벌림(eyebrow letter-spacing) 제거. 16px 미만 음수 자간 금지(영단어 18px도 0).
- 크기 단계: 12 / 13 / 15 / 18 / 24(페이지 제목) / 32~36(카드 학습 영단어, 결과 점수 48~56).
- 숫자 `font-variant-numeric: tabular-nums`. Day 번호 "01" 0채움은 유지해도 됨(한 형식으로 통일).

## 7. 부품
- 반경: 버튼·입력 10, 카드 16, 큰 카드(학습 카드·오늘의 Day 카드) 20, 배지 6. 알약(99px) 제거 — 레벨 칩도 8~10.
- 홈 블록의 "Aa" 장식 제거.
- pos 배지·개수 배지는 조용한 텍스트(muted, 12px) 또는 raised 배경 작은 태그, 강조색 금지.
- 하단 메뉴 현재 탭: 배경 칠 대신 글자·아이콘만 primary + 위쪽 2px 표시선 또는 raised 배경 한 단계.
- hover는 filter 대신 배경 한 단계(raised), focus-visible 링 유지(primary 2px, offset 2).

## 9. 모션
- `transition`은 color/background-color/border-color/opacity/transform만, 140ms `cubic-bezier(0.22,1,0.36,1)`. 진행 막대 width 전환은 transform: scaleX로 바꾸거나 제거.
- prefers-reduced-motion 유지.

## 검증
- node test/core.test.js, node test/toeic.test.js 통과.
- Playwright headless로 홈·Day·카드·퀴즈·결과·오답노트·설정·듣기 화면을 라이트/다크 × 390px/1024px 스크린샷 찍어 직접 확인: 가로 스크롤 없음, 이모지 0, 콘솔 에러 0, 대비(주요 버튼 글자 4.5:1).
- 스크린샷은 docs/reviews/unslop/ 에 저장(라이트·다크 홈, Day, 카드, 결과 정도 8장 이내). 서버·기타 생성물 정리.
보고: 패스별 변경 요약, 스크린샷 경로, 남은 문제.

---
Direction and passes follow unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.
