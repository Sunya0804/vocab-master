# 4차 리뷰 (읽기 전용 — 파일 수정 금지)

대상: UI 5차(docs/tasks/ui-5-tabs.md 반영: app.js, sw.js) + 코어 7차(docs/tasks/core-7.md B: core.js dayLevels 빈 이름, test/core.test.js).
packages/ 와 docs/toeic-levels.json 은 다른 워커가 수정 중이라 리뷰 대상 아님.

## 확인할 것
1. 3차 리뷰 "새로 발견" #1~#6 판정(해결/부분/미해결).
2. 실제 브라우저 재현(Playwright headless 허용): 두 탭 서로 다른 패키지 Day 화면 → storage 핑퐁 없음, 한 탭 패키지 변경이 다른 탭에 안 번짐, 새로고침 시 마지막 선택 복원, 학습 데이터(아는 단어·오답)는 탭 간 동기화 유지.
3. stale-while-revalidate: 캐시 있을 때 즉시 표시, 갱신분이 다음 실행에 반영, 캐시 없을 때 정상 로드, 오프라인 동작.
4. 백업 복원 오류 메시지 한국어.
5. 새 회귀 여부, 콘솔 에러 0.

## 주의
- 끝나면 서버·.playwright-mcp 등 생성물 정리.
- 결과: 심각도 순, 파일:줄 / 문제 / 재현 / 고칠 방향 / 담당(코어 or UI). 문제 없으면 "출시 가능" 여부 의견도.
