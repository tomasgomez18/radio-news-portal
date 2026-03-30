import { Link } from 'react-router-dom';

const NewsFeed = ({ news }) => {
  return (
    <div className="news-container">
      {news.map((item) => (
        <article key={item.id} className="news-item">
          {/* Usamos Link de react-router-dom para ir al detalle */}
          <Link to={`/noticia/${item.id}`} className="news-link">
            <img src={item.imageUrl} alt={item.title} />
            <div className="news-info">
              <span className="category">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.date}</p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default NewsFeed;