"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MOCK_ITEM, MOCK_BIDS} from "@/components/auction/detail/auctionTypes";
import AuctionItemCard from "@/components/auction/detail/AuctionItemCard";
import AuctionStats from "@/components/auction/detail/AuctionStats";
import AuctionBidBox from "@/components/auction/detail/AuctionBidBox";
import AuctionLiveFeed from "@/components/auction/detail/AuctionLiveFeed";
import axios from "axios"
import { type Auction } from "@/app/dashboard/page";
import { timeStamp } from "console";

export type Bid = {
  id: string;
  user: string;
  amount: number;
  timestamp: Date;
  status: "leading" | "outbid"
}

export default function AuctionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const auctionId = params.id as string;
  const [bids, setBids] = useState<Bid[]>([]);
  const [auction, setAuction] = useState<Auction | null>(null)

  // // Simulate incoming websocket bids
  // useEffect(() => {
  //   const users = ["whale_bidder", "crypto_monk", "anon_buyer", "silent_bid", "fast_fingers"];
  //   const interval = setInterval(() => {
  //     const latestBid = bids[0]?.amount ?? MOCK_ITEM.currentBid;
  //     const newAmount = latestBid + Math.floor(Math.random() * 300 + 100);
  //     const newBid: Bid = {
  //       id: Math.random().toString(36).slice(2),
  //       user: users[Math.floor(Math.random() * users.length)],
  //       amount: newAmount,
  //       timestamp: new Date(),
  //       status: "leading",
  //     };
  //     setBids((prev) => [newBid, ...prev.map((b) => ({ ...b, status: "outbid" as const }))]);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, [bids]);

  useEffect(() => {
    const fetchAuction = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auction/${auctionId}`, 
                { withCredentials: true }
            );
            
            setAuction(response.data.auction);

            if (response.data.bids) {
                const formattedBids: Bid[] = response.data.bids.map((bid: any, index: number) => ({
                    id: bid.id,
                    user: bid.bidder.name,
                    amount: bid.amount,
                    timestamp: bid.createdAt,
                    status: index === 0 ? "leading" : "outbid"
                }));
                
                setBids(formattedBids);
            }
        } catch (error) {
            console.error("error fetching auctions", error);
        }
    }
    fetchAuction();
}, []);

  if (!auction) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center">
        Loading Vault...
      </div>
    );
  }
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
            <AuctionItemCard item={auction} />
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