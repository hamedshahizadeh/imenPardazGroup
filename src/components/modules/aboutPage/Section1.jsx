import Image from "next/image";
import AnimatedBackground from "../homePage/bgsec1";
import connectDB from "@/utils/connectDB";
import Team from "@/models/Team";

export default async function Section1() {
  // 📦 دریافت اعضای تیم از دیتابیس (در سرور)
  await connectDB();
  const team = await Team.find().lean();

  return (
    <div className="relative">
      <AnimatedBackground />

      <div className="container pt-10 lg:py-10 lg:min-h-screen relative z-10">
        <div className="py-10">
          {/* عنوان اصلی */}
          <h1 className="text-sm md:text-base font-sans font-black mb-3 text-[#49C5B6] text-center py-2 rounded-md bg-black/40 backdrop-blur-[5px]">
            درباره‌ی ما
          </h1>

          {/* معرفی شرکت */}
          <div className="py-2 rounded-md bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
            <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
              معرفی شرکت
            </h2>

            <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
              شرکت ایمن پرداز در سال 1383 با هدف فعالیت در زمینه نرم افزار پا
              به عرصه نهاد و همگام با رشد روزافزون صنعت ICT در دنیا به طور
              تخصصی فعالیت خود را بر سرویس‌های مبتنی بر وب متمرکز ساخت. پروژه‌های
              این شرکت با معماری چندلایه (n-Tiers) بر پایه‌ی مفاهیم شیء‌گرا و
              با استفاده از ابزارهای مهندسی نرم‌افزار (RUP, UML) طراحی شده‌اند و
              قابلیت سفارشی‌سازی برای هر سازمانی را دارند. این مجموعه همواره
              مشتری‌مداری را سرلوحه کار خود قرار داده است.
            </p>
          </div>

          {/* تیم ما */}
          <div className="pt-3 pb-5 rounded-md bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5 my-3">
            <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
              تیم ما
            </h2>

            <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
              با هم، هر روز تلاش می‌کنیم بهترین تجربه را برای مشتریان خود خلق کنیم.
            </p>

            {team.length === 0 ? (
              <p className="text-center text-gray-400 text-sm mt-5">
                هنوز عضوی اضافه نشده است.
              </p>
            ) : (
              <div className="grid gap-3 md:gap-4 lg:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3">
                {team.map((member) => (
                  <div
                    key={member._id.toString()}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 md:p-4 lg:p-5 text-white shadow-lg hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      width={200}
                      height={200}
                      src={`/api/dashboard/team/${member.image}`}
                      alt={member.name}
                      className="w-12 h-12 object-cover rounded-full mx-auto mb-4 border-2 border-[#49C5B6]"
                    />
                    <h3 className="text-sm font-medium mb-2 text-center">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-[#49C5B6] text-center mb-3">
                      {member.position}
                    </p>
                 
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
