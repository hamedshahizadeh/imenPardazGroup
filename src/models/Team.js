import { Schema, model, models } from "mongoose";

// تعریف اسکیمای تیم
const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام فرد الزامی است"],
      trim: true,
    },
    position: {
      type: String, // سمت فرد (مثلاً مدیرعامل، طراح، برنامه‌نویس و غیره)
      required: [true, "سمت فرد الزامی است"],
      trim: true,
    },
    image: {
      type: String, // مسیر یا URL تصویر
      required: [true, "تصویر فرد الزامی است"],
    },
    description: {
      type: String, // توضیح کوتاه درباره فرد
      trim: true,
      default: "",
    },
    social: {
      instagram: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      github: { type: String, trim: true, default: "" },
      telegram: { type: String, trim: true, default: "" },
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  {
    versionKey: false, // حذف __v
  }
);

// به‌روزرسانی خودکار updatedAt قبل از ذخیره
teamSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// مدل Team
const Team = models.Team || model("Team", teamSchema);

export default Team;
