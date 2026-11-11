# 검토 15차: 모의고사 LC(Part 1·2·3·4) 내용 검토 (Codex 검토자)

대상: `docs/mock/m-p1.json`(30, 사진 `images/mock/*.webp`), `m-p2.json`(125), `m-p3.json`(65세트, 작성 중 — 65세트가 될 때까지 다른 파트 먼저), `m-p4.json`(50세트). 5회분, 항목마다 `test`.
기준: `docs/tasks/mock-spec.md`, Part 2 `docs/tasks/exam-spec.md`, Part 3·4 `docs/tasks/exam-lc-spec.md`, Part 1 `docs/tasks/exam-p167-spec.md`(끝의 "검토에서 나온 규칙"), 이전 Part 1 검토 `docs/reviews/review-11-p1.md`.
형식·수량·정답 분포·그래픽 위치·의도 인용문은 총괄이 자동 점검으로 통과시켰다. **내용만** 본다.

## 볼 것 (전수)
1. 정답 유일성·근거(필수). Part 1은 사진을 하나씩 직접 열어 확인. Part 2는 세 응답 모두 대입. Part 3·4는 대본만으로 정답이 하나인지, 그래픽 문항은 표와 대본을 함께 봐야 풀리는지.
2. Part 1 사진 품질(손·얼굴 왜곡, 상표 무늬·글자, 카메라 응시)과 번역의 동작/상태 구분(putting on = 입는 중).
3. 반복 틀: 회차 안·회차 간 같은 상황·흐름·문항 순서(13차 RC에서 "다섯 회차가 같은 뼈대"가 나왔다).
4. 소재 겹침: 연습 문제(`questions/toeic-part1~4.json`)와 겹치는 상황, 회사 맥락 비중.
5. 회차 간 난이도 균형, 영어 자연스러움(대본은 실제 구어로), 번역 오류.

## 방법
파일 수정·커밋 금지. 결과는 `docs/reviews/review-15-mock-lc.md`: 맨 위 요약(파일·회차별 필수/권장), 이어서 문항 id·심각도(필수/권장/참고)·근거·고칠 방법(사진 재생성 필요 여부). 끝나면 요약 보고.
