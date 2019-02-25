importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

console.log('Hello from sw.js');
// index.html and JavaScript files
workbox.routing.registerRoute(
  new RegExp('(index\.html|.*\.js)'),
  // Fetch from the network, but fall back to cache
  workbox.strategies.networkFirst()
);
 
// CSS, fonts, i18n
workbox.routing.registerRoute(
  /(.*\.css|.*\.properties|.*\.woff2)/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'asset-cache',
  })
  );
  
  
  workbox.routing.registerRoute(
	// Cache image files
	/.*\.(?:png|jpg|jpeg|svg|gif)/,
	// Use the cache if it's available
	workbox.strategies.cacheFirst({
		// Use a custom cache name
		cacheName: 'image-cache',
		plugins: [
			new workbox.expiration.Plugin({
				// Cache only 20 images
				maxEntries: 20,
				// Cache for a maximum of a week
				maxAgeSeconds: 7 * 24 * 60 * 60,
			})
		],
	})
);