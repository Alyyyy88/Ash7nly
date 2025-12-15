import type { AuthState, User } from "@/types/auth";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  setAuthState: (
    isAuthenticated: boolean,
    user: User | null,
    token: string | null
  ) =>
    set(() => ({
      isAuthenticated: isAuthenticated,
      user: user,
      token: token,
    })),
  clearAuthState: () =>
    set(() => ({
      isAuthenticated: false,
      user: null,
      token: null,
    })),
}));
