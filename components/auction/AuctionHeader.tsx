"use client";

import { DM_Serif_Display } from "next/font/google";

const dmSerif = DM_Serif_Display({
    subsets: ["latin"],
    weight: "400",
});

// 1. We tell TypeScript exactly what to expect from the Dashboard
type AuctionHeaderProps = {
    onOpenModal: () => void;
};

// 2. Accept the prop
export default function AuctionHeader({ onOpenModal }: AuctionHeaderProps) {
    return (
        <header className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#867afe] text-xs font-semibold text-white shadow-lg shadow-[0_0_25px_rgba(134,122,254,0.55)]">
                    YB
                </div>
                <span className="text-sm font-semibold text-white">YouBid</span>
            </div>

            <div className="flex items-center gap-8">
                <nav className="hidden items-center gap-6 text-sm text-gray-400 md:flex">
                    <button className="hover:text-white">my bids</button>
                    <button className="hover:text-white">own</button>
                </nav>

                <div className="flex items-center gap-4">
                    
                    {/* 3. The button fires the prop when clicked */}
                    <button
                        onClick={onOpenModal}
                        className={`${dmSerif.className} rounded-lg bg-[#867afe] px-4 py-2 text-sm text-white shadow-lg hover:bg-[#a193ff] transition-colors`}
                    >
                        Add item +
                    </button>

                    <div className="h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-[#101117]">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=ash"
                            alt="avatar"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}