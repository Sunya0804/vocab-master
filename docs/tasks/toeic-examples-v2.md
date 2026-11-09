# 토익 예문 재작성 v2 (Codex 4명 병렬, 파트별)

배경: 토익 2780개 예문이 8개 틀 문장이었다. OpenCode 1차 시도는 59개 틀로 바꿔 끼운 스크립트 결과라 폐기했다(예: "The critic was listed in the meeting agenda."). **단어마다 직접 쓴 고유 예문**이 필요하다.

## 너의 파트
`docs/toeic-examples/targets-N.json` (N은 지시 프롬프트에 있음, 각 695개: index, en, pos, ko).
출력: `docs/toeic-examples/out-N.json` = `[{"index":..,"en":"..","ex":"..","exKo":".."}, ...]` (입력과 같은 순서·개수).
**packages/toeic.json 은 수정 금지**(4명이 동시에 작업하므로 총괄이 병합). 다른 파트 파일 수정 금지. git 커밋 금지.

## 예문 규칙
- 단어마다 그 단어의 뜻(ko)과 품사(pos)를 보여 주는 문장을 **직접** 쓴다. 템플릿·스크립트 생성 금지(틀에 단어만 바꿔 끼우는 방식 금지).
- 표제어 en을 철자 그대로 포함(문두 대문자만 허용). 8~15단어. 토익 맥락(사무실, 회의, 출장, 고객, 매장, 공지, 채용, 배송 등)을 우선하되 단어 뜻이 일상어면 일상 맥락도 가능.
- 명사는 그 명사가 실제로 하는 일·쓰임이 드러나게("The proceeds from the charity sale will fund the new library."), 형용사는 무엇을 꾸미는지 자연스럽게, 부사는 동사와의 결합이 자연스럽게(예: intentionally를 "고의로 일했다"처럼 어색하게 쓰지 말 것).
- ko에 여러 뜻이 있으면 첫 뜻(또는 토익 빈출 뜻)으로.
- exKo: ex의 자연스러운 한국어 번역, 표제어 부분은 ko의 뜻과 일치.
- 출판사 교재 문장 복사 금지.

## 자체 검증 (끝나면 실행, 출력 보고)
```
node -e "const N=process.argv[1];const t=require('./docs/toeic-examples/targets-'+N+'.json'),o=require('./docs/toeic-examples/out-'+N+'.json');let bad=[];o.forEach((r,k)=>{const n=r.ex.split(/\s+/).length;if(r.index!==t[k].index||r.en!==t[k].en||!r.ex.toLowerCase().includes(r.en.toLowerCase())||n<5||n>15||!/[가-힣]/.test(r.exKo))bad.push(r.index)});const s={};o.forEach(r=>{const k=r.ex.split(r.en).join('X');s[k]=(s[k]||0)+1});console.log('count',o.length,'/',t.length,'bad',bad.length,bad.slice(0,10),'maxSameFrame',Math.max(...Object.values(s)))" N
```
count 695/695, bad 0, maxSameFrame 1~2 이어야 함. 보고: 검증 출력, 무작위 10개 예시.
