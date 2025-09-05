"use client";
import Navbar from "@/components/semantic/Navbar";
import { login } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { accessToken, setAuth } = useAuthStore();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.data.token) {
        setAuth(response.data.token); // update state
        console.log("Access Token dari response:", response.data.token);

        // jangan berharap accessToken langsung berubah
        // kalau mau lihat token terbaru, ambil lagi dari store
        console.log(
          "Access Token dari store:",
          useAuthStore.getState().accessToken
        );
      }
      toast.success("Login berhasil!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login gagal!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                email
              </label>
              <input
                type="email"
                className="mt-1 w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                className="mt-1 w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
