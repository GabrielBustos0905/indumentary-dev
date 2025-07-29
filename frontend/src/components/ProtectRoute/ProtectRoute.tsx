'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserProfile } from '@/lib/user-profile'
import { Loader } from '../Loader'
import { UserType } from '@/types/user'

interface ProtectRouteProps {
    children: React.ReactNode
    allowedRoles: UserType[] | "loged"
    redirectIfLogged?: boolean // nuevo prop opcional
}

export function ProtectRoute({
    children,
    allowedRoles,
    redirectIfLogged = false,
}: ProtectRouteProps) {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function checkUser() {
            const user = await getUserProfile()

            if (!user) {
                // Si no está logueado y no es ruta auth, redirige a login
                if (!redirectIfLogged) {
                    router.replace('/auth/login')
                }
                return
            }

            // Si está logueado y queremos evitar acceso a rutas de auth
            if (user && redirectIfLogged) {
                router.replace('/')
                return
            }

            if (!redirectIfLogged && allowedRoles !== 'loged' && !allowedRoles.includes(user.userType)) {
                router.replace('/unauthorized')
                return
            }

            setIsLoading(false)
        }

        checkUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) return <Loader />

    return <>{children}</>
}
