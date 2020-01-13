self.addEventListener('install', (event) => {
    console.log('inside the install handler', event);
    event.waitUntil(
      caches.open('index.html').then(function(cache) {
        return cache.addAll([
          '/index.html',
          '/offline.html',
        ]);
      })
    );
});

self.addEventListener('activate', (event) => {
    console.log('inside the activate handler', event);
});

self.addEventListener('fetch', (event) => {
    console.log('inside the fetch handler', event);
    event.respondWith(
      caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
      }).catch(function() {
          return caches.match('/offline.html');
      })
    )
});