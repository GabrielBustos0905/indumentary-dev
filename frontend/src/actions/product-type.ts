import { createProductTypeSchema } from "@/schemas/product-type.schema";
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