"use client";

import { useEffect, useRef } from "react";

interface Message {
  text: string;
  from: string;
}

interface ChatMessagesProps {
  messages: Message[];
  myUserId: string;
  matched: boolean;
  peerDisconnected: boolean;
}

export default function ChatMessages({
  messages,
  myUserId,
  matched,
  peerDisconnected
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 80;

    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
<div
  ref={containerRef}
  className="h-full overflow-y-auto space-y-2 chat-scroll"
>

      {messages.map((m, i) => {
        const isMine = m.from === myUserId;

        return (
          <div
            key={i}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[75%] text-sm
                          whitespace-pre-wrap break-words
                          ${
                            isMine
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-700 text-gray-200"
                          }`}
            >
              {m.text}
            </div>
          </div>
        );
      })}

      {!matched && !peerDisconnected && (
        <div className="text-center text-gray-500 text-sm mt-10">
          Waiting for a match…
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}
