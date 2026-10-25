# Security

## Current status
This site is a static front-end with no accounts, no server-side code, and no stored user data beyond browser local storage. Visitors’ saved entries are stored locally in the browser under the keys used by the app.

## Controls in place
- User-facing text is escaped or written via DOM APIs and `textContent`; no user input is inserted using `innerHTML`.
- Security headers are configured in `netlify.toml`:
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Frame-Options: SAMEORIGIN`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- Content-Security-Policy is enforced in production.
- Leaflet is loaded with Subresource Integrity.
- Three.js is loaded with SRI and must remain pinned to an approved hash.
- No secrets or credentials are committed to the repository.

## Third-party services
| Service | Used for | Status |
|---|---|---|
| unpkg.com | Leaflet | Reviewed |
| cdnjs.cloudflare.com | Three.js | SRI enforced |
| CARTO basemap tiles | Map imagery | Must use an approved API key or alternate compliant provider |

## Known limitations
- The site is static and does not provide real accounts, moderation, or backend data storage.
- Content is curated starter content and is not independently verified.
- Creator, story, and place entries are clearly demo/editorial content.

## Reporting a vulnerability
Please report vulnerabilities privately to:
- security@ayera.example
- or use the GitHub private security advisory flow for this repository.

## Production note
This project is a static front-end only. It does not yet have backend authentication, database access, moderation controls, or live user-generated content.
