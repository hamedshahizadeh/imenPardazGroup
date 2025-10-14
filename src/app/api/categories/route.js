// src/app/api/categories/route.js
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ name: 1 });
    // return array of strings for simple frontend usage
    const names = categories.map((c) => c.name);
    return NextResponse.json({ categories: names }, { status: 200 });
  } catch (err) {
    console.error("Get categories error:", err);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name } = body;
    if (!name || !name.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const exists = await Category.findOne({ name });
    if (exists) return NextResponse.json({ error: "Category already exists" }, { status: 400 });

    const cat = await Category.create({ name });
    return NextResponse.json({ message: "Category created", category: cat }, { status: 201 });
  } catch (err) {
    console.error("Create category error:", err);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
