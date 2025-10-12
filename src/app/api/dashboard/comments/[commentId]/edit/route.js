import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB"; 
import Blog from "@/models/Blog";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { commentId } = await params;
    const { text } = await req.json();

    const blog = await Blog.findOne({ "comments._id": commentId });
    if (!blog) return NextResponse.json({ error: "کامنت پیدا نشد" }, { status: 404 });

    const comment = blog.comments.id(commentId);
    comment.text = text;

    await blog.save();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در ویرایش کامنت" }, { status: 500 });
  }
}
