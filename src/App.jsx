import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-main container-fluid px-3 px-lg-4">
        <h1 className="page-heading">News - Top General Headlines</h1>
      </main>
      <Footer />
    </div>
  );
}

export default App;
