export type Bid = {
  id: string;
  user: string;
  amount: number;
  timestamp: Date;
  status: "leading" | "outbid";
};

export type AuctionItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  currentBid: number;
  startPrice: number;
  totalBidders: number;
  startTime: string;
  endTime: string;
};

export const MOCK_ITEM: AuctionItem = {
  id: "1",
  title: "Vintage Rolex Submariner",
  description:
    "A pristine 1968 Rolex Submariner ref. 5513 in exceptional condition. Original dial, hands, and bezel insert. Case retains sharp lugs and original finish on most surfaces. Comes with vintage Rolex papers and original bracelet.",
  image: "https://api.dicebear.com/7.x/shapes/svg?seed=rolex",
  currentBid: 14500,
  startPrice: 8000,
  totalBidders: 24,
  startTime: "2026-03-06T10:00:00Z",
  endTime: "2026-03-08T10:00:00Z",
};

export const MOCK_BIDS: Bid[] = [
  { id: "1", user: "alpine_trader", amount: 14500, timestamp: new Date(Date.now() - 12000), status: "leading" },
  { id: "2", user: "nx_collector", amount: 14200, timestamp: new Date(Date.now() - 45000), status: "outbid" },
  { id: "3", user: "swiss_watch_99", amount: 13800, timestamp: new Date(Date.now() - 120000), status: "outbid" },
  { id: "4", user: "alpine_trader", amount: 13500, timestamp: new Date(Date.now() - 200000), status: "outbid" },
  { id: "5", user: "rare_finds_uk", amount: 13000, timestamp: new Date(Date.now() - 350000), status: "outbid" },
  { id: "6", user: "nx_collector", amount: 12500, timestamp: new Date(Date.now() - 500000), status: "outbid" },
  { id: "7", user: "vintage_vault", amount: 11000, timestamp: new Date(Date.now() - 800000), status: "outbid" },
];
