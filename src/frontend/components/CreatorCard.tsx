"use client";

import Link from "next/link";
import { CheckCircle2, TrendingUp, Eye, DollarSign, ExternalLink, Calendar } from "lucide-react";
import { SeedCreator } from "@/src/backend/db/seedData";

interface CreatorCardProps {
  creator: SeedCreator;
  onBookClick?: (creator: SeedCreator) => void;
}

export default function CreatorCard({ creator, onBookClick }: CreatorCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-[#E8E6E2] bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-gray-300">
      <div>
        {/* Header with image and verified badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-gray-100 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={creator.avatarUrl}
                alt={creator.name}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/creator/${creator.username}`}
                  className="font-bold text-gray-900 text-base transition hover:text-amber-600"
                >
                  {creator.name}
                </Link>
                {creator.verified && <CheckCircle2 className="h-4 w-4 text-blue-500 fill-blue-50" />}
              </div>
              <span className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700 mt-1">
                {creator.category}
              </span>
            </div>
          </div>

          <a
            href={creator.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
            title="View LinkedIn Profile"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Bio */}
        <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-gray-600">{creator.bio}</p>

        {/* Key Metrics Grid */}
        <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-[#F8F7F5] p-3 text-center">
          <div>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Followers</span>
            <p className="mt-0.5 text-sm font-bold text-gray-900">
              {(creator.followersCount / 1000).toFixed(1)}k
            </p>
          </div>
          <div>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Engagement</span>
            <p className="mt-0.5 text-sm font-bold text-emerald-600 flex items-center justify-center gap-0.5">
              <TrendingUp className="h-3 w-3" />
              {creator.engagementRate}%
            </p>
          </div>
          <div>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Avg Views</span>
            <p className="mt-0.5 text-sm font-bold text-gray-900 flex items-center justify-center gap-0.5">
              <Eye className="h-3 w-3 text-gray-400" />
              {(creator.avgViews / 1000).toFixed(1)}k
            </p>
          </div>
        </div>

        {/* Topic Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {creator.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-600">
              #{topic}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Price & Booking CTA */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <span className="text-[11px] font-medium text-gray-400">Starting at</span>
          <p className="text-lg font-black text-gray-900">${creator.pricePerPost}</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/creator/${creator.username}`}
            className="rounded-full border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Profile
          </Link>

          <button
            onClick={() => onBookClick && onBookClick(creator)}
            className="rounded-full bg-[#17181C] px-4 py-2 text-xs font-semibold text-white transition hover:bg-black/80 shadow-md"
          >
            Book Creator
          </button>
        </div>
      </div>
    </div>
  );
}
