"use client";

import { WsMessageType } from "@/types/ws";
import { sendMessage } from "@/lib/socket";

interface ChatEndActionProps {
  matched: boolean;
  onEndChat: () => void;
}

export default function ChatEndAction({
  matched,
  onEndChat
}: ChatEndActionProps) {
  if (!matched) return null;

  return (
    <button
      className="text-xs text-gray-400 hover:text-red-400 transition"
      onClick={() => {
        sendMessage({ type: WsMessageType.END_CHAT });
        onEndChat();
      }}
    >
      End chat
    </button>
  );
}
