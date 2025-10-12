"use client";

import { useState, useEffect } from "react";
import { FaRegCommentDots, FaUser, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Comments({ blogId, user, isLoggedIn }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState(""); // کامنت اصلی
  const [replyText, setReplyText] = useState(""); // ریپلای
  const [replyToId, setReplyToId] = useState(null); // id کامنت/ریپلای برای پاسخ دادن
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState(false);
    const [loadingFetch, setLoadingFetch] = useState(false);
  
  // دریافت کامنت‌ها
  const fetchComments = async () => {
    setLoadingFetch(true)
    if (!blogId) return;
    try {
      const res = await fetch(`/api/comments/${blogId}`);
      const data = await res.json();
      if (res.ok) setComments(data.comments || []);
      else toast.error(data.error || "خطا در دریافت کامنت‌ها");
    } catch {
      toast.error("خطا در اتصال به سرور");
    }finally{
    setLoadingFetch(false)

    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const openReplyModal = (commentId) => {
    if (!isLoggedIn) {
      toast.error("برای ارسال پاسخ باید وارد شوید!");
      return;
    }
    setReplyToId(commentId.toString()); // حتما string باشه
    setShowReplyModal(true);
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShowReplyModal(false);
      setClosing(false);
      setReplyText("");
      setError(false);
    }, 300);
  };

  // ارسال کامنت اصلی
  const addNewComment = async () => {
    if (!commentText.trim()) {
      setError(true);
      return toast.error("چیزی وارد نکرده‌اید!");
    }
    if (!blogId || !user?._id) return toast.error("اطلاعات ناقص است.");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, author: user._id, text: commentText }),
      });
      const data = await res.json();
      if (res.ok && data.comment) {
        setComments([data.comment, ...comments]);
        setCommentText("");
        toast.success("نظر شما جهت بررسی ارسال شد ");
      } else throw new Error(data.error || "ارسال کامنت ناموفق بود");
    } catch (err) {
      toast.error(err.message || "خطا در ارسال کامنت");
    }
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return toast.error("چیزی وارد نکرده‌اید!");

    try {
      console.log("ارسال به:", replyToId); // برای دیباگ
      const res = await fetch(`/api/comments/reply/${replyToId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, author: user._id, text: replyText }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast.success(data.message);
      setReplyText("");
      closeModal();
      fetchComments();
    } catch (err) {
      toast.error(err.message || "خطا در ارسال پاسخ");
    }
  };

  // کامپوننت نمایش ریپلای‌ها به صورت بازگشتی
  const ReplyList = ({ replies }) => {
    if (!replies || replies.length === 0) return null;
    return (
      <div className="pl-4 border-l border-gray-600 mt-2 space-y-2 font-medium">
        {replies
          .filter((r) => r.status === "approved")
          .map((r) => (
            <div
              key={r._id}
              className="bg-slate-700 p-2 rounded-md flex flex-col gap-1"
            >
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-1">
                  <FaUser className="text-[#49C5B6] text-xs" />
             <span className="text-xs md:text-sm">  {r.author?.name || r.author}</span>

                </div>
               {/*
                <button
                  onClick={() => openReplyModal(r._id)}
                  className="text-[10px] md:text-xs text-[#49C5B6] hover:text-[#2a4b47]"
                >
                  پاسخ دادن
                </button>*/ }
              </div>
              <p className="text-gray-300 text-[10px] md:text-xs lg:text-sm font-medium mb-1">
                {r.text}
              </p>
              <div className="flex items-center gap-1">
                <FaClock className="text-[#49C5B6] text-xs" />
                <span className="text-[10px] md:text-xs font-medium text-gray-400">
                  {new Date(r.date).toLocaleDateString("fa-IR")}
                </span>
              </div>
              {r.replies && <ReplyList replies={r.replies} />}
            </div>
          ))}
      </div>
    );
  };

  const approvedComments = comments.filter((c) => c.status === "approved");

  return (
    <div className="bg-slate-900 rounded-lg shadow-md mt-6 p-4 font-medium">
      <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mb-4">
        <FaRegCommentDots className="text-[#49C5B6]" />
        <h2 className="text-gray-100 font-medium text-sm md:text-base">
          نظرات این پست
        </h2>
      </div>

            {/* کارت‌های تیم */}
      {loadingFetch ? (
        <p className="text-center text-gray-400 text-sm">در حال بارگذاری...</p>
      ) : approvedComments.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">هیج نظری ثبت نشده است </p>
      ) : (

      <div className="space-y-4">
        {approvedComments.map((c) => (
          <div
            key={c._id}
            className="p-3 bg-slate-800 rounded-md flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between w-full">
                  <div className="flex items-center gap-1">
                    <FaUser className="text-[#49C5B6] text-xs" />
                    <span className="text-xs md:text-sm">
                      {c.author?.name || c.author}
                    </span>
                  </div>
                  <button
                    onClick={() => openReplyModal(c._id)}
                    className="text-[10px] md:text-xs text-[#49C5B6] hover:text-[#31CCBA] cursor-pointer"
                  >
                    پاسخ دادن
                  </button>
                </div>
                <p className="text-gray-300 text-[10px] md:text-xs lg:text-sm font-medium mt-1">
                  {c.text}
                </p>
                <div className="flex items-center gap-1">
                  <FaClock className="text-[#49C5B6] text-xs" />
                  <span className="text-[10px] md:text-xs font-medium">
                    {new Date(c.date).toLocaleDateString("fa-IR")}
                  </span>
                </div>
              </div>
            </div>
            {c.replies && <ReplyList replies={c.replies} />}
          </div>
        ))}
      </div>)}

      {/* فرم ارسال کامنت */}
      {isLoggedIn ? (
        <div className="mt-6 font-medium">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className={`w-full p-2 rounded bg-slate-800 text-white text-sm outline-none focus:ring-2 ${
              error
                ? "border border-red-500 focus:ring-red-500"
                : "focus:ring-[#49C5B6]"
            }`}
            rows="3"
          />
          <button
            onClick={addNewComment}
            className="bg-[#49C5B6] text-white px-3 py-1 rounded text-sm hover:bg-[#31CCBA] mt-2 cursor-pointer"
          >
            ارسال نظر
          </button>
        </div>
      ) : (
        <div className="text-center my-4 text-xs">
          <p className="mb-3">برای ارسال نظر ابتدا وارد سایت شوید</p>
          <Link
            href="/auth/login"
            className="bg-[#49C5B6] text-white px-3 py-1 rounded text-sm hover:bg-[#31CCBA] mt-2 cursor-pointer text-xs"
          >
            ورود به سایت
          </Link>
        </div>
      )}

      {/* مودال پاسخ */}
      {showReplyModal && (
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            closing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`bg-slate-900 p-6 rounded-lg w-96 transform transition-transform duration-300 ${
              closing ? "scale-95" : "scale-100"
            }`}
          >
            <h3 className="text-white font-semibold mb-3">پاسخ به نظر</h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className={`w-full p-2 rounded bg-slate-800 text-white text-sm outline-none focus:ring-2 ${
                error
                  ? "border border-red-500 focus:ring-red-500"
                  : "focus:ring-[#49C5B6]"
              }`}
              rows="3"
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleSubmitReply}
                className="bg-[#49C5B6] text-white px-3 py-1 rounded text-sm hover:bg-[#31CCBA]"
              >
                ارسال پاسخ
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
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
