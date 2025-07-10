/* eslint-disable @next/next/no-img-element */
import { createProductType } from "@/actions/product-type";
import { FormError } from "@/components/Auth/FormError";
import { FormSuccess } from "@/components/Auth/FormSuccess";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProductType } from "@/contexts/ProductTypeContext/ProductTypeContext";
import { createProductTypeSchema } from "@/schemas/product-type.schema";
import { uploadImage } from "@/services/cloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface CreateProductTypeFormProps {
    closeDialog: (open: boolean) => void;
}

export function CreateProductTypeForm(props: CreateProductTypeFormProps) {
    const { reloadProductTypes } = useProductType();

    const { closeDialog } = props;
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof createProductTypeSchema>>({
        resolver: zodResolver(createProductTypeSchema),
        defaultValues: {
            name: "",
            description: "",
            imageUrl: ""
        }
    });

    const onSubmit = (values: z.infer<typeof createProductTypeSchema>) => {
        startTransition(() => {
            createProductType(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                        toast.error(data.error);
                        return;
                    }

                    setSuccess(data.success);
                    toast.success("Tipo de producto añadido!");

                    // ✅ solo se llama si todo salió bien
                    reloadProductTypes()
                    closeDialog(false);
                })
                .catch((err) => {
                    console.error("Error creando producto", err);
                    toast.error("Ocurrió un error al crear el producto");
                });
        });
    }

    return (
        <div className="grid gap-4 py-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Nombre"
                                        type="text"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escribí los detalles del tipo producto, material, características, etc."
                                        className="min-h-[100px]"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="imageUrl" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagen</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            disabled={isPending}
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                try {
                                                    const imageUrl = await uploadImage(file);
                                                    field.onChange(imageUrl);
                                                } catch (err) {
                                                    console.error("Error al subir imagen:", err);
                                                    alert("Error al subir imagen");
                                                }
                                            }}
                                        />

                                        {field.value && (
                                            <div className="mt-2">
                                                <img
                                                    src={field.value}
                                                    alt="Imagen subida"
                                                    className="max-h-32 rounded border"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />


                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
                        Añadir tipo producto
                    </Button>
                </form>
            </Form>
        </div>
    )
}