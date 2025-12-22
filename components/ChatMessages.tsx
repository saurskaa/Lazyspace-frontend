"use client";

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
  return (
    <div className="flex-1 overflow-y-auto space-y-2 mb-3">
      {messages.map((m, i) => {
        // 🟡 SYSTEM MESSAGE
        if (m.from === "system") {
          return (
            <div
              key={i}
              className="text-center text-xs text-gray-400 py-1"
            >
              {m.text}
            </div>
          );
        }

        // 🟢 USER MESSAGE
        const isMine = m.from === myUserId;

        return (
          <div
            key={i}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
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
        <div className="text-center text-gray-500 text-sm mt-6">
          Waiting for a match…
        </div>
      )}
    </div>
  );
}
