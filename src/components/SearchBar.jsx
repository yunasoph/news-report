import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchBar({ onSearchSubmit }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/search/')) {
      const rawQuery = location.pathname.slice('/search/'.length);
      try {
        setQuery(decodeURIComponent(rawQuery));
      } catch {
        setQuery(rawQuery);
      }
    } else {
      setQuery('');
    }
  }, [location.pathname]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    navigate(`/search/${encodeURIComponent(trimmed)}`);
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="search"
          className="form-control search-input"
          placeholder="Explore news..."
          aria-label="Search news articles"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="btn search-btn" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
