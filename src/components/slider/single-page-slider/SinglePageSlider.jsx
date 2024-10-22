import React, { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import './slider-property.scss';

const SinglePageSlider = ({ imgs, setOpenSlider }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const itemsTop = imgs?.map((item, i) => {
    return (
      <SwiperSlide key={i}>
        <div className="slider__item top">
          <div className="slider__item-wrapper top">
            <img src={item} alt="" className="slider__item-img top" />
          </div>
        </div>
      </SwiperSlide>
    );
  });

  const itemsBottom = imgs?.map((item, i) => {
    return (
      <SwiperSlide key={i}>
        <div className="slider__item">
          <div className="slider__item-wrapper">
            <img src={item} alt="" className="slider__item-img" />
          </div>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div className="slider-property">
      <IoClose className="slider-property__close" onClick={() => setOpenSlider(false)} />
      <button className="swiper-button-prev">
        <SlArrowLeft className="swiper-button-icon white" />
      </button>
      <button className="swiper-button-next">
        <SlArrowRight className="swiper-button-icon white" />
      </button>
      <Swiper
        className="property-swiper__top"
        // slidesPerView={2.7}
        // spaceBetween={30}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        loop={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[Navigation, FreeMode, Thumbs]}>
        {itemsTop}
      </Swiper>
      <Swiper
        className="property-swiper__bottom"
        // slidesPerView={2.7}
        // spaceBetween={30}
        // navigation={{
        //   prevEl: '.swiper-button-prev',
        //   nextEl: '.swiper-button-next',
        // }}
        onSwiper={setThumbsSwiper}
        loop={true}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        // thumbes={{ swiper: thumbsSwiper }}
        modules={[Navigation, FreeMode, Thumbs]}>
        {itemsBottom}
      </Swiper>
    </div>
  );
};

export default SinglePageSlider;
