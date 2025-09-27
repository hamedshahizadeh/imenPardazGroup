"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaReply, FaPlus, FaBell } from "react-icons/fa";
import toast from "react-hot-toast";
import cards from "@/data/datas";

export default function CommentsDashboard() {
  const [cardss, setCards] = useState(
    cards.map(card => ({
      ...card,
      comments: card.comments.map(c => ({
        ...c,
        status: c.status || "pending", // pending | approved | rejected
        adminMessage: c.adminMessage || "",
      }))
    }))
  );

  const [expandedCard, setExpandedCard] = useState(null);
  const [currentComment, setCurrentComment] = useState(null);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [formData, setFormData] = useState({ author: "", text: "" });
  const [replyData, setReplyData] = useState({ author: "", text: "" });
  const [showReplyForm, setShowReplyForm] = useState({});
  const [rejectReason, setRejectReason] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending"); // pending | approved | rejected

  const toggleCard = (cardId) => setExpandedCard(expandedCard === cardId ? null : cardId);

  const handleOpenEdit = (cardId, comment) => {
    setCurrentCardId(cardId);
    setCurrentComment(comment);
    setFormData({ author: comment.author, text: comment.text });
    setShowEditModal(true);
  };

  const handleEditComment = () => {
    setCards(cardss.map(card => {
      if (card.id === currentCardId) {
        return {
          ...card,
          comments: card.comments.map(c =>
            c.id === currentComment.id ? { ...c, ...formData } : c
          ),
        };
      }
      return card;
    }));
    toast.success("کامنت ویرایش شد");
    setShowEditModal(false);
  };

  const handleOpenDelete = (cardId, comment) => {
    setCurrentCardId(cardId);
    setCurrentComment(comment);
    setShowDeleteModal(true);
  };

  const handleDeleteComment = () => {
    setCards(cardss.map(card => {
      if (card.id === currentCardId) {
        return {
          ...card,
          comments: card.comments.filter(c => c.id !== currentComment.id),
        };
      }
      return card;
    }));
    toast.success("کامنت حذف شد");
    setShowDeleteModal(false);
  };

  const handleAddReply = (cardId, commentId) => {
    if (!replyData.author || !replyData.text) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }
    const newReply = { id: Date.now(), author: replyData.author, text: replyData.text, date: new Date().toLocaleDateString('fa-IR') };
    setCards(cardss.map(card => {
      if (card.id === cardId) {
        return {
          ...card,
          comments: card.comments.map(c => c.id === commentId ? { ...c, replies: [...c.replies, newReply] } : c),
        };
      }
      return card;
    }));
    toast.success("پاسخ اضافه شد");
    setReplyData({ author: "", text: "" });
    setShowReplyForm({ ...showReplyForm, [commentId]: false });
  };

  const handleOpenPublish = (cardId, comment) => {
    setCurrentCardId(cardId);
    setCurrentComment(comment);
    setShowPublishModal(true);
  };

  const handlePublishComment = () => {
    setCards(cardss.map(card => {
      if (card.id === currentCardId) {
        return {
          ...card,
          comments: card.comments.map(c => c.id === currentComment.id ? { ...c, status: "approved" } : c),
        };
      }
      return card;
    }));
    toast.success("کامنت منتشر شد");
    setShowPublishModal(false);
  };

  const handleOpenReject = (cardId, comment) => {
    setCurrentCardId(cardId);
    setCurrentComment(comment);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const handleRejectComment = () => {
    if (!rejectReason.trim()) {
      toast.error("لطفاً دلیل رد شدن را وارد کنید");
      return;
    }
    setCards(cardss.map(card => {
      if (card.id === currentCardId) {
        return {
          ...card,
          comments: card.comments.map(c => c.id === currentComment.id ? { ...c, status: "rejected", adminMessage: rejectReason } : c),
        };
      }
      return card;
    }));
    toast.success("کامنت رد شد");
    setShowRejectModal(false);
  };

  // فیلتر کامنت‌ها بر اساس وضعیت
  const filteredCards = cardss.map(card => ({
    ...card,
    comments: card.comments.filter(c => statusFilter === "all" ? true : c.status === statusFilter)
  })).filter(card => card.comments.length > 0);

  const borderColor = (status) => {
    switch (status) {
      case "approved": return "border-emerald-500";
      case "rejected": return "border-red-500";
      case "pending": return "border-yellow-400";
      default: return "border-gray-500";
    }
  };

  return (
    <div className="space-y-4 container">
      <h1 className="text-lg font-bold text-white mb-4">داشبورد مدیریت کامنت‌ها</h1>

      {/* فیلتر وضعیت */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setStatusFilter("pending")} className={`px-3 py-1 cursor-pointer rounded text-xs ${statusFilter==="pending" ? "bg-yellow-400 text-black" : "bg-gray-700 text-gray-200"}`}>در انتظار تایید</button>
        <button onClick={() => setStatusFilter("approved")} className={`px-3 py-1 cursor-pointer rounded text-xs ${statusFilter==="approved" ? "bg-emerald-500 text-white" : "bg-gray-700 text-gray-200"}`}>تایید شده</button>
        <button onClick={() => setStatusFilter("rejected")} className={`px-3 py-1 cursor-pointer rounded text-xs ${statusFilter==="rejected" ? "bg-red-500 text-white" : "bg-gray-700 text-gray-200"}`}>رد شده</button>
      </div>

      {filteredCards.length === 0 && <p className="text-gray-300 text-sm">هیچ کامنتی برای نمایش وجود ندارد.</p>}

      {filteredCards.map(card => (
        <div key={card.id} className="bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center justify-between cursor-pointer pl-2 hover:bg-gray-700 transition" onClick={() => toggleCard(card.id)}>
            <div className="flex items-center gap-4">
              <img src={card.img} alt={card.alt} className="w-16 h-16 object-cover rounded-lg"/>
              <div>
                <h2 className="text-gray-200 font-medium line-clamp-1 text-xs">{card.title}</h2>
                <p className="text-gray-400 line-clamp-1 text-xs">{card.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-lg">{expandedCard === card.id ? "−" : "+"}</span>
            </div>
          </div>

          {expandedCard === card.id && (
            <div className="p-2 space-y-2 bg-gray-900/50">
              {card.comments.map(comment => (
                <div key={`${card.id}-${comment.id}`} className={`bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition border-l-4 ${borderColor(comment.status)}`}>
                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <p className="text-gray-200 font-medium text-xs">{comment.author} {comment.status==="pending" && "(منتشر نشده)"}</p>
                      <p className="text-gray-400 text-xs">{comment.date}</p>
                      <p className="text-gray-300 text-xs">{comment.text}</p>
                      {comment.status === "rejected" && comment.adminMessage && <p className="text-red-400 text-xs">دلیل رد شدن: {comment.adminMessage}</p>}

                      {comment.replies.length>0 && (
                        <div className="pl-4 border-l border-gray-600 mt-2 space-y-1">
                          {comment.replies.map(reply => (
                            <p key={reply.id} className="text-gray-300 text-xs"><span className="font-semibold">{reply.author}:</span> {reply.text} <span className="text-gray-400">({reply.date})</span></p>
                          ))}
                        </div>
                      )}

                      {showReplyForm[comment.id] && (
                        <div className="mt-2 space-y-1">
                          <input type="text" placeholder="نام نویسنده" value={replyData.author} onChange={e => setReplyData({...replyData, author:e.target.value})} className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 text-xs"/>
                          <textarea placeholder="متن پاسخ" value={replyData.text} onChange={e => setReplyData({...replyData, text:e.target.value})} className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 text-xs" rows={2}/>
                          <button onClick={() => handleAddReply(card.id, comment.id)} className="px-3 py-1 text-xs rounded-md bg-[#49C5B6] hover:bg-[#37a199] text-white transition cursor-pointer">افزودن پاسخ</button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      {comment.status==="pending" && (
                        <>
                          <button onClick={() => handleOpenPublish(card.id, comment)} className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition flex items-center gap-1 cursor-pointer"><FaPlus /> انتشار</button>
                          <button onClick={() => handleOpenReject(card.id, comment)} className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition flex items-center gap-1 cursor-pointer"><FaTrash /> رد کردن</button>
                        </>
                      )}
                      <button onClick={() => handleOpenEdit(card.id, comment)} className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition flex items-center gap-1 cursor-pointer"><FaEdit /> ویرایش</button>
                      <button onClick={() => setShowReplyForm({...showReplyForm, [comment.id]: !showReplyForm[comment.id]})} className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition flex items-center gap-1 cursor-pointer"><FaReply /> پاسخ</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* مودال انتشار */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full space-y-3 text-center">
            <h2 className="text-white text-sm md:text-base font-bold mb-4">
              آیا مطمئن هستید که می‌خواهید این کامنت را منتشر کنید؟
            </h2>
            <div className="flex justify-center gap-4">
              <button onClick={handlePublishComment} className="px-3 py-2 cursor-pointer rounded-md bg-green-600 hover:bg-green-700 text-white transition text-xs md:text-sm">بله، منتشر شود</button>
              <button onClick={()=>setShowPublishModal(false)} className="px-3 cursor-pointer py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white transition text-xs md:text-sm">بستن</button>
            </div>
          </div>
        </div>
      )}

      {/* مودال ویرایش */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full space-y-3">
            <h2 className="text-center text-sm md:text-base font-bold text-[#49C5B6] mb-2 flex items-center gap-2"><FaEdit /> ویرایش کامنت</h2>
            <input type="text" value={formData.author} onChange={e => setFormData({...formData, author:e.target.value})} className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 text-xs" placeholder="نویسنده"/>
            <textarea value={formData.text} onChange={e => setFormData({...formData, text:e.target.value})} className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 text-xs" rows={4} placeholder="متن کامنت"/>
            <div className="flex justify-end gap-2">
              <button onClick={handleEditComment} className="px-3 py-1 text-xs cursor-pointer md:text-sm rounded-md bg-[#49C5B6] hover:bg-[#37a199] text-white transition">ذخیره</button>
              <button onClick={()=>setShowEditModal(false)} className="px-3 py-1 cursor-pointer text-xs md:text-sm rounded-md bg-gray-700 hover:bg-gray-600 text-white transition">بستن</button>
            </div>
          </div>
        </div>
      )}

      {/* مودال حذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full text-center">
            <h2 className="text-xs md:text-sm font-medium text-white mb-4">
              آیا مطمئن هستید که می‌خواهید کامنت <span className="text-[#49C5B6]">{currentComment?.author}</span> را حذف کنید؟
            </h2>
            <div className="flex justify-center gap-4">
              <button onClick={handleDeleteComment} className="px-3 py-2 text-xs md:text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white transition cursor-pointer">بله، حذف شود</button>
              <button onClick={()=>setShowDeleteModal(false)} className="px-3 py-2 text-xs md:text-sm font-medium rounded-md bg-gray-700 hover:bg-gray-600 text-white transition cursor-pointer">بستن</button>
            </div>
          </div>
        </div>
      )}

      {/* مودال رد کردن کامنت */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full space-y-3 text-center">
            <h2 className="text-white text-sm md:text-base font-bold mb-4">لطفاً دلیل رد شدن کامنت را وارد کنید</h2>
            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder="دلیل رد شدن..." className="w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600 text-xs" rows={3}/>
            <div className="flex justify-center gap-4">
              <button onClick={handleRejectComment} className="px-3 py-2 cursor-pointer rounded-md bg-red-600 hover:bg-red-700 text-white transition text-xs md:text-sm">رد شود</button>
              <button onClick={()=>setShowRejectModal(false)} className="px-3 py-2 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 text-white transition text-xs md:text-sm">بستن</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
