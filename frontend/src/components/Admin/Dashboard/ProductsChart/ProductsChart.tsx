'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Order } from './ProductsChart.type'

export function ProductsChart() {
    const [orders, setOrders] = useState<Order[]>([])
    const [view, setView] = useState<'top' | 'bottom'>('top')
    const [mode, setMode] = useState<'day' | 'week'>('day')

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("http://localhost:4000/order", {
                    credentials: "include",
                });
                const ordersData: Order[] = await res.json();
                setOrders(ordersData);
            } catch (err) {
                console.error('Error al traer órdenes:', err)
            }
        }

        fetchOrders()
    }, [])

    const groupBy = (dateStr: string) => {
        const date = new Date(dateStr)
        return mode === 'day'
            ? date.toLocaleDateString('es-AR')
            : `${date.getFullYear()}-S${getWeek(date)}`
    }

    const getWeek = (date: Date) => {
        const first = new Date(date.getFullYear(), 0, 1)
        const diff = (+date - +first + (first.getTimezoneOffset() - date.getTimezoneOffset()) * 60000) / 86400000
        return Math.ceil((diff + first.getDay() + 1) / 7)
    }

    const calculateData = () => {
        const productMap = new Map<string, { name: string; quantity: number; revenue: number }>()

        orders.forEach((order) => {
            const key = groupBy(order.createdAt)

            order.items.forEach((item) => {
                const productKey = `${item.product.name}-${key}`
                const current = productMap.get(productKey) || { name: item.product.name, quantity: 0, revenue: 0 }

                productMap.set(productKey, {
                    name: item.product.name,
                    quantity: current.quantity + item.quantity,
                    revenue: current.revenue + item.quantity * item.unitPrice
                })
            })
        })

        const grouped = Array.from(productMap.values())

        const sorted = [...grouped].sort((a, b) => view === 'top'
            ? b.quantity - a.quantity
            : a.quantity - b.quantity
        )

        return sorted.slice(0, 10)
    }

    const data = calculateData()

    return (
        <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow">
            <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
                <h2 className="text-xl font-semibold">
                    {view === 'top' ? 'Top 10 productos vendidos' : 'Bottom 10 productos menos vendidos'} ({mode === 'day' ? 'por día' : 'por semana'})
                </h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setView(view === 'top' ? 'bottom' : 'top')}>
                        Ver {view === 'top' ? 'menos vendidos' : 'más vendidos'}
                    </Button>
                    <Button variant="outline" onClick={() => setMode(mode === 'day' ? 'week' : 'day')}>
                        Cambiar a {mode === 'day' ? 'semanal' : 'diario'}
                    </Button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="quantity" fill="#82ca9d" name="Unidades" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#8884d8" name="Ingresos ($)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
