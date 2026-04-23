import { Swiper } from "swiper/react";
import "swiper/css";

export function Carousel({ children }: { children: React.ReactNode }) {
  return (
    <Swiper
      spaceBetween={7}
      slidesPerView={4}
      observer
      observeParents
      updateOnWindowResize
      breakpoints={{
        320: { slidesPerView: 1.2 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {children}
    </Swiper>
  );
}