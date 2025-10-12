import mongoose, { Schema, models } from "mongoose";

const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "عنوان الزامی است"],
      trim: true,
      maxlength: [100, "عنوان نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"],
    },
    text: {
      type: String,
      required: [true, "متن نظر الزامی است"],
      trim: true,
      maxlength: [1000, "نظر نمی‌تواند بیش از ۱۰۰۰ کاراکتر باشد"],
    },
  },
  { timestamps: true } // شامل createdAt و updatedAt
);

// جلوگیری از ساخت مدل تکراری در Next.js
const Feedback = models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;
