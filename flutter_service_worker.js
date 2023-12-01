'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "f87089d67f7078772abddbf0df705823",
"index.html": "a8af9df6317de98edfe95aa77c758940",
"/": "a8af9df6317de98edfe95aa77c758940",
"main.dart.js": "6d754d77c72268d7ba34c04517aca213",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/site-icon-whitbg.png": "2d3995bafe91d22d6dedc4b295911d46",
"manifest.json": "e2ba88286761521db103c63760a1f60a",
"assets/AssetManifest.json": "6a1970b818c6ed0bb4d8c5bb6004a6da",
"assets/NOTICES": "e2cdb4a3ae0f0ca075c6764b8782cfc6",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "ac104906dd999b0d8118fe3ff4d30187",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/me.png": "85220de5a98f3d2a8b2f29040cb5b2f0",
"assets/assets/images/medway.jpg": "c1e8b4fd3db80203aa0d99e552a58713",
"assets/assets/images/medway-banner.jpg": "3b1a73fe1c43f83b9adf4b0adcd9f1ca",
"assets/assets/images/sharetrip.jpg": "973ac1d44b377cc4cae6782c32587d9d",
"assets/assets/images/hasib.png": "a5625aea089f57b3984b4fbf6d278be5",
"assets/assets/images/jexmovers.jpg": "1b8451209ac27ab64215c7e7dc9a9991",
"assets/assets/images/medway-banner-2.jpg": "2eed07a46fc0f5ecce4824acea98e3df",
"assets/assets/icons/uikit-icon.png": "299577d5ca414f9953e8f2ece9db92e7",
"assets/assets/icons/mail-icon.png": "b0f40178aba845076cca5f9b0b25fd9b",
"assets/assets/icons/flutter-icon.png": "fd7b43ddbaee8d75c91bd1b0c952652d",
"assets/assets/icons/testlab-icon.png": "6e39897be36ad4e09c4e801791f05fa3",
"assets/assets/icons/nest-icon.png": "b017d9eeceebafa3538bde9dda6b8bff",
"assets/assets/icons/menu-line-icon.png": "19795ba248b502357df490d65a9d707c",
"assets/assets/icons/insta-icon.png": "2fcf7ed2e5a929290f04f60a2b55f791",
"assets/assets/icons/phone-icon.png": "cab3baed6c1fa096939de42e8926b56f",
"assets/assets/icons/mongo-icon.png": "3ceb64ec5ff293f5cba2990d6728850f",
"assets/assets/icons/swift-icon.png": "1b042ddf863a779a36b68670f606996f",
"assets/assets/icons/IMG_0702.jpg": "9de479a8e17ab5b4220e66c5fd15a960",
"assets/assets/icons/xcode-icon.png": "6328880f1da32cafe41d002174c162f4",
"assets/assets/icons/dart-icon.png": "78f193d641de2fe3f1085660392cca97",
"assets/assets/icons/menu.png": "d6176026f19443dedc06fabebbbba177",
"assets/assets/icons/flask-icon.png": "3c1e58dfad03141693f6e961dcec62a5",
"assets/assets/icons/upwork-icon.png": "919f976928025b904da570d7205b2d94",
"assets/assets/icons/firebase-icon.png": "b801194ea17068fc02feab947ec86d57",
"assets/assets/icons/map-icon.png": "3dab88f9c2de137a906e57a04dab6a21",
"assets/assets/icons/typescript-icon.png": "234ec87c6028fdb6790067cd0e2d5275",
"assets/assets/icons/nodejs-icon.png": "654d3464ef27281151065dd4776cf943",
"assets/assets/icons/python-icon.png": "82ed1182e86ef1c3705d974f77b16762",
"assets/assets/icons/stack-icon.png": "a049b00e97f5ab5241753d5f1a51e90e",
"assets/assets/icons/selenium-icon.png": "1a01a66d6405b2e74521c19acfac21e5",
"assets/assets/icons/git-icon.png": "6c4b215071b858ba367c9d296b37a74c",
"assets/assets/icons/linkedin-icon.png": "1c96eba13fb3b62a57d726e8bace117b",
"assets/assets/lottiefiles/me.lottie": "13508dbed3a19c7c385dff757f788543",
"assets/assets/lottiefiles/me.json": "846d40a7b5a98c6a189f16240291627e",
"assets/assets/lottiefiles/code-flow.json": "e9b454b512c67bc1a0a11d9090e96268",
"site-icon-whitbg.png": "2d3995bafe91d22d6dedc4b295911d46",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
