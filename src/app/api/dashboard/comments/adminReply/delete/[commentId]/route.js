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
      console.log("Blog not found for commentId:", commentId);
      return NextResponse.json({ error: "بلاگ یافت نشد" }, { status: 404 });
    }

    const comment = blog.comments.id(commentId);
    if (!comment) {
      console.log("Comment not found:", commentId);
      return NextResponse.json({ error: "کامنت یافت نشد" }, { status: 404 });
    }

    console.log("Replies before delete:", comment.replies.map(r => r._id.toString()));
    console.log("Trying to delete replyId:", replyId);

    const initialLength = comment.replies.length;
    comment.replies = comment.replies.filter(
      (reply) => reply._id.toString() !== replyId
    );

    if (comment.replies.length === initialLength) {
      console.log("Reply not found:", replyId);
      return NextResponse.json({ error: "ریپلای یافت نشد" }, { status: 404 });
    }

    await blog.save();

    console.log("Replies after delete:", comment.replies.map(r => r._id.toString()));
    return NextResponse.json({ message: "ریپلای با موفقیت حذف شد" });

  } catch (error) {
    console.error("Error deleting reply:", error);
    return NextResponse.json({ error: "خطا در حذف ریپلای" }, { status: 500 });
  }
}
