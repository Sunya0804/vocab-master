# UI 13차: 독일어 예문 빈칸 매칭 넓히기 (UI 워커)

출처: `docs/tasks/backlog.md` 1번, review-9 6번. 사용자: "2~5번 진행하자."
지금 독일어 빈칸 매칭 실패율: A1 13.4%, B1 14.2%, C2 17.7% (토익 5.3%). 활용형·분리동사가 대부분.

## 시작 전
공유 폴더 최신 파일을 작업 폴더로 가져온다(core.js에 짧은 어간 규칙 `stemMatches`가 들어감). 수정 가능: core.js, test/core.test.js, sw.js. 커밋 금지.

## 할 일 (core.js 빈칸 찾기, 독일어만)
- 분리동사: 표제어가 분리 전철(ab, an, auf, aus, bei, ein, fest, her, hin, los, mit, nach, vor, weg, zu, zurück, zusammen 등)로 시작하는 동사면, 예문에서 "어간 활용형 … 전철"로 떨어진 형태도 찾아 두 단어를 각각 빈칸, 정답은 예문 순서대로 공백으로 이은 것(예: anfangen / "Der Kurs fängt um neun an." → "fängt an"). 붙은 형태(anfangen, angefangen, anzufangen)도 매칭.
- 현재형·과거분사 활용: 어간(-en/-n 뗀 것)의 모음 변화 a→ä, au→äu, o→ö, e→i/ie 허용, ge-…-t/-en 과거분사 허용. 불규칙 과거형(ging, kam 등)은 하지 않아도 됨.
- 기존 규칙(관사 der/die/das/sich 제외, 짧은 어간 규칙, 접두어 표제어 제외)은 유지. 영어 결과는 하나도 바뀌면 안 됨(토익·수능·텝스 전 단어 빈칸 결과가 전후 동일한지 비교).
- `highlightedExample`도 같은 규칙으로 강조되는지 확인.
- 잘못 뚫리는 경우가 느는 게 더 나쁘다: 새로 매칭된 것 중 무작위 30개를 눈으로 확인해 오매칭 0을 목표로.

## 검증·보고
node test/*.test.js 통과 + 분리동사·움라우트 활용·과거분사·오매칭 방지 테스트 추가. 독일어 6개 단어장 실패율 전/후, 새로 매칭된 무작위 30개(표제어, 예문, 빈칸 정답), 영어 결과 동일 여부. sw.js CACHE_VERSION 올림.
