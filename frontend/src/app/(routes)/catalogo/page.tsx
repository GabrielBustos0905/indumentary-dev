import { ProductsGrid } from "@/components/Catalogo";
import { Loader } from "@/components/Loader";
import { fetchProducts } from "@/services/product.service";

interface CatalogoPageProps {
    searchParams: {
        type?: string;
        size?: string;
        minPrice?: string;
        maxPrice?: string;
        q?: string; // search query
        page?: string;
    };
}

export default async function CatalogoPage({ params }: { params: Promise<CatalogoPageProps> }) {

    const products = await fetchProducts((await params).searchParams);

    if (products.data == undefined) return <Loader />

    return (
        <div>
            <section>
                <ProductsGrid products={products.data} />
            </section>
        </div>
    );
}

