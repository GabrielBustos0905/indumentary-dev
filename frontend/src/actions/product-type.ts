import { createProductTypeSchema, updateProductTypeSchema } from "@/schemas/product-type.schema";
import { z } from "zod";

export const createProductType = async (values: z.infer<typeof createProductTypeSchema>) => {
    const validateFields = createProductTypeSchema.safeParse(values);

    if(!validateFields.success) return { error: "Campos invalidos!"};

    const data = validateFields.data;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-type`, {
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

    return { success: "Tipo de producto agregado exitosamente!"}
}

export const updateProductType = async (id: string, values: z.infer<typeof updateProductTypeSchema>) => {

    const validateFields = updateProductTypeSchema.safeParse(values);

    if(!validateFields.success) return { error: "Campos invalidos!"};

     const data = validateFields.data;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-type/${id}`, {
        method: 'PUT',
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

    return { success: "Tipo de producto actualizado exitosamente!"}
}

export const deleteProductType = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-type/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            const message = data?.message ?? data?.error ?? 'Error al eliminar tipo de producto';
            return { error: message };
        }

        return { success: data?.message ?? 'Tipo de producto eliminado exitosamente' };

    } catch (error) {
        console.error('Error eliminando tipo de producto:', error);
        return { error: 'Error inesperado al intentar eliminar tipo de producto' };
    }
};