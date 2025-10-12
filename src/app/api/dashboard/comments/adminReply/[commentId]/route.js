import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Blog from "@/models/Blog";

function findCommentOrReply(comments, id) {
  for (let comment of comments) {
    if (comment._id.toString() === id.toString()) return comment;
    if (comment.replies && comment.replies.length > 0) {
      const found = findCommentOrReply(comment.replies, id);
      if (found) return found;
    }
  }
  return null;
}

export async function POST(req, { params }) {
  await connectDB(); // اتصال به دیتابیس

  try {


    const { commentId } = await params;  // دریافت commentId از params
    const { blogId, author, text } = await req.json();  // دریافت داده‌های مورد نیاز از body درخواست

    

    // بررسی اینکه داده‌ها کامل هستند یا نه
    if (!blogId || !author || !text || !commentId) {
      return NextResponse.json(
        { error: "اطلاعات ناقص است" },
        { status: 400 }
      );
    }

    // پیدا کردن بلاگ هدف با استفاده از blogId
    const blog = await Blog.findById(blogId);
    if (!blog) {
      console.error("بلاگ پیدا نشد");  // لاگ خطا
      return NextResponse.json({ error: "بلاگ پیدا نشد" }, { status: 404 });
    }

    // پیدا کردن کامنت یا ریپلای مقصد
    const targetComment = findCommentOrReply(blog.comments, commentId);
    if (!targetComment) {
      console.error("کامنت پیدا نشد");  // لاگ خطا
      return NextResponse.json({ error: "کامنت پیدا نشد" }, { status: 404 });
    }

    // ساخت ریپلای ادمین
    const adminReply = {
      author, // شناسه ادمین
      text,
      date: new Date(),
      status: "approved", // پاسخ ادمین نیازی به تأیید ندارد
      isAdminReply: true,  // نشان دادن اینکه این یک پاسخ ادمین است
      replies: [],
    };

    // افزودن پاسخ ادمین به لیست ریپلای‌ها
    targetComment.replies.push(adminReply);

    await blog.save(); // ذخیره بلاگ با پاسخ جدید


    return NextResponse.json({
      success: true,
      message: "پاسخ ادمین با موفقیت ثبت شد",
      reply: adminReply,
    });
  } catch (err) {
    console.error("خطا در ثبت پاسخ ادمین:", err);  // لاگ خطا
    return NextResponse.json(
      { error: "ثبت پاسخ ادمین ناموفق بود" },
      { status: 500 }
    );
  }
}
