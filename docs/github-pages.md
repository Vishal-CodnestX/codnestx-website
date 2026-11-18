# GitHub Pages deployment

The workflow `.github/workflows/deploy-pages.yml` builds and deploys the Vite `dist` output after pushes to `main`. It can also be run manually from GitHub Actions. Changes on `development` are published after they are merged into `main`.

## Enable hosting

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Commit and push this deployment configuration to `development`, then merge a pull request from `development` into `main`.
4. Open **Actions → Deploy website to GitHub Pages** and wait for the deployment to succeed.
5. The published URL appears in **Settings → Pages** and in the deployment job.

GitHub Free supports Pages for public repositories. Private repositories require a supported paid plan. Making the repository public also makes its source code public; it is a separate choice from publishing the website.

Expected project URL: https://vishal-codnestx.github.io/codnestx-website/

## Build paths

Local development uses `/`. The deployment workflow sets `VITE_BASE_PATH` to the repository's subdirectory. Animation JSON requests use Vite's `BASE_URL` so they resolve under that same directory.

To reproduce the Pages build in PowerShell:

```powershell
$env:VITE_BASE_PATH = "/codnestx-website/"
npm run build
npm run preview
```

When finished, remove the variable from that terminal session:

```powershell
Remove-Item Env:VITE_BASE_PATH
```
