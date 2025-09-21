"use client";

import Image from "next/image";

import { useState } from "react";
import { login } from "@/services/auth";

import loginImage from "@/assets/logo-login-eduplus.png"

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      alert("Inicio de sesión exitoso");
      console.log("Usuario logueado", res);
      // Redirigir a la página principal.
      window.location.href = "/";
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 text-black">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image 
            src= {loginImage}
            alt="Logo Institucional"
            className="h-60 w-auto"
          />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Portal Institucional
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Inicia sesión con tu correo institucional
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold p-3 rounded-lg hover:bg-blue-800 transition"
          >
            Ingresar
          </button>
        </form>

        {/* Link reset */}
        <div className="mt-4 text-center">
          <a href="/reset" className="text-sm text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} EduPlus📚. Todos los
        derechos reservados.
      </p>
    </div>
  );
}
