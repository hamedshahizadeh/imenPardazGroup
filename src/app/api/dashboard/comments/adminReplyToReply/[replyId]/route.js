import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Blog from "@/models/Blog";

export async function POST(req, { params }) {
  const { replyId } = await params;
  const { text, blogId, commentId, author } = await req.json();

  if (!text || !author || !blogId || !commentId) {
    return NextResponse.json(
      { error: "تمام فیلدها الزامی هستند" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ error: "بلاگ یافت نشد" }, { status: 404 });
    }

    const comment = blog.comments.id(commentId);
    if (!comment) {
      return NextResponse.json({ error: "کامنت یافت نشد" }, { status: 404 });
    }

    // بررسی اینکه ریپلای مقصد وجود دارد یا نه
    const targetReply = comment.replies.id(replyId);
    if (!targetReply) {
      return NextResponse.json({ error: "ریپلای مورد نظر یافت نشد" }, { status: 404 });
    }

    // افزودن پاسخ ادمین
    comment.replies.push({
      text,
      author,
      isAdminReply: true,
      status: "approved",
      createdAt: new Date(),
      parentReplyId: replyId, // برای نظم در ساختار تو در تو
    });

    await blog.save();

    return NextResponse.json({
      message: "پاسخ ادمین به ریپلای با موفقیت اضافه شد",
    });
  } catch (error) {
    console.error("❌ Error in admin reply to reply:", error);
    return NextResponse.json(
      { error: "خطا در افزودن پاسخ ادمین به ریپلای" },
      { status: 500 }
    );
  }
}
