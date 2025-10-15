"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaQuoteLeft } from "react-icons/fa";

export default function TestimonialsSlider() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📦 دریافت داده از API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/dashboard/feedback");
        const data = await res.json();

        if (res.ok && Array.isArray(data.reviews)) {
          // ✅ جدیدترین‌ها اول
          setReviews(data.reviews.reverse());
        } else {
          console.error("داده‌ها معتبر نیستند:", data);
          setReviews([]);
        }
      } catch (error) {
        console.error("❌ خطا در دریافت نظرات:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // 🔸 حالت بارگذاری
  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10">

      </div>
    );
  }

  // 🔸 در صورت خالی بودن داده‌ها
  if (reviews.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
  
      </div>
    );
  }

  // ✅ ترکیب داده‌ها با خودش برای تکرار دوباره
  const doubledReviews = [...reviews, ...reviews];

  return (
    <div className="relative py-10 container">
      <h3 className="flex items-center gap-3 text-base font-bold text-white mb-2 md:mb-4 lg:mb-6">
        <span className="text-[#49C5B6] text-xl">
          <FaQuoteLeft className="animate-bounce" />
        </span>
        <span className="bg-gradient-to-r from-[#49C5B6] via-[#2AC8B5] to-[#31CCBA] bg-clip-text text-transparent">
          نظرات مشتریان
        </span>
      </h3>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        speed={120000} // ✅ حرکت بسیار نرم و آرام
        breakpoints={{
          1536: { slidesPerView: 4 },
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {doubledReviews.map((item, index) => (
          <SwiperSlide key={`${item._id}-${index}`}>
            <div className="relative h-40 p-4 rounded-xl shadow-md bg-gray-800/50 backdrop-blur-[4px] text-white overflow-hidden">
              <div className="absolute inset-0 rounded-xl pointer-events-none z-0 border-4 border-transparent animate-shooting-border"></div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/images/user.jpeg"
                    alt={item.name}
                    className="w-8 h-8 object-cover rounded-lg"
                  />
                  <span className="font-medium text-[#49C5B6] text-sm">
                    {item.name}
                  </span>
                </div>

                <p className="text-gray-300 text-xs leading-relaxed overflow-hidden line-clamp-4 text-justify font-medium">
                  {item.text}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
