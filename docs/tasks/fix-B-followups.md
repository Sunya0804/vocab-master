# 기능 B 후속 개선 2건

출처: `docs/reviews/review-feat-B.md`의 "남은 권장 사항" 1·2번. 공통 규칙은 `docs/tasks/feat-common.md`.

## 할 일
1. **유형 필터와 통계 범위 맞추기.** 파트별 연습에서 유형을 고르면 연습과 채점은 그 유형 문항만 하는데, 파트 카드의 학습 통계(정답률·푼 문항 수)는 그 유형이 든 세트 전체 문항을 센다. 통계도 고른 유형 문항만 세도록 고친다. 유형을 고르지 않았을 때 결과는 지금과 같아야 한다.
2. **LC 영어 안내문 번호 맞추기.** 유형 연습 중 LC 세트의 영어 direction("Questions 32-34 refer to…" 같은 문장)이 원래 세 문항 번호를 그대로 보여 준다. 화면에 실제로 보이는 문항 번호에 맞춘다. 문항이 하나면 "Question 33 refers to…"처럼 단수로 쓴다.

각 항목마다 회귀 테스트를 하나씩 추가한다(`test/feature-b.test.js` 또는 해당 기능 테스트 파일).

## 작업 방식
- **worktree_integrate 금지, 공유 폴더 반영 금지, 브랜치 커밋만.**
- worktree를 새로 만든다: `git -C C:/Users/정우진/Documents/vocab_master worktree add C:/Users/정우진/Documents/vm-wt/fix-b -b fix/b-followups main`. 그 안에서 `git config core.autocrlf false`를 설정한다.
- `test/*.test.js`를 전부 실행해서 모두 통과하는지 확인한다.
- `fix/b-followups` 브랜치에 커밋한다. push하지 않는다. 브라우저 확인은 하지 않는다(총괄이 한다).
- 끝나면 고친 내용, 커밋 해시, 테스트 결과를 짧게 보고한다.
