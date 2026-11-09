# 토익 레벨 정렬 (OpenCode)

사용자 확인: 토익 Day 학습 기록 없음 → 기록 이전 불필요. 바로 정렬한다.
수정 가능 파일: packages/toeic.json 만. docs/toeic-levels.json은 읽기만. 코드·test 수정 금지.

## 할 일
1. packages/toeic.json 의 words를 docs/toeic-levels.json 의 map(키 = en 소문자, 값 1~5) 기준으로 **레벨 오름차순, 같은 레벨 안에서는 기존 순서 유지(안정 정렬)**.
   단어 항목 자체(5칸 내용)는 한 글자도 바꾸지 말 것.
2. `levels` 추가 (packages/suneung.json 형식과 동일). 이름은 docs/toeic-levels.json 의 levels 라벨 사용.
   Day = 20단어. 각 레벨 days = Math.round(해당 레벨 단어 수 / 20), 마지막 레벨은 남은 Day 전부(전체 Day = ceil(5804/20) = 291) → days 합계 291.
3. 다른 최상위 키(id, name, desc 등)와 키 순서 유지, 들여쓰기는 기존 파일과 동일하게.

## 검증 (출력 그대로 보고)
```
node -e "const p=require('./packages/toeic.json'),m=require('./docs/toeic-levels.json').map;const w=p.words;let bad=0;for(let i=1;i<w.length;i++)if(m[w[i][0].toLowerCase()]<m[w[i-1][0].toLowerCase()])bad++;console.log('words',w.length,'unsorted',bad,'fields5',w.every(x=>x.length===5),'days',p.levels.reduce((a,l)=>a+l.days,0),JSON.stringify(p.levels))"
node test/core.test.js
```
words 5804, unsorted 0, fields5 true, days 291, 테스트 전부 통과여야 함.
보고: 검증 출력, 레벨별 단어 수.
