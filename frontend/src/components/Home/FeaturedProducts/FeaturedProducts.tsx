import { ProductCard } from "@/components/ProductCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { getFeaturedProducts } from "@/lib/get-products"

export async function FeaturedProducts() {
    const data = await getFeaturedProducts()

    return (
        <div className="w-screen md:max-w-7xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8 uppercase">Productos Destacados</h3>
            <Carousel>
                <CarouselContent>
                    {
                        data.length > 0 ? data.map((product) => (
                            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4 group">
                                <div className="p-1 m-2 flex justify-center">
                                    <ProductCard product={product} />
                                </div>
                            </CarouselItem>
                        )) : <></>
                    }
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
            </Carousel>
        </div>
    )
}