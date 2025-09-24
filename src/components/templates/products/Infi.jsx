import Image from "next/image";
import AnimatedBackground from "@/components/modules/homePage/bgsec1";
import { FaChartLine, FaWallet, FaSearch, FaCalendarAlt } from "react-icons/fa";

export default function Infi() {
  const features = [
    {
      title: "عملکرد مالی گذشته را تحلیل کنند",
      icon: <FaChartLine className="text-teal-400 size-4 md:size-5" />,
    },
    {
      title: "منابع درآمد و هزینه‌ها را بررسی نمایند",
      icon: <FaWallet className="text-yellow-400 size-4 md:size-5" />,
    },
    {
      title: "نقاط ضعف و قوت سیستم مالی را شناسایی کنند",
      icon: <FaSearch className="text-blue-400 size-4 md:size-5" />,
    },
    {
      title: "برنامه‌ریزی مناسبی برای آینده داشته باشند",
      icon: <FaCalendarAlt className="text-green-400 size-4 md:size-5" />,
    },
  ];

  return (
    <div className="relative bg-gray-950">
      <AnimatedBackground />

      <div className="container pb-5  lg:pt-10 lg:pb-5 lg:min-h-screen  relative z-10">
        <div>
          <div className="py-10 mt-10">
            <h1 className="text-sm md:text-base font-sans font-black mb-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              سیستم های یکپارچه مالی
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 md:gap-4 lg:gap-6 ">
                <div className="lg:pt-10">
                  <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
                    چرا اتوماسیون اداری و مالی ایمن پرداز؟
                  </h2>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    اطلاعات مالی مهمترین اطلاعاتی هستند که مدیران برای تصمیم
                    گیری به آن نیاز دارند.هر چه این اطلاعات دقیق تر و به هنگام
                    تر باشند، مدیران میتوانند تصمیمات مناسب تری را اتخاذ نمایند.
                    حسابداری مالی تامین اطلاعات برای تصمیم گیری های اقتصادی را
                    انجام میدهد و امکان استفاده بهینه از منابع سازمان را فراهم
                    می آورد. از سویی ارائه تحلیل های هوشمند این سیستم امکان
                    ارزیابی واحدهای تجاری را میسر ساخته است.
                  </p>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify mt-1">
                    سیستم حسابداری مالی و مدیریت دفاتر به‌عنوان ستون فقرات
                    مدیریت مالی هر سازمان، ابزاری ضروری برای ایجاد شفافیت، کاهش
                    خطاها، و ارائه اطلاعات لازم برای تصمیم‌گیری‌های استراتژیک
                    است. این سیستم علاوه بر پاسخگویی به نیازهای روزمره مالی، به
                    توسعه و رشد پایدار سازمان کمک می‌کند.
                  </p>
                </div>
                <div className="flex w-full">
                  <div className="flex-1 p-2 ">
                    <Image
                      src="/images/IPhone13-Bank.png"
                      width={500}
                      height={500}
                      alt="سیستم سرمایه های انسانی ایمن پرداز"
                      className="  object-contain animate-float w-full h-52 mt-3 md:mt-0 md:h-80 lg:h-auto"
                      priority
                    />
                  </div>
                  <div className="flex-1 p-2">
                    <Image
                      src="/images/IphoneAcc1.png"
                      width={500}
                      height={500}
                      alt="سیستم سرمایه های انسانی ایمن پرداز"
                      className="w-full h-52 mt-3 md:mt-0 md:h-80 lg:h-auto  object-contain animate-float"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-sm md:text-base font-sans font-black my-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              تهیه صورت های مالی
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 md:gap-4 lg:gap-6 items-center">
                <div className="flex w-full">
                  <div className="flex-1 p-2 ">
                    <Image
                      src="/images/Iphon1Iphad-Acconting.png"
                      width={500}
                      height={500}
                      alt="سیستم یکپارچه مالی ایمن پرداز"
                      className="w-full h-52 mt-3 md:mt-0 md:h-80 lg:h-auto object-contain animate-float"
                      priority
                    />
                  </div>
                </div>
                <div>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    تهیه صورت‌های مالی به‌عنوان یکی از مهم‌ترین ابزارهای مدیریت
                    مالی، امکان دسترسی به اطلاعات مالی دقیق، منسجم و به‌هنگام را
                    فراهم می‌آورد. این اطلاعات، پایه‌ای برای تصمیم‌گیری‌های
                    کلیدی مدیریتی و برنامه‌ریزی استراتژیک به شمار می‌آید.
                    شرکت‌ها و سازمان‌های اقتصادی با طبقه‌بندی و ثبت داده‌های
                    مالی، چارچوبی شفاف از وضعیت مالی خود ایجاد می‌کنند. این
                    چارچوب به آن‌ها کمک می‌کند تا:
                  </p>
                  <ul className="space-y-2 mt-2 md:mt-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        {feature.icon}
                        <span className="text-gray-200 text-xs md:text-sm font-medium">
                          {feature.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify mt-2 md:mt-3">
                    در نتیجه، تدوین و ارائه‌ی صورت‌های مالی استاندارد، نه تنها
                    ابزاری برای پاسخگویی به ذینفعان و سرمایه‌گذاران است، بلکه
                    نقشی کلیدی در ارتقاء شفافیت مالی و استفاده بهینه از منابع
                    ایفا می‌کند.
                  </p>
                </div>
              </div>
            </div>
            <div className="py-2 rounded-md mt-3 md:mt-4 lg:mt-5 bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
                زیرسیستم های یکپارچه مالی
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
