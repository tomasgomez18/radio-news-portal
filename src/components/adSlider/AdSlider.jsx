import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './AdSlider.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const AdSlider = ({ ads = [] }) => {
  if (ads.length === 0) return null;

  return (
    <section className="ad-slider-container">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
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
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <div className="ad-card">
                <img src={ad.imageUrl} alt={ad.title} className="ad-image" />
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