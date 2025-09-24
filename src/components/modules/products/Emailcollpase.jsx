"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const items = [
  {
    title: "ارسال و دریافت ایمیل",
    content: "این سیستم‌ها به کاربران این امکان را می‌دهند که ایمیل ارسال کنند، دریافت کنند، و آن‌ها را در پوشه‌های مختلف مرتب کنند.",
  },
  {
    title: "بایگانی و ذخیره سازی ایمیل ها",
    content: "ایمیل‌های ارسالی و دریافتی می‌توانند به صورت خودکار در سرورهای بایگانی ذخیره شوند. این کار به حفظ سوابق ارتباطات کمک می‌کند و دسترسی به آن‌ها را برای مدت زمان طولانی فراهم می‌سازد.",
  },
  {
    title: "امنیت و حفاظت",
    content: "این سیستم‌ قابلیت‌هایی مانند رمزگذاری ایمیل‌ها، شناسایی اسپم و فیشینگ، و جلوگیری از حملات سایبری را دارند. همچنین می‌توانند اقدامات امنیتی مانند احراز هویت دو مرحله‌ای و فیلتر کردن پیوست‌های مشکوک را پیاده‌سازی کند.",
  },
  {
    title: "جست و جو و بازیابی اطلاعات",
    content: "سیستم مدیریت ایمیل سازمانی ایمن پرداز ابزار پیشرفته‌ای برای جستجو و بازیابی سریع ایمیل‌ها و پیوست‌ها دارد. این امکان برای استفاده‌های حقوقی و اداری ضروری است.",
  },
  {
    title: "کنترل دسترسی و مجوزها",
    content: "در این سیستم‌ می‌توان دسترسی کاربران به ایمیل‌ها را بر اساس نقش‌ها و نیازهای سازمان تنظیم کرد. برای مثال، مدیران می‌توانند بر فعالیت‌های ایمیلی کارکنان نظارت کنند.",
  },
  {
    title: "یکپارچگی با سایر سیستم های ایمن پرداز",
    content: "این سیستم‌ می‌توانند با دیگر ابزارهای سازمانی مانند سیستم‌های مدیریت منابع انسانی،سیستم اتوماسیون اداری و سیستم مدیریت وظایف و سایر سیستم های یکپارچه ایمن پرداز همکاری یکپارچه داشته باشد.",
  },
];

export default function CollapseList() {
  const [openIndex, setOpenIndex] = useState(0);

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
            <span className="text-xs md:text-sm font-medium">{item.title}</span>
            <FaChevronDown
              className={`w-4 h-4 transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          
          <div
            className={`px-1 md:px-4 overflow-hidden transition-all duration-500 ${
              openIndex === index ? "max-h-40 py-2" : "max-h-0"
            }`}
          >
            <p className="text-gray-300 text-xs md:text-sm text-justify">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
