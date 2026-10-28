// Service Worker for Dvh Grocery PWA
const CACHE_NAME = 'dvh-grocery-v4-clear-all';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Pass-through with network-first
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
