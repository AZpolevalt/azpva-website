# Arizona Pole Vault Academy Website

Marketing site for **Arizona Pole Vault Academy** (Queen Creek, AZ), built with [Astro](https://astro.build) + TypeScript for deployment on **Cloudflare Pages**.

## Stack

- Astro 7 (static output)
- TypeScript (strict)
- Content collections: `coaches`, `camps`, `events`
- Mobile-first athletic UI (no UI framework dependency)
- Pagefind static site search (build-time index)

## Local development

Requires **Node.js 22.12+**.

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
```

`npm run build` runs `astro build` then **Pagefind** (`pagefind --site dist`) so static search indexes land in `dist/pagefind/`.

Output directory: **`dist/`** (includes `pagefind/` for site search)

Preview locally:

```bash
npm run preview
```

### Site search (Pagefind)

- Build-time index: generated into `dist/pagefind/` after every production build.
- UI: header search (desktop + mobile) via Pagefind’s default UI (`/pagefind/pagefind-ui.js`).
- Cloudflare Pages: keep **Build command** as `npm run build` (no extra dashboard step). The Pagefind step is already in `package.json`.
- Local `astro dev` will not show search until you run a full `npm run build` (or copy `dist/pagefind` into `public/pagefind` temporarily). Production/preview builds include it.

## Cloudflare Pages

Do **not** change DNS from this repo. In the Cloudflare dashboard (when ready):

| Setting | Value |
|--------|--------|
| Framework preset | Astro (or None) |
| Build command | `npm run build` (Astro + Pagefind index) |
| Build output directory | `dist` |
| Node version | `22` (or latest 22.x) |
| Root directory | `/` (repo root) |

Environment variables are not required for the static marketing build. Do **not** change DNS from this repo.

Optional: set `NODE_VERSION=22` in Pages environment variables if the default image is older.


## Cloudflare Pages — 404 behavior (important)

Cloudflare Pages treats a **missing top-level `404.html`** as an SPA: unknown paths are rewritten to `/` with **HTTP 200** (soft 404). That is the bug Riley reported.

**Fix in this repo:** `src/pages/404.astro` builds to **`dist/404.html`**. With that file present at the site root, Pages serves a real **HTTP 404** for unknown routes (closest `404.html` walking up the path).

| Artifact | Needed? | Notes |
|----------|---------|--------|
| `src/pages/404.astro` → `dist/404.html` | **Yes** | Astro-recommended custom 404; required so Pages does not fall back to SPA/`/` |
| `public/_redirects` | No | Not required for correct 404s on pure static hosting |
| `public/_routes.json` | No | Functions/advanced routing only; not used for this static marketing site |
| Extra root `public/404.html` | No | Would duplicate Astro’s build output; prefer `src/pages/404.astro` |

No Cloudflare dashboard or DNS changes are required for this fix — redeploy the build that includes `dist/404.html`.

## Site map (primary nav)

- `/` — Home
- `/memberships` — Memberships hub (Elite ~$349, Lite ~$199)
- `/camps` — Camps & Training hub + `/camps/{slug}`
- `/events` — Events hub + `/events/{slug}`
- `/team` — Coaches + `/team/{slug}`
- `/contact` — Phone, email, address

Utility pages: `/fall-training`, `/schedule`, `/pole-rentals`, plus membership detail routes under `/memberships/*`.

## Contact (live ops)

- Phone: (480) 766-6017
- Email: arizonapolevaultacademy@gmail.com
- Address: 23238 S. Via Del Arroyo, Queen Creek, AZ 85142
- PushPress: members receive Android/iOS install links from staff messages (no public “Member App” store CTAs on this marketing site)

## Content updates

Edit Markdown in:

- `src/content/coaches/`
- `src/content/camps/`
- `src/content/events/`

Schemas live in `src/content.config.ts`.

## License

Private — Arizona Pole Vault Academy. All rights reserved.
