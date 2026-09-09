"use client";

import { useState, useEffect } from "react";
import Navbar from "@/src/frontend/components/Navbar";
import BookingModal from "@/src/frontend/components/BookingModal";
import { creatorsApi } from "@/src/frontend/lib/api";
import { SeedCreator } from "@/src/backend/db/seedData";
import { CheckCircle2, TrendingUp, Eye, MessageSquare, ThumbsUp, ExternalLink, Sparkles, MapPin, ShieldCheck } from "lucide-react";

export default function CreatorProfileView({ username }: { username: string }) {
  const [creator, setCreator] = useState<SeedCreator | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    creatorsApi.getCreatorByUsername(username)
      .then((data) => {
        if (data.success) {
          setCreator(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-gray-600 font-semibold">Creator profile not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col font-sans">
      <Navbar />

      {/* Profile Header Banner */}
      <section className="border-b border-[#E8E6E2] bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl border-2 border-white shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={creator.avatarUrl} alt={creator.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900">{creator.name}</h1>
                  {creator.verified && <CheckCircle2 className="h-5 w-5 text-blue-500 fill-blue-50" />}
                </div>
                <p className="mt-1 text-xs font-semibold text-gray-500 flex items-center gap-2">
                  <span>{creator.category}</span> • <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{creator.location}</span>
                </p>
                <p className="mt-3 text-xs leading-relaxed text-gray-600 max-w-xl">{creator.bio}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href={creator.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-50"
              >
                LinkedIn Profile <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="flex items-center justify-center gap-2 rounded-full bg-[#17181C] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-black/80 shadow-lg"
              >
                Book Creator <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details & Analytics Layout */}
      <section className="flex-1 py-10 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Analytics Stats Grid */}
            <div className="rounded-3xl border border-[#E8E6E2] bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Verified Audience & Engagement Metrics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <span className="text-[11px] font-medium text-gray-400 uppercase">Followers</span>
                  <p className="mt-1 text-xl font-black text-gray-900">{creator.followersCount.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl bg-emerald-50/70 p-4">
                  <span className="text-[11px] font-medium text-emerald-700 uppercase">Engagement</span>
                  <p className="mt-1 text-xl font-black text-emerald-800 flex items-center justify-center gap-1">
                    <TrendingUp className="h-4 w-4" /> {creator.engagementRate}%
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <span className="text-[11px] font-medium text-gray-400 uppercase">Avg Reactions</span>
                  <p className="mt-1 text-xl font-black text-gray-900 flex items-center justify-center gap-1">
                    <ThumbsUp className="h-4 w-4 text-blue-500" /> {creator.avgReactions}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <span className="text-[11px] font-medium text-gray-400 uppercase">Avg Comments</span>
                  <p className="mt-1 text-xl font-black text-gray-900 flex items-center justify-center gap-1">
                    <MessageSquare className="h-4 w-4 text-purple-500" /> {creator.avgComments}
                  </p>
                </div>
              </div>

              {/* Audience Demographics */}
              {creator.audienceData && (
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Top Audience Job Titles</h4>
                  <div className="space-y-2">
                    {creator.audienceData.topJobTitles.map((job) => (
                      <div key={job.title} className="text-xs">
                        <div className="flex justify-between font-medium text-gray-700 mb-1">
                          <span>{job.title}</span>
                          <span>{job.percentage}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                          <div className="h-full bg-black rounded-full" style={{ width: `${job.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sample LinkedIn Posts */}
            {creator.samplePosts && creator.samplePosts.length > 0 && (
              <div className="rounded-3xl border border-[#E8E6E2] bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  Recent LinkedIn Posts
                </h3>
                <div className="space-y-4">
                  {creator.samplePosts.map((post) => (
                    <div key={post.id} className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 text-xs">
                      <p className="whitespace-pre-wrap text-gray-800 leading-relaxed font-normal">{post.content}</p>
                      <div className="mt-3 flex items-center justify-between border-t border-gray-200/60 pt-2 text-[11px] font-medium text-gray-500">
                        <div className="flex gap-4">
                          <span>👍 {post.likes} Reactions</span>
                          <span>💬 {post.comments} Comments</span>
                          <span>🔁 {post.shares} Shares</span>
                        </div>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Booking Card Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-[#E8E6E2] bg-white p-6 shadow-xl sticky top-24">
              <h3 className="text-base font-black text-gray-900 mb-4">Sponsorship Packages</h3>

              <div className="rounded-2xl border border-gray-200 p-4 mb-4">
                <span className="text-xs font-semibold text-gray-500">Single Sponsored Post</span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-gray-900">${creator.pricePerPost}</span>
                  <span className="text-xs text-gray-400">/ post</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-gray-600">
                  <li className="flex items-center gap-1.5">✓ 1x Custom LinkedIn post</li>
                  <li className="flex items-center gap-1.5">✓ Native tracking link included</li>
                  <li className="flex items-center gap-1.5">✓ 1 round of revision</li>
                </ul>
              </div>

              <div className="relative rounded-2xl border-2 border-black bg-gray-50 p-4 mb-6">
                <span className="absolute -top-2.5 right-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                  Best Value
                </span>
                <span className="text-xs font-semibold text-gray-500">3-Post Package Campaign</span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-gray-900">${creator.pricePackage3}</span>
                  <span className="text-xs text-gray-400">/ 3 posts</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-gray-600">
                  <li className="flex items-center gap-1.5">✓ 3x LinkedIn posts over 30 days</li>
                  <li className="flex items-center gap-1.5">✓ Dedicated brand mention tag</li>
                  <li className="flex items-center gap-1.5">✓ Full campaign analytics report</li>
                </ul>
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full rounded-full bg-[#17181C] py-3 text-sm font-bold text-white transition hover:bg-black/80 shadow-lg"
              >
                Book {creator.name.split(" ")[0]} Now
              </button>

              <p className="mt-3 text-center text-[11px] text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Payments held safely in Naano Escrow
              </p>
            </div>
          </aside>
        </div>
      </section>

      <BookingModal
        creator={creator}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={() => {
          setIsBookingOpen(false);
          window.location.href = "/dashboard/brand";
        }}
      />
    </div>
  );
}
