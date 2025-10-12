// /api/dashboard/comments/adminReply/publish/[commentId].js
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Blog from "@/models/Blog";

export async function PATCH(req, { params }) {
  try {
    const { commentId } = await params;
    const { replyId } = await req.json();  // دریافت replyId از بدنه درخواست

    await connectDB();

    const blog = await Blog.findOne({ "comments.replies._id": replyId });
    if (!blog) return NextResponse.json({ error: "ریپلای پیدا نشد" }, { status: 404 });

    const comment = blog.comments.find((c) => c.replies.id(replyId));
    const reply = comment.replies.id(replyId);

    // تغییر وضعیت ریپلای به منتشر شده
    reply.status = "approved";
    await blog.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در انتشار ریپلای" }, { status: 500 });
  }
}
