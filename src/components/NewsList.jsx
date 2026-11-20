import ArticleCard from './ArticleCard.jsx';
import Spinner from './Spinner.jsx';
import SkeletonCard from './SkeletonCard.jsx';
import ErrorMessage from './ErrorMessage.jsx';

const SKELETON_COUNT = 8;

function NewsList({ articles = [], loading = false, error = '', onRetry }) {
  if (loading) {
    return (
      <section aria-busy="true" aria-label="Loading news articles">
        <Spinner />
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-1">
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <div className="col" key={index}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  const validArticles = (articles || []).filter(
    (article) => article && typeof article.title === 'string' && article.title.trim() !== ''
  );

  if (validArticles.length === 0) {
    return (
      <div className="status-panel">
        <p className="mb-0 text-secondary fs-5">No articles found</p>
      </div>
    );
  }

  return (
    <section aria-label="News articles">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {validArticles.map((article, index) => (
          <div className="col" key={article.url || `${article.title}-${index}`}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewsList;
