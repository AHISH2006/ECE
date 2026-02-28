import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import TechnicalPage from './pages/TechnicalPage';
import NonTechnicalPage from './pages/NonTechnicalPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import LoadingPage from './components/LoadingPage';
import CircuitBackground from './components/CircuitBackground';
import PageTransition from './components/PageTransition';
import bgMusic from './assets/sounds/background audio.mpeg';
import './index.css';

function GlobalAudio() {
  const location = useLocation();
  const audioRef = React.useRef(null);
  const [isMuted, setIsMuted] = React.useState(() => {
    // Read preference on load. If soundEnabled wasn't true, start muted.
    return sessionStorage.getItem('soundEnabled') !== 'true';
  });
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // isSoundEnabled checked only on initial mount to see if we're entirely blocked from audio,
    // but the mute toggle lets us bypass it.
    const isMainPage = location.pathname !== '/' && location.pathname !== '/loading';

    setIsVisible(isMainPage);

    const tryPlayAudio = () => {
      if (isMainPage && !isMuted && audioRef.current) {
        audioRef.current.volume = 0.4;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.warn('Global audio blocked by browser, waiting for user interaction');
          });
        }
      }
    };

    // Attempt to play on mount/route change
    tryPlayAudio();

    // Browser blocks audio until user interacts with the page once it loads Home
    const handleInteraction = () => {
      tryPlayAudio();
      // Remove listener once we have interacted
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    if (!isMainPage || isMuted) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [location.pathname, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} src={bgMusic} loop />
      <AnimatePresence>
        {isVisible && (
          <motion.button
            className="global-mute-btn"
            onClick={toggleMute}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isMuted ? "Unmute Background Audio" : "Mute Background Audio"}
          >
            {isMuted ? '🔇' : '🔊'}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}



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
      <GlobalAudio />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
