import Image from "next/image";
import AnimatedBackground from "@/components/modules/homePage/bgsec1";

import {
  FaSearch,
  FaShieldAlt,
  FaBalanceScale,
  FaLayerGroup,
  FaProjectDiagram,
} from "react-icons/fa";
import CollapseList from "@/components/modules/products/Emailcollpase";
import Accordion from "@/components/modules/products/‌ChatAc";
import ChatFeaturesAccordion from "@/components/modules/products/ChatAc2";

export default function Chat() {
  return (
    <div className="relative bg-gray-950">
      <AnimatedBackground />

      <div className="container pb-5  lg:pt-10 lg:pb-5 lg:min-h-screen  relative z-10">
        <div>
          <div className="  py-10  mt-10">
            <h1 className="text-sm md:text-base font-sans font-black mb-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              سیستم مدیریت چت سازمانی
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                سیستم مدیریت چت سازمانی (Enterprise Chat Management System یا
                ECMS) ایمن پرداز برای تسهیل ارتباطات داخلی و خارجی در سازمانها
                طراحی شده است. این سیستم‌ به طور معمول برای بهبود همکاری، تسریع
                فرآیندهای کاری و مدیریت مکالمات در محیط‌های تجاری و سازمانی
                استفاده می‌شود. هدف اصلی این سیستم‌ بهینه‌سازی ارتباطات
                درون‌سازمانی و کاهش پیچیدگی‌های مرتبط با ارسال و دریافت
                پیام‌هاست.
              </p>
              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify mt-2">
                سیستم‌های مدیریت چت سازمانی ایمن پرداز ابزار بسیار مؤثری برای
                بهبود ارتباطات داخلی و همکاری تیم‌ها در سازمان‌ها می باشد. این
                سیستم‌ به سازمان‌ها کمک می‌کند تا ارتباطات خود را سریع‌تر،
                ساده‌تر و مؤثرتر کنند و در نهایت بهره‌وری و عملکرد کلی سازمان را
                بهبود بخشند
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                <div>
                  <Accordion />
                </div>
                <div className="flex justify-center w-full">
                  <Image
                    src="/images/chat.jpg"
                    className="animate-float w-fit h-40 md:h-80 lg:h-auto"
                    width={400}
                    height={400}
                    alt="ایمیل سازمانی شرکت ایمن پرداز"
                    priority
                  />
                </div>
              </div>
            </div>

            <h1 className="text-sm md:text-base font-sans font-black mb-3 text-[#49C5B6] text-center py-2 rounded-md mt-3  bg-black/40 backdrop-blur-[5px]">
              از ویژگیهای شاخص سیستم چت سازمانی ما
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                   <div className="lg:flex justify-center hidden ">
                  <Image
                    src="/images/chat.jpg"
                    className="animate-float w-fit h-40 md:h-80 lg:h-auto"
                    width={400}
                    height={400}
                    alt="ایمیل سازمانی شرکت ایمن پرداز"
                    priority
                  />
                </div>
                <div>
                  <ChatFeaturesAccordion />
                </div>
             
              </div>
            </div>

            <div className="py-2 rounded-md mt-3 md:mt-4 lg:mt-5 bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
                زیر سیستم های اتوماسیون اداری ایمن پرداز
              </h2>

              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                اتوماسیون اداری بعنوان هسته مرکزی جهت تبادل اطلاعات و امضاء
                الکترونیکی تمامی فرم های واحد های مختلف اداری با زیر سیستمها عمل
                میکند.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
