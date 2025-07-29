'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserProfile } from '@/lib/user-profile'
import { Loader } from '../Loader'
import { UserType } from '@/types/user'

interface ProtectRouteProps {
    children: React.ReactNode
    allowedRoles: UserType[] | "loged"
    redirectIfLogged?: boolean
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
                if (!redirectIfLogged) {
                    router.replace('/auth/login')
                    return
                }
                // Usuario no logueado, ruta de auth, puede seguir
                setIsLoading(false)
                return
            }

            if (user && redirectIfLogged) {
                router.replace('/')
                return
            }

            if (
                !redirectIfLogged &&
                allowedRoles !== 'loged' &&
                !allowedRoles.includes(user.userType)
            ) {
                router.replace('/unauthorized')
                return
            }

            setIsLoading(false)
        }

        checkUser()
    }, [allowedRoles, redirectIfLogged, router])

    if (isLoading) return <Loader />

    return <>{children}</>
}
