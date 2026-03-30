import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  useEffect(() => {
    const allNews = JSON.parse(localStorage.getItem('radio_news')) || [];
    const found = allNews.find(item => item.id === parseInt(id));
    setArticle(found);
    window.scrollTo(0, 0); 
  }, [id]);
  if (!article) return <p style={{color: 'white', textAlign: 'center'}}>Noticia no encontrada...</p>;
  return (
    <article style={{ background: '#000', color: '#fff', padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <header>
        <span style={{ color: '#ff0000', fontWeight: 'bold' }}>{article.category}</span>
        <h1 style={{ fontSize: '2.8rem', margin: '20px 0' }}>{article.title}</h1>
        <p style={{ color: '#666' }}>{article.date}</p>
      </header>
      <img src={article.imageUrl} alt={article.title} style={{ width: '100%', borderRadius: '12px', margin: '30px 0' }} />
      <div style={{ lineHeight: '1.8', fontSize: '1.2rem', whiteSpace: 'pre-wrap' }}>
        {article.fullBody}
      </div>
    </article>
  );
};  