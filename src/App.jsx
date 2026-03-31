import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { Home } from './Home';
import { NewsDetail } from './pages/NewsDetaill';
import  Categories  from './components/categories/Categories';
import { Contact } from './components/contact/Contact';
import AdminOverlay from './components/adminPanel/AdminOverlay';
import { Footer }from './components/footer/Footer';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [news, setNews] = useState([]);
  const [ads, setAds] = useState([]);
  const handleDataUpdate = () => {
    const storedAds = JSON.parse(localStorage.getItem('radio_ads')) || [];
    const storedNews = JSON.parse(localStorage.getItem('radio_news')) || [];
    setAds(storedAds);
    setNews(storedNews);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.altKey && e.key === 'A') {
        setShowAdmin((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    handleDataUpdate();
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home news={news} ads={ads} />} />
        <Route path="/noticia/:id" element={<NewsDetail news={news} />} />
        <Route path="/categoria/:categoryName" element={<Categories news={news} />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
      {showAdmin && <AdminOverlay news={news} ads={ads} onClose={() => setShowAdmin(false)} onDataUpdate={handleDataUpdate} />}
        <Footer />
    </Router>
  );
}

export default App;