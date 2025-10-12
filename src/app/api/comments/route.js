import Blog from "@/models/Blog";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { blogId, author, text } = await req.json();

    if (!blogId || !author || !text) {
      return NextResponse.json({ error: "اطلاعات ناقص است." }, { status: 400 });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) return NextResponse.json({ error: "بلاگ پیدا نشد." }, { status: 404 });

    const newComment = {
      author,
      text,
      approved: false,
      replies: [],
    };

    blog.comments.push(newComment);
    await blog.save();

    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "ارسال کامنت ناموفق بود." }, { status: 500 });
  }
}
