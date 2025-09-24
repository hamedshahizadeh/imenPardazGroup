import Image from "next/image";
import AnimatedBackground from "@/components/modules/homePage/bgsec1";

import {
  FaCheckCircle,
  FaBolt,
  FaDatabase,
  FaChartLine,
  FaDollarSign,
  FaLightbulb,
  FaTasks,
} from "react-icons/fa";

import { FaRocket, FaClock, FaComments, FaUsers } from "react-icons/fa";
export default function Humcap() {
  const features1 = [
    {
      title: "کاهش خطاها",
      icon: <FaCheckCircle className="text-teal-400 size-4 md:size-5" />,
    },
    {
      title: "کارایی بالا",
      icon: <FaBolt className="text-yellow-400 size-4 md:size-5" />,
    },
    {
      title: "دسترس پذیری بهتر اطلاعات",
      icon: <FaDatabase className="text-blue-400 size-4 md:size-5" />,
    },
    {
      title: "رصد و ارزیابی عملکرد",
      icon: <FaChartLine className="text-green-400 size-4 md:size-5" />,
    },
    {
      title: "کاهش هزینه",
      icon: <FaDollarSign className="text-red-400 size-4 md:size-5" />,
    },
    {
      title: "بهبود تصمیم گیری",
      icon: <FaLightbulb className="text-orange-400 size-4 md:size-5" />,
    },
    {
      title: "تخصیص وظایف و پیگیری",
      icon: <FaTasks className="text-purple-400 size-4 md:size-5" />,
    },
  ];

  const features = [
    {
      title: "افزایش کارایی و بهره وری",
      icon: <FaRocket className="text-teal-400 size-4 md:size-5" />,
    },
    {
      title: "کاهش زمان تلف شده",
      icon: <FaClock className="text-yellow-400 size-4 md:size-5" />,
    },
    {
      title: "ارتباط شفاف تر",
      icon: <FaComments className="text-blue-400 size-4 md:size-5" />,
    },
    {
      title: "بهبود همکاری تیمی",
      icon: <FaUsers className="text-green-400 size-4 md:size-5" />,
    },
  ];

  return (
    <div className="relative bg-gray-950">
      <AnimatedBackground />

      <div className="container pb-5  lg:pt-10 lg:pb-5 lg:min-h-screen  relative z-10">
        <div>
          <div className=" py-10  mt-10">
            <h1 className="text-sm md:text-base font-sans font-black mb-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              سیستم های سرمایه انسانی
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 md:gap-4 lg:gap-6 items-center">
                <div>
                  <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
                    سیستم مدیریت منابع انسانی
                  </h2>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    سیستم مدیریت ایمیل سازمانی (Enterprise Email Management
                    System) به مجموعه‌ای از ابزارها و فرایندها گفته می‌شود که
                    برای مدیریت، ذخیره‌سازی، جستجو، پردازش، و حفاظت از ایمیل‌ها
                    در یک سازمان طراحی شده است. این سیستم‌ها به سازمان‌ها کمک
                    می‌کنند تا بتوانند به طور مؤثر و امن ارتباطات ایمیلی خود را
                    مدیریت کنند. در این سیستم‌ها علاوه بر امکان ارسال و دریافت
                    ایمیل‌ها، امکاناتی نظیر بایگانی، امنیت، کنترل دسترسی نیز
                    وجود دارد. سیستم‌های مدیریت ایمیل سازمانی ایمن پرداز به‌ویژه
                    برای شرکت‌های بزرگ و سازمان‌های دولتی که نیاز به مدیریت حجم
                    زیادی از ایمیل‌ها دارند، بسیار ضروری می باشد.
                  </p>
                  <ul className="space-y-2 mt-3">
                    {features1.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        {feature.icon}
                        <span className="text-gray-200 text-xs md:text-sm font-medium">
                          {feature.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex w-full  h-52 mt-3 md:mt-0 md:h-80 lg:h-auto">
                  <div className="flex-1  ">
                    <Image
                      src="/images/IPhone13_grooh.png"
                      width={500}
                      height={500}
                      alt="سیستم سرمایه های انسانی ایمن پرداز"
                      className="w-full h-52 md:h-80 lg:h-auto object-contain animate-float"
                      priority
                    />
                  </div>
                  <div className="flex-1 ">
                    <Image
                      src="/images/IPhone13_tafiz.png"
                      width={500}
                      height={500}
                      alt="سیستم سرمایه های انسانی ایمن پرداز"
                      className="w-full h-52 md:h-80 lg:h-auto object-contain animate-float"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-sm md:text-base font-sans font-black my-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              مزایای سیستم مدیریت سرمایه انسانی
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 md:gap-4 lg:gap-6 items-center">
                <div className="flex w-full">
                  <div className="flex-1 p-2 ">
                    <Image
                      src="/images/IphonIphadPersonal1.png"
                      width={500}
                      height={500}
                      alt="سیستم سرمایه های انسانی ایمن پرداز"
                      className="w-full h-52 mt-3 md:mt-0 md:h-80 lg:h-auto object-contain animate-float"
                      priority
                    />
                  </div>
                </div>
                <div>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    سیستم سرمایه انسانی به عنوان یکی از مهمترین واحد های زیر
                    مجموعه مدیریت منابع انسانی، نبظ تپنده هر سازمانی می باشد.
                    این واحد با تشخیص دقیق و به هنگام خود در شناخت تواناییهای
                    افراد می تواند در مسیر رسیدن به اهداف سازمانها و شرکت ها
                    تسهیل ایجاد کرده و تاثیر گذار باشد.
                  </p>
                  <ul className="space-y-2 mt-2 md:mt-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 md:gap-3">
                        {feature.icon}
                        <span className="text-gray-200 text-xs md:text-sm font-medium">
                          {feature.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="py-2 rounded-md mt-3 md:mt-4 lg:mt-5 bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
                ویژگی‌ها شاخص سیستم مدیریت منابع انسانی آفیس یار
              </h2>

              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                اتوماسیون اداری بعنوان هسته مرکزی جهت تبادل اطلاعات و امضاء
                الکترونیکی تمامی فرم های واحد های مختلف اداری با زیر سیستمهای
                آفیس یار عمل میکند.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
