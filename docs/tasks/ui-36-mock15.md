# UI 36 — 모의고사 11~15회 지원

`questions/mock/mock-11.json`~`mock-15.json`을 곧 추가한다(형식은 1~10회와 동일). 앱·서비스워커·테스트가 1~15회를 다루게 한다.

## 수정 (공유 폴더 C:/Users/정우진/Documents/vocab_master 에서 직접)

1. `js/mock.js` — `MOCK_TESTS`를 1~15로, 5번째 줄 주석도 1-15로.
2. `sw.js` — 모의고사 캐시 정규식 `mock-(?:[1-9]|10)`을 1~15를 받도록(`mock-(?:[1-9]|1[0-5])`), `CACHE_VERSION`을 `vocab-master-shell-v38-mock15`로.
3. `test/mock.test.js` — 파일 목록을 1~15로.
4. 15개 카드가 모의고사 홈에서 폰(360px)·폴더블·PC 폭에서 깨지지 않는지 `style.css`의 `.mock-cards` 배치를 확인하고, 필요할 때만 고친다.

## 확인

- `node test/mock.test.js` 등 `test/*.test.js` 전부 통과(11~15 파일이 아직 없으면 건너뛰는 것이 정상).
- 로컬 서버로 모의고사 홈을 열어 11~15회가 "준비 중"으로 보이는지 화면 확인.
- 커밋하지 않는다. 바꾼 파일 목록과 결과만 보고.
