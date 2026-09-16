# Arizona Pole Vault Academy Website

Marketing site for **Arizona Pole Vault Academy** (Queen Creek, AZ), built with [Astro](https://astro.build) + TypeScript for deployment on **Cloudflare Pages**.

## Stack

- Astro 7 (static output)
- TypeScript (strict)
- Content collections: `coaches`, `camps`, `events`
- Mobile-first athletic UI (no UI framework dependency)

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

Output directory: **`dist/`**

Preview locally:

```bash
npm run preview
```

## Cloudflare Pages

Do **not** change DNS from this repo. In the Cloudflare dashboard (when ready):

| Setting | Value |
|--------|--------|
| Framework preset | Astro (or None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` (or latest 22.x) |
| Root directory | `/` (repo root) |

Environment variables are not required for the static marketing build.

Optional: set `NODE_VERSION=22` in Pages environment variables if the default image is older.

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
- Address: 23238 S Via Del Arroyo, Queen Creek, AZ 85142
- Member app: https://azpva.pushpress.com

## Content updates

Edit Markdown in:

- `src/content/coaches/`
- `src/content/camps/`
- `src/content/events/`

Schemas live in `src/content.config.ts`.

## License

Private — Arizona Pole Vault Academy. All rights reserved.
