"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateProductForm } from "./CreateProductForm";

export function CreateProduct() {
    const [openDialog, setOpenDialog] = useState(false)
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>
                <div className="w-full cursor-pointer bg-[#1d1d1d] hover:bg-[#3b3b3b] rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300 px-4 py-2 text-white">
                    <Plus className="w-7 h-7" />
                    Añadir Producto
                </div>
            </DialogTrigger>
            <DialogContent aria-describedby="Add product" className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Añadir un producto nuevo</DialogTitle>
                    <CreateProductForm closeDialog={setOpenDialog} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}