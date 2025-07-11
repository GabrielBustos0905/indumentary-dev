"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { updateOrderStatusSchema } from "@/schemas/order.schema";
import { OrderStatus } from "@/types/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react"; // asegurate que esté bien importado
import { toast } from "sonner";
import { useOrder } from "@/contexts/OrdersContext/OrdersContext";

interface UpdateOrderFormProps {
    closeDialog: (open: boolean) => void;
    orderId: string;
    orderStatus: OrderStatus;
}

const statusList: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "CANCELLED"];

export function UpdateOrderForm(props: UpdateOrderFormProps) {
    const { closeDialog, orderId, orderStatus } = props;
    const { updateStatus } = useOrder();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof updateOrderStatusSchema>>({
        resolver: zodResolver(updateOrderStatusSchema),
        defaultValues: {
            status: orderStatus
        }
    });

    const onSubmit = (values: z.infer<typeof updateOrderStatusSchema>) => {
        startTransition(() => {
            updateStatus(orderId, values.status)
                .then(() => {
                    toast.success("Estado actualizado correctamente");
                    closeDialog(false);
                })
                .catch(() => {
                    toast.error("Error al actualizar estado");
                });
        });
    };

    return (
        <div className="grid gap-4 py-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <div className="flex flex-wrap gap-2">
                                        {statusList.map((statu) => (
                                            <Button
                                                key={statu}
                                                type="button"
                                                variant={field.value === statu ? "default" : "outline"}
                                                onClick={() => field.onChange(statu)}
                                                disabled={isPending}
                                            >
                                                {statu}
                                            </Button>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Guardar cambios
                    </Button>
                </form>
            </Form>
        </div>
    );
}
