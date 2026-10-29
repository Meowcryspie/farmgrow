// Minimal service worker for PWA installability
const CACHE_NAME = 'ec-link-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let the browser handle standard network requests
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
