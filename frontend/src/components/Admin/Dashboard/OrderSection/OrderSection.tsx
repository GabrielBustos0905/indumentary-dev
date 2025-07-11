import { OrderProvider } from "@/contexts/OrdersContext/OrdersContext";
import { OrderTable } from "./OrderTable";

export function OrderSection() {
    return (
        <OrderProvider>
            <OrderTable />
        </OrderProvider>
    )
}