import React, { useState } from 'react';
import NewsFeed from '../newsFeed/NewsFeed';
import './Categories.css';

const Categories = ({ news }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const categoriesList = ["Actualidad", "Deportes", "Música", "Tecnología"];

  const filteredNews = news.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="categories-wrapper">
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar noticias..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="home-content">
        {categoriesList.map(cat => {
          const categoryNews = filteredNews.filter(n => n.category === cat);
          
          if (categoryNews.length === 0) return null;

          return (
            <section key={cat} className="category-group" id={cat.toLowerCase()}>
              <div className="category-header">
                <h2>{cat}</h2>
                <div className="red-line"></div>
                <button className="view-all">Ver todo</button>
              </div>
              <NewsFeed news={categoryNews} />
            </section>
          );
        })}

        {filteredNews.length === 0 && searchTerm !== '' && (
          <p className="no-results-msg">No se encontraron noticias para "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default Categories;