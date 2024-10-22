import React, { useRef, useState } from 'react';

import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './slider.scss';

const Slider = (props: any) => {
  const { data } = props;

  const items = data.map((item: any, i: any) => {
    return (
      <SwiperSlide key={i}>
        <div className="slider__item">
          <div className="slider__item-wrapper">
            <img src={item.image} alt="" className="slider__item-img" />
          </div>
          <h3 className="slider__item-name">{item.name}</h3>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div className="slider">
      <div className="slider__btns">
        <button className="swiper-button-prev">
          <SlArrowLeft className="swiper-button-icon" />
        </button>
        <button className="swiper-button-next">
          <SlArrowRight className="swiper-button-icon" />
        </button>
      </div>
      <Swiper
        className="swiper"
        slidesPerView={2.7}
        // spaceBetween={30}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        modules={[Navigation]}
        // breakpoints={{
        //   // when window width is >= 320px
        //   320: {
        //     slidesPerView: 1,
        //     // spaceBetween: 20
        //   },
        //   // when window width is >= 480px
        //   480: {
        //     slidesPerView: 1,
        //     // spaceBetween: 30
        //   },
        //   // when window width is >= 640px
        //   640: {
        //     slidesPerView: 3,
        //     spaceBetween: 40,
        //   },
        // }}
      >
        {items}
      </Swiper>
    </div>
  );
};

export default Slider;
