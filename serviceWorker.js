const CACHE_NAME = "absensi-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/icon-192.png",
  "/icon-512.png",
  "/manifest.json",
  "/style.css", // tambahkan file CSS kamu di sini
  "/script.js", // tambahkan JS utama kamu di sini
  // tambahkan file lain jika perlu
];

// Install service worker dan cache file
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktifasi dan hapus cache lama jika ada
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch data dari cache jika offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
