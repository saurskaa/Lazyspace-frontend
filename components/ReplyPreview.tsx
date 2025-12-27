import { Message } from "@/Indentities/MessageInterface";

export function ReplyPreview({
    message,
    onCancel
  }: {
    message: Message;
    onCancel: () => void;
  }) {
    return (
      <div className="mb-2 px-3 py-2 rounded-lg bg-gray-800 text-sm border-l-4 border-indigo-500">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400">
            Replying to {message.from === "me" ? "You" : "Them"}
          </div>
          <button
            onClick={onCancel}
            className="text-xs text-gray-400 hover:text-red-400"
          >
            ✕
          </button>
        </div>
        <div className="truncate text-gray-200">
          {message.text}
        </div>
      </div>
    );
  }
  