import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";  // اتصال به دیتابیس
import Blog from "@/models/Blog";  // مدل بلاگ

export async function PUT(req, { params }) {
  try {
    // اتصال به دیتابیس
    await connectDB();

    // دریافت params و اطمینان از اینکه به درستی استخراج می‌شود
    const { id } = await params; // اینجا params باید await شود

    // پیدا کردن بلاگ با استفاده از id
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "بلاگ یافت نشد" }, { status: 404 });
    }

    // تغییر وضعیت انتشار بلاگ
    blog.published = !blog.published;  // تغییر وضعیت

    await blog.save();  // ذخیره تغییرات

    return NextResponse.json({ 
      message: "وضعیت انتشار بلاگ با موفقیت تغییر کرد", 
      updatedBlog: blog 
    });
  } catch (err) {
    console.error("❌ خطا در تغییر وضعیت انتشار بلاگ:", err);
    return NextResponse.json({ error: "خطا در تغییر وضعیت انتشار بلاگ" }, { status: 500 });
  }
}
