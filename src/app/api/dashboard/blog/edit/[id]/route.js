import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Blog from "@/models/Blog";

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { title, description, content, image } = await req.json();

    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json({ error: "بلاگ یافت نشد" }, { status: 404 });
    }

    blog.title = title;
    blog.description = description;
    blog.content = content;
    
    // اگر image فرستاده نشده، همان عکس قبلی را نگه دار
    if (image) blog.image = image;

    await blog.save();

    return NextResponse.json({ message: "بلاگ با موفقیت ویرایش شد", updatedBlog: blog });
  } catch (err) {
    console.error("❌ خطا در ویرایش بلاگ:", err);
    return NextResponse.json({ error: "خطا در ویرایش بلاگ" }, { status: 500 });
  }
}
