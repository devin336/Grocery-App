// Service Worker for Dvh Grocery PWA
const CACHE_NAME = 'dvh-grocery-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through with network-first
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
