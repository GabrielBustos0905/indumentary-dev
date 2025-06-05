"use server"

import { registerSchema } from "@/schemas/register.schema"
import { z } from "zod"

export const register = async (values: z.infer<typeof registerSchema>) => {
    const validateFields = registerSchema.safeParse(values);

    if(!validateFields.success) return { error: "Campos invalidos"};

    const {email, name, password} = validateFields.data;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // necesario si usás cookies
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if(!response.ok) {
        type ZodFormattedError = {
        [key: string]: {
            _errors?: string[];
        };
        };

        const zodError = data?.error as ZodFormattedError | undefined;

        const message =
            data?.message ??
            Object.values(zodError ?? {})[0]?._errors?.[0] ??
            'Error en el registro';
        
        return { error: message }
    }

    return { success: "Ceunta creada exitosamente"}
}