# AZPVA edit round handoff (2026-09-16 PT)

## Done this round
- Fall Camp (Oct 24–25, 2026) + Winter Camp (Dec 29–30, 2026): enriched from live HTML; dual PushPress CTAs (Commuter $399 / Overnighter $599) via `registerCommuterUrl` / `registerOvernighterUrl`.
- Logo img uses natural 640×270 aspect; display ~58px header / ~64px footer (`object-fit: contain`).
- Removed “Member App” / “Open Member App” CTAs from header, footer, mobile nav, home, schedule, contact; rephrased reservation copy to PushPress / staff links. Calendar iframe kept.
- Pagefind site search: `npm run build` → `astro build && pagefind --site dist`; search UI in header (desktop + mobile).

## Blockers / follow-ups
- Logo PNG still has solid black background (source asset); transparent export optional later.
- DNS/Cloudflare untouched; no git push.
