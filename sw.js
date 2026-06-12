// World of Legends — service worker v35
// PURPOSE: exists ONLY so the game can be installed as an app (PWA).
// It caches NOTHING and actively DELETES any cache an older worker created,
// so a new index.html upload is always picked up immediately.
self.addEventListener('install', (e) => {
  self.skipWaiting(); // replace any old worker right away
});
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    // nuke every cache an old version may have left behind
    try { const keys = await caches.keys(); await Promise.all(keys.map(k => caches.delete(k))); } catch (err) {}
    await self.clients.claim();
  })());
});
// NO fetch handler on purpose — every request goes straight to the network.
