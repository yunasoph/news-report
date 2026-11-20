function SkeletonCard() {
  return (
    <div className="skeleton-card d-flex flex-column" aria-hidden="true">
      <div className="skeleton-block skeleton-media" />
      <div className="p-3 d-flex flex-column flex-grow-1 gap-2">
        <div className="skeleton-block" style={{ height: '20px', width: '92%' }} />
        <div className="skeleton-block" style={{ height: '20px', width: '70%' }} />
        <div className="skeleton-block mt-2" style={{ height: '14px', width: '100%' }} />
        <div className="skeleton-block" style={{ height: '14px', width: '88%' }} />
        <div className="skeleton-block" style={{ height: '14px', width: '60%' }} />
        <div className="skeleton-block mt-auto" style={{ height: '36px', width: '120px', borderRadius: '8px' }} />
      </div>
    </div>
  );
}

export default SkeletonCard;
