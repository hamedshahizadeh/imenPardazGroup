import Image from "next/image";
import { FaRegNewspaper } from "react-icons/fa";
import Comments from "@/components/modules/comment/Comment";
import MinCard from "@/components/modules/card/MinCard";
import { FaClock } from "react-icons/fa6";
import FindUserMong from "@/utils/findUserMongo";
import connectDB from "@/utils/connectDB";
import Blog from "@/models/Blog"; // مدل بلاگ

export const dynamic = "force-dynamic"; // برای force-dynamic بودن صفحه

export default async function CardPage({ params }) {
  const { id } = await params; // id از params دریافت می‌شود.

  // اتصال به دیتابیس
  await connectDB();

  // دریافت بلاگ از دیتابیس بر اساس id
  const card = await Blog.findById(id).lean();

  // چک کردن لاگین بودن کاربر
  const user = await FindUserMong();
  const isLoggedIn = !!user;

  // اگر بلاگ پیدا نشد
  if (!card) {
    return (
      <div className="bg-gray-950 min-h-screen">
        <div className="container mx-auto pt-24 pb-5 text-white">
          <p className="px-4 py-2 bg-sky-500 rounded-md">کارت پیدا نشد!</p>
        </div>
      </div>
    );
  }

  // پیدا کردن آخرین بلاگ‌ها به جز بلاگ فعلی
  const lastCards = await Blog.find({ published: true })
    .sort({ updatedAt: -1 })
    .limit(5)
    .lean();

  return (
    <div className="bg-gray-950 min-h-screen text-white pt-20">
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="md:col-span-2 lg:col-span-3">
          <div className="bg-slate-900 rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative pb-3 md:pb-5">
              <Image
                src={`/api/dashboard/blog/${card.image}`} // مسیر تصویر
                alt={card.title}
                priority
                width={1500}
                height={1500}
                className="w-full h-56 md:h-64 lg:h-96 rounded-md"
              />
            </div>
            <div className="container py-3 px-2 md:px-4 lg:px-6 flex flex-col flex-1">
              <div className="flex gap-1 mb-1">
                <FaClock className="text-[#49C5B6] size-3.5" />
                <span className="text-gray-400 text-xs mb-1">
                  {new Date(card.updatedAt).toLocaleDateString("fa-IR")}{" "}
                  {/* تبدیل تاریخ به فارسی */}
                </span>
              </div>
              <h1 className="text-[#49C5B6] font-bold text-sm md:text-base mb-2">
                {card.title}
              </h1>
              <p className="text-gray-100 text-xs md:text-sm text-justify font-bold">
                {card.description}
              </p>
              <p className="text-gray-300 text-xs md:text-sm text-justify leading-relaxed font-medium mt-3 mb-3">
                {card.content}
              </p>
            </div>
          </div>
          <div>
            <Comments
              blogId={card._id.toString()}
              initialComments={
                card.comments
                  ? JSON.parse(JSON.stringify(card.comments)) // ⚠️ تبدیل به plain object
                  : []
              }
              isLoggedIn={isLoggedIn}
              user={user ? JSON.parse(JSON.stringify(user)) : null}
            />
          </div>
        </div>

        <div className="rounded-lg shadow-md overflow-hidden flex flex-col w-full max-w-full">
          <div className="p-4 border-b flex items-center gap-2 border-gray-700">
            <FaRegNewspaper className="text-[#49C5B6] text-lg" />
            <h2 className="text-white font-semibold text-sm md:text-base">
              آخرین اخبار
            </h2>
          </div>

          <div className="">
            {lastCards.map((c) => (
              <MinCard key={c._id.toString()} {...c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
