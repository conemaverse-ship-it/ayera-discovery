# AYÉRA — Complete Dashboard Prototype

A new front-end concept for AYÉRA, with a cinematic first-visit introduction and a connected digital-world dashboard. This is an additive/replacement-ready prototype; review it before merging it into the existing live project.

## Files
- `index.html` — intro, dashboard, and page sections
- `styles.css` — responsive design
- `app.js` — navigation, search/filter, preview actions, intro state, and dialog

## Try it locally
1. Download and unzip this folder.
2. Open `index.html` in a modern browser. For the most consistent behavior, serve it using a local static server.
3. The cinematic intro appears on first visit in the current tab. Press **Enter your world** or **Skip introduction** to continue.
4. Use the left menu (desktop) or bottom navigation (mobile) to explore the sections.

## Important before publishing
This package is a front-end prototype. Discovery cards are sample concepts and are not verified live listings. Connect, Marketplace, Create, accounts, messaging, notifications, payments, and immersive 3D/VR are not implemented backend services. Do not advertise those as working features yet.

The project uses no external JavaScript libraries. It does not require API keys.

## Safe integration into the existing AYÉRA site
1. Keep a backup of the currently deployed files, especially any intro video, map, or interactive 3D assets.
2. Test this prototype in a separate branch or preview deployment.
3. If you decide to replace the existing homepage, merge the new `index.html`, `styles.css`, and `app.js` deliberately and preserve any existing assets/features that must remain.
4. Test desktop and mobile, navigation, browser console, load performance, and the Netlify deployment before making it the live homepage.

## Production roadmap
1. Authentication and user profiles.
2. Database-backed content and real search.
3. Moderation/reporting and creator publishing.
4. Verified business onboarding and secure payments.
5. Accessible, low-bandwidth design and performance.
6. Interactive 3D locations, then WebXR/VR support where compatible.
