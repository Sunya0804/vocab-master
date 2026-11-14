# 기능 추가 공통 규칙 (feat-A/B/C가 함께 읽는다)

사용자: "판단한대로 모두 작업 진행바람." 세 작업(A·B·C)이 동시에 진행되므로 아래를 지킨다.

## 작업 위치

- 공유 폴더(C:/Users/정우진/Documents/vocab_master)에서 **직접 수정하지 않는다.** 자기 worktree를 만든다:
  `git -C C:/Users/정우진/Documents/vocab_master worktree add C:/Users/정우진/Documents/vm-wt/<트랙> -b feat/<트랙> main`
- 그 안에서 작업하고 브랜치에 커밋한다. push하지 않는다. 끝나면 커밋 해시와 바꾼 파일을 보고한다. 병합은 총괄이 한다.

## 앱 구조

- 빌드 없음. `index.html`이 `core.js` → `js/*.js` → `app.js`를 classic script로 차례로 불러 전역을 공유한다. 새 파일을 만들면 `index.html`과 `sw.js`의 `APP_SHELL`에 넣는다. **`CACHE_VERSION`은 바꾸지 않는다**(총괄이 병합 때 올린다).
- 학습 로직·저장은 `core.js`(테스트 가능한 순수 함수), 화면은 `js/*.js`, 라우팅·이벤트는 `app.js`.
- 저장 상태를 늘리면 `Core.loadState`의 검증·이전 상태 호환, 설정의 **백업·복원**에 포함되게 하고, 예전 백업 파일도 그대로 복원되게 한다.
- 문구는 한국어, 기존 화면 톤(짧고 존댓말, 이모지 없음)과 `style.css`의 토큰·간격(4px 단위)·다크 모드를 따른다.

## 확인

- `test/*.test.js` 전부 통과. 새 core 함수는 테스트를 추가한다.
- 로컬 서버(`npx serve` 등)로 360px 폰·약 900px 폴더블·1280px PC, 라이트·다크에서 새 화면을 열어 깨짐이 없는지 확인한다.
- 다른 트랙 파일은 꼭 필요한 줄만 건드린다(특히 `app.js` 라우트 추가는 몇 줄로).
