import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import './AdSlider.css'
import 'swiper/css';
import 'swiper/css/pagination';

const AdSlider = ({ ads = [] }) => {
  if (ads.length === 0) return null;
  return (
    <section className="ad-slider-container">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={15}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad.id}>
            <a href={ad.link} target="_blank" rel="noopener noreferrer" className="ad-link-wrapper">
              <div className="ad-card">
                <img src={ad.imageUrl} alt={ad.title || 'Publicidad'} className="ad-image" />
                <div className="ad-overlay"></div>
                {ad.title && <span className="ad-tagline">{ad.title}</span>}
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default AdSlider;