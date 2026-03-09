"use client";

import { useEffect } from "react";
import { useAuctionStore } from "@/store/useAuctionStore";
import { MOCK_AUCTIONS } from "@/store/mockData";

import AuctionHeader from "@/components/auction/AuctionHeader";
import AuctionFilters from "@/components/auction/AuctionFilters";
import AuctionsTable from "@/components/auction/AuctionTable";

export default function DashboardPage() {
    const { auctions, setAuctions } = useAuctionStore();

    useEffect(() => {
        setAuctions(MOCK_AUCTIONS);
    }, [setAuctions]);

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white selection:bg-[#867afe]/30">
        <div className="relative isolate min-h-screen overflow-hidden font-sans">

            <div className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen">
                <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[rgba(134,122,254,0.15)] blur-3xl" />
                <div className="absolute right-[-5rem] top-20 h-96 w-96 rounded-full bg-[rgba(134,122,254,0.15)] blur-3xl" />
                <div className="absolute inset-x-0 top-32 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-6 sm:px-8 lg:px-10">

                <AuctionHeader />

                <main className="mt-12 flex flex-col">
                    <div style={{ marginTop: '50px' }}>
                        <AuctionFilters />
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        <AuctionsTable auctions={auctions} />
                    </div>
                </main>

            </div>
        </div>
        </div>
    );
}