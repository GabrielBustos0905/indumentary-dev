/* eslint-disable @next/next/no-img-element */
"use client"

import { updateProduct } from "@/actions/product";
import { FormError } from "@/components/Auth/FormError";
import { FormSuccess } from "@/components/Auth/FormSuccess";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useProduct } from "@/contexts/ProductsContext/ProductsContext";
import { updateProductSchema } from "@/schemas/product.schema";
import { uploadImage } from "@/services/cloudinary";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const sizes = ["XS", "S", "M", "L", "XL", "38", "39", "40", "41", "42", "43"];

interface UpdateProductFormProps {
    closeDialog: (open: boolean) => void;
    product: Product;
}

export function UpdateProductForm({ closeDialog, product }: UpdateProductFormProps) {
    const { types, reloadProducts } = useProduct();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");


    const form = useForm<z.infer<typeof updateProductSchema>>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: product.name || "",
            description: product.description || "",
            price: product.price || undefined,
            offer: product.offer || undefined,
            stock: product.stock || undefined,
            isFeatured: product.isFeatured || false,
            typeId: product.typeId || "",
            availableSizes: product.availableSizes || [],
            images: product.images.map(img => ({ url: img.url })) || []
        }
    });

    const [priceInput, setPriceInput] = useState(form.getValues("price")?.toString() ?? "");
    const [offerInput, setOfferInput] = useState(form.getValues("offer")?.toString() ?? "");
    const [stockInput, setStockInput] = useState(form.getValues("stock")?.toString() ?? "");

    const onSubmit = (values: z.infer<typeof updateProductSchema>) => {
        startTransition(() => {
            updateProduct(product.id, values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success)
                });
            toast.success("Producto actualizado!")
            reloadProducts();
            closeDialog(false);
        })
    };

    return (
        <div className="grid gap-4 py-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Nombre" type="text" disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripcion</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Escribí los detalles" className="min-h-[100px]" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="price" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Ej: 1999.99"
                                            value={priceInput}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                // Permitimos vacío o número válido
                                                if (value === "" || /^(\d+(\.\d*)?)?$/.test(value)) {
                                                    setPriceInput(value);
                                                    if (value === "") {
                                                        field.onChange(undefined);
                                                    } else {
                                                        field.onChange(parseFloat(value));
                                                    }
                                                }
                                            }}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="offer" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Oferta</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Ej: 10%"
                                            value={offerInput}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                // Permitimos vacío o número válido
                                                if (value === "" || /^(\d+(\.\d*)?)?$/.test(value)) {
                                                    setOfferInput(value);
                                                    if (value === "") {
                                                        field.onChange(undefined);
                                                    } else {
                                                        field.onChange(parseFloat(value));
                                                    }
                                                }
                                            }}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <FormField control={form.control} name="stock" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Ej: 10"
                                            value={stockInput}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                // Permitimos vacío o número válido
                                                if (value === "" || /^(\d+(\.\d*)?)?$/.test(value)) {
                                                    setStockInput(value);
                                                    if (value === "") {
                                                        field.onChange(undefined);
                                                    } else {
                                                        field.onChange(parseFloat(value));
                                                    }
                                                }
                                            }}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="isFeatured" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Destacado</FormLabel>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="typeId" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de producto</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar tipo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {types.map((type) => (
                                                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="availableSizes" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Talles disponibles</FormLabel>
                                <FormControl>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map(size => {
                                            const isSelected = field.value.includes(size);
                                            return (
                                                <Button key={size} type="button" variant={isSelected ? "default" : "outline"} onClick={() => field.onChange(isSelected ? field.value.filter(s => s !== size) : [...field.value, size])}>
                                                    {size}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="images" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imágenes (máx. 4)</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col gap-2">
                                        <Input type="file" accept="image/*" disabled={isPending || (field.value?.length ?? 0) >= 4} onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            if ((field.value?.length ?? 0) >= 4) return alert("Máximo 4 imágenes");

                                            try {
                                                const url = await uploadImage(file);
                                                field.onChange([...(field.value ?? []), { url }]);
                                            } catch (err) {
                                                console.error(err);
                                                alert("Error al subir imagen");
                                            }
                                        }} />

                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {(field.value ?? []).map((img, idx) => (
                                                <div key={idx} className="relative group">
                                                    <img src={img.url} alt="Preview" className="w-24 h-24 object-cover rounded" />
                                                    <button type="button" className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition" onClick={() => field.onChange((field.value ?? []).filter((_, i) => i !== idx))}>
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {(field.value?.length ?? 0) >= 4 && (
                                            <p className="text-xs text-muted-foreground">Has alcanzado el máximo de 4 imágenes.</p>
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
                        Actualizar Producto
                    </Button>
                </form>
            </Form>
        </div>
    );
}