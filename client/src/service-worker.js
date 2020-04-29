/* eslint-disable no-undef */

if (workbox) {
  // adjust log level for displaying workbox logs
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

  // apply precaching. In the built version, the precacheManifest will
  // be imported using importScripts (as is workbox itself) and we can
  // precache this. This is all we need for precaching
  workbox.precaching.precacheAndRoute(self.__precacheManifest);

  // This line fixed, OFFLINE when you relaod any route
  workbox.routing.registerNavigationRoute('/index.html');

  // IMAGES
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );

  // AUDIOS
  workbox.routing.registerRoute(
    /\.(?:mp3)$/,
    workbox.strategies.networkFirst({
      cacheName: 'audios',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );

  // API
  workbox.routing.registerRoute(
    new RegExp('https://fit-training.herokuapp.com/api'),
    workbox.strategies.networkFirst({
      cacheName: 'api'
    })
  );

  // UPLOADS SERVER
  workbox.routing.registerRoute(
    new RegExp('https://fit-training.herokuapp.com/uploads/'),
    workbox.strategies.networkFirst({
      cacheName: 'uploads'
    })
  );

  // FONTS
  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'googleapis',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30
        })
      ]
    })
  );
}