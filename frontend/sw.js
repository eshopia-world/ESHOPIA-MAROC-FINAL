/* ============================================================
   E-SHOPIA MAROC — Service Worker v3
   Dynamic cache versioning — injected by build or fallback to timestamp
   ============================================================ */

// BUILD_HASH is injected by Netlify build (via netlify.toml env)
// Falls back to timestamp so cache ALWAYS busts on fresh SW install
const BUILD_HASH = self.__BUILD_HASH || '__BUILD_HASH_PLACEHOLDER__';
const CACHE      = `eshopia-${BUILD_HASH}`;

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/megamenu.css',
  '/js/script.js',
  '/js/megamenu.js',
  '/js/api.js',
  '/js/i18n.js',
  '/js/features.js',
  '/js/pwa.js',
  '/images/logo.png',
];

// Pages cached on first visit (not precached — too many)
const RUNTIME_CACHE_PAGES = [
  '/pages/category.html',
  '/pages/product.html',
  '/pages/cart.html',
  '/pages/checkout.html',
  '/pages/tracking.html',
  '/pages/compte.html',
];

/* ── Install: precache critical assets ───────────────────── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Precache failed:', err))
  );
});

/* ── Activate: delete ALL old caches ─────────────────────── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE)    // delete every cache that isn't current
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim()) // take control of open tabs immediately
  );
});

/* ── Fetch: network-first for HTML, cache-first for assets ── */
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Never cache: API calls, POST requests, chrome-extension
  if (request.method !== 'GET')        return;
  if (url.pathname.startsWith('/api/')) return;
  if (url.protocol === 'chrome-extension:') return;

  // External resources (Unsplash images, Google Fonts): network only
  if (url.hostname !== self.location.hostname) {
    e.respondWith(
      fetch(request).catch(() => new Response('', { status: 503 }))
    );
    return;
  }

  // HTML pages: network-first (always fresh), fallback to cache
  if (request.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // JS/CSS/Images: cache-first (they have versioned filenames or change rarely)
  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
        }
        return res;
      }).catch(() => new Response('', { status: 503 }));
    })
  );
});

/* ── Message: force update from client ───────────────────── */
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING' || e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
