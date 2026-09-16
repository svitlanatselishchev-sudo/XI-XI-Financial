# XI:XI Financial Operations Consultancy

Marketing site for XI:XI Financial Operations Consultancy, led by Svitlana "Lana" Tselishchev — Palm City, FL.

Single-file static site (HTML + Tailwind CDN). No build step required.

## Deploy on GitHub Pages

1. Upload `index.html` and `.nojekyll` to the root of this repository (the "uploading an existing file" link on the repo's Quick Setup page works fine for this).
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Set **Branch** to `main` and the folder to `/ (root)`, then **Save**.
5. GitHub will publish the site at `https://svitlanatselishchev-sudo.github.io/XI-XI-Financial/` within a minute or two — refresh the Pages settings page to get the exact link.

## Custom domain (optional)

Once a domain is purchased and pointed at GitHub Pages (via a `CNAME` DNS record to `svitlanatselishchev-sudo.github.io`), add a file named `CNAME` (no extension) to the repo root containing just the domain, e.g.:

```
xixifinancial.com
```

Then re-enter that domain under **Settings → Pages → Custom domain** to enable HTTPS.
