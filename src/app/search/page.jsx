import connectDB from "@/utils/connectDB";
import Blog from "@/models/Blog";
import Card from "@/components/modules/card/Card";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";

export default async function SearchPage(props) {
  await connectDB();

  // ✅ گرفتن searchParams به‌صورت async
  const searchParams = await props.searchParams;
  const query = (searchParams?.query || "").trim();

  // 📦 جستجو بین پست‌های منتشرشده
  const results = await Blog.find({
    published: true,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ],
  })
    .sort({ updatedAt: -1 })
    .lean();

  return (
    <div className="bg-gray-950 min-h-screen pt-24 pb-10">
      <div className="container">
        <h1 className="text-white font-bold text-sm lg:text-base mb-6 flex items-center gap-2">
          <FaSearch className="text-[#49C5B6]" />
          نتایج جستجو برای:{" "}
          <span className="text-[#49C5B6]">{query || "همه مقالات"}</span>
        </h1>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item) => (
              <Card
                key={item._id.toString()}
                id={item._id.toString()}
                title={item.title}
                description={item.description}
                img={`/api/dashboard/blog/${item.image}`}
                date={new Date(item.updatedAt).toLocaleDateString("fa-IR")}
              />
            ))}
          </div>
        ) : (
          <div className="flex py-10 justify-center">
            <Image
              src="/images/not.png"
              width={300} // عرض عکس
              height={300} // ارتفاع عکس
              priority
              className="object-contain"
              alt="چیزی پیدا نشد"
            />
          </div>
        )}
      </div>
    </div>
  );
}
