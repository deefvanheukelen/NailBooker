self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetScreen = event.notification?.data?.screen || 'agendaScreen';

  event.waitUntil((async () => {
    const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clientList) {
      try {
        await client.focus();
        client.postMessage({ type: 'OPEN_SCREEN', screen: targetScreen, date: event.notification?.data?.date || null });
        return;
      } catch (error) {}
    }
    await self.clients.openWindow('./');
  })());
});
