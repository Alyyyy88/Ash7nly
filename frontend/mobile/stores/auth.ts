import { create } from 'zustand';
import { authStore, User } from '../types/auth';

export const useAuthStore = create<authStore>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  user: null,
  setAuth: (accessToken: string | null, user: User | null) => {
    set(() => ({
      isAuthenticated: true,
      accessToken,
      user,
    }));
  },
  clearAuth: () => {
    set(() => ({
      isAuthenticated: false,
      accessToken: null,
      user: null,
    }));
  },
  logout: () => {
    set(() => ({
      isAuthenticated: false,
      accessToken: null,
      user: null,
    }));
  },
}));
