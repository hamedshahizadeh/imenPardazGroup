import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { hashPassword, verifyPassword } from "@/utils/auth";

export async function PATCH(req) {
  const { email, oldPassword, newPassword } = await req.json();

  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { error: "در ارتباط به دیتابیس مشکلی رخ داده است" },
      { status: 500 }
    );
  }

  // چک کردن اینکه رمز جدید خالی یا خیلی کوتاه نباشه
  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json(
      { error: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
      { status: 422 }
    );
  }

  // پیدا کردن کاربر
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { error: "کاربری با این ایمیل پیدا نشد" },
      { status: 404 }
    );
  }

  // چک کردن پسورد قدیمی
  const isValid = await verifyPassword(oldPassword, user.password);
  if (!isValid) {
    return NextResponse.json(
      { error: "رمز عبور فعلی اشتباه است" },
      { status: 401 }
    );
  }

  // هش کردن پسورد جدید
  const hashedNewPassword = await hashPassword(newPassword);
  user.password = hashedNewPassword;
  await user.save();

  return NextResponse.json(
    { message: "رمز عبور با موفقیت تغییر کرد" },
    { status: 200 }
  );
}
