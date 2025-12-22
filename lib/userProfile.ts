const NAME_KEY = "lazyspace_name";

export function getUserName(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(NAME_KEY);
}

export function setUserName(name: string) {
  localStorage.setItem(NAME_KEY, name.trim());
}
