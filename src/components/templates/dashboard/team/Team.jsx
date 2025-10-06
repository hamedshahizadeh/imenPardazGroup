"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaUserPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";

export default function TeamPage() {
  const [team, setTeam] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    position: "",
    avatar: "",
  });
  const [newPreview, setNewPreview] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  // 📌 دریافت اعضای تیم از API
  const fetchTeam = async () => {
    try {
      setLoadingFetch(true);
      const res = await fetch("/api/dashboard/team");
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "خطا در دریافت اعضای تیم");

      setTeam(data.team || []);
    } catch (err) {
      console.error(err);
      toast.error("❌ دریافت اطلاعات تیم ناموفق بود");
    } finally {
      setLoadingFetch(false);
    }
  };

  // 📦 گرفتن لیست تیم هنگام اولین بار
  useEffect(() => {
    fetchTeam();
  }, []);

  const confirmDelete = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  // 🗑 حذف عضو تیم
 const handleDelete = async (avatarUrl) => {
  try {
    setLoadingDelete(true);
    const filename = avatarUrl.split("/").pop();

    // 1️⃣ حذف عکس از سرور
    const resImage = await fetch(`/api/team/${filename}`, { method: "DELETE" });
    if (!resImage.ok) throw new Error("خطا در حذف تصویر");

    // 2️⃣ حذف رکورد از دیتابیس
    const resDB = await fetch(`/api/dashboard/team/${filename}`, { method: "DELETE" });
    if (!resDB.ok) throw new Error("خطا در حذف عضو از دیتابیس");

    toast.success(`همکار با موفقیت حذف شد`);
    await fetchTeam()

    // به روز کردن آرایه تیم در فرانت
    setTeam((prev) => prev.filter((m) => m.avatar !== avatarUrl));
    setShowDeleteModal(false);
    setMemberToDelete(null);

  } catch (err) {
    console.error(err);
    toast.error("❌ حذف ناموفق بود");
  } finally {
    setLoadingDelete(false);
  }
};


  // ➕ افزودن عضو جدید
  const handleAddSave = async () => {
    if (!newMember.name || !newMember.position) {
      toast.error("لطفاً همه فیلدها را پر کنید!");
      return;
    }

    setLoadingAdd(true);
    let uploadedUrl = newMember.avatar;

    // اگر فایل جدید انتخاب شده
    if (newFile) {
      const formData = new FormData();
      formData.append("file", newFile);

      try {
        const res = await fetch("/api/team/upload-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        uploadedUrl = data.filename;
      } catch (err) {
        toast.error("آپلود تصویر ناموفق بود!");
        setLoadingAdd(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/dashboard/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newMember.name,
          position: newMember.position,
          image: uploadedUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save member");

      toast.success("✅ عضو جدید اضافه شد");
      setNewMember({ name: "", position: "", avatar: "" });
      setNewPreview("");
      setNewFile(null);
      setShowAddModal(false);

      // 📥 پس از افزودن، لیست را دوباره بگیر
      fetchTeam();
    } catch (err) {
      toast.error(err.message || "خطا در ذخیره عضو!");
    } finally {
      setLoadingAdd(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-100 container">
      {/* دکمه افزودن */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm lg:text-base font-bold">تیم ما</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#49C5B6] hover:bg-[#37a199] text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition shadow-md"
        >
          <FaUserPlus />
          <span>افزودن همکار جدید</span>
        </button>
      </div>

      {/* کارت‌های تیم */}
      {loadingFetch ? (
        <p className="text-center text-gray-400 text-sm">در حال بارگذاری...</p>
      ) : team.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">هیچ عضوی یافت نشد</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member._id}
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg p-2 flex flex-col items-center gap-2"
            >
              <Image
                width={200}
                height={200}
                priority
                src={`/api/dashboard/team/${member.image}`} // ✅ مسیر جدی
                alt={member.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-[#49C5B6]"
              />
              <div className="text-center">
                <h3 className="font-medium text-xs lg:text-sm text-white">
                  {member.name}
                </h3>
                <p className="text-gray-300 font-medium text-xs lg:text-sm">
                  {member.position}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => confirmDelete(member)}
                  className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700 text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition disabled:opacity-50"
                  disabled={loadingDelete}
                >
                  {loadingDelete ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <FaTrash /> حذف
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal حذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/30 backdrop-blur-sm z-50">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-sm font-medium text-white mb-4">
              آیا مطمئن هستید که می‌خواهید{" "}
              <span className="text-[#49C5B6]">{memberToDelete.name}</span> را
              حذف کنید؟
            </h2>
            <div className="flex justify-center gap-4 mt-3">
              <button
                onClick={() => handleDelete(memberToDelete.image)}
                disabled={loadingDelete}
                className="px-3 py-2 text-xs font-medium cursor-pointer rounded-lg bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-50"
              >
                {loadingDelete ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                ) : (
                  "حذف"
                )}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 text-xs font-medium cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal افزودن */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/30 backdrop-blur-sm z-50">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-sm font-medium text-white mb-4">
              افزودن همکار جدید
            </h2>
            <div className="flex flex-col gap-3 mb-4 text-sm text-gray-200">
              <input
                type="text"
                placeholder="نام"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
                className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-white"
              />
              <input
                type="text"
                placeholder="سمت"
                value={newMember.position}
                onChange={(e) =>
                  setNewMember({ ...newMember, position: e.target.value })
                }
                className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-white"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setNewFile(file);
                    setNewPreview(URL.createObjectURL(file));
                  }
                }}
                className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-white"
              />
              {newPreview && (
                <Image
                  width={200}
                  height={200}
                  src={newPreview}
                  alt="preview"
                  className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#49C5B6]"
                />
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleAddSave}
                disabled={loadingAdd}
                className="bg-green-600 px-3 py-2 text-xs font-medium cursor-pointer rounded-lg text-white hover:bg-green-700 transition disabled:opacity-50"
              >
                {loadingAdd ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                ) : (
                  "افزودن"
                )}
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-600 px-3 py-2 text-xs font-medium cursor-pointer rounded-lg text-white hover:bg-gray-700 transition"
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
