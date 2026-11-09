# 토익 정렬 후속 정리 (Codex 코어 워커)

배경: packages/toeic.json 을 레벨순 정렬하고 levels를 추가했다(docs/tasks/toeic-sort.md). 리뷰 docs/reviews/toeic-sort-review.md 4절 참고.
수정 가능: test/toeic.test.js, packages/toeic.json(아래 B의 4항목만), docs/toeic-sources.json·docs/toeic-review.json(필요 시 정렬 후 의미를 명시하는 필드 추가만, 기존 역사 기록 덮어쓰기 금지). core.js·app.js 수정 금지.

## A. test/toeic.test.js 를 정렬 후 계약에 맞추기 (P1)
- 105·108·109줄의 순서 민감 해시 → 순서 독립 검사로 교체: 정렬 전 원본 260쌍/legacy 표제어가 **집합으로** 모두 존재하는지(표제어 교정 반영), 전체 단어 수 일치. 순서 독립 해시(예: 정렬된 사본의 해시)를 쓰려면 B 수정 뒤 값 기준으로.
- 116줄 dayLevels 전부 null 기대 → 레벨 5개(23/76/110/58/24), null 0, words가 docs/toeic-levels.json 기준 레벨 오름차순인지 검사.
- 출처 행의 entryIndex는 정렬 전 위치임: 위치 대신 표제어로 대조하도록(이미 그렇다면 그대로).
- 실패 뒤에 가려져 있던 나머지 테스트도 모두 통과해야 함.

## B. 데이터 보완 (P2, 리뷰 표의 제안값 그대로)
- vaccination: ko "예방 접종", exKo "진료소는 예방 접종에 관한 정보를 제공했다."
- face away from: ko "~의 반대쪽을 향하다; ~에게서 고개를 돌리다"
- gloomy: exKo "팀은 회의에서 어둡고 음침한 방들에 관해 논의했다."
- lax: ex "The manager criticized the lax safety rules.", exKo "관리자는 느슨한 안전 규정을 비판했다."
위치(순서)는 바꾸지 말 것.

## 검증
```
node test/core.test.js
node test/toeic.test.js
```
둘 다 0 failed. 보고: 바꾼 검사 요약, 두 테스트 출력 끝부분.
