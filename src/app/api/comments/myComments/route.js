import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Blog from "@/models/Blog";

function extractId(val) {
  if (!val) return null;
  if (typeof val === "object") {
    if (val._id) return val._id.toString();
    if (val.$oid) return String(val.$oid);
  }
  return String(val);
}

function traverseReplies(replies = [], blog, userId, out, parentId = null) {
  if (!Array.isArray(replies)) return;
  for (const reply of replies) {
    const replyAuthorId = extractId(reply.author);
    if (replyAuthorId === userId) {
      out.push({
        id: reply._id?.toString() || "",
        type: "reply",
        parentId: parentId,
        text: reply.text || "",
        status: reply.status || "pending",
        adminMessage: reply.adminMessage || "",
        date: reply.date || null,
        blogId: blog._id?.toString() || "",
        blogTitle: blog.title || "",
        blogLink: `/cards/${blog._id?.toString() || ""}`,
      });
    }
    if (reply.replies && reply.replies.length > 0) {
      traverseReplies(reply.replies, blog, userId, out, reply._id);
    }
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId مشخص نشده" }, { status: 400 });

    const blogs = await Blog.find({
      $or: [
        { "comments.author": userId },
        { "comments.replies.author": userId },
      ],
    }).lean();

    const results = [];

    for (const blog of blogs) {
      if (!Array.isArray(blog.comments)) continue;

      for (const comment of blog.comments) {
        const commentAuthorId = extractId(comment.author);
        if (commentAuthorId === userId) {
          results.push({
            id: comment._id?.toString() || "",
            type: "comment",
            parentId: null,
            text: comment.text || "",
            status: comment.status || "pending",
            adminMessage: comment.adminMessage || "",
            date: comment.date || null,
            blogId: blog._id?.toString() || "",
            blogTitle: blog.title || "",
            blogLink: `/cards/${blog._id?.toString() || ""}`,
          });
        }
        if (comment.replies && comment.replies.length > 0) {
          traverseReplies(comment.replies, blog, userId, results, comment._id);
        }
      }
    }

    results.sort((a, b) => new Date(b.date) - new Date(a.date));
    return NextResponse.json({ comments: results }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در دریافت کامنت‌ها" }, { status: 500 });
  }
}
