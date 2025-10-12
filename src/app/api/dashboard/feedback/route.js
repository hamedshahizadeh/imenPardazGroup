import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Feedback from "@/models/Feedback";
import User from "@/models/User";
import FindUserMong from "@/utils/findUserMongo";

export async function GET() {
  try {
    await connectDB();
    const reviews = await Feedback.find().sort({ createdAt: -1 });
    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json({ error: "خطا در دریافت نظرات" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
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
    const { name, text } = await req.json();

    if (!name || !text)
      return NextResponse.json(
        { error: "لطفاً همه فیلدها را پر کنید" },
        { status: 400 }
      );

    const newReview = await Feedback.create({ name, text });
    return NextResponse.json({ message: "نظر با موفقیت ثبت شد", newReview });
  } catch (error) {
    console.error("❌ خطا در POST Feedback:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
