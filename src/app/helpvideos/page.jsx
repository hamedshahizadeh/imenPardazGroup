// src/app/page.jsx
import React from "react";
import VideoGallery from "@/components/templates/helpVideos/HelpVideos";
import FindUserMong from "@/utils/findUserMongo";
import Link from "next/link";

export default async function Page() {
  // درخواست به سرور برای بررسی وضعیت احراز هویت کاربر
  const user = await FindUserMong();

  const isAuthenticated = user && ["ADMIN", "VIP", "OWER"].includes(user.role);

  return (
    <div className="bg-gray-950 min-h-screen">
      {isAuthenticated ? (
        <VideoGallery /> // نمایش VideoGallery فقط برای کاربران مجاز
      ) : (
        <div className="bg-gray-950 min-h-screen flex items-center justify-center p-4">
          <div className="bg-gray-800/50 backdrop-blur-md  p-6 rounded-lg shadow-xl text-center max-w-md w-full">
            <p className="text-white text-base font-bold mb-4">
              شما مجاز به مشاهده این بخش نیستید.
            </p>
            <p className="text-gray-400 text-sm font-medium mb-6">
              اگر فکر می‌کنید باید به این بخش دسترسی داشته باشید، لطفاً با مدیر
              سایت تماس بگیرید.
            </p>
            <Link
              href="/auth/login" // اگر نیاز به ارجاع به صفحه ورود داشتید
              className="bg-[#49C5B6] text-white px-2 py-1  font-medium text-sm rounded-lg hover:bg-[#37A199] transition duration-300"
            >
              ورود به سیستم
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
