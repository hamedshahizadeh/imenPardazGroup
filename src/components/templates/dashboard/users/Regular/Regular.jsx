"use client";
import { useEffect, useState } from "react";
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
export default function RegularUsers() {
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastAdmin = currentPage * itemsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - itemsPerPage;
  const currentAdmins = [...admins]
    .reverse()
    .slice(indexOfFirstAdmin, indexOfLastAdmin);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isLoadAdd, setIsLoadAdd] = useState(false);
  const [isLoadDelete, setIsLoadDelete] = useState(false);
  const [isLoadEdit, setIsLoadEdit] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
  });

  const fetchAdmins = async () => {
        setLoadingFetch(true);
    try {
      const res = await fetch("/api/dashboard/normalusers/all");
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "خطا در دریافت اطلاعات");
        return;
      }
      setAdmins(data.users || []);
    } catch (err) {
      toast.error("خطای شبکه");
      console.error(err);
    }finally{
          setLoadingFetch(false);
    }
  };
  useEffect(() => {
    fetchAdmins();
  }, []);
  const handleOpenEditModal = (admin) => {
    setCurrentAdmin(admin);
    setFormData({
      name: admin.name || "",
      username: admin.email || "", // چون تو DB فیلد email داری
      phone: admin.phone || "",
      password: "", // پسورد رو معمولا خالی میذارن
    });
    setShowEditModal(true);
  };

  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      username: "",
      phone: "",
      password: "",
    }); // فرم خالی شود
    setShowAddModal(true);
  };

  const handleEditAdmin = async () => {
    if (!currentAdmin) return;
    setIsLoadEdit(true);
    if (!formData.name || !formData.phone) {
      toast.error("لطفاً  فیلدهای نام و شماره تماس را پر کنید");
      setIsLoadEdit(false);
      return;
    }
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("شماره تلفن باید با 09 شروع شود و 11 رقم باشد!");

      setIsLoadEdit(false);

      return;
    }
    // شرط برای password
    if (
      formData.password && // ← یعنی فقط اگر چیزی وارد شده
      (formData.password.length < 6 || !/[A-Z]/.test(formData.password))
    ) {
      toast.error(
        "رمز عبور باید حداقل 6 کاراکتر باشد و حداقل یک حرف بزرگ انگلیسی داشته باشد!"
      );
      setIsLoadEdit(false);
      return;
    }
    try {
      const res = await fetch(`/api/dashboard/normalusers/${currentAdmin._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        await fetchAdmins();
        setIsLoadEdit(false);

        setShowEditModal(false);
        setCurrentAdmin(null);
      } else {
        toast.error(data.error);
        setIsLoadEdit(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoadEdit(false);

      toast.error("خطای شبکه");
    }
  };

  const handleDeleteAdmin = (admin) => {
    setCurrentAdmin(admin);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!currentAdmin) return;
    setIsLoadDelete(true);

    try {
      const res = await fetch(`/api/dashboard/normalusers/${currentAdmin._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        // حذف موفقیت‌آمیز از state
        toast.success(`کاربر  "${currentAdmin.name}" حذف شد`);
        setIsLoadDelete(false);

        await fetchAdmins();

        setShowDeleteModal(false);
        setCurrentAdmin(null);
      } else {
        toast.error(data.error || "خطا در حذف کاربر ");
        setIsLoadDelete(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("خطای شبکه هنگام حذف کاربر ");
      setIsLoadDelete(false);
    }
  };

  const inputClasses =
    "w-full p-2 rounded-md text-gray-200 bg-black/30 border border-gray-600 text-xs md:text-sm font-medium";

  return (
    <div className="space-y-6 container">
      {/* مالک */}

      {/* کاربران  */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm md:text-base font-medium text-gray-200">
            لیست کاربران عادی
          </h2>
        </div>
        {loadingFetch ? (
          <p className="text-center text-gray-400 text-sm">
            در حال بارگذاری...
          </p>
        ) : currentAdmins.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">هیچ کاربری یافت نشد</p>
        ) : (
          <ul className="space-y-2">
            {currentAdmins.map((admin) => (
              <li
                key={admin._id}
                className="flex justify-between items-center bg-white/10 p-3 rounded-lg hover:bg-white/20 transition"
              >
                <div>
                  <p className="text-gray-200 font-medium text-xs">
                    {admin.name}
                  </p>
                  <p className="text-gray-400 text-xs font-medium">
                    نام کاربری: {admin.email}
                  </p>
                  <p className="text-gray-400 text-xs font-medium">
                    شماره تماس: {admin.phone}
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
      )}

        {admins.length > itemsPerPage && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from(
              { length: Math.ceil(admins.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-[#49C5B6] text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>



      {/* مودال ویرایش */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 max-w-sm w-full space-y-3 overflow-y-auto max-h-[90vh]">
            <h2 className="text-center text-sm md:text-base font-bold text-[#49C5B6] mb-2 flex items-center gap-2">
              <FaEdit /> ویرایش کاربر 
            </h2>
            <div className="space-y-1">
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
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleEditAdmin}
                className="px-3 py-1 text-xs flex items-center justify-center md:text-sm rounded-md  cursor-pointer bg-[#49C5B6] hover:bg-[#37a199] text-white transition"
              >
                {isLoadEdit ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "تغییر"
                )}
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
              آیا مطمئن هستید که می‌خواهید کاربر {" "}
              <span className="text-[#49C5B6]">{currentAdmin?.name}</span> را
              حذف کنید؟
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-3 py-2 text-xs flex items-center justify-center md:text-sm font-medium rounded-md bg-red-600 cursor-pointer hover:bg-red-700 text-white transition"
              >
                {isLoadDelete ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "حذف"
                )}
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
