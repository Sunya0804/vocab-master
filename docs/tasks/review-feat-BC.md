# 코드 검토 — 기능 B / C

공통 규칙: `docs/tasks/feat-common.md`. 지시받은 트랙 하나만 검토한다.

| 트랙 | 요구사항 | 브랜치 |
|---|---|---|
| B | `docs/tasks/feat-B.md` (모의고사 약점 분석, LC 다시 듣기, 화자 음성) | `feat/b` |
| C | `docs/tasks/feat-C.md` (검색, 통계, 받아쓰기, 독일어 발음) | `feat/c` |

## 방법
- 공유 폴더는 건드리지 않는다. 검토용 worktree를 만든다: `git -C C:/Users/정우진/Documents/vocab_master worktree add C:/Users/정우진/Documents/vm-wt/review-<트랙> feat/<트랙>` (브랜치를 그대로 체크아웃). `worktree_integrate`는 쓰지 않는다.
- `git diff main...feat/<트랙>`을 요구사항과 대조: 정확성, 경계 조건, 오류 처리, 저장 상태 호환(예전 상태·백업), 음성·타이머 정리(화면 이동 시 재생 중단), 성능(검색이 큰 단어장에서 버벅이지 않는지), 접근성(버튼 이름, 포커스).
- 테스트 전부 통과 확인. 화면은 총괄이 병합 후 확인하므로 브라우저 확인은 하지 않아도 된다.

## 결과
문제는 그 worktree에서 **feat/<트랙> 브랜치에 직접 고쳐 커밋**하고, `docs/reviews/review-feat-<트랙>.md`에 판정(병합 가능/불가), 고친 것, 남은 권장 사항을 적는다. push하지 않는다.
