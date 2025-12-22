import { useState } from "react";

export default function ChatBox({
  messages,
  onSend
}: {
  messages: string[];
  onSend: (msg: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div>
      <div>
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSend(text);
            setText("");
          }
        }}
      />
    </div>
  );
}
