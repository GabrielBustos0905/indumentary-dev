"use client"

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode
} from "react"
import {
    fetchOrders,
    updateOrderStatus,
    deleteOrder,
    getOrderById
} from "@/services/order.service"
import { Order, OrderStatus } from "@/types/order"

interface OrderContextType {
    orders: Order[]
    fetchAllOrders: () => Promise<void>
    reloadOrders: () => void
    getById: (id: string) => Promise<Order | null>
    updateStatus: (id: string, status: OrderStatus) => Promise<void>
    remove: (id: string) => Promise<void>
    loading: boolean
    error: string | null
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchAllOrders = useCallback(async () => {
        setLoading(true)
        try {
            const data = await fetchOrders()
            setOrders(data)
        } catch {
            setError("Error al cargar órdenes")
        } finally {
            setLoading(false)
        }
    }, [])

    const reloadOrders = fetchAllOrders

    const getById = async (id: string): Promise<Order | null> => {
        try {
            const order = await getOrderById(id)
            return order
        } catch (err) {
            console.error("Error al buscar orden por ID:", err)
            return null
        }
    }

    const updateStatus = async (id: string, status: OrderStatus) => {
        await updateOrderStatus(id, status)
        await fetchAllOrders()
    }

    const remove = async (id: string) => {
        await deleteOrder(id)
        await fetchAllOrders()
    }

    useEffect(() => {
        fetchAllOrders()
    }, [fetchAllOrders])

    return (
        <OrderContext.Provider
            value={{
                orders,
                fetchAllOrders,
                reloadOrders,
                getById,
                updateStatus,
                remove,
                loading,
                error
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = (): OrderContextType => {
    const context = useContext(OrderContext)
    if (!context) {
        throw new Error("useOrder debe usarse dentro de un OrderProvider")
    }
    return context
}
