// Nome do cache de imagens
const IMAGE_CACHE_NAME = 'image-cache-v1';

// Função para limpar o cache
async function clearCache() {
	const cacheNames = await caches.keys();
	return Promise.all(
		cacheNames.map((cacheName) => {
			if (cacheName === IMAGE_CACHE_NAME) {
				return caches.delete(cacheName);
			}
		}),
	);
}

// Instalação do Service Worker: Criar o cache de imagens
self.addEventListener('install', (event) => {
	event.waitUntil(self.skipWaiting());
});

// Ativação do Service Worker: Limpar caches antigos se necessário
self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

// Interceptar requisições de rede
self.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url);

	// Verifica se a URL contém a variável `clearcache=true`
	if (url.searchParams.has('clearcache')) {
		if (url.searchParams.get('clearcache') === 'true') {
			event.respondWith(
				clearCache().then(() => {
					// Remove a variável clearcache da URL e recarrega a página
					url.searchParams.delete('clearcache');
					return self.clients.matchAll().then((clients) => {
						clients.forEach((client) => {
							client.navigate(url.toString());
						});
					});
				}),
			);
			return;
		}
	}

	// Se a requisição for para uma imagem, cacheie
	if (event.request.destination === 'image') {
		event.respondWith(
			caches.match(event.request).then((cachedResponse) => {
				if (cachedResponse) {
					return cachedResponse; // Retorna a imagem do cache
				}

				// Busca a imagem da rede e cacheia
				return fetch(event.request).then((networkResponse) => {
					return caches.open(IMAGE_CACHE_NAME).then((cache) => {
						cache.put(event.request, networkResponse.clone());
						return networkResponse;
					});
				});
			}),
		);
	}
});
