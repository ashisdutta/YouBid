"use client";

import { useEffect, useState } from "react";

import AuctionHeader from "@/components/auction/AuctionHeader";
import AuctionFilters from "@/components/auction/AuctionFilters";
import AuctionsTable from "@/components/auction/AuctionTable";
import { symlink } from "fs";
import axios from "axios";

export interface Auction{
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
    seller?:{
        name: string
    }
}

export default function DashboardPage() {
    //const { auctions, setAuctions } = useAuctionStore();
    const [auctions, setAuctions] = useState<Auction[]>([]);
    //const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auction/active`, {withCredentials: true});
                setAuctions(response.data);
            } catch (error) {
                console.error("error fetching auctions", error);
            }
        }
        fetchAuctions();
    }, []);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3000/ws');

        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'JOIN_DASHBOARD' }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'NEW_AUCTION') {
                // Push the new item from the WS into the array we got from the DB
                setAuctions((prev) => [data.payload, ...prev]);
            }
        };

        return () => ws.close();
    }, []); // Empty array = connect once, close on unmount

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white selection:bg-[#867afe]/30">
        <div className="relative isolate min-h-screen overflow-hidden font-sans">

            <div className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen">
                <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-[rgba(134,122,254,0.15)] blur-3xl" />
                <div className="absolute right-[-5rem] top-20 h-96 w-96 rounded-full bg-[rgba(134,122,254,0.15)] blur-3xl" />
                <div className="absolute inset-x-0 top-32 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-6 sm:px-8 lg:px-10">

                <AuctionHeader />

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
        </div>
    );
}