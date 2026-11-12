/* Install prompt: Android/Chromium uses beforeinstallprompt; iOS Safari has no prompt API, so it gets a how-to note. */
'use strict';
(() => {
  const KEY = 'vm-install-dismissed';
  const QUIET_DAYS = 14;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const dismissedRecently = () => {
    try { return Date.now() - Number(localStorage.getItem(KEY) || 0) < QUIET_DAYS * 864e5; } catch (_) { return false; }
  };
  const remember = () => { try { localStorage.setItem(KEY, String(Date.now())); } catch (_) {} };
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  let deferred = null;
  let banner = null;

  function hide() { if (banner) { banner.remove(); banner = null; } }

  function show(text, withInstall) {
    if (banner || standalone() || dismissedRecently()) return;
    banner = document.createElement('div');
    banner.className = 'install-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', '앱 설치');
    banner.innerHTML = `<p>${text}</p><div class="install-actions">${withInstall ? '<button type="button" class="primary" data-install="yes">설치</button>' : ''}<button type="button" data-install="later">${withInstall ? '나중에' : '닫기'}</button></div>`;
    banner.addEventListener('click', async event => {
      const choice = event.target.closest('[data-install]')?.dataset.install;
      if (choice === 'later') { remember(); hide(); }
      if (choice === 'yes' && deferred) {
        hide();
        deferred.prompt();
        const {outcome} = await deferred.userChoice.catch(() => ({outcome:'dismissed'}));
        if (outcome !== 'accepted') remember();
        deferred = null;
      }
    });
    document.body.appendChild(banner);
  }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferred = event;
    // Wait a moment so the banner does not cover the first screen while it loads.
    setTimeout(() => show('홈 화면에 앱으로 설치하면 전체 화면으로 열리고 오프라인에서도 공부할 수 있어요.', true), 4000);
  });
  window.addEventListener('appinstalled', () => { deferred = null; hide(); remember(); });

  if (isIOS && !standalone()) {
    setTimeout(() => show('홈 화면에 추가하려면 Safari 아래쪽의 공유 버튼을 누른 뒤 "홈 화면에 추가"를 고르세요.', false), 4000);
  }
})();
