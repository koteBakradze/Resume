# Konstantine Bakradze — Resume Website

A responsive, five-page resume and portfolio site built with semantic HTML, Tailwind CSS via CDN, and vanilla JavaScript. It has no package dependencies, build step, framework, or paid hosting requirement.

## What is included

- Responsive layout for mobile, tablet, and desktop
- Light/dark theme with system preference detection and saved choice
- Accessible desktop and mobile navigation
- Five focused pages with a shared navigation and active-page highlighting
- Rotating hero bio, experience timeline, project cards, skills, education, and contact sections
- Downloadable résumé PDF hook
- GitHub Pages-ready file structure

## File structure

```text
.
├── index.html
├── experience.html
├── projects.html
├── skills.html
├── contact.html
├── styles.css
├── script.js
├── README.md
└── assets/
    └── Konstantine_Bakradze_Resume.pdf  # Add this file before publishing
```

The `assets` folder and PDF are intentionally not included until you add the final, verified résumé.

## Personalize before publishing

Search across all five HTML files and replace these values:

| Find | Replace with |
|---|---|
| `YOUR_EMAIL@example.com` | Your public professional email |
| `YOUR_GITHUB_USERNAME` | Your GitHub username |
| `YOUR_LINKEDIN_USERNAME` | Your LinkedIn username |
| `YOUR_LIVE_DEMO_URL` | The matching live project URL |

Then review the following:

1. **Employment date:** The site uses `Oct 2022 — Dec 2025*`, the last verified record. Change it to `Present` only if the role is still current, or enter the correct end date.
2. **Education:** Update the education status and expected/completed date after confirming it.
3. **Project URLs:** Change every example repository path to the real repository URL. Remove a link if that project is private.
4. **Certifications:** Replace the placeholder row with verified certifications, or remove the row entirely.
5. **Page metadata:** Update each page’s `<title>` and description if you change your positioning.

### Add the résumé PDF

1. Create a folder named `assets` in the same folder as `index.html`.
2. Add your PDF using this exact filename:

   ```text
   assets/Konstantine_Bakradze_Resume.pdf
   ```

3. If you prefer a different filename, replace this path in `index.html` and `contact.html`.

## Preview locally

For a quick preview, double-click `index.html` and open it in a browser. Because Tailwind is loaded from its CDN, the preview requires an internet connection.

For the most accurate local preview, start a small local web server from the project folder:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000). Stop the server with `Ctrl+C`.

## Deploy free with GitHub Pages

### 1. Create a GitHub repository

1. Sign in at [github.com](https://github.com).
2. Select **New repository** from the `+` menu.
3. Name it, for example, `resume` or `portfolio`.
4. Choose **Public**. GitHub Pages is available for public repositories on GitHub Free.
5. Leave **Add a README**, `.gitignore`, and license unchecked because this folder already contains a README.
6. Select **Create repository**.

If you want the site at `https://YOUR_USERNAME.github.io/`, name the repository exactly `YOUR_USERNAME.github.io`. Otherwise, a repository named `resume` will publish at `https://YOUR_USERNAME.github.io/resume/`.

### 2. Push these files to GitHub

In a terminal, open this project folder and run:

```bash
git init
git add index.html experience.html projects.html skills.html contact.html styles.css script.js README.md assets/
git commit -m "Create resume website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

If you have not added the PDF yet, omit `assets/` from the `git add` line.

### 3. Enable GitHub Pages

1. Open the repository on GitHub.
2. Select **Settings**.
3. In the left sidebar, select **Pages** under **Code and automation**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Choose the `main` branch and the `/ (root)` folder.
6. Select **Save**.
7. Wait a few minutes, then return to the Pages settings. GitHub will show the published site URL.

No GitHub Actions workflow is required for this site.

### 4. Publish future edits

After changing the text, links, or PDF, run:

```bash
git add .
git commit -m "Update resume content"
git push
```

GitHub Pages will publish the update automatically, usually within a few minutes.

## Optional custom domain

In **Repository Settings → Pages**, enter a domain under **Custom domain** and follow GitHub’s displayed DNS instructions. Keep **Enforce HTTPS** enabled after the domain is verified.

## Maintenance notes

- Each content area has its own file: home, experience, projects, skills/education, and contact.
- Shared visual styles are in `styles.css`; shared navigation and interactions are in `script.js`.
- Project cards and experience roles can be duplicated as complete `<article>` blocks in their matching page.
- Dynamic hero phrases are in the `bioPhrases` array in `script.js`.
- The theme is stored in the browser under `kb-theme`. Remove that key in browser storage to return to automatic system preference.
- Tailwind’s CDN is ideal for this zero-build personal site. If the site grows substantially, a compiled Tailwind setup can reduce CSS delivered to visitors, but it is not needed for this deployment.

## License

The site content is personal. Reuse the structure and styling as needed, but replace all personal text and project details before publishing it as your own.
