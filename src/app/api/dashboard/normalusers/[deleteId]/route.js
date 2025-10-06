
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import FindUserMong from "@/utils/findUserMongo";
import { NextResponse } from "next/server";

export async function DELETE(req, context) {
  try {
    await connectDB();
    const {deleteId} = await context.params;

    const session = await FindUserMong();
    if (!session) {
      return NextResponse.json(
        {
          error: "لطفا وارد حساب کاربری خود شوید",
        },
        { status: 401 }
      );
    }
    const user = await User.findOne({ email: session.email });
    if (user.role !=="OWER") {
      return NextResponse.json(
        { error: "تنها مالک سایت به این صفحه دسترسی دارد" },
        { status: 404 }
      );
    }

  

    await User.deleteOne({ _id: deleteId });

    return NextResponse.json(
      { message: "کاربر  مورد نظر با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, context) {
  try {
    await connectDB();
    const { name, email, phone, password } = await req.json();
    const { deleteId } = await context.params;

    const session = await FindUserMong();
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const users = await User.findOne({ email: session.email });
    if (users.role !== "OWER") {
      return NextResponse.json(
        { error: "تنها مالک سایت به این صفحه دسترسی دارد" },
        { status: 403 }
      );
    }

    const user = await User.findById(deleteId);
    if (!user) {
      return NextResponse.json(
        { error: "کاربر  پیدا نشد" },
        { status: 404 }
      );
    }

    // 🔹 چک ایمیل تکراری (به جز همین یوزر فعلی)
    if (email && email !== user.email) {
      const existingUserByEmail = await User.findOne({
        email,
        _id: { $ne: deleteId }, // هر کسی غیر از این یوزر
      });
      if (existingUserByEmail) {
        return NextResponse.json(
          { error: "این نام کاربری (ایمیل) قبلاً ثبت شده است" },
          { status: 422 }
        );
      }
    }

    // 🔹 چک شماره تکراری (به جز همین یوزر فعلی)
    if (phone && phone !== user.phone) {
      const existingUserByPhone = await User.findOne({
        phone,
        _id: { $ne: deleteId },
      });
      if (existingUserByPhone) {
        return NextResponse.json(
          { error: "این شماره تلفن قبلاً ثبت شده است" },
          { status: 422 }
        );
      }
    }

    // اگر پسورد تغییر کرد، هش کن
    let hashedPassword = user.password;
    if (password && password.length > 0) {
      hashedPassword = await hashPassword(password);
    }

    // 🔹 آپدیت فیلدها
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.password = hashedPassword;

    await user.save();

    return NextResponse.json(
      { message: `کاربر  "${user.name}" با موفقیت ویرایش شد` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "خطا در سرور" },
      { status: 500 }
    );
  }
}
