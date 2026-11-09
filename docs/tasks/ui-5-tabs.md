# UI 5차: 3차 리뷰 반영 (Codex UI 워커)

담당 파일: app.js, style.css, sw.js, index.html. core.js / test/ / packages/ 수정 금지.

## 1. [높음] 두 탭이 서로 다른 패키지 Day 화면에 있으면 storage 쓰기 무한 핑퐁
- 원인: Day 화면 렌더 시 selectedPackage가 다르면 persist() 호출(app.js:262) → 다른 탭 storage 이벤트 → loadSavedState()가 자기 탭 selectedPackage까지 덮어씀(app.js:51-60) → 다시 persist … 반복 (초당 약 195회).
- 수정: (a) 렌더 함수 안에서 저장 금지 — 사용자가 패키지/레벨을 바꾸는 동작에서만 저장. (b) storage 이벤트로 재로드할 때 패키지·레벨 선택은 현재 탭 값을 유지(선택은 탭별 UI 상태, 학습 데이터만 동기화). 새로고침 시 마지막 선택 복원은 유지.
- 확인: 탭 A #/day/suneung/0, 탭 B #/day/toeic/0 동시 오픈 2초간 storage 이벤트 거의 없음, 토스트 반복 없음.

## 2. [중간] 한 탭에서 패키지 바꾸면 다른 탭 홈도 바뀜
1번 (b)로 함께 해결. 확인: 두 탭 toeic 홈 → A에서 suneung 선택 → B는 toeic 유지.

## 4. [낮음] 매우 느린 연결에서 캐시가 있어도 첫 화면 약 6.5초
- 원인: index.json 받고 나서 패키지 요청 → 3초 타임아웃 두 번 직렬.
- 수정: packages/* 와 index.json은 stale-while-revalidate(캐시 즉시 반환 + 백그라운드 갱신, 캐시 없으면 네트워크). 갱신분은 다음 실행에 반영돼도 됨. CACHE_VERSION 올리기.

## 5. [낮음] 복원 실패 메시지에 영어 내부 오류 노출
- "Unsupported version", "Invalid wrong answers", JSON SyntaxError 메시지 등을 한국어로 ("JSON 형식이 아니에요", "지원하지 않는 백업 버전이에요" 등).

## 완료 기준
node --check app.js sw.js, node test/core.test.js 통과, 위 시나리오 확인(가능하면 Playwright headless). 끝나면 서버·생성물 정리 후 변경 요약 보고.
