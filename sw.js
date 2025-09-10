const CACHE_NAME = 'Edu.SmartSpark-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo1.png',
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
