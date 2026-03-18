// "use client";
// import { DM_Serif_Display } from "next/font/google";
// import { Button } from "@/components/ui/button";
// import { Timer, Gavel } from "lucide-react";

// const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400" });

// interface AuctionCardProps {
//     auction: {
//         id: string;
//         title: string;
//         currentBid: number;
//         endTime: string;
//         image: string;
//         category: string;
//         size: string;
//     };
//     }

//     export default function AuctionCard({ auction }: AuctionCardProps) {
//     const updateBid = useAuctionStore((state) => state.updateBid);

//     // Function to handle the "Quick Bid" button
//     const handleQuickBid = (amount: number) => {
//         const newPrice = auction.currentBid + amount;
//         // In the future, this will call your Hono/Redis Lua script
//         updateBid(auction.id, newPrice);
//     };

//     return (
//         <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f1012] transition-all hover:border-[#867afe]/50">
//         {/* Background Image with Overlay */}
//         <img
//             src={auction.image}
//             alt={auction.title}
//             className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent" />

//         {/* Content Container */}
//         <div className="relative flex h-full flex-col justify-end p-5">
//             <div className="mb-2 flex items-center justify-between">
//             <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-400 backdrop-blur-md">
//                 {auction.category}
//             </span>
//             <div className="flex items-center gap-1 text-[10px] text-emerald-400">
//                 <Timer className="h-3 w-3" />
//                 <span>LIVE</span>
//             </div>
//             </div>

//             <h3 className={`${dmSerif.className} line-clamp-1 text-xl text-white`}>
//             {auction.title}
//             </h3>

//             <div className="mt-3 flex items-end justify-between">
//             <div>
//                 <p className="text-[10px] uppercase tracking-widest text-gray-500">Current Bid</p>
//                 <p className="text-2xl font-bold text-white">${auction.currentBid.toLocaleString()}</p>
//             </div>
            
//             {/* Quick Bid Button - Simplified for the Grid */}
//             <Button
//                 onClick={() => handleQuickBid(100)}
//                 className="h-10 w-10 rounded-xl bg-[#867afe] p-0 hover:bg-[#a193ff] shadow-lg shadow-[#867afe]/20"
//             >
//                 <Gavel className="h-5 w-5 text-white" />
//             </Button>
//             </div>

//             {/* This section only shows on larger "Bento" cards */}
//             {auction.size === "large" && (
//             <div className="mt-4 flex gap-2 border-t border-white/5 pt-4">
//                 <Button 
//                 variant="outline" 
//                 className="flex-1 border-white/10 bg-white/5 text-xs hover:bg-white/10"
//                 onClick={() => handleQuickBid(50)}
//                 >
//                 +$50
//                 </Button>
//                 <Button 
//                 variant="outline" 
//                 className="flex-1 border-white/10 bg-white/5 text-xs hover:bg-white/10"
//                 onClick={() => handleQuickBid(500)}
//                 >
//                 +$500
//                 </Button>
//             </div>
//             )}
//         </div>
//         </div>
//     );
// }