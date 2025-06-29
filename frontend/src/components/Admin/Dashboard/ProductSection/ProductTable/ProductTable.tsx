"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { useProduct } from "@/contexts/ProductsContext/ProductsContext"


export function ProductTable() {
    const { products } = useProduct()

    return (
        <div className="overflow-x-auto rounded-lg border mr-4 my-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Destacado</TableHead>
                        <TableHead>Descuento</TableHead>
                        <TableHead>Talles</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-6">
                                No hay productos
                            </TableCell>
                        </TableRow>
                    ) : (
                        products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.type.name}</TableCell>
                                <TableCell>
                                    {product.isFeatured ? "Sí" : "No"}
                                </TableCell>
                                <TableCell>
                                    {product.offer > 0 ? `${product.offer}%` : "-"}
                                </TableCell>
                                <TableCell>
                                    {product.availableSizes.length > 0
                                        ? product.availableSizes.join(", ")
                                        : "-"}
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => { }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => { }}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
