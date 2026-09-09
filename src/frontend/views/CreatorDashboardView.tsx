"use client";

import { useState, useEffect } from "react";
import Navbar from "@/src/frontend/components/Navbar";
import ContentReviewModal from "@/src/frontend/components/ContentReviewModal";
import { bookingsApi, paymentApi } from "@/src/frontend/lib/api";
import { SeedBooking } from "@/src/backend/db/seedData";
import { CheckCircle2, Upload } from "lucide-react";

export default function CreatorDashboardView() {
  const [bookings, setBookings] = useState<SeedBooking[]>([]);
  const [earningsData, setEarningsData] = useState<{ totalEarnings: number; pendingEarnings: number }>({
    totalEarnings: 2550,
    pendingEarnings: 850
  });
  const [loading, setLoading] = useState(true);
  const [activeBookingForReview, setActiveBookingForReview] = useState<SeedBooking | null>(null);

  const loadCreatorData = async () => {
    setLoading(true);
    try {
      const [bData, eData] = await Promise.all([
        bookingsApi.getBookings({ creatorId: "cr_1" }),
        paymentApi.getEarnings("cr_1")
      ]);

      if (bData.success) setBookings(bData.data);
      if (eData.success) setEarningsData(eData.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCreatorData();
  }, []);

  const handleStatusUpdate = async (bookingId: string, status: string) => {
    try {
      await bookingsApi.updateStatus(bookingId, { status });
      loadCreatorData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b border-[#E8E6E2] bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Creator Dashboard</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Sarah Jenkins • Sponsorship Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Verified Creator Profile Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl space-y-8">
        {/* Earnings Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Earned</span>
            <p className="mt-2 text-3xl font-black text-gray-900">${earningsData.totalEarnings.toLocaleString()}</p>
            <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">Paid out directly</span>
          </div>

          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending in Escrow</span>
            <p className="mt-2 text-3xl font-black text-amber-600">${earningsData.pendingEarnings.toLocaleString()}</p>
            <span className="text-[11px] font-semibold text-gray-500 mt-1 block">Releases upon post approval</span>
          </div>

          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Deals</span>
            <p className="mt-2 text-3xl font-black text-gray-900">{bookings.length}</p>
            <span className="text-[11px] font-semibold text-gray-500 mt-1 block">Collaborations active</span>
          </div>
        </div>

        {/* Campaign Requests & Booking List */}
        <div className="rounded-3xl border border-[#E8E6E2] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Campaign Booking Requests</h3>
              <p className="text-xs text-gray-500">Review brand offers, accept deals, and submit post drafts</p>
            </div>
          </div>

          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-5 transition hover:bg-gray-50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">Campaign Offer #{booking.id}</span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      ${booking.agreedPrice} Offered
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    Status: <span className="font-semibold text-gray-900">{booking.status}</span> • Escrow:{" "}
                    <span className="font-semibold text-emerald-700">{booking.payoutStatus}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {booking.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(booking.id, "REJECTED")}
                        className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(booking.id, "ACCEPTED")}
                        className="rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-700 shadow"
                      >
                        Accept Deal (${booking.agreedPrice})
                      </button>
                    </>
                  )}

                  {(booking.status === "ACCEPTED" || booking.status === "SUBMITTED" || booking.status === "APPROVED") && (
                    <button
                      onClick={() => setActiveBookingForReview(booking)}
                      className="flex items-center gap-1.5 rounded-full bg-[#17181C] px-5 py-2 text-xs font-semibold text-white hover:bg-black/80 shadow"
                    >
                      <Upload className="h-3.5 w-3.5" /> Submit / View Post Draft
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ContentReviewModal
        booking={activeBookingForReview}
        isOpen={!!activeBookingForReview}
        onClose={() => setActiveBookingForReview(null)}
        onUpdate={loadCreatorData}
        userRole="CREATOR"
      />
    </div>
  );
}
