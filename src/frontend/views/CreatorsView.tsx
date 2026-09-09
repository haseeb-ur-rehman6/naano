"use client";

import { useState, useEffect } from "react";
import Navbar from "@/src/frontend/components/Navbar";
import CreatorCard from "@/src/frontend/components/CreatorCard";
import BookingModal from "@/src/frontend/components/BookingModal";
import { creatorsApi } from "@/src/frontend/lib/api";
import { SeedCreator } from "@/src/backend/db/seedData";
import { Search, SlidersHorizontal, CheckCircle, RefreshCw } from "lucide-react";

export default function CreatorsView() {
  const [creators, setCreators] = useState<SeedCreator[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minFollowers, setMinFollowers] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [selectedLocation, setSelectedLocation] = useState("All");

  // Booking Modal State
  const [selectedCreator, setSelectedCreator] = useState<SeedCreator | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const data = await creatorsApi.getCreators({
        search,
        category: selectedCategory,
        minFollowers,
        maxPrice,
        location: selectedLocation
      });
      if (data.success) {
        setCreators(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, [search, selectedCategory, minFollowers, maxPrice, selectedLocation]);

  const categories = ["All", "SaaS & B2B Tech", "Marketing & Sales", "Finance & Fintech", "AI & Engineering"];

  const handleBookClick = (creator: SeedCreator) => {
    setSelectedCreator(creator);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex flex-col font-sans">
      <Navbar />

      {/* Page Header */}
      <section className="border-b border-[#E8E6E2] bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-200/60 mb-3">
                <CheckCircle className="h-3.5 w-3.5 text-amber-600" /> 100% Verified LinkedIn Leaders
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Discover & Book Top B2B Creators
              </h1>
              <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                Connect directly with tech executives, SaaS founders, and key opinion leaders for targeted sponsored LinkedIn posts.
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, topic, or keyword..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-xs font-medium outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="flex-1 py-8 px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <aside className="h-fit rounded-3xl border border-[#E8E6E2] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gray-700" />
                <h3 className="font-bold text-gray-900 text-sm">Filter Creators</h3>
              </div>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setMinFollowers(0);
                  setMaxPrice(3000);
                  setSelectedLocation("All");
                }}
                className="text-[11px] font-semibold text-gray-400 hover:text-black flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Category
              </label>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                      selectedCategory === cat
                        ? "bg-[#17181C] text-white font-semibold shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Min Followers Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-gray-700 mb-2">
                <span>Min Followers</span>
                <span className="text-amber-700 font-bold">{(minFollowers / 1000).toFixed(0)}k+</span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={minFollowers}
                onChange={(e) => setMinFollowers(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Max Price Slider */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-gray-700 mb-2">
                <span>Max Starting Price</span>
                <span className="text-emerald-700 font-bold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="200"
                max="3000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>
          </aside>

          {/* Creators Grid */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-500">
                Showing {creators.length} verified creators
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-80 rounded-3xl bg-gray-200/60 animate-pulse" />
                ))}
              </div>
            ) : creators.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creators.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} onBookClick={handleBookClick} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-gray-300 p-12 text-center bg-white">
                <p className="text-sm font-semibold text-gray-700">No creators found matching filters.</p>
                <p className="mt-1 text-xs text-gray-500">Try adjusting your follower count or price filter.</p>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        creator={selectedCreator}
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
