import { create } from 'zustand';

export interface Auction {
    id: string;
    title: string;
    currentBid: number;
    endTime: string;
    image: string;
    category: string;
    size: 'small' | 'wide' | 'tall' | 'large';
}


interface AuctionState {
    auctions: Auction[];
    // Sets the full list (used for the initial Hono REST API call)
    setAuctions: (auctions: Auction[]) => void;
    // Updates a single price (used for real-time Redis/WebSocket updates)
    updateBid: (id: string, newPrice: number) => void;
    }

    export const useAuctionStore = create<AuctionState>((set) => ({
    auctions: [],
    
    setAuctions: (auctions) => set({ auctions }),

    updateBid: (id, newPrice) => set((state) => ({
        auctions: state.auctions.map((auction) => 
        auction.id === id ? { ...auction, currentBid: newPrice } : auction
        ),
    })),
}));
