import React, { useState, useEffect } from 'react';
import './AdminOverlay.css';

const AdminOverlay = ({ news, ads, onClose, onDataUpdate }) => {
  const [activeTab, setActiveTab] = useState('news');

  const [newsForm, setNewsForm] = useState({ id: null, title: '', category: 'Actualidad', imageUrl: '', fullBody: '' });
  const [adForm, setAdForm] = useState({ id: null, title: '', imageUrl: '', link: '' });
  const [seoForm, setSeoForm] = useState({ siteTitle: '', metaDescription: '', keywords: '' });

  useEffect(() => {
    const storedSEO = JSON.parse(localStorage.getItem('radio_seo')) || { siteTitle: '', metaDescription: '', keywords: '' };
    setSeoForm(storedSEO);
  }, []);

  const handleSaveNews = () => {
    if (!newsForm.title || !newsForm.imageUrl || !newsForm.fullBody) return alert("Faltan campos.");
    const currentNews = JSON.parse(localStorage.getItem('radio_news')) || [];
    const updated = newsForm.id 
      ? currentNews.map(n => n.id === newsForm.id ? { ...newsForm, date: n.date } : n)
      : [{ ...newsForm, id: Date.now(), date: new Date().toLocaleDateString() }, ...currentNews];
    localStorage.setItem('radio_news', JSON.stringify(updated));
    onDataUpdate();
    setNewsForm({ id: null, title: '', category: 'Actualidad', imageUrl: '', fullBody: '' }); // Limpiar formulario
  };

  const handleSaveAd = () => {
    if (!adForm.imageUrl) return alert("Falta la URL de la imagen.");
    const currentAds = JSON.parse(localStorage.getItem('radio_ads')) || [];
    const updated = adForm.id 
      ? currentAds.map(a => a.id === adForm.id ? adForm : a)
      : [{ ...adForm, id: Date.now() }, ...currentAds];
    localStorage.setItem('radio_ads', JSON.stringify(updated));
    onDataUpdate();
    setAdForm({ id: null, title: '', imageUrl: '', link: '' }); 
  };

  const handleSaveSEO = () => {
    localStorage.setItem('radio_seo', JSON.stringify(seoForm));
    document.title = seoForm.siteTitle || "AudioWave";
    alert("SEO actualizado.");
  };

  const handleDeleteNews = (id) => {
    const currentNews = JSON.parse(localStorage.getItem('radio_news')) || [];
    const filtered = currentNews.filter(x => x.id !== id);
    localStorage.setItem('radio_news', JSON.stringify(filtered));
    onDataUpdate();
  };

  const handleDeleteAd = (id) => {
    const currentAds = JSON.parse(localStorage.getItem('radio_ads')) || [];
    const filtered = currentAds.filter(x => x.id !== id);
    localStorage.setItem('radio_ads', JSON.stringify(filtered));
    onDataUpdate();
  };

  return (
    <div className="admin-overlay-backdrop">
      <div className="admin-dashboard">
        <aside className="admin-sidebar">
          <div className="admin-logo"><h3>AUDIO<span>WAVE</span></h3></div>
          <nav>
            <button className={activeTab === 'news' ? 'active' : ''} onClick={() => setActiveTab('news')}>Noticias</button>
            <button className={activeTab === 'ads' ? 'active' : ''} onClick={() => setActiveTab('ads')}>Publicidad</button>
            <button className={activeTab === 'seo' ? 'active' : ''} onClick={() => setActiveTab('seo')}>SEO</button>
          </nav>
          <button className="exit-btn" onClick={onClose}>Salir</button>
        </aside>
        <main className="admin-main">
          {activeTab === 'news' && (
            <div className="admin-grid">
              <section className="admin-form-side">
                <h2>{newsForm.id ? 'Editar' : 'Nueva'} Noticia</h2>
                <div className="form-group"><label>Título</label><input type="text" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} /></div>
                <div className="form-group"><label>URL Imagen</label><input type="text" value={newsForm.imageUrl} onChange={e => setNewsForm({...newsForm, imageUrl: e.target.value})} /></div>
                <div className="form-group">
                  <label>Categoría</label>
                  <select value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value})}>
                    <option value="Actualidad">Actualidad</option>
                    <option value="Deportes">Deportes</option>
                    <option value="Música">Música</option>
                    <option value="Tecnología">Tecnología</option>
                  </select>
                </div>
                <div className="form-group"><label>Contenido</label><textarea rows="6" value={newsForm.fullBody} onChange={e => setNewsForm({...newsForm, fullBody: e.target.value})}></textarea></div>
                <button className="primary-btn" onClick={handleSaveNews}>Guardar</button>
              </section>
              <section className="admin-list-side">
                <h3>Historial</h3>
                <div className="admin-scroll-list">
                  {news.map(n => (
                    <div key={n.id} className="admin-item">
                      <span>{n.title}</span>
                      <div className="item-btns">
                        <button onClick={() => setNewsForm(n)}>Edit</button>
                        <button className="del" onClick={() => handleDeleteNews(n.id)}>X</button>
                      </div>
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
                <div className="form-group"><label>Título (opcional)</label><input type="text" value={adForm.title} onChange={e => setAdForm({...adForm, title: e.target.value})} /></div>
                <div className="form-group"><label>URL Imagen</label><input type="text" value={adForm.imageUrl} onChange={e => setAdForm({...adForm, imageUrl: e.target.value})} /></div>
                <div className="form-group"><label>Link</label><input type="text" value={adForm.link} onChange={e => setAdForm({...adForm, link: e.target.value})} /></div>
                <button className="primary-btn" onClick={handleSaveAd}>Guardar</button>
              </section>
              <section className="admin-list-side">
                <h3>Activos</h3>
                <div className="ads-preview-grid">
                  {ads.map(a => (
                    <div key={a.id} className="ad-mini-card">
                      <img src={a.imageUrl} alt="" />
                      <div className="ad-card-btns">
                        <button onClick={() => setAdForm(a)}>Edit</button>
                        <button className="del" onClick={() => handleDeleteAd(a.id)}>X</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
          {activeTab === 'seo' && (
            <div className="admin-full-content seo-form">
              <h2>SEO</h2>
              <div className="form-group"><label>Título</label><input type="text" value={seoForm.siteTitle} onChange={e => setSeoForm({...seoForm, siteTitle: e.target.value})} /></div>
              <div className="form-group"><label>Meta</label><textarea rows="4" value={seoForm.metaDescription} onChange={e => setSeoForm({...seoForm, metaDescription: e.target.value})}></textarea></div>
              <button className="primary-btn" onClick={handleSaveSEO}>Guardar</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminOverlay;