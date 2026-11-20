import axios from 'axios';

const BASE_URL = 'https://gnews.io/api/v4';
const LANG = 'en';
const COUNTRY = 'in';
const MAX = 10;

export const VALID_CATEGORIES = [
  'general',
  'business',
  'sports',
  'science',
  'health',
  'entertainment',
  'technology',
];

const newsClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

function buildCacheKey(endpoint, params) {
  const safeParams = Object.entries(params)
    .filter(([key]) => key !== 'apikey')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `your-news:${endpoint}?${safeParams}`;
}

function readCache(cacheKey) {
  try {
    const raw = sessionStorage.getItem(cacheKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeCache(cacheKey, articles) {
  try {
    sessionStorage.setItem(cacheKey, JSON.stringify(articles));
  } catch {
    // Ignore sessionStorage write errors (e.g. private browsing or quota full)
  }
}

function mapApiError(error) {
  if (!error.response) {
    return new Error(
      'Unable to connect to the news server. Please check your internet connection and try again.'
    );
  }

  const { status } = error.response;
  if (status === 401 || status === 403) {
    return new Error(
      'Invalid or unauthorized GNews API key (HTTP 401/403). Please check your VITE_GNEWS_API_KEY.'
    );
  }

  if (status === 429) {
    return new Error(
      'GNews API rate limit reached (HTTP 429). Please wait or try again later.'
    );
  }

  return new Error('An unexpected error occurred while fetching news. Please try again.');
}

async function fetchFromGNews(endpoint, queryParams, options = {}) {
  const { signal, skipCache = false } = options;

  const apiKey = import.meta.env.VITE_GNEWS_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      'GNews API key is missing. Please set VITE_GNEWS_API_KEY in your .env file.'
    );
  }

  const cacheKey = buildCacheKey(endpoint, queryParams);
  if (!skipCache) {
    const cached = readCache(cacheKey);
    if (cached) {
      return cached;
    }
  }

  try {
    const response = await newsClient.get(endpoint, {
      params: { ...queryParams, apikey: apiKey },
      signal,
    });

    const articles = response?.data?.articles;
    if (!Array.isArray(articles)) {
      throw new Error('An unexpected error occurred while fetching news. Please try again.');
    }

    writeCache(cacheKey, articles);
    return articles;
  } catch (error) {
    if (axios.isCancel(error) || error.code === 'ERR_CANCELED' || error.name === 'AbortError') {
      throw error;
    }

    if (error.isAxiosError) {
      throw mapApiError(error);
    }

    throw error;
  }
}

export async function getTopHeadlines(options = {}) {
  return fetchFromGNews(
    '/top-headlines',
    {
      category: 'general',
      lang: LANG,
      country: COUNTRY,
      max: MAX,
    },
    options
  );
}

export async function getByCategory(category, options = {}) {
  const normalizedCategory = String(category || '').toLowerCase();
  return fetchFromGNews(
    '/top-headlines',
    {
      category: normalizedCategory,
      lang: LANG,
      country: COUNTRY,
      max: MAX,
    },
    options
  );
}

export async function searchNews(query, options = {}) {
  const trimmedQuery = String(query || '').trim();
  if (!trimmedQuery) {
    return [];
  }

  return fetchFromGNews(
    '/search',
    {
      q: trimmedQuery,
      lang: LANG,
      max: MAX,
    },
    options
  );
}
