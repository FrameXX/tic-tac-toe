const gameCache = 'cache-v1';
const precacheResources = ['/tic-tac-toe/', '/tic-tac-toe/index.html', '/tic-tac-toe/script.js', '/tic-tac-toe/style.css', '/tic-tac-toe/favicon.png', '/tic-tac-toe/favicon.svg', '/tic-tac-toe/img/circle.svg', '/tic-tac-toe/img/cross.svg', '/tic-tac-toe/img/snowcon.svg', '/tic-tac-toe/audio/place-symbol.ogg', '/tic-tac-toe/audio/remove-symbol.ogg'];

self.addEventListener('install', (event) => {
  console.log('service worker install event!');
  event.waitUntil(caches.open(gameCache).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
  console.log('service worker activate event!');
});

self.addEventListener('fetch', (event) => {
  console.log('fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});