"use client";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function AuctionFilters() {
    const [category, setCategory] = useState("all");
    const [timeFilter, setTimeFilter] = useState("today");

    return (
        <div className="rounded-2xl border border-white/10 bg-transparent backdrop-blur-sm px-8 py-6">

            <div className="mb-5 flex items-center gap-2.5">
                <SlidersHorizontal size={18} className="text-gray-400" />
                <h3 className="text-[15px] font-semibold text-white">
                    Refine Your Search
                </h3>
            </div>

            {/* Two-row layout */}
            <div className="flex flex-col gap-4">
                
                {/* First row - Filters */}
                <div className="flex items-center gap-4 text-[13px]">

                    {/* Price Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-medium whitespace-nowrap">Price:</span>
                        
                        <div className="flex items-center gap-1">
                            <input
                                type="number"
                                placeholder="min"
                                className="w-[70px] rounded-lg border border-white/10 bg-[#16171f]/50 px-2 py-1.5 text-[13px] text-white placeholder:text-gray-600 outline-none transition-all focus:border-[#867afe] focus:bg-[#16171f]"
                            />
                            
                            <span className="text-gray-500">—</span>
                            
                            <input
                                type="number"
                                placeholder="max"
                                className="w-[70px] rounded-lg border border-white/10 bg-[#16171f]/50 px-2 py-1.5 text-[13px] text-white placeholder:text-gray-600 outline-none transition-all focus:border-[#867afe] focus:bg-[#16171f]"
                            />
                        </div>
                    </div>

                    <div className="h-5 w-px bg-white/10" />

                    {/* Time Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-medium whitespace-nowrap">Ending:</span>
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="cursor-pointer rounded-lg border border-white/10 bg-[#16171f]/50 px-2.5 py-1.5 text-[13px] text-white outline-none transition-all hover:border-[#867afe]/50 focus:border-[#867afe] focus:bg-[#16171f] w-[140px]"
                        >
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="this-week">This Week</option>
                            <option value="this-month">This Month</option>
                            <option value="1-hour">Within 1h</option>
                            <option value="6-hours">Within 6h</option>
                            <option value="12-hours">Within 12h</option>
                            <option value="24-hours">Within 24h</option>
                        </select>
                    </div>

                    <div className="h-5 w-px bg-white/10" />

                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-medium whitespace-nowrap">Category:</span>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="cursor-pointer rounded-lg border border-white/10 bg-[#16171f]/50 px-2.5 py-1.5 text-[13px] text-white outline-none transition-all hover:border-[#867afe]/50 focus:border-[#867afe] focus:bg-[#16171f] w-[140px]"
                        >
                            <option value="all">All</option>
                            <option value="tech">Tech</option>
                            <option value="car">Car</option>
                            <option value="bike">Bike</option>
                            <option value="art">Art</option>
                        </select>
                    </div>

                </div>

                {/* Second row - Action buttons */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                    <button 
                        onClick={() => {
                            setCategory("all");
                            setTimeFilter("today");
                        }}
                        className="rounded-lg border border-white/10 px-6 py-2 text-[13px] font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white active:scale-95"
                    >
                        Reset
                    </button>

                    <button className="rounded-lg bg-[#867afe] px-6 py-2 text-[13px] font-semibold text-white transition-all hover:bg-[#9c8fff] active:scale-95 shadow-sm">
                        Apply Filters
                    </button>
                </div>

            </div>
        </div>
    );
}