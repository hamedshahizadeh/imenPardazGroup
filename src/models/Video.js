// src/models/Video.js
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "" },
    videoUrl: { type: String, required: true }, // filename in uploads/videos
    thumbnail: { type: String, required: true }, // filename in uploads/videos
    status: { type: String, enum: ["approved","pending","rejected"], default: "approved" },
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);
