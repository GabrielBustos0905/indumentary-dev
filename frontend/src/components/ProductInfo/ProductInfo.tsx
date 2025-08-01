"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Heart } from "lucide-react";
import { CarouselImages } from "./CarouselImages";
import { SizePicker } from "./SizePicker";
import { CardDescription } from "./CardDescription";
import { DescriptionAccordion } from "./DescriptionAccordion";
import { useState } from "react";
import { useCartStore } from "@/hooks/use-cart";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function ProductInfo({ product }: { product: Product }) {
    const [size, setSize] = useState("");
    const addItem = useCartStore((state) => state.addItem); // ✅

    const addToCart = () => {
        if (!size) {
            toast.error("Por favor seleccioná un talle.");
            return;
        }

        addItem({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            size,
            quantity: 1,
            price: product.offer
                ? product.price * (1 - product.offer / 100)
                : product.price,
            imageUrl: product.images[0]?.url ?? "",
        });

        toast.success("Producto añadido al carrito");
    };

    return (
        <Card className="w-auto lg:px-32 border-none shadow-none">
            <CardContent className="flex flex-col jusify-center items-center md:flex-row md:justify-between p-8 gap-5">
                <div>
                    <CarouselImages images={product.images} />
                </div>
                <div className="w-full lg:ml-12 flex flex-col">
                    <CardDescription product={product} />
                    <div className="my-4">
                        <SizePicker setSize={setSize} productSize={product.availableSizes} />
                    </div>
                    <div className="flex items-center gap-2">
                        {
                            product.stock === 0 ? (
                                <p className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary/90 text-primary-foreground shadow-xs ">Sin stock</p>
                            ) : (
                                <Button onClick={addToCart} className="uppercase text-sm w-full">
                                    Añadir al carrito
                                </Button>
                            )
                        }
                        <Heart
                            strokeWidth={1}
                            size={36}
                            className="transition duration-300 cursor-pointer hover:fill-primary/50 stroke-primary"
                        />
                    </div>
                    <DescriptionAccordion description={product.description || ""} />
                </div>
            </CardContent>
        </Card>
    );
}
