# Blooming Iqra — website

One-page personal brand site for **Sabekunnahar Iqra**. Brand by Captain · Creative Captain7.
Plain HTML/CSS/JS: no framework, no build step.

```
website/
├── index.html                  ← all page content (English copy lives here)
├── assets/
│   ├── css/style.css           ← brand colours, type, layout, CSS animations
│   ├── js/main.js              ← Bangla copy, language toggle, all scroll/interaction motion
│   ├── js/vendor/              ← GSAP 3.15.1, ScrollTrigger, Lenis 1.3.27 (local copies, no CDN)
│   ├── img/                    ← portraits (WebP + JPG), OG image, favicons
│   └── Sabekunnahar_Iqra_Resume.pdf   ← compressed resume (176 KB)
├── serve.json                  ← cache headers for `npx serve`
├── _headers                    ← cache headers for Netlify
└── README.md
```

## Preview locally

From inside the `website` folder, run either:

```bash
python -m http.server 8000        # then open http://localhost:8000
npx serve .                        # alternative, needs Node.js
```

Opening `index.html` by double-click also works, but a local server is closer to the live site.

**After any update, restart `npx serve`** (Ctrl+C, then run it again): `serve` only reads `serve.json`, and with it the no-cache header for `index.html`, when it starts.

**Seeing a broken or half-styled page?** That's almost always the browser mixing an old cached `index.html` with a newer `style.css` (or the reverse). Press **Ctrl + F5** to hard-refresh. `serve.json` and `_headers` tell `npx serve` and Netlify to always re-check `index.html`, and the CSS/JS links carry a `?v=` version. **Whenever you change `style.css` or `main.js`, bump the `?v=` number on its `<link>` / `<script>` tag in `index.html`.**

## Swap a portrait

1. **Copy** the new photo out of `Source\` (never edit the original) and crop it to **4:5**. Hero: keep the eyes on the upper third and leave room around the hands; the arch hides the top corners and the parallax hides ~6% top and bottom.
2. Hero exports (same names, so nothing else needs to change):
   - `assets/img/iqra-hero.webp` + `iqra-hero.jpg`: full size, currently 546 × 792 (crop stays inside the lit niche; no wall at the edges)
   - `assets/img/iqra-hero-480.webp` + `iqra-hero-480.jpg`: 480 × 696
   - Hero images are **1 : 1.45** (the 4:5 arch plus 8% parallax overscan top and bottom). Keep that ratio so `object-fit: cover` crops nothing.
   - Keep each WebP under ~250 KB. If the photo is wider than 1240 px, also export a 940 px version and add it to both `srcset` lists for true 2× sharpness.
3. About photo: `assets/img/iqra-about.webp` + `iqra-about.jpg` (960 × 1200).
4. Update the `width` / `height` and `alt` on the `<img>` in `index.html`, and the Bangla alt (`hero.alt` / `about.alt` in `main.js`).
5. Regenerate `assets/img/og-image.jpg` (1200 × 630) when the hero changes.
6. **Bump every `?v=` number** in `index.html` (CSS, JS, hero images, og-image) so browsers fetch the new files.

Keep file names lowercase with hyphens, no spaces.

## Add the social links

The social icons are **hidden** on the live site until real profile URLs exist. To add them, put this list in the Connect section of `index.html` (where the comment says "Social links are hidden"), keeping only the networks you have, and add the same URLs to `"sameAs": []` in the JSON-LD in `<head>`:

```html
<ul class="social">
  … one <li> per network …
</ul>
```

- **LinkedIn**
  ```html
  <li><a href="https://…" aria-label="LinkedIn" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10v6.5M7.5 7.3v.1M11 16.5V10M11 13c0-1.8 1.2-3 2.8-3s2.7 1.1 2.7 3v3.5"/></svg></a></li>
  ```
- **Facebook**
  ```html
  <li><a href="https://…" aria-label="Facebook" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5z"/></svg></a></li>
  ```
- **Instagram**
  ```html
  <li><a href="https://…" aria-label="Instagram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7v.1"/></svg></a></li>
  ```
- **YouTube**
  ```html
  <li><a href="https://…" aria-label="YouTube" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.2 5 2.8-5 2.8z"/></svg></a></li>
  ```

## Edit text

- **English:** edit directly in `index.html`.
- **Bangla:** edit the `BN` object at the top of `assets/js/main.js`. Each key matches a `data-i18n="…"` attribute in the HTML. If you add a new English line, give it a `data-i18n` key and add the Bangla version under the same key.
- Headings with `class="split"` are split into words automatically for the reveal animation, and the marquees duplicate their own items. Just edit the plain text; the script handles the rest, in both languages.

## Share URLs (already set for bloomingiqra.com)

Social networks need full URLs for the share image. Once you know the live address, replace in `<head>`:

- `content="assets/img/og-image.jpg"` → `content="https://YOUR-DOMAIN/assets/img/og-image.jpg"` (both `og:image` and `twitter:image`)
- add `<meta property="og:url" content="https://YOUR-DOMAIN/">` and `<link rel="canonical" href="https://YOUR-DOMAIN/">`
- in the JSON-LD, add `"url": "https://YOUR-DOMAIN/"` and make `"image"` absolute.

## Deploy

### GitHub Pages (account: captain-crc7)

```bash
cd website
git init
git add .
git commit -m "Blooming Iqra website"
git branch -M main
git remote add origin https://github.com/captain-crc7/blooming-iqra.git   # create this repo on GitHub first
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `/ (root)` → Save.**
The site appears at `https://captain-crc7.github.io/blooming-iqra/` within a minute or two. To use a custom domain, add it under Settings → Pages → Custom domain and point the DNS as GitHub instructs.

### Netlify

- **Drag and drop:** log in at app.netlify.com → *Add new site → Deploy manually* → drag the `website` folder onto the page.
- **From GitHub:** *Add new site → Import an existing project* → pick the repo → leave the build command empty and set the publish directory to `/` (or `website` if the repo contains the parent folder).

Vercel works the same way: import the repo, framework preset "Other", no build command.

## Notes

- Fonts (Fraunces, Manrope, Noto Serif Bengali, Hind Siliguri) load from Google Fonts with `display=swap`; the Bangla fonts only download when Bangla text is shown.
- Colours: **wine `#68283A` is the main brand colour** (CTAs plus the Growth Philosophy, Manifesto and Connect sections), wine-deep `#4F1E2C` for the footer and button hover, cream `#F7F1E8` as the base, charcoal `#2D292B` for text only (never a background), and sage `#9CA894` for lines, nodes, tags and large italic accents. All are CSS variables at the top of `style.css`. On wine, keep small text cream: sage on wine is 4.3:1, fine for large headings and lines, too low for small text.
- The email link opens the visitor's email app; there is no contact form or backend.

## Motion: how it's built (and how to keep it safe)

- **Section backgrounds are static CSS** on the section itself (`.on-wine` = wine background + cream text in one rule). Never reveal a background with JS, clip-path or scale.
- **Hidden start states only exist under `html.js.anim`.** `main.js` adds `.anim` once it is running and motion is allowed. With JS off or "reduce motion" on, the page is fully visible and static.
- **Safety nets:** if `main.js` never starts, an inline script reveals everything after 3 s; while scrolling, a watchdog reveals anything that should already be on screen; if GSAP/Lenis fail to load, reveals fall back to IntersectionObserver.
- Animations only use transform, opacity and SVG stroke. The Philosophy "pin" uses CSS `position: sticky` (no JS pin), so there is zero layout shift.
- Mobile gets lighter versions: no sticky pin (the line scrubs instead), no custom cursor or magnetic buttons, 10 floating petals instead of 26.

| What | Where |
|---|---|
| Intro loader (bloom draws, ≤1.5 s) | `.loader` in `style.css` (pure CSS timing) |
| Hero word-by-word headline, petal lines, portrait parallax | `.split[data-split="words"]`, `.draw`, `initScrollMotion()` |
| Floating petals canvas | `initPetals()` (count per device at the top) |
| Lenis smooth scroll + scroll-progress stem with bloom | `initScrollMotion()`, `.progress-stem` |
| Philosophy sticky line + words lighting up | `.philosophy` (CSS sticky) + `lightUpTo()` |
| Count-ups, staggered cards, journey stem + nodes | `.rise`, `countUp()`, `.t-stem` |
| Marquees, tag cloud float | `.marquee`, `.cloud` (CSS keyframes) |
| Value card flips | `.vcard` (CSS 3D; tap toggles `aria-pressed`) |
| Manifesto word highlight | `buildManifestoScrub()` |
| Magnetic buttons, bloom cursor | `initMagnetic()`, `initCursor()` (desktop, fine pointer only) |
