"use client";
import AnimatedBackground from "@/components/modules/homePage/bgsec1";
import { useState } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("لطفاً ایمیل و رمز عبور را وارد کنید!");
      return;
    }

    // مثال ساده ورود موفق
    if (email === "test@test.com" && password === "123456") {
    toast.success("ورود موفقیت‌آمیز بود!");
      setEmail("");
      setPassword("");
      router.push("/dashboard"); // هدایت به صفحه داشبورد
    } else {
      toast.error("ایمیل یا رمز عبور اشتباه است!");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="relative bg-gray-950">
      <AnimatedBackground />
      <div className="flex items-center justify-center min-h-screen pb-5 pt-10 lg:py-5 relative z-10">
        <div className="w-full max-w-md bg-gray-900/30 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-800">
          <h2 className="text-lg font-bold text-center text-white mb-6">
            ورود به حساب کاربری
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* ایمیل */}
            <div className="relative">
              <FaEnvelope
                className="absolute right-3 top-3 text-gray-400"
                size={14}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید"
                className="w-full pl-3 pr-8 text-sm py-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition"
              />
            </div>

            {/* رمز عبور */}
            <div className="relative">
              <FaLock
                className="absolute right-3 top-3 text-gray-400"
                size={14}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید"
                className="w-full pl-3 pr-8 text-sm py-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition"
              />
            </div>

        
            <button
              type="submit"
              className="w-full text-sm  cursor-pointer flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold transition shadow-md"
            >
              <FaSignInAlt size={14} />
              ورود
            </button>
          </form>
          <div className="flex items-center justify-between mt-4 text-sm">
            <label className="flex items-center text-gray-400 gap-2">
              <input type="checkbox" className="accent-cyan-500" />
              <span>مرا به خاطر بسپار</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-cyan-400 hover:underline"
            >
              فراموشی رمز عبور؟
            </Link>
          </div>

          <p className="text-center text-gray-400 mt-6 text-sm">
            حساب کاربری ندارید؟{" "}
            <Link href="/auth/register" className="text-cyan-400 hover:underline">
              ثبت نام کنید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
