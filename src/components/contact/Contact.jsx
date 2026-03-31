import React, { useState } from 'react';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de contacto:", formData);
    alert("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="contact-page">
      <div className="contact-container">
        <header className="contact-header">
          <h1>CONTACTO</h1>
          <div className="red-line"></div>
          <p>¿Tenés una noticia, querés publicitar o simplemente saludarnos? Escribinos.</p>
        </header>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h3>UBICACIÓN</h3>
              <p>San Miguel de Tucumán, Argentina</p>
            </div>
            <div className="info-item">
              <h3>TELÉFONO</h3>
              <p>+54 381 000-0000</p>
            </div>
            <div className="info-item">
              <h3>EMAIL</h3>
              <p>contacto@audiowave.com.ar</p>
            </div>
            <div className="social-links-contact">
              <div className="social-icon">IG</div>
              <div className="social-icon">FB</div>
              <div className="social-icon">TW</div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>NOMBRE COMPLETO</label>
              <input 
                type="text" 
                required 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>CORREO ELECTRÓNICO</label>
              <input 
                type="email" 
                required 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>ASUNTO</label>
              <input 
                type="text" 
                required 
                value={formData.subject} 
                onChange={(e) => setFormData({...formData, subject: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>MENSAJE</label>
              <textarea 
                rows="5" 
                required 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button type="submit" className="contact-submit-btn">ENVIAR MENSAJE</button>
          </form>
        </div>
      </div>
    </main>
  );
};