"use client";

type Props = {
  item: {
    title: string;
    description: string;
    image: string;
  };
};

export default function AuctionItemCard({ item }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f1012]">
      <div className="flex h-80 items-center justify-center border-b border-white/[0.06] bg-gradient-to-br from-[#16171f] to-[#1a1b24]">
        <img
          src={item.image}
          alt={item.title}
          className="h-48 w-48 rounded-xl object-cover"
        />
      </div>
      <div className="p-7">
        <h1 className="mb-3 text-3xl font-bold text-white">{item.title}</h1>
        <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
      </div>
    </div>
  );
}
