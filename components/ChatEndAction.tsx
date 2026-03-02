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
    <div className="flex gap-4">
      <button
        className="text-xs text-gray-400 hover:text-red-400 transition"
        onClick={() => {
          if (window.confirm("Are you sure you want to report this user?")) {
            sendMessage({ type: WsMessageType.REPORT_USER });
            sendMessage({ type: WsMessageType.END_CHAT });
            onEndChat();
          }
        }}
      >
        Report user
      </button>
      <button
        className="text-xs text-gray-400 hover:text-red-400 transition"
        onClick={() => {
          sendMessage({ type: WsMessageType.END_CHAT });
          onEndChat();
        }}
      >
        End chat
      </button>
    </div>
  );
}
