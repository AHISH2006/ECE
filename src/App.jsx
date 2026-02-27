import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import TechnicalPage from './pages/TechnicalPage';
import NonTechnicalPage from './pages/NonTechnicalPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import LoadingPage from './components/LoadingPage';
import CircuitBackground from './components/CircuitBackground';
import PageTransition from './components/PageTransition';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();
  // Hide global circuit background on Intro (/) and Loading pages
  const hideBackground = ['/', '/loading'].includes(location.pathname);

  return (
    <>
      {!hideBackground && <CircuitBackground opacity={0.8} />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* IntroPage is the entry point — no shutter, no background */}
          <Route path="/" element={<PageTransition skip={true}><IntroPage /></PageTransition>} />
          {/* Loading page — reads sound preference from navigation state */}
          <Route path="/loading" element={<PageTransition skip={true}><LoadingPage /></PageTransition>} />
          <Route path="/home" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/technical" element={<PageTransition><TechnicalPage /></PageTransition>} />
          <Route path="/non-technical" element={<PageTransition><NonTechnicalPage /></PageTransition>} />
          <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
