import { ProductTypeProvider } from "@/contexts/ProductTypeContext/ProductTypeContext";
import { ProductTypeTable } from "./ProductTypeTable";
import { CreateProductType } from "./ProductTypeForm";

export function ProductTypeSection() {
    return (
        <ProductTypeProvider>
            <CreateProductType />
            <ProductTypeTable />
        </ProductTypeProvider>
    )
}