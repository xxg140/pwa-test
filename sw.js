// 模拟 FRV 项目的 Workbox 缓存策略
const CACHE_NAME = 'pwa-test-v2';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './chart.min.js',
  './manifest.json'
];

// 安装时缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// 拦截请求，优先使用缓存
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果缓存中有，直接返回
        if (response) {
          return response;
        }
        // 否则从网络获取
        return fetch(event.request);
      })
  );
});
