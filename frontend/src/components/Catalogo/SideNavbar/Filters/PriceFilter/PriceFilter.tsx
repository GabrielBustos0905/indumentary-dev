"use client";

import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function PriceFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const minFromURL = parseInt(searchParams.get("minPrice") || "0", 10);
    const maxFromURL = parseInt(searchParams.get("maxPrice") || "200000", 10);

    const [priceRange, setPriceRange] = useState<[number, number]>([
        minFromURL,
        maxFromURL,
    ]);

    // Cada vez que cambia el rango, actualizamos los params después de un pequeño debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (priceRange[0] > 0) {
                params.set("minPrice", priceRange[0].toString());
            } else {
                params.delete("minPrice");
            }

            if (priceRange[1] < 100000) {
                params.set("maxPrice", priceRange[1].toString());
            } else {
                params.delete("maxPrice");
            }

            router.push(`/catalogo?${params.toString()}`);
        }, 400); // Debounce para no spamear el router

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceRange]);

    return (
        <div className="space-y-3 w-full">
            <h4 className="text-sm font-semibold uppercase">Rango de precios</h4>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
            </div>
            <Slider
                min={0}
                max={200000}
                step={1000}
                value={priceRange}
                onValueChange={(value: [number, number]) => setPriceRange(value)}
            />
        </div>
    );
}
