import React from 'react';
import AdSlider from './components/adSlider/AdSlider';
import Categories from './components/categories/Categories';

export const Home = () => {
  const adsData = [
    { id: 1, imageUrl: 'https://picsum.photos/seed/radio1/800/200', link: '#' },
    { id: 2, imageUrl: 'https://picsum.photos/seed/radio2/800/200', link: '#' }
  ];
  return (
    <main>
      <p>Espacio publicitario</p>
      <AdSlider ads={adsData} />
      <Categories />
      <section className="news-feed">
      </section>
    </main>
  );
};