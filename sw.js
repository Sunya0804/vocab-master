'use strict';
const CACHE_VERSION = 'vocab-master-shell-v42-guide';
const PACKAGE_CACHE = 'vocab-master-packages';
const QUESTION_CACHE = 'vocab-master-questions';
const QUESTION_FILES = [1, 2, 3, 4, 5, 6, 7].map(part => `questions/toeic-part${part}.json`);
const SCOPE = self.registration.scope;
const APP_SHELL = ['./', './index.html', './style.css', './app.js', './js/shared.js', './js/study.js', './js/listen.js', './js/exam.js', './js/mock.js', './js/install.js', './js/settings.js', './core.js', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

const reloadRequest = url => new Request(new URL(url, SCOPE).href, {cache:'reload'});

async function precachePackages() {
  // Packages are optional at installation. One unavailable file must not reject
  // the new app shell or prevent the next package from being cached.
  try {
    const cache = await caches.open(PACKAGE_CACHE);
    const indexRequest = reloadRequest('./packages/index.json');
    const response = await fetch(indexRequest);
    if (!response.ok) return;
    await cache.put(indexRequest, response.clone()).catch(() => {});
    const entries = await response.json();
    if (!Array.isArray(entries)) return;
    const files = entries.map(entry => entry && entry.file);
    await Promise.allSettled(files.filter(file => typeof file === 'string' && /^[\w.-]+\.json$/.test(file)).map(async file => {
      const request = reloadRequest(`./packages/${file}`);
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response);
    }));
  } catch (_) { /* Online requests can fill the package cache after installation. */ }
}

async function precacheQuestions() {
  try {
    const cache = await caches.open(QUESTION_CACHE);
    await Promise.allSettled(QUESTION_FILES.map(async file => {
      const request = reloadRequest(`./${file}`);
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response);
    }));
  } catch (_) { /* Online requests can fill the question cache later. */ }
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(APP_SHELL.map(reloadRequest));
    await Promise.all([precachePackages(), precacheQuestions()]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('vocab-master-') && ![CACHE_VERSION, PACKAGE_CACHE, QUESTION_CACHE].includes(name)).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || !request.url.startsWith(SCOPE)) return;
  const url = new URL(request.url);
  const relative = url.pathname.slice(new URL(SCOPE).pathname.length);
  const isPackage = relative.startsWith('packages/');
  // Part 1 photos, mock tests and their photos are cached once opened, like question files, so they open offline.
  const isQuestion = QUESTION_FILES.includes(relative) || /^images\/(?:part1|mock)\/[\w.-]+\.webp$/.test(relative) || /^questions\/mock\/mock-(?:[1-9]|1[0-9]|20)\.json$/.test(relative);
  const isShell = APP_SHELL.some(asset => asset.slice(2) === relative);
  if (!isPackage && !isQuestion && !isShell && request.mode !== 'navigate') return;
  event.respondWith((async () => {
    if (isPackage || isQuestion) {
      const cache = await caches.open(isQuestion ? QUESTION_CACHE : PACKAGE_CACHE);
      const key = new Request(url.origin + url.pathname);
      const network = (async () => {
        const response = await fetch(new Request(request, {cache:'no-cache'}));
        if (response.ok) await cache.put(key, response.clone()).catch(() => {});
        return response;
      })();
      // The package index decides which wordbooks exist and its format changed once, so prefer the network for it.
      if (relative === 'packages/index.json') {
        try { const response = await network; if (response.ok) return response; } catch (_) {}
        return await cache.match(key) || await network;
      }
      // Serve cached learning data immediately; refresh for next time.
      event.waitUntil(network.catch(() => {}));
      return await cache.match(key) || await network;
    }
    const cache = await caches.open(CACHE_VERSION);
    const cached = await cache.match(request, {ignoreSearch:true});
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && isShell) {
        const copy = response.clone();
        event.waitUntil(cache.put(request, copy).catch(() => {}));
      }
      return response;
    } catch (error) {
      if (request.mode === 'navigate') {
        const shell = await cache.match(new URL('./index.html', SCOPE).href);
        if (shell) return shell;
      }
      throw error;
    }
  })());
});
