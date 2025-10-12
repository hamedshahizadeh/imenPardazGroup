import connectDB from "@/utils/connectDB";
import Blog from "@/models/Blog";
import Card from "../card/Card";

export default async function Section6() {
  await connectDB();

  // فقط پست‌های منتشرشده
  const blogs = await Blog.find({ published: true })
    .sort({ updatedAt: -1 })
    .lean();

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 pt-6 pb-10">
      {blogs.map((item) => (
        <Card
          key={item._id.toString()}
          id={item._id.toString()}
          title={item.title}
          description={item.description}
          img={`/api/dashboard/blog/${item.image}`} // مسیر عکس
          date={new Date(item.updatedAt).toLocaleDateString("fa-IR")}
        />
      ))}
    </div>
  );
}
