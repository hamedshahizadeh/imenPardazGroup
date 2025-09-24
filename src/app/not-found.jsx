import AnimatedBackground from "@/components/modules/homePage/bgsec1";
import Link from "next/link";

export default function NotFound() {
    return (
      <div className="relative bg-gray-950">
        <AnimatedBackground />
  
        <div className="container pb-5 pt-4 lg:pt-10 lg:pb-5 lg:min-h-screen  relative z-10">
          <div>
            <div className=" px-6 py-10  mt-10">
       
              <div className="py-2 rounded-md  bg-black/40 backdrop-blur-[5px] px-3 md:px-4 lg:px-5">
          <div className="relative py-20 overflow-hidden text-center px-4">
      {/* پس‌زمینه گرادیانت */}
      <div className="absolute inset-0 animate-gradient"></div>

      {/* ذرات شناور */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 bg-teal-400 rounded-full opacity-70 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* محتوای اصلی */}
      <div className="relative z-10">
        <h1 className="text-7xl font-extrabold text-teal-400 mb-4 animate-bounce">
          404
        </h1>
        <h2 className="text-2xl text-white mb-2 animate-pulse font-medium">
          صفحه پیدا نشد
        </h2>
        <p className="text-gray-300 mb-6 animate-fadeIn font-medium">
          متاسفانه صفحه‌ای که دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>

        <Link
          href="/"
          className="inline-block font-medium px-6 py-2 bg-teal-500 text-white rounded-lg shadow-lg hover:scale-110 hover:bg-teal-600 transition-transform duration-300"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  
              </div>
           
            </div>
          </div>
        </div>
      </div>
    )
}
