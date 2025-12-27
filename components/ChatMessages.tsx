"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/Indentities/MessageInterface";



interface ChatMessagesProps {
  messages: Message[];
  myUserId: string;
  matched: boolean;
  peerDisconnected: boolean;
  onReply: (message: Message) => void;
}

export default function ChatMessages({
  messages,
  myUserId,
  matched,
  peerDisconnected,
  onReply
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const isSwiping = useRef(false);


  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (
    e: React.TouchEvent,
    message: Message
  ) => {
    if (startX.current === null || startY.current === null) return;

    const touch = e.touches[0];
    const dx = touch.clientX - startX.current;
    const dy = touch.clientY - startY.current;

    // vertical scroll → ignore
    if (Math.abs(dy) > Math.abs(dx)) return;

    // horizontal intent
    if (dx > 0 && dx > 40) {
      isSwiping.current = true;
      onReply(message); // 🔥 trigger reply
      navigator.vibrate?.(10); // subtle haptic (mobile)
      resetTouch();
    }
  };

  const handleTouchEnd = () => {
    resetTouch();
  };

  const resetTouch = () => {
    startX.current = null;
    startY.current = null;
    isSwiping.current = false;
  };


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

      {messages.map((m) => {
        const isMine = m.from === myUserId;

        return (
          <div
            key={m.id}
            id={`msg-${m.id}`}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={(e) => handleTouchMove(e, m)}
              onTouchEnd={handleTouchEnd}
              // onContextMenu={(e) => e.preventDefault() }
              className={`px-3 py-2 rounded-lg max-w-[75%] text-sm
              whitespace-pre-wrap break-words
              ${isMine
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-200"
                }`}
              onContextMenu={(e) => {
                e.preventDefault();      // right-click / long-press
                onReply(m);
              }}
            >
              {/* Reply preview */}
              {m.replyTo && (
                <div
                  className={`mb-1 px-2 py-1 text-xs rounded
                  border-l-2
                  ${isMine
                      ? "bg-indigo-700/60 border-indigo-300"
                      : "bg-black/30 border-indigo-400"
                    }`}
                >
                  <div className="text-gray-300">
                    {m.replyTo.from === myUserId ? "You" : "Them"}
                  </div>
                  <div className="truncate">{m.replyTo.text}</div>
                </div>
              )}

              {/* Actual message */}
              <div>{m.text}</div>
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
