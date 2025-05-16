import { create } from "zustand";
import { User } from "@/types/User.type";

type AuthState = {
  user: User | null;
  setUser: (u: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
