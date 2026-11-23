/* Service worker : application utilisable hors connexion.
   Pour publier une nouvelle version : modifiez index.html, puis changez VERSION ci-dessous. */
const VERSION = 'fibre-v4';
const CORE = ['./', 'index.html', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png'];
// Bibliothèque PDF (import d'un fond de plan PDF), mise en cache pour l'usage hors ligne
const PDFJS = ['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(CORE);
    await Promise.all(PDFJS.map(u => c.add(u).catch(() => {})));   // facultatif
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Page : réseau d'abord (dernière version), cache si hors ligne
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        const c = await caches.open(VERSION); c.put('index.html', r.clone());
        return r;
      } catch (err) {
        return (await caches.match('index.html')) || (await caches.match('./'));
      }
    })());
    return;
  }
  // Fichiers de l'appli et pdf.js : cache d'abord, réseau sinon (et mise en cache)
  if (url.origin === location.origin || url.hostname === 'cdnjs.cloudflare.com') {
    e.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      const r = await fetch(req);
      if (r.ok) { const c = await caches.open(VERSION); c.put(req, r.clone()); }
      return r;
    })());
  }
});
