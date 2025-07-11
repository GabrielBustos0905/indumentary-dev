"use client"

import { Loader } from "@/components/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useOrder } from "@/contexts/OrdersContext/OrdersContext";
import { formatPrice } from "@/lib/format-price";
import { DeleteOrder, UpdateOrder } from "../OrderForm";
import { ViewOrder } from "../ViewOrder";

export function OrderTable() {
    const { orders, loading } = useOrder();

    if (loading) {
        return <Loader />
    }

    return (
        <div className="overflow-x-auto rounded-lg border mr-4 my-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Items</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-6">
                                    No hay ordenes
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.items.length}</TableCell>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{formatPrice(order.total)}</TableCell>
                                    <TableCell>{order.user.name}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell className="space-x-2">
                                        <ViewOrder />
                                        <UpdateOrder orderId={order.id} orderStatus={order.status} />
                                        <DeleteOrder orderId={order.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}