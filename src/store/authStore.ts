import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Kategori, BusinessType, UserProfile } from "@/types";

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  list_kategori: Kategori[];
  jml_data: number;

  login: (username: string, password: string) => Promise<void>;
  register: (name: string, username: string, password: string, businessType?: BusinessType, storeName?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  fetchKategori: (page?: number, search?: string) => Promise<number | void>;
  addKategori: (payload: { uraian: string }) => Promise<boolean>;
  editKategori: (id: string | number, payload: { uraian: string }) => Promise<boolean>;
  deleteKategori: (id: string | number) => Promise<boolean>;
  switchBusinessTypePreset: (type: BusinessType) => void;
}

// const API_URL = "http://localhost:8000";

// Preset Kategori Bawaan Per Jenis Bisnis (Dinamis)
export const BUSINESS_CATEGORY_PRESETS: Record<BusinessType, Kategori[]> = {
  food: [
    { id: "1", uraian: "Makanan Utama & Berat", createdAt: "2026-05-01", index: 1, businessType: "food" },
    { id: "2", uraian: "Minuman Dingin / Es", createdAt: "2026-05-01", index: 2, businessType: "food" },
    { id: "3", uraian: "Kopi & Minuman Panas", createdAt: "2026-05-01", index: 3, businessType: "food" },
    { id: "4", uraian: "Snack & Cemilan", createdAt: "2026-05-02", index: 4, businessType: "food" },
    { id: "5", uraian: "Paket Menu Hemat", createdAt: "2026-05-02", index: 5, businessType: "food" },
  ],
  barbershop: [
    { id: "101", uraian: "Potong Rambut & Styling", createdAt: "2026-05-01", index: 1, businessType: "barbershop" },
    { id: "102", uraian: "Cukur Jenggot & Shaving", createdAt: "2026-05-01", index: 2, businessType: "barbershop" },
    { id: "103", uraian: "Hair Treatment & Creambath", createdAt: "2026-05-01", index: 3, businessType: "barbershop" },
    { id: "104", uraian: "Cat & Pewarnaan Rambut", createdAt: "2026-05-02", index: 4, businessType: "barbershop" },
    { id: "105", uraian: "Produk Grooming (Pomade/Tonic)", createdAt: "2026-05-02", index: 5, businessType: "barbershop" },
  ],
  sport: [
    { id: "201", uraian: "Sewa Lapangan (Futsal/Badminton/Tennis)", createdAt: "2026-05-01", index: 1, businessType: "sport" },
    { id: "202", uraian: "Sewa Meja Billiard / Alat", createdAt: "2026-05-01", index: 2, businessType: "sport" },
    { id: "203", uraian: "Sewa Raket / Rompi / Sepatu", createdAt: "2026-05-01", index: 3, businessType: "sport" },
    { id: "204", uraian: "Minuman Energi & Air Mineral", createdAt: "2026-05-02", index: 4, businessType: "sport" },
    { id: "205", uraian: "Aksesoris Olahraga & Jersey", createdAt: "2026-05-02", index: 5, businessType: "sport" },
  ],
  retail: [
    { id: "301", uraian: "Pakaian & Fashion", createdAt: "2026-05-01", index: 1, businessType: "retail" },
    { id: "302", uraian: "Kebutuhan Pokok & Sembako", createdAt: "2026-05-01", index: 2, businessType: "retail" },
    { id: "303", uraian: "Elektronik & Aksesoris", createdAt: "2026-05-01", index: 3, businessType: "retail" },
    { id: "304", uraian: "Snack & Minuman Ringan", createdAt: "2026-05-02", index: 4, businessType: "retail" },
  ]
};

// Data Dummy Pengguna Multi-Bisnis
const DUMMY_USERS: Record<string, { name: string; username: string; storeName: string; businessType: BusinessType }> = {
  admin: { name: "Budi Santoso", username: "admin", storeName: "Resto & Cafe Berkah", businessType: "food" },
  "admin@example.com": { name: "Budi Santoso", username: "admin@example.com", storeName: "Resto & Cafe Berkah", businessType: "food" },
  barber: { name: "Rian Barber", username: "barber", storeName: "Classic Gentleman Barbershop", businessType: "barbershop" },
  sport: { name: "Coach Hendra", username: "sport", storeName: "Champion Arena & Sport Center", businessType: "sport" },
  kasir: { name: "Kasir Toko", username: "kasir", storeName: "FlexPOS Store", businessType: "retail" },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      list_kategori: BUSINESS_CATEGORY_PRESETS.food, 
      jml_data: BUSINESS_CATEGORY_PRESETS.food.length,

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
            storeName: "Toko FlexPOS",
            businessType: "food" as BusinessType,
          };

          const dummyToken = `mock-token-${Date.now()}`;
          const dummyUserData: UserProfile = {
            id: `usr-${Date.now()}`,
            name: matchedUser.name,
            username: matchedUser.username,
            storeName: matchedUser.storeName,
            businessType: matchedUser.businessType || "food",
          };

          const businessCategories = BUSINESS_CATEGORY_PRESETS[matchedUser.businessType] || BUSINESS_CATEGORY_PRESETS.food;

          set({
            token: dummyToken,
            user: dummyUserData,
            list_kategori: businessCategories,
            jml_data: businessCategories.length,
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
      register: async (name, username, password, businessType = "food", storeName = "Usaha Saya") => {
        set({ loading: true, error: null });
        try {
          // --- KODE SERVER ASLI (DI-COMMENT) ---
          // const res = await fetch(`${API_URL}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, username, password }) }); const data = await res.json(); if (!res.ok) throw new Error(data.detail || "Registrasi gagal"); set({ loading: false });

          // --- KODE DUMMY (AKTIF) ---
          await new Promise((resolve) => setTimeout(resolve, 600));
          if (!name || !username || !password) throw new Error("Semua field wajib diisi");

          // Simpan user baru dengan profil bisnis terpilih
          DUMMY_USERS[username.toLowerCase()] = {
            name: name,
            username: username,
            storeName: storeName,
            businessType: businessType,
          };

          set({ loading: false });
        } catch (err) {
          if (err instanceof Error) {
            set({ error: err.message, loading: false });
          }
          throw err;
        }
      },

      // Ganti preset kategori jika user memilih ganti mode bisnis
      switchBusinessTypePreset: (type: BusinessType) => {
        const presets = BUSINESS_CATEGORY_PRESETS[type] || BUSINESS_CATEGORY_PRESETS.food;
        set((state) => ({
          list_kategori: presets,
          jml_data: presets.length,
          user: state.user ? { ...state.user, businessType: type } : null,
        }));
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