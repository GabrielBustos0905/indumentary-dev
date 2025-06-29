import { ProductProvider } from "@/contexts/ProductsContext/ProductsContext";
import { ProductTable } from "./ProductTable";
import { ProductFilters } from "./ProductFilters";
import { ProductSearch } from "@/components/ProductSearch/ProductSearch";

export function ProductSection() {
    return (
        <ProductProvider>
            <ProductFilters />
            <ProductSearch />
            <ProductTable />
        </ProductProvider>
    )
}