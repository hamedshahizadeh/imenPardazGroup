// src/app/api/upload-image/route.js
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // محدودیت حجم (مثلا 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ error: "File too large" }), {
        status: 400,
      });
    }

    // بررسی پسوند
    const ext = path.extname(file.name).toLowerCase().slice(1);
    const allowedExt = ["jpg", "jpeg", "png", "webp"];
    if (!allowedExt.includes(ext)) {
      return new Response(JSON.stringify({ error: "Invalid file type" }), {
        status: 400,
      });
    }

    // ساخت پوشه در صورت نیاز
    const uploadsDir = path.join(process.cwd(), "uploads/imgblog");
    fs.mkdirSync(uploadsDir, { recursive: true });

    // ایمن‌سازی نام فایل
    const safeName = Date.now() + "-" + path.basename(file.name);
    const filePath = path.join(uploadsDir, safeName);

    // نوشتن فایل
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    return new Response(
      JSON.stringify({ message: "Upload successful", filename: safeName }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(
      JSON.stringify({ error: "Upload failed", details: err.message }),
      { status: 500 }
    );
  }
}
