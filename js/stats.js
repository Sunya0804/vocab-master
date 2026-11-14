/* Statistics read existing word, practice and mock records without loading question banks. */
'use strict';
function mockTrendSVG(scores) {
  const x = i => scores.length === 1 ? 320 : 48 + i * 556 / (scores.length - 1);
  const y = score => 224 - score / 990 * 192;
  const lines = [['lc', 'LC'], ['rc', 'RC'], ['total', '합계']];
  return `<svg class="stats-chart" viewBox="0 0 640 268" role="img" aria-labelledby="trend-title trend-desc"><title id="trend-title">회차별 모의고사 점수</title><desc id="trend-desc">회차별 가장 최근 응시의 LC, RC, 합계 점수예요. 정확한 수치는 아래 표에서 확인할 수 있어요.</desc>
    ${[0, 495, 990].map(score => `<line x1="48" x2="604" y1="${y(score)}" y2="${y(score)}" class="chart-grid"/><text x="40" y="${y(score) + 4}" text-anchor="end">${score}</text>`).join('')}
    ${lines.map(([key]) => `<g class="chart-${key}"><polyline points="${scores.map((s, i) => `${x(i)},${y(s[key])}`).join(' ')}" fill="none" stroke-width="3"${key === 'rc' ? ' stroke-dasharray="7 4"' : ''}/>${scores.map((s, i) => `<circle cx="${x(i)}" cy="${y(s[key])}" r="4"><title>${s.test}회 ${key.toUpperCase()} ${s[key]}점</title></circle>`).join('')}</g>`).join('')}
    ${scores.map((s, i) => `<text x="${x(i)}" y="248" text-anchor="middle">${s.test}</text>`).join('')}</svg>`;
}

function renderStats() {
  void discoverWordbooks();
  const stats = Core.learningStats(state, packages(), examState, mockState);
  return `${back('#/home')}${intro('', '학습 통계', '이 기기에 저장된 학습 기록이에요')}
    <section class="stats-summary"><h2>오답노트</h2><a href="#/wrong"><strong>${stats.wrong}개</strong> ${icon('chevron-right')}</a></section>
    <div class="section-heading"><h2>단어장별 진행률</h2></div><p class="session-note">${escape(discoveryNotice())}</p>
    ${discoveryFinished && packages().some(pkg => !packageReady(pkg)) ? '<button data-action="discover-retry">다시 불러오기</button>' : ''}<div class="stats-books">${stats.books.map(book => `<section class="stats-book"><h3>${escape(book.name)}</h3>${book.totalDays === null ? '<p>저장되지 않은 단어장이에요. 연결 후 진행률을 확인해 주세요.</p>' : `${meter(book.studiedDays, book.totalDays, `${book.name} 학습 진행률`)}<p>학습한 Day ${book.studiedDays} / ${book.totalDays} · 아는 단어 ${book.known}개</p>${!book.studiedDays && !book.known ? '<small>아직 학습 기록이 없어요.</small>' : ''}`}</section>`).join('') || '<p>단어장을 가져오면 진행률을 확인할 수 있어요.</p>'}</div>
    <div class="section-heading"><h2>연습문제 정답률</h2></div><p class="session-note">문항별 가장 최근 답을 기준으로 계산해요.</p>
    <dl class="exam-type-results">${stats.parts.map(part => `<div><dt>Part ${part.part}</dt><dd>${part.solved ? `${part.accuracy}% · ${part.correct}/${part.solved}문항` : '아직 푼 문제가 없어요'}</dd></div>`).join('')}</dl>
    <div class="section-heading"><h2>모의고사 점수 추이</h2></div>${stats.scores.length ? `<p class="session-note">회차별 최근 응시 기록 · 점수는 예상 환산치예요.</p><ul class="chart-legend"><li class="chart-lc">LC</li><li class="chart-rc">RC (점선)</li><li class="chart-total">합계</li></ul>${mockTrendSVG(stats.scores)}<div class="stats-table-wrap"><table class="stats-table"><caption class="sr-only">회차별 최근 점수</caption><thead><tr><th scope="col">회차</th><th scope="col">LC</th><th scope="col">RC</th><th scope="col">합계</th></tr></thead><tbody>${stats.scores.map(s => `<tr><th scope="row">${s.test}회</th><td>${s.lc}</td><td>${s.rc}</td><td>${s.total}</td></tr>`).join('')}</tbody></table></div>` : '<p class="session-note">아직 모의고사 기록이 없어요. 응시를 마치면 점수 추이가 나타나요.</p>'}`;
}

window.addEventListener('storage', event => {
  if (!ready || location.hash !== '#/stats' || event.storageArea !== storage) return;
  if (event.key === MOCK_KEY || event.key === null) mockState = loadMockState();
  if (event.key === EXAM_KEY || event.key === null) examState = loadExamState();
  if ([null, MOCK_KEY, EXAM_KEY].includes(event.key)) render();
});
