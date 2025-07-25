import { ProductProvider } from "@/contexts/ProductsContext/ProductsContext";
import { ProductTable } from "./ProductTable";
import { ProductFilters } from "./ProductFilters";
import { ProductSearch } from "@/components/ProductSearch";
import { CreateProduct } from "./ProductForm";

export function ProductSection() {
    return (
        <ProductProvider>
            <ProductFilters />
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <ProductSearch />
                <CreateProduct />
            </div>
            <ProductTable />
        </ProductProvider>
    )
}