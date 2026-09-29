# NammaNest

A static, mobile-first Bengaluru rental discovery MVP.

## Run locally

Open `index.html` in a browser, or serve the folder with any static server:

```powershell
npx serve .
```

The listing data lives in `data.js`. Replace the Google Forms URL in `index.html` when the submission form is ready. The site has no backend, login, datastore, or secret configuration.

## Share the website

After deployment, use the public URL from Netlify or GitHub Pages. The homepage also includes a share button that opens the phone's native share sheet where supported, or copies the URL to the clipboard.

## Publish with Netlify

Open [Netlify Drop](https://app.netlify.com/drop), sign in, and drag this folder into the upload area. Netlify will provide a public HTTPS URL that you can send to other people.

## DEV and production on Netlify

Netlify Drop is a manual upload service; it does not continuously build from GitHub. For automatic GitHub deployments, use **Add new site > Import an existing project > GitHub** in Netlify.

Recommended setup:

1. Create two Netlify sites from the same GitHub repository: `nammanest-dev` and `nammanest-prod`.
2. Connect `nammanest-dev` to the `dev` branch.
3. Connect `nammanest-prod` to the `main` branch.
4. Use the `dev` site URL for testing and the production site URL for public sharing.
5. Merge tested changes from `dev` into `main` to publish production.

This repository has no build command. Set the publish directory to the repository root (`.`). The included `netlify.toml` records that configuration.
