
import { ProductInfo } from "@/components/ProductInfo";
import { Separator } from "@/components/ui/separator";
import { fetchProductById } from "@/services/product.service"

export default async function ProductInfoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await fetchProductById(slug)

    return (
        <div>
            <Separator />
            <ProductInfo product={product} />
        </div>
    )
}