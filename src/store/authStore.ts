import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Kategori } from "@/types";

interface User {
  id: string;
  name: string;
  username: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  list_kategori: Kategori[];
  jml_data: number;

  login: (username: string, password: string) => Promise<void>;
  register: (name: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  fetchKategori: (page?: number, search?: string) => Promise<number | void>;
  addKategori: (payload: { uraian: string }) => Promise<boolean>;
  editKategori: (id: string | number, payload: { uraian: string }) => Promise<boolean>;
  deleteKategori: (id: string | number) => Promise<boolean>;
}

// const API_URL = "http://localhost:8000";

// Data Dummy Awal Kategori
const INITIAL_KATEGORI: Kategori[] = [
  { id: "1", uraian: "Makanan Berat", createdAt: "2026-05-01", index: 1 },
  { id: "2", uraian: "Minuman Dingin", createdAt: "2026-05-01", index: 2 },
  { id: "3", uraian: "Minuman Panas", createdAt: "2026-05-01", index: 3 },
  { id: "4", uraian: "Snack & Cemilan", createdAt: "2026-05-02", index: 4 },
  { id: "5", uraian: "Paket Hemat", createdAt: "2026-05-02", index: 5 },
  { id: "6", uraian: "Dessert", createdAt: "2026-05-02", index: 6 },
];

// Data Dummy Pengguna
const DUMMY_USERS: Record<string, { name: string; username: string; password?: string }> = {
  admin: { name: "Owner / Admin POS", username: "admin" },
  "admin@example.com": { name: "Owner / Admin POS", username: "admin@example.com" },
  kasir: { name: "Kasir Toko", username: "kasir" },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      list_kategori: INITIAL_KATEGORI, 
      jml_data: INITIAL_KATEGORI.length,

      // ==========================================
      // LOGIN
      // ==========================================
      login: async (username, password) => {
        set({ loading: true, error: null });
        try {
          // --- KODE SERVER ASLI (DI-COMMENT) ---
          // const res = await fetch(`${API_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) }); const data = await res.json(); if (!res.ok) throw new Error(data.detail || "Login gagal"); set({ token: data.access_token, user: data.user, isAuthenticated: true, loading: false });

          // --- KODE DUMMY (AKTIF) ---
          await new Promise((resolve) => setTimeout(resolve, 500));
          if (!username || !password) throw new Error("Username dan password wajib diisi");

          const matchedUser = DUMMY_USERS[username.toLowerCase()] || {
            name: username.charAt(0).toUpperCase() + username.slice(1),
            username: username,
          };

          set({
            token: `mock-token-${Date.now()}`,
            user: { id: `usr-${Date.now()}`, name: matchedUser.name, username: matchedUser.username },
            isAuthenticated: true,
            loading: false,
          });
        } catch (err) {
          if (err instanceof Error) {
            set({ error: err.message, loading: false });
          }
        }
      },

      // ==========================================
      // REGISTER
      // ==========================================
      register: async (name, username, password) => {
        set({ loading: true, error: null });
        try {
          // --- KODE SERVER ASLI (DI-COMMENT) ---
          // const res = await fetch(`${API_URL}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, username, password }) }); const data = await res.json(); if (!res.ok) throw new Error(data.detail || "Registrasi gagal"); set({ loading: false });

          // --- KODE DUMMY (AKTIF) ---
          await new Promise((resolve) => setTimeout(resolve, 500));
          if (!name || !username || !password) throw new Error("Semua field wajib diisi");
          set({ loading: false });
        } catch (err) {
          if (err instanceof Error) {
            set({ error: err.message, loading: false });
          }
        }
      },

      // ==========================================
      // FETCH KATEGORI
      // ==========================================
      fetchKategori: async (page: number = 1, search: string = "") => {
        set({ loading: true, error: null });
        try {
          // --- KODE SERVER ASLI (DI-COMMENT) ---
          // const { token } = get(); const res = await fetch(API_URL + '/kategori/view', { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify({ data_ke: page, cari_value: search }) }); const res_data = await res.json(); set({ list_kategori: res_data.data, jml_data: res_data.jml_data, loading: false }); return res_data.jml_data;

          // --- KODE DUMMY (AKTIF) ---
          await new Promise((resolve) => setTimeout(resolve, 200));
          const currentList = get().list_kategori.length > 0 ? get().list_kategori : INITIAL_KATEGORI;
          
          let filtered = currentList;
          if (search.trim()) {
            filtered = currentList.filter((k) =>
              k.uraian.toLowerCase().includes(search.toLowerCase())
            );
          }

          const limit = 10;
          const startIndex = (page - 1) * limit;
          const paginated = filtered.slice(startIndex, startIndex + limit);

          set({
            list_kategori: paginated,
            jml_data: filtered.length,
            loading: false,
          });

          return filtered.length;
        } catch (err) {
          if (err instanceof Error) {
            set({ error: err.message, loading: false });
          }
        }
      },

      // ==========================================
      // ADD KATEGORI
      // ==========================================
      addKategori: async (payload) => {
        set({ loading: true, error: null });
        try {
          // --- KODE SERVER ASLI (DI-COMMENT) ---
          // const { token } = get(); const res = await fetch(API_URL + '/kategori/addData', { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify(payload) }); const res_data = await res.json(); if (!res.ok) throw new Error(res_data.detail || "Gagal menambah kategori"); set({ loading: false }); return true;

          // --- KODE DUMMY (AKTIF) ---
          await new Promise((resolve) => setTimeout(resolve, 300));
          const currentList = get().list_kategori;
          
          const newKategori: Kategori = {
            id: String(Date.now()),
            uraian: payload.uraian,
            createdAt: new Date().toISOString().split("T")[0],
            index: currentList.length + 1,
          };

          const updatedList = [newKategori, ...currentList];
          set({
            list_kategori: updatedList,
            jml_data: updatedList.length,
            loading: false,
          });

          return true;
        } catch (err) {
          if (err instanceof Error) {
            set({ error: err.message, loading: false });
          }
          return false;
        }
      },

      // ==========================================
      // EDIT KATEGORI
      // ==========================================
      editKategori: async (id, payload) => {
        set({ loading: true, error: null });
        try {
          // --- KODE SERVER ASLI (DI-COMMENT) ---
          // const { token } = get(); const res = await fetch(`${API_URL}/kategori/${id}`, { method: "PUT", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify(payload) }); const res_data = await res.json(); if (!res.ok) throw new Error(res_data.detail || "Gagal mengubah kategori"); set({ loading: false }); return true;

          // --- KODE DUMMY (AKTIF) ---
          await new Promise((resolve) => setTimeout(resolve, 300));
          const currentList = get().list_kategori;

          const updatedList = currentList.map((item) =>
            item.id === String(id) ? { ...item, uraian: payload.uraian } : item
          );

          set({
            list_kategori: updatedList,
            loading: false,
          });

          return true;
        } catch (err) {
          if (err instanceof Error) {
            set({ error: err.message, loading: false });
          }
          return false;
        }
      },

      // ==========================================
      // DELETE KATEGORI
      // ==========================================
      deleteKategori: async (id) => {
        set({ loading: true, error: null });
        try {
          // --- KODE SERVER ASLI (DI-COMMENT) ---
          // const { token } = get(); const res = await fetch(`${API_URL}/kategori/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } }); const res_data = await res.json(); if (!res.ok) throw new Error(res_data.detail || "Gagal menghapus kategori"); set({ loading: false }); return true;

          // --- KODE DUMMY (AKTIF) ---
          await new Promise((resolve) => setTimeout(resolve, 300));
          const currentList = get().list_kategori;

          const updatedList = currentList.filter((item) => item.id !== String(id));

          set({
            list_kategori: updatedList,
            jml_data: updatedList.length,
            loading: false,
          });

          return true;
        } catch (err) {
          if (err instanceof Error) {
            set({ error: err.message, loading: false });
          }
          return false;
        }
      },

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          error: null,
        }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        list_kategori: state.list_kategori,
      }),
    }
  )
);