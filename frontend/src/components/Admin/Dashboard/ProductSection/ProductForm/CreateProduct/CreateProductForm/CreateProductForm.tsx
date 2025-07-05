import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useProduct } from "@/contexts/ProductsContext/ProductsContext";
import { createProductSchema } from "@/schemas/product.schema";
import { uploadImage } from "@/services/cloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Lista de talles posibles
const sizes = ["XS", "S", "M", "L", "XL", "38", "39", "40", "41", "42", "43"];

export function CreateProductForm() {
    const { types } = useProduct();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof createProductSchema>>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: "",
            description: "",
            price: undefined,
            offer: undefined,
            stock: undefined,
            isFeatured: false,
            typeId: "",
            availableSizes: [],
            images: []
        }
    });

    const onSubmit = (values: z.infer<typeof createProductSchema>) => {
        startTransition(() => {
            console.log(values)
        })
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
                                <FormLabel>Descripcion</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escribí los detalles del producto, material, características, etc."
                                        className="min-h-[100px]"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Precio</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Ej: 1999.99"
                                                value={field.value ?? ""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value ? parseFloat(value) : undefined);
                                                }}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="offer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Oferta</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Ej: 10%"
                                                value={field.value ?? ""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value ? parseFloat(value) : undefined);
                                                }}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stock</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Ej: 10"
                                                value={field.value ?? ""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    field.onChange(value ? parseInt(value) : undefined);
                                                }}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isFeatured"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="space-y-0.5">
                                            <FormLabel>Destacado</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="typeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de producto</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {types.map((type) => (
                                                    <SelectItem key={type.id} value={type.id}>
                                                        {type.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField control={form.control} name="availableSizes" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Talles disponibles</FormLabel>
                                <FormControl>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map((size) => {
                                            const isSelected = field.value.includes(size);

                                            return (
                                                <Button
                                                    className="cursor-pointer"
                                                    key={size}
                                                    type="button"
                                                    variant={isSelected ? "default" : "outline"}
                                                    onClick={() => {
                                                        if (isSelected) {
                                                            // Sacar el talle
                                                            field.onChange(field.value.filter((s) => s !== size));
                                                        } else {
                                                            // Agregar el talle
                                                            field.onChange([...field.value, size]);
                                                        }
                                                    }}
                                                >
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

                                        <Input
                                            type="file"
                                            accept="image/*"
                                            disabled={isPending || field.value.length >= 4}
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                if (field.value.length >= 4) {
                                                    alert("Máximo 4 imágenes permitidas");
                                                    return;
                                                }

                                                try {
                                                    const url = await uploadImage(file);
                                                    field.onChange([...field.value, { url }]);
                                                } catch (error) {
                                                    console.error("Error subiendo imagen:", error);
                                                    alert("Error al subir la imagen");
                                                }
                                            }}
                                        />

                                        {/* Previsualización de las imágenes */}
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {field.value.map((img, idx) => (
                                                <div key={idx} className="relative group">
                                                    <Image
                                                        src={img.url}
                                                        alt="Preview"
                                                        width={96}
                                                        height={110}
                                                        className="object-cover rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                                        onClick={() => {
                                                            const updated = field.value.filter((_, i) => i !== idx);
                                                            field.onChange(updated);
                                                        }}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {field.value.length >= 4 && (
                                            <p className="text-xs text-muted-foreground">
                                                Has alcanzado el máximo de 4 imágenes.
                                            </p>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <Button type="submit" className="w-full cursor-pointer">
                        Añadir producto
                    </Button>
                </form>
            </Form>
        </div>
    )
}