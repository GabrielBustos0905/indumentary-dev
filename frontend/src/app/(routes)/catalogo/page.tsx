import { ProductPagination, ProductsGrid } from "@/components/Catalogo";
import { Loader } from "@/components/Loader";
import { fetchProducts } from "@/services/product.service";


export default async function CatalogoPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const filters = await searchParams
    const products = await fetchProducts(filters);

    if (products.data.length === 0) return <Loader />;

    return (
        <div className="w-full flex justify-center">
            <section>
                <ProductsGrid products={products.data} />
                <ProductPagination page={products.page} totalPages={products.totalPages} />
            </section>
        </div>
    );
}



