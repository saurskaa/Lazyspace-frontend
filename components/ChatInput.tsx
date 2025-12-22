"use client";

import { WsMessageType } from "@/types/ws";
import { sendMessage } from "@/lib/socket";

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}

const MAX_HEIGHT = 120;

export default function ChatInput({
  value,
  onChange,
  disabled
}: ChatInputProps) {
  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const send = () => {
    if (!value.trim() || disabled) return;

    sendMessage({
      type: WsMessageType.CHAT_MESSAGE,
      payload: { message: value }
    });

    onChange("");
  };

  return (
    <div className="flex items-end gap-2">
      <textarea
        className="flex-1 bg-[#020617]
                   border border-gray-700 rounded-lg
                   px-3 py-2 text-sm text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   placeholder-gray-500 disabled:opacity-50
                   resize-none overflow-y-auto"
        placeholder={disabled ? "Waiting for match…" : "Type a message…"}
        rows={1}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          onChange(e.target.value);

          e.target.style.height = "auto";
          e.target.style.height =
            Math.min(e.target.scrollHeight, MAX_HEIGHT) + "px";
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (isTouchDevice) return;

            if (!e.shiftKey) {
              e.preventDefault();
              send();
            }
          }
        }}
      />

      <button
        onClick={send}
        disabled={disabled || !value.trim()}
        className="h-9 w-9 flex items-center justify-center
                   rounded-full bg-indigo-600
                   hover:bg-indigo-500
                   disabled:bg-gray-700 disabled:cursor-not-allowed
                   transition"
        aria-label="Send message"
      >
        ➤
      </button>
    </div>
  );
}
