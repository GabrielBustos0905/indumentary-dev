import { OrderSection } from "@/components/Admin/Dashboard/OrderSection";
import { Separator } from "@/components/ui/separator";

export default function OrdersPage() {
    return (
        <div>
            <div className="flex flex-col gap-2 w-full mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Ordenes</h1>
                <Separator />
            </div>
            <OrderSection />
        </div>
    )
}