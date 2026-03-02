"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserName, setUserName } from "@/lib/userProfile";
import { WsMessageType } from "@/types/ws";
import { sendMessage } from "@/lib/socket";

export default function EntryPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;

  const inviteToken = searchParams?.get("invite");

  const saveName = () => {
    if (!name.trim()) return false;
    setUserName(name.trim());
    return true;
  };

  const startRandomChat = () => {
    if (!saveName()) return;
    router.push("/chat");
  };

  const createPrivateChat = () => {
    if (!saveName()) return;
    sendMessage({ type: WsMessageType.CREATE_PRIVATE_CONVERSATION })
    router.push("/chat?mode=private");
  };

  const joinPrivateChat = () => {
    if (!saveName()) return;
    router.push(`/chat?invite=${inviteToken}`);
  };

  return (
    <main className="h-[100dvh] bg-[#020617] flex items-center justify-center text-gray-200">
      <div className="w-full max-w-sm px-6">

        <h1 className="text-2xl font-semibold text-indigo-400 text-center mb-4">
          Welcome to LazySpace
        </h1>

        <p className="text-sm text-gray-400 text-center mb-6">
          What should we call you?
        </p>

        <input
          className="w-full bg-[#020617]
                     border border-gray-700 rounded-lg
                     px-4 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && startRandomChat()}
        />

        {/* If joining via invite */}
        {inviteToken ? (
          <button
            onClick={joinPrivateChat}
            disabled={!name.trim()}
            className="w-full mt-4 py-2 rounded-lg
                       bg-indigo-600 hover:bg-indigo-500
                       disabled:bg-gray-700 transition"
          >
            Join private chat
          </button>
        ) : (
          <>
            <button
              onClick={startRandomChat}
              disabled={!name.trim()}
              className="w-full mt-4 py-2 rounded-lg
                         bg-indigo-600 hover:bg-indigo-500
                         disabled:bg-gray-700 transition"
            >
              Talk to anyone
            </button>

          </>
        )}
      </div>
    </main>
  );
}
