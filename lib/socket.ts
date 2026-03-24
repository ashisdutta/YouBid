export const getWebSocketUrl = () => {
    if (typeof window === "undefined") {
        return ""; 
    }

    const isLocal = 
        window.location.hostname === "localhost" || 
        window.location.hostname === "127.0.0.1";

    return isLocal 
        ? "ws://localhost:3000/ws" 
        : "wss://api.youbid.eradev.xyz/ws";
};