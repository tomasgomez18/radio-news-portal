import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import NewsFeed from '../newsFeed/NewsFeed';
import './Categories.css';

const Categories = ({ news }) => {
  const { categoryName } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  if (categoryName) {
    const filteredCategoryNews = useMemo(() => {
      return news.filter(article =>
        article.category === categoryName && article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [news, categoryName, searchTerm]);

    return (
      <div className="categories-wrapper">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder={`Buscar en ${categoryName}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="home-content">
          <section className="category-group" id={categoryName.toLowerCase()}>
            <div className="category-header">
              <h2>{categoryName}</h2>
              <div className="red-line"></div>
              <Link to="/" className="view-all">← Volver al inicio</Link>
            </div>
            <NewsFeed news={filteredCategoryNews} />
            {filteredCategoryNews.length === 0 && (
              <p className="no-results-msg">
                {searchTerm
                  ? `No se encontraron noticias para "${searchTerm}" en ${categoryName}.`
                  : `No hay noticias en la categoría "${categoryName}".`
                }
              </p>
            )}
          </section>
        </div>
      </div>
    );
  }

  const categoriesList = ["Actualidad", "Deportes", "Música", "Tecnología"];
  const filteredNews = useMemo(() => {
    return news.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [news, searchTerm]);

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
                <Link to={`/categoria/${cat}`} className="view-all">Ver todo</Link>
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