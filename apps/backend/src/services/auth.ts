import { LoginPayload, AuthResponse } from "../../../frontend/src/types/auth";

export async function login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if(!response.ok) throw new Error("Credenciales inválidas");
    return await response.json();
}


export async function resetPassword(email: string){
    const response = await fetch("http://localhost:3000/api/auth/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    if(!response.ok) throw new Error("Error al enviar el correo de restablecimiento");
    return await response.json();
}


export async function changePassword(password: string){
    const response = await fetch("http://localhost:3000/api/auth/change-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
    });
    if(!response.ok) throw new Error("Error al enviar el correo de restablecimiento");
    return await response.json();
}