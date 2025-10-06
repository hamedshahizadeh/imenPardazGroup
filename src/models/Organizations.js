import { Schema, model, models } from "mongoose";

// تعریف اسکیمای Organizations
const organizationSchema = new Schema(
  {
    image: {
      type: String, // مسیر یا URL تصویر
      required: [true, "تصویر سازمان الزامی است"],
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
organizationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// مدل Organization
const Organization = models.Organization || model("Organization", organizationSchema);

export default Organization;
