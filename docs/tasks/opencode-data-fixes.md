# 데이터 수정 적용 (OpenCode, 반복 작업)

리뷰어(Codex)가 만든 리뷰 파일의 수정 목록을 그대로 적용한다. 순서대로 진행.
수정 가능 파일: packages/teps.json, packages/suneung.json, docs/toeic-levels.json 만.
packages/toeic.json, packages/index.json, 코드, test/ 는 수정 금지.

## 1. TEPS 오류 수정
- `docs/reviews/teps-review.md`의 오류 목록(단어/필드/현재/제안) 전부를 packages/teps.json에 적용.
- "선택적 보완" 항목도 적용(뜻 보강). 영단어(en) 철자는 바꾸지 말 것.

## 2. 수능 오류 수정
- `docs/reviews/suneung-review.md`의 오류 목록 + 선택적 보완을 packages/suneung.json에 적용. en 철자 변경 금지.
- 레벨 재배치 제안은 이번엔 적용하지 말고(Day 구성이 바뀜) 목록만 보고.

## 3. 토익 난이도 분류표 수정
- `docs/reviews/toeic-levels-review.md`의 기계적 규칙과 명시적 수정 목록을 docs/toeic-levels.json에 적용.
- 리뷰 권고대로 **현재 Lv4·Lv5 전체를 재검토**해서 과대 배정을 낮출 것(기준은 docs/tasks/toeic-levels-map.md "기준" 절).
- toeic.json의 현재 단어 집합과 비교해 누락/추가 키 0 유지.

## 검증 (각 단계 후 실행, 결과 보고)
```
node -e "for(const f of ['teps','suneung']){const p=require('./packages/'+f+'.json'),w=p.words,P=new Set(['명','동','형','부','전','접','대','감']);console.log(f,w.length,new Set(w.map(x=>x[0].toLowerCase())).size,w.every(x=>x.length===5&&x.every(Boolean)),w.every(x=>x[2].split('/').every(s=>P.has(s))),p.levels.reduce((a,l)=>a+l.days,0),Math.ceil(w.length/20))}"
node -e "const t=require('./packages/toeic.json').words.map(w=>w[0].toLowerCase()),m=require('./docs/toeic-levels.json').map;console.log(t.length,t.filter(w=>!(w in m)).length,Object.keys(m).filter(k=>!t.includes(k)).length);const c={};Object.values(m).forEach(v=>c[v]=(c[v]||0)+1);console.log(c)"
```
보고: 단계별 적용 건수(적용/이미 적용/기대값 불일치), 검증 출력, 토익 레벨 분포 변화(전→후).
