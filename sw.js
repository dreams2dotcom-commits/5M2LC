// 5M2LC Kvitfjell 27 – offline support. Version 61d7315f24
const CACHE='kvit27-61d7315f24';
const CORE=["./", "index.html", "manifest.webmanifest", "data.json", "pistmap.jpg", "winter.jpg", "icons/icon-192.png", "icons/apple-touch-icon.png", "house/t_h01.jpg", "house/t_h02.jpg", "house/t_h03.jpg", "house/t_h04.jpg", "house/t_h05.jpg", "house/t_h06.jpg", "house/t_h07.jpg", "house/t_h08.jpg", "house/t_h09.jpg", "house/t_h10.jpg", "house/t_h11.jpg", "house/t_h12.jpg", "house/t_h13.jpg", "house/t_h14.jpg", "house/t_h15.jpg", "house/t_h16.jpg", "house/t_h17.jpg", "house/t_h18.jpg", "house/t_h19.jpg", "house/t_h20.jpg", "house/t_h21.jpg", "house/t_h22.jpg", "house/h11.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(/^\/api\/photos\/(img|th)\//.test(url.pathname)){ // albumbilder ändras aldrig: spara för offline
    e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c));}return r;})));
    return;
  }
  if(url.pathname.startsWith('/api/'))return; // listor och album: alltid direkt mot servern
  const isPage=req.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/data.json')||url.hostname==='api.open-meteo.com';
  if(isPage){ // network first, fall back to cache when offline
    e.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c));return r;}).catch(()=>caches.match(req).then(r=>r||caches.match('index.html'))));
    return;
  }
  // everything else (images, fonts, three.js): cache first, then network, and keep a copy
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque')){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c));}return r;})));
});
