"use client";

import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    CartesianGrid, ResponsiveContainer, Legend
} from "recharts";
import { Button } from "@/components/ui/button";
import { DailyStats, Order } from "./SalesChart.types";

export function SalesChart() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [viewMode, setViewMode] = useState<"day" | "week">("day");
    const [data, setData] = useState<DailyStats[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch("http://localhost:4000/order", {
                credentials: "include",
            });
            const ordersData: Order[] = await res.json();
            setOrders(ordersData);
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const grouped: Record<string, DailyStats> = {};

        orders.forEach((order) => {
            const dateObj = new Date(order.createdAt);

            const key = viewMode === "day"
                ? dateObj.toISOString().split("T")[0]
                : getWeekKey(dateObj); // Año-Semana

            if (!grouped[key]) {
                grouped[key] = { date: key, totalRevenue: 0, totalUnits: 0 };
            }

            order.items.forEach((item) => {
                grouped[key].totalRevenue += item.unitPrice * item.quantity;
                grouped[key].totalUnits += item.quantity;
            });
        });

        const sorted = Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
        setData(sorted);
    }, [orders, viewMode]);

    const getWeekKey = (date: Date) => {
        const year = date.getFullYear();
        const jan1 = new Date(year, 0, 1);
        const days = Math.floor((+date - +jan1) / (1000 * 60 * 60 * 24));
        const week = Math.ceil((days + jan1.getDay() + 1) / 7);
        return `${year}-W${week}`;
    };

    return (
        <div className="w-full h-[420px] p-4 rounded-2xl bg-white shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Ventas por {viewMode === "day" ? "día" : "semana"}</h2>
                <Button
                    onClick={() => setViewMode(viewMode === "day" ? "week" : "day")}
                    variant="outline"
                >
                    Cambiar a vista {viewMode === "day" ? "semanal" : "diaria"}
                </Button>
            </div>

            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="totalUnits" fill="#82ca9d" name="Productos Vendidos" />
                    <Bar yAxisId="right" dataKey="totalRevenue" fill="#8884d8" name="Ingresos ($)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
