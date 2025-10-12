// app/api/blog/route.js
import connectDB from '@/utils/connectDB'; 
import Blog from '@/models/Blog'; 

export async function POST(req) {
  try {
    await connectDB();

    // دریافت اطلاعات از بدنه درخواست
    const { image, title, description, content } = await req.json();

    // بررسی صحت اطلاعات ارسالی
    if (!image || !title || !description || !content) {
      return new Response(
        JSON.stringify({ error: 'لطفاً همه فیلدها را پر کنید' }),
        { status: 400 }
      );
    }

    // ساخت بلاگ جدید
    const newBlog = new Blog({
      image,
      title,
      description,
      content,
      published: false, // به طور پیش‌فرض منتشر نشده
      comments: [], // لیست کامنت‌ها خالی است
    });

    // ذخیره بلاگ در دیتابیس
    await newBlog.save();

    // ارسال پاسخ موفقیت‌آمیز
    return new Response(
      JSON.stringify({
        message: 'بلاگ جدید با موفقیت ایجاد شد',
        newBlog,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'خطا در ایجاد بلاگ' }),
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    await connectDB(); // اتصال به دیتابیس

    const blogs = await Blog.find().sort({ createdAt: -1 }); // مرتب‌سازی بر اساس جدیدترین
    return new Response(
      JSON.stringify({ blogs }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "خطا در دریافت بلاگ‌ها" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}