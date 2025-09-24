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

const features = [
  {
    icon: <FaSearch className="size-5 text-teal-400" />,
    title: "کارایی بالا",
    description:
      "مدیریت بهتر ایمیل‌های سازمانی و جلوگیری از مشکلاتی مثل جستجوی ایمیل‌های قدیمی.",
  },
  {
    icon: <FaShieldAlt className="size-5 text-yellow-400" />,
    title: "کاهش خطرات امنیتی",
    description:
      "قابلیت‌های امنیتی پیشرفته برای جلوگیری از سرقت اطلاعات و حملات سایبری.",
  },
  {
    icon: <FaBalanceScale className="size-5 text-sky-400" />,
    title: "اطمینان از رعایت قوانین",
    description:
      "ابزارهای ذخیره‌سازی و گزارش‌دهی برای رعایت الزامات قانونی مرتبط با داده‌ها.",
  },
  {
    icon: <FaLayerGroup className="size-5 text-red-400" />,
    title: "پشتیبانی از مقیاس‌پذیری",
    description:
      "هماهنگی آسان با رشد سازمان و افزایش تعداد کاربران بدون افت کارایی.",
  },
  {
    icon: <FaProjectDiagram className="size-5 text-purple-400" />,
    title: "یکپارچگی با دیگر زیرسیستم‌ها",
    description:
      "امکان اتصال و هماهنگی با سایر سیستم‌های سازمانی به صورت یکپارچه.",
  },
];

export default function Emailmanagement() {
  return (
    <div className="relative bg-gray-950">
      <AnimatedBackground />

      <div className="container pb-5 pt-4 lg:pt-10 lg:pb-5 lg:min-h-screen  relative z-10">
        <div>
          <div className=" py-10 mt-5 lg:mt-10">
            <h1 className="text-sm md:text-base font-sans font-black mb-2 lg:mb-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              سیستم مدیریت ایمیل سازمانی
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                سیستم مدیریت ایمیل سازمانی (Enterprise Email Management System)
                به مجموعه‌ای از ابزارها و فرایندها گفته می‌شود که برای مدیریت،
                ذخیره‌سازی، جستجو، پردازش، و حفاظت از ایمیل‌ها در یک سازمان
                طراحی شده است. این سیستم‌ها به سازمان‌ها کمک می‌کنند تا بتوانند
                به طور مؤثر و امن ارتباطات ایمیلی خود را مدیریت کنند. در این
                سیستم‌ها علاوه بر امکان ارسال و دریافت ایمیل‌ها، امکاناتی نظیر
                بایگانی، امنیت، کنترل دسترسی نیز وجود دارد. سیستم‌های مدیریت
                ایمیل سازمانی ایمن پرداز به‌ویژه برای شرکت‌های بزرگ و سازمان‌های
                دولتی که نیاز به مدیریت حجم زیادی از ایمیل‌ها دارند، بسیار ضروری
                می باشد.
              </p>

              <ul className="space-y-2 md:space-y-3 mt-3">
                {features.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3 rtl:space-x-reverse"
                  >
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="text-xs lg:text-sm  text-gray-100 font-bold ">
                        {item.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-300 mt-1  font-medium text-justify">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-2 rounded-md mt-3 md:mt-4 lg:mt-5 bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-2 lg:mb-3">
                ویژگی‌های اصلی سیستم مدیریت ایمیل سازمانی
              </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                <div>
                    <CollapseList />
                </div>
                <div className="flex justify-center w-full">
                    <Image src="/images/pemail.png" className="animate-float w-fit h-40 md:h-80 lg:h-auto" width={400} height={400} alt="ایمیل سازمانی شرکت ایمن پرداز" priority/>
                </div>
            </div>
            </div>

            <div className="py-2 rounded-md mt-3 md:mt-4 lg:mt-5 bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-2 md:mb-3">
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
