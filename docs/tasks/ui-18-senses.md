# UI 18차: 다의어(뜻별 예문) 넣기 (UI 워커)

사용자: "다의어나 해당 다의어에 대한 예문을 추가하면 좋을 것 같은데"
데이터: `docs/senses/final.json`(작성자 A가 만드는 중; 없으면 `draft-2.json`으로 개발) = `[{"index","en","sense","pos","ex","exKo"}]`, index는 `packages/toeic.json` words 위치.

## 할 일
- 데이터 형식: toeic.json 단어 배열의 **6번째 칸(선택)** 에 `[[sense, ex, exKo], ...]`를 넣는다. 기존 5칸·순서·Day 구성·기록 키는 그대로. 다른 단어장·가져온 단어장은 6번째 칸 없음(있어도 무시 안 되게 검증만).
- 병합 스크립트를 만들어 final.json → toeic.json에 반영(스크립트는 `scripts/` 또는 test 안에, 실행 결과 커밋은 총괄이 함). toeic 테스트의 wordsSha256 등 확인값과 `docs/toeic-sources.json` 갱신 방법을 보고.
- 화면: 단어 목록·카드 뒷면에 "다른 뜻" 예문(뜻 표시 + 예문 + 해석, 발음 버튼). 빈칸 퀴즈는 기본 예문 외에 뜻별 예문도 문제로 쓸 수 있게(같은 단어가 한 세션에 두 번 나오지 않게). 뜻 고르기 퀴즈는 ko 뜻 중 어느 것을 골라도 정답(이미 ko에 여러 뜻이 들어 있으면 지금 방식 확인만).
- 백업·복원·가져온 단어장 영향 없음.

## 검증
node test/*.test.js(+6번째 칸 형식 테스트), Playwright 390·1280px 단어 목록·카드·빈칸, 콘솔 에러 0. sw.js CACHE_VERSION 올림. 공유 main 최신(3bceded)에서 시작, 커밋 금지. 끝나면 바꾼 파일·병합 방법·스크린샷 보고.
