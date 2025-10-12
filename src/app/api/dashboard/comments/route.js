import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB"; 
import Blog from "@/models/Blog";

// 📌 دریافت همه‌ی کامنت‌ها از تمام بلاگ‌ها
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({})
      .populate("comments.author", "name email")
      .populate("comments.replies.author", "name email")
      .lean();

    // تبدیل به ساختار ساده برای داشبورد
    const allComments = blogs.map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title,
      image: blog.image,
      comments: blog.comments.map((c) => ({
        _id: c._id.toString(),
        author:
          typeof c.author === "object"
            ? c.author.name || c.author.email
            : c.author,
        text: c.text,
        status: c.status,
        adminMessage: c.adminMessage,
        date: c.date,
        replies:
          c.replies?.map((r) => ({
            _id: r._id.toString(),
            author:
              typeof r.author === "object"
                ? r.author.name || r.author.email
                : r.author,
            text: r.text,
            status: r.status,
            adminMessage: r.adminMessage,
            date: r.date,
          })) || [],
      })),
    }));

    return NextResponse.json(allComments);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در دریافت کامنت‌ها" }, { status: 500 });
  }
}
