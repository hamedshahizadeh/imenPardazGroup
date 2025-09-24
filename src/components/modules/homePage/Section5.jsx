import Image from "next/image";
import React from "react";
import { TiTick } from "react-icons/ti";

export default function Section5() {
  const features = [
    "صدور حکم کارگزینی گروهی",
    "لینک با سیستم حقوق و دستمزد",
    "امضاء الکترونیکی احکام",
    "لینک با اتوماسیون اداری",
    "صدور مرخصی ها و ماموریت ها",
    "لینک با دستگاه تردد",
  ];
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="md:flex justify-center order-2 hidden lg:order-1">
          <div className="flex items-center">
            <Image
              src="/images/i2.png"
              className="h-[300px] w-fit"
              width={400}
              height={400}
              priority
              alt="ویژگی های شاخص"
            />
            <Image
              src="/images/i3.png"
              className="h-[300px] w-fit"
              width={400}
              height={400}
              priority
              alt="ویژگی های شاخص"
            />
          </div>
        </div>
        <div className="lg:max-w-[600px] order-1 md:order-2">
          <h3 className="text-orange-600 font-bold text-lg md:text-xl">
            ویژگیهای شاخص سیستم سرمایه انسانی
          </h3>
          <p className="text-gray-400 text-justify text-xs md:text-sm container mt-2 font-semibold leading-relaxed">
            سیستم سرمایه انسانی به عنوان یکی از مهمترین واحد های زیر مجموعه
            مدیریت منابع انسانی، نبظ تپنده هر سازمانی می باشد. این واحد با تشخیص
            دقیق و به هنگام خود در شناخت تواناییهای افراد می تواند در مسیر رسیدن
            به اهداف سازمانها و شرکت ها تسهیل ایجاد کرده و تاثیر گذار باشد.
          </p>
          <ul className="flex flex-wrap ">
            {features.map((feature, idx) => (
              <li
                key={idx}
                className="w-full sm:w-1/2 px-2 mt-4  flex items-center gap-2 font-bold text-xs lg:text-sm " // موبایل یک ستونه، sm به بالا دو ستونه
              >
                <span className=" text-white font-semibold text-base">
                  <TiTick
                    className=" w-[22px] h-[20px] text-white bg-orange-600 rounded-sm "
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
