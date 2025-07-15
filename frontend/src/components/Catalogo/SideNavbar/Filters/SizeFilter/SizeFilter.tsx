"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '38', '39', '40', '41', '42', '43'];

export function SizeFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSize = searchParams.get("size");

    const handleClick = (size: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (currentSize === size) {
            params.delete("size");
        } else {
            params.set("size", size);
        }

        router.push(`/catalogo?${params.toString()}`);
    };

    return (
        <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase">Tamaño</h4>
            <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => {
                    const isSelected = size === currentSize;
                    return (
                        <Button
                            key={size}
                            variant={isSelected ? "default" : "outline"}
                            onClick={() => handleClick(size)}
                            className="px-3 py-1 text-xs"
                        >
                            {size}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
