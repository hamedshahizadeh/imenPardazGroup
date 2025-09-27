"use client";

import { useState } from "react";
import { FaTrash, FaEdit, FaUserPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";

export default function TeamPage() {
  const [team, setTeam] = useState([
    { id: 1, name: "مهدی رضایی", role: "مدیر پروژه", avatar: "/avatars/avatar1.jpg" },
    { id: 2, name: "سارا محمدی", role: "توسعه‌دهنده فرانت‌اند", avatar: "/avatars/avatar2.jpg" },
    { id: 3, name: "علی حسینی", role: "توسعه‌دهنده بک‌اند", avatar: "/avatars/avatar3.jpg" },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [editData, setEditData] = useState({ name: "", role: "", avatar: "" });
  const [editPreview, setEditPreview] = useState(""); // پیش‌نمایش تصویر

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", role: "", avatar: "" });
  const [newPreview, setNewPreview] = useState(""); // پیش‌نمایش تصویر جدید

  const confirmDelete = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setTeam(prev => prev.filter(m => m.id !== memberToDelete.id));
    setShowDeleteModal(false);
    toast.success("عضو حذف شد!");
  };

  const editMember = (member) => {
    setMemberToEdit(member);
    setEditData({ name: member.name, role: member.role, avatar: member.avatar });
    setEditPreview(member.avatar);
    setShowEditModal(true);
  };
// مثال برای handleEditSave و handleAddSave

const handleEditSave = () => {
  if (!editData.name || !editData.role || !editPreview) {
    toast.error("لطفاً همه فیلدها را پر کنید!");
    return;
  }

  setTeam(prev =>
    prev.map(m =>
      m.id === memberToEdit.id ? { ...m, ...editData, avatar: editPreview } : m
    )
  );
  setShowEditModal(false);
  toast.success("اطلاعات عضو ویرایش شد!");
};

const handleAddSave = () => {
  if (!newMember.name || !newMember.role || !newPreview) {
    toast.error("لطفاً همه فیلدها را پر کنید!");
    return;
  }

  const newId = team.length ? Math.max(...team.map(m => m.id)) + 1 : 1;
  setTeam(prev => [...prev, { id: newId, ...newMember, avatar: newPreview }]);
  setShowAddModal(false);
  setNewMember({ name: "", role: "", avatar: "" });
  setNewPreview("");
  toast.success("عضو جدید اضافه شد!");
};


  // هندل پیش‌نمایش تصویر هنگام ویرایش
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditPreview(URL.createObjectURL(file));
    }
  };

  // هندل پیش‌نمایش تصویر هنگام افزودن
  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className=" min-h-screen text-gray-100">
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
        {team.map(member => (
          <div
            key={member.id}
            className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg p-2 flex flex-col items-center gap-2"
          >
            <Image
            width={200}
            height={200}
            priority
              src={member.avatar}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#49C5B6]"
            />
            <div className="text-center">
              <h3 className="font-medium text-sm lg:text-base text-white">{member.name}</h3>
              <p className="text-gray-300 font-medium text-xs lg:text-sm">{member.role}</p>
            </div>
            <div className="flex gap-3 mt-1">
              <button
                onClick={() => editMember(member)}
                className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-700 text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded transition"
              >
                <FaEdit /> ویرایش
              </button>
              <button
                onClick={() => confirmDelete(member)}
                className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700 text-white text-[10px] md:text-xs  px-2 py-1 cursor-pointer rounded transition"
              >
                <FaTrash /> حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal حذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4">آیا مطمئن هستید که می‌خواهید کاربر</h2>
            <span className="mb-6 text-[#49C5B6]">{memberToDelete.name} </span>
            را حذف کنید ؟
            <div className="flex justify-center gap-4 mt-2 md:mt-3 lg:mt-4">
              <button
                onClick={handleDelete}
                className="px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                حذف
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal ویرایش */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4">ویرایش عضو</h2>
            <div className="flex flex-col gap-3 text-xs md:text-sm font-medium text-gray-200 mb-2 md:mb-4">
              <label>
                نام:
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-xs md:text-sm font-medium text-gray-200"
                />
              </label>
              <label>
                سمت:
                <input
                  type="text"
                  value={editData.role}
                  onChange={(e) => setEditData({...editData, role: e.target.value})}
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-gray-200 text-xs md:text-sm font-medium "
                />
              </label>
              <label>
                تصویر کاربر:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-white"
                />
              </label>
              {editPreview && (
                <Image
                width={200}
                height={200}
                priority
                  src={editPreview}
                  alt="پیش‌نمایش"
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[#49C5B6]"
                />
              )}
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleEditSave}
                className="bg-blue-600 text-white text-[10px] md:text-xs px-2 py-1 cursor-pointer rounded hover:bg-blue-700 "
              >
                ویرایش
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal افزودن */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/10 backdrop-blur-xs z-50">
          <div className="bg-gray-900/90 backdrop-blur-xs rounded-2xl p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xs md:text-sm font-medium text-white mb-2 md:mb-4">افزودن همکار جدید</h2>
            <div className="flex flex-col gap-3 text-xs md:text-sm font-medium text-gray-200 mb-2 md:mb-4">
              <label>
                نام:
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-white"
                />
              </label>
              <label>
                سمت:
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-white"
                />
              </label>
              <label>
                تصویر کاربر:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleNewImageChange}
                  className="w-full border border-gray-600 rounded px-2 py-1 bg-gray-900 text-white"
                />
              </label>
              {newPreview && (
                <Image
                width={200}
                height={200}
                priority
                  src={newPreview}
                  alt="پیش‌نمایش"
                  className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#49C5B6]"
                />
              )}
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleAddSave}
                className="bg-green-600 px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg text-white hover:bg-green-700 transition"
              >
                افزودن
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-600  px-3 py-2 text-xs md:text-sm font-medium cursor-pointer rounded-lg text-white hover:bg-gray-700 transition"
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
