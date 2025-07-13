
import { loginSchema } from "@/schemas/login.schema";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
    const validateFields = loginSchema.safeParse(values);

    if(!validateFields.success) return { error: "Campos invalidos"}

    const { email, password } = validateFields.data;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // necesario si usás cookies
        body: JSON.stringify({ email, password }),
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

    return { success: "Login exitoso!"}
}