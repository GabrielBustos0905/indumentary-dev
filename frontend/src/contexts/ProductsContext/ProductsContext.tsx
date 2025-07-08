"use client"

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback
} from "react"
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "@/services/product.service"
import { Product, ProductCreateInput, ProductUpdateInput } from "@/types/product"
import { ProductType } from "@/types/product"
import { fetchProductTypes } from "@/services/product-type.service"

interface ProductContextType {
    products: Product[]
    total: number
    page: number
    perPage: number
    totalPages: number
    loading: boolean
    reloadProducts: () => void
    error: string | null
    filters: Record<string, unknown>
    setFilters: (filters: Record<string, unknown>) => void
    fetchAllProducts: () => Promise<void>
    create: (data: ProductCreateInput) => Promise<void>
    update: (id: string, data: ProductUpdateInput) => Promise<void>
    remove: (id: string) => Promise<void>
    types: ProductType[]
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(12)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState<Record<string, unknown>>({
        page: 1,
        perPage: 12
    })
    const [types, setTypes] = useState<ProductType[]>([])

    const fetchAllProducts = useCallback(async () => {
        setLoading(true)
        try {
            const data = await fetchProducts(filters)
            setProducts(data.data)
            setTotal(data.total)
            setPage(data.page)
            setPerPage(data.perPage)
            setTotalPages(data.totalPages)
            setError(null)
        } catch {
            setError("Error al obtener productos")
        } finally {
            setLoading(false)
        }
    }, [filters])

    const reloadProducts = fetchAllProducts

    const create = async (productData: ProductCreateInput) => {
        await createProduct(productData)
        await fetchAllProducts()
    }

    const update = async (id: string, productData: ProductUpdateInput) => {
        await updateProduct(id, productData)
        await fetchAllProducts()
    }

    const remove = async (id: string) => {
        await deleteProduct(id)
        await fetchAllProducts()
    }

    const fetchTypes = useCallback(async () => {
        try {
            const data = await fetchProductTypes()
            setTypes(data)
        } catch {
            console.error("Error al obtener tipos de producto")
        }
    }, [])

    useEffect(() => {
        fetchAllProducts()
        fetchTypes()
    }, [fetchAllProducts, fetchTypes])

    return (
        <ProductContext.Provider
            value={{
                products,
                total,
                page,
                perPage,
                totalPages,
                loading,
                reloadProducts,
                error,
                filters,
                setFilters,
                fetchAllProducts,
                create,
                update,
                remove,
                types
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = (): ProductContextType => {
    const context = useContext(ProductContext)
    if (context === undefined) {
        throw new Error("useProduct debe usarse dentro de un ProductProvider")
    }
    return context
}
