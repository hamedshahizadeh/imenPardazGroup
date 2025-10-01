// src/app/api/imgorgan/route.js
import fs from "fs";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "uploads/imgteam");
const ALLOWED_EXT = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"];

export async function GET() {
  try {
    await fs.promises.mkdir(IMAGES_DIR, { recursive: true });

    const files = await fs.promises.readdir(IMAGES_DIR);
    const imageFiles = files.filter((f) =>
      ALLOWED_EXT.includes(path.extname(f).toLowerCase())
    );

    return new Response(JSON.stringify(imageFiles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error reading images dir:", err);
    return new Response(JSON.stringify({ error: "Failed to read images" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
