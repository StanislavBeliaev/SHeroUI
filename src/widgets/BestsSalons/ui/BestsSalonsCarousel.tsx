"use client";
import {SalonCard} from "@/entities/salon-card/ui";
import type {SalonItem} from "@/services/salonService/types";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";

interface BestsSalonsCarouselProps {
    salons: SalonItem[];
}

export function BestsSalonsCarousel({salons}: BestsSalonsCarouselProps) {
    return (
        <Swiper
            className="w-full min-w-0"
            spaceBetween={14}
            slidesPerView={4}
            observer
            observeParents
            updateOnWindowResize
            breakpoints={{
                320: {slidesPerView: 1.2},
                640: {slidesPerView: 2},
                1024: {slidesPerView: 3},
                1280: {slidesPerView: 4},
            }}
        >
            {salons.map((salon) => (
                <SwiperSlide key={salon.id} className="p-1">
                    <SalonCard {...salon}/>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
