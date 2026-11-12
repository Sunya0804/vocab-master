# 다의어 3단계 전수 검토 — 검토자 I

| 대상 | 전체 | 통과 | 수정 | 제외 | 최종본 |
|---|---:|---:|---:|---:|---:|
| suneung | 150 | 121 | 19 | 10 | 140 |
| teps | 120 | 88 | 21 | 11 | 109 |
| 합계 | 270 | 209 | 40 | 21 | 249 |

검토일: 2026-11-12. 수능 150개·TEPS 120개를 전수 검토했다. 각 초안의 index로 packages 원래 예문을 대조하고, 별도 의미 여부·문맥의 명확성·영어 결합·번역의 자연스러움·해라체를 확인했다. 통과는 무수정 유지, 수정은 sense·영어·번역 중 하나 이상 변경, 제외는 기존 의미와 중복되거나 차이가 충분히 입증되지 않은 경우다. 시험 적합성은 수능의 일반·학교 상황과 TEPS의 생활·학술 상황에 대한 편집 판단이며 기출 빈도를 실측한 결과는 아니다.

품사 전환 자체를 모두 제외하지는 않았다. form(형태/서식), submission(제출 행위/제출물), class(수업/학급)처럼 지시 대상이 달라지는 경우는 유지했다. 반면 text·yield·total처럼 같은 행위나 수량을 품사만 바꾸어 재표현한 항목은 제외했다. TEPS review(복습/안전 규정 검토)는 학습 내용을 되짚는 행위와 적절성을 심사하는 행위의 차이를 인정했다.

## 반복 틀 확인

현재 읽은 수능 초안에는 동일한 첫 3단어 또는 첫 4단어를 가진 문장 묶음이 없었다. 따라서 지시서의 7회 반복 묶음은 이 파일 버전에서 재현되지 않았다. 전수 독해에서도 단어만 갈아 끼운 7문장 틀을 찾지 못했다. TEPS에는 A single careless(97·588), Students in the(195·1615)가 각각 2회 있었다. 97은 의미 교정과 함께 문장 구조를 바꾸었다. Students in the는 일반적인 주어 도입이며 뒤 문법·상황이 달라 유지했다. 판독 대상의 SHA-256을 아래에 기록한다.

## 최종본 검증 및 전달

- `docs/senses/suneung-final.json`, `docs/senses/teps-final.json`에 제외 제거·수정 반영 후 index 오름차순으로 직접 저장했다.
- 최종 249개 모두 실제 `core.js`의 `clozeExample([en, sense, pos, ex, exKo], false)`가 null이 아닌 결과를 반환했다.
- 최종본별 index 중복 0, 영어 예문 완전 중복 0, index와 packages 표제어 불일치 0, 빈 필드 0.
- 모든 최종 영어 예문은 공백 구분 12~20단어다.
- packages·core.js·초안은 수정하지 않았고 커밋하지 않았다.

### 검증에 사용한 원본 SHA-256

- `core.js`: `d79cc9caba7f3ed6ad6e9136af129702d12ac44e678c77e99d471107a12f67d9`
- `packages/suneung.json`: `b2e6ea86dd4d62f8f9dd1051e1c29c7960bf665c7270bba8c5e388e4afdd68ae`
- `docs/senses/suneung-draft.json`: `9fb3a3568d467c7d20995f31d806be4e8932cf7d819d01e814c8df94b508937a`
- `packages/teps.json`: `f4d384f63586b553ca970793938a1a09a3f2542737000185bbf0469a49316537`
- `docs/senses/teps-draft.json`: `2a62fb9b496c583091008e029e87d671ec004bf0c7179dcd8e98e3324328164e`

## 검토 중 초안 갱신 반영

최종본 생성 직전 초안 갱신을 감지하여 첫 생성을 중단하고 최신본을 재검토했다. 수능 information(1)·behavior(43)·level(80)은 back(20)·musical(59)·movement(212)으로, TEPS little(65)·briefly(719)·finally(726)는 brink(1987)·latitude(1884)·culprit(1847)으로 교체되어 있었다. 교체 항목 6개와 변경된 번역을 다시 검토했으며, 위 집계는 최신 초안 270개 기준이다. 원래 제거된 information·behavior 등의 예전 판정은 최신 집계에 넣지 않았다.

## suneung 수정·제외 상세

### index 98 · case · 수정

- 이유: reopen a case를 사건을 다시 열다로 직역했다.
- 기존 예문: In that case, we should wait.
- 초안: [사건 / 명] The police reopened the case after a new witness came forward last month.
- 초안 번역: 경찰은 지난달 새 목격자가 나타난 뒤 그 사건을 다시 열었다.
- 최종: [사건 / 명] The police reopened the case after a new witness came forward last month.
- 최종 번역: 경찰은 지난달 새 목격자가 나타난 뒤 그 사건의 수사를 재개했다.

### index 117 · sound · 수정

- 이유: sound sleep와 sound habits의 결합이 겹쳐 뜻이 흐리다. 판단에 쓰이는 건전한 의미를 분명히 한다.
- 기존 예문: The sound of the waves helped me sleep.
- 초안: [건전한 / 형] Doctors say that sound sleep habits protect teenagers from stress and illness.
- 초안 번역: 의사들은 건전한 수면 습관이 청소년을 스트레스와 질병에서 보호한다고 말한다.
- 최종: [건전한 / 형] Her sound judgment helped the student council choose a practical solution to the problem.
- 최종 번역: 그녀의 건전한 판단 덕분에 학생회는 그 문제에 대한 실용적인 해결책을 선택할 수 있었다.

### index 138 · competition · 수정

- 이유: 여행을 얻었다라는 번역을 자연스럽게 수정했다.
- 기존 예문: The competition for jobs is getting tougher every year.
- 초안: [대회 / 명] Our robot team won the national competition and earned a trip to Japan.
- 초안 번역: 우리 로봇 팀은 전국 대회에서 우승해 일본 여행을 얻었다.
- 최종: [대회 / 명] Our robot team won the national competition and earned a trip to Japan.
- 최종 번역: 우리 로봇 팀은 전국 대회에서 우승해 일본 여행 기회를 얻었다.

### index 150 · story · 제외

- 이유: 전쟁 이야기와 영화의 줄거리는 모두 서사 내용이다. 별도 다의어 의미보다 매체·번역 차이다.
- 기존 예문: My grandfather told us a story about the war.
- 초안: [줄거리 / 명] The movie's story was confusing, but the acting and music were excellent.
- 초안 번역: 그 영화의 줄거리는 혼란스러웠지만 연기와 음악은 훌륭했다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 173 · current · 수정

- 이유: 그 안을 흐르는 동안이라는 대명사 직역을 줄였다.
- 기존 예문: The current situation requires careful planning.
- 초안: [전류 / 명] Never touch the wire while the current is still flowing through it.
- 초안 번역: 전류가 아직 그 안을 흐르는 동안에는 절대 그 전선을 만지지 마라.
- 최종: [전류 / 명] Never touch the wire while the current is still flowing through it.
- 최종 번역: 전류가 흐르는 동안에는 절대 그 전선을 만지지 마라.

### index 209 · access · 제외

- 이유: 온라인 도서관을 이용하는 access와 실험실 이용 권한은 같은 접근·이용 의미를 명사로 바꾼 것이다.
- 기존 예문: Students can access the online library from home.
- 초안: [이용 권한 / 명] Students need special access to use the science lab after the teachers go home.
- 초안 번역: 학생들은 선생님들이 퇴근한 뒤 과학 실험실을 쓰려면 특별한 이용 권한이 필요하다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 213 · position · 수정

- 이유: 지위가 말하도록 요구한다는 직역을 역할 중심으로 풀었다.
- 기존 예문: He found a comfortable position on the sofa.
- 초안: [지위 / 명] Her position as team captain requires her to speak for everyone during meetings.
- 초안 번역: 팀 주장이라는 그녀의 지위는 회의에서 모두를 대신해 말하도록 요구한다.
- 최종: [지위 / 명] Her position as team captain requires her to speak for everyone during meetings.
- 최종 번역: 그녀는 팀 주장으로서 회의에서 팀원 모두의 입장을 대변해야 한다.

### index 226 · company · 수정

- 이유: company는 이 문장에서 이동 중 동행보다 함께 있는 것을 뜻한다.
- 기존 예문: She works for a large company.
- 초안: [동행 / 명] I enjoy the company of my grandparents, who tell me stories about the past.
- 초안 번역: 나는 과거 이야기를 해 주시는 조부모님과 어울리는 것이 즐겁다.
- 최종: [함께 있음 / 명] I enjoy the company of my grandparents, who tell me stories about the past.
- 최종 번역: 나는 과거 이야기를 해 주시는 조부모님과 어울리는 것이 즐겁다.

### index 238 · benefit · 제외

- 이유: 운동이 이롭다는 기존 문장과 걷기의 이점은 동일한 효용 의미의 동사·명사 전환이다.
- 기존 예문: Regular exercise benefits both body and mind.
- 초안: [이익 / 명] One benefit of walking to school is the time you spend outdoors.
- 초안 번역: 학교까지 걸어가는 것의 한 가지 이익은 야외에서 보내는 시간이다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 249 · award · 제외

- 이유: 상을 받는 기존 문장과 장학금을 수여하는 새 문장은 같은 포상 의미의 명사·동사 전환이다.
- 기존 예문: She received an award for her excellent research.
- 초안: [수여하다 / 동] The school will award a scholarship to the student with the best science project.
- 초안 번역: 학교는 최고의 과학 과제를 한 학생에게 장학금을 수여할 것이다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 389 · ground · 수정

- 이유: no grounds for가 자연스러운 결합이다. accusing을 단순히 의심하다로 옮긴 것도 수정했다.
- 기존 예문: The ball hit the ground.
- 초안: [근거 / 명] The detective found no ground for accusing the young man of the crime.
- 초안 번역: 형사는 그 젊은이가 범죄를 저질렀다고 의심할 근거를 찾지 못했다.
- 최종: [근거 / 명] The detective found no grounds for accusing the young man of stealing the bicycle.
- 최종 번역: 형사는 그 청년이 자전거를 훔쳤다고 혐의를 제기할 근거를 찾지 못했다.

### index 430 · board · 수정

- 이유: school board는 교육위원회로 읽히므로 이사회 의미에 맞는 조직으로 교체했다.
- 기존 예문: Please board the plane now.
- 초안: [이사회 / 명] The school board decided to delay the start of classes until next Monday.
- 초안 번역: 학교 이사회는 수업 시작을 다음 주 월요일까지 미루기로 결정했다.
- 최종: [이사회 / 명] The museum board voted to keep admission free for all students throughout the summer.
- 최종 번역: 박물관 이사회는 여름 내내 모든 학생에게 무료입장을 허용하기로 의결했다.

### index 576 · place · 수정

- 이유: top shelf의 맨 위라는 정보를 복원했다.
- 기존 예문: This is a good place to rest.
- 초안: [놓다 / 동] He placed the box on the top shelf where the children could not reach.
- 초안 번역: 그는 아이들의 손이 닿지 않는 선반 위에 상자를 놓았다.
- 최종: [놓다 / 동] He placed the box on the top shelf where the children could not reach.
- 최종 번역: 그는 아이들의 손이 닿지 않는 맨 위 선반에 상자를 놓았다.

### index 623 · value · 수정

- 이유: value를 높이 평가하다와 소중히 여기다 사이에서 읽을 수 있어 금전 가치 평가로 명확화했다.
- 기존 예문: Honesty is a value I truly respect.
- 초안: [평가하다 / 동] Many collectors value old stamps far more than their actual price suggests.
- 초안 번역: 많은 수집가는 오래된 우표를 실제 가격이 시사하는 것보다 훨씬 높게 평가한다.
- 최종: [평가하다 / 동] Experts value the old painting at several thousand dollars because it is extremely rare.
- 최종 번역: 전문가들은 그 오래된 그림이 매우 희귀하기 때문에 수천 달러의 가치가 있다고 평가한다.

### index 633 · top · 수정

- 이유: top the list는 목록의 1위를 차지하다이다. 주어진 능가하다 의미에 맞게 비교 대상을 직접 목적어로 썼다.
- 기존 예문: We reached the top of the hill.
- 초안: [능가하다 / 동] Her second novel managed to top the bestseller list for twelve weeks in a row.
- 초안 번역: 그녀의 두 번째 소설은 열두 주 연속 베스트셀러 목록에서 다른 책들을 능가했다.
- 최종: [능가하다 / 동] Her second novel may top her first in sales, judging by the early demand.
- 최종 번역: 초기 수요로 보아 그녀의 두 번째 소설은 판매량에서 첫 번째 소설을 능가할지도 모른다.

### index 656 · text · 제외

- 이유: 짧은 문자를 보냈다는 기존 문장을 text 동사로 다시 표현했다.
- 기존 예문: She sent me a short text to confirm the time.
- 초안: [문자를 보내다 / 동] Just text me when you arrive at the station, and I will come down.
- 초안 번역: 역에 도착하면 나에게 문자를 보내라, 그러면 내가 내려가겠다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 676 · speed · 제외

- 이유: 기차가 속도를 높인다는 기존 문장과 트럭이 빨리 달린다는 새 문장은 속력·빠른 이동의 동일 의미다.
- 기존 예문: The train gained speed as it left the station.
- 초안: [빠르게 가다 / 동] Trucks speed past the school gate every morning, so the town put in a crosswalk.
- 초안 번역: 매일 아침 트럭들이 학교 정문을 빠르게 지나가서 시에서는 횡단보도를 설치했다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 820 · virtual · 수정

- 이유: manager인데 no title이라고 해 직함 관계가 모순적으로 읽힌다. 공식 직책 없는 실질적 지도자로 고쳤다.
- 기존 예문: The students met in a virtual classroom during the storm.
- 초안: [사실상의 / 형] The new manager is the virtual leader of the team, though he has no title.
- 초안 번역: 그 새 매니저는 직함은 없지만 사실상 팀의 리더다.
- 최종: [사실상의 / 형] Although nobody elected her, Mina became the virtual leader of our group during the trip.
- 최종 번역: 아무도 그녀를 선출하지 않았지만, 미나는 여행 중 우리 모둠의 사실상 리더가 되었다.

### index 853 · delay · 제외

- 이유: 공항 지연과 축제 연기 모두 예정 시각보다 늦추거나 늦어지는 의미다. 명사·동사 전환만으로 추가하지 않는다.
- 기존 예문: Heavy snow caused a long delay at the airport.
- 초안: [미루다 / 동] They decided to delay the school festival until the gym roof is repaired.
- 초안 번역: 그들은 체육관 지붕이 수리될 때까지 학교 축제를 미루기로 했다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 866 · respect · 수정

- 이유: In this respect의 지시 대상이 독립 예문에 없어 어느 측면인지 분명하게 했다.
- 기존 예문: We should respect different opinions even when we disagree.
- 초안: [측면 / 명] In this respect, living alone teaches young people more than any lecture.
- 초안 번역: 이런 측면에서 혼자 사는 것은 어떤 강의보다 젊은 사람들에게 많은 것을 가르쳐 준다.
- 최종: [측면 / 명] The two schools differ in one important respect: only one offers free music lessons.
- 최종 번역: 두 학교는 한 가지 중요한 측면에서 다르다. 한 학교만 무료 음악 수업을 제공한다.

### index 874 · reservation · 수정

- 이유: 일반적인 결합 express reservations를 사용하고 우려라는 뜻을 선명하게 했다.
- 기존 예문: I made a reservation for four at the Italian restaurant.
- 초안: [유보 / 명] She accepted the plan but expressed some reservation about its high cost.
- 초안 번역: 그녀는 그 계획을 받아들였지만 비용이 많이 든다는 점에 대해 다소 유보적인 태도를 보였다.
- 최종: [우려 / 명] She accepted the plan but expressed reservations about its high cost and uncertain benefits.
- 최종 번역: 그녀는 계획을 받아들였지만 높은 비용과 불확실한 이점에 대해서는 우려를 표했다.

### index 877 · representation · 수정

- 이유: representation의 주체인 1학년 학생들의 참여·대표성을 자연스럽게 옮겼다.
- 기존 예문: The painting is a vivid representation of rural life.
- 초안: [대표 / 명] The student council needs better representation of first-year students in its meetings.
- 초안 번역: 학생회는 회의에서 1학년 학생들을 더 잘 대표할 필요가 있다.
- 최종: [대표 / 명] The student council needs better representation of first-year students in its meetings.
- 최종 번역: 학생회 회의에서 1학년 학생들의 의견이 더 잘 대변되도록 해야 한다.

### index 941 · wonder · 수정

- 이유: 경이로움과 조용한 놀라움으로 가득 채웠다는 직역을 수정했다.
- 기존 예문: I wonder why the sky looks red at sunset.
- 초안: [경이 / 명] The northern lights above the lake filled the children with wonder and quiet amazement.
- 초안 번역: 호수 위의 오로라가 아이들을 경이로움과 조용한 놀라움으로 가득 채웠다.
- 최종: [경이 / 명] The northern lights above the lake filled the children with wonder and quiet amazement.
- 최종 번역: 호수 위의 오로라를 본 아이들은 경이로움에 차 조용히 감탄했다.

### index 944 · failure · 수정

- 이유: power failure는 전력 고장이 아니라 정전이다.
- 기존 예문: Failure taught them what to fix first.
- 초안: [고장 / 명] A sudden power failure stopped the concert halfway through the second song.
- 초안 번역: 갑작스러운 전력 고장으로 콘서트가 두 번째 곡 중간에 멈췄다.
- 최종: [공급 중단 / 명] A sudden power failure stopped the concert halfway through the second song.
- 최종 번역: 갑작스러운 정전으로 콘서트가 두 번째 곡 중간에 멈췄다.

### index 981 · detail · 제외

- 이유: explain in more detail과 detailed how 모두 자세한 설명이며 별도 의미가 아니다.
- 기존 예문: Please explain the plan in more detail.
- 초안: [자세히 설명하다 / 동] In her report, she detailed how the club raised money for the shelter.
- 초안 번역: 그녀는 보고서에서 동아리가 보호소를 위해 어떻게 기금을 모았는지 자세히 설명했다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 1066 · transfer · 수정

- 이유: 바이러스 전이에 어색한 transfer 대신 동일 표제어의 학습 내용 전이 상황을 사용했다.
- 기존 예문: Please transfer the files to the shared folder today.
- 초안: [전이하다 / 동] Scientists worry that the virus may transfer from animals to humans through close contact.
- 초안 번역: 과학자들은 그 바이러스가 가까운 접촉을 통해 동물에서 사람으로 전이될 수 있음을 걱정한다.
- 최종: [옮겨 적용하다 / 동] Students often struggle to transfer skills learned in the classroom to unfamiliar situations outside school.
- 최종 번역: 학생들은 교실에서 배운 기술을 학교 밖의 낯선 상황에 옮겨 적용하는 데 어려움을 겪곤 한다.

### index 1091 · chain · 수정

- 이유: chain은 개별 체인점이 아니라 여러 매장을 둔 업체다.
- 기존 예문: A small mistake started a chain of problems.
- 초안: [체인점 / 명] A coffee chain opened a new store right next to the old bookstore.
- 초안 번역: 한 커피 체인점이 오래된 서점 바로 옆에 새 매장을 열었다.
- 최종: [체인 업체 / 명] A coffee chain opened a new store right next to the old bookstore.
- 최종 번역: 한 커피 체인 업체가 오래된 서점 바로 옆에 새 매장을 열었다.

### index 1096 · yield · 제외

- 이유: 곡물을 생산하는 yield와 쌀 수확량 yield는 동일한 농작물 생산 의미의 동사·명사 전환이다.
- 기존 예문: The farm yields enough grain to feed the village.
- 초안: [수확량 / 명] Heavy rain this year raised the rice yield across the whole region.
- 초안 번역: 올해 많은 비가 내려 지역 전체의 쌀 수확량이 늘었다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 1100 · length · 제외

- 이유: 시험의 length와 비행의 length 모두 소요 시간이다.
- 기존 예문: The length of the exam worried the students.
- 초안: [기간 / 명] The length of the flight to Australia made the children restless and tired.
- 초안 번역: 호주까지 가는 비행의 긴 시간 때문에 아이들은 안절부절못하고 지쳐 있었다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

## teps 수정·제외 상세

### index 96 · keep · 수정

- 이유: delicate paintings를 연약한 그림으로 옮긴 직역을 수정했다.
- 기존 예문: Keep your receipt until delivery.
- 초안: [유지하다 / 동] Museum curators keep the exhibition halls dark to protect the delicate watercolor paintings.
- 초안 번역: 미술관 큐레이터들은 연약한 수채화를 보호하기 위해 전시관을 어둡게 유지한다.
- 최종: [유지하다 / 동] Museum curators keep the exhibition halls dark to protect the delicate watercolor paintings.
- 최종 번역: 미술관 큐레이터들은 손상되기 쉬운 수채화를 보호하려고 전시관을 어둡게 유지한다.

### index 97 · lose · 수정

- 이유: lose a team the championship는 팀이 우승을 놓치게 하다이다. 지다 의미의 주어로 고치고 A single careless 반복 시작도 없앴다.
- 기존 예문: Try not to lose this key.
- 초안: [지다 / 동] A single careless mistake can lose a team the championship in the final minutes.
- 초안 번역: 부주의한 실수 하나로 팀이 마지막 몇 분 만에 우승을 내줄 수 있다.
- 최종: [지다 / 동] Even the strongest team can lose a match if its players stop working together.
- 최종 번역: 아무리 강한 팀이라도 선수들이 협력하지 않으면 경기에서 질 수 있다.

### index 134 · value · 수정

- 이유: value가 일반적 중요성으로 읽히지 않도록 금전 가치를 명시했다.
- 기존 예문: We value your honest opinion.
- 초안: [가치 / 명] Experts questioned the value of the manuscript long before it was sold.
- 초안 번역: 전문가들은 그 원고가 팔리기 훨씬 전부터 그 가치에 의문을 제기했다.
- 최종: [금전적 가치 / 명] Experts estimated the monetary value of the manuscript before the auction house offered it for sale.
- 최종 번역: 전문가들은 경매 회사가 그 필사본을 매물로 내놓기 전에 금전적 가치를 추산했다.

### index 151 · working · 수정

- 이유: working parents가 반드시 부부 모두 일하는 맞벌이를 뜻하지 않는다.
- 기존 예문: We need a working printer.
- 초안: [일하는 / 형] Working parents in the city often struggle to find affordable childcare near their offices.
- 초안 번역: 도시의 맞벌이 부모들은 사무실 근처에서 값싼 보육 시설을 찾느라 자주 어려움을 겪는다.
- 최종: [일하는 / 형] Working parents in the city often struggle to find affordable childcare near their offices.
- 최종 번역: 도시에서 일하는 부모들은 직장 근처에서 비용 부담이 적은 보육 시설을 찾느라 자주 어려움을 겪는다.

### index 184 · clear · 수정

- 이유: so ... that 강조를 자연스러운 한국어로 옮겼다.
- 기존 예문: The directions were perfectly clear.
- 초안: [맑은 / 형] So clear was the lake that stones on the bottom seemed close enough to touch.
- 초안 번역: 호수가 그렇게 맑아서 바닥의 돌이 손에 닿을 만큼 가까워 보였다.
- 최종: [맑은 / 형] So clear was the lake that stones on the bottom seemed close enough to touch.
- 최종 번역: 호수가 너무나 맑아서 바닥의 돌이 손에 닿을 만큼 가까워 보였다.

### index 218 · project · 제외

- 이유: 과제와 주택 사업은 모두 계획하여 수행하는 project이다. 기존 문장도 사업으로 읽히며 구별되는 뜻을 확보하지 못한다.
- 기존 예문: Our project needs more research.
- 초안: [사업 / 명] Local residents opposed the housing project until the city promised new parks.
- 초안 번역: 지역 주민들은 시가 새 공원을 약속할 때까지 그 주택 사업에 반대했다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 221 · article · 제외

- 이유: 발견을 설명하는 article과 학술지 article은 모두 출판된 글이다. 매체 차이이며 기존 문장도 논문으로 읽힌다.
- 기존 예문: This article explains the discovery.
- 초안: [논문 / 명] Her article on sleep patterns appeared in a respected medical journal last month.
- 초안 번역: 수면 패턴에 관한 그녀의 논문은 지난달 저명한 의학 저널에 실렸다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 248 · company · 수정

- 이유: company는 이 문장에서 함께 있는 즐거움이다. 동행이 즐겁다는 번역을 수정했다.
- 기존 예문: The company makes medical equipment.
- 초안: [동행 / 명] I enjoy the company of my neighbors when we walk along the river.
- 초안 번역: 나는 이웃들과 강을 따라 걸을 때 그들의 동행이 즐겁다.
- 최종: [함께 있음 / 명] I enjoy the company of my neighbors when we walk along the river.
- 최종 번역: 나는 이웃들과 함께 강변을 걸으며 시간을 보내는 것이 즐겁다.

### index 258 · form · 수정

- 이유: 자동사 form이므로 형성되다로 표지를 일치시켰다.
- 기존 예문: Sign the form at the bottom.
- 초안: [형성하다 / 동] Thin layers of ice began to form on the windows of the old bus.
- 초안 번역: 낡은 버스의 창문에 얇은 얼음층이 생기기 시작했다.
- 최종: [형성되다 / 동] Thin layers of ice began to form on the windows of the old bus.
- 최종 번역: 낡은 버스의 창문에 얇은 얼음층이 생기기 시작했다.

### index 266 · screen · 수정

- 이유: 검진하는 의미를 명시하고 발열 여부를 가려낸다는 부자연스러운 번역을 수정했다.
- 기존 예문: The screen is too bright.
- 초안: [가려내다 / 동] Nurses screen every visitor for fever before they enter the nursing home.
- 초안 번역: 간호사들은 요양원에 들어오기 전에 모든 방문자의 발열 여부를 가려낸다.
- 최종: [검사하다 / 동] Nurses screen every visitor for fever before they enter the nursing home.
- 최종 번역: 간호사들은 모든 방문자가 요양원에 들어가기 전에 열이 있는지 검사한다.

### index 318 · favor · 수정

- 이유: 지위에도 불구하고 호의를 베풀지 않는다는 논리와 collocation을 바로잡고 편애 의미로 좁혔다.
- 기존 예문: Could you do me a favor?
- 초안: [호의 / 명] Despite his position, the professor showed no favor to anyone during grading.
- 초안 번역: 자신의 지위에도 불구하고 그 교수는 채점하는 동안 누구에게도 호의를 베풀지 않았다.
- 최종: [편애 / 명] The professor showed no favor toward his own nephew when grading the final essays.
- 최종 번역: 그 교수는 기말 과제를 채점할 때 자기 조카에게도 특혜를 주지 않았다.

### index 373 · rent · 제외

- 이유: 임대료와 자전거 임차는 같은 유상 임대 의미의 명사·동사 전환이다.
- 기존 예문: The rent includes water charges.
- 초안: [빌리다 / 동] Many exchange students rent bicycles instead of paying for monthly bus passes.
- 초안 번역: 많은 교환 학생들이 월 버스 정기권 값을 내는 대신 자전거를 빌린다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 422 · process · 수정

- 이유: ten working days의 영업일 정보를 복원했다.
- 기존 예문: The process takes two weeks.
- 초안: [처리하다 / 동] The office processes visa applications within ten working days during the busy season.
- 초안 번역: 그 사무실은 성수기에는 비자 신청서를 열흘 안에 처리한다.
- 최종: [처리하다 / 동] The office processes visa applications within ten working days during the busy season.
- 최종 번역: 그 사무실은 성수기에 비자 신청서를 영업일 기준 열흘 안에 처리한다.

### index 424 · routine · 제외

- 이유: 일상적인 운동 일과와 정례 점검은 같은 반복적·통상적 활동의 명사·형용사 전환이다.
- 기존 예문: Exercise is part of my routine.
- 초안: [통상적인 / 형] The technician performed a routine check of the equipment before the laboratory opened.
- 초안 번역: 그 기사는 실험실이 문을 열기 전에 장비를 통상적으로 점검했다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 452 · total · 제외

- 이유: 봉사료를 포함한 total과 total cost 모두 비용 총합이다.
- 기존 예문: The total includes service charges.
- 초안: [전체의 / 형] The total cost of the field trip includes meals, transport, and museum admission.
- 초안 번역: 현장 학습의 총비용에는 식사, 교통, 박물관 입장료가 포함된다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 471 · case · 수정

- 이유: 기존 case도 사건으로 읽힐 여지가 있어 형사 사건임을 명시하고 reopen의 직역도 수정했다.
- 기존 예문: Each case needs separate consideration.
- 초안: [사건 / 명] Detectives reopened the case after a new witness came forward last month.
- 초안 번역: 형사들은 지난달 새 목격자가 나서자 그 사건을 다시 열었다.
- 최종: [사건 / 명] Detectives reopened the murder case after a new witness identified the suspect last month.
- 최종 번역: 형사들은 지난달 새 목격자가 용의자를 지목한 뒤 그 살인 사건의 수사를 재개했다.

### index 472 · event · 수정

- 이유: event가 가리키는 사건을 특정하여 행사와의 차이를 명확히 했다.
- 기존 예문: The event attracted local families.
- 초안: [사건 / 명] Investigators are still trying to determine why the event occurred without warning.
- 초안 번역: 수사관들은 그 사건이 아무 경고 없이 일어난 이유를 아직 밝히려 하고 있다.
- 최종: [사건 / 명] The sudden collapse of the bridge was a tragic event that shocked the entire town.
- 최종 번역: 다리의 갑작스러운 붕괴는 마을 전체에 충격을 준 비극적인 사건이었다.

### index 487 · blame · 제외

- 이유: 남을 탓하는 blame과 오류의 blame을 지는 것은 같은 잘못·책임 귀속 의미다.
- 기존 예문: Don't blame others for this.
- 초안: [책임 / 명] The manager took the blame for the scheduling error, though the system had failed.
- 초안 번역: 시스템이 고장 났음에도 관리자는 일정 오류에 대한 책임을 졌다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 508 · gather · 제외

- 이유: 사람이 모이다와 표본을 모으다는 같은 집합 의미의 자동사·타동사 차이다.
- 기존 예문: Volunteers gather near the fountain.
- 초안: [모으다 / 동] The team spent the summer gathering soil samples from farms across the region.
- 초안 번역: 그 팀은 여름 내내 지역 전역의 농장에서 흙 시료를 모으며 보냈다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 572 · depend · 수정

- 이유: volunteer doctors를 자원 의사로 옮긴 번역을 수정했다.
- 기존 예문: Prices depend on the season.
- 초안: [의존하다 / 동] Rural clinics depend heavily on volunteer doctors during the winter holiday season.
- 초안 번역: 시골 진료소는 겨울 방학 기간에 자원 의사들에게 크게 의존한다.
- 최종: [의존하다 / 동] Rural clinics depend heavily on volunteer doctors during the winter holiday season.
- 최종 번역: 시골 진료소는 겨울 휴가철에 자원봉사 의사들에게 크게 의존한다.

### index 605 · apply · 수정

- 이유: 자동사 apply to이므로 적용되다로 표지를 일치시켰다.
- 기존 예문: Apply before the end of June.
- 초안: [적용하다 / 동] The new safety rules apply to every laboratory that handles chemical waste.
- 초안 번역: 새 안전 규칙은 화학 폐기물을 다루는 모든 실험실에 적용된다.
- 최종: [적용되다 / 동] The new safety rules apply to every laboratory that handles chemical waste.
- 최종 번역: 새 안전 규칙은 화학 폐기물을 다루는 모든 실험실에 적용된다.

### index 659 · physical · 수정

- 이유: physical model은 실제로 만든 모형으로 읽히므로 물리적인 모형이라는 직역을 풀었다.
- 기존 예문: The work requires physical strength.
- 초안: [물리적인 / 형] Researchers built a physical model of the bridge to test how it moves.
- 초안 번역: 연구자들은 다리가 어떻게 움직이는지 시험하기 위해 물리적인 모형을 만들었다.
- 최종: [실물의 / 형] Researchers built a physical model of the bridge to test how it moves.
- 최종 번역: 연구자들은 다리가 어떻게 움직이는지 시험하기 위해 실물 모형을 만들었다.

### index 743 · payment · 제외

- 이유: 배송 시 지급할 payment와 월 payment 모두 지불·대금 문맥이다. 기존 문장도 지급액으로 읽혀 별도 의미가 확보되지 않는다.
- 기존 예문: Payment is due upon delivery.
- 초안: [지급액 / 명] The monthly payment for the loan rose after the interest rate changed.
- 초안 번역: 대출의 월 지급액은 금리가 바뀐 뒤 올랐다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 1458 · bound · 수정

- 이유: 부상한 다리를 묶는 처치 문맥을 피하고 묶인 상태를 명확히 했다.
- 기존 예문: Some delays are bound to occur.
- 초안: [묶인 / 형] The rescued dog's front leg was bound with a clean cloth until the vet arrived.
- 초안 번역: 구조된 개의 앞다리는 수의사가 도착할 때까지 깨끗한 천으로 묶여 있었다.
- 최종: [묶인 / 형] With his hands bound behind his back, the prisoner could not open the heavy door.
- 최종 번역: 손이 등 뒤로 묶여 있어서 그 죄수는 무거운 문을 열 수 없었다.

### index 1510 · nominal · 수정

- 이유: director와 assistant를 원장·비서로 과도하게 특정하지 않았다.
- 기존 예문: Visitors pay a nominal fee.
- 초안: [명목상의 / 형] He holds the nominal title of director, but the department is actually run by his assistant.
- 초안 번역: 그는 명목상 원장이라는 직함을 갖고 있지만, 부서는 실제로 그의 비서가 운영한다.
- 최종: [명목상의 / 형] He holds the nominal title of director, but the department is actually run by his assistant.
- 최종 번역: 그는 명목상 부서장이라는 직함을 갖고 있지만 실제로 부서를 운영하는 사람은 그의 보좌관이다.

### index 1531 · rigid · 제외

- 이유: 경직된 규칙과 변경을 허용하지 않는 엄격한 일정 모두 융통성이 없는 의미다.
- 기존 예문: Rigid rules limited innovation.
- 초안: [엄격한 / 형] Our supervisor keeps a rigid schedule and refuses to approve even short extensions for lab reports.
- 초안 번역: 우리 감독관은 엄격한 일정을 고수하며 실험 보고서 마감을 며칠 늦춰 주는 것조차 허락하지 않는다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 1538 · tangible · 수정

- 이유: tangible replicas는 자명한 수식이다. 디지털 대상과 대비하여 물리적으로 만질 수 있음을 드러냈다.
- 기존 예문: The changes brought tangible benefits.
- 초안: [만질 수 있는 / 형] The museum allows visitors to handle tangible replicas of the ancient tools found at the site.
- 초안 번역: 그 박물관은 관람객이 유적지에서 발굴된 고대 도구의 만질 수 있는 복제품을 직접 다뤄 보도록 허용한다.
- 최종: [만질 수 있는 / 형] Unlike digital images, tangible objects can be touched and examined from every angle.
- 최종 번역: 디지털 이미지와 달리 만질 수 있는 물체는 손으로 만지고 모든 각도에서 살펴볼 수 있다.

### index 1600 · welfare · 제외

- 이유: animal welfare와 emotional welfare 모두 대상의 건강·행복·안녕이다. 복지와 안녕은 여기서 번역 차이다.
- 기존 예문: The policy protects animal welfare.
- 초안: [안녕 / 명] The counselor asked about the students' emotional welfare as well as their academic progress.
- 초안 번역: 그 상담사는 학생들의 학업 성취뿐 아니라 정서적 안녕에 대해서도 물었다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 1607 · patron · 수정

- 이유: oldest patron은 최고령 고객으로도 읽혀 오래된 단골이라는 번역을 뒷받침하지 못한다.
- 기존 예문: A local patron funded the exhibition.
- 초안: [단골손님 / 명] The bakery's oldest patron stops by every morning for the same rye bread and coffee.
- 초안 번역: 그 빵집의 가장 오래된 단골손님은 매일 아침 같은 호밀빵과 커피를 사러 들른다.
- 최종: [단골손님 / 명] The bakery's oldest patron stops by every morning for the same rye bread and coffee.
- 최종 번역: 그 빵집의 최고령 단골손님은 매일 아침 같은 호밀빵과 커피를 사러 들른다.

### index 1767 · formidable · 수정

- 이유: 경외감을 주는 연주라는 어색한 번역을 피하고 탁월한 능력의 문맥으로 명확화했다.
- 기존 예문: The team faces formidable obstacles.
- 초안: [경외감을 주는 / 형] The young pianist gave a formidable performance that left the judges silent for several seconds.
- 초안 번역: 그 젊은 피아니스트는 심사위원들을 몇 초 동안 침묵하게 만든 경외감을 주는 연주를 선보였다.
- 최종: [경외감을 줄 만큼 뛰어난 / 형] Her formidable knowledge of ancient languages impressed even the senior scholars attending the conference.
- 최종 번역: 그녀의 고대 언어에 대한 뛰어난 지식은 학회에 참석한 원로 학자들까지 감탄하게 했다.

### index 1799 · opaque · 제외

- 이유: 선발 과정의 opaque는 물리적 불투명이 아니라 내용을 알기 어려운 비유적 의미다. 이해하기 힘든 장도 같은 비유적 의미여서 보수적으로 제외한다.
- 기존 예문: The selection process remains opaque.
- 초안: [이해하기 힘든 / 형] The final chapter is so opaque that even graduate students need a commentary to follow it.
- 초안 번역: 마지막 장은 너무 이해하기 힘들어서 대학원생들조차 그것을 따라가려면 해설서가 필요하다.
- 조치: 최종본에서 제외. 기존 packages 예문은 그대로 유지.

### index 1987 · brink · 수정

- 이유: brink의 물리적 가장자리를 더 전형적인 가파른 절벽 문맥으로 명확히 했다.
- 기존 예문: The company stood on the brink of collapse.
- 초안: [가장자리 / 명] They stopped at the brink of the river to watch the sun set behind the hills.
- 초안 번역: 그들은 언덕 뒤로 해가 지는 것을 보며 강 가장자리에 멈춰 섰다.
- 최종: [가장자리 / 명] The hikers stopped at the brink of the cliff and looked down at the sea.
- 최종 번역: 등산객들은 절벽 끝에 멈춰 서서 아래로 바다를 내려다보았다.

## 무수정 통과 목록

### suneung 통과 index

4 just, 20 back, 32 age, 35 class, 41 development, 48 performance, 56 space, 57 course, 59 musical, 61 form, 62 free, 66 year, 69 view, 75 put, 97 key, 102 service, 113 role, 126 face, 128 consider, 129 interest, 132 act, 139 close, 141 degree, 145 due, 153 period, 167 hand, 169 check, 171 action, 176 original, 205 step, 212 movement, 245 deal, 252 stage, 263 fire, 286 image, 296 expression, 301 fine, 303 hold, 321 head, 324 judge, 329 promote, 348 article, 357 institution, 369 stand, 374 correct, 413 capital, 441 address, 443 condition, 468 drop, 482 grade, 521 branch, 591 part, 595 sense, 604 room, 605 order, 613 matter, 614 set, 626 past, 630 lead, 635 live, 647 present, 655 play, 666 type, 670 note, 673 model, 674 power, 675 prize, 680 capacity, 682 frequency, 683 light, 687 content, 692 practice, 694 mean, 698 second, 707 line, 716 management, 723 confidence, 734 evolution, 736 registration, 753 season, 755 fashion, 770 shape, 797 record, 813 agent, 829 miss, 830 race, 835 leave, 836 paper, 839 notice, 849 rest, 856 score, 858 train, 883 safe, 884 spot, 886 match, 910 reference, 915 distribution, 939 submit, 942 channel, 945 serious, 950 graduate, 955 objective, 959 proportion, 960 submission, 965 identification, 967 fair, 968 host, 979 assume, 997 regulate, 1075 accommodate, 1080 cast, 1089 unit, 1094 sharp, 1097 credit, 1104 rhythm, 1259 stress, 1268 object, 1269 subject, 1338 range, 1390 conduct, 1472 secure

### teps 통과 index

1 address, 19 reach, 22 free, 33 rather, 63 most, 75 notice, 81 offer, 86 excuse, 88 share, 105 close, 109 stop, 122 miss, 127 spend, 138 bill, 142 store, 146 fit, 158 cool, 159 cold, 167 hard, 180 right, 186 certain, 190 class, 191 lesson, 193 subject, 195 grade, 204 review, 228 degree, 230 term, 231 break, 249 business, 250 meeting, 262 paper, 263 letter, 270 charge, 272 power, 298 medicine, 301 patient, 305 treatment, 320 platform, 335 direction, 365 kind, 399 view, 415 chance, 436 common, 444 major, 451 number, 455 rate, 459 part, 461 side, 464 area, 467 position, 469 condition, 477 character, 479 interest, 481 care, 489 argue, 498 digest, 510 arrange, 540 weigh, 571 refer, 588 spoil, 590 treat, 622 decent, 632 due, 653 natural, 658 original, 696 apparently, 702 effectively, 714 otherwise, 1367 conviction, 1388 equity, 1397 identity, 1407 liability, 1410 mandate, 1457 blunt, 1472 critical, 1502 legitimate, 1520 profound, 1556 owe, 1591 tolerate, 1595 surplus, 1598 threshold, 1605 margin, 1615 rhetoric, 1618 tenure, 1821 affinity, 1847 culprit, 1884 latitude
