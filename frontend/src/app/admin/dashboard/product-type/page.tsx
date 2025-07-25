import { ProductTypeSection } from "@/components/Admin/Dashboard/ProductTypeSection";
import { Separator } from "@/components/ui/separator";

export default function ProductTypePage() {
    return (
        <div>
            <div className="flex flex-col gap-2 w-full">
                <h1 className="text-2xl font-bold text-gray-800">Tipo de Productos</h1>
                <Separator />
            </div>
            <ProductTypeSection />
        </div>
    )
}