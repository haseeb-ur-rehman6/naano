"use client";

import { useState, useEffect } from "react";
import Navbar from "@/src/frontend/components/Navbar";
import { adminApi } from "@/src/frontend/lib/api";
import { CheckCircle2 } from "lucide-react";

export default function AdminDashboardView() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getStats()
      .then((data) => {
        if (data.success) setStats(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col font-sans">
      <Navbar />

      <div className="border-b border-[#E8E6E2] bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Superadmin Governance</span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
            Naano Platform Admin Panel
          </h1>
        </div>
      </div>

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Users</span>
            <p className="mt-2 text-3xl font-black text-gray-900">{stats?.totalUsers}</p>
            <span className="text-[11px] font-semibold text-purple-600 mt-1 block">Registered accounts</span>
          </div>

          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Verified Creators</span>
            <p className="mt-2 text-3xl font-black text-emerald-800">{stats?.totalCreators}</p>
            <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">Active talent</span>
          </div>

          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gross Platform Volume</span>
            <p className="mt-2 text-3xl font-black text-gray-900">${stats?.totalRevenue.toLocaleString()}</p>
            <span className="text-[11px] font-semibold text-gray-500 mt-1 block">Total campaign value</span>
          </div>

          <div className="rounded-3xl border border-[#E8E6E2] bg-white p-5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Net Platform Fees (15%)</span>
            <p className="mt-2 text-3xl font-black text-purple-900">${stats?.platformFee.toLocaleString()}</p>
            <span className="text-[11px] font-semibold text-purple-600 mt-1 block">Naano commission cut</span>
          </div>
        </div>

        {/* User Management Table */}
        <div className="rounded-3xl border border-[#E8E6E2] bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">Platform User Directory</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase font-semibold text-[10px]">
                  <th className="pb-3">User ID</th>
                  <th className="pb-3">Full Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {stats?.usersList?.map((u: any) => (
                  <tr key={u.id}>
                    <td className="py-3 font-mono text-gray-500">{u.id}</td>
                    <td className="py-3 font-bold text-gray-900">{u.fullName}</td>
                    <td className="py-3 text-gray-600">{u.email}</td>
                    <td className="py-3">
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-800 uppercase">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
