# UI 12차: 음성 개선 (UI 워커)

출처: `docs/tasks/backlog.md` 화면·기능 2~4번. 사용자: "그것도 나중에 개선사항으로 넣자." "다음 순서로 진행"

## 시작 전
- 공유 폴더 `C:/Users/정우진/Documents/vocab_master`의 최신 파일을 작업 폴더로 가져온다(app.js, js/, core.js, style.css, sw.js, index.html, test/, packages/, questions/). 분리본과 수정된 Part 3·4 데이터가 합쳐진 상태다.
- 수정 가능: js/exam.js, js/shared.js, (꼭 필요하면) js/listen.js, style.css, sw.js, test/core.test.js. 데이터·app.js 수정 금지. 커밋 금지.

## 할 일
1. **Part 3·4 화자 성별** (js/exam.js 285~300행 근처): 대본 화자 코드(M, W, M1, M2, W1, W2 등. 실제 값은 questions/toeic-part3·4.json에서 확인)의 첫 글자로 성별을 정해, 그 성별로 보이는 영어 음성을 고른다.
   - 음성 성별은 voice.name으로 추정(예: David, Mark, Guy, Daniel, George, Ryan, "Male" → 남 / Zira, Aria, Jenny, Hazel, Susan, Samantha, Karen, Libby, Sonia, "Female" → 여). 목록은 작게, 한 곳에.
   - 맞는 성별 음성이 없으면 지금처럼 공용 음성을 쓰되 pitch로 구분(여 높게, 남 낮게). 같은 성별 화자 2명이면 서로 다른 음성 우선, 부족하면 pitch로.
   - 질문 읽기 음성은 지금 규칙 유지.
2. **단어 발음 음성 선택** (js/shared.js `speak`): `utterance.lang`만 넣지 말고 듣기 모드처럼 `speechVoice`로 해당 언어 음성을 골라 `utterance.voice`에 지정.
3. **독일어 음성 없음 안내**: de 단어장에서 발음 버튼을 눌렀는데 기기에 de 음성이 하나도 없으면 토스트 1회(세션당 한 번): "이 기기에 독일어 음성이 없어 다른 음성으로 읽어요. 기기 설정에서 독일어 음성을 추가할 수 있어요." 같은 뜻. 듣기 모드도 같은 상황이면 같은 안내.
4. **빗금 표제어**: "ihr / Ihr", "Deutsch / deutsch"처럼 ` / `가 있으면 소리로는 앞부분만 읽는다(화면 표시는 그대로). "entweder ... oder" 같은 말줄임은 그대로 둔다. 순수 함수로 만들고 test/core.test.js에 테스트.

## 검증
- node test/*.test.js 전부 통과.
- Playwright 390px: Part 3 세트 재생 시작, 독일어 Day 발음 버튼(음성 없는 환경이면 안내 토스트 확인), 콘솔 에러 0. 이 PC는 영어(David/Zira 등)·한국어 음성만 있으니 Part 3에서 M→남, W→여 음성이 배정되는지 큐(queue)를 로그로 확인.
- sw.js CACHE_VERSION 올림.
보고: 바꾼 파일·함수, 성별 추정 목록, 검증 결과, 남은 문제.
