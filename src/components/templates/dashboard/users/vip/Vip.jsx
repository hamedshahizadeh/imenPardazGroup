"use client";
import { useState } from "react";
import {
  FaUser,
  FaEdit,
  FaTrash,
  FaPlus,
  FaPhone,
  FaUserShield,
  FaKey,
  FaUserTie,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function VIPUsers() {
  const [vipUsers, setVIPUsers] = useState([
    {
      id: 1,
      name: "مریم احمدی",
      username: "maryam123",
      phone: "09121234567",
      password: "123456",
      role: "ویژه",
    },
    {
      id: 2,
      name: "علی رضایی",
      username: "ali456",
      phone: "09127654321",
      password: "abcdef",
      role: "ویژه",
    },
    {
      id: 3,
      name: "نرگس موسوی",
      username: "narges789",
      phone: "09129876543",
      password: "qwerty",
      role: "ویژه",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    role: "ویژه",
  });

  const inputClasses =
    "w-full p-2 rounded-md text-gray-200 bg-black/30 border border-gray-600 text-xs md:text-sm font-medium";

  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      username: "",
      phone: "",
      password: "",
      role: "ویژه",
    });
    setShowAddModal(true);
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.username || !formData.phone) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }
    const newUser = { id: Date.now(), ...formData };
    setVIPUsers([...vipUsers, newUser]);
    toast.success(`کاربر ویژه "${formData.name}" اضافه شد`);
    setFormData({
      name: "",
      username: "",
      phone: "",
      password: "",
      role: "ویژه",
    });
    setShowAddModal(false);
  };

  const handleOpenEditModal = (user) => {
    setCurrentUser(user);
    setFormData({ ...user });
    setShowEditModal(true);
  };

  const handleEditUser = () => {
    setVIPUsers(
      vipUsers.map((u) =>
        u.id === currentUser.id ? { ...formData, id: u.id } : u
      )
    );
    toast.success(`کاربر ویژه "${formData.name}" ویرایش شد`);
    setShowEditModal(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setVIPUsers(vipUsers.filter((u) => u.id !== currentUser.id));
    toast.success(`کاربر ویژه "${currentUser.name}" حذف شد`);
    setShowDeleteModal(false);
    setCurrentUser(null);
  };

  return (
    <div className="space-y-6 container">
      {/* هدر */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-4 font-medium">
        <h1 className="text-gray-200 text-sm md:text-base">
          مدیریت کاربران ویژه
        </h1>
      </div>

      {/* لیست کاربران ویژه */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md font-medium">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm md:text-base text-gray-200">
            لیست کاربران ویژه
          </h2>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-[#49C5B6] hover:bg-[#37a199] cursor-pointer text-white text-xs md:text-sm px-2 py-1 rounded transition"
          >
            <FaPlus /> افزودن کاربر ویژه
          </button>
        </div>

        <ul className="space-y-2">
          {vipUsers.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center bg-white/10 p-3 rounded-lg hover:bg-white/20 transition font-medium"
            >
              <div>
                <p className="text-gray-200 text-xs">{user.name}</p>
                <p className="text-gray-400 text-xs">
                  نام کاربری: {user.username}
                </p>
                <p className="text-gray-400 text-xs">
                  شماره تماس: {user.phone}
                </p>
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

      {/* مودال افزودن */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-3 mt-10 mb-10 overflow-y-auto">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 max-w-sm w-full space-y-3 overflow-y-auto max-h-[90vh] my-[10px] font-medium">
            <h2 className="text-center text-sm md:text-base font-bold text-[#49C5B6] mb-2 flex items-center gap-2">
              <FaUserShield /> افزودن کاربر ویژه
            </h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <FaUser /> نام
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={inputClasses}
              />

              <label className="flex items-center gap-2">
                <FaUserShield /> نام کاربری
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={inputClasses}
              />

              <label className="flex items-center gap-2">
                <FaPhone /> شماره تماس
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={inputClasses}
              />

              <label className="flex items-center gap-2">
                <FaKey /> رمز عبور
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={inputClasses}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddUser}
                className="px-3 py-1 text-xs md:text-sm rounded-md bg-[#49C5B6] hover:bg-[#37a199] text-white transition  cursor-pointer"
              >
                افزودن
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1 text-xs md:text-sm rounded-md bg-gray-700 hover:bg-gray-600 text-white transition  cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال ویرایش */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-3 mt-10 mb-10 overflow-y-auto">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 max-w-sm w-full space-y-3 overflow-y-auto max-h-[90vh] my-[10px] font-medium">
            <h2 className="text-center text-sm md:text-base font-bold text-[#49C5B6] mb-2 flex items-center gap-2">
              <FaEdit /> ویرایش کاربر ویژه
            </h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <FaUser /> نام
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={inputClasses}
              />

              <label className="flex items-center gap-2">
                <FaUserShield /> نام کاربری
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={inputClasses}
              />

              <label className="flex items-center gap-2">
                <FaPhone /> شماره تماس
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={inputClasses}
              />

              <label className="flex items-center gap-2">
                <FaKey /> رمز عبور
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={inputClasses}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleEditUser}
                className="px-3 py-1 text-xs md:text-sm rounded-md bg-[#49C5B6] hover:bg-[#37a199] text-white transition cursor-pointer"
              >
                ذخیره
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-1 text-xs md:text-sm rounded-md bg-gray-700 hover:bg-gray-600 text-white transition  cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال حذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 mt-10 mb-10 overflow-y-auto">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 max-w-sm w-full text-center my-[10px] font-medium">
            <h2 className="text-xs md:text-sm font-medium text-white mb-4">
              آیا مطمئن هستید که می‌خواهید کاربر ویژه{" "}
              <span className="text-[#49C5B6]">{currentUser?.name}</span> را حذف
              کنید؟
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-3 py-2 text-xs md:text-sm font-medium rounded-md bg-red-600 cursor-pointer hover:bg-red-700 text-white transition"
              >
                بله، حذف شود
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 text-xs md:text-sm font-medium rounded-md bg-gray-700 cursor-pointer hover:bg-gray-600 text-white transition"
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
