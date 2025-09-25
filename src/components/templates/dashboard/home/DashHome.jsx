"use client";
import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCrown, FaEdit, FaCamera } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";

export default function DashHome() {
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false); // کنترل انیمیشن
  const [username, setUsername] = useState("hamedshahizadeh");
  const [phone, setPhone] = useState("09123456789");
  const [email, setEmail] = useState("user@example.com");
  const [photo, setPhoto] = useState("/images/user.jpeg");
  const role = "مدیر کل";

  // وقتی مودال باز شد، انیمیشن scale و opacity فعال شود
  useEffect(() => {
    if (showModal) {
      setTimeout(() => setAnimateModal(true), 10);
    } else {
      setAnimateModal(false);
    }
  }, [showModal]);

  const handleSave = () => {
    setAnimateModal(false);
      setShowModal(false);
      toast.success("اطلاعات با موفقیت بروزرسانی شد ");
    
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="py-4 px-2 md:px-4 lg:px-5 w-full space-y-6 text-gray-200">
 
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md">
        <h1 className="text-xs md:text-sm font-bold text-[#49C5B6] mb-2">
          سلام حامد شاهی زاده عزیز 👋
        </h1>
        <p className="text-xs md:text-sm font-medium text-gray-300 text-justify">
          به داشبورد ایمن پرداز خوش آمدید. در این بخش می‌توانید اطلاعات حساب کاربری خود را مشاهده و مدیریت کنید.
        </p>
      </div>


      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md flex flex-col lg:flex-row items-center lg:items-start gap-6 relative">
        <div className="flex-shrink-0">
          <Image
            src={photo}
            alt="تصویر کاربر"
            width={120}
            height={120}
            className="rounded-full border-2 border-[#49C5B6]"
          />
        </div>

        <div className="flex-1 w-full">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4">
            <FaUser className="text-[#49C5B6]" />
            اطلاعات حساب
          </h2>

          <ul className="space-y-2 text-xs md:text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaUser className="text-[#49C5B6]" />
              <span className="font-medium text-gray-400">نام کاربری:</span>
              {username}
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-[#49C5B6]" />
              <span className="font-medium text-gray-400">شماره تماس:</span>
              {phone}
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[#49C5B6]" />
              <span className="font-medium text-gray-400">ایمیل:</span>
              {email}
            </li>
            <li className="flex items-center gap-2">
              <FaCrown className="text-yellow-400" />
              <span className="font-medium text-gray-400">نقش:</span>
              {role}
            </li>
          </ul>

          <div className="mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-2 text-xs   py-1 cursor-pointer bg-[#49C5B6] hover:bg-[#31CCBA] text-white font-medium rounded shadow-lg transition transform hover:scale-105"
            >
              <FaEdit />
              ویرایش اطلاعات
            </button>
          </div>
        </div>
      </div>

      

{showModal && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
    <div
      className={`bg-gray-900 rounded-2xl p-6 shadow-2xl max-w-sm w-full text-right transform transition-all duration-200 ${
        animateModal ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
  
      <div className="flex justify-center mb-4 relative">
        <Image
          src={photo}
          alt="تصویر کاربر"
          width={100}
          height={100}
          className="rounded-full border-2 border-[#49C5B6]"
        />
        <label className="absolute bottom-0 right-0 bg-[#49C5B6] text-white rounded-full p-2 cursor-pointer hover:bg-[#31CCBA]">
          <FaCamera />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </label>
      </div>

      <h2 className="text-xs md:text-sm font-medium text-white mb-4 text-center">
        ویرایش اطلاعات
      </h2>

      <div className="flex flex-col gap-4 text-right text-gray-200">
        
        <div className="flex flex-col">
          <label className="mb-1 flex items-center gap-2 text-xs md:text-sm font-medium">
            <FaUser className="text-[#49C5B6]" /> نام کاربری
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#49C5B6] text-xs md:text-sm font-medium"
          />
        </div>

        
        <div className="flex flex-col">
          <label className="mb-1 flex items-center gap-2 text-xs md:text-sm font-medium">
            <FaPhone className="text-[#49C5B6]" /> شماره تماس
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#49C5B6] text-xs md:text-sm font-medium"
          />
        </div>


        <div className="flex flex-col">
          <label className="mb-1 flex items-center gap-2 text-xs md:text-sm font-medium">
            <FaEnvelope className="text-[#49C5B6]" /> ایمیل
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-[#49C5B6] text-xs md:text-sm font-medium"
          />
        </div>
      </div>

     
      <div className="flex justify-center gap-4 mt-6">
             <button
          onClick={handleSave}
          className="px-3 text-xs md:text-sm font-medium py-2 cursor-pointer rounded-lg bg-[#49C5B6] hover:bg-[#31CCBA] text-white transition shadow-lg"
        >
          ذخیره
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="px-3 text-xs md:text-sm font-medium py-2 cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
        >
          انصراف
        </button>
   
      </div>
    </div>
  </div>
)}

    </div>
  );
}
