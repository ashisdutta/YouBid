"use client";

import { Clock, Users, TrendingUp } from "lucide-react";

type Props = {
  item: {
    startPrice: number;
    totalBidders: number;
    startTime: string;
  };
};

export default function AuctionStats({ item }: Props) {
  const stats = [
    {
      icon: <TrendingUp size={14} />,
      label: "Starting Price",
      value: `$${item.startPrice.toLocaleString()}`,
    },
    {
      icon: <Users size={14} />,
      label: "Total Bidders",
      value: String(item.totalBidders),
    },
    {
      icon: <Clock size={14} />,
      label: "Started",
      value: new Date(item.startTime).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-xl border border-white/[0.08] bg-[#0f1012] p-5">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
            {stat.icon}
            {stat.label}
          </div>
          <div className="text-lg font-bold text-white">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
