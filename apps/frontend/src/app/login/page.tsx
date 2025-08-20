"use client";

import { useState } from "react";
import { login } from "../../../../backend/src/services/auth";


export default function LoginPage(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            console.log("Usuario logueado", res);
            // Redirigir a la página principal.
        } catch (error: unknown) {
            if(error instanceof Error){
                alert(error.message);
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
};


