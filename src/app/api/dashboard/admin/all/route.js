// app/api/admins/route.js
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import FindUserMong from "@/utils/findUserMongo";

export async function GET() {
  try {
    // اتصال به DB
    await connectDB();

    // بررسی سشن (توابع شما باید session را برگردانند؛ اینجا فقط چک می‌کنیم)
    const session = await FindUserMong();
    if (!session?.email) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    // پیدا کردن کاربر جاری
    const currentUser = await User.findOne({ email: session.email }).select("email role name");
    if (!currentUser) {
      return NextResponse.json(
        { error: "کاربر یافت نشد" },
        { status: 404 }
      );
    }

    // فقط OWER اجازه دسترسی دارد
    if (currentUser.role !== "OWER") {
      return NextResponse.json(
        { error: "شما اجازه دسترسی به این بخش را ندارید" },
        { status: 403 }
      );
    }

    // گرفتن ادمین‌ها — فقط فیلدهای امن و لازم
    const admins = await User.find({ role: "ADMIN" }).select("name email phone role createdAt");

    return NextResponse.json({ admins }, { status: 200 });
  } catch (error) {
    console.error("❌ /api/admins Error:", error);
    return NextResponse.json(
      { error: "مشکلی در اتصال به سرور رخ داده است!" },
      { status: 500 }
    );
  }
}
