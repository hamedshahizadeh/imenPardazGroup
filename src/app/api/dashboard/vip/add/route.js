import { NextResponse } from "next/server";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import FindUserMong from "@/utils/findUserMongo";
export async function POST(req) {
  try {
    await connectDB();
    const { name, phone, email, password } = await req.json();
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
    if (user.role !=="OWER") {
      return NextResponse.json(
        { error: "تنها مالک سایت به این صفحه دسترسی دارد" },
        { status: 404 }
      );
    }

    const existingUserByEmail = await User.findOne({ email });
    const hashedPassword = await hashPassword(password);
    const existingUserByPhone = await User.findOne({
      phone: phone,
    });
    if (existingUserByEmail || existingUserByPhone) {
      return NextResponse.json(
        { error: "این حساب کاربری با ایمیل یا شماره وجود دارد" },
        {
          status: 422,
        }
      );
    } 

    const a = "VIP"
    const newUser = await User.create({
      name: name,
      phone: phone,
      email: email,
      password: hashedPassword,
      role: a
    });

    return NextResponse.json(
      { message: "کاربر ویژه با موفقیت اضافه شد" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در اتصال به سرور رخ داده است!" },
      {
        status: 500,
      }
    );
  }
}
