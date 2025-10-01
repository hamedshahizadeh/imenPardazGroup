"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimatedBackground from "@/components/modules/homePage/bgsec1";

import {
  FaBars,
  FaSignOutAlt,
  FaCogs,
  FaUsers,
  FaBlog,
  FaBuilding,
  FaComments,
  FaVideo,
  FaUserShield,
  FaStar,
  FaUser,
  FaChevronDown,
  FaCommentDots,
} from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [siteMenuOpen, setSiteMenuOpen] = useState(false);

  const router = useRouter();
  const handleLogout = () => {
    setShowModal(false);
    toast.success("خروج شما با موفقیت انجام شد");
    router.push("/");
    // اینجا میتونی ریدایرکت کنی مثلا:
    // router.push("/logout") یا API لاگ اوت بزنی
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white font-medium relative overflow-hidden pt-14 lg:pt-16">
      {/* انیمیشن بک‌گراند */}
      <AnimatedBackground className="absolute inset-0 z-0" />

      {/* Overlay تاریک با انیمیشن */}
      <div
        className={`
          fixed inset-0 bg-black lg:hidden transition-opacity duration-300
    
          ${
            menuOpen
              ? "opacity-50 pointer-events-auto z-15"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* منو بار با Glassmorphism + Shadow + Inner Glow */}
      <aside
        className={`
          fixed top-0 right-0 h-full bg-gray-800/60 backdrop-blur-md shadow-xl ring-1 ring-white/10 z-30
          w-64 transform transition-transform duration-300 ease-in-out container
          overflow-y-auto pb-5
                pt-16 lg:pt-1
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
      >
        <div>
          <div className="pt-5 z-30 flex justify-center">
            <Image
              src="/images/user.jpeg"
              width={300}
              priority
              height={300}
              alt="عکس پرسنلی"
              className="rounded-full w-12 h-12 md:w-14 md:h-14 border-2 border-[#49C5B6]"
            />
          </div>
          <p className="text-center font-medium text-[10px] md:text-xs mt-1 md:mt-2 text-gray-200">
            حامد شاهی زاده
          </p>
        </div>
        <ul className="space-y-2 mt-4 ">
          <li>
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-xs md:text-sm font-sans font-medium 
                     bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 
                     transition duration-300 text-gray-100"
            >
              <FaUser className="text-lg text-[#49C5B6]" />
              <span>پروفایل</span>
            </Link>
          </li>

          <li>
            <button
              onClick={() => setSiteMenuOpen(!siteMenuOpen)}
              className="w-full flex items-center justify-between gap-3 text-xs md:text-sm font-sans font-medium 
           bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 
           transition duration-300 text-gray-100"
            >
              <div className="flex items-center gap-3 text-xs md:text-sm font-medium">
                <FaCogs className="text-lg text-[#49C5B6]" />
                <span>مدیریت کلی سایت</span>
              </div>
              <FaChevronDown
                className={`transition-transform ${
                  siteMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {siteMenuOpen && (
              <ul className="px-1 md:px-2 mt-2 space-y-2">
                {/* سازمان‌ها */}
                <li>
                  <Link
                    href="/dashboard/organizations"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-xs md:text-sm font-sans font-medium 
               bg-white/5 hover:bg-white/15 rounded-lg px-3 py-2 
               text-gray-300 hover:text-white transition"
                  >
                    <FaBuilding className="text-sm text-[#49C5B6]" />
                    <span>سازمان‌ها</span>
                  </Link>
                </li>

                {/* نظرات مشتریان */}
                <li>
                  <Link
                    href="/dashboard/customer-reviews"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-xs md:text-sm font-sans font-medium 
               bg-white/5 hover:bg-white/15 rounded-lg px-3 py-2 
               text-gray-300 hover:text-white transition"
                  >
                    <FaComments className="text-sm text-[#49C5B6]" />
                    <span>نظرات مشتریان</span>
                  </Link>
                </li>

                {/* تیم ما */}
                <li>
                  <Link
                    href="/dashboard/team"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-xs md:text-sm font-sans font-medium 
               bg-white/5 hover:bg-white/15 rounded-lg px-3 py-2 
               text-gray-300 hover:text-white transition"
                  >
                    <FaUsers className="text-sm text-[#49C5B6]" />
                    <span>تیم ما</span>
                  </Link>
                </li>

                {/* ویدیوها */}
                <li>
                  <Link
                    href="/dashboard/videos"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-xs md:text-sm font-sans font-medium 
               bg-white/5 hover:bg-white/15 rounded-lg px-3 py-2 
               text-gray-300 hover:text-white transition"
                  >
                    <FaVideo className="text-sm text-[#49C5B6]" />
                    <span>ویدیوها</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center justify-between gap-3 text-xs md:text-sm font-sans font-medium 
                     bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 
                     transition duration-300 text-gray-100"
            >
              <div className="flex items-center gap-3 text-xs md:text-sm font-medium">
                <FaUsers className="text-lg text-[#49C5B6]" />
                <span>مدیریت کاربران</span>
              </div>
              <FaChevronDown
                className={`transition-transform ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {userMenuOpen && (
              <ul className="px-1 md:px-2 mt-2 space-y-2">
                {/* مدیران */}
                <li>
                  <Link
                    href="/dashboard/users/admins"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-xs md:text-sm font-sans font-medium 
                     bg-white/5 hover:bg-white/15 rounded-lg px-3 py-2 
                     text-gray-300 hover:text-white transition"
                  >
                    <FaUserShield className="text-sm text-[#49C5B6]" />
                    <span>مدیران</span>
                  </Link>
                </li>

                {/* کاربران ویژه */}
                <li>
                  <Link
                    href="/dashboard/users/vip"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-xs md:text-sm font-sans font-medium 
                     bg-white/5 hover:bg-white/15 rounded-lg px-3 py-2 
                     text-gray-300 hover:text-white transition"
                  >
                    <FaStar className="text-sm text-yellow-300" />
                    <span>کاربران ویژه</span>
                  </Link>
                </li>

                {/* کاربران عادی */}
                <li>
                  <Link
                    href="/dashboard/users/regular"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-xs md:text-sm font-sans font-medium 
                     bg-white/5 hover:bg-white/15 rounded-lg px-3 py-2 
                     text-gray-300 hover:text-white transition"
                  >
                    <FaUser className="text-sm text-gray-400" />
                    <span>کاربران عادی</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* مدیریت بلاگ‌ها */}
          <li>
            <Link
              href="/dashboard/blogs"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 font-sans font-medium 
                     bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 
                     transition duration-300 text-gray-100
                     text-xs md:text-sm"
            >
              <FaBlog className="text-lg text-[#49C5B6]" />
              <span>مدیریت بلاگ‌ها</span>
            </Link>
          </li>

          {/* مدیریت کامنت‌ها */}
          <li>
            <Link
              href="/dashboard/comments"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-xs md:text-sm font-sans font-medium 
                     bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 
                     transition duration-300 text-gray-100"
            >
              <FaComments className="text-lg text-[#49C5B6]" />
              <span>مدیریت کامنت‌ها</span>
            </Link>
          </li>

          {/* کامنت‌های من */}
          <li>
            <Link
              href="/dashboard/mycomment"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-xs md:text-sm font-sans font-medium 
           bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 
           transition duration-300 text-gray-100"
            >
              <FaCommentDots className="text-lg text-[#49C5B6]" />
              <span>کامنت‌های من</span>
            </Link>
          </li>
          {/* خروج */}
          <li>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-3 text-xs md:text-sm font-sans font-medium 
                   bg-white/10 hover:bg-red-600/30 rounded-xl px-3 py-2 
                   transition duration-300 text-red-400 w-full
                   cursor-pointer"
            >
              <FaSignOutAlt className="text-lg" />
              <span>خروج</span>
            </button>
          </li>
        </ul>
      </aside>

      <button
        className="fixed bottom-4 right-4 z-20 p-3 bg-[#49C5B6] text-white rounded-full lg:hidden cursor-pointer transition-transform hover:scale-110"
        onClick={() => setMenuOpen(true)}
      >
        <FaBars />
      </button>
      <main
        className="
    flex-1 
    pt-6 
    transition-all duration-300 ease-in-out 
    relative z-10 
  
    overflow-y-auto
    pb-5
  "
      >
        {children}
      </main>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4">
              آیا مطمئن هستید که می‌خواهید خارج شوید؟
            </h2>
            <div className="flex justify-center gap-4 mt-2 md:mt-3 lg:mt-4">
              <button
                onClick={handleLogout}
                className="px-3 text-xs md:text-sm font-medium py-2 cursor-pointer rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                تایید
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
