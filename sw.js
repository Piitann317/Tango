/* Tango 単語帳 Service Worker
   ネットワーク優先・キャッシュフォールバック方式:
   オンライン時は常に最新版を取得し、オフライン時はキャッシュから配信する */
const CACHE_NAME = "tango-v1";
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-512-maskable.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  /* 辞書APIなど外部リクエストには介入しない */
  if (url.origin !== self.location.origin || event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return res;
      })
      .catch(() =>
        caches.match(event.request).then(cached => cached || caches.match("index.html"))
      )
  );
});
