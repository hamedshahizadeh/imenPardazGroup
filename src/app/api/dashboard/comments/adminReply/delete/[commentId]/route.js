import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Blog from "@/models/Blog";

export async function DELETE(req, { params }) {
  const { commentId } = await params; // نیازی به await نیست
  const { replyId } = await req.json();

  try {
    await connectDB();

    const blog = await Blog.findOne({ "comments._id": commentId });
    if (!blog) {
      
      return NextResponse.json({ error: "بلاگ یافت نشد" }, { status: 404 });
    }

    const comment = blog.comments.id(commentId);
    if (!comment) {
    
      return NextResponse.json({ error: "کامنت یافت نشد" }, { status: 404 });
    }

  

    const initialLength = comment.replies.length;
    comment.replies = comment.replies.filter(
      (reply) => reply._id.toString() !== replyId
    );

    if (comment.replies.length === initialLength) {
  
      return NextResponse.json({ error: "ریپلای یافت نشد" }, { status: 404 });
    }

    await blog.save();
    return NextResponse.json({ message: "ریپلای با موفقیت حذف شد" });
  } catch (error) {
    return NextResponse.json({ error: "خطا در حذف ریپلای" }, { status: 500 });
  }
}
