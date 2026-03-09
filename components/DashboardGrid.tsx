"use client";
import { useEffect } from "react";
import { useAuctionStore } from "@/store/useAuctionStore";
import { MOCK_AUCTIONS } from "@/store/mockData";
import AuctionCard from "./AuctionCard";

export default function DashboardGrid() {
    const { auctions, setAuctions } = useAuctionStore();

    useEffect(() => {
        // Initializing the store with our mock data
        setAuctions(MOCK_AUCTIONS);
    }, [setAuctions]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {auctions.map((auction) => {
            // Logic to determine grid spans based on size
            const spanClass = 
            auction.size === "large" ? "md:col-span-2 md:row-span-2" :
            auction.size === "wide" ? "md:col-span-2 md:row-span-1" :
            auction.size === "tall" ? "md:col-span-1 md:row-span-2" :
            "md:col-span-1 md:row-span-1";

            return (
            <div key={auction.id} className={`${spanClass}`}>
                <AuctionCard auction={auction} />
            </div>
            );
        })}
        </div>
    );
}