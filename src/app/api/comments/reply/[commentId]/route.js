import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

function findCommentOrReply(comments, id) {
  for (let comment of comments) {
    if (comment._id.toString() === id.toString()) return comment;
    if (comment.replies && comment.replies.length > 0) {
      const found = findCommentOrReply(comment.replies, id);
      if (found) return found;
    }
  }
  return null;
}

export async function POST(req, { params }) {
  const { commentId } =await params;

  try {
    const { blogId, author, text } = await req.json();
    if (!blogId || !author || !text || !commentId) {
      return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }

    // ابتدا بلاگ را پیدا کن
    const blog = await Blog.findById(blogId).populate("comments.replies.author", "name");
    if (!blog) return NextResponse.json({ error: "بلاگ پیدا نشد" }, { status: 404 });

    // پیدا کردن کامنت یا ریپلای والد
    const parentComment = findCommentOrReply(blog.comments, commentId);
    if (!parentComment) return NextResponse.json({ error: "کامنت پیدا نشد" }, { status: 404 });

    // ایجاد ریپلای جدید با فقط ID نویسنده
    const newReply = {
      author,
      text,
      date: new Date(),
      status: "pending",
      replies: [],
    };

    parentComment.replies.push(newReply);
    await blog.save();

    // بعد از ذخیره، ریپلای تازه را populate می‌کنیم
    const savedBlog = await Blog.findById(blogId)
      .populate("comments.replies.author", "name");

    // ریپلای جدید از روی blog تازه
    const updatedParent = findCommentOrReply(savedBlog.comments, commentId);
    const latestReply = updatedParent.replies[updatedParent.replies.length - 1];

    return NextResponse.json({
      success: true,
      message: "پاسخ شما جهت بررسی ارسال شد",
      reply: latestReply,
    });
  } catch (err) {
    console.error("خطا در ارسال ریپلای:", err);
    return NextResponse.json({ error: "ارسال پاسخ ناموفق بود" }, { status: 500 });
  }
}
