# 검토: 다의어 예문 2단계 (Codex 검토자)

대상: `docs/senses/draft-2.json`(381개, OpenCode 작성) + `docs/senses/draft-1b.json`(30개). 지시서 `docs/tasks/toeic-senses-2.md`. 기존 단어는 `packages/toeic.json`의 `words[index]` = [en, ko, pos, ex, exKo].
총괄 기계 점검: 표제어·index 일치, sense 누락 0, 길이 정상, 틀 반복·중복 없음, 빈칸 불가 2개.

## 볼 것 (전수)
1. **sense가 기존 ex와 다른 뜻인가**(같은 뜻이면 "제외"). 예: cold [추운]이 기존 예문도 '추운'이면 제외.
2. 그 sense가 토익에서 실제로 쓰이는 뜻인가(아니면 "제외" 또는 다른 뜻으로 교체 제안).
3. 예문이 그 sense로만 읽히는가, 영어가 자연스러운가.
4. exKo 해라체·자연스러움(어색한 직역).
5. 빈칸 불가 2개(활용형 문제) 수정안.

## 방법
파일 수정 금지, 커밋 금지. 결과 `docs/reviews/review-senses-2.md`: 맨 위 요약(통과/수정/제외 개수와 비율), 이어서 수정·제외 항목만 index·en·이유·고친 문장. 끝나면 보고.
