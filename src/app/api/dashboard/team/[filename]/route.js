import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import Team from "@/models/Team"; // مدل تیم شما
import connectDB from "@/utils/connectDB"; // اتصال به دیتابیس

export async function GET(req, { params }) {
  try {
    const { filename } = await params;

    // مسیر فایل در uploads/imgteam
    const filePath = path.join(process.cwd(), "uploads", "imgteam", filename);

    // بررسی وجود فایل
    if (!fs.existsSync(filePath)) {
      console.error("❌ فایل پیدا نشد:", filePath);
      return NextResponse.json({ error: "فایل پیدا نشد" }, { status: 404 });
    }

    // خواندن فایل باینری
    const fileBuffer = fs.readFileSync(filePath);

    // تشخیص نوع mime
    const ext = path.extname(filename).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".gif"
        ? "image/gif"
        : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (err) {
    console.error("❌ خطا در نمایش تصویر:", err);
    return NextResponse.json({ error: "خطا در نمایش تصویر" }, { status: 500 });
  }
}







export async function DELETE(req, { params }) {
  try {
    // اتصال به دیتابیس
    await connectDB();

    const { filename } =await params;

    // حذف رکورد عضو تیم از دیتابیس
    const teamMember = await Team.findOneAndDelete({ image: filename });
    
    if (!teamMember) {
      console.error("❌ رکورد تیم پیدا نشد");
      return NextResponse.json({ error: "رکورد تیم پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "عضو تیم با موفقیت حذف شد" }, { status: 200 });
  } catch (err) {
    console.error("❌ خطا در حذف عضو تیم:", err);
    return NextResponse.json({ error: "خطا در حذف عضو تیم" }, { status: 500 });
  }
}
