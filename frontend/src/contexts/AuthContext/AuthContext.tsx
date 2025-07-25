'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getUserProfile } from '@/lib/user-profile'
import { useRouter } from 'next/navigation'
import { type User } from '@/types/user'

type AuthContextType = {
    user: User | null
    isLoading: boolean
    logout: () => Promise<void>
    refetchUser: () => Promise<void> // ✅ nueva función
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    logout: async () => { },
    refetchUser: async () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const loadUser = async () => {
        const res = await getUserProfile()
        setUser(res)
        setIsLoading(false)
    }

    useEffect(() => {
        loadUser()
    }, [])

    const logout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            })

            setUser(null)
            router.push('/auth/login')
        } catch (error) {
            console.error('Error al hacer logout:', error)
        }
    }

    const refetchUser = async () => {
        setIsLoading(true)
        await loadUser()
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, logout, refetchUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
