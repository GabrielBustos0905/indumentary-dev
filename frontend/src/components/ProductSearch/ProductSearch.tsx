"use client"

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { useProduct } from "@/contexts/ProductsContext/ProductsContext"

export function ProductSearch() {
    const { filters, setFilters } = useProduct()
    const [search, setSearch] = useState("")

    // Actualizamos el filtro cuando el usuario deja de tipear 500ms (debounce)
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setFilters({
                ...filters,
                q: search,
                page: 1 // Reseteamos a la primer página cuando se busca
            })
        }, 500)

        return () => clearTimeout(delayDebounce)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return (
        <div className="relative w-full max-w-sm mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
            />
        </div>
    )
}
