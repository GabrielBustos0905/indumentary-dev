/* eslint-disable @next/next/no-img-element */
"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useProductType } from "@/contexts/ProductTypeContext/ProductTypeContext"
import { DeleteProductType, UpdateProductType } from "../ProductTypeForm"
import { Loader } from "@/components/Loader"

export function ProductTypeTable() {
    const { types, loading } = useProductType()

    if (loading) {
        return <Loader />
    }

    return (
        <div className="overflow-x-auto rounded-lg border my-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripcion</TableHead>
                        <TableHead>Imagen</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        types.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-6">
                                    No hay tipo de producto
                                </TableCell>
                            </TableRow>
                        ) : (
                            types.map((type) => (
                                <TableRow key={type.id}>
                                    <TableCell>{type.name}</TableCell>
                                    <TableCell className="max-w-[200px] truncate whitespace-nowrap overflow-hidden">{type.description}</TableCell>
                                    <TableCell>
                                        <img
                                            src={type.imageUrl || "/placeholder-image.jpg"}
                                            alt={type.name}
                                            className="w-[60px] h-[60px] object-cover rounded"
                                        />
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <UpdateProductType productType={type} />
                                        <DeleteProductType productId={type.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}