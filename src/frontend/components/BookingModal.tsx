"use client";

import { useState } from "react";
import { X, CheckCircle2, DollarSign, Calendar, Sparkles } from "lucide-react";
import { SeedCreator } from "@/src/backend/db/seedData";

interface BookingModalProps {
  creator: SeedCreator | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (bookingId: string) => void;
}

export default function BookingModal({ creator, isOpen, onClose, onSuccess }: BookingModalProps) {
  const [packageType, setPackageType] = useState<"single" | "package3">("single");
  const [campaignName, setCampaignName] = useState("");
  const [productName, setProductName] = useState("");
  const [brief, setBrief] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !creator) return null;

  const price = packageType === "single" ? creator.pricePerPost : creator.pricePackage3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Create campaign and booking via API
      const campRes = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: campaignName || `Sponsorship deal with ${creator.name}`,
          productName: productName || "Acme SaaS",
          description: brief || "B2B Creator Sponsorship post",
          objective: "Leads",
          targetIndustry: creator.category,
          targetRoles: "Decision Makers",
          companySize: "50-200",
          targetLocation: creator.location,
          totalBudget: price,
          requiredCreators: 1,
          topics: creator.topics,
          selectedCreatorIds: [creator.id]
        })
      });

      const campData = await campRes.json();
      if (campData.success) {
        onSuccess(campData.data.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-2xl border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={creator.avatarUrl} alt={creator.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-lg font-bold text-gray-900">Book {creator.name}</h3>
              <CheckCircle2 className="h-4 w-4 text-blue-500 fill-blue-50" />
            </div>
            <p className="text-xs text-gray-500">{creator.category} • {creator.followersCount.toLocaleString()} Followers</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Select Package */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Select Package Option
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPackageType("single")}
                className={`flex flex-col rounded-2xl border p-4 text-left transition ${
                  packageType === "single"
                    ? "border-black bg-gray-50 ring-2 ring-black"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="text-xs font-medium text-gray-500">1 Sponsored Post</span>
                <span className="mt-1 text-xl font-black text-gray-900">${creator.pricePerPost}</span>
                <span className="mt-1 text-[11px] text-gray-400">Single organic LinkedIn post</span>
              </button>

              <button
                type="button"
                onClick={() => setPackageType("package3")}
                className={`relative flex flex-col rounded-2xl border p-4 text-left transition ${
                  packageType === "package3"
                    ? "border-black bg-gray-50 ring-2 ring-black"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="absolute -top-2.5 right-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                  Save 15%
                </span>
                <span className="text-xs font-medium text-gray-500">3-Post Campaign</span>
                <span className="mt-1 text-xl font-black text-gray-900">${creator.pricePackage3}</span>
                <span className="mt-1 text-[11px] text-gray-400">Sequence of 3 posts over 30 days</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Campaign Name
            </label>
            <input
              type="text"
              required
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g. Q3 Growth Telemetry Launch"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Product / Service Name
            </label>
            <input
              type="text"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Acme Insight Engine"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Campaign Brief & Objective
            </label>
            <textarea
              rows={3}
              required
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Describe your target audience key points, value props, or call to action..."
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Pricing Summary */}
          <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4 border border-gray-100">
            <div>
              <span className="text-xs text-gray-500">Total Investment</span>
              <p className="text-xl font-black text-gray-900">${price}</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
              Held in Escrow until completion
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-full bg-[#17181C] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-black/80 shadow-lg disabled:opacity-50"
            >
              {submitting ? "Processing..." : `Send Offer ($${price})`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
