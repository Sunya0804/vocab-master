# UI 7차: 듣기 모드 리뷰 반영 (Codex UI 워커)

근거: docs/reviews/review-5-listen.md (판정 "출시 가능", 아래 3건 반영). 수정 가능: app.js, sw.js(캐시 버전 올리기). 그 외 금지.

1. [중간] app.js:762-768 스페이스 처리기: 포커스가 button·a·summary·[role=button]·input·select·textarea·[contenteditable]이면 가로채지 말 것(리뷰 제안 코드 참고).
2. [낮음] aria-live: 듣기 재생 중 main 전체 재렌더로 live 노드가 매번 교체됨 → 카드의 aria-live를 빼고, 짧은 상태 문구(예: "3/20 accommodate")만 유지되는 단일 live 노드의 textContent로 갱신. TTS와 중복 낭독이 많지 않게 짧게.
3. [낮음] 음성 목록 늦게 도착: readListenWord에서 단어마다 listenVoices()를 다시 읽고, 빈 배열이면 이전 값 유지. 첫 판정이 "한국어 없음"이었다가 나중에 생기면 다음 단어부터 한국어 읽기 재개, 잘못된 토스트는 한 번만.
(4번 iOS 제스처 문제는 실기기 확인 뒤 별도 처리 — 이번엔 하지 말 것.)

검증: node test/core.test.js, node test/toeic.test.js 통과. Playwright headless 모킹으로 1(버튼 포커스+스페이스 → 해당 버튼 동작), 3(voices 지연 → 다음 단어부터 ko 발화) 재현 확인, 콘솔 에러 0. 서버·생성물 정리.
보고: 변경 요약, 검증 결과.
