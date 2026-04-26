// Zuma Inventory Hub — Service Worker (Stale-While-Revalidate API cache)
// Goal: instant repeat-visit page loads while still keeping data fresh.
//
// Strategy:
//   1. Intercept GET requests to the API host only.
//   2. If we have a cached response, return it instantly (0ms).
//   3. In parallel, fetch fresh data in the background and update the cache.
//   4. Notify open tabs when fresh data arrives so they can re-render.
//
// Safety:
//   - GET-only (mutations bypass cache).
//   - Network failures fall back to cache (so dashboard works offline-ish).
//   - Cache versioned via CACHE_VERSION — bump it to force a clean state on deploy.

const CACHE_VERSION = 'zuma-inv-v1';
const API_HOST = 'srv1346756.hstgr.cloud';

self.addEventListener('install', function (event) {
  // Activate immediately on install — don't wait for old SW to die
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  // Drop old cache versions
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.filter(function (n) { return n !== CACHE_VERSION; }).map(function (n) { return caches.delete(n); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return; // mutations bypass cache

  var url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.hostname !== API_HOST) return;
  if (!url.pathname.startsWith('/api/')) return;

  event.respondWith(
    caches.open(CACHE_VERSION).then(async function (cache) {
      var cached = await cache.match(req);

      // Always kick off a network fetch in parallel to refresh the cache.
      var networkFetch = fetch(req).then(async function (response) {
        if (response && response.ok) {
          try { await cache.put(req, response.clone()); } catch (e) { /* quota exceeded etc. */ }
          // Tell open clients fresh data is in cache so they can re-render if they care
          var clients = await self.clients.matchAll({ includeUncontrolled: true });
          clients.forEach(function (c) {
            c.postMessage({ type: 'sw-cache-updated', url: req.url, ts: Date.now() });
          });
        }
        return response;
      }).catch(function (err) {
        // Network failed — if we have cache, use that. Otherwise propagate the error.
        if (cached) return cached;
        throw err;
      });

      if (cached) {
        // Stale-While-Revalidate: instant cache + background refresh.
        event.waitUntil(networkFetch);
        return cached;
      }
      // No cache yet — wait for network.
      return networkFetch;
    })
  );
});
