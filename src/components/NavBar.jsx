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

function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const closeMenu = () => setIsExpanded(false);

  return (
    <nav className="navbar navbar-expand-xl navbar-dark sticky-top custom-navbar">
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

          <div className="d-flex mt-2 mt-xl-0">
            <SearchBar onSearchSubmit={closeMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
