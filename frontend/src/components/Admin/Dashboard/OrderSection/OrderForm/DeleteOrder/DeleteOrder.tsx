"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useOrder } from "@/contexts/OrdersContext/OrdersContext";
import { Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface DeleteOrderProps {
    orderId: string;
}

export function DeleteOrder({ orderId }: DeleteOrderProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { remove } = useOrder();

    const handleDelete = () => {
        startTransition(() => {
            remove(orderId)
                .then(() => {
                    toast.warning("Orden eliminada correctamente");
                    setOpenDialog(false);
                })
                .catch(() => {
                    toast.error("Error al eliminar orden");
                });
        });
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <Trash className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent
                aria-describedby="Eliminar orden"
                className="max-h-[90vh] overflow-y-auto"
            >
                <DialogHeader>
                    <DialogTitle>¿Estás seguro?</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                    Esta acción eliminará la orden permanentemente. Esta acción no se puede deshacer.
                </p>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setOpenDialog(false)}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
                        Eliminar orden
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
