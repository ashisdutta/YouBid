// Import the Auction interface so TypeScript knows the rules
import { Auction } from "./useAuctionStore";

export const MOCK_AUCTIONS: Auction[] = [
    {
        id: "1",
        title: "Vintage Rolex Submariner",
        currentBid: 14500,
        endTime: "2026-03-06T18:00:00Z",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
        category: "Luxury",
        size: "large", // Strictly typed to "large"
    },
    {
        id: "2",
        title: "MacBook Pro M3 Max",
        currentBid: 3200,
        endTime: "2026-03-05T22:30:00Z",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        category: "Tech",
        size: "small",
    },
    {
        id: "3",
        title: "Abstract Oil Painting",
        currentBid: 850,
        endTime: "2026-03-07T12:00:00Z",
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
        category: "Art",
        size: "wide",
    },
    {
        id: "4",
        title: "Tesla Model S Plaid",
        currentBid: 89000,
        endTime: "2026-03-10T15:45:00Z",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
        category: "Automotive",
        size: "tall",
    },
    {
        id: "5",
        title: "Limited Edition Sneakers",
        currentBid: 1200,
        endTime: "2026-03-05T20:00:00Z",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3",
        category: "Fashion",
        size: "small",
    },
    {
        id: "6",
        title: "Smart Home Hub Setup",
        currentBid: 450,
        endTime: "2026-03-06T09:00:00Z",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827",
        category: "Tech",
        size: "small",
    },
    {
        id: "7",
        title: "Bose Ultra Headphones",
        currentBid: 350,
        endTime: "2026-03-05T23:59:00Z",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        category: "Tech",
        size: "wide",
    },
    {
        id: "8",
        title: "Gaming Desktop RTX 5090",
        currentBid: 4200,
        endTime: "2026-03-08T14:20:00Z",
        image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b",
        category: "Tech",
        size: "small",
    }
];