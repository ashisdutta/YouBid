"use client";
import { getWebSocketUrl } from "@/lib/socket";
import { useEffect, useState } from "react";
import axios from "axios";

import AuctionHeader from "@/components/auction/AuctionHeader";
import AuctionFilters from "@/components/auction/AuctionFilters";
import AuctionsTable from "@/components/auction/AuctionTable";
import AddAuctionModal from "@/components/auction/AddAuctionModal";

export interface Auction {
    id: string;
    title: string;
    description: string;
    photo: string[];
    startPrice: number;
    currentPrice: number;
    startTime?: string | null;
    endTime: string;
    status: string;
    sellerId: string;
    winnerId?: string | null;
    seller?: {
        name: string
    }
}

export default function DashboardPage() {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    
    // 2. We manage the Modal state from the Dashboard now
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 3. Moved fetchAuctions OUTSIDE the useEffect so the Modal can trigger it!
    const fetchAuctions = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auction/active`, 
                { withCredentials: true }
            );
            setAuctions(response.data);
        } catch (error) {
            console.error("error fetching auctions", error);
        }
    }

    // Initial load
    useEffect(() => {
        fetchAuctions();
    }, []);

    // WebSocket
    useEffect(() => {
        let ws: WebSocket | null = null;
        let isMounted = true;

        const connect = () => {
            const wsUrl = getWebSocketUrl();
            ws = new WebSocket(wsUrl);

            ws.onopen = () => {
                if (!isMounted) return ws?.close();
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ type: 'JOIN_DASHBOARD' }));
                }
            };

            ws.onmessage = (event) => {
                if (!isMounted) return;
                const data = JSON.parse(event.data);
                if (data.type === 'NEW_AUCTION') {
                    console.log("✅ New auction via WebSocket:", data.payload.title);
                    setAuctions((prev) => [data.payload, ...prev]);
                }
            };
            ws.onclose = () => {
                console.log("🔌 Dashboard WS closed");
            };
        };

        connect();

        return () => {
            isMounted = false;
            if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
                ws.close();
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white selection:bg-[#867afe]/30">
            <div className="relative isolate min-h-screen overflow-hidden font-sans">
                <div className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen">
                    <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[rgba(134,122,254,0.15)] blur-3xl" />
                    <div className="absolute right-[-5rem] top-20 h-96 w-96 rounded-full bg-[rgba(134,122,254,0.15)] blur-3xl" />
                    <div className="absolute inset-x-0 top-32 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-6 sm:px-8 lg:px-10">
                    <AuctionHeader onOpenModal={() => setIsModalOpen(true)} />

                    <main className="mt-12 flex flex-col">
                        <div style={{ marginTop: '50px' }}>
                            <AuctionFilters />
                        </div>
                        <div style={{ marginTop: '50px' }}>
                            <AuctionsTable auctions={auctions} />
                        </div>
                    </main>
                </div>
            </div>
            <AddAuctionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => fetchAuctions()} 
            />
        </div>
    );
}