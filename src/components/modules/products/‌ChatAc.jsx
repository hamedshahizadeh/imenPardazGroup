"use client";

import { useState } from "react";
import { FaRocket, FaClock, FaComments, FaUsers, FaProjectDiagram, FaCogs, FaChevronDown } from "react-icons/fa";

const items = [
  {
    title: "افزایش کارایی و بهره وری",
    icon: <FaRocket className="w-5 h-5 text-teal-400" />,
    content: "با استفاده از سیستم‌ چت سازمانی ایمن پرداز، اعضای تیم می‌توانند سریع‌تر به اطلاعات دسترسی پیدا کنند و ارتباطات خود را به شکلی مؤثرتر انجام دهند.",
  },
  {
    title: "کاهش زمان تلف‌شده",
    icon: <FaClock className="w-5 h-5 text-yellow-400" />,
    content: "معمولاً سریع‌تر از ایمیل‌ها یا مکالمات تلفنی هستند، به همین دلیل سرعت تصمیم‌گیری و حل مسائل در سازمان افزایش می‌یابد.",
  },
  {
    title: "ارتباط شفاف تر",
    icon: <FaComments className="w-5 h-5 text-blue-400" />,
    content: "سیستم چت سازمانی ایمن پرداز می‌تواند شفافیت بیشتری در ارتباطات ایجاد کند، چرا که تمام مکالمات و اطلاعات در یک مکان ذخیره می‌شوند.",
  },
  {
    title: "بهبود همکاری تیمی",
    icon: <FaUsers className="w-5 h-5 text-green-400" />,
    content: "این سیستم‌ به تیم‌ها اجازه می‌دهد تا به راحتی همکاری کنند و بدون نیاز به جلسات حضوری، وظایف خود را پیگیری و تکمیل نمایند.",
  },
  {
    title: "کاهش پراکندگی اطلاعات",
    icon: <FaProjectDiagram className="w-5 h-5 text-purple-400" />,
    content: "به جای استفاده از چندین کانال ارتباطی (ایمیل،تلفن،پیامک و ...) همه ارتباطات در یک سیستم واحد انجام می شود.",
  },
  {
    title: "بهبود مدیریت منابع",
    icon: <FaCogs className="w-5 h-5 text-orange-400" />,
    content: "با داشتن یک سیستم متمرکز و یکپارچه و لینک با چت سازمانی برای ارتباطات، منابع انسانی و زمانی سازمان بطور بهینه تری مدیریت می شود.",
  },
];

export default function ChatAccordion() {
  const [openIndex, setOpenIndex] = useState(0); // اولین آیتم باز

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto pb-5 pt-3 space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-gray-900 text-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Header */}
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-1 md:px-3 lg:px-4 py-3 focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-xs md:text-sm font-medium">{item.title}</span>
            </div>
            <FaChevronDown
              className={`w-4 h-4 transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

      
          <div
            className={`px-2 md:px-4 overflow-hidden transition-all duration-500 ${
              openIndex === index ? "max-h-40 py-2" : "max-h-0"
            }`}
          >
            <p className="text-gray-300 text-sm text-justify">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
