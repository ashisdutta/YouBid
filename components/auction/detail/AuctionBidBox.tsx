"use client";

import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

type Props = {
  item: {
    endTime: string;
  };
  currentBid: number;
  onNewBid: (amount: number) => void;
};

function formatCountdown(endTime: string): string {
  const diff = Math.max(0, new Date(endTime).getTime() - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function AuctionBidBox({ item, currentBid, onNewBid }: Props) {
  const [bidAmount, setBidAmount] = useState("");
  const [countdown, setCountdown] = useState(formatCountdown(item.endTime));
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [bidError, setBidError] = useState("");
  const [bidSuccess, setBidSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(formatCountdown(item.endTime)), 1000);
    return () => clearInterval(interval);
  }, [item.endTime]);

  const minBid = currentBid + 1;

  const handlePlaceBid = async () => {
    setBidError("");
    const amount = parseFloat(bidAmount);
    if (!bidAmount || isNaN(amount)) { setBidError("Enter a valid amount"); return; }
    if (amount <= currentBid) { setBidError(`Bid must be higher than $${currentBid.toLocaleString()}`); return; }
    setIsPlacingBid(true);
    await new Promise((r) => setTimeout(r, 800));
    onNewBid(amount);
    setBidAmount("");
    setBidSuccess(true);
    setIsPlacingBid(false);
    setTimeout(() => setBidSuccess(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-[#867afe]/20 bg-[#0f1012] p-7">

      {/* Current bid + countdown */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mb-1 text-xs text-gray-500">Current Bid</div>
          <div className="text-4xl font-extrabold text-[#867afe]">${currentBid.toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="mb-1 text-xs text-gray-500">Ends in</div>
          <div className="font-mono text-2xl font-bold tabular-nums text-white">{mounted ? countdown : "--:--:--"}</div>
        </div>
      </div>

      {bidSuccess && (
        <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          ✓ Bid placed successfully! You are the highest bidder.
        </div>
      )}

      {bidError && (
        <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {bidError}
        </div>
      )}

      {/* Input + button */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-semibold text-gray-500">$</span>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => { setBidAmount(e.target.value); setBidError(""); }}
            placeholder={String(minBid)}
            min={minBid}
            className="w-full rounded-xl border border-white/10 bg-[#16171f]/80 py-3.5 pl-8 pr-4 text-base text-white outline-none placeholder:text-gray-600 focus:border-[#867afe]"
          />
        </div>
        <button
          onClick={handlePlaceBid}
          disabled={isPlacingBid}
          className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border-none bg-[#867afe] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#9c8fff] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Zap size={15} />
          {isPlacingBid ? "Placing..." : "Place Bid"}
        </button>
      </div>

      {/* Quick bid buttons */}
      <div className="mt-3 grid grid-cols-4 gap-2">
        {[100, 500, 1000, 5000].map((inc) => (
          <button
            key={inc}
            onClick={() => setBidAmount(String(currentBid + inc))}
            className="cursor-pointer rounded-lg border border-white/[0.08] bg-white/[0.02] py-2 text-xs text-gray-400 transition-all hover:border-[#867afe]/40 hover:text-[#867afe]"
          >
            +${inc >= 1000 ? `${inc / 1000}k` : inc}
          </button>
        ))}
      </div>

    </div>
  );
}
