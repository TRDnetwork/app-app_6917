const CACHE_NAME = 'portfolio-pro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;700&family=Fraunces:wght@700;900&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event