"use client";

import { useState } from "react";
import { FaRegCommentDots, FaUser, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Comments({ initialComments = [], isLoggedIn }) {
  const [comments, setComments] = useState(initialComments);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [closing, setClosing] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(false);

  const openReplyModal = (commentId) => {
    if (!isLoggedIn) {
      toast.error("شما لاگین نکرده اید! ابتدا وارد حساب کاربری خود شوید");
      ش;
      return;
    }
    setReplyTo(commentId);
    setShowReplyModal(true);
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShowReplyModal(false);
      setClosing(false);
      setNewComment("");
      setError(false);
    }, 300);
  };

  const addReplyToComments = (commentsList, replyToId, newReply) => {
    return commentsList.map((c) => {
      if (c.id === replyToId) {
        return { ...c, replies: [...c.replies, newReply] };
      }
      if (c.replies && c.replies.length > 0) {
        return {
          ...c,
          replies: addReplyToComments(c.replies, replyToId, newReply),
        };
      }
      return c;
    });
  };

  const handleSubmitReply = () => {
    if (!newComment.trim()) {
      setError(true);
      toast.error("چیزی وارد نکرده اید!");

      return;
    }

    const newReply = {
      id: Date.now(),
      text: newComment,
      author: "کاربر شما",
      date: new Date().toLocaleDateString("fa-IR"),
      replies: [],
    };

    setComments(addReplyToComments(comments, replyTo, newReply));

    toast.success(" نظر شما با موفقیت ثبت شد!", {});
    closeModal();
  };
  const addNewComment = () => {
    if (!newComment.trim()) {
      setError(true);
      toast.error("چیزی وارد نکرده اید!");
      return;
    }
    const comment = {
      id: Date.now(),
      text: newComment,
      author: "کاربر شما",
      date: new Date().toLocaleDateString("fa-IR"),
      replies: [],
    };
    setComments([comment, ...comments]);
    setNewComment("");
    setError(false);
    toast.success("نظر شما با موفقیت ثبت شد!", {});
  };

  const ReplyList = ({ replies }) => {
    return (
      <div className="pl-4 border-l border-gray-600 mt-2 space-y-2 font-medium">
        {replies.map((r) => (
          <div
            key={r.id}
            className="bg-slate-700 p-2 rounded-md flex flex-col gap-1"
          >
            <div className="">
              <div className="flex flex-col gap-1">
                <div className="flex  justify-between">
                  <div className="flex items-center gap-1">
                    <FaUser className="text-[#49C5B6] text-xs" />
                    <span className="text-xs md:text-sm">{r.author}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => openReplyModal(r.id)}
                      className="text-[10px] md:text-xs text-[#49C5B6] hover:text-[#31CCBA] self-start cursor-pointer  whitespace-nowrap"
                    >
                      پاسخ دادن
                    </button>
                  </div>
                </div>
                <div className="text-gray-300">
                  <div className=" mb-1">
                    <p className="text-gray-300 text-[10px] text-justify md:text-xs lg:text-sm font-medium">
                      {r.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-[#49C5B6] text-xs" />
                    <span className="text-[10px] md:text-xs font-medium text-gray-400">
                      {r.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {r.replies && r.replies.length > 0 && (
              <ReplyList replies={r.replies} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-slate-900 rounded-lg shadow-md mt-6 p-4 font-medium">
      <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mb-4">
        <FaRegCommentDots className="text-[#49C5B6]" />
        <h2 className="text-gray-100 font-medium text-sm md:text-base">
          نظرات این پست
        </h2>
      </div>

      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-gray-400 text-sm">نظری ثبت نشده است.</p>
        )}

        {comments.map((c) => (
          <div
            key={c.id}
            className="p-3 bg-slate-800 rounded-md flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <div className="flex  justify-between ">
                  <div className="flex items-center gap-1">
                    <FaUser className="text-[#49C5B6] text-xs" />
                    <span className="text-xs md:text-sm">{c.author}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => openReplyModal(c.id)}
                      className="text-[10px] md:text-xs text-[#49C5B6] hover:text-[#31CCBA] self-start cursor-pointer  whitespace-nowrap"
                    >
                      پاسخ دادن
                    </button>
                  </div>
                </div>
                <div className=" text-gray-400  mt-1">
                  <div className="flex items-start gap-1 mb-1">
                    <p className="text-gray-300 text-[10px] text-justify md:text-xs lg:text-sm font-medium">
                      {c.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <FaClock className="text-[#49C5B6] text-xs" />
                    <span className="text-[10px] md:text-xs font-medium">
                      {c.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {c.replies && c.replies.length > 0 && (
              <ReplyList replies={c.replies} />
            )}
          </div>
        ))}
      </div>

      {isLoggedIn && (
        <div className="mt-6 font-medium">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className={`w-full p-2 rounded bg-slate-800 text-white text-sm outline-none focus:ring-2 ${
              error
                ? "border border-red-500 focus:ring-red-500"
                : "focus:ring-[#49C5B6]"
            }`}
            rows="3"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={addNewComment}
              className="bg-[#49C5B6] text-white px-3 py-1 rounded text-sm hover:bg-[#31CCBA] cursor-pointer"
            >
              ثبت نظر
            </button>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="mt-6 text-center font-medium">
          <p className="text-gray-400 text-sm mb-2">
            برای ثبت نظر باید ابتدا وارد شوید
          </p>
          <a
            href="/login"
            className="inline-block bg-[#49C5B6] text-white px-4 py-2 rounded text-sm hover:bg-[#31CCBA]"
          >
            ورود به حساب کاربری
          </a>
        </div>
      )}

      {showReplyModal && (
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
            closing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`bg-slate-900 p-6 rounded-lg w-96 transform transition-transform duration-300 ease-in-out ${
              closing ? "scale-95" : "scale-100"
            }`}
          >
            <h3 className="text-white font-semibold mb-3">پاسخ به نظر</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
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
                className="bg-[#49C5B6] text-white px-3 py-1 rounded text-sm hover:bg-[#31CCBA] cursor-pointer"
              >
                ثبت پاسخ
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 cursor-pointer"
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
