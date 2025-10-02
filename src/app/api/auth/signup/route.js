import { NextResponse } from "next/server";
import User from "@/models/User"; 
import { hashPassword } from "@/utils/auth"; 
import connectDB from "@/utils/connectDB"; 

export async function POST(req) {
  try {
    await connectDB();
    const { name, phone, email, password } = await req.json();
    
    if (password.length < 4) {
      return NextResponse.json(
        { error: "طول پسورد کمتر از ۴ کاراکتر است" },
        { status: 422 }
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
    const newUser = await User.create({
      name: name,
      phone: phone,
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "حساب کاربری با موفقیت ایجاد شد" },
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
