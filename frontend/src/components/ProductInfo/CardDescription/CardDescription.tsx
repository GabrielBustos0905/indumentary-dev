import { Product } from "@/types/product";
import { Landmark, Truck } from "lucide-react";
import { cuotas, discount, formatPrice } from "@/lib/format-price";
import { Badge } from "@/components/ui/badge";

export function CardDescription({ product }: { product: Product }) {
    const price = formatPrice(product?.price)
    const priceCuota = cuotas(product?.price, 3)
    const discountPrice = product.offer !== null ? discount(product.price, product.offer) : 0

    return (
        <>
            <div className="flex items-center gap-2">
                <h1 className="text-4xl font-medium uppercase">{product?.name}</h1>
                {
                    product?.offer !== null && product.offer > 0 && (
                        <div className="">
                            <Badge variant={"destructive"}>OFF  -%{product?.offer}</Badge>
                        </div>
                    )
                }
            </div>
            <p className="text-sm text-gray-500 font-medium">3 cuotas sin interes de {priceCuota}</p>
            {
                product?.offer !== null && product.offer > 0 ? (
                    <div className="flex items-center gap-4 my-2">
                        <p className="text-xl text-gray-400 font-semibold line-through">{price}</p>
                        <p className="text-xl text-gray-700 font-semibold">{formatPrice(discountPrice)}</p>
                    </div>
                ) : <p className="text-xl text-gray-800 font-semibold my-2">{price}</p>
            }
            <p className="flex items-center gap-2 mt-8 text-sm">
                <span><Landmark strokeWidth={1} /></span>
                5% off pagando con transferencia bancaria
            </p>
            <p className="flex items-center gap-2 my-1 text-sm">
                <span><Truck strokeWidth={1} /></span>
                Envíos gratis en compras superiores a $28.000 a todo el país
            </p>
        </>
    )
}