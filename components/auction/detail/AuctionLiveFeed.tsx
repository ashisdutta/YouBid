"use client";

import { useEffect, useRef, useState } from "react";
import { Users } from "lucide-react";

type Bid = {
  id: string;
  user: string;
  amount: number;
  timestamp: Date;
  status: "leading" | "outbid";
};

type Props = {
  bids: Bid[];
  totalWatchers: number;
};

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function AuctionLiveFeed({ bids, totalWatchers }: Props) {
  const feedRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = 0;
  }, [bids.length]);

  return (
    <div
      className="sticky top-6 flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0d0f]"
      style={{ height: "calc(100vh - 110px)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#0f1012] px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white">Live Bids</span>
        </div>
        <span className="font-mono text-xs text-gray-600">{bids.length} events</span>
      </div>

      {/* Feed */}
      <div ref={feedRef} className="min-h-0 flex-1 overflow-y-auto">
        {bids.map((bid, index) => (
          <div
            key={bid.id}
            className={`flex items-center gap-3 border-b border-white/[0.04] px-6 py-3 transition-colors ${index === 0 ? "bg-[#867afe]/[0.05]" : ""}`}
          >
            <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${bid.status === "leading" ? "bg-emerald-500" : "bg-white/15"}`} />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between">
                <span className={`font-mono text-[13px] ${bid.user === "you" ? "font-semibold text-[#867afe]" : bid.status === "leading" ? "font-semibold text-white" : "text-gray-300"}`}>
                  {bid.user === "you" ? "you ←" : bid.user}
                </span>
                <span className={`rounded border px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider ${
                  bid.status === "leading"
                    ? "border-emerald-500/25 bg-emerald-500/15 text-emerald-400"
                    : "border-red-500/20 bg-red-500/10 text-red-400"
                }`}>
                  {bid.status === "leading" ? "LEAD" : "OUTBID"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-[15px] font-bold ${bid.status === "leading" ? "text-white" : "text-gray-500"}`}>
                  ${bid.amount.toLocaleString()}
                </span>
                <span className="font-mono text-[11px] text-gray-600">{mounted ? timeAgo(bid.timestamp) : "just now"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#0f1012] px-6 py-3.5">
        <span className="font-mono text-[11px] text-gray-700">connected via ws://</span>
        <div className="flex items-center gap-1.5">
          <Users size={11} className="text-gray-600" />
          <span className="font-mono text-[11px] text-gray-600">{totalWatchers} watching</span>
        </div>
      </div>
    </div>
  );
}
