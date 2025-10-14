// src/app/api/videos/upload-poster/route.js
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ error: "Poster too large. Max 5MB allowed." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // only allow images
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"];
    const ext = path.extname(file.name).toLowerCase();
    if (!allowed.includes(ext)) {
      return new Response(JSON.stringify({ error: "Invalid poster type" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const uploadsDir = path.join(process.cwd(), "uploads/videos");
    fs.mkdirSync(uploadsDir, { recursive: true });

    const safeName = Date.now() + "-" + path.basename(file.name).replace(/\s+/g, "-");
    const filePath = path.join(uploadsDir, safeName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return new Response(JSON.stringify({ filename: safeName }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Upload poster error:", err);
    return new Response(JSON.stringify({ error: "Failed to upload poster" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
