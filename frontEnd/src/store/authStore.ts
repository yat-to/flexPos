import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile } from "@/types";
import { API_ENDPOINTS } from "@/services/api";

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setAuth: (user: UserProfile, token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // ==========================================
      // LOGIN KE BACKEND NESTJS
      // ==========================================
      login: async (username: string, password: string) => {
        set({ loading: true, error: null });

        try {
          console.log("🚀 [AUTH STORE] Mengirim request login ke backend:", API_ENDPOINTS.LOGIN);

          const res = await fetch(API_ENDPOINTS.LOGIN, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Username atau password salah");
          }

          console.log("✅ [AUTH STORE] Login berhasil, token diterima!");

          set({
            token: data.access_token,
            user: data.user,
            isAuthenticated: true,
            loading: false,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Gagal login ke server";
          set({ error: message, loading: false });
          throw err;
        }
      },

      // ==========================================
      // LOGOUT
      // ==========================================
      logout: () => {
        console.log("🚪 [AUTH STORE] Pengguna keluar (logout)");
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // ==========================================
      // UTILITIES
      // ==========================================
      clearError: () => set({ error: null }),

      setAuth: (user: UserProfile, token: string) =>
        set({ user, token, isAuthenticated: true }),
    }),
    {
      name: "flexpos-auth-storage", // Disimpan otomatis di LocalStorage browser
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);