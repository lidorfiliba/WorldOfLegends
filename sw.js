// World of Legends — service worker.
// PURPOSE: make the game INSTALLABLE as an app (PWA) only.
// IT INTENTIONALLY DOES NOT CACHE ANYTHING — there is NO offline mode.
// The game must always load fresh from the network and requires a live
// connection (and the multiplayer server) to run. Do not add a 'fetch'
// caching handler here.
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  // wipe any old caches a previous version may have created, then take control
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
// No fetch handler on purpose → every request goes straight to the network. No offline.
