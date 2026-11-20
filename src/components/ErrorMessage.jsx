function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status-panel" role="alert">
      <h2 className="h5 text-white mb-2">Unable to load news</h2>
      <p className="text-secondary mb-3">
        {message || 'Something went wrong while fetching articles. Please try again.'}
      </p>
      {onRetry ? (
        <button type="button" className="btn search-btn rounded-2 px-4" onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </div>
  );
}

export default ErrorMessage;
