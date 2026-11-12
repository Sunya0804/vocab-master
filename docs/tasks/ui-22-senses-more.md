# UI 22차: 수능·TEPS 다의어 병합 (UI 워커)

최종본: `docs/senses/suneung-final.json`(140), `teps-final.json`(109) — 검토자 I가 `docs/reviews/review-senses-3.md` 기준으로 고친 것. 형식은 토익 `docs/senses/final.json`과 같다.
1. `scripts/merge-senses.js`를 단어장 인자로 일반화(`node scripts/merge-senses.js <package> <input> [--check]`, 기본은 지금처럼 toeic). **각 단어장의 기존 파일 서식(수능은 한 단어 한 줄 배열, TEPS·토익은 지금 모양)을 그대로 유지**해 병합 diff가 6번째 칸 추가로만 보이게. 해시 기록은 `docs/suneung-sources.json`, `docs/teps-sources.json`에(있는 구조에 맞춰 senses 요약 추가).
2. 토익 때처럼 **sense가 ko에 없으면 ko 끝에 "; sense"로 덧붙여** 뜻 고르기 퀴즈가 받게(수능 5개, TEPS 8개 해당). 그로 인해 바뀌는 suneung/teps 기존 해시 테스트가 있으면 갱신.
3. `test/senses.test.js`: "토익 외 단어장은 5칸" 가정을 바꿔, 6번째 칸이 있는 모든 단어장에 같은 검사 적용.
4. 화면은 이미 6번째 칸을 처리하니 수능·TEPS Day 목록·카드에서 "다른 뜻"이 보이는지만 확인.
검증: node test/*.test.js, Playwright 수능·TEPS 다의어 단어 Day 화면 390·1280px, 콘솔 에러 0. sw.js CACHE_VERSION 올림. 커밋 금지. 끝나면 바꾼 파일·병합 실행 결과 보고.
