import React, { useState, useEffect } from 'react';
import AdSlider from './components/adSlider/AdSlider';
import Categories from './components/categories/Categories';
import NewsFeed from './components/newsFeed/NewsFeed';

export const Home = () => {
  const [ads, setAds] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Leemos del localStorage lo que cargó el Admin
    const storedAds = JSON.parse(localStorage.getItem('radio_ads')) || [];
    const storedNews = JSON.parse(localStorage.getItem('radio_news')) || [];

    setAds(storedAds);
    setNews(storedNews);
  }, []);

  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>
      {/* Solo mostramos el slider si hay publicidades */}
      {ads.length > 0 && <AdSlider ads={ads} />}
      
      <Categories />
      
      <section className="news-feed-section">
        {/* Le pasamos las noticias al feed */}
        <NewsFeed news={news} />
      </section>
    </main>
  );
};