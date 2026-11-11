# 9차 리뷰: Part 3·4 수정 재확인 + 예문 빈칸 + app.js 분리

## 판정: **수정 필요** (작은 수정 4건이면 배포 가능)

- 8차 데이터 지적은 거의 다 해결됐습니다. 정답 오류(정답이 없거나 둘)는 0/276입니다.
- 남은 핵심은 네 가지입니다. 고친 대본이 앞뒤가 안 맞는 세트 2개(p3-017, p3-045), 의도 문항 1개(p4-008), 예문 빈칸에서 짧은 단어가 든 숙어의 빈칸이 엉뚱한 단어에 뚫리는 문제입니다.
- 셋 다 몇 줄만 고치면 됩니다. 고친 뒤 다시 리뷰할 필요는 없고, 해당 항목만 확인하면 됩니다.
- 파일 분리는 통과했습니다. 콘솔 에러 0, 테스트 전부 통과입니다.

## 범위·방법

- **데이터**
  - 바뀐 세트를 가려내려고, 8차 리뷰 때 세션 기록에 남은 원문과 현재 텍스트를 대조했습니다.
  - 그 결과 92세트 중 **79세트가 바뀌었고**, 79세트를 **전부** 검토했습니다(대본, scriptKo, 3문항, ko, explain).
  - 바뀌지 않은 13세트(p3-011, 016, 020, 027~033, p4-001, 007, 016)도 11세트를 읽었습니다(약 85%).
  - 작성자 파일 4개를 서브에이전트 4개가 하나씩 검토했습니다. 중간 등급 3건(p3-017, p3-045, p4-008)과 p4-026은 제가 원문을 직접 확인했습니다.
- **기계 점검(제가 직접)**
  - 병합본과 원본은 id만 다르고 불일치 0입니다.
  - 그래픽 20문항 모두 보기가 표 순서입니다.
  - 의도 문항 인용문은 모두 대본에 그대로 있습니다.
  - 개수 유지: 세트·난이도·talkType·그래픽·3인·의도 개수와 단어 수(P3 113~150, P4 109~159)가 모두 명세 안입니다.
- **코드**
  - 읽은 파일: core.js diff, js/study.js, js/shared.js, app.js, index.html, sw.js
  - 예문 빈칸 규칙을 전 단어장(29,161단어)에 실행해 봤습니다.
  - 로컬 서버 + Playwright headless 390px(서비스 워커 차단, 음성 합성 가짜 객체)로 화면을 확인했습니다.
- **테스트**
  - core 49, german 6, german-advanced 7, questions 14, toeic 6. 모두 통과했습니다.

---

## 1. [중간] 예문 빈칸: 2~3글자 단어가 든 숙어는 빈칸이 엉뚱한 단어에 뚫림 — `core.js` `clozeExample`

**근거**
- 표제어를 단어별 어간으로 나눈 뒤, 예문에서 그 어간으로 **시작하는** 첫 단어를 고릅니다(`indexOf(stem) === 0`).
- 그래서 in, as, for, a 같은 짧은 단어가 앞쪽의 다른 단어에 붙습니다. 그 결과 **올바른 숙어를 입력해도 오답**이 됩니다.

| 표제어 | 예문 | 지금 빈칸·정답 |
|---|---|---|
| in person | …attend the **interview** in **person**. | `interview person` |
| as if | The new **assistant** works as **if**… | `assistant if` |
| in a row | Sales have **increased** for three months in **a row** | `increased a row` |
| for the sake of | We simplified the **form** for **the sake of**… | `form the sake of` |
| in error | The duplicate **invoice** was sent in **error**. | `invoice error` |
| in turn | …will **introduce** their project in **turn**. | `introduce turn` |
| in a timely fashion | All **inquiries** should be **answered** in a **timely fashion**. | `inquiries answered timely fashion` |

- 토익 단어장에서 약 13단어가 이렇습니다(기계 추출). 브라우저에서도 `Core.clozeExample(['in person',…])` 결과가 `interview person`인 것을 확인했습니다.
- 수능·텝스는 숙어가 없어서 영향이 없습니다.

**제안**
- 3글자 이하 어간은 단어 전체가 일치할 때만 고르게 합니다. 영어는 s/ed/ing가 붙은 형태까지 허용합니다.
  - 예: `stem.length <= 3 ? tok === stem || /^(s|es|d|ed|ing)$/.test(tok.slice(stem.length)) : tok.startsWith(stem)`
- core.test.js에 `in person`과 `as if` 사례를 추가합니다.
- 같은 규칙을 쓰는 `highlightedExample`도 같은 단어를 강조합니다. 공통 함수 한 곳만 고치면 둘 다 바로잡힙니다.

## 2. [중간] 데이터: 고치면서 생긴 대본 논리 오류 2건

| id(원 id) | 위치 | 문제 | 제안 |
|---|---|---|---|
| p3-017 (p3-1-017) | 대본 1·2행 | 1행이 "I've reviewed your request… HR needs my approval as your team supervisor."로 바뀌면서 질문이 없어졌습니다. 그런데 2행은 그대로 "Just for me. …"입니다(직접 확인). | 1행 끝에 "Is the change for the whole team?"을 넣고, scriptKo 1행에 "팀 전체를 바꾸려는 건가요?"를 넣습니다(약 144단어). |
| p3-045 (p3-2-019) | 대본 5~7행 | 1행 "can't use them for tonight's dinner service"가 문제인데, 해결책은 기사가 와서 "check the jackets… and collect them"뿐입니다. 저녁 전에 다려서 돌려준다는 말이 없어서, 오히려 옷을 가져가 버리는 흐름입니다(직접 확인). | 6행 끝에 "…and have them pressed and back before five."를 붙이고 scriptKo 6행도 고칩니다. Q3 정답은 그대로 둡니다. |

## 3. [중간] 데이터: p4-008 Q2 의도 문항이 다시 바로 앞 줄에서 풀림

- 인용문은 제안대로 "Most of the packet still holds up."로 바뀌었습니다.
- 그런데 바로 앞 3행 "…the product photographs, delivery information, and cover design that we approved last month are all still accurate."가 뜻을 그대로 말해 줍니다.
- 그래서 정답 (D) "Earlier material can be repurposed"가 드러납니다(직접 확인).
- 제안: 3행을 "Only page six carries any prices."처럼 간접적인 문장으로 줄이고, 사진·표지 이야기는 인용문 뒤로 옮깁니다. explain도 함께 고칩니다.

## 4. [낮음] 데이터: 그 밖에 이번 수정으로 생긴 문제

| id(원 id) | 위치 | 문제 | 제안 |
|---|---|---|---|
| p4-026 (p4-2-006) | Q2(A), Q3(B) | 보기에 "drills"가 있는데, 대본에는 drill이 한 번도 나오지 않습니다(고치기 전 내용이 남음, 직접 확인). 함정 역할을 못 합니다. | "Shoppers should receive refunds without receipts." / "Write descriptions on purchase receipts." |
| p4-003, p4-020 | 오답 | 대본에서 지운 내용에 기댄 오답이 남았습니다. p4-003 Q1(B)·Q3(C) "training materials", p4-020 Q1(B)·Q2(D)·Q3(A) "stockroom/storage" | 대본 단어를 쓴 함정으로 바꿉니다. 예: p4-003 Q3(C) "Print the electronic versions for review" |
| p4-009 (p4-1-009) | 대본 5행 | "during those appointments"가 6행에서 상담을 소개하기 전에 나옵니다. | "during one-on-one appointments" |
| p4-013 (p4-1-013) | 대본 4·5행 | "the invitation"이 5행에서 초대장을 소개하기 전에 나옵니다. | 4행과 5행을 맞바꾸고 scriptKo도 같이 바꿉니다. |
| p4-018 (p4-1-018) | 대본 5·6행 | "the first exercise"와 "the next activity"가 같은 활동인데 둘로 들려서, Q3 "next"가 헷갈립니다. | 6행을 "For this exercise, …"로 |
| p4-028 (p4-2-008) | Q3 발문 | "on arrival"인데, 근거인 7행은 "before entering the water"입니다. | "…before entering the pool?" |
| p4-033 (p4-2-013) | Q1 정답 | "exploring alternatives to driving"인데, 대본에는 청중이 차로 출퇴근한다는 말이 없습니다. | "Workers considering a new way to commute." |
| p3-009 (p3-1-009) | 대본 5행 | (추측) "pay for the delivered portion…, so instruction needn't wait"에서 대금 지급과 수업 진행을 so로 이었습니다. | "…, and the class can still go ahead with the installed units." |
| p3-003 (p3-1-003) | 대본 3행 | (추측) "what happens after office hours"의 전제(저녁 설치)가 앞에 없습니다. | 1·2행에 "since installation is planned for the evening" |
| p3-035 (p3-2-009) | 대본 6행 | (추측) "fillings", "no recipient's name"이 맥락 없이 남은 흔적입니다. | "I'll sort them by flavor and add the labels." |
| p3-041 (p3-2-015) | Q3 정답 | 난이도 2인데 "original … document"가 대본의 "original lease"를 그대로 씁니다. | "Bring a non-copied rental agreement" |
| p3-003 Q2, p3-023 Q2 | 의도 ko.q | scriptKo만 바뀌어 인용문 번역이 다릅니다("그게 전부는 아니에요" ↔ "그건 이야기의 절반뿐이에요", "익숙하게 들리네요" ↔ "어딘가 익숙하네요"). | 하나로 맞춥니다. |
| p4-032 (p4-2-012) | Q2(B) ko | "homebound employees"를 "…판매하기 위해"로 옮겼습니다. | "귀가하는 근로자들의 편의를 위해" |
| 여러 세트 | ko 보기 어미 | 정답 보기만 "~하는 것/~다"로 끝나고 오답은 명사형입니다(p3-008, 015, 023, 036, 040, 042, 043, 045~050 등). 채점 뒤에만 보이므로 정답 노출은 아닙니다. | 어미를 통일합니다. |
| p3-021 Q2, p4-020 Q2 | 보기 형식 | 정답만 문형이 다릅니다(명사구 vs 동사구, 절 vs "By…"). | 다른 보기와 같은 형식으로 |
| p4-034 Q2 | 의도 | (추측) 정답이 인용문의 expensive를 costly로 바꾼 것뿐이고, 오답이 터무니없습니다. | 오답 하나를 대본 맥락을 쓴 함정으로 |

## 5. [낮음] 데이터: 8차 지적 중 미해결·부분 해결

- **줄거리 반복**
  - p3-024: "수정본을 만들고 배포 전에 확인"하는 결말이 그대로입니다.
  - p3-2: 무언가를 보내며 끝나는 세트가 12개에서 9개로 줄었습니다(028, 031, 032, 037, 038, 042, 043, 049, 052).
- **정답이 가장 긴 보기 비율:** p3-2만 35%로 그대로입니다. 나머지는 p3-1 29%, p4-1 28%, p4-2 20%로 내려갔습니다.
- **p4-1 대본이 오답을 미리 반박:** 일부 남았습니다(p4-001 4행 "You don't need to bring references…", p4-018 2행).
- **8차에는 없던 참고 사항:** 바뀌지 않은 의도·추론 문항 몇 개도 앞뒤 줄이 뜻을 거의 말해 줍니다(p3-043, p3-047, p4-018 Q2, p3-024 Q2, p3-019 Q2). 고칠지는 선택입니다.

## 6. [낮음] 예문 빈칸: 명세와 다른 점

- **독일어 활용형:** 명세의 "fährt"(fahren의 활용형)를 정답으로 인정하는 예시와 달리, 규칙상 매칭에 실패해서 문제에서 빠집니다.
  - 테스트(`core.test.js:716`)가 이 동작을 의도한 것으로 명시하고 있으므로, 강조 규칙을 그대로 쓰라는 명세 쪽 예시가 틀린 것으로 봅니다.
  - 다만 분리동사(abfahren → "fährt … ab")와 현재형 활용이 대부분 빠집니다.
  - 매칭 실패율(전 단어장):

    | 단어장 | 실패율 |
    |---|---|
    | 독일어 A1 | 11.6% |
    | 독일어 B1 | 12.6% |
    | 독일어 C2 | 16.4% |
    | 토익 | 5.3% |
    | 수능 | 0.7% |
    | 텝스 | 0.3% |

  - 제안: 지금 그대로 두고 백로그에 올립니다.
- **독일어 접두어 항목:** "Feier-", "Lieblings-" 같은 표제어는 합성어 전체("Feiertags")가 빈칸이 됩니다. 정답 판정은 일관되지만 표제어와 답이 다릅니다. 제안: 접두어 항목(`-`로 끝나는 표제어)은 제외합니다.

## 7. [참고] 파일 분리

- **구조:** IIFE를 풀어 일반 `<script defer>` 7개(core, shared, study, listen, exam, settings, app)가 전역 렉시컬 스코프를 공유합니다. index.html 순서와 sw.js APP_SHELL(js 5개 포함)이 맞고, CACHE_VERSION은 `v19-split`입니다.
- **전역 이름 충돌:**
  - 최상위 이름 121개 중 파일 사이 중복은 0개입니다.
  - 새 창(iframe)의 window 속성과 겹치는 이름은 `escape` 하나입니다. `const`라 window.escape를 가려도 오류는 없고, 앱의 escape가 정상으로 동작합니다(`escape('<') === '&lt;'`).
  - 함수 선언 67개가 window 속성이 됩니다. 지금 충돌은 없지만, 앞으로 `close`, `open`, `print`, `find`, `stop` 같은 이름은 피해야 합니다. 백로그에 한 줄로 남기면 됩니다.
- **"코드 이동만"인지:** 분리 전 원본이 git에 없어서 diff로 확인하지 못했습니다. 화면 동작과 테스트로만 확인했습니다.
- **화면 진입(390px):** 홈, Day, 카드(뒤집기), 객관식 퀴즈(답하기), 예문 빈칸, 듣기, 문제 홈, Part 3 세트(표, 보기 버튼 12개), Part 4 세트, 설정, 오답노트. **콘솔 에러 0**이고 scrollWidth는 375~390입니다.

## 확인한 동작 (통과)

**예문 빈칸**
- Day 버튼에 "예문 빈칸 · N문제"가 표시됩니다. 오답노트와 "틀린 것만 다시"에서도 시작됩니다.
- 빈칸은 글자 수만큼 밑줄로 보이고, sr-only로 "빈칸 11글자"를 읽습니다. 힌트를 쓰면 "빈칸 11글자, pa로 시작"으로 바뀝니다.
- 힌트를 2번 누르면 "pa_________"가 되고 버튼이 비활성(2/2)이 됩니다. 이때 포커스는 입력칸으로 갑니다.
- 입력칸: `lang=en-US`, autocapitalize·autocorrect off, spellcheck false. 단어 뜻은 채점 전에 숨겨집니다.
- 빈 답은 "답을 입력해 주세요."로 막힙니다. Enter로 제출됩니다.
- 오답이면 "오답이에요 · 정답 participate · 내 답 zzzz"를 아이콘과 글자로 보여 줍니다(색에만 의존하지 않음). 스크린리더 알림이 나가고, 포커스는 "다음"으로 갑니다.
- 결과 화면에 "힌트 사용 1문제"가 표시됩니다.
- 기록은 `Core.recordAnswer`를 재사용하고 새 저장 키는 없습니다. Day 최고 점수에는 넣지 않습니다(`dayKey:null`).
- 정답 비교: 공백·대소문자, ’ 따옴표, 독일어 ä/ae·ß/ss를 같게 봅니다. 움라우트를 빼고 쓴 "fahrt"는 오답으로 처리합니다(테스트 포함).
- 처음부터 끝까지 키보드만으로 풀 수 있습니다.

**데이터**
- 8차 §1 바꿔 말하기 18문항, §2 그래픽(p4-030 재설계, p3-010 Cedar 행, p3-002, 보기 순서 9개), §3 p4-003·p4-015·p4-040, §6 표 20건은 모두 해결됐습니다.
- 1번 문항 speaker는 16개에서 35개로 늘었고, 3번 문항 suggest는 19개에서 38개로 늘었습니다.
- 정답 위치는 4개 파일 모두 A~D 각 20~30%입니다.

## 확인하지 못한 것
- 실기기 음성과 스크린리더
- 서비스 워커를 켠 상태에서 오프라인으로 새 js 파일이 캐시되는지 (Playwright에서 서비스 워커를 차단함)
- 분리 전후 main.innerHTML 비교 (분리 전 원본이 없음)
- docs/reviews/cloze/ 스크린샷 4장: 파일이 있는 것만 확인했고, 직접 캡처한 화면으로 대신 확인함
- 영어 자연스러움: 텍스트로만 판단함
- js/exam.js·shared.js는 음성 개선 작업이 동시에 진행 중이라, 이번 확인은 리뷰 시점의 파일 기준임
