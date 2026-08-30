"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { BusinessType } from "@/types";
import {
  KeyRound,
  User,
  Store,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Loader2,
  UtensilsCrossed,
  Scissors,
  Trophy,
  ShoppingBag,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, loading, error, isAuthenticated, clearError, user } = useAuthStore();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    storeName: "",
    businessType: "food" as BusinessType,
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loadingStep, setLoadingStep] = useState("Memverifikasi akun...");
  const [progress, setProgress] = useState(20);

  // Animasi dan transisi loading setelah berhasil login
  useEffect(() => {
    if (isAuthenticated) {
      setIsRedirecting(true);

      const businessName = user?.storeName || "Toko Anda";
      const businessTypeLabel =
        user?.businessType === "barbershop"
          ? "Barbershop & Salon"
          : user?.businessType === "sport"
            ? "Sport & Arena Rental"
            : user?.businessType === "retail"
              ? "Retail & Toko"
              : "F&B / Resto & Cafe";

      const step1 = setTimeout(() => {
        setLoadingStep(`Menghubungkan akun "${businessName}"...`);
        setProgress(45);
      }, 350);

      const step2 = setTimeout(() => {
        setLoadingStep(`Memuat modul & kategori khusus ${businessTypeLabel}...`);
        setProgress(85);
      }, 750);

      const step3 = setTimeout(() => {
        setProgress(100);
        router.push("/dashboard");
      }, 1200);

      return () => {
        clearTimeout(step1);
        clearTimeout(step2);
        clearTimeout(step3);
      };
    }
  }, [isAuthenticated, user, router]);

  // Clear error saat unmount atau ganti tab
  useEffect(() => {
    clearError();
    setRegisterError(null);
    setRegisterSuccess(null);
  }, [mode, clearError]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginForm.username, loginForm.password);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    setRegisterSuccess(null);

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError("Konfirmasi password tidak cocok!");
      return;
    }

    if (registerForm.password.length < 4) {
      setRegisterError("Password minimal 4 karakter.");
      return;
    }

    try {
      await register(
        registerForm.name,
        registerForm.username,
        registerForm.password,
        registerForm.businessType,
        registerForm.storeName
      );

      setRegisterSuccess(
        `Akun FlexPOS untuk "${registerForm.storeName || registerForm.name}" berhasil didaftarkan! Silakan masuk.`
      );

      // Otomatis isi username di form login dan pindah ke tab login
      setLoginForm((prev) => ({ ...prev, username: registerForm.username }));
      setMode("login");
      setRegisterForm({
        name: "",
        storeName: "",
        businessType: "food",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      if (err instanceof Error) {
        setRegisterError(err.message);
      } else {
        setRegisterError("Gagal melakukan registrasi.");
      }
    }
  };

  const businessTypes: Array<{
    id: BusinessType;
    label: string;
    sublabel: string;
    icon: typeof UtensilsCrossed;
    color: string;
  }> = [
      {
        id: "food",
        label: "F&B / Kuliner",
        sublabel: "Resto, Cafe, Warkop",
        icon: UtensilsCrossed,
        color: "text-amber-500 bg-amber-50 border-amber-200",
      },
      {
        id: "barbershop",
        label: "Barbershop",
        sublabel: "Potong, Styling, Treatment",
        icon: Scissors,
        color: "text-blue-500 bg-blue-50 border-blue-200",
      },
      {
        id: "sport",
        label: "Sport & Arena",
        sublabel: "Sewa Lapangan & Alat",
        icon: Trophy,
        color: "text-emerald-500 bg-emerald-50 border-emerald-200",
      },
      {
        id: "retail",
        label: "Retail & Toko",
        sublabel: "Fashion, Sembako, Gadget",
        icon: ShoppingBag,
        color: "text-purple-500 bg-purple-50 border-purple-200",
      },
    ];

  return (
    <div className="min-h-screen flex bg-slate-50 relative overflow-hidden">
      {/* ========================================================= */}
      {/* FULL-PAGE POST-LOGIN LOADING OVERLAY                      */}
      {/* ========================================================= */}
      {isRedirecting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-md transition-all duration-300 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl border border-indigo-50 flex flex-col items-center text-center mx-4 animate-in zoom-in-95 duration-200">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 animate-pulse">
                <Store className="w-8 h-8" />
              </div>
              <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-1 text-white shadow-md">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-3">
              <div
                className="bg-gradient-to-r from-indigo-600 to-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* LEFT PANEL - BRANDING & INDUSTRY PILLARS (DESKTOP)        */}
      {/* ========================================================= */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-800 via-indigo-600 to-blue-700 items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="2" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Ambient Glowing Blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 text-white max-w-lg">

          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-4xl xl:text-5xl font-black leading-none tracking-tight">
                Flex<span className="text-indigo-200">POS</span>
              </h1>
              <p className="text-xs text-indigo-200 mt-1 font-medium">Satu Aplikasi Kasir untuk Segala Jenis Usaha</p>
            </div>
          </div>

          <p className="text-sm xl:text-base text-indigo-100/90 leading-relaxed mb-8">
            Didesain fleksibel untuk mendukung berbagai model bisnis: mulai dari F&B, jasa potong rambut, persewaan lapangan olahraga, hingga retail skala kecil maupun besar.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT PANEL - AUTH FORMS                                  */}
      {/* ========================================================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 my-auto">

          {/* Brand Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2.5 mb-2 justify-center">
              <div className="relative w-15 h-15 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/images/icon.png"
                  alt="FlexPOS Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-black text-gray-900 tracking-tight">Flex</span>
                <span className="text-2xl font-black text-indigo-600 tracking-tight">POS</span>
              </div>
            </div>
            <p className="text-center text-xs sm:text-sm text-gray-500">
              {mode === "login"
                ? "Masuk ke sistem kasir pintar untuk bisnis Anda."
                : "Daftarkan usaha Anda dan sesuaikan kategori dengan mudah."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${mode === "login"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
                }`}
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${mode === "register"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
                }`}
            >
              Daftar Usaha Baru
            </button>
          </div>

          {/* Success Banner */}
          {registerSuccess && (
            <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-xs sm:text-sm animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>{registerSuccess}</div>
            </div>
          )}

          {/* Error Banner */}
          {(error || registerError) && (
            <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs sm:text-sm animate-in fade-in">
              <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="font-medium">{error || registerError}</div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: FORM LOGIN                                         */}
          {/* ========================================================= */}
          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Username / Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    placeholder="admin, barber, sport, atau kasir"
                    required
                    className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                    Lupa password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || isRedirecting}
                className="w-full mt-2 flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.99]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Memverifikasi...</span>
                  </div>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ========================================================= */}
          {/* TAB 2: FORM REGISTER MULTI-BUSINESS                       */}
          {/* ========================================================= */}
          {mode === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {/* Business Type Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  1. Pilih Jenis Usaha Anda
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {businessTypes.map((type) => {
                    const IconComponent = type.icon;
                    const isSelected = registerForm.businessType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setRegisterForm({ ...registerForm, businessType: type.id })}
                        className={`p-2.5 rounded-xl border text-left transition-all ${isSelected
                          ? `${type.color} ring-2 ring-indigo-500/30 shadow-xs`
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs">
                          <IconComponent className="w-3.5 h-3.5 shrink-0" />
                          <span>{type.label}</span>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5 truncate">{type.sublabel}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Nama Pemilik
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    placeholder="Contoh: Budi Santoso"
                    required
                    className="block w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Nama Toko / Arena / Usaha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Store className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={registerForm.storeName}
                    onChange={(e) => setRegisterForm({ ...registerForm, storeName: e.target.value })}
                    placeholder="Contoh: Master Barbershop / Champion Arena"
                    required
                    className="block w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                  Username Akun
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    placeholder="Contoh: championarena"
                    required
                    className="block w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="block w-full pl-8 pr-2.5 py-2 bg-white border border-gray-200 rounded-xl text-xs shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">
                    Konfirmasi
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="block w-full pl-8 pr-2.5 py-2 bg-white border border-gray-200 rounded-xl text-xs shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-gray-900 transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.99]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Mendaftarkan Usaha...</span>
                  </div>
                ) : (
                  <>
                    <span>Daftarkan Usaha & Kategori</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} FlexPOS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
