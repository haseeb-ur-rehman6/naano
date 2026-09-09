"use client";

import { useState } from "react";
import Navbar from "@/src/frontend/components/Navbar";
import { authApi } from "@/src/frontend/lib/api";
import { Building2, UserCheck, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";

export default function RegisterView() {
  const [step, setStep] = useState<1 | 2>(1);
  const [accountType, setAccountType] = useState<"BRAND" | "CREATOR" | "AGENCY">("BRAND");

  // Step 2 Common & Specific Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("United States");

  // Brand Fields
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("Computer Software");
  const [companySize, setCompanySize] = useState("50-200");

  // Creator Fields
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [category, setCategory] = useState("SaaS & B2B Tech");
  const [followersCount, setFollowersCount] = useState("25000");
  const [pricePerPost, setPricePerPost] = useState("750");

  // Agency Fields
  const [agencyName, setAgencyName] = useState("");
  const [clientsCount, setClientsCount] = useState("12");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        accountType,
        fullName,
        email,
        password,
        country,
        companyName,
        website,
        industry,
        companySize,
        linkedinUrl,
        category,
        followersCount: Number(followersCount),
        pricePerPost: Number(pricePerPost),
        agencyName,
        clientsCount: Number(clientsCount)
      };

      const data = await authApi.register(payload);
      if (data.success) {
        localStorage.setItem("naano_user", JSON.stringify(data.user));
        if (accountType === "CREATOR") window.location.href = "/dashboard/creator";
        else if (accountType === "AGENCY") window.location.href = "/dashboard/agency";
        else window.location.href = "/dashboard/brand";
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
        <div className="w-full max-w-xl bg-white rounded-3xl p-8 border border-[#E8E6E2] shadow-xl">
          {/* Step Indicator */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-black text-gray-900">
                {step === 1 ? "Choose Account Type" : `Setup your ${accountType.toLowerCase()} profile`}
              </h2>
              <p className="text-xs text-gray-500">Step {step} of 2</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-8 rounded-full ${step >= 1 ? "bg-black" : "bg-gray-200"}`} />
              <span className={`h-2.5 w-8 rounded-full ${step === 2 ? "bg-black" : "bg-gray-200"}`} />
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                How do you plan to use Naano?
              </p>

              <div
                onClick={() => setAccountType("BRAND")}
                className={`group cursor-pointer flex items-center gap-4 rounded-2xl border p-4 transition ${
                  accountType === "BRAND"
                    ? "border-black bg-gray-50 ring-2 ring-black"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">I am a company looking for creators</h4>
                  <p className="text-xs text-gray-500">Book verified LinkedIn creators, manage campaigns & track ROI.</p>
                </div>
                {accountType === "BRAND" && <CheckCircle2 className="h-5 w-5 text-black" />}
              </div>

              <div
                onClick={() => setAccountType("CREATOR")}
                className={`group cursor-pointer flex items-center gap-4 rounded-2xl border p-4 transition ${
                  accountType === "CREATOR"
                    ? "border-black bg-gray-50 ring-2 ring-black"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">I am a creator looking for sponsorships</h4>
                  <p className="text-xs text-gray-500">Monetize your LinkedIn audience with premium B2B brand deals.</p>
                </div>
                {accountType === "CREATOR" && <CheckCircle2 className="h-5 w-5 text-black" />}
              </div>

              <div
                onClick={() => setAccountType("AGENCY")}
                className={`group cursor-pointer flex items-center gap-4 rounded-2xl border p-4 transition ${
                  accountType === "AGENCY"
                    ? "border-black bg-gray-50 ring-2 ring-black"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">I am an agency managing creators</h4>
                  <p className="text-xs text-gray-500">Manage multiple creators, brands & consolidated invoicing.</p>
                </div>
                {accountType === "AGENCY" && <CheckCircle2 className="h-5 w-5 text-black" />}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-[#17181C] py-3 text-sm font-bold text-white transition hover:bg-black/80 shadow-lg"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-black"
                />
              </div>

              {/* Role-Specific Fields */}
              {accountType === "BRAND" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Company Name</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Acme Analytics"
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Company Website</label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://acme.io"
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-black"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Industry</label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="Computer Software"
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-black"
                    />
                  </div>
                </>
              )}

              {accountType === "CREATOR" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      required
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-black"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Category</label>
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Followers</label>
                      <input
                        type="number"
                        value={followersCount}
                        onChange={(e) => setFollowersCount(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Price/Post ($)</label>
                      <input
                        type="number"
                        value={pricePerPost}
                        onChange={(e) => setPricePerPost(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </>
              )}

              {accountType === "AGENCY" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Agency Name</label>
                    <input
                      type="text"
                      required
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      placeholder="Growth Peak Agency"
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Managed Creators</label>
                    <input
                      type="number"
                      value={clientsCount}
                      onChange={(e) => setClientsCount(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-black"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 rounded-full bg-[#17181C] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-black/80 shadow-lg disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Complete Signup"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
