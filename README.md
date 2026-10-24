# AYÉRA World — Africa-first exploration project

AYÉRA opens with its cinematic intro and then presents an interactive map of Africa as the main home experience. The original 3D world remains available from the top navigation.

## Files
- `index.html` — app structure, intro, map shell and accessible controls.
- `styles.css` — visual styling, responsive layouts, and location-detail drawer.
- `app.js` — existing 3D world, intro, navigation, interactions and local persistence.
- `map.js` — map setup, 54-country search index, featured cities/places, zoom, search, popups, and progressive location details.
- `assets/intro.mp4` — intro video.
- `assets/intro-slide-*.jpg` — fallback intro frames.
- `assets/art-*.jpg` — artwork used in the 3D world.

## Run locally
Use a local server from this folder, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. The app requires an internet connection for the Leaflet and Three.js libraries and for map tiles.

## Current exploration features
- The cinematic intro remains the opening experience.
- Africa is the default home screen after the intro.
- Drag to pan; use the +/−/reset controls or mouse wheel to zoom.
- Search all 54 countries in the current country index and curated featured cities/places.
- Selecting a country opens its overview, region, capital label, and featured city links where available.
- Selecting a featured city/place opens its location details and curated neighborhood/area suggestions where supplied.
- Use **3D world** to switch to the original 3D environment, and **Africa map** to return.

## Important limitations
- The country index covers 54 African countries, but the map currently uses a basemap rather than a bespoke set of country-boundary polygons.
- Country coordinates are approximate map focus points, not exact borders or geocoded capital positions.
- City and neighborhood content is curated starter content, not a complete or independently verified local directory. Some countries do not yet have featured city guides.
- Searching is limited to the built-in index; it does not geocode arbitrary addresses or dynamically load every settlement.
- Creator/story entries remain demonstration content; saved items and follows are stored in local browser storage. Production authentication, database, moderation, and live content services are not configured.
- For production, add tests, real location datasets and licensing review, a resilient data/API layer, error reporting, security review, and tile-provider usage/privacy review.
