import { getOrCreateUserId } from "./userId";
import { WsMessageType } from "@/types/ws";
import { getUserName } from "./userProfile";

let socket: WebSocket | null = null;

const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_URL || "wss://lazyspace-back-1.onrender.com";

export function connectSocket(
  onMessage: (data: any) => void
) {
  const userId = getOrCreateUserId();
  const name = getUserName();

  socket = new WebSocket(
    `${WS_BASE_URL}?userId=${userId}&name=${encodeURIComponent(name!)}`
  );

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
    console.log(`${WS_BASE_URL}?userId=${userId}&name=${encodeURIComponent(name!)}`);

    socket?.send(JSON.stringify({
      type: WsMessageType.JOIN_QUEUE
    }));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("❌ WebSocket disconnected");
  };

  socket.onerror = (err) => {
    console.error("WebSocket error", err);
  };
}

export function sendMessage(message: any) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify(message));
  }
