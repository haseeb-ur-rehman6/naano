"use client";

import Navbar from "@/src/frontend/components/Navbar";
import { Plus } from "lucide-react";

export default function AgencyDashboardView() {
  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b border-[#E8E6E2] bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Agency Portal</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Growth Peak Agency Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-full bg-[#17181C] px-5 py-2.5 text-xs font-semibold text-white hover:bg-black/80 shadow">
              <Plus className="h-4 w-4" /> Add Managed Creator
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl space-y-8">
        {/* KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Managed Creators</span>
            <p className="mt-2 text-3xl font-black text-gray-900">12</p>
            <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">Active talent roster</span>
          </div>

          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Brand Accounts</span>
            <p className="mt-2 text-3xl font-black text-gray-900">8</p>
            <span className="text-[11px] font-semibold text-gray-500 mt-1 block">Client accounts</span>
          </div>

          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Monthly Revenue</span>
            <p className="mt-2 text-3xl font-black text-gray-900">$18,400</p>
            <span className="text-[11px] font-semibold text-blue-600 mt-1 block">Combined earnings</span>
          </div>

          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Agency Commission</span>
            <p className="mt-2 text-3xl font-black text-emerald-700">$2,760</p>
            <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">15% net agency cut</span>
          </div>
        </div>

        {/* Managed Talent Portfolio Table */}
        <div className="rounded-3xl border border-[#E8E6E2] bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">Creator Portfolio Roster</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase font-semibold text-[10px]">
                  <th className="pb-3">Creator Name</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Followers</th>
                  <th className="pb-3">Rate/Post</th>
                  <th className="pb-3">Active Deals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                <tr>
                  <td className="py-3 font-bold text-gray-900">Sarah Jenkins</td>
                  <td className="py-3">SaaS & B2B Tech</td>
                  <td className="py-3">48,500</td>
                  <td className="py-3 font-bold text-gray-900">$850</td>
                  <td className="py-3 text-emerald-600">2 Campaigns</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-gray-900">Alex Rivera</td>
                  <td className="py-3">Marketing & Sales</td>
                  <td className="py-3">72,000</td>
                  <td className="py-3 font-bold text-gray-900">$1,200</td>
                  <td className="py-3 text-emerald-600">3 Campaigns</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
