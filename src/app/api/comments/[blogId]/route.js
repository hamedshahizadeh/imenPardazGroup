import Blog from "@/models/Blog";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { blogId } = await params;

  if (!blogId)
    return NextResponse.json({ error: "BlogId مشخص نشده" }, { status: 400 });

  try {
    const blog = await Blog.findById(blogId).lean();
    if (!blog)
      return NextResponse.json({ error: "بلاگ پیدا نشد" }, { status: 404 });

    // فقط کامنت‌های تأییدشده
    const approvedComments =
      blog.comments?.filter((c) => c.status === "approved") || [];

    // 🧠 cache برای جلوگیری از درخواست تکراری به User
    const userCache = new Map();

    // 🧩 تابع بازگشتی برای جایگزینی author ID با نام کاربر
    async function populateAuthors(items) {
      for (let item of items) {
        if (item.author) {
          const authorId =
            typeof item.author === "object"
              ? item.author._id?.toString()
              : item.author.toString();

          if (userCache.has(authorId)) {
            item.author = {
              _id: authorId,
              name: userCache.get(authorId),
            };

          
          } else {
            const user = await User.findById(authorId).select("name").lean();
            const name = user ? user.name : "کاربر حذف‌شده";
            userCache.set(authorId, name);
            item.author = { _id: authorId, name };
          }
        } else {
          item.author = { name: "ناشناس" };
        }

        // ✅ ریپلای‌ها را هم بازگشتی پردازش کن
        if (item.replies && item.replies.length > 0) {
          await populateAuthors(item.replies);
        }
      }
    }

    await populateAuthors(approvedComments);

    return NextResponse.json({ comments: approvedComments });
  } catch (err) {
    console.error("❌ خطا در دریافت کامنت‌ها:", err);
    return NextResponse.json({ error: "خطا در دریافت کامنت‌ها" }, { status: 500 });
  }
}
