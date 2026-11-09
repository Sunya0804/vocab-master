# 3차 리뷰 (읽기 전용 — 파일 수정 금지)

대상: UI 4차(docs/tasks/ui-4-levels.md 반영본: app.js, style.css, sw.js) + 코어 수정(docs/tasks/core-fix-import.md 반영본: core.js, test/core.test.js).
기준: SPEC.md (특히 "난이도(선택)" 절, "parseImport 구분 규칙 확정").
packages/ 는 다른 워커가 수정 중이니 리뷰 대상 아님(단, 수능 levels 있음 / 토익 levels 없음 상태로 동작 확인에는 사용).

## 확인할 것
1. 재리뷰 "새로 발견" #1~#8 각각 해결/부분/미해결 판정 (#4는 의도적으로 생략됨).
2. 레벨 UI: 칩 필터, 레벨 헤더, 선택 레벨 내 이어서 학습, 패키지·레벨 선택이 새로고침 후 유지, levels 없는 패키지(토익·가져온 단어장)는 기존처럼 표시.
3. 실제 브라우저로 재현 확인: Dochi 내장 브라우저가 localhost를 막으면 Playwright headless 사용. 콘솔 에러 0 확인.
4. SW 3초 타임아웃 대체 동작, 백업 내보내기(데스크톱=다운로드) 동작.
5. 새로 생긴 회귀가 있는지.

## 주의
- 끝나면 띄운 서버와 .playwright-mcp/ 등 생성물 정리.
- 결과: 심각도 순, 항목마다 파일:줄 / 문제 / 재현 / 고칠 방향 / 담당(코어 or UI).
