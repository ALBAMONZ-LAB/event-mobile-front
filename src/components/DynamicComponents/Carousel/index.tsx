'use client';

import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { slideImage, swiperSlide } from "./Carousel.css";
import { useEffect, useRef } from 'react';

export interface CarouselProps {
  items: string[];
}

export const Carousel = ({ items }: CarouselProps) => {
  const loopItems = items.filter(item => item !== '').length > 3 ? items : [...items, ...items];
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current?.autoplay?.start) {
      swiperRef.current.autoplay.start();
    }
  }, [items]);

  return (
    <Swiper
      slidesPerView={2}
      centeredSlides={true}
      loop={true}
      spaceBetween={15}
      autoplay={{
        delay: 2000,
        disableOnInteraction: true,
      }}
      effect="coverflow"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      initialSlide={1} // 0 부터 시작할 경우 이전 이미지가 없기때문에 index[1] 부터 시작.
      modules={[EffectCoverflow, Autoplay]}
      speed={1500}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
    >
      {loopItems.map(
        (item, idx) =>
          item && (
            <SwiperSlide key={'CAROUSEL_' + idx}
                          // TODO vanilla-extract 변경으로 인하여 css 수기 적용 필요
                         //className={swiperSlide}
            >
              <img
                src={item}
                //className={slideImage}
                alt={`carousel-${idx}`}
              />
            </SwiperSlide>
          ),
      )}
    </Swiper>
  );
};
