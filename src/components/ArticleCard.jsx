import { useState } from 'react';

function ArticleCard({ article }) {
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(article.image) && !imageError;
  const sourceName = article.source?.name || 'Unknown Source';
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleString()
    : 'Unknown Date';

  return (
    <article className="news-card h-100 d-flex flex-column">
      <div className="news-card-media">
        {hasImage ? (
          <img
            src={article.image}
            alt={article.title}
            className="news-card-img"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="news-card-img-placeholder" aria-hidden="true">
            No Image
          </div>
        )}
      </div>

      <div className="news-card-body">
        <h2 className="news-card-title">{article.title}</h2>

        {article.description ? (
          <p className="news-card-description">{article.description}</p>
        ) : null}

        <details className="news-card-details">
          <summary>Channel and PublishedAt</summary>
          <div className="news-card-meta">
            <div>
              <strong>Source:</strong> {sourceName}
            </div>
            <div>
              <strong>Published:</strong> {formattedDate}
            </div>
          </div>
        </details>

        {article.url ? (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more-btn"
          >
            <span>Read more</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default ArticleCard;
