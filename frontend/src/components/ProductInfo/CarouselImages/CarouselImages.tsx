/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ProductImage } from "@/types/product"

export function CarouselImages({ images }: { images: ProductImage[] }) {

    return (
        <Carousel className="w-[400px] lg:w-[440px]">
            <CarouselContent>
                {
                    images.map((image) => (
                        <CarouselItem key={image.id} className="group">
                            <img
                                src={image.url}
                                alt="Image product"
                                className="h-[500px] w-full"
                            />
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
        </Carousel>
    )
}