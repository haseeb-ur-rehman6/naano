"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User, Bell, ChevronDown, LogOut, ShieldCheck, Sparkles, LayoutDashboard, Search, PlusCircle, CreditCard } from "lucide-react";

export interface UserSession {
  id: string;
  email: string;
  role: "BRAND" | "CREATOR" | "AGENCY" | "ADMIN";
  fullName: string;
}

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);

  useEffect(() => {
    // Read cached session or default to brand
    const cached = localStorage.getItem("naano_user");
    if (cached) {
      try {
        setCurrentUser(JSON.parse(cached));
      } catch (e) {
        // fallback
      }
    } else {
      const defaultUser: UserSession = {
        id: "u_brand_1",
        email: "brand@acme.com",
        role: "BRAND",
        fullName: "Acme Analytics"
      };
      setCurrentUser(defaultUser);
      localStorage.setItem("naano_user", JSON.stringify(defaultUser));
    }
  }, []);

  const switchRole = (role: "BRAND" | "CREATOR" | "AGENCY" | "ADMIN") => {
    let updated: UserSession;
    if (role === "BRAND") {
      updated = { id: "u_brand_1", email: "brand@acme.com", role: "BRAND", fullName: "Acme Analytics" };
    } else if (role === "CREATOR") {
      updated = { id: "u_creator_1", email: "sarah@jenkins.tech", role: "CREATOR", fullName: "Sarah Jenkins" };
    } else if (role === "AGENCY") {
      updated = { id: "u_agency_1", email: "contact@growthagency.com", role: "AGENCY", fullName: "Growth Peak Agency" };
    } else {
      updated = { id: "u_admin_1", email: "admin@naano.com", role: "ADMIN", fullName: "Naano Admin" };
    }

    setCurrentUser(updated);
    localStorage.setItem("naano_user", JSON.stringify(updated));
    setUserDropdown(false);

    // Redirect to relevant dashboard
    if (role === "BRAND") window.location.href = "/dashboard/brand";
    else if (role === "CREATOR") window.location.href = "/dashboard/creator";
    else if (role === "AGENCY") window.location.href = "/dashboard/agency";
    else if (role === "ADMIN") window.location.href = "/admin";
  };

  const handleLogout = () => {
    localStorage.removeItem("naano_user");
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E6E2] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/naano-logo-nav.png"
              alt="naano"
              width={110}
              height={28}
              className="h-7 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/creators"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-black"
            >
              <Search className="h-4 w-4" />
              Creator Marketplace
            </Link>

            {currentUser?.role === "BRAND" && (
              <>
                <Link
                  href="/dashboard/brand"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-black"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Brand Dashboard
                </Link>
                <Link
                  href="/campaigns/new"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  <PlusCircle className="h-4 w-4" />
                  New Campaign
                </Link>
              </>
            )}

            {currentUser?.role === "CREATOR" && (
              <Link
                href="/dashboard/creator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-black"
              >
                <LayoutDashboard className="h-4 w-4" />
                Creator Dashboard
              </Link>
            )}

            {currentUser?.role === "AGENCY" && (
              <Link
                href="/dashboard/agency"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-black"
              >
                <LayoutDashboard className="h-4 w-4" />
                Agency Dashboard
              </Link>
            )}

            {currentUser?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-700 transition hover:text-purple-900"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin Panel
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdown(!notifDropdown)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

            {notifDropdown && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-gray-100 bg-white p-4 shadow-xl ring-1 ring-black/5 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-900">Notifications</h4>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                    2 New
                  </span>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="rounded-lg bg-gray-50 p-2.5 text-xs">
                    <p className="font-semibold text-gray-900">Content Draft Submitted</p>
                    <p className="mt-1 text-gray-600">Sarah Jenkins submitted draft for Q3 Launch campaign.</p>
                    <span className="mt-1 block text-[10px] text-gray-400">10m ago</span>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2.5 text-xs">
                    <p className="font-semibold text-gray-900">Payment Escrowed</p>
                    <p className="mt-1 text-gray-600">$850 deposit confirmed for Acme Analytics campaign.</p>
                    <span className="mt-1 block text-[10px] text-gray-400">1h ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Account / Role Switcher */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#17181C] text-xs font-bold text-white">
                  {currentUser.fullName.charAt(0)}
                </div>
                <span className="hidden sm:inline-block max-w-[100px] truncate">{currentUser.fullName}</span>
                <span className="rounded bg-black/5 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-gray-700 uppercase">
                  {currentUser.role}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl ring-1 ring-black/5 z-50">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-xs font-medium text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.email}</p>
                  </div>

                  <div className="py-2">
                    <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      Switch Test Role
                    </p>
                    <button
                      onClick={() => switchRole("BRAND")}
                      className={`mt-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                        currentUser.role === "BRAND" ? "bg-amber-50 text-amber-900" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>Brand (Acme Analytics)</span>
                      {currentUser.role === "BRAND" && <Sparkles className="h-3.5 w-3.5 text-amber-600" />}
                    </button>
                    <button
                      onClick={() => switchRole("CREATOR")}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                        currentUser.role === "CREATOR" ? "bg-emerald-50 text-emerald-900" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>Creator (Sarah Jenkins)</span>
                      {currentUser.role === "CREATOR" && <Sparkles className="h-3.5 w-3.5 text-emerald-600" />}
                    </button>
                    <button
                      onClick={() => switchRole("AGENCY")}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                        currentUser.role === "AGENCY" ? "bg-blue-50 text-blue-900" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>Agency (Growth Peak)</span>
                      {currentUser.role === "AGENCY" && <Sparkles className="h-3.5 w-3.5 text-blue-600" />}
                    </button>
                    <button
                      onClick={() => switchRole("ADMIN")}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                        currentUser.role === "ADMIN" ? "bg-purple-50 text-purple-900" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>Platform Admin</span>
                      {currentUser.role === "ADMIN" && <Sparkles className="h-3.5 w-3.5 text-purple-600" />}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#17181C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/80"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
