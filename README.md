# 5M2LC Kvitfjell 27

Reseguide för Kvitfjell 3–10 januari 2027 (Varden Chalet 21): huset, pistkarta, 3D-karta, restauranger och events.

Statisk sajt utan byggsteg. Netlify publicerar roten av repot automatiskt vid varje push.

- `index.html` – hela appen
- `data.json` – terräng, liftar, pister och rutter för kartorna (OpenStreetMap, Mapzen Terrain)
- `netlify/functions/notes.mjs` – API för de gemensamma listorna (Netlify Blobs)
- `netlify/functions/photos.mjs` – API för det gemensamma bildalbumet (Netlify Blobs)
- `sw.js`, `manifest.webmanifest`, `icons/` – installerbar app och offline-stöd
- `house/` – bilder på huset (Alpinco / Varden Chalet)
