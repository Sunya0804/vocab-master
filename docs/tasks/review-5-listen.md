# 5차 리뷰: 듣기 모드 (Claude 리뷰어, 읽기 전용 — 파일 수정 금지)

대상: docs/tasks/ui-6-listen.md 구현분 — app.js(듣기 관련: LISTEN_KEY, listenGeneration, listen 화면/큐), style.css, sw.js(CACHE_VERSION v9-listen), SPEC.md.
총괄 확인: core 41개·toeic 6개 테스트 통과, app.js 구문 OK. 워커 보고: Playwright 음성 모킹으로 재생 순서·조작 확인, 콘솔 에러 0.

## 확인할 것 (코드 읽기 + Playwright headless에서 speechSynthesis 모킹)
1. 큐 세대 토큰: 정지·이전/다음·목록 선택·속도 변경 직후 늦게 온 onend/onerror/타임아웃이 엉뚱한 단계·단어를 재생하지 않는지. 연타(다음 5번 빠르게)에도 겹친 발화 없음.
2. 화면 이동 시 정지: hashchange(뒤로가기 포함), 탭 숨김(visibilitychange), 다른 Day의 듣기로 바로 이동할 때 cancel + 큐 정리. 돌아와도 자동 재생 안 됨.
3. onend 누락 타임아웃: onend가 안 오는 모킹에서 상한 후 다음 단계로 진행, 상한이 긴 예문에도 너무 짧지 않은지.
4. 회귀: 카드 자동 발음(설정 토글)·기존 발음 버튼이 그대로(en-US, 기존 rate), 듣기 중 카드로 가면 듣기 정지. 학습 state·백업 형식 불변, `vocab-master-listen` 손상값(잘못된 JSON·범위 밖 값)에도 기본값으로 복구.
5. ko-KR 음성 없음·speechSynthesis 미지원 처리, Day 끝 정지, 마지막 단어에서 다음/첫 단어에서 이전.
6. 접근성: 버튼 aria-label, aria-live, 스페이스 키(입력 요소 포커스 시 가로채지 않는지), 모바일 390px 레이아웃 가로 스크롤 없음.
7. 콘솔 에러 0, sw.js 셸 목록과 캐시 버전 정상.

## 주의
- 끝나면 서버·.playwright-mcp 등 생성물 정리.
- 결과를 docs/reviews/review-5-listen.md 로: 심각도 순, 파일:줄 / 문제 / 재현 / 고칠 방향. 문제 없으면 "출시 가능" 의견.
