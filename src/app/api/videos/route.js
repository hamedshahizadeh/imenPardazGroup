// src/app/api/videos/route.js
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Video from "@/models/Video";

export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find().sort({ createdAt: -1 });
    return NextResponse.json({ videos }, { status: 200 });
  } catch (err) {
    console.error("Get videos error:", err);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, description, category, videoUrl, thumbnail, status } = body;

    if (!title || !videoUrl || !thumbnail) {
      return NextResponse.json({ error: "title, videoUrl and thumbnail are required" }, { status: 400 });
    }

    const video = await Video.create({
      title,
      description,
      category,
      videoUrl,
      thumbnail,
      status: status || "approved", // per your request: default 'approved'
    });

    return NextResponse.json({ message: "Video created", video }, { status: 201 });
  } catch (err) {
    console.error("Create video error:", err);
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
  }
}
