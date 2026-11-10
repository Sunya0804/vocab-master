# 문제 데이터 수정 1차 (7차 리뷰 반영)

먼저 `docs/reviews/review-7-exam.md` 를 읽는다. **자기 원본 파일(docs/questions/pX-N.json)만 수정**한다. 병합본 questions/*.json 은 총괄이 다시 만든다(직접 수정 금지).
병합 id ↔ 원본: p5-001~100 = p5-1 순서 1~100, p5-101~200 = p5-2, p5-201~300 = p5-3, p2-001~100 = p2-1, p2-101~200 = p2-2 (예: p2-146 = p2-2 의 46번째).
문항 수·type·difficulty 개수·정답 위치 분포는 그대로 유지(바꾸면 다른 문항으로 맞춰 놓기). 끝나면 exam-write.md 의 검증 명령 출력 + 바꾼 문항 목록(전/후) 보고.

## p5-1 (b769aff6)
- p5-037: choices `required` → `requires` 등 확실한 오답으로.
- p5-077: explain 둘째 문장을 오답 이유로 고침(리뷰 제안).
- 같은 패턴 전수 점검: pos 문항에서 과거분사·현재분사 보기가 명사 뒤 후치 수식으로 성립하는 경우 → 오답 교체.

## p5-2 (7e53d29b)
- p5-173: 보기 소문자로(`during, despite, because of, while`). 다른 문항도 문장 중간 빈칸인데 대문자 보기 있는지 점검.
- 전수 점검: 정답 외 보기가 문법·의미상 성립하는 문항.

## p5-3 (5266d3ef)
- 난이도 1 vocab 문항: 오답 3개가 문맥과 완전히 무관하면(예: p5-224 wet/distant/annual/loyal) 실제 토익 쉬운 문항처럼 같은 주제 영역의 그럴듯한 단어로 1~2개 교체. 정답 유일성은 유지.
- 전수 점검: 정답 외 보기가 성립하는 문항.

## p2-1 (bf13b2fd)
- explain 보기 표기는 "(A)" 형식 유지(p2-2도 이 형식으로 통일함).
- 난이도 1·2 문항의 오답 중 질문과 연결이 약한 것(예: p2-001 "I ordered more storage shelves.", p2-077 "The sample tasted a little salty.")을 실제 토익식 함정(질문 단어 반복·연상어·**유사 발음**)으로 강화. `similar-sound` 함정을 15문항 이상 추가하고 trap 태그 갱신.
- 정답이 가장 긴 보기인 문항이 많음 → 오답을 정답과 비슷한 길이로 늘리거나 정답을 짧게 해서 이 구간 비율을 40% 이하로.

## p2-2 (84ac18a8)
- **Yes 단서 제거(가장 중요)**: yesno·negative-tag·request 에서 정답이 Yes/No/Sure/Certainly/Of course 로 시작하는 36문항 중 절반 이상에, 같은 말로 시작하지만 내용이 틀린 오답("Yes, the badges are blue." 식)을 넣거나 정답에서 Yes를 빼고 내용으로 바로 답하게. 결과적으로 "그렇게 시작하는 보기 = 정답"이 60% 이하가 되게.
- p2-146: choices[0] → `The accountant counted the cash this morning.`, trap 에 `similar-sound`.
- p2-162: ko 번역 "방문 중인 기술자들을 월요일에 그 강변 식당에 모시고 가요" 식으로.
- 난이도 1·2 무관 오답(예: p2-107 "The building has twelve floors.", "I usually spend weekends with my family.")을 연상어·유사 발음 함정으로 강화, `similar-sound` 15문항 이상 추가.
- explain 의 보기 표기를 "A" → "(A)" 형식으로 통일.
- choice·statement 유형에서 "사람·일정 사정" 오답이 간접 응답(정답)처럼 들리는 문항 점검·교체.
- 정답이 가장 긴 보기인 비율 40% 이하로.

## 확인 명령 (p2 담당)
```
node -e "const a=require('./docs/questions/'+process.argv[1]+'.json');const re=/^(Yes|No|Sure|Certainly|Of course)\b/;const r=a.filter(q=>q.choices.some(c=>re.test(c)));console.log('yesCue',r.filter(q=>re.test(q.choices[q.answer])&&q.choices.filter(c=>re.test(c)).length===1).length,'/',r.length,'longest',a.filter(q=>q.choices[q.answer].length===Math.max(...q.choices.map(c=>c.length))).length,'similar',a.filter(q=>q.trap.includes('similar-sound')).length)" p2-2
```
