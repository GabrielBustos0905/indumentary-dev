// components/ProtectRoute.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserProfile } from '@/lib/user-profile'
import { Loader } from '../Loader'
import { UserType } from '@/types/user'

export function ProtectRoute({
    children,
    allowedRoles,
}: {
    children: React.ReactNode
    allowedRoles: UserType[]
}) {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function checkUser() {
            const user = await getUserProfile()

            if (!user) {
                const currentPath = window.location.pathname
                router.replace(`/auth/login?redirect=${encodeURIComponent(currentPath)}`)
            }

            if (!allowedRoles.includes(user.userType)) {
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
