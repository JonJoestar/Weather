var cacheName = 'weatherPWA-v1';
var filesToCache = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/scripts/localforage-1.4.0.js',
    '/styles/ud811.css',
    '/images/clear.png',
    '/images/cloudy-scattered-showers.png',
    '/images/cloudy.png',
    '/images/fog.png',
    '/images/ic_add_white_24px.svg',
    '/images/ic_refresh_white_24px.svg',
    '/images/partly-cloudy.png',
    '/images/rain.png',
    '/images/scattered-showers.png',
    '/images/sleet.png',
    '/images/snow.png',
    '/images/thunderstorm.png',
    '/images/wind.png'
  ];

  //en esta parte del codigo se puede apreciar lo que hace esta seccion
  //la primer seccion instala los caches necesarios.
  //el segundo elimina los caches.
  //y el tercero procesa la peticion.
  self.addEventListener('install', function(e) {
      console.log('[ServiceWorker] Install');
      e.waitUntil(
          caches.open(cancheName).then(function(cache){
              console.log('[ServiceWorker] Caching app shell');
              return cache.addAll(filesToCache);
          })
      );
  });


  self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.keys().then(function(keyList){
            return Promise.all(keyList.map(function(key) {
            if (key !== cacheName) {
              console.log('[ServiceWorker] Removing old cache');
              return caches.delete(key);
            }
          }));
})
    );
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});

