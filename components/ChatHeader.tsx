"use client";

import ChatEndAction from "@/components/ChatEndAction";

interface ChatHeaderProps {
  userName : string;
  matched: boolean;
  peerDisconnected: boolean;
  partnerName : string;
  onEndChat: () => void;
  onFindAnotherMatch: () => void;
}

export default function ChatHeader({
  userName,
  matched,
  peerDisconnected,
  partnerName,
  onEndChat,
  onFindAnotherMatch
}: ChatHeaderProps) {
  return (
    <div className="relative mb-4">
      {/* Centered title block */}
      <div className="text-center">
        <h1 className="text-xl font-semibold text-indigo-400">
          LazySpace
        </h1>
        <p className="text-sm text-gray-400">
          {matched && `Hi ${userName}, you are connected with ${partnerName}`}
          {!matched && peerDisconnected && "Chat ended"}
          {!matched && !peerDisconnected && "Finding someone to chat…"}
        </p>
      </div>

      {/* Top-right action (does not affect layout) */}
      {matched && (
        <div className="absolute right-0 top-0">
          <ChatEndAction
            matched={matched}
            onEndChat={onEndChat}
          />
        </div>
      )}

      {!matched && peerDisconnected && (
        <div className="absolute right-0 top-0">
          <button
            className="text-xs text-indigo-400 hover:text-indigo-300 transition"
            onClick={onFindAnotherMatch}
          >
             Next match
          </button>
        </div>
      )}
    </div>
  );
}
