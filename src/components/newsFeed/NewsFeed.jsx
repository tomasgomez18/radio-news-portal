import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './NewsFeed.css';

const NewsFeed = ({ news }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      // Ancho de la tarjeta (290px) + espacio (20px)
      const CARD_WIDTH_WITH_GAP = 310;
      const scrollAmount = direction === 'left' ? -CARD_WIDTH_WITH_GAP : CARD_WIDTH_WITH_GAP;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="news-wrapper">
      <button className="scroll-btn left" onClick={() => scroll('left')}>
        &#10094;
      </button>
      <div className="news-grid-container" ref={scrollRef}>
        {news.map((item) => (
          <article key={item.id} className="premium-card">
            <Link to={`/noticia/${item.id}`} className="card-link">
              <div className="card-image-box">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="card-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('no-image');
                  }}
                />
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

      <button className="scroll-btn right" onClick={() => scroll('right')}>
        &#10095;
      </button>
    </div>
  );
};

export default NewsFeed;