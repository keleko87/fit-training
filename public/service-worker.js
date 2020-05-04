importScripts("/precache-manifest.7140b8fc606a76084b89a5b82c2be115.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

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
          maxAgeSeconds: 24 * 60 * 60 // 1 Day
        })
      ]
    })
  );

  // AUDIOS
  workbox.routing.registerRoute(
    /\.(?:mp3)$/,
    workbox.strategies.cacheFirst({
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
    new RegExp('/api/exercise/all'),
    workbox.strategies.networkFirst({
      cacheName: 'api-exercise',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 24 * 60 * 60 // 1 Days
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/api/workout/all'),
    workbox.strategies.networkFirst({
      cacheName: 'api-workout',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 24 * 60 * 60 // 1 Day
        })
      ]
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

