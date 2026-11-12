# 독일어 단어 주제 분류 (OpenCode)

독일어 단어장에도 토익처럼 "주제별" 보기를 넣는다. 너는 **단어마다 주제 하나를 붙이는 일만** 한다. 패키지 파일(packages/*.json)은 건드리지 않는다.

## 입력

`packages/german-c2.json`의 `words` (4,371개, 각 항목 `[독일어, 한국어 뜻, 품사, 예문, 예문 번역]`). A1~C1의 모든 단어가 여기에 들어 있다.

## 출력

`docs/german-topics.json` 하나:

```json
{
  "topics": ["사람·가족·관계", "몸·건강", "..."],
  "words": {"das Museum": "여가·문화·스포츠", "abfahren": "여행·교통", "...": "..."}
}
```

- `words`의 키는 각 항목의 첫 칸(독일어 표제어)을 **글자 그대로**(관사·쉼표·괄호 포함) 쓴다. 4,371개 전부, 빠짐·중복 없이.
- 값은 아래 주제 목록 중 정확히 하나. 목록을 바꾸거나 새 주제를 만들지 않는다.

## 주제 목록 (이 순서 그대로 `topics`에)

1. 사람·가족·관계
2. 몸·건강
3. 집·주거
4. 음식·식사
5. 쇼핑·돈
6. 일·직업
7. 학교·교육·언어
8. 여가·문화·스포츠
9. 여행·교통
10. 도시·장소·방향
11. 자연·날씨·환경
12. 시간·날짜
13. 통신·미디어
14. 사회·관공서·정치
15. 감정·성격·생각
16. 일상 동작
17. 성질·상태
18. 기능어·수

## 기준

- 뜻(두 번째 칸)과 예문을 보고 가장 대표적인 쓰임의 주제를 고른다.
- 특정 장면에 묶이지 않는 일반 동사(machen, nehmen, bringen…)는 "일상 동작", 일반 형용사·부사(groß, schnell, oft…)는 "성질·상태".
- 관사·대명사·전치사·접속사·조동사·수사·의문사·감탄사는 "기능어·수".
- 날짜·요일·달·시각·빈도 표현은 "시간·날짜".
- 한 주제가 전체의 25%를 넘지 않게, 장면이 분명한 단어는 장면 주제로 보낸다.

## 확인 (끝나기 전에 반드시 실행)

```
node -e "const fs=require('fs');const t=JSON.parse(fs.readFileSync('docs/german-topics.json','utf8'));const w=JSON.parse(fs.readFileSync('packages/german-c2.json','utf8')).words.map(x=>x[0]);const miss=w.filter(k=>!t.topics.includes(t.words[k]));const extra=Object.keys(t.words).filter(k=>!w.includes(k));const n={};w.forEach(k=>n[t.words[k]]=(n[t.words[k]]||0)+1);console.log('missing/bad',miss.length,'extra',extra.length,n)"
```

missing/bad 0, extra 0이 될 때까지 고친다. 마지막에 주제별 개수 출력을 보고에 붙인다. 커밋하지 않는다.
