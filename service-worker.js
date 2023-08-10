// service-worker.js

// Cache a list of files to be stored offline
const cacheName = "my-app-cache-v1";
const filesToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
    "/images/logo.png",
];

// Install the service worker and cache the files
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// Intercept network requests and serve cached files if available
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Return the cached file if found, otherwise fetch it from the network
            return response || fetch(event.request);
        })
    );
});
