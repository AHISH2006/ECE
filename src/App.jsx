import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import TechnicalPage from './pages/TechnicalPage';
import NonTechnicalPage from './pages/NonTechnicalPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import LoadingPage from './components/LoadingPage';
import './index.css';
import PageTransition from './components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><IntroPage /></PageTransition>} />
        <Route path="/home" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/technical" element={<PageTransition><TechnicalPage /></PageTransition>} />
        <Route path="/non-technical" element={<PageTransition><NonTechnicalPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Check if user has already seen the intro in this session
  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
  const [isLoading, setIsLoading] = useState(!hasSeenIntro);

  if (isLoading && !hasSeenIntro) {
    return <LoadingPage onComplete={() => setIsLoading(false)} />;
  }

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
