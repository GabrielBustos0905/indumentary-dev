"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye } from "lucide-react"
import { useState } from "react";

export function ViewOrder() {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>
                <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5">
                    <Eye className="h-4 w-4" />
                </div>
            </DialogTrigger>
            <DialogContent aria-describedby="Ver orden" className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Ver Orden</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}