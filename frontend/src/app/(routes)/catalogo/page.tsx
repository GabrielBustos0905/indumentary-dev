import { ProductsGrid } from "@/components/Catalogo";
import { Loader } from "@/components/Loader";
import { fetchProducts } from "@/services/product.service";

// interface CatalogoPageProps {
//     searchParams: {
//         type?: string;
//         size?: string;
//         minPrice?: string;
//         maxPrice?: string;
//         q?: string; // search query
//         page?: string;
//     };
// }

// export default async function CatalogoPage({ params }: { params: Promise<CatalogoPageProps> }) {

//     const products = await fetchProducts((await params).searchParams);

//     if (products.data.length === 0) return <Loader />

//     console.log(params)

//     return (
//         <div>
//             <section>
//                 <ProductsGrid products={products.data} />
//             </section>
//         </div>
//     );
// }

// import { ProductsGrid } from "@/components/Catalogo";
// import { Loader } from "@/components/Loader";
// import { fetchProducts } from "@/services/product.service";

// interface CatalogoPageProps {
//     searchParams: {
//         typeId?: string;
//         size?: string;
//         minPrice?: string;
//         maxPrice?: string;
//         q?: string; // search query
//         page?: string;
//     };
// }

// export default async function CatalogoPage({ searchParams }: { searchParams: Promise<CatalogoPageProps> }) {
//     const products = await fetchProducts((await searchParams).searchParams);

//     if (products.data.length === 0) return <Loader />;

//     return (
//         <div>
//             <section>
//                 <ProductsGrid products={products.data} />
//             </section>
//         </div>
//     );
// }

export default async function CatalogoPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const filters = await searchParams
    const products = await fetchProducts(filters);

    if (products.data.length === 0) return <Loader />;

    return (
        <div>
            <section>
                <ProductsGrid products={products.data} />
            </section>
        </div>
    );
}



