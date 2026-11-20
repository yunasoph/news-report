# Your News — Real-Time News App

A clean, fast, mobile-friendly React single-page web application that displays real-time news headlines from the **GNews API**.

## Features

- Top general headlines on the home page (`/`)
- Browse news by category (`General`, `Business`, `Sports`, `Science`, `Health`, `Entertainment`, `Technology`)
- Search articles by keyword (`/search/:query`)
- Responsive dark-themed UI built with React, Bootstrap 5, and custom CSS
- Lazy-loaded article images, skeleton loaders, error handling with retry, and `sessionStorage` response caching
- Open original articles directly in a new tab via **Read more**

## Tech Stack

- **Framework:** React.js (function components + hooks)
- **Bundler:** Vite
- **Routing:** React Router (`react-router-dom`)
- **HTTP Client:** Axios
- **Styling:** Bootstrap 5 + custom dark theme CSS
- **API Provider:** [GNews API v4](https://gnews.io/docs/)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Obtain and configure a GNews API key

1. Create a free account at [gnews.io](https://gnews.io/) and copy your API key from the dashboard.
2. Create a `.env` file in the project root (matching `.env.example`):

   ```env
   VITE_GNEWS_API_KEY=your_gnews_api_key_here
   ```

> **Note:** Never commit `.env` to version control. It is listed in `.gitignore`.

### 3. Run in development

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

Preview the production bundle locally:

```bash
npm run preview
```

## Deployment Notes

This app uses client-side routing via `BrowserRouter` (`/` , `/category/:type`, `/search/:query`):

- **Netlify:** `public/_redirects` is included (`/* /index.html 200`) and automatically copied into `dist/` during `npm run build`.
- **Vercel:** `vercel.json` is included with a rewrite rule forwarding all routes to `/index.html`.
- **GitHub Pages:** Because GitHub Pages serves static subpaths without server rewrites by default, switch `BrowserRouter` in `src/main.jsx` to `HashRouter` if deploying directly to GitHub Pages.
- **Environment variable:** Set `VITE_GNEWS_API_KEY` in your hosting provider's environment settings before building.

## Known Limitations

- The GNews free plan enforces a daily request limit (and per-second rate limits) and restricts some query capabilities.
- An active internet connection is required to fetch news articles.
