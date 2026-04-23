"use client";
import { Carousel } from "@/shared/Carousel";
import { SwiperSlide, useSwiper } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, isValidElement, type ReactNode } from "react";

interface BestsSalonsCarouselProps {
  children: ReactNode;
}

function BestsSalonsArrows() {
  const swiper = useSwiper();
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between p-0">
      <button
        type="button"
        onClick={() => swiper?.slidePrev()}
        className="pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100"
        aria-label="Предыдущие"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        type="button"
        onClick={() => swiper?.slideNext()}
        className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100"
        aria-label="Следующие"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}

export function BestsSalonsCarousel({ children }: BestsSalonsCarouselProps) {
  return (
    <div className="group relative">
      <Carousel>
        {Children.map(children, (child) =>
          isValidElement(child) ? (
            <SwiperSlide className="p-1" key={child.key}>
              {child}
            </SwiperSlide>
          ) : null
        )}
        <BestsSalonsArrows />
      </Carousel>
    </div>
  );
}
