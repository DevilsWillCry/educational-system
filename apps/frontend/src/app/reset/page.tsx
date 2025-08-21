"use client";

import { useState } from "react";
import { resetPassword } from "@/services/auth";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      alert("Se ha enviado un enlace de recuperación a tu correo.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg text-black"
    >
      <h1 className="text-xl font-bold text-center">Recuperar contraseña</h1>

      <input
        type="email"
        placeholder="Correo institucional"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Enviar enlace
      </button>
    </form>
  );
}
