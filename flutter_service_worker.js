'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "f87089d67f7078772abddbf0df705823",
"index.html": "aee63a6b5dc47d3e29552912a92b4e0b",
"/": "aee63a6b5dc47d3e29552912a92b4e0b",
"styles.css": "8d0875209bb31dfecf0cf2edbc3486a9",
"main.dart.js": "96a45be761baead6c0cb5de770f0bdc1",
"hasib-splash.png": "519a9444c4667e0ba3c8da75039777a2",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/site-icon-whitbg.png": "2d3995bafe91d22d6dedc4b295911d46",
"manifest.json": "e2ba88286761521db103c63760a1f60a",
"assets/AssetManifest.json": "0be56baeb623f21d7a0c1b9cc5c2dd25",
"assets/NOTICES": "0d1c76ca5c4b933473cd36cd9d9a4033",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "ac104906dd999b0d8118fe3ff4d30187",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/me.png": "e3b7f5a885bf6127576aa2ed0684df23",
"assets/assets/images/bKash.jpg": "74c19d58d69895cb2520ed6598c6d5c3",
"assets/assets/images/medway.jpg": "a9f75ba87bd6552ae6809bc6261d70a2",
"assets/assets/images/sharetrip.jpg": "69ce41d6130db677c7b92a36ccb49d39",
"assets/assets/images/about-me.jpg": "a4876ea6258cfd796cebb7eb2fee0908",
"assets/assets/images/jexmovers.jpg": "50904d548875184842dd88320ddd7821",
"assets/assets/icons/paperfly-icon.png": "18cb4ce7d9687f7e0f30fb60525772bc",
"assets/assets/icons/uikit-icon.png": "738ae8e1a4b340a38cfa3b99717a8224",
"assets/assets/icons/mail-icon.png": "d216acce6ea13d6e1e866ef26f3e40ba",
"assets/assets/icons/flutter-icon.png": "d588117b920365645cb1b2bdedb0a7d2",
"assets/assets/icons/testlab-icon.png": "83759ae6eef084e6dbacb7bdabf4c317",
"assets/assets/icons/nest-icon.png": "eb913a297ebd3effc82ef7cdc3ab5df2",
"assets/assets/icons/menu-line-icon.png": "f0eb1452952c307be91089f18c133477",
"assets/assets/icons/insta-icon.png": "c38d160e8abad37c65b20878f39fc0f1",
"assets/assets/icons/phone-icon.png": "5d5f979da96bb56a368a1dcc21d8d284",
"assets/assets/icons/mongo-icon.png": "f8148a092482162704af42e8cafcbbe0",
"assets/assets/icons/swift-icon.png": "df21130bfead38f93f446b385283fb44",
"assets/assets/icons/xcode-icon.png": "4a55fd5536214ba119320aaeda68c2d9",
"assets/assets/icons/dart-icon.png": "56bdb50721b9a9f6984efeb1d0682786",
"assets/assets/icons/menu.png": "c503bcfef0d152456dddab98730ed06c",
"assets/assets/icons/download-icon.png": "445c7676dbaeef7bd4e062546b87d7ad",
"assets/assets/icons/flask-icon.png": "7e0c9ea30fa677cb214c90d56d721bca",
"assets/assets/icons/upwork-icon.png": "41a8830176882c4e7da3f5c3ba78ab1e",
"assets/assets/icons/firebase-icon.png": "a81156121da605600906e688d136b00d",
"assets/assets/icons/map-icon.png": "c55392530a929fbfecf98a9c12947161",
"assets/assets/icons/typescript-icon.png": "e98f1545b3dec02072b357f037d401af",
"assets/assets/icons/nodejs-icon.png": "d68979a6c0e4c51df5e5b76daeccf6fa",
"assets/assets/icons/python-icon.png": "4f305481d8b260d23e06418a2263b48e",
"assets/assets/icons/stack-icon.png": "56b8fe9ce2fcd25b1a27710d986dce83",
"assets/assets/icons/selenium-icon.png": "6936e1bccb22b1683902775431d418d9",
"assets/assets/icons/git-icon.png": "f1aca0dfdf3d7907b4468cc99aa0a0c1",
"assets/assets/icons/linkedin-icon.png": "0e13c0849dcb22b5269d22e7ae156136",
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
