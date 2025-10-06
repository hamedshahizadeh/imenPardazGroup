// app/api/dashboard/organization/[filename]/route.js
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import Organization from "@/models/Organizations";
import connectDB from "@/utils/connectDB";

// نمایش تصویر
export async function GET(req, { params }) {
  try {
    const { filename } = await params;

    const filePath = path.join(process.cwd(), "uploads", "organization", filename);

    if (!fs.existsSync(filePath)) {
      console.error("❌ فایل پیدا نشد:", filePath);
      return NextResponse.json({ error: "فایل پیدا نشد" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

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
    console.error("❌ خطا در نمایش تصویر سازمان:", err);
    return NextResponse.json({ error: "خطا در نمایش تصویر" }, { status: 500 });
  }
}

// حذف تصویر از دیتابیس
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { filename } = await params;

    // حذف رکورد سازمان
    const org = await Organization.findOneAndDelete({ image: filename });

    if (!org) {
      console.error("❌ رکورد سازمان پیدا نشد");
      return NextResponse.json({ error: "رکورد سازمان پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "تصویر سازمان با موفقیت حذف شد" }, { status: 200 });
  } catch (err) {
    console.error("❌ خطا در حذف تصویر سازمان:", err);
    return NextResponse.json({ error: "خطا در حذف تصویر سازمان" }, { status: 500 });
  }
}
