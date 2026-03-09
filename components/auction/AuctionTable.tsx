
"use client";

import AuctionRow from "./AuctionRow";
import { DM_Serif_Display } from "next/font/google";

const dmSerif = DM_Serif_Display({
    subsets: ["latin"],
    weight: "400",
});

export default function AuctionsTable({ auctions }: any) {
    return (
        <div className="bg-transparent p-8 shadow-xl">

            <div className="mb-8 flex items-center gap-3">

                <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-emerald-500/50">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>

                <h2 className={`${dmSerif.className} text-3xl text-white`}>
                    live auctions
                </h2>

            </div>

            <div className="overflow-hidden rounded-2xl bg-transparent border border-white/10">

                <table className="w-full text-left border-collapse">

                    <thead className="h-12 bg-[#867afe]">
                        <tr className="border-b border-white/10 text-xs text-black-500 uppercase">
                            <th className="w-[80px] px-8 py-5">photo</th>
                            <th className="py-5">title</th>
                            <th className="w-[140px] py-5">current price</th>
                            <th className="w-[140px] py-5">end time</th>
                            <th className="w-[160px] px-8 py-5 text-right">current bid</th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-white/5">
                        {auctions.map((auction: any) => (
                            <AuctionRow key={auction.id} auction={auction} />
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}