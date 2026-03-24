"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import AuctionItemCard from "@/components/auction/detail/AuctionItemCard";
import AuctionStats from "@/components/auction/detail/AuctionStats";
import AuctionBidBox from "@/components/auction/detail/AuctionBidBox";
import AuctionLiveFeed from "@/components/auction/detail/AuctionLiveFeed";
import { type Auction } from "@/app/dashboard/page";

export type Bid = {
  id: string;
  user: string;
  amount: number;
  timestamp: Date;
  status: "leading" | "outbid";
};

export default function AuctionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const auctionId = params.id as string;
  
  const [bids, setBids] = useState<Bid[]>([]);
  const [auction, setAuction] = useState<Auction | null>(null);
  const [watchers, setWatchers] = useState(0);

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
        console.error("Error fetching auction", error);
      }
    };
    if (auctionId) fetchAuction();
  }, [auctionId]);

  useEffect(() => {
    if (!auctionId) return;

    let ws: WebSocket;
    let reconnectTimer: NodeJS.Timeout;
    let isMounted = true;

    const connect = () => {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/ws';
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        if (!isMounted) return ws.close();
        ws.send(JSON.stringify({ type: 'JOIN_AUCTION', auctionId }));
      };

      ws.onmessage = (event) => {
        if (!isMounted) return;
        const data = JSON.parse(event.data);

        if (data.newPrice) {
          const incomingBid: Bid = {
            id: Math.random().toString(36).slice(2), 
            user: data.bidderId, 
            amount: data.newPrice,
            timestamp: new Date(data.timestamp),
            status: "leading",
          };
          // Remove optimistic bid ("you") if WS confirms the same amount
          setBids((prev) => [
            incomingBid,
            ...prev
              .filter((b) => !(b.user === "you" && b.amount === data.newPrice)) // ← remove optimistic
              .map((b) => ({ ...b, status: "outbid" as const }))
          ]);
          setAuction((prev) => prev ? { ...prev, currentPrice: data.newPrice } : null);
        }

        if (data.type === 'WATCHERS_UPDATE') {
          setWatchers(data.count);
        }
      };

      // Auto-reconnect on drop
      ws.onclose = () => {
        if (!isMounted) return;
        console.log("🔌 WS dropped, reconnecting in 3s...");
        reconnectTimer = setTimeout(connect, 3000);
      };

      ws.onerror = () => ws.close(); // triggers onclose → reconnect
    };

    connect();

    return () => {
      isMounted = false;
      clearTimeout(reconnectTimer);
      ws?.close();
    };
  }, [auctionId]);

  const handleNewBid = async (amount: number) => {
    // Show bid instantly before server confirms
    const optimisticId = Math.random().toString(36).slice(2);
    const optimisticBid: Bid = {
      id: optimisticId,
      user: "you",
      amount,
      timestamp: new Date(),
      status: "leading",
    };

    setBids((prev) => [
      optimisticBid,
      ...prev.map((b) => ({ ...b, status: "outbid" as const }))
    ]);
    setAuction((prev) => prev ? { ...prev, currentPrice: amount } : null);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auction/${auctionId}/bid`, 
        { amount }, 
        { withCredentials: true }
      );
      // WS will replace the optimistic bid with real data
    } catch (error: any) {
      // Roll back optimistic update on failure
      setBids((prev) => prev.filter((b) => b.id !== optimisticId));
      setAuction((prev) => prev ? { ...prev, currentPrice: bids[0]?.amount ?? prev.currentPrice } : null);
      const errorMessage = error.response?.data?.error || "Bid failed. Please try again.";
      throw new Error(errorMessage);
    }
  };

  if (!auction) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center">
        Loading Vault...
      </div>
    );
  }

  const currentBid = bids[0]?.amount ?? auction.currentPrice;

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-[rgba(134,122,254,0.12)] blur-[80px]" />
        <div className="absolute top-[30%] -right-16 h-80 w-80 rounded-full bg-[rgba(134,122,254,0.10)] blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-8">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 border-none bg-transparent p-0 text-sm text-gray-400 transition-colors hover:text-white cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to auctions
        </button>

        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 420px" }}>
          <div className="flex flex-col gap-6">
            <AuctionItemCard item={auction} />
            <AuctionStats item={auction} totalBids={bids.length} />
            <AuctionBidBox
              item={auction}
              currentBid={currentBid}
              onNewBid={handleNewBid}
            />
          </div>

          <AuctionLiveFeed
            bids={bids}
            totalWatchers={watchers} 
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