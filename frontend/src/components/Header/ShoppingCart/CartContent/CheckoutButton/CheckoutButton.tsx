'use client'

import { paidOrder } from '@/actions/paid-order'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts'
import { useCartStore } from '@/hooks/use-cart'
import { useState, useTransition } from 'react'

export function CheckoutButton() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    const { items } = useCartStore()
    const { user } = useAuth()

    const handleCheckout = () => {
        startTransition(async () => {
            try {
                if (!user) {
                    setError("Loguearse antes de comprar!")
                }
                const initPoint = await paidOrder(items)
                window.location.href = initPoint // Redirige a MercadoPago
            } catch (err) {
                setError('Hubo un error al iniciar el pago')
                console.error(err)
            }
        })
    }

    return (
        <div className="flex flex-col items-center justify-center w-full mt-3">
            <Button
                onClick={handleCheckout}
                disabled={isPending}
                className="w-full"
            >
                {isPending ? 'Redirigiendo...' : 'Comprar'}
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    )
}
