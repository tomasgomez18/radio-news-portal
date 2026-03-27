import React, { useState } from 'react';
import './Categories.css';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const sections = [
    {
      category: "Actualidad",
      articles: [
        { id: 1, title: "New law approved in the city council", date: "2026-03-27", imageUrl: "https://picsum.photos/seed/pol1/400/300" },
        { id: 2, title: "Local governor announces new infrastructure plan", date: "2026-03-26", imageUrl: "https://picsum.photos/seed/pol2/400/300" }
      ]
    },
    {
      category: "Deportes",
      articles: [
        { id: 3, title: "UTN Tucumán wins regional football tournament", date: "2026-03-25", imageUrl: "https://picsum.photos/seed/spo1/400/300" },
        { id: 4, title: "Local marathon scheduled for next Sunday", date: "2026-03-24", imageUrl: "https://picsum.photos/seed/spo2/400/300" }
      ]
    },
    {
      category: "Música",
      articles: [
        { id: 5, title: "Jazz festival starts this weekend at the theater", date: "2026-03-23", imageUrl: "https://picsum.photos/seed/cul1/400/300" }
      ]
    },
    {
      category: "Tecnología",
      articles: [
        { id: 6, title: "Tech giant announces new AI breakthrough", date: "2026-03-22", imageUrl: "https://picsum.photos/seed/tech1/400/300" }
      ]
    }    
  ];
  const filteredSections = sections.map(section => {
    return {
      ...section,
      articles: section.articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    };
  }).filter(section => section.articles.length > 0); 
  return (
    <div className="news-container">
      {/* Barra de búsqueda */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar noticias..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredSections.length === 0 && (
        <p className="no-results-msg">No se encontraron noticias para "{searchTerm}".</p>
      )}
      {filteredSections.map((section) => (
        <section 
          key={section.category} 
          id={section.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
          className="news-section"
        >
          <div className="section-header">
            <h2 className="category-title">{section.category}</h2>
            <div className="title-line"></div>
            <a href={`/categoria/${section.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="view-all-btn">
              Ver todo
            </a>
          </div>
          <div className="article-grid">
            {section.articles.map((article) => (
              <a key={article.id} href={`/news/${article.id}`} className="article-card">
                <div className="article-image-bg" style={{ backgroundImage: `url(${article.imageUrl})` }}>
                  <div className="article-content">
                    <span className="article-date">{article.date}</span>
                    <h3 className="article-title">{article.title}</h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Categories;