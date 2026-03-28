import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & Pages
import Header from './components/layout/Header';
import PageTransition from './components/layout/PageTransition';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Artists from './pages/Artists';
import Events from './pages/Events';
import News from './pages/News';
import Shop from './pages/Shop';
import PostDetail from './pages/PostDetail';
import RegionGallery from './pages/Region';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
        <Route path="/artists" element={<PageTransition><Artists /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/news" element={<PageTransition><News /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/region/:regionId" element={<PageTransition><RegionGallery /></PageTransition>} />
        <Route path="/posts/:id" element={<PageTransition><PostDetail /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-background text-neutral-900 font-sans selection:bg-primary selection:text-white">
          <Header />
          
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}
