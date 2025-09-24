"use client";

import { useState } from "react";
import {
  FaComments,
  FaUsers,
  FaProjectDiagram,
  FaNetworkWired,
  FaHistory,
  FaFileAlt,
  FaLock,
  FaSearch,
  FaMobileAlt,
  FaChevronDown,
} from "react-icons/fa";

const items = [
  {
    title: "چت درون‌سازمانی",
    icon: <FaComments className="w-5 h-5 text-teal-400" />,
    content:
      `این امکان را فراهم می‌کند تا اعضای تیم‌ها یا بخش‌های مختلف یک سازمان بتوانند به راحتی با یکدیگر ارتباط برقرار کنند.
قابلیت ایجاد کانال‌های مختلف بر اساس تیم‌ها، پروژه‌ها یا موضوعات مختلف.`
  },
 
  {
    title: "چت گروهی و خصوصی",
    icon: <FaUsers className="w-5 h-5 text-green-400" />,
    content:
      `کاربران می‌توانند به صورت فردی یا در گروه‌های مختلف با هم در ارتباط باشند.
این قابلیت به ویژه برای تعاملات تیمی یا گروه‌های پروژه مفید است.`
  },
  {
    title: "یکپارچگی با دیگر زیرسیستم‌ ها",
    icon: <FaNetworkWired className="w-5 h-5 text-blue-400" />,
    content:
      `این سیستم‌ با تمامی زیر سیستم های یکپارچه سازمانی ایمن پرداز مانند اتوماسیون اداری ، سیستم سرمایه انسانی، ایمیل سازمانی و مدیریت وظایف ایمن پرداز و سایر نرم‌افزارها یکپارچه می‌شوند تا تعاملات به شکل یکپارچه‌تر و کارآمدتر انجام شود.`,
  },
  {
    title: "مدیریت پیام‌ها و دخیره سازی تاریخچه",
    icon: <FaHistory className="w-5 h-5 text-yellow-400" />,
    content: `پیام‌ها و چت‌ها به صورت خودکار ذخیره می‌شوند تا بتوان به راحتی به تاریخچه گفتگوها دسترسی داشت.
این ویژگی به ویژه در مواقعی که نیاز به بازبینی اطلاعات قدیمی یا پیگیری مسائل مطرح شده در مکالمات است، مفید است.`,
  },
  {
    title: "پشتیبانی از فایل‌ها و اسناد",
    icon: <FaFileAlt className="w-5 h-5 text-orange-400" />,
    content: `کاربران می‌توانند فایل‌ها، تصاویر، اسناد و ویدیوها را به راحتی ارسال و دریافت کنند.
این ویژگی برای اشتراک‌گذاری سریع اطلاعات بین اعضای تیم ضروری است.`,
  },
  {
    title: "امنیت و حفظ حریم خصوصی",
    icon: <FaLock className="w-5 h-5 text-red-400" />,
    content: `استفاده از پروتکل‌های امنیتی پیشرفته‌ برای اطمینان از محافظت از داده‌ها و حریم خصوصی کاربران.
دارای قابلیت‌های رمزنگاری پیام‌ها و احراز هویت قوی.`,
  },
  {
    title: "دسته بندی و جستجوی پیشرفته",
    icon: <FaSearch className="w-5 h-5 text-pink-400" />,
    content: `این ویژگی‌ها به کاربران کمک می‌کند تا به سرعت به اطلاعات مورد نیاز دسترسی پیدا کنند، حتی اگر حجم زیادی از پیام‌ها یا فایل‌ها وجود داشته باشد.`,
  },
  {
    title: "پشتیبانی از دستگاه‌های مختلف",
    icon: <FaMobileAlt className="w-5 h-5 text-cyan-400" />,
    content: `سیستم‌ مدیریت چت سازمانی ایمن پرداز معمولاً از دستگاه‌های مختلف مانند کامپیوتر، موبایل و تبلت پشتیبانی می‌کند و کاربران می‌توانند از هر کجا و در هر زمان به چت‌ها و گفتگوهای خود دسترسی داشته باشند.`,
  },
];

export default function ChatFeaturesAccordion() {
  const [openIndex, setOpenIndex] = useState(0); // اولین آیتم باز

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl  pb-5 pt-3  space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-gray-900 text-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Header */}
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between  px-1 md:px-3 lg:px-4 py-3 focus:outline-none cursor-pointer"
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

          {/* Content */}
          <div
            className={`px-2 md:px-4 overflow-hidden transition-all duration-500 ${
              openIndex === index ? "max-h-40 py-2" : "max-h-0"
            }`}
          >
            <p className="text-gray-300 text-sm  whitespace-pre-line text-justify">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
