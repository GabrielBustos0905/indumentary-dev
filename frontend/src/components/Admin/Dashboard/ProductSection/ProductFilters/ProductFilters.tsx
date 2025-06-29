'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useProduct } from "@/contexts/ProductsContext/ProductsContext"

const sizes = ["XS", "S", "M", "L", "XL", "39", "40", "41", "42"]

export const ProductFilters = () => {
    const { filters, setFilters, types } = useProduct()
    const [selectedType, setSelectedType] = useState("")
    const [selectedFeatured, setSelectedFeatured] = useState("")
    const [selectedSize, setSelectedSize] = useState("")

    useEffect(() => {
        setFilters({
            ...filters,
            typeId: selectedType || null,
            isFeatured: selectedFeatured === "" ? undefined : selectedFeatured === "true",
            size: selectedSize || undefined,
            page: 1,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedType, selectedFeatured, selectedSize])

    // console.log({ "Tipo": selectedType })
    return (
        <div className="flex flex-wrap gap-4 mb-4">
            {/* Tipo */}
            <div>
                <Label className="text-sm">Tipo</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            Todos
                        </SelectItem>
                        {types.map((type) => (
                            <SelectItem key={type.id} value={type.name}>
                                {type.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Destacado */}
            <div>
                <Label className="text-sm">Destacado</Label>
                <Select value={selectedFeatured} onValueChange={setSelectedFeatured}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            Todos
                        </SelectItem>
                        <SelectItem value="true">Sí</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Talle */}
            <div>
                <Label className="text-sm">Talle</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            Todos
                        </SelectItem>
                        {sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
