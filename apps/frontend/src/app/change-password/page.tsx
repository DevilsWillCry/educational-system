"use client";

import { useState } from "react";
import { changePassword } from "@/services/auth";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      return alert("Las contraseñas no coinciden");
    }
    try {
      await changePassword(password);
      alert("Contraseña actualizada correctamente.");
      // redirigir a login
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
      <h1 className="text-xl font-bold text-center">Cambiar contraseña</h1>

      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Guardar
      </button>
    </form>
  );
}
