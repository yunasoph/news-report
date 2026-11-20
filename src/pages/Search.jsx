import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import NewsList from '../components/NewsList.jsx';
import { searchNews } from '../services/newsService.js';

function Search() {
  const { query } = useParams();
  const searchTerm = String(query || '').trim();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!searchTerm) {
      return undefined;
    }

    const controller = new AbortController();

    async function loadSearchResults() {
      setLoading(true);
      setError('');

      try {
        const data = await searchNews(searchTerm, {
          signal: controller.signal,
          skipCache: retryCount > 0,
        });
        if (!controller.signal.aborted) {
          setArticles(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || 'Unable to load search results.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadSearchResults();

    return () => controller.abort();
  }, [searchTerm, retryCount]);

  if (!searchTerm) {
    return <Navigate to="/" replace />;
  }

  return (
    <section>
      <h1 className="page-heading">News - Top {searchTerm} Headlines</h1>
      <NewsList
        articles={articles}
        loading={loading}
        error={error}
        onRetry={() => setRetryCount((count) => count + 1)}
      />
    </section>
  );
}

export default Search;
