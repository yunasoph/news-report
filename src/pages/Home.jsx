import { useEffect, useRef, useState } from 'react';
import NewsList from '../components/NewsList.jsx';
import { getTopHeadlines } from '../services/newsService.js';

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const forceRefreshRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const skipCache = forceRefreshRef.current;
    forceRefreshRef.current = false;

    async function loadHeadlines() {
      setLoading(true);
      setError('');

      try {
        const data = await getTopHeadlines({
          signal: controller.signal,
          skipCache,
        });
        if (!controller.signal.aborted) {
          setArticles(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || 'Unable to load top headlines.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadHeadlines();

    return () => controller.abort();
  }, [retryCount]);

  const handleRetry = () => {
    forceRefreshRef.current = true;
    setRetryCount((count) => count + 1);
  };

  return (
    <section>
      <h1 className="page-heading">News - Top General Headlines</h1>
      <NewsList
        articles={articles}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />
    </section>
  );
}

export default Home;
