import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";

export function ProductsGrid({ products }: { products: Product[] }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 justify-center">
            {
                products?.map((product) => (
                    <div key={product.id} className="p-1 m-2">
                        <ProductCard product={product} />
                    </div>
                ))
            }
        </div>
    )
}