import React, { useState, useEffect } from 'react';
import AdSlider from './components/adSlider/AdSlider';
import Categories from './components/categories/Categories';

export const Home = () => {
  const [ads, setAds] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const storedAds = JSON.parse(localStorage.getItem('radio_ads')) || [];
    const storedNews = JSON.parse(localStorage.getItem('radio_news')) || [];
    setAds(storedAds);
    setNews(storedNews);
  }, []);

  return (
    <main className="home-container">
      {ads.length > 0 && <AdSlider ads={ads} />}
      <Categories news={news} />
    </main>
  );
};