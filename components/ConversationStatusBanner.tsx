export type ConversationStatus =
    | "active"
    | "peer-disconnected"
    | "chat-ended"
    | "reconnecting";

interface Props {
    status: ConversationStatus;
    partnerName?: string | null;
  }
  
  export default function ConversationStatusBanner({
    status,
    partnerName
  }: Props) {
    if (status === "active") return null;
  
    const map = {
      "peer-disconnected": {
        text: `${partnerName ?? "User"} left the chat`,
        color: "bg-red-900/40 text-red-300"
      },
      "chat-ended": {
        text: "You ended the chat",
        color: "bg-gray-800 text-gray-400"
      },
      "reconnecting": {
        text: "Connection issue. Waiting for reconnection…",
        color: "bg-yellow-900/30 text-yellow-300"
      }
    };
  
    const item = map[status];
  
    return (
      <div
        className={`mx-4 my-2 px-3 py-2 rounded-lg text-sm text-center ${item.color}`}
      >
        {item.text}
      </div>
    );
  }
  