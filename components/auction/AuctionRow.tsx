"use client";
import { Clock, Bookmark, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { type Auction } from "@/app/dashboard/page"; 

type Props = {
    auction: Auction;
};

export default function AuctionRow({ auction }: Props) {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [timeLeft, setTimeLeft] = useState<string>("Calculating...");
    const [bookmark, setBookmark] = useState(false)

    useEffect(() => {
        const updateTimer = () => {
            const totalMilliseconds = new Date(auction.endTime).getTime() - Date.now();

            if (totalMilliseconds <= 0) {
                setTimeLeft("Ended");
                return;
            }

            const days = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
            const hours = Math.floor((totalMilliseconds / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((totalMilliseconds / 1000 / 60) % 60);
            const seconds = Math.floor((totalMilliseconds / 1000) % 60);

            if (days > 0) {
                setTimeLeft(`${days}d ${hours}h`);
            } else if (hours > 0) {
                setTimeLeft(`${hours}h ${minutes}m`);
            } else {
                setTimeLeft(`${minutes}m ${seconds}s`);
            }
        };

        updateTimer();

        const timerId = setInterval(updateTimer, 1000);
        // Cleanup: Stop the timer if the user leaves the page or the component unmounts
        return () => clearInterval(timerId);
    }, [auction.endTime]);

    return (
        <tr
            onClick={() => router.push(`/auction/${auction.id}`)}
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
                        src={auction.photo && auction.photo.length > 0 ? auction.photo[0] : "/auction-icon.jpg"}
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
                ${auction.currentPrice.toLocaleString()}
            </td>
            
            {/* END TIME */}
            <td className="py-2 align-middle">
                <div 
                    className="flex items-center gap-1.5 text-[12px] transition-colors"
                    // If the text says "Ended", we turn it red. Otherwise, keep your original colors.
                    style={{ color: timeLeft === "Ended" ? '#ef4444' : (isHovered ? 'rgb(209, 213, 219)' : 'rgb(156, 163, 175)') }}
                >
                    <Clock size={12} />
                    {/* 3. Inject the live ticking state here! */}
                    {timeLeft !== "Ended" && "+ "} {timeLeft}
                </div>
            </td>
            
            {/* ACTIONS */}
            <td className="px-8 py-2 align-middle text-right">
                <div className="relative flex justify-end items-center h-[32px]">
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
                                router.push(`/auction/${auction.id}`)
                                // Place bid logic
                            }
                        }
                            // Disabled style if the auction ended
                            disabled={timeLeft === "Ended"}
                            style={{ backgroundColor: timeLeft === "Ended" ? '#4b5563' : '#867afe' }}
                            className={`px-6 py-2 text-[13px] font-semibold text-white transition-all duration-200 ${timeLeft !== "Ended" ? 'hover:bg-[#9c8fff] active:scale-95' : 'cursor-not-allowed opacity-50'}`}
                        >
                            {timeLeft === "Ended" ? "Closed" : "Bid"}
                        </button>
                        <button
                            onClick={(e) => { 
                                e.stopPropagation();
                                setBookmark(!bookmark)
                                // TODO later: Send API request to backend to save to database
                            }}
                            //className="flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-95 "
                            className={`flex items-center justify-center transition-all duration-200 hover:bg-white/10 active:scale-95 ${bookmark ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            style={{ width: '70px', height: '36px' }}
                        >
                            <Bookmark size={15} strokeWidth={3} fill={bookmark ? "currentColor" : "none"}/>
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    );
}