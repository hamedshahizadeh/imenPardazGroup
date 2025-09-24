import AnimatedBackground from "@/components/modules/homePage/bgsec1";
import TextSliderWithPopups from "@/components/modules/special/Section1";

export default function Special() {
  return (
    <div className="relative bg-gray-950">
      <AnimatedBackground />

      <div className="container pb-5 pt-10 lg:py-5 lg:min-h-screen  relative z-10">
        <div>
          <div className="py-10  lg:mt-10">
            <h1 className="text-sm md:text-base font-sans font-black mb-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              ویژگی های شاخص ایمن
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
              <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
                چرا اتوماسیون اداری و مالی ایمن پرداز؟
              </h2>

              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                انتخاب بهترین نرم‌افزار اتوماسیون اداری نیازمند بررسی دقیق
                قابلیت‌ها و تطبیق آن‌ها با نیازهای سازمانی است. اتوماسیون اداری
                و مالی ایمن پرداز به دلیل مجموعه‌ای از ویژگی‌ها و امکانات خاص و
                منحصر به فرد، به عنوان یکی از گزینه‌های برتر در بازار ایران
                شناخته می‌شود. این شرکت با ارائه مجموعه‌ای از ویژگی‌های
                نوآورانه، امنیت بالا، و قابلیت‌های مدیریتی پیشرفته، یکی از
                بهترین انتخاب‌ها برای سازمان‌هایی است که به دنبال نرم‌افزاری
                کارآمد و مطمئن برای مکانیزه‌سازی مکاتبات و فرآیندهای خود هستند.
                این نرم‌افزار با پاسخگویی به نیازهای مختلف، تجربه‌ای متفاوت و
                متمایز را برای کاربران خود فراهم می‌کند.
              </p>
            </div>
            <div className="  rounded-md  bg-black/40 backdrop-blur-[5px]  my-3">
           <TextSliderWithPopups />
            </div>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
              <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
                چطور سیستم‌های یکپارچه می‌توانند به سازمان‌ها کمک کنند؟
              </h2>
              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                سیستم‌های یکپارچه کمک می‌کنند که فرآیندهای مختلف مانند مالی،
                منابع انسانی، تولید، فروش و انبارداری به‌طور خودکار و بدون نیاز
                به مداخله دستی هماهنگ شوند. این امر باعث کاهش اشتباهات انسانی و
                صرفه‌جویی در زمان می‌شود.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
