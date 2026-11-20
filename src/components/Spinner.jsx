function Spinner({ label = 'Loading headlines...' }) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 my-3 text-secondary" role="status" aria-live="polite">
      <div className="spinner-border spinner-border-sm text-primary" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default Spinner;
