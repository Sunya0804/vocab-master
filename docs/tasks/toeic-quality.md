# 토익 단어 품질 전수 점검 (OpenCode, 반복 작업)

배경: 정렬 리뷰(docs/reviews/toeic-sort-review.md 4절 P2) 표본 50개 중 2개(4%)가 뜻·예문 연결 보완 대상이었다. 5804개 전체를 점검한다.
수정 가능: packages/toeic.json, docs/toeic-quality-log.json(새로 만듦). 그 외 금지. git 커밋하지 말 것(총괄이 리뷰 후 커밋).

## 절대 규칙
- 표제어(en, 0번 칸)와 단어 순서는 바꾸지 않는다(학습 기록·레벨표·테스트가 표제어 키에 묶여 있음). 표제어 자체가 틀렸다고 보이면 고치지 말고 로그에 `"headwordIssue": true`로만 남긴다.
- **명백한 오류만** 고친다. 취향 수준 문체 손질 금지. 기준:
  1. ko 뜻이 다른 단어의 뜻이거나 핵심 뜻이 빠짐(예: vaccination=백신 ✗ → 예방 접종).
  2. pos(품사)가 표제어·예문 용법과 맞지 않음. 형식은 `명|동|형|부|전|접|대|감` 및 `/` 조합 유지.
  3. ex 예문이 표제어를 포함하지 않거나 문법이 틀림, 또는 뜻과 다른 의미로 씀. 15단어 이하.
  4. exKo 해석이 ex와 다름(특히 표제어 부분).
- 예문을 새로 쓸 때는 직접 작성(출판사 PDF 문장 복사 금지).

## 진행
- 500개씩 12구간(마지막 구간 304개). 구간마다 로그에 추가하고 아래 검증을 돌린다.
- 로그 형식 `docs/toeic-quality-log.json`: `{"entries":[{"index":정렬후0기반,"en":"...","field":"ko|pos|ex|exKo","before":"...","after":"...","reason":"짧게"}], "headwordIssues":[...], "checkedRanges":[[0,499],...]}`

## 검증 (구간마다, 마지막에 출력 보고)
```
node test/core.test.js
node test/toeic.test.js
node -e "const p=require('./packages/toeic.json'),l=require('./docs/toeic-quality-log.json');console.log(p.words.length,'edits',l.entries.length,'headwordIssues',l.headwordIssues.length,'ranges',l.checkedRanges.length)"
```
두 테스트 0 failed, 단어 5804 유지.
보고: 구간별 수정 수, 필드별 수정 수, 대표 예시 10개, headwordIssues 목록.
