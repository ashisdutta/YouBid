"use client";
import { Clock, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    auction: {
        id: string;
        title: string;
        image: string;
        currentBid: number;
    };
    };

    export default function AuctionRow({ auction }: Props) {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <tr
        onClick={() => router.push(`/dashboard/auction/${auction.id}`)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer transition-colors duration-200"
        style={{
            backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
        }}
        >
        {/* PHOTO */}
        <td className="px-8 py-2 align-middle">
            <div className="h-8 w-8 overflow-hidden rounded-full border border-white/10 shrink-0">
            <img
                src={auction.image}
                alt={auction.title}
                className="h-full w-full object-cover transition-all duration-300"
                style={{
                filter: isHovered ? 'grayscale(0)' : 'grayscale(1)',
                opacity: isHovered ? 1 : 0.7
                }}
            />
            </div>
        </td>
        
        {/* TITLE */}
        <td className="py-2 pr-4 align-middle">
            <p 
            className="text-[13px] truncate transition-colors"
            style={{ color: isHovered ? 'white' : 'rgb(209, 213, 219)' }}
            >
            {auction.title}
            </p>
        </td>
        
        {/* PRICE */}
        <td className="py-2 text-[13px] font-semibold text-white align-middle">
            ${auction.currentBid.toLocaleString()}
        </td>
        
        {/* END TIME */}
        <td className="py-2 align-middle">
            <div 
            className="flex items-center gap-1.5 text-[12px] transition-colors"
            style={{ color: isHovered ? 'rgb(209, 213, 219)' : 'rgb(156, 163, 175)' }}
            >
            <Clock size={12} />
            + 14h 22m
            </div>
        </td>
        
        {/* ACTIONS */}
        <td className="px-8 py-2 align-middle text-right">
            <div className="relative flex justify-end items-center h-[32px]">
            
            {/* DEFAULT VIEW: '+$100' button */}
            <button
                onClick={(e) => { e.stopPropagation(); }}
                className="rounded-md px-3 py-1 text-[12px] font-medium text-gray-500 transition hover:text-[#867afe]"
                style={{
                opacity: isHovered ? 0 : 1,
                visibility: isHovered ? 'hidden' : 'visible',
                transition: 'opacity 0.3s, visibility 0.3s'
                }}
            >
                + $100
            </button>
            <div 
                className="absolute right-0 flex items-center overflow-hidden rounded-lg shadow-lg border border-white/10"
                style={{
                    opacity: isHovered ? 1 : 0,
                    visibility: isHovered ? 'visible' : 'hidden',
                    transition: 'opacity 0.3s, visibility 0.3s',
                    backgroundColor: '#1a1b21'
                }}
            >
                <button
                    onClick={(e) => { 
                        e.stopPropagation();
                        // Place bid logic here
                    }}
                    style={{ backgroundColor: '#867afe' }}
                    className="px-6 py-2 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#9c8fff] active:scale-95"
                >
                    Bid
                </button>
                <button
                    onClick={(e) => { 
                        e.stopPropagation();
                        // Save/bookmark logic here
                    }}
                    className="flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-95"
                    style={{ width: '70px', height: '36px' }}
                >
                    <Bookmark size={15} strokeWidth={3} />
                </button>
            </div>
            </div>
        </td>
        </tr>
    );
}