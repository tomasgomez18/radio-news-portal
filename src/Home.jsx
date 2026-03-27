import React from 'react';
import AdSlider from './components/adSlider/AdSlider';

export const Home = () => {
  const adsData = [
    { id: 1, imageUrl: 'https://picsum.photos/seed/radio1/800/200', link: '#' },
    { id: 2, imageUrl: 'https://picsum.photos/seed/radio2/800/200', link: '#' }
  ];

  return (
    <main>
      <p>Espacio publicitario</p>
      <AdSlider ads={adsData} />
      <p>Categorias</p>
    </main>
  );
};