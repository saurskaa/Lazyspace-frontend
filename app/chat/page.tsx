"use client";

import { useEffect, useState } from "react";
import { connectSocket, sendMessage } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { WsMessageType } from "@/types/ws";
import { getOrCreateUserId } from "@/lib/userId";
import ChatMessages from "@/components/ChatMessages";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import { getUserName } from "@/lib/userProfile";

interface Message {
  text: string;
  from: string;
}

export default function Home() {
  const [matched, setMatched] = useState(false);
  const [peerDisconnected, setPeerDisconnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const userName = getUserName() ?? "Someone";
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [partnerTyping, setPartnerTyping] = useState(false);
  const [connectionState, setConnectionState] =
    useState<"connected" | "reconnecting" | "disconnected">("connected");

  const myUserId = getOrCreateUserId();


  useEffect(() => {
    connectSocket((msg) => {
      switch (msg.type) {
        case WsMessageType.MATCH_FOUND:
          setMatched(true);
          setPartnerName(msg.payload.partnerName)
          break;

        case WsMessageType.CHAT_MESSAGE:
          setPartnerTyping(false);
          setMessages((prev) => [
            ...prev,
            { text: msg.payload.message, from: msg.payload.from }
          ]);
          break;

        case WsMessageType.TYPING_START:
          setPartnerTyping(true);
          break;

        case WsMessageType.TYPING_STOP:
          setPartnerTyping(false);
          break;

        case WsMessageType.PEER_DISCONNECTED:
          setPartnerTyping(false);
          setMatched(false);
          setPartnerName("Someone");
          setPeerDisconnected(true);
          setMessages((prev) => [
            ...prev,
            { text: "User left the chat.", from: "system" }
          ]);
          break;
      }
    },
      (status) => {
        setConnectionState(status);
      }
    );
  }, []);

  return (
    <main className="h-dvh bg-[#020617]">
      <div className="h-full w-full flex flex-col text-gray-200">

        {/* Header (fixed) */}
        <div className="shrink-0 border-b border-gray-800 px-4 py-3">
          <ChatHeader
            userName={userName}
            partnerName={partnerName ? partnerName : "someone"}
            matched={matched}
            peerDisconnected={peerDisconnected}
            onEndChat={() => {
              sendMessage({ type: WsMessageType.END_CHAT });
              setMatched(false);
              setPeerDisconnected(true);
              setMessages((prev) => [
                ...prev,
                { text: "You ended the chat.", from: "system" }
              ]);
            }}
            onFindAnotherMatch={() => {
              sendMessage({ type: WsMessageType.FIND_ANOTHER_MATCH });
              setPeerDisconnected(false);
              setMessages([]);
            }}
          />
        </div>

        {/* Messages (ONLY scrollable area) */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <ChatMessages
            messages={messages}
            myUserId={myUserId}
            matched={matched}
            peerDisconnected={peerDisconnected}
          />
        </div>

        {/* Input (fixed bottom) */}
        <div className="shrink-0 border-t border-gray-800 px-3 py-2">
          {connectionState === "reconnecting" && (
            <div className="px-3 py-1 text-xs text-yellow-400">
              Reconnecting…
            </div>
          )}

          {connectionState === "disconnected" && (
            <div className="px-3 py-1 text-xs text-red-400">
              Connection lost. Please refresh.
            </div>
          )}


          {partnerTyping && matched && (
            <div className="px-3 py-1 text-xs text-gray-400">
              Typing…
            </div>
          )}

          <ChatInput
            value={text}
            onChange={setText}
            disabled={!matched}
          />
        </div>

      </div>
    </main>
  );
}
