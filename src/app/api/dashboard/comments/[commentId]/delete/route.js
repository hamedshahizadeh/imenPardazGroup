import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Blog from "@/models/Blog"; 

export async function DELETE(req, { params }) {
  const { commentId } =await params;

  try {
    if (!commentId || commentId.length !== 24 || !/^[a-fA-F0-9]{24}$/.test(commentId)) {
      return NextResponse.json({ error: "مقدار commentId نادرست است" }, { status: 400 });
    }

    await connectDB();

    // پیدا کردن بلاگ حاوی کامنت
    const blog = await Blog.findOne({ "comments._id": commentId });
    if (!blog) {
      console.log("Blog not found for commentId:", commentId);
      return NextResponse.json({ error: "بلاگ یافت نشد" }, { status: 404 });
    }

    const initialLength = blog.comments.length;
    blog.comments = blog.comments.filter(c => c._id.toString() !== commentId);

    if (blog.comments.length === initialLength) {
      console.log("Comment not found:", commentId);
      return NextResponse.json({ error: "کامنت یافت نشد" }, { status: 404 });
    }

    await blog.save();
    console.log("Deleted commentId:", commentId);
    return NextResponse.json({ message: "کامنت با موفقیت حذف شد" });

  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "خطا در حذف کامنت" }, { status: 500 });
  }
}