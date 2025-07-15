
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Heart } from "lucide-react";
import { CarouselImages } from "./CarouselImages";
import { SizePicker } from "./SizePicker";
import { CardDescription } from "./CardDescription";
import { AddButton } from "./AddButton";
import { DescriptionAccordion } from "./DescriptionAccordion";

export function ProductInfo({ product }: { product: Product }) {

    return (
        <Card className="w-auto lg:px-32 border-none shadow-none">
            <CardContent className="flex flex-col jusify-center items-center md:flex-row md:justify-between p-8 gap-5">
                <div>
                    <CarouselImages images={product.images} />
                </div>
                <div className="w-full lg:ml-12 flex flex-col">
                    <CardDescription product={product} />
                    <div className="my-4">
                        <SizePicker />
                    </div>
                    <div className="flex items-center gap-2">
                        <AddButton product={product} />
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
    )
}