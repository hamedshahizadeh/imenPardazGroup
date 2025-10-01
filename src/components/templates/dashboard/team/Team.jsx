"use client";

import { useState } from "react";
import { FaTrash, FaEdit, FaUserPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";

export default function TeamPage() {
  const [team, setTeam] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [editData, setEditData] = useState({ name: "", role: "", avatar: "" });
  const [editPreview, setEditPreview] = useState("");
  const [editFile, setEditFile] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    avatar: "",
  });
  const [newPreview, setNewPreview] = useState("");
  const [newFile, setNewFile] = useState(null);

  // 🚩 حالت‌های لودینگ
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const confirmDelete = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  // 📌 حذف فایل تیم
  const handleDelete = async (avatarUrl) => {
    try {
      setLoadingDelete(true);

      const filename = avatarUrl.split("/").pop();
      const res = await fetch(`/api/team/${filename}`, { method: "DELETE" });

      if (!res.ok) throw new Error("خطا در حذف تصویر");

      const data = await res.json();
      console.log(data.message);
      toast.success(`همکار مورد نظر با موفقیت حذف شد`);

      setTeam((prev) => prev.filter((member) => member.avatar !== avatarUrl));

      setShowDeleteModal(false);
      setMemberToDelete(null);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("❌ مشکل در حذف تصویر");
    } finally {
      setLoadingDelete(false);
    }
  };

  // 📌 ذخیره عضو جدید
  const handleAddSave = async () => {
    if (!newMember.name || !newMember.role) {
      toast.error("لطفاً همه فیلدها را پر کنید!");
      return;
    }

    setLoadingAdd(true);

    let uploadedUrl = newMember.avatar;
    if (newFile) {
      const formData = new FormData();
      formData.append("file", newFile);

      try {
        const res = await fetch("/api/team/upload-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        uploadedUrl = data.filename;
      } catch {
        toast.error("آپلود تصویر ناموفق بود!");
        setLoadingAdd(false);
        return;
      }
    }

    const newId = team.length ? Math.max(...team.map((m) => m.id)) + 1 : 1;
    setTeam((prev) => [
      ...prev,
      { id: newId, ...newMember, avatar: uploadedUrl },
    ]);
    setShowAddModal(false);
    setNewMember({ name: "", role: "", avatar: "" });
    setNewPreview("");
    setNewFile(null);
    toast.success("عضو جدید اضافه شد!");

    setLoadingAdd(false);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg p-2 flex flex-col items-center gap-2"
          >
            <Image
              width={200}
              height={200}
              priority
              src={`/api/team/${member.avatar}`}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#49C5B6]"
            />
            <div className="text-center">
              <h3 className="font-medium text-sm lg:text-base text-white">
                {member.name}
              </h3>
              <p className="text-gray-300 font-medium text-xs lg:text-sm">
                {member.role}
              </p>
            </div>
            <div className="flex gap-3 mt-1">
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
                onClick={() => handleDelete(memberToDelete.avatar)}
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
            {/* فیلدها */}
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
                value={newMember.role}
                onChange={(e) =>
                  setNewMember({ ...newMember, role: e.target.value })
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
