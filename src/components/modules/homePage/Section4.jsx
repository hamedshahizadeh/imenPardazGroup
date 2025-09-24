import Image from "next/image";
import React from "react";

import { TiTick } from "react-icons/ti";

export default function Section4() {
  const features = [
    "تهیه صورتهای مالی",
    "ایجاد اسناد مالی بصورت خودکار",
    "خروجی استاندارد دفاتر قانونی",
    "کدینگ بصورت ساختار درختی",
    "تقسیط هوشمند چکهای دریافتی",
    "امکان قفل گذاری روی اسناد",
  ];
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div className="flex justify-center order-2 ">
          <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center">
            <Image
              src="/images/i1.png"
              className="w-fit"
              width={400}
              height={400}
              priority
              alt="ویژگی های شاخص"
            />
          </div>
        </div>
        <div className="lg:max-w-[600px] order-1 ">
          <h3 className="text-sky-400 font-bold text-lg md:text-xl">
            ویژگیهای شاخص سیستم سرمایه انسانی
          </h3>
          <p className="text-gray-400 text-justify text-xs md:text-sm container mt-2 font-semibold leading-relaxed">
            سیستمهای یکپارچه مالی نقش بسیار مهمی در مدیریت و تصمیم گیری های
            اقتصادی ایفا می کنند.این سیستمها با جمع آوری ، پردازش و تحلیل داده
            های مالی سازمان ، اطلاعات دقیقی را فراهم می کنند که برای تصمیم گیری
            های استراتژیک و عملیاتی حیاتی هستند.
          </p>
          <ul className="flex flex-wrap ">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className="w-full sm:w-1/2 px-2 mt-4  flex items-center gap-2 font-bold text-xs lg:text-sm "
              >
                <span className=" text-white font-semibold text-base">
                  <TiTick
                    className=" w-[22px] h-[20px] text-white bg-sky-400 rounded-sm "
                    style={{ fontSize: "12px", lineHeight: "20px" }}
                  />
                </span>
                <h5 className="text-gray-400"> {feature}</h5>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
