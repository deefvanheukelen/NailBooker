self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil((async () => {
    const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const existingClient = allClients[0];

    if (existingClient) {
      existingClient.focus();
      return;
    }

    if (self.clients.openWindow) {
      await self.clients.openWindow('./');
    }
  })());
});
