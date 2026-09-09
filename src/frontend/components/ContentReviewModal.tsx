"use client";

import { useState } from "react";
import { X, CheckCircle, MessageSquare, AlertCircle, Send, FileText, Image as ImageIcon, ExternalLink } from "lucide-react";
import { SeedBooking } from "@/src/backend/db/seedData";

interface ContentReviewModalProps {
  booking: SeedBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  userRole: "BRAND" | "CREATOR";
}

export default function ContentReviewModal({ booking, isOpen, onClose, onUpdate, userRole }: ContentReviewModalProps) {
  const [commentText, setCommentText] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Draft submission state for Creator
  const [postDraft, setPostDraft] = useState(booking?.postText || "");
  const [mediaUrl, setMediaUrl] = useState(booking?.mediaUrl || "");
  const [postLink, setPostLink] = useState(booking?.postLink || "");

  if (!isOpen || !booking) return null;

  const handleAction = async (status: string, payoutStatus?: string) => {
    setActionLoading(true);
    try {
      await fetch(`/api/bookings/${booking.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, payoutStatus })
      });
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDraftSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await fetch(`/api/bookings/${booking.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postText: postDraft, mediaUrl, postLink })
      });
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await fetch(`/api/bookings/${booking.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: {
            authorName: userRole === "BRAND" ? "Acme Brand Admin" : "Creator",
            authorRole: userRole,
            message: commentText
          }
        })
      });
      setCommentText("");
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Content Review & Workflow</h3>
            <p className="text-xs text-gray-500">Booking ID: {booking.id} • Price: ${booking.agreedPrice}</p>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            {booking.status}
          </span>
        </div>

        {/* Creator Draft Submission View (If creator and drafting) */}
        {userRole === "CREATOR" && booking.status !== "APPROVED" && (
          <form onSubmit={handleDraftSubmit} className="mt-6 space-y-4 border-b border-gray-100 pb-6">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Submit LinkedIn Post Draft</h4>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn Post Text</label>
              <textarea
                rows={4}
                required
                value={postDraft}
                onChange={(e) => setPostDraft(e.target.value)}
                placeholder="Write your LinkedIn post copy here..."
                className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Image / Asset URL</label>
                <input
                  type="url"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Published LinkedIn Link (Optional)</label>
                <input
                  type="url"
                  value={postLink}
                  onChange={(e) => setPostLink(e.target.value)}
                  placeholder="https://linkedin.com/posts/..."
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-xs outline-none focus:border-black"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={actionLoading}
              className="rounded-full bg-[#17181C] px-5 py-2 text-xs font-semibold text-white transition hover:bg-black/80 shadow"
            >
              {actionLoading ? "Submitting..." : "Submit Draft for Approval"}
            </button>
          </form>
        )}

        {/* Post Preview */}
        {booking.postText && (
          <div className="mt-6 rounded-2xl bg-gray-50 p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-bold text-gray-900">Submitted Post Copy</span>
            </div>
            <p className="whitespace-pre-wrap text-xs leading-relaxed text-gray-800">{booking.postText}</p>

            {booking.mediaUrl && (
              <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={booking.mediaUrl} alt="Post asset preview" className="max-h-60 w-full object-cover" />
              </div>
            )}

            {booking.postLink && (
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-gray-500">Live Post URL:</span>
                <a href={booking.postLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-semibold text-blue-600 hover:underline">
                  View on LinkedIn <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Discussion Comments */}
        <div className="mt-6">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Feedback & Revision Discussion</h4>
          <div className="space-y-3 max-h-44 overflow-y-auto pr-1">
            {booking.comments && booking.comments.length > 0 ? (
              booking.comments.map((c) => (
                <div key={c.id} className="rounded-xl bg-gray-50 p-3 border border-gray-100 text-xs">
                  <div className="flex items-center justify-between text-gray-500 mb-1">
                    <span className="font-semibold text-gray-900">{c.authorName} ({c.authorRole})</span>
                    <span className="text-[10px]">{new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-gray-700">{c.message}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">No comments yet.</p>
            )}
          </div>

          <form onSubmit={handleAddComment} className="mt-3 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add feedback comment..."
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black"
            />
            <button
              type="submit"
              className="flex items-center gap-1 rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-black"
            >
              <Send className="h-3 w-3" /> Send
            </button>
          </form>
        </div>

        {/* Brand Approval Action Buttons */}
        {userRole === "BRAND" && (
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              onClick={() => handleAction("REVISION_REQUESTED")}
              disabled={actionLoading}
              className="rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100"
            >
              Request Changes
            </button>
            <button
              onClick={() => handleAction("APPROVED", "PAID_OUT")}
              disabled={actionLoading}
              className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-700 shadow"
            >
              <CheckCircle className="h-4 w-4" /> Approve Draft & Release ${booking.agreedPrice}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
