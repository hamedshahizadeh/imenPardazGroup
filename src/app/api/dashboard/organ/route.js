// app/api/dashboard/organization/route.js
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Organization from "@/models/Organizations";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json(
        { error: "تصویر الزامی است." },
        { status: 400 }
      );
    }

    // فقط یک تصویر ذخیره می‌کنیم؛ اگر لازم باشه می‌تونیم قبلش پاک کنیم
    const organization = await Organization.create({ image });

    return NextResponse.json(
      { message: "تصویر سازمان با موفقیت ذخیره شد", organization },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ خطا در ذخیره تصویر سازمان:", error);
    return NextResponse.json(
      { error: "خطا در ذخیره تصویر سازمان" },
      { status: 500 }
    );
  }
}

// 📌 دریافت تصویر سازمان
export async function GET() {
  try {
    await connectDB();

    // دریافت  تصاویر ذخیره شده
    const organization = await Organization.find()

    return NextResponse.json({ organization }, { status: 200 });
  } catch (error) {
    console.error("❌ خطا در دریافت تصویر سازمان:", error);
    return NextResponse.json(
      { error: "خطا در دریافت تصویر سازمان" },
      { status: 500 }
    );
  }
}
