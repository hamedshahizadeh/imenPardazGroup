"use client"
import AnimatedBackground from "@/components/modules/homePage/bgsec1";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaSignInAlt, FaPhone } from "react-icons/fa";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !emailOrUsername || !phone || !password || !confirmPassword) {
      toast.error("لطفاً همه فیلدها را پر کنید!");
      return;
    }

    // شرط شماره تلفن
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("شماره تلفن باید با 09 شروع شود و 11 رقم باشد!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("رمز عبور و تکرار آن مطابقت ندارند!");
      return;
    }

    toast.success(`ثبت‌نام با موفقیت انجام شد، ${username}! 🎉`);

    // ریست کردن فیلدها
    setUsername("");
    setEmailOrUsername("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="relative bg-gray-950">
      <AnimatedBackground />
      <div className="flex items-center justify-center min-h-screen pb-5 pt-10 lg:py-5 relative z-10">
        <div className="w-full max-w-md bg-gray-900/30 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-800">
          <h2 className="text-lg font-bold text-center text-white mb-3">
            ایجاد حساب کاربری
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* نام کامل */}
            <div className="relative">
              <FaUser className="absolute right-3 top-3 text-gray-400" size={14} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="نام کامل"
                className="w-full pl-3 pr-8 py-2 text-sm rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition"
              />
            </div>

            {/* ایمیل یا نام کاربری */}
            <div className="relative">
              <FaEnvelope className="absolute right-3 top-3 text-gray-400" size={14} />
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="ایمیل یا نام کاربری"
                className="w-full pl-3 pr-8 text-sm py-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition"
              />
            </div>

            {/* شماره تلفن */}
            <div className="relative">
              <FaPhone className="absolute right-3 top-3 text-gray-400" size={14} />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="شماره تلفن"
                className="w-full pl-3 pr-8 text-sm py-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition"
              />
            </div>

            {/* رمز عبور */}
            <div className="relative">
              <FaLock className="absolute right-3 top-3 text-gray-400" size={14} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور"
                className="w-full pl-3 pr-8 text-sm py-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition"
              />
            </div>

            {/* تکرار رمز عبور */}
            <div className="relative">
              <FaLock className="absolute right-3 top-3 text-gray-400" size={14} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="تکرار رمز عبور"
                className="w-full pl-3 pr-8 text-sm py-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition"
              />
            </div>

            {/* دکمه ثبت‌نام */}
            <button
              type="submit"
              className="w-full flex items-center text-sm cursor-pointer justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold transition shadow-md"
            >
              <FaSignInAlt size={14} />
              ثبت‌نام
            </button>
          </form>

          {/* لینک ورود */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            حساب کاربری دارید؟{" "}
            <Link href="/auth/login" className="text-cyan-400 hover:underline">
              ورود
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
