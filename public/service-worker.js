const CACHE_VERSION = 'v3.1';
const CACHE_NAME = `sravni-static-${CACHE_VERSION}`;
const CACHE_URLS = [
  '/favicon.ico',
  '/manifest.json',
  'https://fonts.googleapis.com/css?family=Open+Sans:300,400|Ubuntu:700&display=swap&subset=cyrillic-ext',
];
const OFFLINE_URL = '/resources/offline.html';
const CACHE_PATH_PATTERN = /^\/(?:(20[0-9]{2}|resources|dist|images|logotypes|f|s|img|cms)\/(.+)?)?$/;
// const TRUSTED_PATHS = [
//   'resources',
//   'dist',
//   'images',
//   'logotypes',
//   'f',
//   's',
//   'img',
//   'cms',
// ];
const TRUSTED_HOSTS = [
  'fonts.googleapis.com',
  's91588.cdn.ngenix.net',
  'f.sravni.ru',
];

function prepareAssets() {
  return CACHE_URLS.length ? CACHE_URLS.concat(OFFLINE_URL) : [OFFLINE_URL];
}

function openCache() {
  return caches.open(CACHE_NAME);
}

// function addToCache(request, response) {
//   return openCache().then(cache => cache.put(request, response.clone()));
// }

function pathComparer(requestUrl, pathRegEx) {
  const url = new URL(requestUrl);

  return TRUSTED_HOSTS.includes(url.hostname) && pathRegEx.exec(url.pathname);
}

function comparePath(requestUrl) {
  if (requestUrl) {
    if (pathComparer(requestUrl, CACHE_PATH_PATTERN)) {
      return true;
    }
  }

  return false;
}

function precache() {
  return openCache().then(cache => cache.addAll(prepareAssets()));
}

function updateCache(request, response) {
  if (comparePath(request.url)) {
    return openCache().then(function (cache) {
      return cache.put(request, response.clone());
    });
  }

  return Promise.resolve();
}

// function fromInternet(request) {
//   return fetch(request).then(response => {
//     if (response.ok) {
//       return addToCache(request, response).then(() => response);
//     }
//
//     return response;
//   });
// }

function fromCache(request) {
  return openCache().then(cache => cache.match(request).then(matching => {
    if (!matching || matching.status === 404) {
      return Promise.reject("no-match");
    }

    return matching;
  }));
}

function cacheFirstFetch(event) {
  event.respondWith(
    fromCache(event.request).then(
      function (response) {
        // The response was found in the cache so we responde with it and update the entry

        // This is where we call the server to get the newest version of the
        // file to use the next time we show view
        event.waitUntil(
          fetch(event.request).then(function (response) {
            return updateCache(event.request, response);
          })
        );

        return response;
      },
      function () {
        // The response was not found in the cache so we look for it on the server
        return fetch(event.request)
          .then(function (response) {
            // If request was success, add or update it in the cache
            event.waitUntil(updateCache(event.request, response.clone()));

            return response;
          })
          .catch(function (error) {
            // The following validates that the request was for a navigation to a new document
            // if (event.request.destination !== 'document' || event.request.mode !== 'navigate') {
            //   return;
            // }

            console.log(`Network request failed and no cache. ${ error }`);

            // Use the precached offline page as fallback
            return openCache().then(function (cache) {
              return cache.match(OFFLINE_URL);
            });
          });
      }
    )
  );
}

// function networkFirstFetch(event) {
//   event.respondWith(
//     fetch(event.request)
//       .then(function (response) {
//         // If request was success, add or update it in the cache
//         event.waitUntil(updateCache(event.request, response.clone()));
//         return response;
//       })
//       .catch(function (error) {
//         console.log(`Network request Failed. Serving content from cache: ${ error }`);
//
//         return fromCache(event.request);
//       })
//   );
// }

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(precache());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheKeys => {
        const deletePromises = cacheKeys
          .filter(key => key.indexOf(CACHE_NAME) !== 0)
          .map(oldKey => caches.delete(oldKey));

        return Promise.all(deletePromises);
      })
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== "GET" || !comparePath(request.url)) return;

  cacheFirstFetch(event);
});
