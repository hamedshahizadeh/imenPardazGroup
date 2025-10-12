import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Feedback from "@/models/Feedback";
import User from "@/models/User";
import FindUserMong from "@/utils/findUserMongo";

// 🔹 حذف نظر
export async function DELETE(req, { params }) {
  const session = await FindUserMong();
  if (!session) {
    return NextResponse.json(
      {
        error: "لطفا وارد حساب کاربری خود شوید",
      },
      { status: 401 }
    );
  }
  const user = await User.findOne({ email: session.email });
  if (user.role !== "OWER") {
    return NextResponse.json(
      { error: "تنها مالک سایت به این صفحه دسترسی دارد" },
      { status: 404 }
    );
  }
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "نظر یافت نشد" }, { status: 404 });
    }
    return NextResponse.json({ message: "نظر با موفقیت حذف شد" });
  } catch (error) {
    return NextResponse.json({ error: "خطا در حذف نظر" }, { status: 500 });
  }
}

// ✏️ ویرایش نظر
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { name, text } = await req.json();

    const updated = await Feedback.findByIdAndUpdate(
      id,
      { name, text },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "نظر یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "نظر بروزرسانی شد", updated });
  } catch (error) {
    return NextResponse.json({ error: "خطا در بروزرسانی" }, { status: 500 });
  }
}
