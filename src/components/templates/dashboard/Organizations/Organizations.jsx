"use client";

import { useState, useEffect } from "react";
import { FaTrashAlt, FaUserPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Organizations() {
  const [organ, setOrgan] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [organToDelete, setOrganToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOrgan, setNewOrgan] = useState({
    avatar: "",
  });
  const [newPreview, setNewPreview] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  // 📌 دریافت لیست سازمان‌ها از API
  const fetchOrgan = async () => {
    try {
      setLoadingFetch(true);
      const res = await fetch("/api/dashboard/organ");
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "خطا در دریافت سازمان‌ها");

      const orgs = Array.isArray(data.organization)
        ? data.organization
        : [data.organization];
      setOrgan(orgs);
    } catch (err) {
      console.error(err);
      toast.error(" دریافت اطلاعات سازمان‌ها ناموفق بود");
    } finally {
      setLoadingFetch(false);
    }
  };

  // 📦 گرفتن لیست سازمان‌ها هنگام اولین بار
  useEffect(() => {
    fetchOrgan();
  }, []);

  const confirmDelete = (organ) => {
    setOrganToDelete(organ);
    setShowDeleteModal(true);
  };

  // 🗑 حذف سازمان
  const handleDelete = async (avatarUrl) => {
    try {
      setLoadingDelete(true);
      const filename = avatarUrl.split("/").pop();

       const resImage = await fetch(`/api/imgorgan/${filename}`, { method: "DELETE" });
    if (!resImage.ok) throw new Error("خطا در حذف تصویر");

    // 2️⃣ حذف رکورد از دیتابیس
    const resDB = await fetch(`/api/dashboard/organ/${filename}`, { method: "DELETE" });
    if (!resDB.ok) throw new Error("خطا در حذف عضو از دیتابیس");

      toast.success(`سازمان با موفقیت حذف شد`);
      fetchOrgan();

      // به روز کردن آرایه سازمان‌ها در فرانت
      setOrgan((prev) => prev.filter((m) => m._id !== organToDelete._id));
      setShowDeleteModal(false);
      setOrganToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error(" حذف سازمان ناموفق بود");
    } finally {
      setLoadingDelete(false);
    }
  };

  // ➕ افزودن سازمان جدید
  const handleAddSave = async () => {
    setLoadingAdd(true);
    let uploadedUrl = newOrgan.avatar;

    // اگر فایل جدید انتخاب شده
    if (newFile) {
      const formData = new FormData();
      formData.append("file", newFile);

      try {
        const res = await fetch("/api/imgorgan/upload-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        uploadedUrl = data.filename;
      } catch (err) {
        toast.error(" تصویر ناموفق بود!");
        setLoadingAdd(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/dashboard/organ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: uploadedUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save organization");

      toast.success(" سازمان جدید اضافه شد");
      setNewOrgan({ avatar: "" });
      setNewPreview("");
      setNewFile(null);
      setShowAddModal(false);

      // 📥 پس از افزودن، لیست را دوباره بگیر
      fetchOrgan();
    } catch (err) {
      toast.error(err.message || "خطا در ذخیره سازمان!");
    } finally {
      setLoadingAdd(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-100 container">
      {/* دکمه افزودن */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm lg:text-base font-bold">سازمان‌ها</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#49C5B6] hover:bg-[#37a199] text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition shadow-md"
        >
          <FaUserPlus />
          <span>افزودن سازمان جدید</span>
        </button>
      </div>

      {/* کارت‌های سازمان‌ها */}
      {loadingFetch ? (
        <p className="text-center text-gray-400 text-sm">در حال بارگذاری...</p>
      ) : organ.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">هیچ سازمانی یافت نشد</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {organ.map((org) =>
            org && org.image ? (
              <div
                key={org._id}
                className="relative rounded-lg overflow-hidden shadow-lg group"
              >
                <Image
                  src={`/api/dashboard/organ/${encodeURIComponent(org.image)}`}
                  alt={org._id}
                  width={400}
                  height={300}
                  className="object-cover w-full h-40"
                  priority
                />
                <button
                  onClick={() => confirmDelete(org)}
                  className="absolute top-2 cursor-pointer right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ) : null
          )}
        </div>
      )}

      {/* Modal حذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/30 backdrop-blur-sm z-50">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-sm font-medium text-white mb-4">
              آیا مطمئن هستید که می‌خواهید{" "}
              <span className="text-[#49C5B6]">{organToDelete?.name}</span> را
              حذف کنید؟
            </h2>
            <div className="flex justify-center gap-4 mt-3">
              <button
                onClick={() => handleDelete(organToDelete?.image)}
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
              افزودن سازمان جدید
            </h2>
                     <div className="flex flex-col gap-3 mb-4 text-sm text-gray-200">
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

