"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
const ChatMenu = () => {
  const users = [
    {
      id: 1,
      name: "مهندس سلیمی",
      img: "/images/user.jpeg",
      post: "برنامه نویس",
    },
    {
      id: 2,
      name: "مهندس امینی",
      img: "/images/user.jpeg",
      post: "برنامه نویس",
    },
    {
      id: 3,
      name: "مهندس شاهی زاده",
      img: "/images/user.jpeg",
      post: "برنامه نویس",
    },
    { id: 4, name: "مهندس ثنایی", img: "/images/user.jpeg", post: "حسابدار" },
    {
      id: 5,
      name: "مهندس حاجی زاده",
      img: "/images/user.jpeg",
      post: "مدیرعامل",
    },
  ];

  const readyMessages = [
    {
      label: "👋 سلام",
      userText: "سلام وقت بخیر!",
      reply: "سلام! خوش اومدین 🌷 چطور می‌تونم کمکتون کنم؟",
    },
    {
      label: "💼 خدمات",
      userText: "می‌خواستم درباره خدمات شرکت بدونم.",
      reply: "حتماً 😊 ما در زمینه برنامه‌نویسی و حسابداری فعالیت داریم.",
    },
    {
      label: "📞 پشتیبانی",
      userText: "می‌خواستم با بخش پشتیبانی صحبت کنم.",
      reply: "حتماً، یکی از کارشناسان پشتیبانی به زودی پاسخ شما رو میده 🙌",
    },
  ];

  const [activeUser, setActiveUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hovered, setHovered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // هر ادمین آرایه‌ی پیام مخصوص خودش دارد
  const [chatHistories, setChatHistories] = useState({});

  const chatBodyRef = useRef(null);

  const handleOpenChat = (user) => {
    setActiveUser(user);
    setIsOpen(true);

    // اگر این کاربر چت نداشت، بسازش
    setChatHistories((prev) => ({
      ...prev,
      [user.id]: prev[user.id] || [
        { from: "system", text: "سلام 👋 خوش اومدی!" },
      ],
    }));
  };

  const handleSendMessage = (text = message) => {
    if (!text.trim() || !activeUser) return;

    const newMsg = { from: "user", text };

    setChatHistories((prev) => {
      const userMsgs = prev[activeUser.id] || [];
      return { ...prev, [activeUser.id]: [...userMsgs, newMsg] };
    });

    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatHistories((prev) => {
        const userMsgs = prev[activeUser.id] || [];
        return {
          ...prev,
          [activeUser.id]: [
            ...userMsgs,
            { from: "system", text: "پیام شما دریافت شد ✅" },
          ],
        };
      });
    }, 1500);
  };

  const handleQuickMessage = (msg) => {
    if (!activeUser) return;

    setChatHistories((prev) => {
      const userMsgs = prev[activeUser.id] || [];
      return {
        ...prev,
        [activeUser.id]: [...userMsgs, { from: "user", text: msg.userText }],
      };
    });

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatHistories((prev) => {
        const userMsgs = prev[activeUser.id] || [];
        return {
          ...prev,
          [activeUser.id]: [...userMsgs, { from: "system", text: msg.reply }],
        };
      });
    }, 1500);
  };

  // اسکرول خودکار به پایین
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistories, isTyping]);

  const currentMessages = activeUser ? chatHistories[activeUser.id] || [] : [];

  return (
    <>
      {/* آواتار کاربران */}
      <div
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center gap-2">
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`relative group transition-all duration-500 ease-out ${
                hovered
                  ? "opacity-100 -translate-x-0"
                  : "opacity-0 -translate-x-5 pointer-events-none"
              }`}
              style={{
                transitionDelay: hovered
                  ? `${(users.length - index - 1) * 100}ms`
                  : "0ms",
                marginRight: index === 0 ? "0" : "-10px",
              }}
            >
              <Image
                width={200}
                height={200}
                priority
                src={user.img}
                alt={user.name}
                onClick={() => handleOpenChat(user)}
                className="h-[38px] w-[38px] rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-110 hover:-translate-y-1 transition-transform duration-300"
              />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-medium py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                {user.name}
              </span>
            </div>
          ))}

          <div className="relative w-12 h-12 flex items-center justify-center rounded-full cursor-pointer hover:scale-105 transition-transform duration-300">
            {/* دایره‌های پالس */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#31CCBA] to-[#2C8F8F] opacity-30 animate-ping-slow"></span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#31CCBA] to-[#2C8F8F] opacity-20 animate-ping-slow delay-1000"></span>

            {/* دکمه اصلی */}
            <div className="relative z-10 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#31CCBA] to-[#2C8F8F] text-white rounded-full shadow-lg">
              <FaPhone size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* بک‌گراند تار */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* پنل چت */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-80 flex flex-col z-50`}
      >
        {/* هدر */}
        <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
      <div className="flex items-center gap-2">
            {activeUser && (
            <>
              <div className="relative">
                <img
                  src={activeUser.img}
                  alt={activeUser.name}
                  className="w-8 h-8 rounded-full border border-[#31CCBA]"
                />
                <span className="absolute bottom-0 left-0 block w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
              </div>
              <div>
                <div className="font-medium text-xs text-gray-200">
                  {activeUser.name}
                </div>
                <div className="font-medium text-[10px] text-gray-400">
                  {activeUser.post}
                </div>
              </div>
            </>
          )}
      </div>
      <div>
<button type="button" className=" text-gray-200 cursor-pointer" onClick={()=>setIsOpen(false)}>
  <IoClose className="size-5"/>
</button>
      </div>
        </div>

        {/* پیام‌های آماده */}
        <div className="flex gap-2 flex-wrap p-3 border-b border-gray-700 bg-gray-800">
          {readyMessages.map((msg, i) => (
            <button
              key={i}
              onClick={() => handleQuickMessage(msg)}
              className="text-xs bg-[#31CCBA] hover:bg-[#27a99d] text-white font-medium px-2 py-1 rounded-full transition"
            >
              {msg.label}
            </button>
          ))}
        </div>

        {/* بدنه چت */}
        <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-2">
          {currentMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-2 py-1 text-xs font-medium rounded-lg ${
                  msg.from === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-green-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* انیمیشن تایپ */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-200 px-3 py-1 text-xs rounded-lg flex items-center space-x-1">
                <span>در حال نوشتن</span>
                <span className="flex">
                  <span className="dot-animation"></span>
                  <span className="dot-animation delay-200"></span>
                  <span className="dot-animation delay-400"></span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* نوار ورودی مدرن */}
        <div className="flex items-center gap-3 p-3 bg-gray-950 border-t border-gray-800">
          <div className="flex-1 flex items-center bg-gray-900/70 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-green-500/40 transition-all duration-200">
            <input
              type="text"
              placeholder="پیام خود را بنویسید..."
              className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 text-sm focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            onClick={() => handleSendMessage()}
            className={`p-3 rounded-full transition-all duration-300 shadow-sm cursor-pointer ${
              message.trim()
                ? "bg-green-600 hover:bg-green-500 active:scale-95"
                : "bg-gray-800 opacity-50"
            }`}
            disabled={!message.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-7.5-15-7.5v6l10.5 1.5L4.5 13.5v6z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* استایل نقطه‌های متحرک */}
      <style jsx>{`
        .dot-animation {
          width: 4px;
          height: 4px;
          background-color: #e5e7eb;
          border-radius: 50%;
          margin: 0 1px;
          opacity: 0.4;
          animation: blink 1.4s infinite both;
        }
        .dot-animation.delay-200 {
          animation-delay: 0.2s;
        }
        .dot-animation.delay-400 {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0%,
          80%,
          100% {
            opacity: 0.4;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default ChatMenu;
