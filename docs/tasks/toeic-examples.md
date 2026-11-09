# 토익 템플릿 예문 재작성 (OpenCode, 반복 작업)

배경: packages/toeic.json 5804개 중 2780개 예문이 8개 틀에 표제어만 끼운 문장이다(예: "The report describes the X in detail." 1925개). 형용사·동사가 들어가면 비문이고 학습 가치가 낮다.
수정 가능: packages/toeic.json 의 대상 항목 ex·exKo(필요하면 그 항목 pos만), docs/toeic-examples-log.json(새로 만듦), 마지막에 docs/toeic-sources.json postSortValidation.wordsSha256 한 번 갱신. 그 외 금지. git 커밋 금지.

## 대상 찾기
```
node -e "const w=require('./packages/toeic.json').words;const T=['The report describes the X in detail.','The manager described the proposal as X.','The manager explained the changes X.','The team discussed the X employees at the meeting.','We reviewed the X report at the meeting.','We visited the X during our business trip.','We spoke with the X after the meeting.','We discussed the X at the planning meeting.'];console.log(w.map((x,i)=>[i,x[3].split(x[0]).join('X')]).filter(([i,t])=>T.includes(t)).map(([i])=>i).join(','))"
```

## 규칙
- 표제어·순서·ko 변경 금지(ko가 명백히 틀리면 고치지 말고 로그 `koIssues`에 기록).
- 새 ex: 표제어를 **그대로 포함**(대소문자만 문두 허용), 15단어 이하, 토익 업무·일상 맥락(사무실, 출장, 회의, 고객, 매장, 공지 등), 표제어의 품사·뜻(ko)에 맞는 용법, 문법 정확.
- 문장 구조를 다양하게: 같은 문장 틀 반복 금지(주어·동사 다양화). 직접 작성, 출판사 문장 복사 금지.
- exKo: ex의 자연스러운 한국어 해석, 표제어 부분은 ko의 뜻과 일치.
- 300개씩 진행, 구간마다 로그 추가 후 검증.
- 로그 `docs/toeic-examples-log.json`: `{"entries":[{"index":..,"en":"..","before":{"ex":"..","exKo":".."},"after":{"ex":"..","exKo":".."}}],"koIssues":[...],"doneRanges":[...]}`

## 검증 (구간마다 / 최종 보고)
```
node test/core.test.js
node test/toeic.test.js   (구간 중 wordsSha256 1건 실패는 무시, 마지막에 해시 갱신 후 0 failed)
```
위 "대상 찾기" 명령을 다시 돌려 남은 대상 0개여야 함.
최종 보고: 처리 수, 남은 템플릿 수(0), 새 예문 무작위 15개, koIssues 목록, 두 테스트 출력.
