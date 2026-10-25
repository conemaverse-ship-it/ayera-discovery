# AYÉRA — Discovery Prototype

A front-end concept for AYÉRA, designed as a cinematic introduction and a connected digital-world dashboard. This is an additive or replacement-ready prototype for review before merge, with the clear intention that it remains a concept layer rather than a live product.

## Files
- `index.html` — intro, dashboard and page sections
- `styles.css` — responsive visual system and layout
- `app.js` — navigation, discovery cards, intro state and interaction flow
- `discover.js` — standalone discovery hub logic for curated content and result filtering
- `ayéra-hub.html` / `ayéra-hub.css` / `ayéra-hub.js` — alternate discovery experience for a lighter, more content-focused concept
- `map.js` — geographic exploration and map-based prototype logic

## Try it locally
1. Download or clone this folder.
2. Open `index.html` in a modern browser, or better, serve it with a local static server for the most consistent behavior.
3. The cinematic intro appears on first visit in the current tab. Press Enter your world or Skip introduction to continue.
4. Use the left menu on desktop or the bottom navigation on mobile to explore the sections.

## Important before publishing
This package is a front-end prototype. Discovery cards, places and opportunities are sample concepts and not verified live listings. Connect, Marketplace, Create, messaging, notifications, accounts, payments and immersive 3D experiences are planned features, not working production systems.

The project uses no external JavaScript libraries and does not require API keys.

## Safe integration into an existing AYÉRA site
1. Keep a backup of the currently deployed files, especially any intro video, map or interactive 3D assets.
2. Test this prototype in a separate branch or preview deployment.
3. If you replace the existing homepage, merge the new `index.html`, `styles.css` and `app.js` deliberately and preserve any existing assets or features that must remain.
4. Test desktop and mobile layouts, navigation, browser console output, load performance and deployment behavior before shipping.

## Production roadmap
1. Authentication and user profiles.
2. Database-backed content and real search.
3. Moderation and reporting.
4. Verified business onboarding and secure payments.
5. Accessible, low-bandwidth design and performance work.
6. Interactive 3D locations, then WebXR/VR support where compatible.
