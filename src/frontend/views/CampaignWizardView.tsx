"use client";

import { useState } from "react";
import Navbar from "@/src/frontend/components/Navbar";
import { campaignsApi } from "@/src/frontend/lib/api";
import { ArrowRight, CheckCircle2, Wand2, Copy } from "lucide-react";

export default function CampaignWizardView() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Info
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("Leads");

  // Step 2: Target Audience
  const [targetIndustry, setTargetIndustry] = useState("Computer Software");
  const [targetRoles, setTargetRoles] = useState("CTO, VP of Engineering, Head of Product");
  const [companySize, setCompanySize] = useState("50-500 employees");
  const [targetLocation, setTargetLocation] = useState("United States");

  // Step 3: Creator Requirements
  const [totalBudget, setTotalBudget] = useState("1500");
  const [requiredCreators, setRequiredCreators] = useState("2");
  const [topics, setTopics] = useState("B2B SaaS, AI Tools, Tech Leadership");

  // AI Brief generator modal/prompt state
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Step 4: Tracking Output
  const [createdCampaign, setCreatedCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAIBrief = async () => {
    if (!aiPrompt) return;
    setIsAiGenerating(true);
    try {
      const data = await campaignsApi.generateAIBrief(aiPrompt);
      if (data.success) {
        setName(data.data.name);
        setDescription(data.data.description);
        setObjective(data.data.objective);
        setTargetRoles(data.data.targetRoles);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await campaignsApi.createCampaign({
        name,
        productName,
        description,
        objective,
        targetIndustry,
        targetRoles,
        companySize,
        targetLocation,
        totalBudget: Number(totalBudget),
        requiredCreators: Number(requiredCreators),
        topics: topics.split(",").map((t) => t.trim())
      });

      if (data.success) {
        setCreatedCampaign(data.data);
        setStep(4);
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

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-3xl">
        <div className="rounded-3xl border border-[#E8E6E2] bg-white p-6 sm:p-10 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Campaign Wizard</span>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
                Launch LinkedIn Creator Campaign
              </h1>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
              Step {step} of 4
            </span>
          </div>

          {/* AI Brief Generator Widget */}
          {step === 1 && (
            <div className="mb-8 rounded-2xl bg-amber-50/70 p-4 border border-amber-200/70">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-2">
                <Wand2 className="h-4 w-4 text-amber-600" /> AI Brief Generator (Bonus Tool)
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Describe your SaaS product or goal..."
                  className="flex-1 rounded-xl border border-amber-200 bg-white px-3.5 py-2 text-xs outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAIBrief}
                  disabled={isAiGenerating}
                  className="rounded-xl bg-amber-900 px-4 py-2 text-xs font-semibold text-white hover:bg-black transition"
                >
                  {isAiGenerating ? "Generating..." : "Generate Brief"}
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Step 1: Campaign Basics
              </h3>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Q3 Growth & AI Automation Campaign"
                  className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black"
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
                  placeholder="e.g. Acme Insight Engine 3.0"
                  className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Campaign Objective
                </label>
                <select
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black bg-white"
                >
                  <option value="Leads">Generate Qualified Leads</option>
                  <option value="Awareness">Brand Awareness & Views</option>
                  <option value="Traffic">Website / Landing Page Traffic</option>
                  <option value="Product Launch">New Feature / Product Launch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Campaign Brief & Messaging
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain your core value proposition and desired talking points for creators..."
                  className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 rounded-full bg-[#17181C] px-6 py-2.5 text-xs font-semibold text-white hover:bg-black/80"
                >
                  Next: Target Audience <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Target Audience */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Step 2: Target Audience Specs
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Target Industry
                </label>
                <input
                  type="text"
                  value={targetIndustry}
                  onChange={(e) => setTargetIndustry(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Target Job Titles & Roles
                </label>
                <input
                  type="text"
                  value={targetRoles}
                  onChange={(e) => setTargetRoles(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Company Size</label>
                  <input
                    type="text"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Geography</label>
                  <input
                    type="text"
                    value={targetLocation}
                    onChange={(e) => setTargetLocation(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full border border-gray-200 px-5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 rounded-full bg-[#17181C] px-6 py-2.5 text-xs font-semibold text-white hover:bg-black/80"
                >
                  Next: Creator Budget <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Budget & Creator Requirements */}
          {step === 3 && (
            <form onSubmit={handleLaunch} className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Step 3: Creator Requirements & Budget
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Total Budget ($)</label>
                  <input
                    type="number"
                    required
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Number of Creators</label>
                  <input
                    type="number"
                    required
                    value={requiredCreators}
                    onChange={(e) => setRequiredCreators(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Required Topics (Comma separated)</label>
                <input
                  type="text"
                  value={topics}
                  onChange={(e) => setTopics(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full border border-gray-200 px-5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-lg disabled:opacity-50"
                >
                  {loading ? "Launching..." : "Launch Campaign"}
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Tracking & Completion */}
          {step === 4 && createdCampaign && (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-black text-gray-900">Campaign Activated!</h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Your campaign <strong>{createdCampaign.name}</strong> is live. Use your dedicated tracking link to monitor clicks and leads.
              </p>

              <div className="mx-auto max-w-md rounded-2xl bg-gray-50 p-4 border border-gray-200 text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Generated Tracking Link</span>
                <div className="mt-1 flex items-center justify-between font-mono text-xs text-gray-900">
                  <span>/track/{createdCampaign.trackingCode}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}/track/${createdCampaign.trackingCode}`)}
                    className="flex items-center gap-1 rounded-md bg-white border border-gray-200 px-2 py-1 text-[10px] font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    <Copy className="h-3 w-3" /> Copy
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <a
                  href="/dashboard/brand"
                  className="rounded-full bg-[#17181C] px-6 py-2.5 text-xs font-semibold text-white hover:bg-black/80 shadow"
                >
                  Go to Brand Dashboard
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
