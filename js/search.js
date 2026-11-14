/* Search loads wordbooks on demand; offline requests read Cache Storage only. */
'use strict';
let searchQuery = '', searchLimit = 100, discoveryJob = null, discoveryFinished = false;

async function discoverWordbooks(retry = false) {
  if (discoveryJob || (discoveryFinished && !retry)) return discoveryJob;
  discoveryFinished = false;
  discoveryJob = (async () => {
    if (navigator.onLine) await loadPackages(builtins.filter(pkg => !packageReady(pkg)).map(pkg => pkg.id));
    else if ('caches' in window) {
      await Promise.all(builtins.filter(pkg => !packageReady(pkg)).map(async entry => {
        try {
          const response = await caches.match(new URL(`./packages/${entry.file}`, location.href).href);
          if (!response?.ok) return;
          const pkg = await response.json();
          if (validPackage(pkg) && pkg.id === entry.id) builtins[builtins.indexOf(entry)] = pkg;
        } catch (_) { /* The screen explains which wordbooks are unavailable offline. */ }
      }));
    }
  })().finally(() => {
    discoveryJob = null;
    discoveryFinished = true;
    if (location.hash === '#/search') updateSearchResults();
    if (location.hash === '#/stats') render();
  });
  return discoveryJob;
}

function discoveryNotice() {
  const missing = packages().filter(pkg => !packageReady(pkg)).length;
  return !discoveryFinished ? '단어장을 불러오고 있어요. 준비된 단어장부터 보여 드려요.'
    : !navigator.onLine ? `오프라인에서는 저장된 단어장만 이용할 수 있어요.${missing ? ` ${missing}개 단어장은 연결 후 이용할 수 있어요.` : ''}`
    : missing ? `${missing}개 단어장을 불러오지 못했어요. 연결을 확인하고 다시 시도해 주세요.` : '기본 단어장과 가져온 단어장 전체를 검색해요.';
}

function searchResultsHTML() {
  const results = Core.searchWords(packages(), searchQuery);
  const shown = results.slice(0, searchLimit);
  return `<p class="session-note">${escape(discoveryNotice())}</p>${discoveryFinished && packages().some(pkg => !packageReady(pkg)) ? '<button data-action="discover-retry">다시 불러오기</button>' : ''}
    <p class="search-count" role="status">${searchQuery.trim() ? `검색 결과 ${results.length}개${results.length > shown.length ? ` · ${shown.length}개 표시` : ''}` : '단어, 뜻 또는 예문을 입력해 주세요.'}</p>
    ${shown.length ? `<ul class="search-results">${shown.map(result => `<li><a class="search-result" href="${dayHash(result.pkgId, result.day)}"><strong lang="${escape(packageLang(result.pkgId))}">${escape(result.word[0])}</strong><span>${escape(result.word[1])}</span><small>${escape(result.pkgName)} · Day ${result.day + 1}</small></a></li>`).join('')}</ul>${shown.length < results.length ? '<button class="secondary full" data-action="search-more">검색 결과 더 보기</button>' : ''}` : searchQuery.trim() ? '<p class="session-note">일치하는 단어가 없어요. 다른 단어나 뜻으로 검색해 보세요.</p>' : ''}`;
}

function updateSearchResults() {
  const region = main.querySelector('#search-results');
  if (region) region.innerHTML = searchResultsHTML();
}

function renderSearch() {
  void discoverWordbooks();
  return `${back('#/home')}${intro('', '전체 단어 검색')}<label class="field" for="word-search">단어 · 뜻 · 예문<input id="word-search" type="search" value="${escape(searchQuery)}" placeholder="예: acquire, 계약, Haus" autocomplete="off" autocapitalize="off" spellcheck="false"></label><div id="search-results">${searchResultsHTML()}</div>`;
}

main.addEventListener('input', event => {
  if (event.target.id !== 'word-search') return;
  searchQuery = event.target.value;
  searchLimit = 100;
  updateSearchResults();
});
main.addEventListener('click', event => {
  if (event.target.closest('[data-action="search-more"]')) {
    const firstNew = searchLimit;
    searchLimit += 100;
    updateSearchResults();
    main.querySelectorAll('.search-result')[firstNew]?.focus();
  }
  if (event.target.closest('[data-action="discover-retry"]')) { void discoverWordbooks(true); render(); }
});
window.addEventListener('online', () => {
  if (['#/search', '#/stats'].includes(location.hash)) { void discoverWordbooks(true); render(); }
});

function featureLinks() { return '<nav class="feature-links" aria-label="학습 도구"><a href="#/search">전체 검색</a><a href="#/stats">학습 통계</a></nav>'; }
window.addEventListener('offline', () => { if (['#/search', '#/stats'].includes(location.hash)) render(); });
