import React, { ReactNode } from "react";
import { Swiper as SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";

// html 태그
interface SlideItem {
  content: ReactNode;
}

interface SwiperProps {
  spaceBetween: number;
  effect: string;
  navigation: boolean;
  pagination: {
    clickable: boolean;
  };
  modules: any[];
  className: string;
  slides: SlideItem[];
}

const Swiper: React.FC<SwiperProps> = ({
  spaceBetween,
  effect,
  navigation,
  pagination,
  modules,
  className,
  slides,
}) => {
  const defaultPagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + "</span>";
    },
  };

  return (
    <>
      <SwiperClass
        spaceBetween={spaceBetween}
        effect={effect}
        navigation={navigation}
        pagination={defaultPagination}
        modules={[Pagination]}
        className={className}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide.content}</SwiperSlide>
        ))}
      </SwiperClass>
    </>
  );
};

export default Swiper;
