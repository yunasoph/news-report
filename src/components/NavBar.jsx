import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';

const NAV_ITEMS = [
  { label: 'Home', to: '/', end: true },
  { label: 'General', to: '/category/general' },
  { label: 'Business', to: '/category/business' },
  { label: 'Sports', to: '/category/sports' },
  { label: 'Science', to: '/category/science' },
  { label: 'Health', to: '/category/health' },
  { label: 'Entertainment', to: '/category/entertainment' },
  { label: 'Technology', to: '/category/technology' },
];

function NavBar({ theme = 'dark', onToggleTheme }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const closeMenu = () => setIsExpanded(false);
  const isLight = theme === 'light';

  return (
    <nav
      className={`navbar navbar-expand-xl ${
        isLight ? 'navbar-light' : 'navbar-dark'
      } sticky-top custom-navbar`}
    >
      <div className="container-fluid px-3 px-lg-4">
        <Link className="brand-link me-lg-3" to="/" onClick={closeMenu}>
          <span className="brand-logo-badge" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="5" width="7" height="7" rx="1.2" fill="#ffffff" />
              <rect x="13" y="5.5" width="7" height="2" rx="1" fill="#ffffff" />
              <rect x="13" y="9.5" width="7" height="2" rx="1" fill="#ffffff" />
              <rect x="4" y="14.5" width="16" height="2" rx="1" fill="#ffffff" />
              <rect x="4" y="18.5" width="11" height="2" rx="1" fill="#ffffff" />
            </svg>
          </span>
          <span>Your News</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-xl-0 ms-xl-2 gap-xl-1">
            {NAV_ITEMS.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  to={item.to}
                  end={Boolean(item.end)}
                  className={({ isActive }) =>
                    `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-column flex-xl-row align-items-stretch align-items-xl-center gap-2 mt-2 mt-xl-0">
            <SearchBar onSearchSubmit={closeMenu} />
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
              title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {isLight ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
              <span>{isLight ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
