import Image from "next/image"
import { CarouselBanner } from "./CarouselBanner"
import Link from "next/link"

export function Banner() {
    return (
        <div>
            <CarouselBanner />
            <section className="relative w-full h-[500px]">
                <Image
                    src="/banner.png"
                    alt="Banner"
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="/tu-imagen.png"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Nueva Colección</h1>
                    <p className="text-lg md:text-xl mb-6">Descubrí las últimas tendencias en moda</p>
                    <Link
                        href="/catalogo"
                        className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
                    >
                        Ver productos
                    </Link>
                </div>
            </section>
            <CarouselBanner direction="right" />
        </div>
    )
}