"use client"

import { useCartStore } from "@/hooks/use-cart"
import { ShoppingCart as Cart } from "lucide-react"
import { CartContent } from "./CartContent"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog"

export function ShoppingCart() {
    const { items } = useCartStore()

    return (
        <Dialog>
            <DialogTrigger>
                <div className="relative flex gap-1 items-center">
                    <Cart strokeWidth="1.5" className="cursor-pointer" />
                    {items.length > 0 && (
                        <span className="absolute -bottom-1 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-sm">
                            <p className="text-center">{items.length}</p>
                        </span>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent
                className="fixed top-0 right-0 left-auto translate-x-0 translate-y-0 h-screen w-full max-w-md border-l bg-background shadow-lg z-50 transition-transform duration-300
             data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 animate-in slide-in-from-right"
            // si querés ocultar el botón de cerrar
            >
                <div className="flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="flex gap-2 items-center">
                            <Cart strokeWidth="2" />
                            Shopping Cart
                        </DialogTitle>
                    </div>
                    <div className="overflow-y-auto flex-1 mt-4">
                        {
                            items.length === 0 ? (
                                <p className="text-center mt-16 text-lg font-semibold text-gray-500">No hay productos en el carrito!</p>
                            ) : <CartContent />
                        }
                    </div>
                </div>
            </DialogContent>

        </Dialog>
    )
}
