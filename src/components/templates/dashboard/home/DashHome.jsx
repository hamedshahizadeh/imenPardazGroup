"use client";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCrown,
  FaEdit,
  FaCamera,
  FaIdCard,
  FaKey,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useUser } from "../../../../../context/UserContext";

export default function DashHome() {
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [animatePasswordModal, setAnimatePasswordModal] = useState(false);
  const user = useUser();
  const [newPassword, setNewPassword] = useState("");

  const [username, setUsername] = useState(user?.email);
  const [fullName, setFullName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  useEffect(() => {
    if (showModal) setTimeout(() => setAnimateModal(true), 10);
    else setAnimateModal(false);
  }, [showModal]);

  useEffect(() => {
    if (showPasswordModal) setTimeout(() => setAnimatePasswordModal(true), 10);
    else setAnimatePasswordModal(false);
  }, [showPasswordModal]);

  const handleSave = () => {
    setAnimateModal(false);
    setShowModal(false);
    toast.success("اطلاعات با موفقیت بروزرسانی شد ✅");
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePasswordChange = () => {
    if (newPassword.length < 4) {
      toast.error("رمز عبور نباید کمتر از ۴ رقم باشد ");
      return;
    }
    setAnimatePasswordModal(false);
    setShowPasswordModal(false);
    setNewPassword("");
    toast.success("رمز عبور با موفقیت تغییر کرد 🔑");
  };

  return (
    <div className="py-4 container w-full space-y-6 text-gray-200">
      {/* خوشامد */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md">
        <h1 className="text-xs md:text-sm font-bold text-[#49C5B6] mb-2">
          سلام {user?.name} عزیز 👋
        </h1>
        <p className="text-xs md:text-sm font-medium text-gray-300 text-justify">
          به داشبورد ایمن پرداز خوش آمدید. در این بخش می‌توانید اطلاعات حساب
          کاربری خود را مشاهده و مدیریت کنید.
        </p>
      </div>

      {/* کارت پروفایل */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md flex flex-col lg:flex-row items-center lg:items-start gap-6 relative">
        <div className="flex-1 w-full">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4">
            <FaUser className="text-[#49C5B6]" />
            اطلاعات حساب
          </h2>

          <ul className="space-y-2 text-xs md:text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaIdCard className="text-[#49C5B6]" />
              <span className="font-medium text-gray-400">
                نام و نام خانوادگی:
              </span>
              {user?.name}
            </li>
            <li className="flex items-center gap-2">
              <FaUser className="text-[#49C5B6]" />
              <span className="font-medium text-gray-400">نام کاربری:</span>
              {user?.email}
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-[#49C5B6]" />
              <span className="font-medium text-gray-400">شماره تماس:</span>
              {user?.phone}
            </li>

            <li className="flex items-center gap-2">
              <FaCrown className="text-yellow-400" />
              <span className="font-medium text-gray-400">نقش:</span>
              {user?.role === "USER"
                ? "کاربر عادی"
                : user?.role === "ADMIN"
                ? "مدیر"
                : "بدون نقش"}
            </li>
          </ul>

          <div className="mt-4 flex gap-2 flex-wrap">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-2 text-xs py-1 cursor-pointer bg-[#49C5B6] hover:bg-[#31CCBA] text-white font-medium rounded shadow-lg transition transform hover:scale-105"
            >
              <FaEdit />
              ویرایش اطلاعات
            </button>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-2 px-2 text-xs py-1 cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-white font-medium rounded shadow-lg transition transform hover:scale-105"
            >
              <FaKey />
              تغییر رمز عبور
            </button>
          </div>
        </div>
      </div>

      {/* --- Modal تغییر رمز عبور --- */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60">
          <div
            className={`bg-gray-900 rounded-2xl p-6 shadow-2xl max-w-sm w-full text-right transform transition-all duration-200 ${
              animatePasswordModal
                ? "opacity-100 scale-100"
                : "opacity-0 scale-90"
            }`}
          >
            <h2 className="text-xs md:text-sm font-medium text-white mb-4 text-center">
              تغییر رمز عبور
            </h2>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="رمز عبور جدید"
              className="w-full p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-yellow-500 text-xs md:text-sm font-medium"
            />

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handlePasswordChange}
                className="px-3 text-xs md:text-sm font-medium py-2 cursor-pointer rounded-lg bg-yellow-500 hover:bg-yellow-400 text-white transition shadow-lg"
              >
                تغییر
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-3 text-xs md:text-sm font-medium py-2 cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Modal ویرایش اطلاعات (مثل قبل) --- */}
      {showModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 overflow-y-auto">
          <div
            className={`bg-gray-900 rounded-2xl p-6 shadow-2xl mt-10 overflow-y-auto max-w-sm w-full text-right transform transition-all duration-200 ${
              animateModal ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <h2 className="text-xs md:text-sm font-medium text-white mb-4 text-center">
              {" "}
              ویرایش اطلاعات{" "}
            </h2>{" "}
            <div className="flex flex-col gap-4 text-right text-gray-200">
              {" "}
              {/* نام و نام خانوادگی */}{" "}
              <div className="flex flex-col">
                {" "}
                <label className="mb-1 flex items-center gap-2 text-10 md:text-xs font-medium">
                  {" "}
                  <FaIdCard className="text-[#49C5B6]" /> نام و نام خانوادگی{" "}
                </label>{" "}
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#49C5B6] text-xs md:text-sm font-medium"
                />{" "}
              </div>{" "}
              {/* نام کاربری */}{" "}
              <div className="flex flex-col">
                {" "}
                <label className="mb-1 flex items-center gap-2 text-[10px] md:text-xs font-medium">
                  {" "}
                  <FaUser className="text-[#49C5B6]" /> نام کاربری{" "}
                </label>{" "}
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#49C5B6] text-xs md:text-sm font-medium"
                />{" "}
              </div>{" "}
              {/* شماره تماس */}{" "}
              <div className="flex flex-col">
                {" "}
                <label className="mb-1 flex items-center gap-2 text-[10px] md:text-xs font-medium">
                  {" "}
                  <FaPhone className="text-[#49C5B6]" /> شماره تماس{" "}
                </label>{" "}
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#49C5B6] text-xs md:text-sm font-medium"
                />{" "}
              </div>
              <div className="flex justify-end gap-4 mt-6">
                {" "}
                <button
                  onClick={handleSave}
                  className="px-3 text-xs md:text-sm font-medium py-2 cursor-pointer rounded-lg bg-[#49C5B6] hover:bg-[#31CCBA] text-white transition shadow-lg"
                >
                  {" "}
                  ذخیره{" "}
                </button>{" "}
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 text-xs md:text-sm font-medium py-2 cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
                >
                  {" "}
                  انصراف{" "}
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
