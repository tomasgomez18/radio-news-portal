import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { Home } from './Home';
import { NewsDetail } from './pages/NewsDetaill';
import AdminOverlay from './components/adminPanel/AdminOverlay';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.altKey && e.key === 'A') {
        setShowAdmin((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticia/:id" element={<NewsDetail />} />
      </Routes>
      {showAdmin && <AdminOverlay onClose={() => setShowAdmin(false)} />}
    </Router>
  );
}

export default App;