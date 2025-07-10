"use client"

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react"
import {
    fetchProductTypes,
    createProductType,
    updateProductType,
    deleteProductType
} from "@/services/product-type.service"
import { ProductType, ProductTypeCreateInput, ProductTypeUpdateInput } from "@/types/product-type"

interface ProductTypeContextType {
    types: ProductType[]
    loading: boolean
    error: string | null
    fetchTypes: () => Promise<void>
    reloadProductTypes: () => void
    create: (data: ProductTypeCreateInput) => Promise<void>
    update: (id: string, data: ProductTypeUpdateInput) => Promise<void>
    remove: (id: string) => Promise<void>
}

const ProductTypeContext = createContext<ProductTypeContextType | undefined>(undefined)

export const ProductTypeProvider = ({ children }: { children: ReactNode }) => {
    const [types, setTypes] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchTypes = useCallback(async () => {
        setLoading(true)
        try {
            const data = await fetchProductTypes()
            setTypes(data)
            setError(null)
        } catch {
            setError("Error al obtener tipos de producto")
        } finally {
            setLoading(false)
        }
    }, [])

    const reloadProductTypes = fetchTypes

    const create = async (data: ProductTypeCreateInput) => {
        await createProductType(data)
        await fetchTypes()
    }

    const update = async (id: string, data: ProductTypeUpdateInput) => {
        await updateProductType(id, data)
        await fetchTypes()
    }

    const remove = async (id: string) => {
        await deleteProductType(id)
        await fetchTypes()
    }

    useEffect(() => {
        fetchTypes()
    }, [fetchTypes])

    return (
        <ProductTypeContext.Provider
            value={{
                types,
                loading,
                error,
                fetchTypes,
                reloadProductTypes,
                create,
                update,
                remove
            }}
        >
            {children}
        </ProductTypeContext.Provider>
    )
}

export const useProductType = (): ProductTypeContextType => {
    const context = useContext(ProductTypeContext)
    if (context === undefined) {
        throw new Error("useProductType debe usarse dentro de un ProductTypeProvider")
    }
    return context
}
