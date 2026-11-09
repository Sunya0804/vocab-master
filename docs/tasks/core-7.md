# 코어 7차 (Codex 코어 워커)

## A. 리뷰 결과 파일로 저장 (방금 한 토익 난이도 분류표 리뷰)
방금 보고한 B(토익 분류표 리뷰) 결과 전문을 `docs/reviews/toeic-levels-review.md`로 저장:
표본 일치율, 2단계 이상 오분류 목록(단어/현재/제안) 전부, 파생형 규칙 등 패턴 이슈, 최종 판정.
OpenCode가 이 파일을 보고 분류표를 고칠 거라서, **기계적으로 적용 가능한 규칙**(예: "파생 부사는 원형 레벨 +1 이내", "다음 단어들은 1로")을 따로 정리해줘.

## B. dayLevels 빈 이름 거부 (3차 리뷰 #6)
core.js dayLevels: level.name이 문자열이어도 trim() 후 비어 있으면 levels 전체 무시(전부 null). test/core.test.js에 케이스 추가.

수정 파일: core.js, test/core.test.js, docs/reviews/toeic-levels-review.md(신규) 만.
완료 기준: node test/core.test.js 전부 통과. 보고.
