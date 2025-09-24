import Image from "next/image";
import React from "react";
import { TiTick } from "react-icons/ti";

export default function Section3() {
  const features = [
    "عدم وابستگی به ویراشگر",
    "عدم محدودیت سیستم عامل",
    "عدم محدودیت مرورگر",
    "واکنش‌گرا بودن",
    "استفاده از تکنولوژی PWA",
    "تبدیل گفتار به متن",
  ];
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="flex justify-center order-2 lg:order-1">
          <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center"> 
            <Image
              src="/images/Imen-mobail0.png"
              className="h-[300px] w-fit"
              width={400}
              height={400}
              priority
              alt="ویژگی های شاخص"
            />
          </div>
        </div>
        <div className="lg:max-w-[600px] order-1 md:order-2">
          <h3 className="text-yellow-500 font-bold text-lg md:text-xl">
            ویژگیهای شاخص ما در اتوماسیون اداری
          </h3>
          <p className="text-gray-400 text-justify text-xs md:text-sm container mt-2 font-semibold leading-relaxed">
            ‌اتوماسیون اداری ایمن پرداز به عنوان هسته مرکزی زیر سیستم ها عمل
            کرده و امکان امضاء تمامی فرم های سازمان را در اختیار کربران خود قرار
            میدهد.
          </p>
          <ul className="flex flex-wrap ">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className="w-full sm:w-1/2 px-2 mt-4  flex items-center gap-2 font-bold text-xs lg:text-sm " // موبایل یک ستونه، sm به بالا دو ستونه
              >
                <span className=" text-white font-semibold text-base">
                  <TiTick
                    className=" w-[22px] h-[20px] text-white bg-yellow-500 rounded-sm "
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
