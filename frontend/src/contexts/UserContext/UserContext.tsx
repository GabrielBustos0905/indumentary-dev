"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";
import { fetchUsers, fetchUserById } from "@/services/user.service";
import { User } from "@/types/user";

interface UserContextType {
    users: User[];
    loading: boolean;
    error: string | null;
    getUserById: (id: string) => Promise<User | null>;
    refetchUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchUsers();
            setUsers(data);
            setError(null);
        } catch {
            setError("Error al obtener usuarios");
        } finally {
            setLoading(false);
        }
    }, []);

    const getUserById = async (id: string): Promise<User | null> => {
        try {
            const user = await fetchUserById(id);
            return user;
        } catch (err) {
            console.error("Error al obtener usuario:", err);
            return null;
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    return (
        <UserContext.Provider
            value={{
                users,
                loading,
                error,
                getUserById,
                refetchUsers: fetchAllUsers,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser debe usarse dentro de un UserProvider");
    }
    return context;
};
