import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './NewsDetail.css';

export const NewsDetail = ({ news }) => {
  const { id } = useParams();
  const article = news.find(item => item.id === parseInt(id));
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [id]);
  if (!article) {
    return <p className="news-not-found">Noticia no encontrada...</p>;
  }
  return (
    <article className="news-detail-article">
      <Link to="/" className="back-to-home-btn">← Volver al inicio</Link>
      <header className="news-detail-header">
        <span className="news-detail-category">{article.category}</span>
        <h1 className="news-detail-title">{article.title}</h1>
        <p className="news-detail-date">{article.date}</p>
      </header>
      <img src={article.imageUrl} alt={article.title} className="news-detail-image" loading="lazy" />
      <div className="news-detail-body">
        {article.fullBody}
      </div>
    </article>
  );
};  