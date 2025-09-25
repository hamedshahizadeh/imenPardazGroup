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

export default function Admins() {
  const owner = {
    name: "حامد شاهی زاده",
    username: "hamedshahizadeh",
    phone: "09123456789",
    role: "مالک",
    position: "مدیر کل",
  };

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "رضا احمدی",
      username: "reza123",
      phone: "09121234567",
      password: "123456",
      position: "مدیر فنی",
    },
    {
      id: 2,
      name: "سارا محمدی",
      username: "sara456",
      phone: "09129876543",
      password: "abcdef",
      position: "مدیر بازاریابی",
    },
    {
      id: 3,
      name: "مهدی کاظمی",
      username: "mehdi789",
      phone: "09127654321",
      password: "qwerty",
      position: "مدیر محتوا",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    position: "",
  });

  const handleAddAdmin = () => {
    if (
      !formData.name ||
      !formData.username ||
      !formData.phone ||
      !formData.position
    ) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }
    const newAdmin = { id: Date.now(), ...formData };
    setAdmins((prev) => [...prev, newAdmin]);
    toast.success(`مدیر "${formData.name}" اضافه شد`);
    setFormData({
      name: "",
      username: "",
      phone: "",
      password: "",
      position: "",
    });
    setShowAddModal(false);
  };

  const handleOpenEditModal = (admin) => {
    setCurrentAdmin(admin);
    setFormData({ ...admin });
    setShowEditModal(true);
  };

  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      username: "",
      phone: "",
      password: "",
      position: "",
    }); // فرم خالی شود
    setShowAddModal(true);
  };

  const handleEditAdmin = () => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === currentAdmin.id ? { ...formData, id: a.id } : a
      )
    );
    toast.success(`مدیر "${formData.name}" ویرایش شد`);
    setShowEditModal(false);
    setCurrentAdmin(null);
  };

  const handleDeleteAdmin = (admin) => {
    setCurrentAdmin(admin);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setAdmins((prev) => prev.filter((a) => a.id !== currentAdmin.id));
    toast.success(`مدیر "${currentAdmin.name}" حذف شد`);
    setShowDeleteModal(false);
    setCurrentAdmin(null);
  };

  const inputClasses =
    "w-full p-2 rounded-md text-gray-200 bg-black/30 border border-gray-600 text-xs md:text-sm font-medium";

  return (
    <div className="space-y-6 p-4">
      {/* مالک */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#49C5B6] flex items-center justify-center text-white text-xl font-bold">
            {owner.name[0]}
          </div>
          <div className="space-y-1">
            <p className="text-gray-200 font-medium text-sm">{owner.name}</p>
            <p className="text-gray-400 text-xs font-medium">
              نام کاربری: {owner.username}
            </p>
            <p className="text-gray-400 text-xs font-medium">
              شماره تماس: {owner.phone}
            </p>
            <p className="text-gray-400 text-xs font-medium">
              سمت: {owner.position}
            </p>
          </div>
        </div>
      </div>

      {/* مدیران */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm md:text-base font-medium text-gray-200">
            لیست مدیران
          </h2>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-[#49C5B6] hover:bg-[#37a199] cursor-pointer text-white text-xs md:text-sm px-2 py-1 rounded transition"
          >
            <FaPlus /> افزودن مدیر جدید
          </button>
        </div>

        <ul className="space-y-2">
          {admins.map((admin) => (
            <li
              key={admin.id}
              className="flex justify-between items-center bg-white/10 p-3 rounded-lg hover:bg-white/20 transition"
            >
              <div>
                <p className="text-gray-200 font-medium text-xs">{admin.name}</p>
                <p className="text-gray-400 text-xs font-medium">
                  نام کاربری: {admin.username}
                </p>
                <p className="text-gray-400 text-xs font-medium">
                  شماره تماس: {admin.phone}
                </p>
                <p className="text-gray-400 text-xs font-medium">
                  سمت: {admin.position}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleOpenEditModal(admin)}
                  className="flex items-center gap-1 text-[10px] md:text-xs  px-2 py-1 cursor-pointer  rounded-xs justify-center bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                  <FaEdit /> ویرایش
                </button>
                <button
                  onClick={() => handleDeleteAdmin(admin)}
                  className="flex items-center justify-center gap-1 text-[10px] md:text-xs  px-2 py-1 cursor-pointer rounded-xs bg-red-600 hover:bg-red-700 text-white transition"
                >
                  <FaTrash /> حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* مودال افزودن مدیر */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-3 mt-10 overflow-y-auto">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 max-w-sm w-full space-y-3 overflow-y-auto max-h-[90vh]">
            <h2 className="text-center text-sm md:text-base font-bold text-[#49C5B6] mb-2 flex items-center gap-2">
              <FaUserShield /> افزودن مدیر جدید
            </h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-medium">
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

              <label className="flex items-center gap-2 font-medium">
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

              <label className="flex items-center gap-2 font-medium">
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

              <label className="flex items-center gap-2 font-medium">
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

              <label className="flex items-center gap-2 font-medium">
                <FaUserTie /> سمت
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className={inputClasses}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddAdmin}
                className="px-3 py-1 text-xs md:text-sm  cursor-pointer rounded-md bg-[#49C5B6] hover:bg-[#37a199] text-white transition"
              >
                افزودن
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1 text-xs md:text-sm  cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 text-white transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال ویرایش */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 max-w-sm w-full space-y-3 overflow-y-auto max-h-[90vh]">
            <h2 className="text-center text-sm md:text-base font-bold text-[#49C5B6] mb-2 flex items-center gap-2">
              <FaEdit /> ویرایش مدیر
            </h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-medium">
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

              <label className="flex items-center gap-2 font-medium">
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

              <label className="flex items-center gap-2 font-medium">
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

              <label className="flex items-center gap-2 font-medium">
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

              <label className="flex items-center gap-2 font-medium">
                <FaUserTie /> سمت
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className={inputClasses}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleEditAdmin}
                className="px-3 py-1 text-xs md:text-sm rounded-md  cursor-pointer bg-[#49C5B6] hover:bg-[#37a199] text-white transition"
              >
                ذخیره
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-1 text-xs md:text-sm rounded-md  cursor-pointer bg-gray-700 hover:bg-gray-600 text-white transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال حذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 max-w-sm w-full text-center">
            <h2 className="text-xs md:text-sm font-medium text-white mb-4">
              آیا مطمئن هستید که می‌خواهید مدیر{" "}
              <span className="text-[#49C5B6]">{currentAdmin?.name}</span> را
              حذف کنید؟
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
