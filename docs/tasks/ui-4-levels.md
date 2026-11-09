# UI 4차: 난이도 레벨 UI + 재리뷰 지적

담당 파일: index.html, style.css, app.js, sw.js, manifest.json, 아이콘. core.js / test/ / packages/ 수정 금지 (다른 워커 작업 중).
먼저 SPEC.md 전체, 특히 "난이도(선택)" 절을 읽을 것. 기존 코드(app.js 등)를 읽고 구조를 유지할 것.

## A. 난이도 레벨 UI
- Core.dayLevels(pkg)로 홈 Day 리스트를 레벨 헤더로 묶기.
- 상단 레벨 칩(전체 / Lv1 ...) 필터. levels 없는 패키지(토익, 가져온 단어장)는 칩 숨기고 기존처럼 표시.
- "이어서 학습"은 선택된 레벨 안의 첫 미완료 Day.
- 선택 레벨은 패키지별로 preferences에 기억.

## B. 재리뷰 지적 (재리뷰 "새로 발견" 번호)
- #2 선택한 패키지가 새로고침 시 토익으로 돌아감: preferences에 저장 (레벨 선택과 함께).
- #3 Day 상세 체크박스는 state.known[id] = true / delete 만. markKnown 호출 금지 (오답노트 streak 우회 방지). 카드 학습의 알아요/몰라요 버튼만 markKnown.
- #5 Day 상세 예문에도 발음 버튼 (exampleHTML에 withSpeech=true).
- #6 백업 복원 검증에서 wrong 항목의 pos/ex/exKo 타입까지 검사, 틀리면 복원 거부하고 이유 표시.
- #7 sw.js 패키지 network-first에 3초 타임아웃 후 캐시 대체 (캐시가 없으면 네트워크 계속 대기).
- #8 백업 내보내기: 모바일(UA-CH mobile 또는 pointer:coarse)에서만 share 우선, 데스크톱은 다운로드.
- #4 (불규칙 활용형 강조 누락)은 생략.

## C. 마무리
- sw.js CACHE_VERSION 올리기.
- 완료 기준: 로컬 서버(npx serve 등)로 열어 콘솔 에러 0. 수능 레벨 칩/헤더/이어서 학습 동작, 새로고침 후 패키지·레벨 유지, 토익(레벨 없음) 기존 표시 확인.
- 변경 요약 + 확인 내용 보고. 작업 중 띄운 서버는 끝나면 종료.
