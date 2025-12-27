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
import ConversationStatusBanner, { ConversationStatus } from "@/components/ConversationStatusBanner";
interface Message {
  text: string;
  from: string;
}

export default function Home() {
  const [matched, setMatched] = useState(false);
  const [peerDisconnected, setPeerDisconnected] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const userName = getUserName() ?? "Someone";
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [partnerTyping, setPartnerTyping] = useState(false);
  const [connectionState, setConnectionState] =
    useState<"connected" | "reconnecting" | "disconnected">("connected");


  
  const [conversationStatus, setConversationStatus] =
    useState<ConversationStatus>("active");
  
  const [conversationId, setConversationId] = useState<string | null>(null);

  const myUserId = getOrCreateUserId();

function markChatEnded() {
  if (conversationId) {
    localStorage.removeItem(`lazyspace_chat_${conversationId}`);
  }
  localStorage.removeItem(`lazyspace_chat_${conversationId}`);
    setMatched(false);
    setChatEnded(true);
  }

  function clearConversationCompletely() {
    if (conversationId) {
      localStorage.removeItem(`lazyspace_chat_${conversationId}`);
    }
  
    setConversationId(null);
    setMessages([]);
    setChatEnded(false);
    setPartnerName(null);
  }

  useEffect(() => {
    connectSocket((msg) => {
      switch (msg.type) {
        case WsMessageType.MATCH_FOUND:
          setConversationStatus("active");
          clearConversationCompletely();

          setMatched(true);
          setChatEnded(false);
          setPeerDisconnected(false);
        
          setPartnerName(msg.payload.partnerName);
          setConversationId(msg.payload.conversationId);
          break;
        case WsMessageType.RESUME_CONVERSATION:
          setConversationStatus("active");
          console.log("inside resume convo");
          setMatched(true);
          setPeerDisconnected(false);
          setPartnerName(msg.payload.partnerName);
          setConversationId(msg.payload.conversationId);
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

        case WsMessageType.PEER_RECONNECTING:
          setConnectionState("reconnecting");
          setConversationStatus("reconnecting");
          break;

        case WsMessageType.PEER_RECONNECTED:
          setConversationStatus("active");
          setMatched(true);
          setConnectionState("connected");

          break;

        case WsMessageType.INVALID_CONVERSATION_ID :
          sendMessage({ type: WsMessageType.JOIN_QUEUE });
          break;

        case WsMessageType.PEER_DISCONNECTED:
          setPartnerTyping(false);
          setMatched(false);
          setPartnerName("Someone");
          setPeerDisconnected(true); 
          setConversationStatus("peer-disconnected");
          markChatEnded();

 
          break;
      }
    },
      (status) => {
        setConnectionState(status);
      }
    );
  }, []);

  useEffect(() => {
    if (!conversationId) return;
  
    const saved = localStorage.getItem(
      `lazyspace_chat_${conversationId}`
    );
  console.log(`id : ${conversationId}`)
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, [conversationId]);


  useEffect(() => {
    if (!conversationId) return;
  
    localStorage.setItem(
      `lazyspace_chat_${conversationId}`,
      JSON.stringify(messages)
    );
  }, [messages, conversationId]);

  useEffect(() => {
    console.log(`convo id ${conversationId}`);
    if (!conversationId) {
      sendMessage({ type: WsMessageType.JOIN_QUEUE });
    }else{
      sendMessage(
        { type: WsMessageType.REQUEST_RESUME , 
          payload : {
            conversationId :conversationId}
        }
      
      );
    }
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
              markChatEnded();
              setConversationStatus("chat-ended");
              
            }}
            onFindAnotherMatch={() => {
              sendMessage({ type: WsMessageType.FIND_ANOTHER_MATCH });
              setPeerDisconnected(false);
              clearConversationCompletely();
              // setMessages([]);
            }}
          />
        </div>


        <ConversationStatusBanner
  status={conversationStatus}
  partnerName={partnerName}
/>
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
           disabled={conversationStatus !== "active"}
          />
        </div>

      </div>
    </main>
  );
}

