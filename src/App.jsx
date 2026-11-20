import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import Search from './pages/Search.jsx';

function App() {
  return (
    <div className="app-shell">
      <NavBar />
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
