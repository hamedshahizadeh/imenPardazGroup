// src/app/api/videos/[id]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Video from "@/models/Video";
import fs from "fs";
import path from "path";

export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const video = await Video.findById(id);
    if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ video }, { status: 200 });
  } catch (err) {
    console.error("Get video error:", err);
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } =await context.params;
    // Expect JSON body with fields to update OR partial (we'll accept all)
    const body = await req.json();
    const allowed = ["title", "description", "category", "videoUrl", "thumbnail", "status"];
    const update = {};
    allowed.forEach((k) => {
      if (body[k] !== undefined) update[k] = body[k];
    });

    const updated = await Video.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ message: "Video updated", video: updated }, { status: 200 });
  } catch (err) {
    console.error("Update video error:", err);
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const video = await Video.findById(id);
    if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // delete files from disk (video and thumbnail) if exist
    const uploadsDir = path.join(process.cwd(), "uploads/videos");
    try {
      if (video.videoUrl) {
        const videoPath = path.join(uploadsDir, video.videoUrl);
        if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
      }
      if (video.thumbnail) {
        const thumbPath = path.join(uploadsDir, video.thumbnail);
        if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
      }
    } catch (err) {
      console.warn("File delete warning:", err);
    }

    await Video.findByIdAndDelete(id);
    return NextResponse.json({ message: "Video deleted" }, { status: 200 });
  } catch (err) {
    console.error("Delete video error:", err);
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
  }
}
