import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import Search from './pages/Search.jsx';

const THEME_STORAGE_KEY = 'your-news-theme';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore localStorage errors in restricted environments
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-shell">
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <main className="app-main container-fluid px-3 px-lg-4 pb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:type" element={<Category />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
