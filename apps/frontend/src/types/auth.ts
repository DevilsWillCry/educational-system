// Datos que envía el usuario al hacer login
export interface LoginPayload {
  email: string;
  password: string;
}

// Respuesta del backend al autenticarse
export interface AuthResponse {
  token: string; // JWT u otro tipo de token
  user: {
    id: string;
    email: string;
    role: "student" | "teacher" | "admin";
    name?: string;
  };
}
