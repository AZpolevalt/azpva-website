# DNS cutover checklist (AZPVA)

## Domains
- **Primary:** `arizonapolevaultacademy.com` (canonical)
- **Redirect vanity:** `azpva.club` → primary (301)
- Also redirect `www` → apex (or apex → www); pick one and stick to it.

## Cloudflare Pages
1. Project already builds from GitHub `AZpolevalt/azpva-website`.
2. Add custom domains in Pages:
   - `arizonapolevaultacademy.com`
   - `www.arizonapolevaultacademy.com`
   - `azpva.club`
   - `www.azpva.club`
3. Set primary to `arizonapolevaultacademy.com`; others redirect to it.
4. Old PowerDNN paths are covered by `public/_redirects` (301).

## Analytics
- Enable **Cloudflare Web Analytics** on the Pages project **after** the custom domain is live (no cookie banner needed for the basic CF beacon).
- Do this post-cutover as planned.

## DNS (high level)
1. Point `arizonapolevaultacademy.com` nameservers/DNS to Cloudflare (if not already).
2. Pages will show the required CNAME/apex records when you add the custom domain.
3. Add `azpva.club` the same way, then redirect to primary.
4. Keep old host up until DNS propagates, then retire PowerDNN when traffic is clean.

## Verify after cutover
- `https://arizonapolevaultacademy.com/` loads new site
- `https://azpva.club/` → primary
- Sample old URL e.g. `/Coaches/tabid/542/Default.aspx` → `/team`
- Ask Maya form + memberships/terms + social footer
