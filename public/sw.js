// Clean no-op service worker to resolve stale browser requests and unregister zombie service workers
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      console.log('Stale localhost service worker deregistered.');
    })
  );
});

