"use client"

import { deleteProduct } from "@/actions/product";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useProduct } from "@/contexts/ProductsContext/ProductsContext";
import { Trash } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner";

export function DeleteProduct({ productId }: { productId: string }) {
    const [openDialog, setOpenDialog] = useState(false);
    const { reloadProducts } = useProduct()

    const onRemove = async () => {
        try {
            const result = await deleteProduct(productId);

            if (result?.error) {
                toast.error(result.error);
                return;
            }

            toast.success("Producto eliminado correctamente");
            reloadProducts()
            setOpenDialog(false);
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            toast.error("Ocurrió un error al eliminar el producto");
        }
    };


    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>
                <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring  focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5">
                    <Trash className="h-4 w-4" />
                </div>
            </DialogTrigger>
            <DialogContent aria-describedby="Eliminar producto" className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>¿Estás seguro?</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                    Esta acción eliminará el producto permanentemente. Esta acción no se puede deshacer.
                </p>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setOpenDialog(false)}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={onRemove}>
                        Eliminar producto
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}