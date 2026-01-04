
import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import Admin from './pages/Admin';
import { trackPageView } from './utils/analytics';

// Page view tracker component
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      '/': 'Home',
      '/projects': 'Projects',
      '/experience': 'Experience',
      '/blog': 'Blog',
      '/admin': 'Admin',
    };
    const pageTitle = pageTitles[location.pathname] || 'Unknown';
    trackPageView(location.pathname, pageTitle);
  }, [location]);

  return null;
};

const App = () => {
  return (
    <Router>
      <PageTracker />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
