import { json } from "stream/consumers";

function generateUUID(): string {
  // Modern browsers (desktop, some mobile)
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older / mobile browsers
  // RFC4122 v4-compliant enough for identity
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getOrCreateUserId(): string {
  if (typeof window === "undefined") return "";

  
  let userId = localStorage.getItem("lazyspace_user_id");
  console.log(`userid already existed : ${userId}`)

  if (!userId) {
    userId = generateUUID();
    localStorage.setItem("lazyspace_user_id", userId);
  }

  return userId;
}
