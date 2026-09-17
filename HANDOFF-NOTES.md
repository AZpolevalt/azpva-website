# AZPVA edit round handoff (2026-09-17 PT)

## Done this round
- Dean coach media: schema `image` + `videos` (+ optional `portrait` / `actionImage`); Dean frontmatter wired to `/images/coaches/dean-starkey.jpg`, portrait, action vault, 7 YouTube videos (nocookie lazy embeds on `/team/dean-starkey`).
- CoachCard shows photo when `image` is set; team + home pass `image`.
- Home hero card: tasteful Dean action shot.
- **Ask Maya** floating widget sitewide (BaseLayout): name + email OR phone + question; Web3Forms POST when `PUBLIC_WEB3FORMS_KEY` is set; otherwise mailto fallback to arizonapolevaultacademy@gmail.com (subject `Ask Maya — website`).
- Success copy: “Thanks — Maya will get back to you.”
- README documents Web3Forms env key + mailto fallback.

## Blockers / follow-ups
- **Form key:** Dean must add `PUBLIC_WEB3FORMS_KEY` in Cloudflare Pages (or `.env`) for in-browser submit; until then mailto fallback works.
- **SMS heads-up:** Maya owns replies. Dean wants SMS to **(480) 766-6017** on new Ask Maya submissions — next step is Twilio or Zapier (or Web3Forms → Zapier) once credentials exist. Email-to-Maya path is implemented now.
- Logo PNG still has solid black background (source asset); transparent export optional later.
- DNS/Cloudflare untouched; no git push.
