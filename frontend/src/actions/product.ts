"use server"

import { createProductSchema, updateProductSchema } from "@/schemas/product.schema";
import { z } from "zod";

export const createProduct = async (values: z.infer<typeof createProductSchema>) => {
    const validateFields = createProductSchema.safeParse(values);

    if(!validateFields.success) return { error: "Campos invalidos!"};

    const data = validateFields.data;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // necesario si usás cookies
        body: JSON.stringify(data),
    });

    const responseProduct = await response.json();

    if(!response.ok) {
        type ZodFormattedError = {
        [key: string]: {
            _errors?: string[];
        };
        };

        const zodError = responseProduct?.error as ZodFormattedError | undefined;

        const message =
            responseProduct?.message ??
            Object.values(zodError ?? {})[0]?._errors?.[0] ??
            'Error en el registro';
        
        return { error: message }
    }

    return { success: "Producto agregado exitosamente!"}
};

export const updateProduct = async (id: string, values: z.infer<typeof updateProductSchema>) => {
    const validateFields = updateProductSchema.safeParse(values);

    if (!validateFields.success) return { error: "Campos inválidos!" };

    const data = validateFields.data;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });

    const responseProduct = await response.json();

    if (!response.ok) {
        type ZodFormattedError = {
            [key: string]: { _errors?: string[] };
        };

        const zodError = responseProduct?.error as ZodFormattedError | undefined;

        const message =
            responseProduct?.message ??
            Object.values(zodError ?? {})[0]?._errors?.[0] ??
            "Error al actualizar el producto";

        return { error: message };
    }

    return {
        success: "Producto actualizado exitosamente!",
        product: responseProduct,
    };
};

export const deleteProduct = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            const message = data?.message ?? data?.error ?? 'Error al eliminar el producto';
            return { error: message };
        }

        return { success: data?.message ?? 'Producto eliminado exitosamente' };

    } catch (error) {
        console.error('Error eliminando producto:', error);
        return { error: 'Error inesperado al intentar eliminar el producto' };
    }
};


