import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
