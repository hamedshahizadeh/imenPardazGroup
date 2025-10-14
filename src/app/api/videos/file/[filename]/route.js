// src/app/api/videos/file/[filename]/route.js
import fs from "fs";
import path from "path";

export async function GET(req, context) {
  try {
    const { filename } = await context.params || {};
    if (!filename) return new Response("Filename required", { status: 400 });

    const safeName = path.basename(filename);
    const filePath = path.join(process.cwd(), "uploads/videos", safeName);

    await fs.promises.access(filePath, fs.constants.F_OK);
    const fileBuffer = await fs.promises.readFile(filePath);

    const ext = path.extname(safeName).toLowerCase();
    const mime =
      ext === ".mp4"
        ? "video/mp4"
        : ext === ".webm"
        ? "video/webm"
        : ext === ".ogg"
        ? "video/ogg"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".png"
        ? "image/png"
        : ext === ".webp"
        ? "image/webp"
        : "application/octet-stream";

    return new Response(fileBuffer, { status: 200, headers: { "Content-Type": mime } });
  } catch (err) {
    console.error("File fetch error:", err);
    return new Response("File not found", { status: 404 });
  }
}
