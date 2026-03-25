# 🎨 YouBid Frontend - Distributed Auction System

The user-facing application for the YouBid Distributed Auction System. Built with Next.js, this frontend is engineered to handle real-time WebSocket streams, optimistic UI updates, and high-frequency bidding without layout shift or lag.

## ✨ Key Frontend Features

* **⚡ Real-Time WebSocket Integration:** Connects directly to the Redis Pub/Sub backend to broadcast new bids and watcher counts instantly to all connected clients.
* **🧠 Optimistic UI Updates:** When a user places a bid, the UI updates instantly before the server confirms, creating a zero-latency feel. If the server rejects the bid (e.g., race condition lost), the UI gracefully rolls back.
* **🛡️ Connection Resiliency:** Custom WebSocket utility includes auto-reconnection logic and automatic environment switching (Localhost vs. Production WSS).
* **📱 Responsive & Modern UI:** Built with Tailwind CSS, featuring glassmorphism effects, live feed animations, and mobile-first responsive design.
* **🔐 Secure Auth Handling:** Seamlessly passes HTTP-only cookies (withCredentials) to the backend for secure, stateless authentication.

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Data Fetching:** Axios (REST) & Native WebSockets (Real-time)
* **Package Manager:** pnpm

Here is a look at the real-time auction interface and the responsive dashboard:

### Live Bidding Dashboard
*(Shows the active WebSocket feed and real-time price updates)*
![Dashboard View](https://github.com/ashisdutta/distributed-auction-system/blob/054125ad4430182e553dc55a92905873a16b03b4/photos/Screenshot%202026-03-25%20at%204.33.34%E2%80%AFPM.png)

### Create Auction Modal
*(Shows the intuitive UI for creating a new auction listing)*
![Create Auction](https://github.com/ashisdutta/distributed-auction-system/blob/054125ad4430182e553dc55a92905873a16b03b4/photos/Screenshot%202026-03-25%20at%204.03.47%E2%80%AFPM.png)

## ✨ Key Frontend Features
*(... the rest of the README continues here ...)*
## 📂 Project Structure

```text
frontend/
├── src/
│   ├── app/                 # Next.js App Router (Pages & Layouts)
│   │   ├── dashboard/       # Main auction feed and creation modal
│   │   └── auction/[id]/    # Dynamic route for individual live auctions
│   ├── components/          # Reusable UI components (Cards, Modals, Feed)
│   └── lib/                 # Utility functions
│       └── socket.ts        # Environment-aware WebSocket connection helper
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind theme and custom animations
└── package.json



