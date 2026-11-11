# 다의어 예문 2단계 전수 검토

| 대상 | 전체 | 통과 | 수정 | 제외 |
|---|---:|---:|---:|---:|
| draft-2.json | 381 | 276 (72.4%) | 82 (21.5%) | 23 (6.0%) |
| draft-1b.json | 30 | 21 (70.0%) | 8 (26.7%) | 1 (3.3%) |
| **합계** | **411** | **297 (72.3%)** | **90 (21.9%)** | **24 (5.8%)** |

검토일: 2026-11-12. 작성자 A(Codex). `review-senses-2.md`와 `toeic-senses-1.md`·`toeic-senses-2.md` 기준으로 411개 전부를 `packages/toeic.json`의 `words[index]` 원래 예문과 대조했다. 아래에는 수정·제외 항목만 기록한다. 데이터·코드 수정 및 커밋은 하지 않았다.

판정: `수정`은 의미 표지(sense)만 좁히면 되는 경우도 포함한다. 한 문장에 나타나지 않는 별개 뜻을 함께 적은 항목은 그대로 통과시키지 않았다. 명사·동사 등 품사 차이를 무조건 제외하지는 않았으나, 같은 의미와 같은 활동을 다시 표현한 항목은 제외했다. 특히 기존 예문과 같은 결합·상황을 반복하는 경우는 구체적인 비교 근거를 적었다. 토익 적합성은 업무·여행·일상 장면에서의 활용성 판단이며 실제 기출 빈도를 집계한 결과는 아니다. 드문 용법의 교체 제안은 문법 오류 판정과 구별했다.

핵심: 기존 의미 반복과 sense 범위 과다가 다수다. `expatriate=국적을 상실한 사람`, `epidemic=전염성의`, `overhaul=철저히 조사하다`는 의미 표지를 바로잡아야 한다. 검토 도중 equal·yield·deposit 3개가 갱신되어 최신 예문으로 재판정했다. deposit의 번역은 수정됐지만 sense는 아직 '맡기다'이다. yield는 광고 문맥의 수익·수익률이 모호해 다른 뜻의 예문을 제안했다.

빈칸 생성은 실제 `core.js`의 `clozeExample(word, false)`로 재현했다. 원본 실패는 2개: index 439 story(`ten-story`)와 index 3900 high-rise(`high-rises`). story는 독립된 명사를 쓰면 해결된다. high-rise는 단수도 실패하므로 활용형 문제가 아닌 하이픈 토큰화 문제다. 엔진 수정 제안을 해당 항목에 적었으며 코드는 수정하지 않았다. 수정 제안 90개 모두 12~20단어이고 빈칸 함수 재검증 결과 story는 통과, high-rise 1개는 엔진 수정 전까지 실패한다. 합계 비율은 항목별 소수 첫째 자리 반올림값이다.

## draft-2.json

### index 90 · double · 제외 (7번째 항목)

- 현재 sense/pos: 두 배가 되다, 두 배로 하다 / 동
- 이유: 기존 demand to double과 새 double its advertising budget은 모두 수량이 두 배가 되거나 되게 하는 같은 뜻이다.
- 기존 예문: We expect demand to double during the holiday season.
- 추가 초안: To support the new product launch, the marketing team plans to double its advertising budget.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 214 · once · 수정 (15번째 항목)

- 현재 sense/pos: 이전에, 한 번 / 부
- 이유: sense가 '이전에, 한 번' 두 뜻을 함께 적었지만 예문은 횟수만 나타낸다. sense를 '한 번'으로 한정.
- 제안 sense/pos: 한 번 / 부
- 고친 문장 (영어 유지): I have met the new supplier once, but I cannot remember his name.
- exKo (유지): 나는 새 공급업체 담당자를 한 번 만난 적이 있지만 그의 이름은 기억나지 않는다.

### index 252 · rent · 수정 (20번째 항목)

- 현재 sense/pos: 빌리다, 빌려주다 / 동
- 이유: 임차하는 예문이다. sense를 '빌리다'로 한정.
- 제안 sense/pos: 빌리다 / 동
- 고친 문장 (영어 유지): We decided to rent a small office near the station for the sales team.
- exKo (유지): 우리는 영업팀을 위해 역 근처의 작은 사무실을 빌리기로 했다.

### index 285 · still · 수정 (24번째 항목)

- 현재 sense/pos: 여전히 / 부
- 이유: printer를 복사기로 오역했다.
- 고친 문장 (영어 유지): Our printer is still out of order, so please send the files to the branch office.
- exKo: 프린터가 여전히 고장 났으니 파일을 지사로 보내라.

### index 382 · face · 수정 (39번째 항목)

- 현재 sense/pos: 얼굴, 표면 / 명
- 이유: 예문은 사람의 얼굴이 아닌 건물 전면이다. sense를 '앞면, 전면'으로 한정.
- 제안 sense/pos: 앞면, 전면 / 명
- 고친 문장 (영어 유지): Workers will clean and repaint the face of the building during the summer.
- exKo (유지): 작업자들은 여름 동안 건물 외벽을 청소하고 다시 칠할 것이다.

### index 396 · land · 수정 (44번째 항목)

- 현재 sense/pos: 착륙하다, 획득하다 / 동
- 이유: 획득 의미가 없으므로 sense를 '착륙하다'로 한정.
- 제안 sense/pos: 착륙하다 / 동
- 고친 문장 (영어 유지): Landing in Tokyo at nine will leave us enough time for the meeting.
- exKo (유지): 9시에 도쿄에 착륙하면 회의에 쓸 시간이 충분히 남는다.

### index 399 · lead · 수정 (45번째 항목)

- 현재 sense/pos: 선두, 납 / 명
- 이유: 납은 발음·의미가 다른 뜻이다. 예문의 sense를 '선두, 우세'로 한정.
- 제안 sense/pos: 선두, 우세 / 명
- 고친 문장 (영어 유지): In this quarter's sales, our team holds a narrow lead over the competitor.
- exKo (유지): 이번 분기 매출에서 우리 팀은 경쟁사에 근소한 차이로 앞서 있다.

### index 401 · light · 수정 (48번째 항목)

- 현재 sense/pos: 불을 켜다 / 동
- 이유: light the hallway lamps는 전등을 켜는 문맥에서 부자연스럽고 불을 붙이는지 불분명하다. 불을 붙이는 대상을 명시. sense를 '불을 붙이다'로 수정.
- 제안 sense/pos: 불을 붙이다 / 동
- 고친 문장: Staff light the candles on each table shortly before the restaurant opens for dinner.
- exKo: 직원들은 식당의 저녁 영업이 시작되기 직전에 각 탁자의 초에 불을 붙인다.

### index 407 · long · 수정 (52번째 항목)

- 현재 sense/pos: 갈망하다 / 동
- 이유: routine paperwork를 사무직으로 넓혀 옮기고 after years of를 부자연스럽게 번역했다.
- 고친 문장 (영어 유지): After years of routine paperwork, he longs for a position with more responsibility.
- exKo: 몇 년 동안 반복적인 서류 업무를 해 온 그는 더 큰 책임을 맡는 자리를 갈망한다.

### index 412 · mind · 수정 (55번째 항목)

- 현재 sense/pos: 꺼리다, 주의하다 / 동
- 이유: 예문은 주의하다만 보여 준다. sense를 '주의하다'로 한정. '바닥을 주의하다'의 조사를 수정.
- 제안 sense/pos: 주의하다 / 동
- 고친 문장 (영어 유지): Visitors should mind the wet floor near the elevator during morning cleaning.
- exKo: 방문객은 아침 청소 시간에 엘리베이터 근처의 젖은 바닥에 주의해야 한다.

### index 418 · place · 수정 (58번째 항목)

- 현재 sense/pos: 놓다, 주문하다 / 동
- 이유: 예문은 주문하다이다. sense를 '주문하다'로 한정.
- 제안 sense/pos: 주문하다 / 동
- 고친 문장 (영어 유지): Please place your order by Thursday so the supplier can ship it on Monday.
- exKo (유지): 공급업체가 월요일에 출고할 수 있도록 목요일까지 주문해라.

### index 424 · produce · 수정 (60번째 항목)

- 현재 sense/pos: 농산물 / 명
- 이유: '값싼 식사를 유지하려고'가 부자연스럽다.
- 고친 문장 (영어 유지): The cafeteria buys fresh produce from nearby farms every Tuesday to keep meals affordable.
- exKo: 구내식당은 식사를 저렴하게 제공하려고 매주 화요일 인근 농장에서 신선한 농산물을 구입한다.

### index 437 · sound · 수정 (67번째 항목)

- 현재 sense/pos: 건전한 / 형
- 이유: sound review와 '건전한 검토'는 목표 뜻을 보여 주는 결합으로 부자연스럽다. 재무 상태로 명확화.
- 제안 sense/pos: 건전한 / 형
- 고친 문장: The company's sound financial position enabled it to expand without borrowing additional money.
- exKo: 회사는 재무 상태가 건전해 추가 대출 없이 사업을 확장할 수 있었다.

### index 439 · story · 수정 (69번째 항목)

- 현재 sense/pos: 층 / 명
- 이유: 실제 clozeExample에서 ten-story 복합어를 story와 매칭하지 못해 빈칸 생성 실패. 독립된 story로 수정.
- 고친 문장: The top story of the new headquarters contains meeting rooms with views of the station.
- exKo: 새 본사의 맨 위층에는 역이 내려다보이는 회의실들이 있다.

### index 442 · support · 수정 (71번째 항목)

- 현재 sense/pos: 지지, 받침대 / 명
- 이유: 받침대 의미는 없다. sense를 '지지'로 한정.
- 제안 sense/pos: 지지 / 명
- 고친 문장 (영어 유지): The marketing plan won strong support from regional managers at the annual meeting.
- exKo (유지): 그 마케팅 계획은 연례 회의에서 지역 관리자들의 강한 지지를 얻었다.

### index 447 · turn · 수정 (73번째 항목)

- 현재 sense/pos: 차례, 전환 / 명
- 이유: 전환 의미는 없다. sense를 '차례'로 한정.
- 제안 sense/pos: 차례 / 명
- 고친 문장 (영어 유지): It is your turn to present the quarterly results to the regional director.
- exKo (유지): 이제 네가 지역 본부장에게 분기 실적을 보고할 차례다.

### index 452 · wind · 수정 (76번째 항목)

- 현재 sense/pos: 감다, 구불구불 이어지다 / 동
- 이유: 구불구불 이어지다 의미는 없다. sense를 '감다'로 한정.
- 제안 sense/pos: 감다 / 동
- 고친 문장 (영어 유지): Please wind the cables neatly around the reel before returning the projector.
- exKo (유지): 프로젝터를 반납하기 전에 케이블을 릴에 깔끔하게 감아라.

### index 758 · closing · 수정 (90번째 항목)

- 현재 sense/pos: 폐회의, 마감하는 / 형
- 이유: 마감 일반이 아니라 회의의 마지막 순서다. sense를 '폐회의, 마지막의'로 한정.
- 제안 sense/pos: 폐회의, 마지막의 / 형
- 고친 문장 (영어 유지): The closing session of the conference will include a panel on workplace safety.
- exKo (유지): 콘퍼런스의 폐회 세션에서는 직장 안전에 관한 패널 토론이 열릴 것이다.

### index 793 · counter · 수정 (92번째 항목)

- 현재 sense/pos: 반대의 / 형
- 이유: counter offer의 일반적인 표기는 counteroffer/counter-offer이며 독립 형용사 counter 학습용으로는 품사·표제어 경계가 불명확하다. 독립 동사 '반박하다'로 교체 권장. 근거: [Oxford counter (verb)](https://www.oxfordlearnersdictionaries.com/definition/english/counter_2).
- 제안 sense/pos: 반박하다 / 동
- 고친 문장: The manager will counter the supplier's claim with delivery records showing repeated delays.
- exKo: 관리자는 반복된 지연이 드러난 배송 기록으로 공급업체의 주장을 반박할 것이다.

### index 835 · desktop · 제외 (95번째 항목)

- 현재 sense/pos: 탁상용의 / 형
- 이유: 기존 desktop computer와 새 desktop printers 모두 '탁상용의'이다. 같은 뜻을 다른 기기에 적용했을 뿐이다.
- 기존 예문: The desktop computer comes with a keyboard and a large monitor.
- 추가 초안: The design team prefers desktop printers because they handle large blueprints more reliably.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 1158 · luxury · 수정 (105번째 항목)

- 현재 sense/pos: 값비싼 / 형
- 이유: luxury suites는 값비싸다는 가격만이 아니라 고급·호화 시설을 뜻한다. sense를 '고급의, 호화로운'으로 수정.
- 제안 sense/pos: 고급의, 호화로운 / 형
- 고친 문장 (영어 유지): The hotel offers luxury suites with private terraces overlooking the busy harbor.
- exKo: 그 호텔은 분주한 항구가 내려다보이는 전용 테라스가 딸린 고급 스위트룸을 제공한다.

### index 1228 · original · 수정 (107번째 항목)

- 현재 sense/pos: 원형 / 명
- 이유: 계약서 원본을 가리킨다. sense '원형'을 '원본'으로 수정.
- 고친 문장 (영어 유지): Our lawyer compared the photocopy with the original of the purchase agreement.
- exKo (유지): 우리 변호사는 사본을 구매 계약서 원본과 대조했다.

### index 1269 · plenty · 제외 (109번째 항목)

- 현재 sense/pos: 많이 / 부
- 이유: 기존 plenty of room과 새 plenty big enough는 모두 같은 장비를 놓을 공간이 충분하다는 뜻·상황이다. 품사 표기만 바뀌었고 새 뜻을 더하지 않는다.
- 기존 예문: There is plenty of room for additional equipment.
- 추가 초안: For the additional equipment, the new server room is plenty big enough.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 1297 · professional · 수정 (112번째 항목)

- 현재 sense/pos: 직업상의 / 형
- 이유: '직업상의 콘퍼런스'는 어색하다. sense는 '직무와 관련된'으로 명료화.
- 고친 문장 (영어 유지): Each year she attends three professional conferences to maintain her industry certification.
- exKo: 그녀는 업계 자격을 유지하려고 해마다 직무 관련 학술회의에 세 번 참석한다.

### index 1317 · range · 수정 (113번째 항목)

- 현재 sense/pos: 늘어놓다, 배치하다 / 동
- 이유: range brochures는 문어적 배열 용법이라 토익용 예문으로 부자연스럽다. 흔한 동사 '범위에 걸치다'로 교체 권장. 문법 오류로 단정하는 것이 아니라, 사전에서 formal로 표시된 배열 용법 대신 업무에서 쓰기 쉬운 뜻을 권하는 항목이다. 근거: [Oxford range (formal 배열 용법)](https://www.oxfordlearnersdictionaries.com/definition/english/range_2).
- 제안 sense/pos: 범위에 걸치다 / 동
- 고친 문장: The available meeting rooms range from small offices to halls accommodating two hundred guests.
- exKo: 이용 가능한 회의실은 작은 사무실부터 손님 200명을 수용하는 홀까지 다양하다.

### index 1326 · refer to · 수정 (114번째 항목)

- 현재 sense/pos: 가리키다, ~에게 문의하다 / 동
- 이유: refer to a person 단독을 문의하다로 쓰기보다 refer questions to 사람으로 요청 전달을 명시하는 편이 자연스럽다. sense를 '~에게 문의 사항을 넘기다'로 수정. pos는 동사로 유지. 근거: [Oxford refer](https://www.oxfordlearnersdictionaries.com/definition/english/refer).
- 제안 sense/pos: ~에게 문의 사항을 넘기다 / 동
- 고친 문장: Please refer all questions about remaining vacation days to the human resources coordinator.
- exKo: 남은 휴가 일수에 관한 모든 문의는 인사 담당자에게 전달해라.

### index 1349 · resume · 수정 (115번째 항목)

- 현재 sense/pos: 이력서 / 명
- 이유: 추천인 두 명 자체를 업로드할 수 없다. 연락처를 명시해 영어·번역을 맞춘다.
- 고친 문장: Applicants must upload a one-page resume and contact details for two references before the deadline.
- exKo: 지원자는 마감 전에 한 쪽짜리 이력서와 추천인 두 명의 연락처를 업로드해야 한다.

### index 1377 · scan · 수정 (119번째 항목)

- 현재 sense/pos: 훑어보다, 자세히 조사하다 / 동
- 이유: 훑어보다와 자세히 조사하다를 동시에 제시해 읽기 방식이 모호하다. 짧은 시간 단서로 훑어보다를 명확화.
- 제안 sense/pos: 훑어보다 / 동
- 고친 문장: With only a minute before the meeting, she scanned the report for the total cost.
- exKo: 회의 시작까지 1분밖에 남지 않아 그녀는 총비용을 찾으려고 보고서를 빠르게 훑어보았다.

### index 1435 · split · 수정 (123번째 항목)

- 현재 sense/pos: 균열, 분열 / 명
- 이유: 물리적인 균열이다. sense에서 '분열'을 빼고 '균열'로 한정.
- 고친 문장 (영어 유지): Inspectors found a hairline split in the pipe during the quarterly safety check.
- exKo (유지): 점검관들은 분기 안전 점검 중에 배관에서 실금 같은 균열을 발견했다.

### index 1559 · visiting · 수정 (125번째 항목)

- 현재 sense/pos: 방문 / 명
- 이유: Regular visiting to client sites는 부자연스럽다. 동명사 visiting이 clients를 직접 목적어로 취하도록 수정.
- 제안 sense/pos: 방문 / 명
- 고친 문장: Visiting clients regularly is an important part of every account manager's work in this region.
- exKo: 고객을 정기적으로 방문하는 일은 이 지역 모든 거래처 담당자의 중요한 업무다.

### index 1606 · advance · 수정 (130번째 항목)

- 현재 sense/pos: 진전시키다 / 동
- 이유: '현재 단계 너머로 진전시킬'은 직역투다.
- 고친 문장 (영어 유지): The vendor claims new software will advance the project beyond its current stage.
- exKo: 공급업체는 새 소프트웨어가 프로젝트를 다음 단계로 진전시킬 것이라고 주장한다.

### index 1772 · fuel · 수정 (153번째 항목)

- 현재 sense/pos: 부채질하다 / 동
- 이유: '소문이 더 부채질되었다'가 부자연스럽다.
- 고친 문장 (영어 유지): Rumors that the merger talks had collapsed were fueled by the delayed report.
- exKo: 보고서 발표가 지연되면서 합병 협상이 결렬되었다는 소문이 더욱 확산되었다.

### index 1773 · function · 수정 (154번째 항목)

- 현재 sense/pos: 작동하다 / 동
- 이유: 증명서 갱신이 기계 작동 여부를 직접 결정하는 인과관계가 어색하다. 기술적 결함 문맥으로 작동 뜻을 명확히 한다.
- 고친 문장: The elevator will not function until a technician replaces the damaged control panel.
- exKo: 기술자가 손상된 제어판을 교체할 때까지 엘리베이터는 작동하지 않을 것이다.

### index 1787 · honor · 수정 (158번째 항목)

- 현재 sense/pos: 존중하다, 약속을 지키다 / 동
- 이유: 보증을 이행하다만 보여 준다. sense를 '약속·계약을 지키다'로 한정.
- 제안 sense/pos: 약속·계약을 지키다 / 동
- 고친 문장 (영어 유지): The contractor promised to honor the warranty even after the one-year period expired.
- exKo (유지): 그 시공업체는 1년이 지난 뒤에도 보증 조건을 지키겠다고 약속했다.

### index 1788 · host · 수정 (159번째 항목)

- 현재 sense/pos: 주최자, 진행자 / 명
- 이유: 연사를 소개하는 진행자다. sense를 '진행자'로 한정.
- 제안 sense/pos: 진행자 / 명
- 고친 문장 (영어 유지): As the host of the annual charity gala, she introduced every speaker personally.
- exKo (유지): 그녀는 연례 자선 갈라 행사의 진행자로서 모든 연사를 직접 소개했다.

### index 1831 · measure · 수정 (163번째 항목)

- 현재 sense/pos: 조치, 척도 / 명
- 이유: 척도 의미는 없다. sense를 '조치'로 한정.
- 제안 sense/pos: 조치 / 명
- 고친 문장 (영어 유지): The city introduced new safety measures after the bridge inspection revealed cracks.
- exKo (유지): 시는 교량 점검에서 균열이 드러난 뒤 새로운 안전 조치를 도입했다.

### index 1845 · object · 수정 (164번째 항목)

- 현재 sense/pos: 반대하다 / 동
- 이유: Several residents를 호칭 '주민 여러분'으로 오역했다.
- 고친 문장 (영어 유지): Several residents objected to the plan for a taller building near the park.
- exKo: 주민 몇 명이 공원 근처에 더 높은 건물을 짓는 계획에 반대했다.

### index 1848 · official · 수정 (165번째 항목)

- 현재 sense/pos: 공무원, 임원 / 명
- 이유: 회사 관계자이며 공무원이 아니다. sense를 '회사 관계자'로 좁히고 임원 직급 단정도 피한다.
- 제안 sense/pos: 회사 관계자 / 명
- 고친 문장 (영어 유지): A company official confirmed that the merger would be announced within two weeks.
- exKo: 회사 관계자 한 명이 합병을 2주 안에 발표할 것이라고 확인했다.

### index 1901 · register · 수정 (172번째 항목)

- 현재 sense/pos: 등록부, 계산대 / 명
- 이유: 등록부 의미는 없다. sense를 '금전 등록기'로 한정.
- 제안 sense/pos: 금전 등록기 / 명
- 고친 문장 (영어 유지): The cashier closed the register and counted the bills before locking the store.
- exKo (유지): 계산원은 가게 문을 잠그기 전에 계산대를 닫고 지폐를 세었다.

### index 1931 · selection · 제외 (177번째 항목)

- 현재 sense/pos: 구비 품목 / 명
- 이유: 기존 a wide selection of bread와 새 breakfast selection 모두 제공하는 다양한 품목이다.
- 기존 예문: This bakery offers a wide selection of bread made without dairy products.
- 추가 초안: The hotel's breakfast selection includes fresh fruit, pastries, and several kinds of juice.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 2372 · commonplace · 제외 (192번째 항목)

- 현재 sense/pos: 평범한, 흔한 / 형
- 이유: 기존 Digital menus ... commonplace와 새 Remote interviews ... commonplace 모두 '흔한'이다.
- 기존 예문: Digital menus have become commonplace in restaurants near the convention center.
- 추가 초안: Remote interviews are now commonplace among firms hiring for overseas sales positions.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 2395 · conjunction · 제외 (194번째 항목)

- 현재 sense/pos: 결합 / 명
- 이유: 기존 in conjunction with와 새 a conjunction of 모두 함께 결합·협력하는 뜻이다. 명사 결합 의미의 추가 학습 가치가 없다.
- 기존 예문: The new shuttle service operates in conjunction with the regional train network.
- 추가 초안: The success of the campaign came from a conjunction of smart timing and good luck.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 2406 · context · 제외 (195번째 항목)

- 현재 sense/pos: 정황, 배경 / 명
- 이유: 기존 sentence in its proper context와 새 remarks quoted out of context 모두 발언·문장을 이해하기 위한 문맥이다. 새 예문도 별도의 사건 배경 의미를 보여 주지 않는다.
- 기존 예문: Read the surrounding paragraph to understand this sentence in its proper context.
- 추가 초안: The manager's remarks were criticized because they were quoted entirely out of context.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 2507 · distinction · 수정 (196번째 항목)

- 현재 sense/pos: 우수성 / 명
- 이유: a distinction은 우수 등급·표창으로도 읽힌다. 우수성이라는 추상 뜻을 명확히 한다.
- 고친 문장: Her research on supply chain efficiency earned her a reputation for academic distinction.
- exKo: 그녀는 공급망 효율성 연구로 학문적으로 탁월하다는 평판을 얻었다.

### index 2524 · draft · 제외 (197번째 항목)

- 현재 sense/pos: 초안 / 명
- 이유: 기존 draft a letter와 새 draft of the contract 모두 문서 초안 작성이다. 문서 종류와 품사만 바꿔 같은 활동을 반복한다.
- 기존 예문: We decided to draft a letter to the supplier.
- 추가 초안: Please send the first draft of the contract to legal by Wednesday afternoon.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 2561 · epidemic · 수정 (199번째 항목)

- 현재 sense/pos: 전염성의 / 형
- 이유: epidemic은 전염 가능성을 뜻하는 contagious와 다르다. 널리 유행하는 상태를 뜻하므로 sense '유행성의'로 수정. 근거: [Oxford epidemic](https://www.oxfordlearnersdictionaries.com/us/definition/english/epidemic_2).
- 제안 sense/pos: 유행성의 / 형
- 고친 문장: During the outbreak, clinics expanded their services to respond to the epidemic disease.
- exKo: 질병이 유행하는 동안 진료소들은 유행성 질환에 대응하려고 진료 서비스를 확대했다.

### index 2717 · handling · 제외 (202번째 항목)

- 현재 sense/pos: 취급의 / 형
- 이유: handling instructions는 기존 handling during transport의 '취급' 명사가 앞에서 다른 명사를 수식한 것이다. 별개의 형용사 뜻이 아니다.
- 기존 예문: The damaged cartons suggest that handling during transport needs closer supervision.
- 추가 초안: The warehouse posted new handling instructions beside every loading dock and storage shelf.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 2722 · harbor · 수정 (203번째 항목)

- 현재 sense/pos: (배를) 항구에 정박시키다 / 동
- 이유: harbor a yacht는 희귀한 용법으로 일상적인 정박은 moor/dock이다. 토익에 유용한 동사 '품다'로 교체 권장. 근거: [Oxford harbour](https://www.oxfordlearnersdictionaries.com/definition/english/harbour_2).
- 제안 sense/pos: 의구심 등을 품다 / 동
- 고친 문장: Several employees still harbor doubts about the proposed merger despite the director's reassurances.
- exKo: 이사의 안심시키는 설명에도 몇몇 직원은 여전히 합병안에 의구심을 품고 있다.

### index 2740 · helping · 제외 (204번째 항목)

- 현재 sense/pos: (음식물) 한 그릇 / 명
- 이유: 기존 second helping of vegetable stew와 새 second helping of rice는 모두 음식을 한 번 더 담은 양이다.
- 기존 예문: The host offered everyone a second helping of the vegetable stew.
- 추가 초안: He took a second helping of rice before the hotel buffet closed for the evening.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 2894 · leftover · 제외 (206번째 항목)

- 현재 sense/pos: (-s) 남은 음식 / 명
- 이유: 기존 leftover from dinner와 새 café leftovers 모두 남은 음식이다. 단·복수 차이뿐이다.
- 기존 예문: The only leftover from dinner was a slice of pie.
- 추가 초안: The café donates its leftovers to a local shelter every evening instead of throwing them away.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 2921 · litter · 수정 (207번째 항목)

- 현재 sense/pos: 어지르다, 흐트러뜨리다 / 동
- 이유: 쓰레기를 버리다라는 특정 뜻을 보여 준다. sense를 '쓰레기를 버리다'로 한정.
- 제안 sense/pos: 쓰레기를 버리다 / 동
- 고친 문장 (영어 유지): Guests who litter the garden will be asked to leave the resort.
- exKo (유지): 정원에 쓰레기를 버리는 손님은 리조트에서 퇴장하도록 요청받을 것이다.

### index 3001 · memorial · 수정 (208번째 항목)

- 현재 sense/pos: 기념의 / 형
- 이유: memorial은 보통 사망자를 추모한다. 은퇴자를 기리는 문맥에서는 목표 의미가 맞지 않는다.
- 고친 문장: A memorial garden was planted behind the office to honor the company's late founder.
- exKo: 회사의 고인이 된 창립자를 추모하기 위해 사무실 뒤편에 기념 정원이 조성되었다.

### index 3064 · occupied · 수정 (210번째 항목)

- 현재 sense/pos: 바쁜 / 형
- 이유: '꼬박 바빴던'이 부자연스럽다.
- 고친 문장 (영어 유지): Fully occupied with the quarterly audit, the accounting team postponed all external meetings.
- exKo: 분기 감사 업무로 바빴던 회계팀은 외부 회의를 모두 연기했다.

### index 3083 · on hand · 제외 (212번째 항목)

- 현재 sense/pos: 사용할 수 있도록 준비된 / 형
- 이유: 기존 keep extra batteries on hand와 새 technicians on hand 모두 필요할 때 이용할 수 있는 상태다.
- 기존 예문: Please keep extra batteries on hand.
- 추가 초안: Trained technicians will be on hand throughout the trade show to answer questions.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 3161 · perspective · 수정 (216번째 항목)

- 현재 sense/pos: 원근 화법의 / 형
- 이유: '원근 화법 제도'는 직역투다. 원근법을 적용한 도면으로 표현.
- 고친 문장 (영어 유지): Architecture students practiced perspective drawing before redesigning the lobby of the old hotel.
- exKo: 건축학과 학생들은 오래된 호텔 로비를 다시 설계하기 전에 원근법으로 도면 그리는 연습을 했다.

### index 3208 · principal · 수정 (218번째 항목)

- 현재 sense/pos: (단체의) 장, 교장 / 명
- 이유: 예문은 학교 교장이다. sense를 '교장'으로 한정.
- 제안 sense/pos: 교장 / 명
- 고친 문장 (영어 유지): After the graduation ceremony, the principal thanked every teacher for their extra support.
- exKo (유지): 졸업식이 끝난 뒤 교장은 추가로 수고한 모든 교사에게 감사를 전했다.

### index 3271 · rebound · 수정 (221번째 항목)

- 현재 sense/pos: 다시 일어서다 / 동
- 이유: rebound는 넘어진 사람이 물리적으로 일어서다라는 뜻이 아니다. 공이 튀어 돌아오는 의미로 교체. sense를 '튀어 돌아오다'로 수정. 근거: [Cambridge rebound](https://dictionary.cambridge.org/us/dictionary/english/rebound?topic=bouncing).
- 제안 sense/pos: 튀어 돌아오다 / 동
- 고친 문장: During the company tournament, the ball rebounded from the wall and landed outside the court.
- exKo: 사내 대회 도중 공이 벽에 맞고 튀어나와 코트 밖에 떨어졌다.

### index 3539 · trace · 수정 (229번째 항목)

- 현재 sense/pos: 자취, 극소량 / 명
- 이유: 극소량 의미는 없다. sense를 '흔적'으로 한정. missing shipment는 실종보다 분실이 자연스럽다.
- 제안 sense/pos: 흔적 / 명
- 고친 문장 (영어 유지): Investigators found no trace of the missing shipment anywhere in the warehouse.
- exKo: 조사관들은 창고 어디에서도 분실된 화물의 흔적을 찾지 못했다.

### index 3609 · virtual · 제외 (230번째 항목)

- 현재 sense/pos: 가상의 / 형
- 이유: 기존 virtual meeting과 새 virtual tour 모두 컴퓨터·온라인으로 구현되는 가상의 활동이다.
- 기존 예문: The company held a virtual meeting with overseas partners.
- 추가 초안: Prospective buyers can take a virtual tour of the apartment on our website.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 3657 · absorb · 제외 (231번째 항목)

- 현재 sense/pos: 비용을 부담하다 / 동
- 이유: 기존 absorb additional shipping costs와 새 absorb cost of airport transfers 모두 비용을 부담하다이다.
- 기존 예문: We intend to absorb the additional shipping costs.
- 추가 초안: The hotel agreed to absorb the cost of airport transfers for conference guests.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 3694 · associate · 수정 (235번째 항목)

- 현재 sense/pos: 동료 / 명
- 이유: sales associate는 동료 관계보다 판매직 직원을 뜻한다. sense를 '직원, 판매 사원'으로 수정.
- 제안 sense/pos: 직원, 판매 사원 / 명
- 고친 문장 (영어 유지): A sales associate will help you locate the item in the storeroom.
- exKo (유지): 판매 사원이 창고에서 물품 위치를 찾도록 도와줄 것이다.

### index 3724 · brief · 수정 (238번째 항목)

- 현재 sense/pos: 보고하다 / 동
- 이유: brief staff는 직원에게 보고하기보다 필요한 내용을 간단히 설명하는 것이다. sense를 '간단히 설명하다'로 수정.
- 제안 sense/pos: 간단히 설명하다 / 동
- 고친 문장 (영어 유지): Before the client arrives, the coordinator will brief the staff on the new agenda.
- exKo: 고객이 도착하기 전에 담당자가 직원들에게 새 회의 안건을 간단히 설명할 것이다.

### index 3738 · cell · 수정 (240번째 항목)

- 현재 sense/pos: 작은 방 / 명
- 이유: 감옥의 방이다. sense를 일반적인 '작은 방'보다 '감방'으로 한정.
- 고친 문장 (영어 유지): The old jail cells were converted into small offices for the tour guides.
- exKo (유지): 옛 유치장 독방들은 관광 가이드를 위한 작은 사무실로 개조되었다.

### index 3762 · compromise · 수정 (242번째 항목)

- 현재 sense/pos: 타협하다, 위태롭게 하다 / 동
- 이유: 타협 의미가 아니다. sense를 '위태롭게 하다, 훼손하다'로 한정.
- 제안 sense/pos: 위태롭게 하다, 훼손하다 / 동
- 고친 문장 (영어 유지): Poor lighting on the production line can compromise the accuracy of quality inspections.
- exKo (유지): 생산 라인의 조명이 어두우면 품질 검사의 정확성이 위태로워질 수 있다.

### index 3860 · fabric · 수정 (249번째 항목)

- 현재 sense/pos: 구조 / 명
- 이유: '건강한 직장의 구조'보다 조직을 지탱하는 바탕이라는 비유가 자연스럽다.
- 고친 문장 (영어 유지): Trust between managers and staff forms the fabric of a healthy workplace.
- exKo: 관리자와 직원 사이의 신뢰는 건강한 직장을 이루는 바탕이다.

### index 3900 · high-rise · 수정 (252번째 항목)

- 현재 sense/pos: 고층 건물 / 명
- 이유: clozeExample에서 high-rises뿐 아니라 high-rise 단수도 실패한다. exampleStems는 표제어를 high/rise로 나누지만 EXAMPLE_TOKEN은 high-rise를 한 토큰으로 잡는다. 아래 문장은 자연스러운 단수 명사 예문이나 엔진 수정 전에는 여전히 빈칸 불가다. 권장 해결: 영어 하이픈 표제어를 한 어간으로 보존해 토큰화와 일치시키고 단수·복수 회귀 검증을 추가한다. 데이터만 바꾸는 임시안은 'high rise' 표기지만 원래 표제어와 불일치하므로 정식 해결로 권하지 않는다.
- 고친 문장: The high-rise near the station was evacuated after a sudden power failure yesterday.
- exKo: 어제 갑작스러운 정전이 발생해 역 근처 고층 건물에서 사람들이 대피했다.

### index 3945 · junior · 수정 (256번째 항목)

- 현재 sense/pos: 후배 / 명
- 이유: a junior 단독은 후배라는 사적 관계를 선명히 드러내지 못한다. junior 명사인 연하자로 명확화. sense를 '연하인 사람'으로 수정.
- 제안 sense/pos: 연하인 사람 / 명
- 고친 문장: Although he is her junior by five years, he already manages the entire department.
- exKo: 그는 그녀보다 다섯 살 어리지만 이미 부서 전체를 관리한다.

### index 4003 · outfit · 수정 (265번째 항목)

- 현재 sense/pos: 장비를 갖추다 / 동
- 이유: '조끼를 갖추게 할'보다 지급하다가 자연스럽다.
- 고친 문장 (영어 유지): Before the site inspection, the contractor will outfit every crew member with reflective vests.
- exKo: 현장 점검에 앞서 시공업체는 모든 작업자에게 반사 조끼를 지급할 것이다.

### index 4006 · outline · 제외 (267번째 항목)

- 현재 sense/pos: 윤곽을 설명하다 / 동
- 이유: 기존 outline of the workshop과 새 outlined the main steps 모두 주요 내용을 개략적으로 제시하는 뜻이다.
- 기존 예문: The presenter distributed an outline of the workshop to all participants.
- 추가 초안: During the briefing, the director outlined the main steps of the relocation plan.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 4033 · prime · 수정 (271번째 항목)

- 현재 sense/pos: 전성기 / 명
- 이유: 관용 결합은 at the prime보다 in the prime이다.
- 고친 문장: In the prime of his career, he left the bank to start a consulting firm.
- exKo: 그는 경력의 전성기에 은행을 그만두고 컨설팅 회사를 세웠다.

### index 4037 · profile · 제외 (272번째 항목)

- 현재 sense/pos: 소개하다 / 동
- 이유: 기존 magazine published a profile과 새 magazine will profile 모두 잡지가 인물·업체를 소개하는 같은 뜻·상황이다. 원문 영어의 어색함을 고쳐도 중복은 남는다.
- 기존 예문: The magazine published a profile of our company's founder.
- 추가 초안: Its February issue will profile three local suppliers for the trade magazine.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 4055 · regard · 수정 (273번째 항목)

- 현재 sense/pos: 관심, 존중 / 명
- 이유: 관심보다 존경을 뜻한다. sense를 '존경'으로 한정.
- 제안 sense/pos: 존경 / 명
- 고친 문장 (영어 유지): She still holds her first mentor in high regard for guiding her through difficult times.
- exKo (유지): 그녀는 어려운 시기에 자신을 이끌어 준 첫 멘토를 지금도 높이 존경한다.

### index 4059 · relief · 수정 (275번째 항목)

- 현재 sense/pos: 완화 / 명
- 이유: 원문 relief가 감정적 안도인지 신체적 불편 완화인지 모호해 기존 예문과 겹쳐 읽힌다.
- 고친 문장: The new cooling system provided relief from the intense heat in the packing area.
- exKo: 새 냉방 장치 덕분에 포장 구역의 심한 더위가 누그러졌다.

### index 4077 · ruin · 수정 (278번째 항목)

- 현재 sense/pos: 파멸, 폐허 / 명
- 이유: 폐허 의미는 없다. sense를 '파산, 몰락'으로 한정.
- 제안 sense/pos: 파산, 몰락 / 명
- 고친 문장 (영어 유지): Years of careless mismanagement drove the once profitable retail chain to complete financial ruin.
- exKo: 수년간의 부실 경영으로 한때 수익성이 좋던 유통 체인은 완전히 파산했다.

### index 4101 · smooth · 제외 (279번째 항목)

- 현재 sense/pos: 매끄럽게 하다 / 동
- 이유: 기존 smooth transition과 새 smooth the transition 모두 시스템 전환을 순조롭게 한다는 같은 뜻·상황이다.
- 기존 예문: The system upgrade ensured a smooth transition.
- 추가 초안: A short training session helped smooth the transition to the new invoicing system.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 4156 · upright · 제외 (283번째 항목)

- 현재 sense/pos: 똑바로 선 / 형
- 이유: 기존 keep packages upright와 새 upright freezer 모두 수직으로 세워진 상태다. 품사·물건만 달라졌다.
- 기존 예문: Please keep the packages upright during transportation.
- 추가 초안: Moving the upright freezer away from the wall improved air circulation in the kitchen.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 4157 · upward · 제외 (284번째 항목)

- 현재 sense/pos: 위쪽으로 / 부
- 이유: 기존 upward trend와 새 prices moved upward 모두 수치가 상승하는 뜻이다. 형용사·부사 차이만으로 다른 뜻이 되지 않는다.
- 기존 예문: The graph shows an upward trend in visitor numbers.
- 추가 초안: Prices for office supplies have moved steadily upward since the beginning of the year.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 4297 · coil · 수정 (289번째 항목)

- 현재 sense/pos: 고리 / 명
- 이유: coil of wire는 고리 한 뭉치가 아니라 둥글게 감은 철사 한 타래다. sense '고리'를 '감아 놓은 타래'로 수정.
- 고친 문장 (영어 유지): A coil of steel wire sat beside the loading dock waiting for pickup.
- exKo: 철사 한 타래가 하역장 옆에 놓인 채 수거를 기다리고 있었다.

### index 4346 · cultivation · 수정 (290번째 항목)

- 현재 sense/pos: 함양 / 명
- 이유: 신뢰를 '함양'한다는 결합이 어색하다. sense '형성, 증진'으로 명료화.
- 고친 문장 (영어 유지): This seminar focuses on the cultivation of trust between managers and new employees.
- exKo: 이 세미나는 관리자와 신입 직원 사이에 신뢰를 쌓는 데 초점을 맞춘다.

### index 4563 · moderate · 수정 (301번째 항목)

- 현재 sense/pos: 완화하다, 사회를 보다 / 동
- 이유: 완화하다가 아니라 사회를 보다이다. sense를 '사회를 보다'로 한정.
- 제안 sense/pos: 사회를 보다 / 동
- 고친 문장 (영어 유지): A skilled facilitator moderated the annual panel discussion on remote work policies.
- exKo (유지): 능숙한 진행자가 원격 근무 정책에 관한 연례 패널 토론의 사회를 보았다.

### index 4624 · periodical · 수정 (303번째 항목)

- 현재 sense/pos: 주기적인 / 형
- 이유: routine periodical이 중복된다. periodical 자체의 정기적인 뜻을 드러내도록 간결하게 수정.
- 고친 문장: Periodical inspections of the elevators help technicians identify worn parts before they cause failures.
- exKo: 정기적인 엘리베이터 점검은 마모된 부품이 고장을 일으키기 전에 기술자가 발견하도록 돕는다.

### index 4929 · appendix · 수정 (314번째 항목)

- 현재 sense/pos: 맹장 / 명
- 이유: appendix는 해부학적으로 맹장이 아니라 충수(돌기)다. sense를 '충수'로 수정.
- 제안 sense/pos: 충수 / 명
- 고친 문장 (영어 유지): Doctors removed his appendix on Tuesday, and he will miss the regional sales meeting.
- exKo: 의사들이 화요일에 그의 충수를 제거해 그는 지역 영업 회의에 참석하지 못할 것이다.

### index 4942 · attribute · 수정 (315번째 항목)

- 현재 sense/pos: 속성 / 명
- 이유: 집의 '속성'은 직역투다. sense는 '특징'이 자연스럽다.
- 고친 문장 (영어 유지): Before listing the house, the agent noted every attribute that might attract young families.
- exKo: 집을 매물로 내놓기 전에 중개인은 젊은 가족들의 관심을 끌 만한 특징을 모두 적어 두었다.

### index 4972 · chaperone · 제외 (321번째 항목)

- 현재 sense/pos: 동행해 돌보다 / 동
- 이유: 기존 chaperone accompanied students와 새 teachers chaperone interns 모두 방문 중 학생을 동행·인솔하는 뜻·상황이다.
- 기존 예문: A volunteer chaperone accompanied the students on their museum visit.
- 추가 초안: Two senior teachers will chaperone the interns during their week-long visit to the Seoul office.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 5043 · dent · 제외 (330번째 항목)

- 현재 sense/pos: 찌그러뜨리다 / 동
- 이유: 기존 dent in delivery van과 새 dented filing cabinets 모두 물체 표면이 눌려 찌그러지는 뜻이다. 명사·동사 변환 외 의미 차이가 없다.
- 기존 예문: A falling branch left a dent in the delivery van's roof.
- 추가 초안: A careless forklift driver dented the side of the newly delivered filing cabinets.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 5103 · fitting · 수정 (336번째 항목)

- 현재 sense/pos: 부속품, 가봉 / 명
- 이유: 가봉 의미는 없다. sense를 '부속품'으로 한정.
- 제안 sense/pos: 부속품 / 명
- 고친 문장 (영어 유지): The plumber replaced several brass fittings under the kitchen sink before testing for leaks.
- exKo (유지): 배관공은 누수를 확인하기 전에 싱크대 아래의 놋쇠 부속품 몇 개를 교체했다.

### index 5119 · fulfillment · 수정 (338번째 항목)

- 현재 sense/pos: 이행, 충족 / 명
- 이유: 이 문맥의 fulfillment는 이행·요구 충족이 아니라 만족감·성취감이다. sense를 '성취감, 만족감'으로 수정.
- 제안 sense/pos: 성취감, 만족감 / 명
- 고친 문장 (영어 유지): Completing the mentorship program gave her a lasting sense of personal and professional fulfillment.
- exKo: 멘토링 프로그램을 마친 그녀는 개인적으로도 직업적으로도 오래 지속되는 성취감을 얻었다.

### index 5170 · mortgage · 수정 (342번째 항목)

- 현재 sense/pos: 저당 잡히다 / 동
- 이유: '창고를 저당 잡혔다'는 어색하다.
- 고친 문장 (영어 유지): They mortgaged the warehouse to raise cash for a second production line.
- exKo: 그들은 두 번째 생산 라인에 필요한 자금을 마련하려고 창고를 담보로 대출받았다.

### index 5197 · pitch · 수정 (344번째 항목)

- 현재 sense/pos: 던지다 / 동
- 이유: 시구를 관중에게 던지는 장면으로 읽힌다. 포수를 목표로 하고 관중은 환호하도록 수정.
- 고친 문장: Before the charity game, the mayor pitched the first ball to the catcher as spectators cheered.
- exKo: 자선 경기 시작 전 관중들이 환호하는 가운데 시장이 포수를 향해 시구했다.

### index 5250 · RSVP · 수정 (346번째 항목)

- 현재 sense/pos: 회신 요청 / 명
- 이유: an RSVP required에서 RSVP는 회신 요청이 아니라 회신 자체다. sense를 '참석 여부 회신'으로 수정.
- 제안 sense/pos: 참석 여부 회신 / 명
- 고친 문장 (영어 유지): The invitation clearly says that an RSVP is required by the tenth of May.
- exKo (유지): 초대장에는 5월 10일까지 회신을 보내야 한다고 분명히 적혀 있다.

### index 5271 · sole · 수정 (347번째 항목)

- 현재 sense/pos: 발바닥, 밑창 / 명
- 이유: 발바닥 의미는 없다. sense를 '밑창'으로 한정.
- 제안 sense/pos: 밑창 / 명
- 고친 문장 (영어 유지): Thick rubber soles protect workers' feet from sharp metal scraps on the factory floor.
- exKo (유지): 두꺼운 고무 밑창은 공장 바닥의 날카로운 금속 조각으로부터 작업자의 발을 보호한다.

### index 5283 · strain · 수정 (350번째 항목)

- 현재 sense/pos: 무리를 주다 / 동
- 이유: '인내심에 무리를 주었다'는 직역투다.
- 고친 문장 (영어 유지): Working twelve-hour shifts for a month strained the patience of the entire nursing staff.
- exKo: 한 달 동안 12시간 교대 근무가 이어지자 간호 직원 모두의 인내심이 한계에 이르렀다.

### index 5316 · twist · 수정 (354번째 항목)

- 현재 sense/pos: 꼬임, 예상 밖의 전개 / 명
- 이유: 꼬임 의미는 없다. sense를 '예상 밖의 전개'로 한정.
- 제안 sense/pos: 예상 밖의 전개 / 명
- 고친 문장 (영어 유지): In an unexpected twist, the retiring director announced that she would stay another year.
- exKo: 예상과 달리 은퇴를 앞둔 이사는 한 해 더 일하겠다고 밝혔다.

### index 5330 · vent · 수정 (356번째 항목)

- 현재 sense/pos: 감정을 발산하다 / 동
- 이유: '지연에 아무 권한도 없는'이 어색하다.
- 고친 문장 (영어 유지): Frustrated passengers vented their anger at the gate agent, who had no control over delays.
- exKo: 화가 난 승객들은 지연 상황을 해결할 권한이 없는 탑승구 직원에게 화를 쏟아 냈다.

### index 5384 · expatriate · 수정 (358번째 항목)

- 현재 sense/pos: 국적을 상실한 사람 / 명
- 이유: expatriate는 국외 거주자이지 국적을 상실한 사람이라는 뜻이 아니다. sense를 '국외 거주자'로 수정. 근거: [Cambridge expatriate](https://dictionary.cambridge.org/dictionary/english/expatriate).
- 제안 sense/pos: 국외 거주자 / 명
- 고친 문장 (영어 유지): The club offers language classes and legal advice to expatriates settling in the city.
- exKo (유지): 그 클럽은 도시에 정착한 국외 거주자들에게 언어 수업과 법률 상담을 제공한다.

### index 5466 · overhaul · 수정 (359번째 항목)

- 현재 sense/pos: 철저히 조사하다 / 동
- 이유: overhaul a system은 단순 조사보다 전면 정비·개편이다. sense를 '전면 개편하다'로 수정하고 실행 주체를 경영진으로 바꾼다.
- 제안 sense/pos: 전면 개편하다 / 동
- 고친 문장: Management will overhaul the expense reporting system after auditors identified several weaknesses in its controls.
- exKo: 감사관들이 내부 통제의 여러 취약점을 확인함에 따라 경영진은 경비 보고 체계를 전면 개편할 것이다.

### index 5496 · put forth · 수정 (360번째 항목)

- 현재 sense/pos: 뻗다 / 동
- 이유: 식물이 잎을 '뻗다'보다 '내다, 돋우다'가 자연스럽다. sense를 '새잎·싹을 내다'로 수정.
- 제안 sense/pos: 새잎·싹을 내다 / 동
- 고친 문장 (영어 유지): Warm spring rain caused the apple trees to put forth new leaves within a week.
- exKo: 따뜻한 봄비가 내린 뒤 사과나무에서 일주일 만에 새잎이 돋았다.

### index 5650 · heed · 제외 (363번째 항목)

- 현재 sense/pos: 주의 / 명
- 이유: 기존 heed safety warning과 새 pay heed to parking signs 모두 안전 지시에 주의를 기울이다이다. 명사구 전환뿐이다.
- 기존 예문: We decided to heed the safety officer's warning.
- 추가 초안: Drivers should pay heed to the new parking signs posted near the loading dock.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 5685 · lure · 수정 (366번째 항목)

- 현재 sense/pos: 매력, 미끼 / 명
- 이유: 예문은 유인책이다. sense를 '유인책'으로 한정.
- 제안 sense/pos: 유인책 / 명
- 고친 문장 (영어 유지): Free shipping proved an effective lure for first-time online shoppers last quarter.
- exKo: 지난 분기에는 무료 배송이 온라인 쇼핑몰을 처음 이용하는 고객을 끌어들이는 데 효과적이었다.

### index 5690 · mandate · 수정 (367번째 항목)

- 현재 sense/pos: 권한, 명령 / 명
- 이유: 예문은 주주가 부여한 권한이다. sense를 '권한'으로 한정.
- 제안 sense/pos: 권한 / 명
- 고친 문장 (영어 유지): Shareholders gave the new director a clear mandate to cut operating costs.
- exKo (유지): 주주들은 새 이사에게 운영 비용을 줄일 명확한 권한을 부여했다.

### index 5712 · perennial · 수정 (368번째 항목)

- 현재 sense/pos: 다년생 식물 / 명
- 이유: 다년생이라는 사실이 연중 푸른 상록성을 보장하지 않는다. 해마다 다시 자라는 단서로 교체.
- 고친 문장: Gardeners planted hardy perennials along the walkway because these plants return each spring.
- exKo: 정원사들은 해마다 봄에 다시 자라는 내한성 다년생 식물을 산책로를 따라 심었다.

### index 5727 · proceedings · 수정 (372번째 항목)

- 현재 sense/pos: 행사 진행, 법적 절차 / 명
- 이유: 행사 진행 의미는 없다. sense를 '법적 절차'로 한정.
- 제안 sense/pos: 법적 절차 / 명
- 고친 문장 (영어 유지): Construction work was halted while legal proceedings over the land boundary continued in court.
- exKo (유지): 토지 경계를 둘러싼 법적 절차가 법정에서 계속되는 동안 공사는 중단되었다.

### index 5741 · rave · 제외 (374번째 항목)

- 현재 sense/pos: 극찬 / 명
- 이유: 기존 guests raved about hotel's menu와 새 bakery earned raves 모두 음식에 대한 극찬이며 명사·동사 전환뿐이다.
- 기존 예문: Guests raved about the hotel's new menu.
- 추가 초안: Her new bakery earned raves from local food critics for its sourdough.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 5796 · utter · 수정 (379번째 항목)

- 현재 sense/pos: 완전한 / 형
- 이유: '완전한 혼란'보다 극심한 혼란이 자연스럽다.
- 고친 문장 (영어 유지): A sudden delay from the vendor caused utter confusion among conference organizers and speakers.
- exKo: 업체의 갑작스러운 지연으로 회의 주최자들과 연사들은 극심한 혼란에 빠졌다.

### index 5799 · vet · 수정 (380번째 항목)

- 현재 sense/pos: 철저히 심사하다 / 동
- 이유: references는 심사 행위인 '평판 조회' 자체가 아니다. 추천인 정보·추천 내용을 확인한다는 의미를 살린다.
- 고친 문장 (영어 유지): Recruiters carefully vet every candidate's references before scheduling a second interview with the team.
- exKo: 채용 담당자들은 팀과의 2차 면접을 잡기 전에 모든 지원자의 추천인 정보를 철저히 검증한다.

## draft-1b.json

### index 1097 · issue · 수정 (3번째 항목)

- 현재 sense/pos: 발행하다 / 동
- 이유: 키카드는 발행보다 발급한다. sense를 '발급하다'로 수정.
- 제안 sense/pos: 발급하다 / 동
- 고친 문장 (영어 유지): The front desk will issue a new key card to each conference attendee.
- exKo (유지): 프런트 데스크는 각 회의 참석자에게 새 키카드를 발급할 것이다.

### index 1705 · current · 수정 (11번째 항목)

- 현재 sense/pos: 흐름, 전류 / 명
- 이유: 일반 흐름이 아니라 전류다. sense를 '전류'로 한정.
- 제안 sense/pos: 전류 / 명
- 고친 문장 (영어 유지): Before replacing the main wiring, the technician measured the electrical current carefully.
- exKo (유지): 주 배선을 교체하기 전에 기술자는 전류를 주의 깊게 측정했다.

### index 1806 · interest · 수정 (13번째 항목)

- 현재 sense/pos: 이해관계 / 명
- 이유: protect interests는 이해관계 자체를 보호한다기보다 이익·권익을 보호한다. sense를 '이익, 권익'으로 수정.
- 제안 sense/pos: 이익, 권익 / 명
- 고친 문장 (영어 유지): The board must protect the interests of shareholders during the merger talks.
- exKo: 이사회는 합병 협상 중에 주주들의 이익을 보호해야 한다.

### index 1874 · policy · 수정 (14번째 항목)

- 현재 sense/pos: 보험 증권 / 명
- 이유: '청구를 제기할'은 직역투이며 보험금 청구임을 명시한다.
- 고친 문장 (영어 유지): Keep your insurance policy in a safe place in case you need to file a claim.
- exKo: 보험금을 청구할 경우에 대비해 보험 증권을 안전한 곳에 보관해라.

### index 1920 · review · 수정 (19번째 항목)

- 현재 sense/pos: 평가, 후기 / 명
- 이유: 후기 의미는 없다. sense를 '업무 성과 평가'로 한정.
- 제안 sense/pos: 업무 성과 평가 / 명
- 고친 문장 (영어 유지): Her annual performance review with her manager will take place next Tuesday afternoon.
- exKo: 그녀는 다음 주 화요일 오후에 관리자와 연례 성과 평가 면담을 할 예정이다.

### index 1958 · track · 수정 (22번째 항목)

- 현재 sense/pos: 선로, 경로 / 명
- 이유: 일반 경로가 아니라 철도 선로다. sense를 '선로'로 한정.
- 제안 sense/pos: 선로 / 명
- 고친 문장 (영어 유지): The new rail track will connect the distribution center to the harbor.
- exKo (유지): 새 철도 선로는 유통 센터와 항구를 연결할 것이다.

### index 2109 · yield · 수정 (23번째 항목)

- 현재 sense/pos: 수익 / 명
- 이유: 최종 재확인 때 예문이 광고 채널의 yield로 변경되었다. yield를 광고 성과로 읽을 수 있지만 exKo '수익률'은 원문이 특정하지 않은 비율을 보탠다. 기존 투자 수익과도 겹쳐 읽히므로 명확히 다른 뜻인 '수확량'으로 교체 권장.
- 제안 sense/pos: 수확량 / 명
- 고친 문장: The new irrigation system increased the yield of vegetables grown for the hotel's restaurant.
- exKo: 새 관개 시설 덕분에 호텔 식당용으로 재배하는 채소의 수확량이 늘었다.

### index 4045 · quote · 제외 (28번째 항목)

- 현재 sense/pos: 견적 / 명
- 이유: 기존 quote a fixed price for repair와 새 quote includes labor/materials 모두 수리 등의 견적 가격이다. 명사로 바뀌었지만 새 의미·상황을 추가하지 않는다.
- 기존 예문: We decided to quote a fixed price for the repair work.
- 추가 초안: The quote includes labor, materials, and taxes but excludes installation and delivery fees.
- 조치: 이 추가 항목 제외. 고친 문장 없음; 기존 예문 유지.

### index 832 · deposit · 수정 (30번째 항목)

- 현재 sense/pos: 맡기다 / 동
- 이유: 최종 재확인에서 exKo의 '맡겨야'는 '입금해야'로 고쳐졌다. 남은 문제는 sense='맡기다'이다. 계좌에 돈을 넣는 예문에 맞게 sense를 '입금하다'로 수정.
- 제안 sense/pos: 입금하다 / 동
- 고친 문장 (영어 유지): The tenant must deposit two months' rent into the landlord's account before moving in.
- exKo (유지): 세입자는 입주 전에 집주인 계좌로 두 달치 임대료를 입금해야 한다.


