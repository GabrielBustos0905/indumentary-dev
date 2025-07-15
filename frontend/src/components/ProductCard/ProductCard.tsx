/* eslint-disable @next/next/no-img-element */
"use client"
import { cuotas, discount, formatPrice } from "@/lib/format-price";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export function ProductCard({ product }: { product: Product }) {
    const router = useRouter()
    const price = formatPrice(product.price)
    const priceCuota = cuotas(product.price, 3)
    const discountPrice = product.offer !== null ? discount(product.price, product.offer) : 0

    return (
        <Card key={product.slug} className="py-1 w-[250px] shadow-none border-none cursor-pointer" onClick={() => router.push(`/${product.slug}`)}>
            <CardContent className="relative flex flex-col justify-center px-1 py-1">
                <div className="relative overflow-hidden">
                    <img
                        src={product.images[0].url}
                        alt="Product image"
                        className="h-[363px] w-full"
                    />
                    {
                        product.images.length > 1 && (
                            <div className="absolute h-full w-full bg-black/20 flex items-center justify-center bottom-0  group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <img
                                    src={product.images[1].url}
                                    alt="Product image"
                                    className="h-[363px]"
                                />

                            </div>
                        )
                    }
                </div>
                {
                    product.offer !== null && product.offer > 0 && (
                        <div className="absolute top-2 left-2">
                            <Badge variant={"destructive"}>OFF  -%{product.offer}</Badge>
                        </div>
                    )
                }
                <h4 className="text-base text-gray-700 font-semibold uppercase mt-3 mb-2">{product.name}</h4>
                {
                    product.offer !== null && product.offer > 0 ? (
                        <div className="flex items-center gap-4">
                            <p className="text-base text-gray-400 font-semibold line-through">{price}</p>
                            <p className="text-base text-gray-700 font-semibold">{formatPrice(discountPrice)}</p>
                        </div>
                    ) : <p className="text-base text-gray-700 font-semibold">{price}</p>
                }
                <p className="text-sm text-gray-700 font-medium">3 cuotas sin interes de {priceCuota}</p>
            </CardContent>
        </Card>
    )
}