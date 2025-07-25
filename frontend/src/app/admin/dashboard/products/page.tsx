import { ProductSection } from "@/components/Admin/Dashboard/ProductSection";
import { Separator } from "@/components/ui/separator";


export default function ProductsPage() {
    return (
        <div>
            <div className="flex flex-col gap-2 w-full mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
                <Separator />
            </div>
            <ProductSection />
        </div>
    )
}