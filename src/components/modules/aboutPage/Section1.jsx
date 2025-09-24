import Image from "next/image";

import Link from "next/link";
import AnimatedBackground from "../homePage/bgsec1";
const teamMembers = [
  {
    id: 1,
    name: "لطیف حاجی زاده",
    role: "مدیر عامل",
    img: "/images/boy.png",

    linkedin: "#",
  },
  {
    id: 2,
    name: "محمد امینی",
    role: "توسعه دهنده بک اند",
    img: "/images/boy.png",

    linkedin: "#",
  },
  {
    id: 3,
    name: "حامد شاهی زاده",
    role: "توسعه‌دهنده فرانت‌اند",
    img: "/images/boy.png",
        linkedin: "#",
  },
  {
    id: 4,
    name: "سحر سلیمی",
    role: "توسعه دهنده بک اند",
    img: "/images/girl.png",

    linkedin: "#",
  },
];

export default function Section1() {
  return (
    <div className="relative">
      <AnimatedBackground />

      <div className="container  pt-10 lg:py-10 lg:min-h-screen  relative z-10">
        <div>
          <div className=" py-10 ">
            <h1 className="text-sm md:text-base font-sans font-black mb-3 text-[#49C5B6] text-center py-2 rounded-md  bg-black/40 backdrop-blur-[5px]">
              درباره ی ما
            </h1>
            <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5 ">
              <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
                معرفی شرکت
              </h2>

              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                شرکت ایمن پرداز در سال 1383 با هدف فعالیت در زمینه نرم افزار پا
                به عرصه نهاد و همگام با رشد روزافزون صنعت ICT در دنیا به طور
                تخصصی فعالیت خود را بر سرویس های مبتنی بر وب متمرکز ساخت. پروژه
                های در دست اجرا و یا پیاده سازی این شرکت با معماری چند لایه
                (n-Tiers) بر پایه ی مفاهیم شئ گرا (Object Oriented) و با استفاده
                از از ابزار های مهندسی طراحی و ساخت نرم افزار و توجه به
                استاندارد های بین المللی(RUP,UML) طرح ریزی و ایجاد شده اند و
                قابلیت پذیزش سیستم های اختصاصی هر سازمانی را دارند. این مجموعه
                با دیدگاه های بلند مدت در تحقیق ، تولید، عرضه و پشتیبانی گامی
                بلند برداشته و همواره مشتری مداری را سرلوحه کار قرار داده است و
                سعی در ارائه ی خدماتی بهتر برای مشتریان دارد.
              </p>
            </div>
            <div className="pt-3 pb-5 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5 my-3">
              <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
                تیم ما
              </h2>

              <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
                با هم، هر روز تلاش می‌کنیم بهترین تجربه را برای مشتریان خود خلق
                کنیم.
              </p>
              <div className="grid gap-3 md:gap-4 lg:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 md:p-4 lg:p-5 text-white shadow-lg hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-12 h-12 object-cover rounded-full mx-auto mb-4 border-2 border-[#49C5B6]"
                    />
                    <h3 className="text-sm font-medium mb-2 text-center">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-[#49C5B6] text-center mb-3">
                      {member.role}
                    </p>
              
                    <div className="flex justify-center mt-4 gap-3">
                      <a
                        href={member.linkedin}
                        className="text-[#49C5B6] hover:text-white transition"
                      >
                        🔗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
