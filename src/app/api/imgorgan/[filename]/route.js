import fs from "fs";
import path from "path";

export async function GET(req, context) {
  try {
    const { filename } = await context.params; // 🔥 این تغییر مهمه
    if (!filename) return new Response("Filename required", { status: 400 });

    const safeName = path.basename(filename); // جلوگیری از مسیرهای خطرناک
    const filePath = path.join(process.cwd(), "uploads/organization", safeName);

    // چک کن فایل وجود داره
    await fs.promises.access(filePath, fs.constants.F_OK);

    const fileBuffer = await fs.promises.readFile(filePath);

    const ext = path.extname(safeName).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".webp"
        ? "image/webp"
        : "application/octet-stream";

    return new Response(fileBuffer, {
      status: 200,
      headers: { "Content-Type": mimeType },
    });
  } catch (err) {
    console.error("Image fetch error:", err);
    return new Response("File not found", { status: 404 });
  }
}





export async function DELETE(req, context) {
  try {
    const { filename } = await context.params; // 👈 await نیاز داره
    if (!filename) {
      return new Response("Filename required", { status: 400 });
    }

    const safeName = path.basename(filename); // جلوگیری از ../../
    const filePath = path.join(process.cwd(), "uploads/organization", safeName);

    // چک کن فایل وجود داره
    await fs.promises.access(filePath, fs.constants.F_OK);

    // فایل رو حذف کن
    await fs.promises.unlink(filePath);

    return new Response(
      JSON.stringify({ message: "File deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Delete error:", err);
    return new Response("File not found or already deleted", { status: 404 });
  }
}