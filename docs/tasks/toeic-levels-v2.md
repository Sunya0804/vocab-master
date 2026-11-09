# 토익 분류표 v2 (OpenCode, 반복 작업)

토익 패키지가 4132 → 5804단어로 늘었고 표제어 4개가 교정됐다. docs/toeic-levels.json 을 최신 packages/toeic.json 에 맞춘다.
수정 가능 파일: docs/toeic-levels.json 만. packages/* · 코드 · test/ 수정 금지 (packages/toeic.json은 읽기만).

## 할 일
1. 키 동기화: toeic.json에 없는 키 4개 제거(교정 전 표제어) — 교정된 새 표제어로 레벨을 옮겨 줄 것. 누락 1676개 신규 분류.
   (교정 내역은 docs/toeic-review.json 또는 docs/reviews/toeic-levels-review.md 재검증 절 참고)
2. `docs/reviews/toeic-levels-review.md` 맨 끝 "재검증" 절의 **2단계 이상 차이 목록**을 그대로 적용.
3. 같은 절이 지적한 상위 레벨 과대 배정 경향을 반영해, 현재 Lv4·Lv5 전체와 신규 분류분을 다시 점검(기준: docs/tasks/toeic-levels-map.md "기준" 절, 수록된 한국어 뜻 기준).
   - 파생형은 원형 레벨 +1 이내.
   - 토익 Part 5~7 빈출 업무어는 Lv3 이하.

## 검증
```
node -e "const t=require('./packages/toeic.json').words.map(w=>w[0].toLowerCase()),m=require('./docs/toeic-levels.json').map;console.log(t.length,'missing',t.filter(w=>!(w in m)).length,'extra',Object.keys(m).filter(k=>!t.includes(k)).length,'bad',Object.values(m).filter(v=>![1,2,3,4,5].includes(v)).length);const c={};Object.values(m).forEach(v=>c[v]=(c[v]||0)+1);console.log(c)"
```
missing 0, extra 0, bad 0 이어야 함. 보고: 검증 출력, 단계별 처리 건수, 레벨 분포 전→후, 레벨별 신규 분류 예시 5개.
