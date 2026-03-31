import React from 'react';
import { Link } from 'react-router-dom';
import './NewsFeed.css';

const NewsFeed = ({ news }) => {
  return (
    <div className="news-grid-container">
      {news.map((item) => (
        <article key={item.id} className="premium-card">
          <Link to={`/noticia/${item.id}`} className="card-link">
            <div className="card-image-box">
              <img src={item.imageUrl} alt={item.title} />
              <div className="card-overlay-gradient"></div>
            </div>
            <div className="card-text-box">
              <span className="card-date-label">{item.date}</span>
              <h3 className="card-title-text">{item.title}</h3>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default NewsFeed;