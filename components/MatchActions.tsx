"use client";

import { WsMessageType } from "@/types/ws";
import { sendMessage } from "@/lib/socket";

interface MatchActionsProps {
  matched: boolean;
  peerDisconnected: boolean;
  onResetChat: () => void;
}

export default function MatchActions({
  matched,
  onResetChat,  
  peerDisconnected
}: MatchActionsProps) {
  if (!matched && !peerDisconnected) return null;

  return (
    <div className="mt-4 flex justify-center">
      <button
        className="text-sm text-indigo-400 hover:text-indigo-300 underline transition"
        onClick={() => {
          sendMessage({ type: WsMessageType.FIND_ANOTHER_MATCH });
          onResetChat();
        }}
      >
        Find another match
      </button>
    </div>
  );
}
