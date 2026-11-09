# 코어 테스트 수정 + 토익 난이도 분류표 리뷰 (Codex)

## A. 테스트 수정 (수정 파일: test/core.test.js 만)
`dayLevels maps all 100 Suneung Days...` 테스트가 실패: 수능 패키지가 2000 → 3000단어로 늘어나 고정값(2000, Day 100, 20/20/24/28/8)이 깨짐.
수능 데이터는 계속 바뀔 수 있으니 실제 패키지 값을 고정하지 말 것:
- 실제 suneung.json으로는 "levels days 합 == Day 수, dayLevels 길이 == Day 수, null 없음, 레벨 경계가 levels 순서대로 연속" 같은 **불변식**만 검증.
- 정확한 경계값 검증은 테스트 안에서 만든 가짜 패키지(예: 100 Day, 20/20/24/28/8)로.
완료 기준: `node test/core.test.js` 전부 통과.

## B. 토익 난이도 분류표 리뷰 (읽기 전용, 파일 수정 금지)
OpenCode가 만든 `docs/toeic-levels.json`(toeic.json 4132단어 → 레벨 1~5)을 검토.
- 기준은 docs/tasks/toeic-levels-map.md 의 "기준" 절.
- 무작위 150개(레벨별 30개) 표본을 뽑아 레벨이 타당한지 판정. 명백히 틀린 것(2단계 이상 차이, 예: 기초어가 5)은 목록으로.
- 전체에서 의심 패턴도 찾기(예: 숙어가 전부 한 레벨, 알파벳 순서대로 레벨이 몰림 등).
- 결과: 표본 일치율(%), 2단계 이상 오분류 목록(단어/현재/제안), 패턴 이슈, 그리고 "그대로 사용 / 부분 수정 후 사용 / 재작업" 판정.
packages/toeic.json, docs/toeic-levels.json 은 수정하지 말 것 (수정은 총괄이 OpenCode에 배분).

## 보고
A의 테스트 출력 끝부분 + B의 결과.
