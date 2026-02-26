import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import TechnicalPage from './pages/TechnicalPage';
import NonTechnicalPage from './pages/NonTechnicalPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import LoadingPage from './components/LoadingPage';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingPage onComplete={() => setIsLoading(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/technical" element={<TechnicalPage />} />
        <Route path="/non-technical" element={<NonTechnicalPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
