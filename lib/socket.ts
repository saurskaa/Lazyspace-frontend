import { getOrCreateUserId } from "./userId";
import { WsMessageType } from "@/types/ws";
import { getUserName } from "./userProfile";
import { AppConst } from "@/constants/AppConstants";


let socket: WebSocket | null = null;
const pendingMessages: any[] = [];


const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_URL || AppConst.NEXT_PUBLIC_WS_URL;
// process.env.NEXT_PUBLIC_WS_URL || "ws://10.105.152.199:3000";

let reconnectAttempts = 0;
let reconnectTimer: NodeJS.Timeout | null = null;

let messageHandler: ((msg: any) => void) | null = null;
let statusHandler: ((status: "connected" | "reconnecting" | "disconnected") => void) | undefined;


export function connectSocket(
  onMessage: (data: any) => void,
  onStatusChange?: (status: "connected" | "reconnecting" | "disconnected") => void
) {
  messageHandler = onMessage;
  statusHandler = onStatusChange;

  connect();
}


function connect() {
  const userId = getOrCreateUserId();
  const name = getUserName();

  socket = new WebSocket(
    `${WS_BASE_URL}?userId=${userId}&name=${encodeURIComponent(name!)}`
  );

  socket.onopen = () => {

    reconnectAttempts = 0;

    statusHandler?.("connected");

    console.log("✅ WebSocket connected");
    console.log(`${WS_BASE_URL}?userId=${userId}&name=${encodeURIComponent(name!)}`);


    while (pendingMessages.length > 0) {
      const msg = pendingMessages.shift();
      console.log(`pending messages : ${pendingMessages}`);
      socket!.send(JSON.stringify(msg));
    }
  };



  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    messageHandler?.(data);
  };

  socket.onclose = () => {
    attemptReconnect();
    console.log("❌ WebSocket disconnected");
  };

  socket.onerror = (err) => {
    console.error("WebSocket error", err);
  };
}

export function sendMessage(message: any) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    // Socket not ready → queue the message
    pendingMessages.push(message);
    console.log(`pending messages in send : ${pendingMessages}`);
    return;
  }

  socket.send(JSON.stringify(message));
}



function attemptReconnect() {
  if (reconnectAttempts >= AppConst.MAX_RETRIES) {
    statusHandler?.("disconnected");
    return;
  }

  reconnectAttempts++;
  statusHandler?.("reconnecting");

  const delay = AppConst.BASE_DELAY * reconnectAttempts;

  reconnectTimer = setTimeout(() => {
    connect();
  }, delay);
}

export function closeSocket() {
  pendingMessages.length = 0;
  reconnectTimer && clearTimeout(reconnectTimer);
  socket?.close();
  socket = null;
}