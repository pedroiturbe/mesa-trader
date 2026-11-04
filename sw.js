/* Mesa Trader v7 — network-first HTML/JSON; cache fallback offline */
const CACHE='mesa-trader-v7';
const SHELL=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png','./icons/favicon-32.png'];
self.addEventListener('install',function(ev){ev.waitUntil(caches.open(CACHE).then(function(x){return x.addAll(SHELL).catch(function(){})}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(ev){ev.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(ev){var req=ev.request;if(req.method!=='GET')return;var url=new URL(req.url);if(url.origin!==self.location.origin)return;ev.respondWith(fetch(req).then(function(res){if(res&&res.ok){var copy=res.clone();caches.open(CACHE).then(function(x){x.put(req,copy)}).catch(function(){})}return res;}).catch(function(){return caches.match(req).then(function(cached){return cached||caches.match('./index.html')})}))});
