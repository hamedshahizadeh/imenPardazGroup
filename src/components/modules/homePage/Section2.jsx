"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function ContinuousSlider() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📦 دریافت داده از API
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch("/api/dashboard/organ");
        const data = await res.json();

        if (res.ok && Array.isArray(data.organization)) {
          setOrganizations(data.organization);
        } else {
          console.error("Data is not an array:", data);
          setOrganizations([]);
        }
      } catch (error) {
        console.error("خطا در دریافت سازمان‌ها:", error);
        setOrganizations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  // 📌 در صورت خالی بودن دیتابیس
  if (!organizations || organizations.length === 0) {
    return (
      <div className="bg-gray-950 text-gray-400 text-center py-10">
      .
      </div>
    );
  }

  // تکرار تصاویر برای پیوستگی حرکت
  const repeatedImages = [...organizations, ...organizations];

  return (
    <div
      className="w-full overflow-hidden bg-gray-950 py-6 container select-none"
      onContextMenu={(e) => e.preventDefault()} // ❌ غیرفعال کردن کلیک راست
    >
      <div className="relative">
        {/* ✅ اسلایدر اصلی */}
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
          {repeatedImages.map((org, idx) => (
            <SwiperSlide
              key={idx}
              className="flex-shrink-0 w-32 md:w-36 lg:w-40"
            >
              <Image
                src={`/api/dashboard/organ/${encodeURIComponent(org.image)}`}
                alt={`slide-${idx}`}
                width={160}
                height={160}
                className="w-full h-16 md:h-20 lg:h-32 object-contain rounded-lg"
                priority
                draggable={false} // 🔒 جلوگیری از درگ تصویر
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
