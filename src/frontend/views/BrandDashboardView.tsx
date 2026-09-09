"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/src/frontend/components/Navbar";
import ContentReviewModal from "@/src/frontend/components/ContentReviewModal";
import PaymentModal from "@/src/frontend/components/PaymentModal";
import AnalyticsChart from "@/src/frontend/components/AnalyticsChart";
import { campaignsApi, bookingsApi, creatorsApi } from "@/src/frontend/lib/api";
import { SeedCampaign, SeedBooking, SeedCreator } from "@/src/backend/db/seedData";
import { PlusCircle, Megaphone, Users, DollarSign, Target, FileText, BarChart3 } from "lucide-react";

export default function BrandDashboardView() {
  const [campaigns, setCampaigns] = useState<SeedCampaign[]>([]);
  const [bookings, setBookings] = useState<SeedBooking[]>([]);
  const [creators, setCreators] = useState<SeedCreator[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [activeBookingForReview, setActiveBookingForReview] = useState<SeedBooking | null>(null);
  const [paymentCampaign, setPaymentCampaign] = useState<{ id: string; amount: number } | null>(null);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [cData, bData, crData] = await Promise.all([
        campaignsApi.getCampaigns(),
        bookingsApi.getBookings(),
        creatorsApi.getCreators()
      ]);

      if (cData.success) setCampaigns(cData.data);
      if (bData.success) setBookings(bData.data);
      if (crData.success) setCreators(crData.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalSpend = campaigns.reduce((sum, c) => sum + c.totalBudget, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + (c.leadsCount || 0), 0);
  const activeCount = campaigns.filter((c) => c.status === "ACTIVE" || c.status === "CONTENT_REVIEW").length;

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b border-[#E8E6E2] bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Brand Dashboard</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Acme Analytics Campaign Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/creators"
              className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-50"
            >
              Browse Creators
            </Link>
            <Link
              href="/campaigns/new"
              className="flex items-center gap-2 rounded-full bg-[#17181C] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-black/80 shadow-md"
            >
              <PlusCircle className="h-4 w-4" /> Launch Campaign
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl space-y-8">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Campaigns</span>
              <Megaphone className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-3 text-2xl font-black text-gray-900">{activeCount}</p>
            <span className="text-[11px] font-medium text-emerald-600 mt-1 block">Live in marketplace</span>
          </div>

          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Creators Hired</span>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <p className="mt-3 text-2xl font-black text-gray-900">{bookings.length}</p>
            <span className="text-[11px] font-medium text-gray-500 mt-1 block">Across all campaigns</span>
          </div>

          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Investment</span>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="mt-3 text-2xl font-black text-gray-900">${totalSpend.toLocaleString()}</p>
            <span className="text-[11px] font-medium text-emerald-600 mt-1 block">Protected by Stripe Escrow</span>
          </div>

          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Leads Generated</span>
              <Target className="h-4 w-4 text-purple-600" />
            </div>
            <p className="mt-3 text-2xl font-black text-gray-900">{totalLeads}</p>
            <span className="text-[11px] font-medium text-purple-600 mt-1 block">Verified conversion events</span>
          </div>
        </div>

        {/* Live Performance Analytics Chart */}
        <div className="rounded-3xl border border-[#E8E6E2] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Campaign Performance & Clicks</h3>
              <p className="text-xs text-gray-500">Real-time click events and converted leads over time</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              <BarChart3 className="h-3.5 w-3.5" /> +18.4% this week
            </span>
          </div>

          <AnalyticsChart
            data={[
              { date: "Mon", clicks: 42, leads: 5 },
              { date: "Tue", clicks: 88, leads: 12 },
              { date: "Wed", clicks: 145, leads: 19 },
              { date: "Thu", clicks: 110, leads: 14 },
              { date: "Fri", clicks: 190, leads: 26 },
              { date: "Sat", clicks: 95, leads: 11 },
              { date: "Sun", clicks: 135, leads: 18 }
            ]}
          />
        </div>

        {/* Active Campaigns Table */}
        <div className="rounded-3xl border border-[#E8E6E2] bg-white p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <h3 className="text-base font-bold text-gray-900">Active Campaigns</h3>
            <span className="text-xs text-gray-500">{campaigns.length} Total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase font-semibold text-[10px]">
                  <th className="pb-3 font-semibold">Campaign Name</th>
                  <th className="pb-3 font-semibold">Objective</th>
                  <th className="pb-3 font-semibold">Budget</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Results</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {campaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-gray-50/80">
                    <td className="py-3.5">
                      <p className="font-bold text-gray-900">{camp.name}</p>
                      <span className="text-[10px] text-gray-400">{camp.productName}</span>
                    </td>
                    <td className="py-3.5 text-gray-700">{camp.objective}</td>
                    <td className="py-3.5 font-bold text-gray-900">${camp.totalBudget}</td>
                    <td className="py-3.5">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                        {camp.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-gray-700">
                      {camp.clicksCount} clicks • {camp.leadsCount} leads
                    </td>
                    <td className="py-3.5 text-right space-x-2">
                      <button
                        onClick={() => setPaymentCampaign({ id: camp.id, amount: camp.totalBudget })}
                        className="rounded-full bg-gray-900 px-3 py-1 text-[11px] font-semibold text-white hover:bg-black"
                      >
                        Escrow Checkout
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Content Approval Workflow Queue */}
        <div className="rounded-3xl border border-[#E8E6E2] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Content Drafts Pending Review</h3>
              <p className="text-xs text-gray-500">Review creator post drafts before publication</p>
            </div>
          </div>

          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-900 font-bold">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Creator Booking #{b.id}</p>
                    <p className="text-[11px] text-gray-500">Price: ${b.agreedPrice} • Status: {b.status}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveBookingForReview(b)}
                  className="rounded-full bg-[#17181C] px-4 py-2 text-xs font-semibold text-white transition hover:bg-black/80 shadow"
                >
                  Review Draft & Feedback
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Content Review Modal */}
      <ContentReviewModal
        booking={activeBookingForReview}
        isOpen={!!activeBookingForReview}
        onClose={() => setActiveBookingForReview(null)}
        onUpdate={loadDashboardData}
        userRole="BRAND"
      />

      {/* Stripe Payment Checkout Modal */}
      <PaymentModal
        campaignId={paymentCampaign?.id || ""}
        amount={paymentCampaign?.amount || 0}
        isOpen={!!paymentCampaign}
        onClose={() => setPaymentCampaign(null)}
        onSuccess={loadDashboardData}
      />
    </div>
  );
}
