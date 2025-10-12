import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB"; 
import Blog from "@/models/Blog";
// فرض کنید مسیر PATCH برای رد کردن کامنت مشابه این است
export async function PATCH(req, { params }) {
  try {
    const { commentId } = await params;
    const { adminMessage } = await req.json();

    const blog = await Blog.findOne({ "comments._id": commentId });
    if (!blog) return NextResponse.json({ error: "کامنت پیدا نشد" }, { status: 404 });

    const comment = blog.comments.id(commentId);
    comment.status = "rejected";  // تغییر وضعیت کامنت
    comment.adminMessage = adminMessage;  // ذخیره دلیل رد شدن در adminMessage

    await blog.save();  // ذخیره تغییرات در دیتابیس
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در رد کردن کامنت" }, { status: 500 });
  }
}
