importScripts("/precache-manifest.db2a6369049f79d7ecf863b17b2adb75.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* eslint-disable no-undef */
workbox.setConfig({
  debug: false
});

workbox.precaching.precacheAndRoute([]);

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
  workbox.strategies.staleWhileRevalidate({
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

