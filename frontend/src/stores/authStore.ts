import { create } from "zustand";
import type { User } from "../utils/types/UserType";
import { AxiosInstance } from "../services/api/Api";
import { addToast } from "@heroui/react";

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  loading: boolean;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  loading: false,
  login: async (email: string, password: string) => {
    try {
      const response = await AxiosInstance.post("/user/login", {
        email,
        password,
      });
      set({ user: response.data.user });
      addToast({
        title: "Login bem-sucedido",
        description: `Bem-vindo de volta, ${response.data.user.name}!`,
        color: "success",
      });
    } catch {
      addToast({
        title: "Login falhou",
        description: "Email ou senha inválidos.",
        color: "danger",
      });
    }
  },
  logout: () => set({ user: null }),
  refreshSession: async () => {
    set({ loading: true });
    try {
      const response = await AxiosInstance.post("/user/refresh", {});
      set({ user: response.data.user, loading: false });
    } catch {
      set({ user: null });
      addToast({
        title: "Sessão expirada",
        description: "Por favor, faça login novamente.",
        color: "danger",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
