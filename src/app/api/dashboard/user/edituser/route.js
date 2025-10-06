import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB"; 
import User from "@/models/User"; 

export async function PATCH(req) {
  const { userName, userPhone, email } = await req.json();
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
      },
      { error: "در ارتباط به دیتابیس مشکلی رخ داده است" }
    );
  }
  if ( userPhone.length < 10 ){
    return NextResponse.json(
      { error: "لطفا شماره معتبر وارد کنید" },
      {
        status: 422,
      }
    );
  }
  const user = await User.findOne({ email });
  user.name = userName;
  user.phone = userPhone;
  user.save();
  return NextResponse.json(
    { status: 200 },
    {
      message: "اطلاعات با موفقیت بروزرسانی شد",
    }
  );
}
