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

Optional local preview:

```bash
npx wrangler dev
```
