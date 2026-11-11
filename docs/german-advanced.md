# 독일어 B2·C1·C2 핵심 확장

B1 이후의 학습을 위해 공개 교재 학습지와 공식 시험 예제 PDF에서 고급 어휘·명사/동사 결합·관용 표현을 선별한 패키지다. A1–B1의 공식 Wortliste와 같은 완결된 필수어휘 목록으로 해석하지 않는다. Goethe의 어휘 앱은 A1·A2·B1을 제공하며 상위 단계는 제공하지 않는다고 [공식 안내](https://www.goethe.de/prj/dvt/de/index.html)에 명시되어 있다.

| 패키지 | 해당 단계 신규 | 누적 항목 | Day 수 |
| --- | ---: | ---: | ---: |
| `packages/german-b2.json` | 248 | 3,868 | 194 |
| `packages/german-c1.json` | 231 | 4,099 | 205 |
| `packages/german-c2.json` | 272 | 4,371 | 219 |

신규 항목은 총 751개다. B2는 기존 B1 3,620개를, C1은 B2를, C2는 C1을 그대로 포함한다. 기존 단어·뜻·예문·문법 정보는 바꾸지 않는다. 패키지별 학습 기록은 독립적이다.

## 자료

각 단계에서 SCHUBERT의 Erkundungen 연계 학습지와 Goethe 공식 시험 예제를 함께 사용했다. 총 6개 PDF, 251쪽이다.

| 단계 | 출판사 학습지 | 공식 시험 예제 |
| --- | --- | --- |
| B2 | [Erkundungen B2 온라인 학습지, 33쪽](https://www.schubert-verlag.de/aufgaben/uebungen_b2/B2-Onlineaufgabe.pdf) | [Goethe B2 성인 Modellsatz, 51쪽](https://www.goethe.de/pro/relaunch/prf/materialien/B2/b2_modellsatz_erwachsene.pdf) |
| C1 | [Erkundungen C1 온라인 학습지, 31쪽](https://www.schubert-verlag.de/aufgaben/uebungen_c1/C1-Onlineaufgabe.pdf) | [Goethe C1 modular Modellsatz, 46쪽](https://www.goethe.de/pro/relaunch/prf/materialien/C1_modular/c1-modular_modellsatz.pdf) |
| C2 | [Erkundungen C2 온라인 학습지, 31쪽](https://www.schubert-verlag.de/aufgaben/uebungen_c2/C2-Onlineaufgabe.pdf) | [Goethe C2 Modellsatz, 59쪽](https://www.goethe.de/pro/relaunch/prf/materialien/C2/c2_modellsatz.pdf) |

확인한 PDF의 SHA-256·바이트 크기·쪽 수·확인일과 항목별 실제 표면형/페이지는 `german-advanced-sources.json`에 있다. 해당 파일의 `words[].index`는 `german-c2.json`의 0부터 시작하는 인덱스다. B1 이하 출처는 기존 `german-sources.json`을 연결한다.

## 선정과 단계 배치

- 개별 단어는 선정한 PDF 중 해당 품사와 실제 형태가 확인되는 가장 이른 단계에 배치한다. 예를 들어 더 낮은 단계 자료에서 확인된 일반 동사를 C2 자료에 있다는 이유만으로 C2에만 넣지 않는다.
- 이는 표본 자료에 근거한 편집상 학습 배치다. 그 단어의 공인 CEFR 등급, 최소 난이도 또는 시험 출제 범위를 확정하지 않는다. 특정 시험 예제에 등장하는 모든 단어가 그 단계에만 속하는 것은 아니다.
- 명사/동사 결합과 관용구는 해당 단계에서 학습하는 표현으로 별도 선별한다. 원장의 출처는 핵심 어휘가 등장하는 문맥을 가리키며, 완성된 결합을 원문에서 축어 인용했다는 뜻이 아니다. 문법과 결합 가능성은 별도로 검토했다.
- 자동 원형 추정 결과를 그대로 수록하지 않는다. `Vermögen`(재산)과 `vermag`(할 수 있다), `Nachlass`(유산)와 `Nachlassen`(저하)을 구분하며, 줄바꿈된 `Gesetzentwurf`를 `Entwurf`의 출처로 오인하지 않는다.
- 인명·지명, 문서 관리 코드, 잘린 철자, 단순 활용형 반복을 카드 수를 늘리는 데 사용하지 않는다. 출판사 학습지의 틀린 선택지를 올바른 결합으로 자동 변환하지 않는다.
- 본 패키지는 공개된 자료의 모든 어휘를 전수 수록한 것이 아니다. 다른 교재·시험·관심 분야에서 필요한 고급 어휘는 추가될 수 있다.

## 형식과 활용

모든 신규 항목은 `[독일어, 한국어 뜻, 품사, 독일어 예문, 예문 해석]` 5필드다. 예문은 직접 작성했고 15단어 이내다. 출판사의 문항·예문 본문은 재배포하지 않는다.

```json
["in Erwägung ziehen", "고려하다", "동", "Wir ziehen einen Umzug in eine kleinere Wohnung in Erwägung.", "우리는 더 작은 아파트로 이사하는 것을 고려한다."]
```

247개 신규 명사에는 성을 표시하고, 180개에는 복수형을 보강했다. 나머지의 복수형 미기재는 복수형이 없다는 뜻이 아니다. 전치사 격, 재귀 용법, 분리/비분리 동사, 격식·어조 설명은 기존 방식의 `wordInfo`에 기록한다. 동사구가 `die`로 시작해도 명사 성을 잘못 표시하지 않는다.

`lang: "de-DE"`, `languageName: "독일어"`를 사용하므로 기존 카드·듣기·오답노트의 독일어 발음 기능에 연결된다. 뜻에 독일어 복수형을 섞지 않아 역방향 퀴즈의 정답을 드러내지 않는다.

## 검증

751개 신규 항목에 대한 1,023개 페이지별 표면형 참조를 실제 추출문과 대조했다. 기존 단어 1개에 대한 참조 3개까지 포함하면 총 1,026개다. 명사·관용구 메타데이터와 단계 재배치도 확인했다. 선정한 PDF와 8단어 이상 전체 예문이 같은 경우는 없었다. 철자 사전에서 미인식된 네 형태는 추가 사전 확인 대상으로 검토했다.

이 검사는 원어민의 문법·번역 감수를 대신하지 않는다. 검증 명령은 다음과 같다.

```powershell
node test/german-advanced.test.js
node test/german.test.js
node test/core.test.js
node test/toeic.test.js
node test/questions.test.js
```

2026-11-10 검증 결과: 상위 독일어 7개, 기존 독일어 데이터·UI 함수 6개, Core 48개, TOEIC 데이터 6개, 시험 문항 14개로 총 81개 검사를 통과했다. HTTP에서 세 새 패키지와 출처 원장이 200으로 제공되며 패키지 응답의 SHA-256이 원장과 일치함을 확인했다. 기존 B1 파일 해시도 유지되었다. 이 검증은 자동 검사와 HTTP 제공 확인이며, 새 화면의 시각 검사나 실제 TTS 청취를 포함하지 않는다.
