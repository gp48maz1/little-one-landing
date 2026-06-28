# Little One Landing

A one-page, airfield-themed baby-shower site — _"Baby Peters is cleared for landing."_
Built with SvelteKit + Svelte 5, deployed to Cloudflare Workers, with a KV-backed RSVP
("Check In") flow. Stack mirrors the `iron-dad` project.

## Stack

- **SvelteKit 2** + **Svelte 5** (runes), `@sveltejs/adapter-cloudflare`
- **Cloudflare Workers** + **KV** (namespace title `little-one-landing-RSVPS`) for RSVPs
- **Zod** request validation, honeypot + per-IP rate limiting
- Plain CSS, design tokens in `src/app.css`
- JavaScript + JSDoc (no TypeScript), checked with `svelte-check`

## Develop

```bash
npm install
npm run dev      # http://localhost:5173 — local KV is wired via adapter-cloudflare
npm run check    # svelte-check
npm run build    # production build
npm run preview  # wrangler dev (Miniflare) on :4173
```

## Content

**All copy and logistics live in [`src/lib/data.js`](src/lib/data.js).** Edit that one file;
every component reads from it. Search for `TODO` to find everything still using a placeholder:

- Venue / room display name for "The Air Park" (the street address is set)
- Registry links (currently `#`)
- RSVP "boarding closes" deadline date
- Ground-crew contact name + phone, and the parking note
- Any house rules to route through Finn's section

Finn's photo lives at `static/finn.png` (downscaled from `planning/finn_security.png`).

## RSVP flow

- Form posts JSON to `POST /api/rsvp` → validated (Zod) → honeypot drop → IP rate-limit →
  stored in KV as `pending`.
- **Admin / "Control Tower"** at `/admin` lists pending / approved / rejected with
  approve / reject / delete. The admin page and `/api/admin/*` are **only protected by
  Cloudflare Access** — you must configure that in the Zero Trust dashboard before relying on
  it in production (locally there is no auth gate, by design).

Data shapes: `src/lib/rsvp-shapes.js`. KV helpers: `src/lib/server/rsvp-store.js`.

## Deploy

```bash
npm run deploy   # build + wrangler deploy
```

Then in the Cloudflare dashboard:

1. Bind a custom domain to the Worker.
2. Add a **Cloudflare Access** (Zero Trust) policy covering `/admin*` and `/api/admin/*`,
   allowing the host's email. With `workers_dev` / `preview_urls` disabled in
   `wrangler.jsonc`, only the custom domain serves traffic.
