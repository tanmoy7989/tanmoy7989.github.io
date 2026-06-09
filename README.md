# tanmoy7989.github.io

Personal website built with the [astro_academia](https://github.com/maiobarbero/astro_academia) template.

## Resume

Resume source files live in [`resume/`](resume/):

- **`tsanyal_resume.tex`** — LaTeX source; compiled to `public/resume.pdf` via `scripts/render_resume.sh`.
- **`tsanyal_resume.ts`** — structured CV data for the web CV page (copied to `src/data/cv.ts` at build time).

## Research content

Research project write-ups are in [`src/content/Research/`](src/content/Research/).

## Theme colors

In [`src/settings.ts`](src/settings.ts), `themeColors` holds named accent colors; set `themeColors.accent` to any key in `themeColors.colors`.

## Docker images

[`scripts/build_containers.sh`](scripts/build_containers.sh) rebuilds and pushes the website and TeX Live Docker images to GHCR. Run it only when you change `dockerfiles/` (e.g. after updating the TeX Live setup).

## Local preview

[`scripts/test_build.sh`](scripts/test_build.sh) starts the Astro dev server to preview site changes. Run `./scripts/test_build.sh` from the repo root; add `-r` to recompile the PDF resume first (`./scripts/test_build.sh -r`).

## Deploy

Push to `main` on GitHub — the Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys the site to GitHub Pages.
