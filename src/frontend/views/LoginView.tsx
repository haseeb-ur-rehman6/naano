"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/src/frontend/components/Navbar";
import { authApi } from "@/src/frontend/lib/api";
import { Sparkles, ArrowRight, ShieldCheck, UserCheck, Building2, Briefcase } from "lucide-react";

export default function LoginView() {
  const [email, setEmail] = useState("brand@acme.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleQuickLogin = (role: "BRAND" | "CREATOR" | "AGENCY" | "ADMIN") => {
    let mockUser: any;
    let redirectUrl = "/dashboard/brand";

    if (role === "BRAND") {
      mockUser = { id: "u_brand_1", email: "brand@acme.com", role: "BRAND", fullName: "Acme Analytics" };
      redirectUrl = "/dashboard/brand";
    } else if (role === "CREATOR") {
      mockUser = { id: "u_creator_1", email: "sarah@jenkins.tech", role: "CREATOR", fullName: "Sarah Jenkins" };
      redirectUrl = "/dashboard/creator";
    } else if (role === "AGENCY") {
      mockUser = { id: "u_agency_1", email: "contact@growthagency.com", role: "AGENCY", fullName: "Growth Peak Agency" };
      redirectUrl = "/dashboard/agency";
    } else {
      mockUser = { id: "u_admin_1", email: "admin@naano.com", role: "ADMIN", fullName: "Naano Admin" };
      redirectUrl = "/admin";
    }

    localStorage.setItem("naano_user", JSON.stringify(mockUser));
    window.location.href = redirectUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authApi.login(email);
      if (data.success) {
        localStorage.setItem("naano_user", JSON.stringify(data.user));
        window.location.href = data.user.role === "CREATOR" ? "/dashboard/creator" : "/dashboard/brand";
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E8E6E2] shadow-xl">
          <div className="text-center">
            <h2 className="text-2xl font-black text-gray-900">Welcome back to Naano</h2>
            <p className="mt-2 text-xs text-gray-500">Sign in to your B2B LinkedIn Sponsorship Portal</p>
          </div>

          {/* 1-Click Role Login Shortcuts */}
          <div className="mt-6 rounded-2xl bg-amber-50/80 p-3.5 border border-amber-200/60">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
              <Sparkles className="h-4 w-4 text-amber-600" /> 1-Click Demo Testing Logins
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("BRAND")}
                className="flex items-center gap-1.5 rounded-xl bg-white p-2.5 text-left text-xs font-semibold text-gray-800 shadow-sm border border-amber-100 hover:bg-amber-100/50"
              >
                <Building2 className="h-3.5 w-3.5 text-amber-600" /> Brand Login
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("CREATOR")}
                className="flex items-center gap-1.5 rounded-xl bg-white p-2.5 text-left text-xs font-semibold text-gray-800 shadow-sm border border-amber-100 hover:bg-emerald-100/50"
              >
                <UserCheck className="h-3.5 w-3.5 text-emerald-600" /> Creator Login
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("AGENCY")}
                className="flex items-center gap-1.5 rounded-xl bg-white p-2.5 text-left text-xs font-semibold text-gray-800 shadow-sm border border-amber-100 hover:bg-blue-100/50"
              >
                <Briefcase className="h-3.5 w-3.5 text-blue-600" /> Agency Login
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("ADMIN")}
                className="flex items-center gap-1.5 rounded-xl bg-white p-2.5 text-left text-xs font-semibold text-gray-800 shadow-sm border border-amber-100 hover:bg-purple-100/50"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-purple-600" /> Admin Login
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-amber-700 hover:underline">Forgot?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-[#17181C] py-3 text-sm font-bold text-white transition hover:bg-black/80 shadow-lg disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-gray-900 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
