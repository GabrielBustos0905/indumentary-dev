'use client'

import { useEffect, useState } from 'react'
import { Shirt, User, DollarSign } from 'lucide-react';

export function DashboardStats() {
    const [usersCount, setUsersCount] = useState<number | null>(null)
    const [productsCount, setProductsCount] = useState<number | null>(null)
    const [ordersCount, setOrdersCount] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchCounts() {
            try {
                const [usersRes, productsRes, ordersRes] = await Promise.all([
                    fetch('http://localhost:4000/users', { credentials: 'include' }),
                    fetch('http://localhost:4000/product', { credentials: 'include' }),
                    fetch('http://localhost:4000/order', { credentials: 'include' }),
                ])

                if (!usersRes.ok || !productsRes.ok || !ordersRes.ok) {
                    throw new Error('Error al obtener los datos')
                }

                const users = await usersRes.json()
                const products = await productsRes.json()
                const orders = await ordersRes.json()

                setUsersCount(users.length)
                setProductsCount(products.data.length)
                setOrdersCount(orders.length)
            } catch (err) {
                console.error(err)
                setError('No se pudieron cargar los datos')
            } finally {
                setLoading(false)
            }
        }

        fetchCounts()
    }, [])

    if (loading) return <p>Cargando datos...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-md">
            <div className="text-center p-4 border rounded hover:bg-gray-900 hover:text-white duration-300 transition-all cursor-pointer">
                <h3 className="text-lg font-semibold"><User /> Usuarios</h3>
                <p className="text-3xl">{usersCount}</p>
            </div>
            <div className="text-center p-4 border rounded hover:bg-gray-900 hover:text-white duration-300 transition-all cursor-pointer">
                <h3 className="text-lg font-semibold"><Shirt /> Productos</h3>
                <p className="text-3xl">{productsCount}</p>
            </div>
            <div className="text-center p-4 border rounded hover:bg-gray-900 hover:text-white duration-300 transition-all cursor-pointer">
                <h3 className="text-lg font-semibold"><DollarSign /> Ventas</h3>
                <p className="text-3xl">{ordersCount}</p>
            </div>
        </div>
    )
}
