"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    userType: string;
    createdAt?: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children,
    initialUser,
}: {
    children: ReactNode;
    initialUser: User | null;
}) {
    const [user, setUser] = useState<User | null>(initialUser);

    const logout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (!res.ok) throw new Error("Error al cerrar sesión");

            setUser(null);

            // Redireccionar al login o al home (lo que prefieras)
            window.location.href = "/auth/login";
        } catch (error) {
            console.error("Error en logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
}
