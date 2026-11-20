# Your News — Real-Time News App

A clean, fast, mobile-friendly React single-page web application that displays real-time news headlines from the **GNews API**.

## Features

- Top general headlines on the home page (`/`)
- Browse news by category (`General`, `Business`, `Sports`, `Science`, `Health`, `Entertainment`, `Technology`)
- Search articles by keyword (`/search/:query`)
- Responsive dark-themed UI built with React, Bootstrap 5, and custom CSS
- Open original articles directly via "Read more"

## Tech Stack

- React.js (function components + hooks)
- Vite
- React Router (`react-router-dom`)
- Axios
- Bootstrap 5
- GNews API v4 (`https://gnews.io/docs/`)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Get a free API key from [GNews](https://gnews.io/).

3. Create a `.env` file in the project root (based on `.env.example`) and add your key:

   ```env
   VITE_GNEWS_API_KEY=your_gnews_api_key_here
   ```

## Scripts

- Run development server:

  ```bash
  npm run dev
  ```

- Build for production:

  ```bash
  npm run build
  ```

- Preview production build locally:

  ```bash
  npm run preview
  ```

## Known Limitations

- The GNews free plan enforces a daily request limit and restricts certain query features.
- Requires an active internet connection to fetch live news articles.
