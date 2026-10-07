# La Cocina de Nilsa — sitio web

Static one-page site (HTML + CSS + JS, no build step) for La Cocina de Nilsa, a Venezuelan restaurant at Sara del Campo 522, Santiago Centro.

## Structure

```
index.html        page content (menu, reviews, hours, links)
css/styles.css    styles, mobile-first (breakpoints 600px / 960px)
js/main.js        mobile menu, menu filters, open/closed badge (America/Santiago time)
img/ig/           photos from the restaurant's Instagram
img/rappi/        logo, cover and product photos from Rappi
_fuentes/         raw scraped data (not published: Jekyll skips folders starting with "_")
```

## Data sources (collected 2026-10-07)

- Menu and prices: Rappi store 900112698. Prices on the site are Rappi prices.
- Reviews: Google Maps, 5.0 from 7 reviews. Only 3 have text.
- Hours: Google Maps, every day 7:30–22:00. Rappi delivery runs 16:00–21:45.
- Phone / WhatsApp: +56 9 8747 0389 (from Google Maps).

## Before going live — confirm with the owner

- Permission to use her Instagram photos and her photo in the "Nosotros" section.
- The "Nosotros" text is a draft written in her voice. She must approve or rewrite it.
- Menu items, prices and hours (update `index.html` when they change).
- The "Especialidades" dishes come from Instagram posts; confirm they are on the regular menu.

## Deploy to GitHub Pages

1. Create a new repository and push the contents of this folder to the `main` branch.
2. In the repository: Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Custom domain: add a `CNAME` file in the root with the domain (one line, for example `lacocinadenilsa.cl`), and enter the same domain in Settings → Pages.
4. DNS at the registrar:
   - Apex domain: `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - `www`: `CNAME` to `<github-user>.github.io`.
5. Wait for the certificate, then tick "Enforce HTTPS".

## Local preview

Any static server works, for example from this folder: `python -m http.server 8000`, then open `http://localhost:8000`.
