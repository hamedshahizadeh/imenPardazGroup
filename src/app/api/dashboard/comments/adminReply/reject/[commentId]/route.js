// /api/dashboard/comments/adminReply/reject/[commentId]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Blog from "@/models/Blog";

export async function PATCH(req, { params }) {
  try {
    const { commentId } = params;
    const { replyId, adminMessage } = await req.json();

    if (!commentId || !replyId)
      return NextResponse.json({ error: "شناسه‌ها ناقص است" }, { status: 400 });

    await connectDB();

    // پیدا کردن بلاگ حاوی این reply
    const blog = await Blog.findOne({ "comments.replies._id": replyId });
    if (!blog)
      return NextResponse.json({ error: "ریپلای پیدا نشد" }, { status: 404 });

    // پیدا کردن کامنت موردنظر
    const comment = blog.comments.id(commentId);
    if (!comment)
      return NextResponse.json({ error: "کامنت پیدا نشد" }, { status: 404 });

    // پیدا کردن ریپلای درون آن کامنت
    const reply = comment.replies.id(replyId);
    if (!reply)
      return NextResponse.json({ error: "ریپلای یافت نشد" }, { status: 404 });

    // تغییر وضعیت ریپلای
    reply.status = "rejected";
    reply.adminMessage = adminMessage || "بدون توضیح";

    await blog.save();

    return NextResponse.json({
      success: true,
      message: "ریپلای با موفقیت رد شد",
      reply,
    });
  } catch (err) {
    console.error("❌ Error rejecting reply:", err.message, err.stack);
    return NextResponse.json(
      { error: "خطا در رد کردن ریپلای در سرور", details: err.message },
      { status: 500 }
    );
  }
}
