# 토익 단어장 데이터 정리 (반복 작업 워커)

출처: `docs/tasks/backlog.md` 데이터 부채, review-6. 사용자: "2~5번 진행하자." 기존 지침: `docs/tasks/toeic-examples-v2.md`(직접 쓰기, 템플릿 금지)를 먼저 읽는다. 출판사 예문 복사 금지.
대상: `packages/toeic.json` (words: [표제어, ko, pos, ex, exKo, ...]). 표제어·ko·pos는 바꾸지 않는다(아래 4번 제외). 커밋 금지. 공유 폴더 파일을 직접 고친다(다른 워커는 이 파일을 안 건드림).

## 할 일
1. **템플릿 예문 550개**: 표제어를 X로 바꿨을 때 같은 문장이 2번 이상 나오는 예문(44개 틀, 예: "The team discussed the X equipment at the meeting." 52개, "Please inspect the X before use." 47개). 단어마다 그 단어의 뜻·품사가 드러나는 토익 상황 문장을 하나씩 직접 쓰고 exKo도 새로 쓴다. 찾는 스크립트는 써도 되지만 문장 생성은 직접.
2. **"The chef prepared the X for the guests." 10개, "describes the detail in detail"**: 같은 방식으로 재작성.
3. **exKo 문체 통일**: 해라체(~다)로. 지금 합니다체 618개, 해요체 506개 → 해라체로 바꾼다(뜻 유지, 어미만).
4. **표제어 정리**: whereabout(whereabouts와 중복), displace 예문(replace 뜻으로 잘못 씀), distort 예문(어색). 먼저 학습 기록과 Day 나누기가 단어를 어떻게 식별하는지(core.js) 확인하고, 항목 삭제가 Day 구성·기록을 깨면 삭제하지 말고 가장 안전한 방법을 골라 이유를 보고.
5. 예문에 표제어(또는 활용형)가 실제로 들어가야 한다. 들어가지 않으면 예문 빈칸 문제에서 빠진다: `Core.clozeExample(word, false)`가 null이 아닌지 바꾼 항목 전부 확인.

## 검증·보고
- node test/toeic.test.js, test/core.test.js 통과. 같은 틀 반복 검사 다시 실행해 2번 이상 반복 0(자연스러운 짧은 문장 우연 중복은 목록으로 보고).
- 처리 수(1·2·3·4별), 새 예문 무작위 20개, clozeExample null 수, 4번 처리 방식.
