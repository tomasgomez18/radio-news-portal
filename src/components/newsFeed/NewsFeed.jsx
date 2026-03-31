import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NewsFeed.css';

const NewsFeed = ({ news }) => {
  const scrollRef = useRef(null);
  const wrapperRef = useRef(null);
  const canAnimate = news.length > 3; 
  useEffect(() => {
    if (!canAnimate) return;
    const container = scrollRef.current;
    const wrapper = wrapperRef.current;
    let animationId;
    let isHovered = false;
    const play = () => {
      if (!isHovered && container) {
        container.scrollLeft += 0.5; 
        const scrollHalf = container.scrollWidth / 2 + 10; 
        if (container.scrollLeft >= scrollHalf) {
          container.scrollLeft -= scrollHalf;
        }
      }
      animationId = requestAnimationFrame(play);
    };
    play();
    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };
    if (wrapper) {
      wrapper.addEventListener('mouseenter', handleMouseEnter);
      wrapper.addEventListener('mouseleave', handleMouseLeave);
      wrapper.addEventListener('touchstart', handleMouseEnter, { passive: true });
      wrapper.addEventListener('touchend', handleMouseLeave);
    }
    return () => {
      cancelAnimationFrame(animationId);
      if (wrapper) {
        wrapper.removeEventListener('mouseenter', handleMouseEnter);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
        wrapper.removeEventListener('touchstart', handleMouseEnter);
        wrapper.removeEventListener('touchend', handleMouseLeave);
      }
    };
  }, [canAnimate]);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollHalf = container.scrollWidth / 2 + 10;
      if (direction === 'left' && container.scrollLeft <= 0 && canAnimate) {
        container.scrollLeft += scrollHalf; 
      }
      const CARD_WIDTH_WITH_GAP = 310;
      const scrollAmount = direction === 'left' ? -CARD_WIDTH_WITH_GAP : CARD_WIDTH_WITH_GAP;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  return (
    <div className="news-wrapper" ref={wrapperRef}>
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
                  alt="" 
                  className="card-img"
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
        {canAnimate && news.map((item) => (
          <article key={`${item.id}-clone`} className="premium-card" aria-hidden="true">
            <Link to={`/noticia/${item.id}`} className="card-link" tabIndex="-1">
              <div className="card-image-box">
                <img 
                  src={item.imageUrl} 
                  alt="" 
                  className="card-img"
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