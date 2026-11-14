# 36차 배포 후 수정 (Codex)

배포(`bee4ea1`) 뒤 확인에서 나온 수정. **공유 폴더 `C:/Users/정우진/Documents/vocab_master`에서 직접** 고친다(자기 워크트리 아님). 커밋 금지.

## 1. Part 1 m-p1-17-06 (`docs/mock/m-p1-4.json`)
사진 `images/mock/m1-17-6.webp`에는 바리케이드 너머 같은 방향 두 차선에 차가 한 대씩 있다. 그래서 오답 C "Vehicles are lined up in both lanes."가 참으로 읽힌다. 사진은 그대로 두고 문항을 고친다.
- `choices[2]` → `"A car is parked inside the barriers."`, `ko.choices[2]` → `"바리케이드 안쪽에 차 한 대가 주차되어 있다."` (바리케이드 안에는 맨홀과 뚜껑뿐이라 거짓).
- `alt`의 "반대편 차선에만 승용차 두 대가 서 있다" → 사진대로 "옆의 두 차선에 승용차가 한 대씩 지나가고 있다" 취지로.
- `explain`의 "차는 반대편 차선에만 있으며" → 바리케이드 안에는 차가 없다는 설명으로.
- `answer`(1)·`trap`·id 유지. 사진을 직접 열어 확인한다.

## 2. 주제 분류 5단어 (`packages/suneung.json`, `packages/teps.json`의 `topics`)
- suneung `emergency`(사회·공동체) → 빼기. `whistle`(문화·예술·언어) → 빼기.
- teps `conference`(학교·교육) → `직업·노동`으로. `noticeboard`(사회·공동체) → 빼기. `tired`(감정·성격) → `건강·의료`로.
- 옮길 때는 대상 주제의 마지막 항목에 넣되 한 항목 20단어를 넘으면 같은 이름으로 새 항목을 만든다. 순서는 단어장 원래 순서(`words` 순).
- 파일 쓰기는 반드시 `scripts/merge-senses.js`의 `formatPackage(pkg, 기존텍스트)`로(기존 줄바꿈 CRLF/LF도 유지).

## 3. 재풀이에서 나온 수정
- **m-p4-20-07 Q1** (`docs/mock/m-p4-4.json`): 통화 날짜가 없어서 3월에 거는 전화라면 B "At the end of this month"도 정답(D "At the end of March")과 같은 뜻이 된다. B → `"At the end of this week"`, `ko.choices[1]` → `"이번 주 말"`. `explain` → `"임대가 3월 31일에 끝난다고 했으므로 (D)이다. 3년은 새로 제안된 갱신 기간이고, 이달 말은 결정을 알려 달라는 기한이다."` answer(3) 유지.
- **m-p3-16-04 대본** (`docs/mock/m-p3-4.json`): "So far only Dev and I have signed up." 뒤 M2의 "Actually, I'd rather join Rita on Sunday."는 M2가 Dev로 읽혀 토요일 인원이 "two others" 계산과 어긋난다. M2 첫 대사 → `"I haven't signed up either, and I'd rather join Rita on Sunday. My daughter has a swim meet on Saturday afternoon."` 한국어 대본의 같은 줄도 맞춘다("저도 아직 신청 안 했는데, 리타와 일요일에 하고 싶어요. 딸이 토요일 오후에 수영 대회가 있거든요."). 문항·해설이 이 대사에 기대는지 확인해 필요하면 함께 고친다.

## 확인
- `test/*.test.js` 전부 통과.
- 앱용 파일 `questions/mock/mock-17.json`은 리뷰어가 다시 조립하니 건드리지 않는다.
- 보고: 바꾼 id·단어와 전후 문장, 테스트 결과.
