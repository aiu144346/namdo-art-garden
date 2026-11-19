import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

// Layout & Eager Home Page
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import Home from './pages/Home';
import { getAdminConfig } from './utils/adminStorage';

// Lazy-loaded Route Pages for Fast Initial Load
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Artists = lazy(() => import('./pages/Artists'));
const Events = lazy(() => import('./pages/Events'));
const News = lazy(() => import('./pages/News'));
const Shop = lazy(() => import('./pages/Shop'));
const PostDetail = lazy(() => import('./pages/PostDetail'));
const RegionGallery = lazy(() => import('./pages/Region'));
const GardenDetail = lazy(() => import('./pages/GardenDetail'));
const GardensHub = lazy(() => import('./pages/GardensHub'));
const PostsArchive = lazy(() => import('./pages/PostsArchive'));
const AdminPortal = lazy(() => import('./pages/Admin'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const adminConfig = getAdminConfig();
  const customAdminPath = adminConfig.adminPath !== '/admin' ? adminConfig.adminPath : null;

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/gardens" element={<PageTransition><GardensHub /></PageTransition>} />
          <Route path="/gardens/:gardenId" element={<PageTransition><GardenDetail /></PageTransition>} />
          <Route path="/posts" element={<PageTransition><PostsArchive /></PageTransition>} />
          <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
          <Route path="/artists" element={<PageTransition><Artists /></PageTransition>} />
          <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
          <Route path="/news" element={<PageTransition><News /></PageTransition>} />
          <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
          <Route path="/region/:regionId" element={<PageTransition><RegionGallery /></PageTransition>} />
          <Route path="/posts/:id" element={<PageTransition><PostDetail /></PageTransition>} />
          <Route path="/admin" element={<PageTransition><AdminPortal /></PageTransition>} />
          {customAdminPath && (
            <Route path={customAdminPath} element={<PageTransition><AdminPortal /></PageTransition>} />
          )}
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-background text-neutral-900 font-sans selection:bg-primary selection:text-white">
          <Header />
          
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
