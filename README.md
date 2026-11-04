# BoldOnBald

Static homepage for BoldOnBald — sticker-like plastic sheets for bald heads.

Open `public/index.html` locally, or serve the `public/` directory with any static file server.

## Deploy (Cloudflare Workers Assets)

Worker name: `square-field-0d6d` (see `wrangler.toml`).

```bash
npx wrangler deploy
```

Set these environment variables before deploying (do not commit secrets):

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

The site asks for HTTP basic auth on every request. Set these Worker secrets before deploying (do not commit the values):

- `SITE_USERNAME`
- `SITE_PASSWORD`

```bash
npx wrangler secret put SITE_USERNAME
npx wrangler secret put SITE_PASSWORD
```

Optional local preview:

```bash
npx wrangler dev
```
