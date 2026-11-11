# Karim ALAMI — CV Website

Static one-page CV site, ready for **GitHub Pages**. No build step, no dependencies — just HTML/CSS/JS.

## Project structure

```
web_cv/
├── index.html               ← shell: <head> + [data-include] mount points
├── partials/                ← one HTML module per section, injected by main.js
│   ├── nav.html             ├── hero.html          ├── experience.html
│   ├── education.html       ├── skills.html        ├── certifications.html
│   ├── languages.html       └── footer.html
├── assets/css/style.css
└── assets/js/main.js        ← fetches partials into the shell, then wires UI
```

To add or edit a section, edit its file in `partials/` and (if new) add a
`<div data-include="partials/your-section.html"></div>` mount point in `index.html`.

## Local preview

Must be served over HTTP (partials are fetched with `fetch`, so `file://` won't work):

```bash
cd web_cv
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a repository on GitHub, e.g. `cv` (or `karimalami7.github.io` for a user site at `https://karimalami7.github.io/`).
2. Push this folder:

   ```bash
   cd web_cv
   git init
   git add -A
   git commit -m "CV website"
   git remote add origin https://github.com/karimalami7/<repo>.git
   git push -u origin main
   ```

3. In the repo on GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: `main`, folder: `/ (root)` → Save.**
4. Wait ~1 minute. The site goes live at:
   - `https://karimalami7.github.io/<repo>/` for a project repo
   - `https://karimalami7.github.io/` for the `karimalami7.github.io` user repo

Notes:
- `.nojekyll` is included so GitHub Pages serves the files as-is (no Jekyll processing).
- Optional: add a `CNAME` file with a custom domain to serve from your own domain (then configure the domain under Settings → Pages).
- The site has a dark/light toggle (persisted in `localStorage`) and a **Print CV** button that produces a clean print/PDF layout.
