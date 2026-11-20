import { useEffect, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import NewsList from '../components/NewsList.jsx';
import { VALID_CATEGORIES, getByCategory } from '../services/newsService.js';

function Category() {
  const { type } = useParams();
  const category = String(type || '').toLowerCase();
  const isValid = VALID_CATEGORIES.includes(category);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const forceRefreshRef = useRef(false);

  useEffect(() => {
    if (!isValid) {
      return undefined;
    }

    const controller = new AbortController();
    const skipCache = forceRefreshRef.current;
    forceRefreshRef.current = false;

    async function loadCategoryNews() {
      setLoading(true);
      setError('');

      try {
        const data = await getByCategory(category, {
          signal: controller.signal,
          skipCache,
        });
        if (!controller.signal.aborted) {
          setArticles(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || 'Unable to load category news.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCategoryNews();

    return () => controller.abort();
  }, [category, isValid, retryCount]);

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const handleRetry = () => {
    forceRefreshRef.current = true;
    setRetryCount((count) => count + 1);
  };

  return (
    <section>
      <h1 className="page-heading">News - Top {displayCategory} Headlines</h1>
      <div className="category-accent-bar">
        <span className={`category-badge category-badge--${category}`}>{displayCategory}</span>
      </div>
      <NewsList
        articles={articles}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />
    </section>
  );
}

export default Category;
