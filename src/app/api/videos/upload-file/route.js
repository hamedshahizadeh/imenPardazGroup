// src/app/api/videos/upload-file/route.js
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ error: "File too large. Max 500MB allowed." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const uploadsDir = path.join(process.cwd(), "uploads/videos");
    fs.mkdirSync(uploadsDir, { recursive: true });

    const safeName = Date.now() + "-" + path.basename(file.name).replace(/\s+/g, "-");
    const filePath = path.join(uploadsDir, safeName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return new Response(JSON.stringify({ filename: safeName }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Upload video error:", err);
    return new Response(JSON.stringify({ error: "Failed to upload video" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
