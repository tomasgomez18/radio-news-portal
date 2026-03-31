import React from 'react';
import AdSlider from './components/adSlider/AdSlider';
import Categories from './components/categories/Categories';

export const Home = ({ news, ads }) => {
  return (
    <main className="home-container">
      {ads.length > 0 && <AdSlider ads={ads} />}
      <Categories news={news} />
    </main>
  );
};