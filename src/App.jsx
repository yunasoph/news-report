import NavBar from './components/NavBar.jsx';
import NewsList from './components/NewsList.jsx';
import Footer from './components/Footer.jsx';

const PLACEHOLDER_ARTICLES = [
  {
    title: 'Global Summit Outlines Clean Energy Milestones for Next Decade',
    description:
      'Leaders and researchers met to review grid storage breakthroughs and cross-border renewable targets.',
    image: '',
    url: 'https://gnews.io/',
    publishedAt: '2026-11-20T08:30:00Z',
    source: { name: 'World Wire' },
  },
  {
    title: 'Breakthrough Telescope Array Captures Detailed Exoplanet Atmosphere',
    description:
      'Astronomers observed distinct water vapor and carbon signatures from an Earth-sized world.',
    image: '',
    url: 'https://gnews.io/#science',
    publishedAt: '2026-11-20T07:15:00Z',
    source: { name: 'Science Daily' },
  },
  {
    title: 'Domestic Cricket Season Opens with Thrilling Final-Over Finish',
    description:
      'Strong bowling in the death overs sealed an opening-day victory under lights.',
    image: '',
    url: 'https://gnews.io/#sports',
    publishedAt: '2026-11-20T06:00:00Z',
    source: { name: 'Sports Desk' },
  },
  {
    title: 'Semiconductor Manufacturing Expands with New Packaging Hubs',
    description: '',
    image: '',
    url: 'https://gnews.io/#tech',
    publishedAt: '2026-11-20T05:10:00Z',
    source: { name: 'Tech Chronicle' },
  },
];

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-main container-fluid px-3 px-lg-4">
        <h1 className="page-heading">News - Top General Headlines</h1>
        <NewsList articles={PLACEHOLDER_ARTICLES} loading={false} error="" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
