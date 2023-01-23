/**
 * PWA Service-worker
 * credits to kosamari
 * https://gist.github.com/kosamari/7c5d1e8449b2fbc97d372675f16b566e
 */

const APP_PREFIX = 'kitich_blackout_'     // Identifier for this app (this needs to be consistent across every cache update)
const VERSION = 'v0.2'              // Version of the off-line cache (change this value everytime you want to update cache)
const CACHE_NAME = APP_PREFIX + VERSION
const URLS = [ // list of urls to cache
  // '/blackout/',
  // '/blackout/index.html',
  // '/blackout/script.js',
  // '/blackout/style.css',
  // '/blackout/icons/',
  // '/blackout/icons/favicon.svg',
  // '/blackout/icons/favicon-64.png',
  // '/blackout/icons/favicon-192.png',
  // '/blackout/icons/favicon-512.png',
  'index.html',
  'script.js',
  'style.css',
  'icons/favicon.svg',
  'icons/favicon-64.png',
  'icons/favicon-192.png',
  'icons/favicon-512.png',
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})