import React, { useState, useEffect } from 'react';
import './AdminOverlay.css';

const AdminOverlay = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('news');
  const [newsList, setNewsList] = useState([]);
  const [adsList, setAdsList] = useState([]);
  const [mediaList, setMediaList] = useState([]);

  const [newsForm, setNewsForm] = useState({ id: null, title: '', category: 'Actualidad', imageUrl: '', fullBody: '' });
  const [adForm, setAdForm] = useState({ id: null, imageUrl: '', link: '' });
  const [seoForm, setSeoForm] = useState({ siteTitle: '', metaDescription: '', keywords: '' });
  const [imageInput, setImageInput] = useState('');
  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem('radio_news')) || [];
    const storedAds = JSON.parse(localStorage.getItem('radio_ads')) || [];
    const storedMedia = JSON.parse(localStorage.getItem('radio_media')) || [];
    const storedSEO = JSON.parse(localStorage.getItem('radio_seo')) || { siteTitle: '', metaDescription: '', keywords: '' };
    
    setNewsList(storedNews);
    setAdsList(storedAds);
    setMediaList(storedMedia);
    setSeoForm(storedSEO);
  }, []);
  const handleSaveNews = () => {
    if (!newsForm.title || !newsForm.imageUrl || !newsForm.fullBody) return alert("Faltan campos obligatorios.");
    const updated = newsForm.id 
      ? newsList.map(n => n.id === newsForm.id ? { ...newsForm, date: n.date } : n)
      : [{ ...newsForm, id: Date.now(), date: new Date().toLocaleDateString() }, ...newsList];
    
    localStorage.setItem('radio_news', JSON.stringify(updated));
    setNewsList(updated);
    setNewsForm({ id: null, title: '', category: 'Actualidad', imageUrl: '', fullBody: '' });
    alert("Noticia guardada.");
    window.location.reload();
  };

  const deleteNews = (id) => {
    if (window.confirm("¿Borrar noticia?")) {
      const filtered = newsList.filter(n => n.id !== id);
      localStorage.setItem('radio_news', JSON.stringify(filtered));
      setNewsList(filtered);
    }
  };
  const handleSaveAd = () => {
    if (!adForm.imageUrl) return alert("La URL de imagen es necesaria.");
    const updated = adForm.id 
      ? adsList.map(a => a.id === adForm.id ? adForm : a)
      : [{ ...adForm, id: Date.now() }, ...adsList];
    
    localStorage.setItem('radio_ads', JSON.stringify(updated));
    setAdsList(updated);
    setAdForm({ id: null, imageUrl: '', link: '' });
    alert("Banner guardado.");
    window.location.reload();
  };
  const deleteAd = (id) => {
    const filtered = adsList.filter(a => a.id !== id);
    localStorage.setItem('radio_ads', JSON.stringify(filtered));
    setAdsList(filtered);
  };
  const handleAddImage = () => {
    if (!imageInput) return;
    const updated = [imageInput, ...mediaList];
    localStorage.setItem('radio_media', JSON.stringify(updated));
    setMediaList(updated);
    setImageInput('');
  };
  const deleteImage = (index) => {
    const filtered = mediaList.filter((_, i) => i !== index);
    localStorage.setItem('radio_media', JSON.stringify(filtered));
    setMediaList(filtered);
  };
  const handleSaveSEO = () => {
    localStorage.setItem('radio_seo', JSON.stringify(seoForm));
    document.title = seoForm.siteTitle || "AudioWave";
    alert("SEO actualizado.");
  };

  return (
    <div className="admin-overlay-backdrop">
      <div className="admin-dashboard">
        <aside className="admin-sidebar">
          <div className="admin-logo"><h3>AUDIO<span>WAVE</span></h3></div>
          <nav>
            <button className={activeTab === 'news' ? 'active' : ''} onClick={() => setActiveTab('news')}>Noticias</button>
            <button className={activeTab === 'ads' ? 'active' : ''} onClick={() => setActiveTab('ads')}>Publicidad</button>
            <button className={activeTab === 'images' ? 'active' : ''} onClick={() => setActiveTab('images')}>Imágenes</button>
            <button className={activeTab === 'seo' ? 'active' : ''} onClick={() => setActiveTab('seo')}>SEO</button>
          </nav>
          <button className="exit-btn" onClick={onClose}>Salir del Panel</button>
        </aside>

        <main className="admin-main">
          {activeTab === 'news' && (
            <div className="admin-grid">
              <section className="admin-form-side">
                <h2>{newsForm.id ? 'Editar Noticia' : 'Nueva Noticia'}</h2>
                <div className="form-group"><label>Título</label><input type="text" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} /></div>
                <div className="form-group"><label>URL Imagen</label><input type="text" value={newsForm.imageUrl} onChange={e => setNewsForm({...newsForm, imageUrl: e.target.value})} /></div>
                <div className="form-group"><label>Categoría</label>
                  <select value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value})}>
                    <option value="Actualidad">Actualidad</option><option value="Deportes">Deportes</option><option value="Tecnología">Tecnología</option>
                  </select>
                </div>
                <div className="form-group"><label>Contenido Completo</label><textarea rows="8" value={newsForm.fullBody} onChange={e => setNewsForm({...newsForm, fullBody: e.target.value})}></textarea></div>
                <button className="primary-btn" onClick={handleSaveNews}>Guardar Noticia</button>
              </section>
              <section className="admin-list-side">
                <h3>Historial</h3>
                <div className="admin-scroll-list">
                  {newsList.map(n => (
                    <div key={n.id} className="admin-item">
                      <span>{n.title}</span>
                      <div className="item-btns"><button onClick={() => setNewsForm(n)}>Edit</button><button className="del" onClick={() => deleteNews(n.id)}>X</button></div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="admin-grid">
              <section className="admin-form-side">
                <h2>Banners</h2>
                <div className="form-group"><label>Imagen Banner</label><input type="text" value={adForm.imageUrl} onChange={e => setAdForm({...adForm, imageUrl: e.target.value})} /></div>
                <div className="form-group"><label>Link Destino</label><input type="text" value={adForm.link} onChange={e => setAdForm({...adForm, link: e.target.value})} /></div>
                <button className="primary-btn" onClick={handleSaveAd}>Guardar Banner</button>
              </section>
              <section className="admin-list-side">
                <h3>Activos</h3>
                <div className="ads-preview-grid">
                  {adsList.map(a => (
                    <div key={a.id} className="ad-mini-card"><img src={a.imageUrl} alt="" /><button onClick={() => deleteAd(a.id)}>Borrar</button></div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="admin-full-content">
              <h2>Biblioteca de Medios</h2>
              <div className="form-row">
                <input type="text" value={imageInput} placeholder="Pegar URL de imagen..." onChange={e => setImageInput(e.target.value)} />
                <button className="primary-btn" onClick={handleAddImage}>Agregar</button>
              </div>
              <div className="media-grid">
                {mediaList.map((img, i) => (
                  <div key={i} className="media-box">
                    <img src={img} alt="" />
                    <button className="copy-btn" onClick={() => {navigator.clipboard.writeText(img); alert("URL Copiada")}}>Copiar URL</button>
                    <button className="del-btn" onClick={() => deleteImage(i)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'seo' && (
            <div className="admin-full-content seo-form">
              <h2>Configuración SEO</h2>
              <div className="form-group"><label>Título del Sitio</label><input type="text" value={seoForm.siteTitle} onChange={e => setSeoForm({...seoForm, siteTitle: e.target.value})} /></div>
              <div className="form-group"><label>Meta Descripción</label><textarea value={seoForm.metaDescription} onChange={e => setSeoForm({...seoForm, metaDescription: e.target.value})}></textarea></div>
              <div className="form-group"><label>Keywords</label><input type="text" value={seoForm.keywords} onChange={e => setSeoForm({...seoForm, keywords: e.target.value})} /></div>
              <button className="primary-btn" onClick={handleSaveSEO}>Actualizar SEO</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminOverlay;