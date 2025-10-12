"use client";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaReply, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useUser } from "../../../../../context/UserContext";

export default function CommentsDashboard() {
  // 🔹 برای پاسخ به کامنت‌ها
const [commentReplies, setCommentReplies] = useState({});

// 🔹 برای پاسخ به ریپلای‌ها
const [replyReplies, setReplyReplies] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteReplyModal, setShowDeleteReplyModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showRejectModalRep, setShowRejectModalRep] = useState(false);
  const [rejectReasonRep, setRejectReasonRep] = useState("");
  const [currentReply, setCurrentReply] = useState(null);
  const [showPublishModalRep, setShowPublishModalRep] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentComment, setCurrentComment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [formData, setFormData] = useState({ author: "", text: "" });
  const [replyData, setReplyData] = useState({ text: "" });
  const [showReplyForm, setShowReplyForm] = useState({});
  const [rejectReason, setRejectReason] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const user = useUser();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/dashboard/comments");
      const data = await res.json();
      setBlogs(data);
    } catch {
      toast.error("خطا در دریافت کامنت‌ها");
    }
  };

  const toggleCard = (cardId) =>
    setExpandedCard(expandedCard === cardId ? null : cardId);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  const borderColor = (status) => {
    switch (status) {
      case "approved":
        return "border-emerald-500";
      case "rejected":
        return "border-red-500";
      case "pending":
        return "border-yellow-400";
      default:
        return "border-gray-500";
    }
  };

  // --- تابع انتشار ریپلای ---
  const handlePublishReply = async (replyId, commentId, blogId) => {
    try {
      const res = await fetch(
        `/api/dashboard/comments/adminReply/publish/${commentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ replyId }),
        }
      );

      if (!res.ok) throw new Error();
      toast.success("ریپلای منتشر شد");
      await fetchComments(); // به‌روزرسانی لیست کامنت‌ها
    } catch {
      toast.error("خطا در انتشار ریپلای");
    }
  };

  const handleRejectReply = async (replyId, commentId, adminMessage) => {
    try {
      const res = await fetch(
        `/api/dashboard/comments/adminReply/reject/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ replyId, adminMessage }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(" ریپلای با موفقیت رد شد");
        await fetchComments();
      } else {
        toast.error(data.error || " خطا در رد ریپلای");
      }
    } catch (err) {
      toast.error("مشکلی در سرور رخ داد");
    }
  };

  // --- عملیات کامنت ---
  const handleOpenEdit = (comment) => {
    setCurrentComment(comment);
    setFormData({ author: comment.author, text: comment.text });
    setShowEditModal(true);
  };

  const handleConfirmDeleteComment = async (commentId) => {
    try {
      const res = await fetch(`/api/dashboard/comments/${commentId}/delete`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطا در حذف کامنت");

      toast.success(data.message);
      setShowDeleteModal(false);
      await fetchComments();
    } catch (err) {
      console.error(err); // چاپ خطا در کنسول
      toast.error(err.message);
    }
  };

  const handleConfirmDeleteReply = async () => {
    if (!deleteTarget) return;

    try {
      const { replyId, commentId, blogId } = deleteTarget;
      const url = `/api/dashboard/comments/adminReply/delete/${commentId}`;
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyId }),
      };
      const res = await fetch(url, options);

      if (!res.ok) throw new Error("خطا در حذف ریپلای");
      toast.success("ریپلای حذف شد");
      setShowDeleteReplyModal(false);
      await fetchComments();
    } catch {
      toast.error("خطا در حذف ریپلای");
    } finally {
      setShowDeleteReplyModal(false);
      setDeleteTarget(null);
    }
  };

  const handlePublishComment = async () => {
    try {
      const res = await fetch(
        `/api/dashboard/comments/${currentComment._id}/approve`,
        {
          method: "PATCH",
        }
      );
      if (!res.ok) throw new Error();
      toast.success("کامنت تایید و منتشر شد");
      await fetchComments();
      setShowPublishModal(false);
      setBlogs((prev) =>
        prev.map((b) => ({
          ...b,
          comments: b.comments.map((c) =>
            c._id === currentComment._id ? { ...c, status: "approved" } : c
          ),
        }))
      );
    } catch {
      toast.error("خطا در تایید کامنت");
    }
  };

  const handleRejectComment = async () => {
    if (!rejectReason.trim()) {
      toast.error("دلیل رد شدن را وارد کنید");
      return;
    }
    try {
      const res = await fetch(
        `/api/dashboard/comments/${currentComment._id}/reject`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminMessage: rejectReason }),
        }
      );
      if (!res.ok) throw new Error();
      toast.success("کامنت رد شد");
      setShowRejectModal(false);
      await fetchComments();
      setBlogs((prev) =>
        prev.map((b) => ({
          ...b,
          comments: b.comments.map((c) =>
            c._id === currentComment._id
              ? { ...c, status: "rejected", adminMessage: rejectReason }
              : c
          ),
        }))
      );
    } catch {
      toast.error("خطا در رد کردن کامنت");
    }
  };

  const handleAddReply = async (commentId, blogId) => {
    if (!replyData.text) return toast.error("لطفا متن پاسخ را وارد کنید");
    try {
      const isAdminReply = true;
      const res = await fetch(
        `/api/dashboard/comments/adminReply/${commentId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: replyData.text,
            isAdminReply,
            blogId,
            author: user._id,
          }),
        }
      );
      if (!res.ok) throw new Error();
      toast.success("پاسخ اضافه شد");
      await fetchComments();
      setReplyData({ text: "" });
      setShowReplyForm((prev) => ({ ...prev, [commentId]: false }));
    } catch (err) {
      toast.error(err.message || "خطا در افزودن پاسخ");
    }
  };

  // --- فیلتر ---
  const filteredComments = blogs
    .map((b) => ({
      ...b,
      comments: b.comments.filter((c) =>
        statusFilter === "all" ? true : c.status === statusFilter
      ),
    }))
    .filter((b) => b.comments.length > 0);

  const filteredReplies = blogs.flatMap((b) =>
    b.comments.flatMap((c) =>
      c.replies
        .filter((r) =>
          statusFilter === "all" ? true : r.status === statusFilter
        )
        .map((r) => ({ ...r, blogId: b._id, parentCommentId: c._id }))
    )
  );


const handleAddReplyToComment = async (commentId, blogId) => {
  const text = commentReplies[commentId]?.trim();
  if (!text) return toast.error("لطفاً متن پاسخ را وارد کنید");

  try {
    const res = await fetch(`/api/dashboard/comments/adminReply/${commentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        isAdminReply: true,
        blogId,
        author: user?._id,
      }),
    });

    if (!res.ok) throw new Error("خطا در افزودن پاسخ به کامنت");

    toast.success("پاسخ شما ارسال شد");
    setCommentReplies((prev) => ({ ...prev, [commentId]: "" }));
    setShowReplyForm((prev) => ({ ...prev, [commentId]: false }));
    await fetchComments();
  } catch (err) {
    toast.error(err.message);
  }
};

const handleAddReplyToReply = async (replyId, commentId, blogId) => {
  const text = replyReplies[replyId]?.trim();
  if (!text) return toast.error("لطفاً متن پاسخ را وارد کنید");

  try {
    const res = await fetch(`/api/dashboard/comments/adminReplyToReply/${replyId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        isAdminReply: true,
        blogId,
        commentId,
        author: user?._id,
      }),
    });

    if (!res.ok) throw new Error("خطا در افزودن پاسخ به ریپلای");

    toast.success("پاسخ شما ارسال شد");
    setReplyReplies((prev) => ({ ...prev, [replyId]: "" }));
    setShowReplyForm((prev) => ({ ...prev, [replyId]: false }));
    await fetchComments();
  } catch (err) {
    toast.error(err.message);
  }
};




  return (
    <div className="space-y-4 container">
      <h1 className="text-lg font-bold text-white mb-4">
        داشبورد مدیریت کامنت‌ها و پاسخ‌ها
      </h1>

      {/* فیلتر وضعیت */}
      <div className="flex gap-2 mb-4">
        {["pending", "approved", "rejected", "all"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded text-xs ${
              statusFilter === status
                ? status === "pending"
                  ? "bg-yellow-400 text-black"
                  : status === "approved"
                  ? "bg-emerald-500 text-white"
                  : status === "rejected"
                  ? "bg-red-500 text-white"
                  : "bg-gray-600 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {status === "pending"
              ? "در انتظار تایید"
              : status === "approved"
              ? "تایید شده"
              : status === "rejected"
              ? "رد شده"
              : "همه"}
          </button>
        ))}
      </div>

      {/* کامنت‌ها */}
      <h2 className="text-white font-semibold mb-2">کامنت‌ها</h2>
      {filteredComments.length === 0 && (
        <p className="text-gray-300 text-sm">
          هیچ کامنتی برای نمایش وجود ندارد.
        </p>
      )}
      {filteredComments.map((blog) =>
        blog.comments.map((comment) => (
          <div
            key={comment._id}
            className={`bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition border-l-4 ${borderColor(
              comment.status
            )}`}
          >
            <p className="text-gray-200 font-medium text-xs">
              {comment.author} {comment.status === "pending" && "(منتشر نشده)"}
            </p>
            <p className="text-gray-400 text-xs">{formatDate(comment.date)}</p>
            <p className="text-gray-300 text-xs">{comment.text}</p>
            {comment.status === "rejected" && comment.adminMessage && (
              <p className="text-red-400 text-xs">
                دلیل رد شدن: {comment.adminMessage}
              </p>
            )}
            <div className="flex flex-wrap gap-1 mt-2">
              {comment.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      setCurrentComment(comment);
                      setShowPublishModal(true);
                    }}
                    className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-1"
                  >
                    <FaPlus /> انتشار
                  </button>
                  <button
                    onClick={() => {
                      setCurrentComment(comment);
                      setRejectReason("");
                      setShowRejectModal(true);
                    }}
                    className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-1"
                  >
                    <FaTrash /> رد کردن
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setShowReplyForm((prev) => ({
                    ...prev,
                    [comment._id]: !prev[comment._id],
                  }))
                }
                className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center gap-1"
              >
                <FaReply /> پاسخ
              </button>

              <button
                onClick={() => {
                  setDeleteTarget({ type: "comment", id: comment._id }); // تغییرات برای ذخیره id کامنت
                  setShowDeleteModal(true);
                }}
                className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-red-400 rounded flex items-center gap-1"
              >
                حذف کامنت
              </button>
            </div>

          {showReplyForm[comment._id] && (
  <div className="mt-2 space-y-1">
    <textarea
      placeholder="متن پاسخ..."
      value={commentReplies[comment._id] || ""}
      onChange={(e) =>
        setCommentReplies((prev) => ({
          ...prev,
          [comment._id]: e.target.value,
        }))
      }
      className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 text-xs"
      rows={2}
    />
    <button
      onClick={() => handleAddReplyToComment(comment._id, blog._id)}
      className="px-3 py-1 text-xs rounded-md bg-[#49C5B6] hover:bg-[#37a199] text-white transition cursor-pointer"
    >
      افزودن پاسخ
    </button>
  </div>
)}

          </div>
        ))
      )}

      {/* ریپلای‌ها */}
      <h2 className="text-white font-semibold mt-6 mb-2">ریپلای‌ها</h2>
      {filteredReplies.length === 0 && (
        <p className="text-gray-300 text-sm">
          هیچ ریپلای‌ای برای نمایش وجود ندارد.
        </p>
      )}
      {filteredReplies.map((reply) => (
        <div
          key={reply._id}
          className={`bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition border-l-4 ${borderColor(
            reply.status
          )}`}
        >
          <p className="text-gray-200 font-medium text-xs">
            {reply.isAdminReply ? "ادمین" : reply.author}{" "}
            {reply.status === "pending" && "(منتشر نشده)"}
          </p>
          <p className="text-gray-400 text-xs">{formatDate(reply.date)}</p>
          <p className="text-gray-300 text-xs">{reply.text}</p>
          {reply.status === "rejected" && reply.adminMessage && (
            <p className="text-red-400 text-xs">
              دلیل رد شدن: {reply.adminMessage}
            </p>
          )}
          <div className="flex flex-wrap gap-1 mt-2">
            {reply.status === "pending" && (
              <>
                <button
                  onClick={() => {
                    setCurrentReply({
                      replyId: reply._id,
                      commentId: reply.parentCommentId,
                      blogId: reply.blogId,
                    });
                    setShowPublishModalRep(true);
                  }}
                  className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-1"
                >
                  <FaPlus /> انتشار
                </button>
                <button
                  onClick={() => {
                    setCurrentReply({
                      replyId: reply._id,
                      commentId: reply.parentCommentId,
                      blogId: reply.blogId,
                    });
                    setShowRejectModalRep(true);
                  }}
                  className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-1"
                >
                  <FaTrash /> رد
                </button>
              </>
            )}

            {/* دکمه پاسخ */}
            <button
              onClick={() => {
                setShowReplyForm((prev) => ({
                  ...prev,
                  [reply._id]: !prev[reply._id],
                }));
              }}
              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center gap-1"
            >
              <FaReply /> پاسخ
            </button>

            {/* دکمه حذف ریپلای */}
            <button
              onClick={() => {
                setDeleteTarget({
                  type: "reply",
                  replyId: reply._id,
                  commentId: reply.parentCommentId, // ← از parentCommentId استفاده می‌کنیم
                  blogId: reply.blogId, // ← همینطور blogId
                });
                setShowDeleteReplyModal(true);
              }}
              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-red-400 rounded flex items-center gap-1"
            >
              حذف ریپلای
            </button>
          </div>
          {showReplyForm[reply._id] && (
  <div className="mt-2 space-y-1">
    <textarea
      placeholder="متن پاسخ..."
      value={replyReplies[reply._id] || ""}
      onChange={(e) =>
        setReplyReplies((prev) => ({
          ...prev,
          [reply._id]: e.target.value,
        }))
      }
      className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 text-xs"
      rows={2}
    />
    <button
      onClick={() =>
        handleAddReplyToReply(reply._id, reply.parentCommentId, reply.blogId)
      }
      className="px-3 py-1 text-xs rounded-md bg-[#49C5B6] hover:bg-[#37a199] text-white transition cursor-pointer"
    >
      افزودن پاسخ
    </button>
  </div>
)}

        </div>
      ))}

      {/* --- مودال‌ها --- */}
      {showRejectModalRep && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full space-y-3 text-center">
            <h2 className="text-white text-sm md:text-base font-bold mb-4">
              لطفاً دلیل رد شدن کامنت را وارد کنید
            </h2>
            <textarea
              value={rejectReasonRep}
              onChange={(e) => setRejectReasonRep(e.target.value)}
              placeholder="دلیل رد شدن..."
              className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 text-xs"
              rows={3}
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  if (currentReply)
                    handleRejectReply(
                      currentReply.replyId,
                      currentReply.commentId,
                      rejectReasonRep // ← دلیل رد شدن (adminMessage)
                    );
                  setShowRejectModalRep(false);
                  setRejectReasonRep("");
                }}
                className="px-3 py-2 cursor-pointer rounded-md bg-red-600 hover:bg-red-700 text-white transition text-xs md:text-sm"
              >
                رد شود
              </button>

              <button
                onClick={() => setShowRejectModalRep(false)}
                className="px-3 py-2 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 text-white transition text-xs md:text-sm"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full space-y-3 text-center">
            <h2 className="text-white text-sm md:text-base font-bold mb-4">
              آیا مطمئن هستید که می‌خواهید این مورد را منتشر کنید؟
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handlePublishComment}
                className="px-3 py-2 cursor-pointer rounded-md bg-green-600 hover:bg-green-700 text-white transition text-xs md:text-sm"
              >
                بله، منتشر شود
              </button>
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-3 py-2 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 text-white transition text-xs md:text-sm"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {showPublishModalRep && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full space-y-3 text-center">
            <h2 className="text-white text-sm md:text-base font-bold mb-4">
              آیا مطمئن هستید که می‌خواهید این ریپلای را منتشر کنید؟
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  if (currentReply)
                    handlePublishReply(
                      currentReply.replyId,
                      currentReply.commentId,
                      currentReply.blogId
                    );
                  setShowPublishModalRep(false);
                }}
                className="px-3 py-2 cursor-pointer rounded-md bg-green-600 hover:bg-green-700 text-white transition text-xs md:text-sm"
              >
                بله، منتشر شود
              </button>
              <button
                onClick={() => setShowPublishModalRep(false)}
                className="px-3 py-2 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 text-white transition text-xs md:text-sm"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full space-y-3 text-center">
            <h2 className="text-white text-sm md:text-base font-bold mb-4">
              لطفاً دلیل رد شدن را وارد کنید
            </h2>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="دلیل رد شدن..."
              className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 text-xs"
              rows={3}
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRejectComment}
                className="px-3 py-2 cursor-pointer rounded-md bg-red-600 hover:bg-red-700 text-white transition text-xs md:text-sm"
              >
                رد شود
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-3 py-2 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 text-white transition text-xs md:text-sm"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال حذف کامنت */}
      {showDeleteModal && deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full space-y-3 text-center">
            <h2 className="text-white text-sm md:text-base font-bold mb-4">
              آیا مطمئن هستید که می‌خواهید این کامنت را حذف کنید؟
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleConfirmDeleteComment(deleteTarget.id)} // ارسال commentId به تابع
                className="px-3 py-2 cursor-pointer rounded-md bg-red-600 hover:bg-red-700 text-white transition text-xs md:text-sm"
              >
                بله، حذف شود
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 text-white transition text-xs md:text-sm"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال حذف ریپلای */}
      {showDeleteReplyModal && deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full space-y-3 text-center">
            <h2 className="text-white text-sm md:text-base font-bold mb-4">
              آیا مطمئن هستید که می‌خواهید این ریپلای را حذف کنید؟
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDeleteReply}
                className="px-3 py-2 cursor-pointer rounded-md bg-red-600 hover:bg-red-700 text-white transition text-xs md:text-sm"
              >
                بله، حذف شود
              </button>
              <button
                onClick={() => setShowDeleteReplyModal(false)}
                className="px-3 py-2 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 text-white transition text-xs md:text-sm"
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
