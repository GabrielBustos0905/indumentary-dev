import { OrderSection } from "@/components/Admin/Dashboard/OrderSection";

export default function OrdersPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Pedidos</h1>
            <OrderSection />
        </div>
    )
}