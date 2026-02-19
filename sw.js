self.addEventListener('install', (e) => {
  console.log('[Service Worker] Instalado');
});
self.addEventListener('fetch', (e) => {
  // Motor pasivo para permitir instalación
});
