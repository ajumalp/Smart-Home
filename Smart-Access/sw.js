/*
 * Developed by Ajmal Muhammad P
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 05-May-2020
 */

var cacheName = 'Smart Access';

var filesToCache = [
  'index.html',
  'style.css',
  'html/addDevice.html',
  'html/addSwitch.html',
  'html/devices.html',
  'html/menu.html',
  'html/settings.html',
  'login/index.html',
  'login/login.js',
  'login/register.html',
  'login/style.css',
  'js/devices/devicesController.js',
  'js/devices/devicesService.js',
  'js/gadgets/gadgetsController.js',
  'js/gadgets/gadgetsService.js',
  'js/app.js',
  'js/controllers.js',
  'js/jquery-mini.js',
  'js/main.js',
  'js/services.js',
  'images/user_login.png',
  'images/board/1001.png',
  'images/board/1002.png',
  'images/board/1003.png',
  'images/board/1004.png',
  'images/gadget/1.png',
  'images/gadget/2.png',
  'images/gadget/3.png',
  'images/gadget/4.png',
  'images/gadget/5.png',
  'images/gadget/6.png',
  'images/gadget/7.png',
  'lib/onsen/js/onsenui.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
