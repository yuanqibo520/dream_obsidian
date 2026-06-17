import { create } from "zustand";
import type { User } from "../types/user";
import { storage } from "../lib/storage";

type AuthState = {
  token: string | null;
  user: User | null;
  setSession: (token: string, user: User) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: storage.get("saulink_token"),
  user: null,
  setSession: (token, user) => {
    storage.set("saulink_token", token);
    set({ token, user });
  },
  clearSession: () => {
    storage.remove("saulink_token");
    set({ token: null, user: null });
  },
}));
