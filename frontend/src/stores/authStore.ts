import { create } from "zustand";
import type { User } from "../utils/types/UserType";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email: string, password: string) => {},
    }),
    {
      name: "auth-storage",
    }
  )
);
