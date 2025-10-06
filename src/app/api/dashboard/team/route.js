import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB"; 
import Team from "@/models/Team";

export async function POST(req) {


  try {
    await connectDB();
    console.log("✅ Connected to DB");

    const body = await req.json();


    const { name, position, image, description, social } = body;
  

    if (!name || !position || !image) {
      return NextResponse.json(
        { error: "فیلدهای الزامی ناقص‌اند." },
        { status: 400 }
      );
    }

    const member = await Team.create({
      name,
      position,
      image,
      description: description || "",
      social: social || {},
    });


    return NextResponse.json(
      { message: "عضو جدید با موفقیت اضافه شد", member },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ خطا در افزودن عضو تیم:", error);
    return NextResponse.json(
      { error: "خطا در افزودن عضو تیم" },
      { status: 500 }
    );
  }
}




// 📌 دریافت لیست اعضای تیم
export async function GET() {
  try {
    await connectDB();
    // دریافت همه اعضا به ترتیب جدیدترین اول
    const team = await Team.find().sort({ createdAt: -1 });

    return NextResponse.json({ team }, { status: 200 });
  } catch (error) {
    console.error("❌ خطا در دریافت اعضای تیم:", error);
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات تیم" },
      { status: 500 }
    );
  }
}