// context/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getUserProfile } from '@/lib/user-profile'
import { useRouter } from 'next/navigation'
import { type User } from '@/types/user'

type AuthContextType = {
    user: User | null
    isLoading: boolean
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    logout: async () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function loadUser() {
            const res = await getUserProfile()
            setUser(res)
            setIsLoading(false)
        }

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

    return (
        <AuthContext.Provider value={{ user, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
