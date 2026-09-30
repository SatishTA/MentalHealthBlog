# Stillharbor

A quiet harbor for daily thoughts — a personal mental-health journal for words, photos, and videos. The public site is a static Astro blog. You write in `/admin`; Sveltia CMS saves Markdown and images to this GitHub repository; GitHub Actions publishes [GitHub Pages](https://pages.github.com/) for free.

Live URL after you enable Pages:

`https://<your-github-username>.github.io/MentalHealthBlog/`

## Local development

```sh
npm install
npm run dev -- --background
```

Open `http://localhost:4321/MentalHealthBlog/` (the project `base` path matches GitHub Pages).

## Deploy from your GitHub account

1. Create a GitHub repository named `MentalHealthBlog` (or keep this folder’s name) and push `main`.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. If your GitHub username is not `SatishTA`, edit `repo` and the URLs in [`public/admin/config.yml`](public/admin/config.yml). The admin page also infers `owner/repo` from a `*.github.io` URL.
4. After the **Deploy to GitHub Pages** workflow is green, open the Pages URL.

### Write posts (`/admin`)

1. Create a [fine-grained personal access token](https://github.com/settings/tokens?type=beta) with **Contents: Read and write** on this repository (or a classic token with the `repo` / `public_repo` scope).
2. Open `https://<you>.github.io/MentalHealthBlog/admin/` and choose **Sign in with token**.
3. Paste the token. It stays in your browser’s local storage, not in the repo.
4. Add an entry: title, date, summary, tags, cover/photos, optional YouTube or Vimeo URL, and the body.
5. New entries start as drafts. Turn **Draft** off, then save/publish. GitHub Actions rebuilds the site in a minute or two.

Photos upload to `public/uploads`. GitHub files cannot exceed 100MB; keep the repo small. Prefer video **links** over large uploads.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Local server |
| `npm run build` | Production build in `dist/` |
| `npm run preview` | Preview the production build |

Stillharbor is a personal journal, not therapy or a crisis service. In the US, call or text 988. International resources: [IASP](https://www.iasp.info/suicidalthoughts/).

## Review and verification

Run `npm test` for URL and Markdown regression checks, then `npm run build` for the production site. The archive searches titles, summaries, tags, and entry text. Drafts are excluded from public pages and search; draft files still exist in the GitHub repository, so a public repository is not private storage.

Manage the preview with `npm run dev -- status`, `npm run dev -- logs`, and `npm run dev -- stop`.

The included entries are sample content. Replace them with your writing before launch. GitHub authentication and Pages setup are required before the editor can save remotely.
