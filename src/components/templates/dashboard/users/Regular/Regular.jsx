"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaUser, FaUserShield, FaPhone, FaKey } from "react-icons/fa";
import toast from "react-hot-toast";

export default function RegularUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "علیرضا حسینی",
      username: "alireza123",
      phone: "09121234567",
      password: "123456",
      role: "عادی",
    },
    {
      id: 2,
      name: "مهدی کریمی",
      username: "mehdi456",
      phone: "09127654321",
      password: "abcdef",
      role: "عادی",
    },
    {
      id: 3,
      name: "زهرا موسوی",
      username: "zahra789",
      phone: "09129876543",
      password: "qwerty",
      role: "عادی",
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    role: "عادی",
  });

  const inputClasses =
    "w-full p-2 rounded-md text-gray-200 bg-black/30 border border-gray-600 text-xs md:text-sm font-medium";

  const handleOpenEditModal = (user) => {
    setCurrentUser(user);
    setFormData({ ...user });
    setShowEditModal(true);
  };

  const handleEditUser = () => {
    setUsers(users.map(u => u.id === currentUser.id ? { ...formData, id: u.id } : u));
    toast.success(`کاربر "${formData.name}" ویرایش شد`);
    setShowEditModal(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== currentUser.id));
    toast.success(`کاربر "${currentUser.name}" حذف شد`);
    setShowDeleteModal(false);
    setCurrentUser(null);
  };

  return (
    <div className="space-y-6 container font-medium">
      {/* هدر */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-4">
        <h1 className="text-gray-200 text-sm md:text-base">مدیریت کاربران عادی</h1>
      </div>

      {/* لیست کاربران */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md">
        <h2 className="text-sm md:text-base text-gray-200 mb-4">لیست کاربران</h2>
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user.id} className="flex justify-between items-center bg-white/10 p-3 rounded-lg hover:bg-white/20 transition">
              <div>
                <p className="text-gray-200 text-xs">{user.name}</p>
                <p className="text-gray-400 text-xs">نام کاربری: {user.username}</p>
                <p className="text-gray-400 text-xs">شماره تماس: {user.phone}</p>
                <p className="text-gray-400 text-xs">نقش: {user.role}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleOpenEditModal(user)}
                  className="flex items-center gap-1 text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded-xs justify-center bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                  <FaEdit /> ویرایش
                </button>
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="flex items-center justify-center gap-1 text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded-xs bg-red-600 hover:bg-red-700 text-white transition"
                >
                  <FaTrash /> حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* مودال ویرایش */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-3 mt-10 mb-10 overflow-y-auto">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 max-w-sm w-full space-y-3 overflow-y-auto max-h-[90vh] my-[10px]">
            <h2 className="text-center text-sm md:text-base font-bold text-[#49C5B6] mb-2 flex items-center gap-2">
              <FaEdit /> ویرایش کاربر
            </h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2"><FaUser /> نام</label>
              <input type="text" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} className={inputClasses} />

              <label className="flex items-center gap-2"><FaUserShield /> نام کاربری</label>
              <input type="text" value={formData.username} onChange={(e)=>setFormData({...formData,username:e.target.value})} className={inputClasses} />

              <label className="flex items-center gap-2"><FaPhone /> شماره تماس</label>
              <input type="text" value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} className={inputClasses} />

              <label className="flex items-center gap-2"><FaKey /> رمز عبور</label>
              <input type="password" value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} className={inputClasses} />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={handleEditUser} className="px-3 py-1 text-xs md:text-sm rounded-md bg-[#49C5B6] hover:bg-[#37a199] text-white transition">ذخیره</button>
              <button onClick={()=>setShowEditModal(false)} className="px-3 py-1 text-xs md:text-sm rounded-md bg-gray-700 hover:bg-gray-600 text-white transition">بستن</button>
            </div>
          </div>
        </div>
      )}

      {/* مودال حذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 mt-10 mb-10 overflow-y-auto">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 max-w-sm w-full text-center my-[10px]">
            <h2 className="text-xs md:text-sm font-medium text-white mb-4">
              آیا مطمئن هستید که می‌خواهید کاربر{" "}
              <span className="text-[#49C5B6]">{currentUser?.name}</span> را حذف کنید؟
            </h2>
            <div className="flex justify-center gap-4">
              <button onClick={confirmDelete} className="px-3 py-2 text-xs md:text-sm font-medium rounded-md bg-red-600 cursor-pointer hover:bg-red-700 text-white transition">بله، حذف شود</button>
              <button onClick={()=>setShowDeleteModal(false)} className="px-3 py-2 text-xs md:text-sm font-medium rounded-md bg-gray-700 cursor-pointer hover:bg-gray-600 text-white transition">بستن</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
