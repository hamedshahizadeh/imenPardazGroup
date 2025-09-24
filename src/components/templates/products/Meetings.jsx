import AnimatedBackground from "@/components/modules/homePage/bgsec1";
import MeetingsSlider from "@/components/modules/products/MeetingsSlider";
import {
  FaDatabase,
  FaTasks,
  FaChartLine,
  FaUsers,
  FaSearch,
} from "react-icons/fa";

const features = [
  {
    title: "یکپارچگی داده‌ها و هماهنگی فعالیت‌ها",
    icon: <FaDatabase className="w-5 h-5 text-teal-400" />,
  },
  {
    title: "پیگیری و گزارش‌دهی",
    icon: <FaTasks className="w-5 h-5 text-yellow-400" />,
  },
  {
    title: "بهبود بهره‌وری",
    icon: <FaChartLine className="w-5 h-5 text-blue-400" />,
  },
  {
    title: "مدیریت منابع انسانی و وظایف مرتبط",
    icon: <FaUsers className="w-5 h-5 text-green-400" />,
  },
  {
    title: "تسهیل در نظارت و ارزیابی عملکرد",
    icon: <FaSearch className="w-5 h-5 text-purple-400" />,
  },
];
export default function Meetings() {
  return (
    <div className="relative bg-gray-950">
      <AnimatedBackground />

      <div className="container pb-5  lg:pt-10 lg:py-5 lg:min-h-screen  relative z-10">
        <div>
          <div className=" py-10 mt-10">
            <h1 className="text-sm md:text-base font-sans font-black mb-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              مدیریت وظایف و جلسات
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
              <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
                سیستم مدیریت وظایف
              </h2>

              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                سیستم مدیریت وظایف (Task Management System)ایمن پرداز ابزاری است
                که برای برنامه‌ریزی، تخصیص، پیگیری و نظارت بر انجام وظایف مختلف
                در سازمان‌ها طراحی شده است. این سیستم‌ به مدیران و تیم‌ها کمک
                می‌کنند تا وظایف روزانه، پروژه‌ها و اولویت‌های مختلف را به‌طور
                مؤثر مدیریت کنند. ارتباط میان سیستم مدیریت وظایف و سیستم‌های
                یکپارچه و اتوماسیون اداری ایمن پرداز می‌تواند به سازمان‌ها در
                دستیابی به کارایی بیشتر، کاهش خطاها، بهبود هماهنگی میان بخش‌های
                مختلف و تسریع در فرآیندها کمک کند. این ارتباط باعث می‌شود که
                اطلاعات در سرتاسر سازمان به‌طور یکپارچه جریان یابد و فرآیندهای
                مدیریتی و اجرایی به شکل مؤثرتری انجام شوند.
              </p>
            </div>

            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5 mt-4">
              <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
                ‌ارتباط سیستم مدیریت وظایف با سیستم‌های یکپارچه
              </h2>

              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                سیستم های یکپارچه ایمن پرداز به‌طور کلی به مدیریت منابع سازمانی
                در حوزه‌های مختلف مانند منابع انسانی، مالی، تأمین کالا، تولید و
                غیره پرداخته و تمامی این حوزه‌ها را در یک سیستم یکپارچه به هم
                متصل می‌کنند. به این ترتیب، اطلاعات در سطح سازمان به‌صورت
                یکپارچه و بدون نیاز به انتقال دستی بین بخش‌های مختلف به‌روزرسانی
                می‌شود از ویژگیهای شاخص این سیستم عبارتند از:
              </p>
              <div className=" space-y-1 mt-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2  text-white px-1 md:px-3 lg:px-4 py-1 rounded-lg shadow-md"
                  >
                    {feature.icon}
                    <span className="text-xs md:text-sm font-medium">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-3 pb-5 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5 my-3">
              <MeetingsSlider />
            </div>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
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
