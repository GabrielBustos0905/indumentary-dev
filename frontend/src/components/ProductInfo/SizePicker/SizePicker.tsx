"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '38', '39', '40', '41', '42', '43'];

export function SizePicker() {
    const [currentSize, setCurrentSize] = useState("")

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
                            onClick={() => setCurrentSize(size)}
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