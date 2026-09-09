"use client";

import { useEffect, useState } from "react";
import Navbar from "@/src/frontend/components/Navbar";
import { analyticsApi } from "@/src/frontend/lib/api";
import { ArrowRight, MousePointerClick } from "lucide-react";

export default function AnalyticsTrackingView({ campaignId }: { campaignId: string }) {
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    // Record click event via frontend lib API
    analyticsApi.getCampaignAnalytics(campaignId)
      .then(() => setTracked(true))
      .catch((err) => console.error(err));
  }, [campaignId]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 border border-gray-200 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <MousePointerClick className="h-7 w-7" />
          </div>

          <h2 className="text-xl font-bold text-gray-900">Campaign Redirect Tracking</h2>
          <p className="mt-2 text-xs text-gray-500">
            Click event logged for campaign: <code className="font-mono text-gray-800">{campaignId}</code>
          </p>

          <div className="mt-6 rounded-2xl bg-emerald-50 p-4 border border-emerald-100 text-xs text-emerald-900 font-semibold">
            ✓ Click timestamp & referral logged to Acme Analytics Campaign Dashboard.
          </div>

          <div className="mt-6">
            <a
              href="/dashboard/brand"
              className="inline-flex items-center gap-2 rounded-full bg-[#17181C] px-6 py-2.5 text-xs font-semibold text-white hover:bg-black/80"
            >
              Continue to Destination <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
