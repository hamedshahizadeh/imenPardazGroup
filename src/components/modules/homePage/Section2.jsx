"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function ContinuousSlider() {
  const images = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
    "/images/6.png",
    "/images/7.png",
    "/images/8.png",
    "/images/9.png",
    "/images/10.png",
  ];

  const repeatedImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden bg-gray-950 py-6 container">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView="auto"
        loop={true}
        speed={15000} // حرکت پیوسته آرام
        autoplay={{
          delay: 0, // بدون مکث
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        breakpoints={{
          100: { slidesPerView: 3 },
          360: { slidesPerView: 3 },
          500: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
        }}
        allowTouchMove={true}
      >
        {repeatedImages.map((src, idx) => (
          <SwiperSlide
            key={idx}
            className="flex-shrink-0 w-32 md:w-36 lg:w-40"
          >
            <Image
              src={src}
              alt={`slide-${idx}`}
              width={160} // عرض تقریبی
              height={160} // ارتفاع تقریبی
              className="w-full h-16 md:h-20 lg:h-32 object-contain rounded-lg"
              priority={true} // برای لود سریع‌تر تصاویر اولیه
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
