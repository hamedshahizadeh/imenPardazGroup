import Image from "next/image";
import AnimatedBackground from "@/components/modules/homePage/bgsec1";

import {
  FaChartLine,
  FaMobileAlt,
  FaFileAlt,
  FaTools,
  FaBolt,
  FaRegAddressBook,
  FaLaptop,
  FaClock,
  FaLock,
  FaSearch,
  FaHandsHelping,
  FaDollarSign,
  FaLeaf,
  FaQrcode,
  FaPalette,
  FaUserCheck,
  FaTachometerAlt,
} from "react-icons/fa";

const features = [
  {
    title: "افزایش بهره‌وری",
    icon: <FaChartLine className="w-5 h-5 text-teal-400" />,
    description:
      "کاربران می‌توانند در هر زمان و مکان، پیش‌نویس‌های خود را تهیه کرده و زمان انتظار برای دسترسی به  را حذف کنند.",
  },
  {
    title: "انعطاف‌پذیری",
    icon: <FaMobileAlt className="w-5 h-5 text-yellow-400" />,
    description:
      "مدیریت مکاتبات و پیش‌نویس‌ها در سفر، جلسات خارجی یا در شرایط اضطراری.",
  },
  {
    title: "حفظ استاندارد سازمانی",
    icon: <FaFileAlt className="w-5 h-5 text-blue-400" />,
    description: "امکان تنظیم پیش‌نویس‌ها مطابق با فرمت‌های مورد تایید سازمان.",
  },
  {
    title: "کاهش وابستگی به ابزارهای جانبی",
    icon: <FaTools className="w-5 h-5 text-purple-400" />,
    description:
      "عدم نیاز به استفاده از اپلیکیشن‌های اضافی برای ویرایش اسناد Word.",
  },
];

const features1 = [
  {
    title: "افزایش سرعت در گردش اسناد",
    icon: <FaBolt className="w-5 h-5 text-teal-400" />,
    description: `حذف زمان‌های تلف‌شده در امضای حضوری.
       تسریع در انعقاد قراردادها و تصویب صورتجلسه‌ها.`,
  },
  {
    title: "ارتقای امنیت",
    icon: <FaLock className="w-5 h-5 text-red-400" />,
    description: `جلوگیری از دستکاری یا جعل اسناد با استفاده از امضای دیجیتال. 
      رمزنگاری داده‌ها برای حفاظت از اطلاعات حساس.`,
  },
  {
    title: "شفافیت و قابلیت ردیابی",
    icon: <FaSearch className="w-5 h-5 text-blue-400" />,
    description: `امکان مشاهده وضعیت سند در هر مرحله از فرآیند امضا.
       گزارش‌دهی دقیق درباره اینکه چه کسی و در چه زمانی سند را تایید یا امضا کرده است.`,
  },
];

const features2 = [
  {
    title: "ارتباط با کارتابل اتوماسیون",
    icon: <FaRegAddressBook className="w-5 h-5 text-teal-400" />,
    description: `از آنجا که سیستم میز خدمت با کارتابل اتوماسیون اداری یکپارچه است، امکان مدیریت مکاتبات و فرم‌ها به‌صورت منظم و متمرکز وجود دارد.
ثبت، ارجاع، و پیگیری درخواست‌ها به‌طور خودکار انجام می‌شود.`,
  },
  {
    title: "ارائه خدمات غیرحضوری",
    icon: <FaLaptop className="w-5 h-5 text-yellow-400" />,
    description: `مشتریان و ذی‌نفعان می‌توانند مکاتبات و فرم‌های اطلاعاتی خود را از طریق پورتال سازمانی ارسال کنند.
نیازی به حضور فیزیکی یا تماس تلفنی نیست؛ همه فرآیندها به‌صورت آنلاین قابل انجام است.`,
  },
  {
    title: "کاهش هزینه‌ها و زمان",
    icon: <FaClock className="w-5 h-5 text-blue-400" />,
    description: `حذف نیاز به مراجعات حضوری یا تماس‌های تلفنی مکرر.
بهبود زمان پاسخ‌گویی سازمان به درخواست‌ها.`,
  },
];

const features3 = [
  {
    title: "افزایش تعامل",
    icon: <FaHandsHelping className="w-5 h-5 text-teal-400" />,
    description: `گیرندگان به‌راحتی می‌توانند اطلاعات بیشتری دریافت کنند و با محتوای نامه تعامل داشته باشند.`,
  },
  {
    title: "صرفه‌جویی در هزینه",
    icon: <FaDollarSign className="w-5 h-5 text-yellow-400" />,
    description: `کاهش نیاز به چاپ اطلاعات اضافی یا ارسال ضمایم حجیم.`,
  },
  {
    title: "حفظ محیط زیست",
    icon: <FaLeaf className="w-5 h-5 text-green-400" />,
    description: `کاهش مصرف کاغذ با استفاده از محتوای دیجیتال.`,
  },
  {
    title: "سازگاری با تکنولوژی‌های مدرن",
    icon: <FaQrcode className="w-5 h-5 text-blue-400" />,
    description: `اکثر کاربران گوشی‌های هوشمند می‌توانند به‌راحتی QR Code را اسکن کنند.`,
  },
];

const features4 = [
  {
    title: "رابط کاربری ساده و جذاب (UI)",
    icon: <FaPalette className="w-5 h-5 text-teal-400" />,
    description: `طراحی بصری واضح و قابل فهم.`,
  },
  {
    title: "سهولت استفاده",
    icon: <FaUserCheck className="w-5 h-5 text-yellow-400" />,
    description: `یادگیری و استفاده از نرم‌افزار باید آسان باشد، حتی برای کاربران تازه‌کار. نیاز به آموزش یا مستندات پیچیده نباید وجود داشته باشد.`,
  },
  {
    title: "سرعت و کارایی",
    icon: <FaTachometerAlt className="w-5 h-5 text-blue-400" />,
    description: `عملکرد نرم‌افزار باید سریع و بدون تأخیر باشد. قابلیت انجام وظایف با حداقل کلیک یا مراحل.`,
  },
  {
    title: "واکنش‌پذیری (Responsiveness)",
    icon: <FaMobileAlt className="w-5 h-5 text-green-400" />,
    description: `عملکرد نرم‌افزار در دستگاه‌ها و اندازه‌های مختلف صفحه (کامپیوتر، موبایل، تبلت).`,
  },
];

export default function Office() {
  return (
    <div className="relative bg-gray-950">
      <AnimatedBackground />

      <div className="container pb-5 lg:pt-10 lg:pb-5 lg:min-h-screen  relative z-10">
        <div>
          <div className=" py-10  mt-10">
            <h1 className="text-sm md:text-base font-sans font-black mb-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              سیستم یکپارچه اتوماسیون اداری
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <div className="">
                <div className="">
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    نرم‌افزارهای یکپارچه اتوماسیون اداری زمانی به اوج کارایی خود
                    می‌رسند که بتوانند فرآیندهای مکاتبات اداری را در کوتاه‌ترین
                    زمان ممکن، با دقت بالا و بدون هیچ‌گونه خطایی مدیریت کنند.
                    این نرم‌افزارها با حذف موانع سنتی و کاهش وابستگی به
                    فرآیندهای دستی، امکان انجام مکاتبات سازمانی را به‌صورت سریع،
                    دقیق و کارآمد فراهم می‌کنند. نرم افزار حاضر ، به عنوان بخشی
                    از سیستمهای یکپارچه اداری و مالی آفیس یار به گونه ای طراحی
                    شده است که می تواند به عنوان هسته سیستم ها در نظر گرفت بطوری
                    که با ارتباط تنگاتنگ خود با تمامی سیستمهای آفیس یار و فرمهای
                    ایجاد شده برای امضاء الکترونیکی ، امکانات و تسهیلات کارآمدی
                    را در اختیار مدیران قرار می دهد.
                  </p>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify mt-1">
                    سیستم حسابداری مالی و مدیریت دفاتر به‌عنوان ستون فقرات
                    مدیریت مالی هر سازمان، ابزاری ضروری برای ایجاد شفافیت، کاهش
                    خطاها، و ارائه اطلاعات لازم برای تصمیم‌گیری‌های استراتژیک
                    است. این سیستم علاوه بر پاسخگویی به نیازهای روزمره مالی، به
                    توسعه و رشد پایدار سازمان کمک می‌کند.
                  </p>
                </div>
              </div>
            </div>

            <h1 className="tex-sm md:text-base font-sans font-black text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px] my-3">
              امکان ‌پیشنویس نامه در ویرایشگر داخلی اتوماسیون اداری
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 md:gap-4 lg:gap-6 items-center">
                <div>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    یکی از ویژگی‌های نوآورانه و کاربردی نسخه موبایل اتوماسیون
                    اداری ایمن پرداز، قابلیت ایجاد و ویرایش پیش‌نویس نامه‌ها
                    بدون نیاز به نرم‌افزار Word است. این ویرایشگر داخلی، سازگار
                    با سیستم‌عامل‌های مختلف از جمله ویندوز، مک، اندروید و iOS
                    طراحی شده و امکان دسترسی و استفاده را برای کاربران در هر
                    شرایط و مکانی فراهم می‌کند.
                  </p>
                  <h2 className="text-sm md:text-base font-medium text-[#49C5B6] my-2 md:my-3">
                    ‌مزایای استفاده از این قابلیت
                  </h2>
                  <ul className="space-y-2 mt-2 md:mt-3">
                    {features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-gray-900 text-white px-1 md:px-3 lg:px-4 py-2 md:py-3 rounded-lg shadow-md"
                      >
                        {feature.icon}
                        <div>
                          <h3 className="text-xs md:text-sm font-medium mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-line">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex w-full">
                  <div className="flex-1 p-2 ">
                    <Image
                      src="/images/imen-edit.png"
                      width={500}
                      height={500}
                      alt="سیستم یکپارچه مالی ایمن پرداز"
                      className="md:mt-0 md:h-80 lg:h-auto w-full object-contain animate-float"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-sm md:text-base font-sans font-black my-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              امکان چند امضائی و مزایای استفاده
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 md:gap-4 lg:gap-6 items-center">
                <div className="flex w-full order-2 lg:order-1">
                  <div className="flex-1 p-2 ">
                    <Image
                      src="/images/p3.png"
                      width={500}
                      height={500}
                      alt="سیستم یکپارچه مالی ایمن پرداز"
                      className="md:mt-0 md:h-80 lg:h-auto w-full object-contain animate-float"
                      priority
                    />
                  </div>
                </div>
                <div  className="order-1 lg:order-2">
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    زیرسیستم چند امضایی در بستر اتوماسیون اداری، ابزاری پیشرفته
                    برای مدیریت فرآیندهای تایید و امضای دیجیتال است که به
                    سازمان‌ها امکان می‌دهد مکاتبات، قراردادها، و اسناد حساس خود
                    را با سرعت و امنیت بیشتر مدیریت کنند.
                  </p>
                  <ul className="space-y-2 mt-2 md:mt-3">
                    {features1.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-gray-900 text-gray-100 px-1 md:px-3 lg:px-4 py-2 md:py-3 rounded-lg shadow-md"
                      >
                        {feature.icon}
                        <div>
                          <h3 className="text-xs md:text-sm font-medium mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-line">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <h1 className="tex-sm md:text-base font-sans font-black text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px] my-3">
              تبدیل گفتار به متن و ویژگیهای آن
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 md:gap-4 lg:gap-6 items-center">
                <div>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    تبدیل گفتار به متن در اتوماسیون ایمن پرداز، یکی از امکانات
                    کاربرپسند و کاربردی است که نقش مهمی در تسهیل و تسریع
                    فرآیندهای سازمانی ایفا می‌کند. این قابلیت به کاربران اجازه
                    می‌دهد که متن نامه‌ها یا ارجاعات را با صدای خود تهیه کرده و
                    آن را به متن دیجیتالی و قابل ویرایش تبدیل کنند.
                  </p>
                  <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mt-2 md:mt-3 mb-1">
                    سهولت استفاده{" "}
                  </h2>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    کاربر تنها کافی است متن موردنظر را در میکروفون متصل به
                    دستگاه (رایانه یا تلفن همراه) بخواند و فرآیند تبدیل با چند
                    کلیک ساده آغاز شده و نتیجه به سرعت در اختیار کاربر قرار
                    می‌گیرد.
                  </p>
                  <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mt-2 md:mt-3 mb-1">
                    سرعت و دقت بالا
                  </h2>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    این قابلیت از تکنولوژی‌های پیشرفته برای تشخیص صدا و تبدیل
                    دقیق آن به متن استفاده می‌کند و مناسب برای زمانی که
                    تایپ‌کردن زمان‌بر یا دشوار است.
                  </p>
                  <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mt-2 md:mt-3 mb-1">
                    بهبود بهره‌وری
                  </h2>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    کاهش زمان لازم برای تهیه مکاتبات اداری و امکان تولید سریع
                    محتوای متنی، حتی در شرایطی که امکان استفاده از صفحه‌کلید
                    وجود ندارد.
                  </p>
                </div>
                <div className="flex w-full">
                  <div className="flex-1 p-2 ">
                    <Image
                      src="/images/p3.png"
                      width={500}
                      height={500}
                      alt="سیستم یکپارچه مالی ایمن پرداز"
                      className="md:mt-0 md:h-80 lg:h-auto w-full object-contain animate-float"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-sm md:text-base font-sans font-black my-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              میز خدمت ویژگها و قابلیت ها
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 md:gap-4 lg:gap-6 items-center">
                <div className="flex w-full order-2 lg:order-1">
                  <div className="flex-1 p-2 ">
                    <Image
                      src="/images/p3.png"
                      width={500}
                      height={500}
                      alt="سیستم یکپارچه مالی ایمن پرداز"
                      className="w-full md:mt-0 md:h-80 lg:h-auto object-contain animate-float"
                      priority
                    />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    سیستم میز خدمت الکترونیکی یک راهکار نوین برای تسهیل ارتباط
                    میان سازمان و مشتریان یا ذی‌نفعان است که با استفاده از آن،
                    خدمات سازمان به صورت الکترونیکی و یکپارچه ارائه می‌شود. این
                    سیستم نقش یک درگاه الکترونیکی را ایفا می‌کند و قابلیت‌های
                    زیر را در اختیار کاربران و سازمان قرار می‌دهد:
                  </p>
                  <ul className="space-y-2 mt-3">
                    {features2.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-gray-900 text-white px-1 md:px-3 lg:px-4 py-3 rounded-lg shadow-md"
                      >
                        {feature.icon}
                        <div>
                          <h3 className="text-xs md:text-sm font-medium mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-line">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <h1 className="tex-sm md:text-base font-sans font-black text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px] my-3">
              پیگیری و احراز اصلالت فیزیکی نامه ها و اسناد صادر شده
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 md:gap-4 lg:gap-6 items-center">
                <div>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    ‌با استفاده از سامانه رهگیری شرکت ایمن پرداز شهروندان و
                    مشتریان با در دست داشتن شماره و تاریخ نامه به راحتی می
                    توانند گردش و مسیر گردش نامه یا اسناد خود را رویت ، یا نسبت
                    به صحت نامه یا اسناد صادره توسط سازمان دست یابند.{" "}
                  </p>

                  <ul className="space-y-2 mt-2 md:mt-3">
                    {features3.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-gray-900 text-white px-1 md:px-3 lg:px-4 py-2 md:py-3 rounded-lg shadow-md"
                      >
                        {feature.icon}
                        <div>
                          <h3 className="text-sm font-medium mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-line">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex w-full">
                  <div className="flex-1 p-2 ">
                    <Image
                      src="/images/p3.png"
                      width={500}
                      height={500}
                      alt="سیستم یکپارچه مالی ایمن پرداز"
                      className="md:mt-0 md:h-80 lg:h-auto w-full object-contain animate-float"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-sm md:text-base font-sans font-black my-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              نسخه موبایل با تکنولوژی PWA (Progressive Web App){" "}
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 md:gap-4 lg:gap-6 items-center">
                <div className="flex w-full order-2 lg:order-1">
                  <div className="flex-1 p-2 ">
                    <Image
                      src="/images/p4.png"
                      width={500}
                      height={500}
                      alt="سیستم یکپارچه مالی ایمن پرداز"
                      className="md:mt-0 md:h-80 lg:h-auto w-full object-contain animate-float"
                      priority
                    />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify whitespace-pre-line">
                    نسخه موبایل با تکنولوژی PWA (Progressive Web App) راهکاری
                    مدرن برای توسعه نرم‌افزارهای کاربردی است که ترکیبی از
                    ویژگی‌های اپلیکیشن‌های وب و موبایل را ارائه می‌دهد. این
                    فناوری به کاربران اجازه می‌دهد تا از امکانات پیشرفته یک
                    اپلیکیشن موبایلی (مانند دسترسی آفلاین، ارسال اعلان‌ها، و
                    عملکرد سریع) در مرورگرهای وب استفاده کنند.
                  </p>
                  <p className="text-gray-200 mt-2 text-xs md:text-sm leading-relaxed font-medium text-justify whitespace-pre-line">
                    در سیستم های یکپارچه آفیس یار PWA ترکیبی ایده‌آل از
                    اپلیکیشن‌های وب و موبایل است که می‌تواند تجربه کاربری مدرنی
                    را فراهم کند. این تکنولوژی به‌ویژه برای کسب‌وکارهایی که به
                    دنبال کاهش هزینه‌ها و افزایش دسترسی کاربران هستند، یک راهکار
                    ایده‌آل است.
                  </p>
                </div>
              </div>
            </div>

            <h1 className="tex-sm md:text-base font-sans font-black text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px] my-3">
              کاربرپسندی نرم‌افزارها (User-Friendliness)
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-2 md:px-4 lg:px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 md:gap-4 lg:gap-6 items-center">
                <div>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    کاربرپسندی نرم‌افزارها (User-Friendliness) یکی از جنبه‌های
                    کلیدی طراحی نرم‌افزار است که به توانایی کاربران در تعامل
                    راحت، سریع، و کارآمد با یک نرم‌افزار اشاره دارد.
                    نرم‌افزارهایی که کاربرپسند طراحی می‌شوند، تجربه کاربری (UX)
                    بهتری ارائه می‌دهند، باعث افزایش بهره‌وری و رضایت کاربران
                    می‌شوند و احتمال استفاده مداوم از نرم‌افزار را بالا می‌برند.
                  </p>
                  <p className="text-gray-200 mt-2 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    نرم افزار های حاضر ، به عنوان بخش های جدایی ناپذیر از
                    سیستمهای یکپارچه اداری و مالی آفیس یار به گونه ای طراحی شده
                    اند که می توانند با حذف کاغذ بازی ، امضاء های دستی و ارجاعات
                    سنتی و ارتباط زنجیر وار و تنگاتنگ خود با یکدیگر و با خذف یا
                    به حداقل رساندن دخالت نیروی انسانی در واحد های اداری ،
                    امکانات و تسهیلات کارآمدی را در اختیار مدیران قرار می دهد .
                  </p>

                  <ul className="space-y-2 mt-2 md:mt-3">
                    {features4.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 bg-gray-900 text-white px-1 md:px-3 lg:px-4 py-3 rounded-lg shadow-md"
                      >
                        {feature.icon}
                        <div>
                          <h3 className="text-xs md:text-sm font-medium mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-gray-300 text-xs leading-relaxed whitespace-pre-line">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex w-full">
                  <div className="flex-1 p-2">
                    <Image
                      src="/images/p5.png"
                      width={500}
                      height={500}
                      alt="سیستم یکپارچه مالی ایمن پرداز"
                      className="w-full md:mt-0 md:h-80 lg:h-auto object-contain animate-float"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2 rounded-md mt-3 md:mt-4 lg:mt-5 bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
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
