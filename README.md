# 11:11 Strategy website

Static marketing site for 11:11 Strategy (Palm City, FL), published with GitHub Pages at https://xixistrategy.com. No build step: edit the HTML, commit, and Pages republishes.

## Structure
- `index.html`, `services.html`, `story.html`, `insights.html`, `cpa-partners.html`, `ecommerce-reconciliation.html`, `tools.html`, `worksheets.html`, `intake.html`: main pages
- `workshops/`: Ukrainian (root) and English (`en/`) workshop pages
- `assets/`: styles (`brand.css`, `home.css`, `ux-enhancements.css`), images, logos
- `404.html`: custom not-found page
- `BRAND.md`, `CONTENT-QUALITY.md`: brand colors and editorial rules, read before editing copy

## Working rules
- Call to action is always "Book a call" (never "free").
- Make changes on a branch and merge to `main` to publish; `main` is the live site.
- Update `sitemap.xml` lastmod when a page changes.
- Worksheet launch prices on `worksheets.html` run through Nov 19, 2026; update prices and the Product markup afterwards.

## Analytics
GoatCounter (privacy-friendly). Click events use `data-goatcounter-click`: `book-call`, `call-phone`, `email-click`, `instagram`, `etsy-*`, `stripe-*`, `form-submit-*`.
