import mongoose, { Schema, models } from "mongoose";

// ✅ زیر‌اسکیما برای ریپلای‌ها (پاسخ به کامنت)
const replySchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminMessage: {
      type: String,
      default: "",
    },
    isAdminReply: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

// ✅ زیر‌اسکیما برای کامنت‌ها (که درون هر بلاگ ذخیره می‌شوند)
const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // مرجع به مدل کاربر
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminMessage: {
      type: String,
      default: "",
    },
    replies: [replySchema], // ⬅️ ریپلای‌های هر کامنت
  },
  { _id: true }
);

// ✅ اسکیمای اصلی بلاگ
const blogSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema], // ⬅️ مجموعه کامنت‌ها
  },
  { timestamps: true }
);

// ✅ مدل نهایی
const Blog = models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
