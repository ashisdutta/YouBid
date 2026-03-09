"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuctionItemCard from "@/components/auction/detail/AuctionItemCard";
import AuctionStats from "@/components/auction/detail/AuctionStats";
import AuctionBidBox from "@/components/auction/detail/AuctionBidBox";
import AuctionLiveFeed from "@/components/auction/detail/AuctionLiveFeed";
import { ArrowLeft } from "lucide-react";

export const MOCK_ITEM = {
  id: "1",
  title: "Vintage Rolex Submariner",
  description:
    "A pristine 1968 Rolex Submariner ref. 5513 in exceptional condition. Original dial, hands, and bezel insert. Case retains sharp lugs and original finish on most surfaces. Comes with vintage Rolex papers and original bracelet.",
  image: "https://api.dicebear.com/7.x/shapes/svg?seed=rolex",
  currentBid: 14500,
  startPrice: 8000,
  totalBidders: 24,
  startTime: "2026-03-06T10:00:00Z",
  endTime: "2026-03-08T10:00:00Z",
};

export type Bid = {
  id: string;
  user: string;
  amount: number;
  timestamp: Date;
  status: "leading" | "outbid";
};

const MOCK_BIDS: Bid[] = [
  { id: "1", user: "alpine_trader", amount: 14500, timestamp: new Date(Date.now() - 12000), status: "leading" },
  { id: "2", user: "nx_collector", amount: 14200, timestamp: new Date(Date.now() - 45000), status: "outbid" },
  { id: "3", user: "swiss_watch_99", amount: 13800, timestamp: new Date(Date.now() - 120000), status: "outbid" },
  { id: "4", user: "alpine_trader", amount: 13500, timestamp: new Date(Date.now() - 200000), status: "outbid" },
  { id: "5", user: "rare_finds_uk", amount: 13000, timestamp: new Date(Date.now() - 350000), status: "outbid" },
  { id: "6", user: "nx_collector", amount: 12500, timestamp: new Date(Date.now() - 500000), status: "outbid" },
  { id: "7", user: "vintage_vault", amount: 11000, timestamp: new Date(Date.now() - 800000), status: "outbid" },
];

export default function AuctionDetailPage() {
  const router = useRouter();
  const [bids, setBids] = useState<Bid[]>(MOCK_BIDS);

  // Simulate incoming websocket bids
  useEffect(() => {
    const users = ["whale_bidder", "crypto_monk", "anon_buyer", "silent_bid", "fast_fingers"];
    const interval = setInterval(() => {
      const latestBid = bids[0]?.amount ?? MOCK_ITEM.currentBid;
      const newAmount = latestBid + Math.floor(Math.random() * 300 + 100);
      const newBid: Bid = {
        id: Math.random().toString(36).slice(2),
        user: users[Math.floor(Math.random() * users.length)],
        amount: newAmount,
        timestamp: new Date(),
        status: "leading",
      };
      setBids((prev) => [newBid, ...prev.map((b) => ({ ...b, status: "outbid" as const }))]);
    }, 4000);
    return () => clearInterval(interval);
  }, [bids]);

  const currentBid = bids[0]?.amount ?? MOCK_ITEM.currentBid;

  const handleNewBid = (amount: number) => {
    const newBid: Bid = {
      id: Math.random().toString(36).slice(2),
      user: "you",
      amount,
      timestamp: new Date(),
      status: "leading",
    };
    setBids((prev) => [newBid, ...prev.map((b) => ({ ...b, status: "outbid" as const }))]);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-[rgba(134,122,254,0.12)] blur-[80px]" />
        <div className="absolute top-[30%] -right-16 h-80 w-80 rounded-full bg-[rgba(134,122,254,0.10)] blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-8">

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 border-none bg-transparent p-0 text-sm text-gray-400 transition-colors hover:text-white cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to auctions
        </button>

        {/* Main 2-col grid */}
        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 420px" }}>

          {/* Left column */}
          <div className="flex flex-col gap-6">
            <AuctionItemCard item={MOCK_ITEM} />
            <AuctionStats item={MOCK_ITEM} />
            <AuctionBidBox
              item={MOCK_ITEM}
              currentBid={currentBid}
              onNewBid={handleNewBid}
            />
          </div>

          {/* Right column */}
          <AuctionLiveFeed
            bids={bids}
            totalWatchers={MOCK_ITEM.totalBidders}
          />

        </div>
      </div>

      <style>{`
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
      `}</style>
    </div>
  );
}
