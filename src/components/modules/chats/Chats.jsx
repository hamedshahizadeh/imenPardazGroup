"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

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

  const [activeUser, setActiveUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="fixed bottom-3 left-4 flex  items-center z-50">
      
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`relative ${index === 0 ? "" : ""} group`} // فقط عکس اول بدون فاصله منفی
          >
            <img
              src={user.img}
              alt={user.name}
              className="h-[35px] w-[35px] rounded-full cursor-pointer border-2 border-white 
                 transform transition-transform duration-200 group-hover:translate-x-[10px]"
              onClick={() => {
                setActiveUser(user);
                setIsOpen(true);
              }}
            />

            <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full transform transition-transform duration-200 group-hover:translate-x-[10px]"></span>

            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-gradient-to-r from-[#31CCBA] to-[#2C8F8F] text-white text-xs font-medium rounded-lg shadow-lg opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
              {user.name}
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-80 flex flex-col z-50`}
      >
        <div className="flex items-center gap-2 space-x-3 p-4 bg-gray-900 border-b border-gray-400">
          {activeUser && (
            <>
              <div className="relative">
                <img
                  src={activeUser.img}
                  alt={activeUser.name}
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-[#31CCBA]"
                />

                <span className="absolute bottom-0 left-0 block w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
              </div>
              <div>
                <div className="font-medium text-[10px] lg:text-xs text-gray-200 ">
                  {activeUser.name}
                </div>
                <div className="font-medium text-[8px] lg:text-[10px]  text-gray-400 ">
                  {activeUser.post}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          <div className="bg-green-100 text-gray-800 px-2 text-xs font-medium py-1 rounded-lg inline-block">
            سلام 👋
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-2 text-xs font-medium py-1 rounded-lg inline-block">
              سلام خوبین؟
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 border-t border-gray-400 bg-gray-900">
          <input
            type="text"
            placeholder="پیام بنویسید..."
            className="flex-1 px-3 py-2 rounded-lg border text-sm  bg-white focus:outline-none focus:ring focus:ring-green-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="ml-2 bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition cursor-pointer">
            <FaPaperPlane size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatMenu;
