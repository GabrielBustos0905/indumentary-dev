import { updateUserTypeSchema } from "@/schemas/user.schema";
import { z } from "zod";

export const updateUserType = async (id: string, userType: z.infer<typeof updateUserTypeSchema>) => {
    const validateField = updateUserTypeSchema.safeParse(userType);

    if(!validateField.success) return { error: "Campos invalidos!" };

    const data = validateField.data;

    console.log(data, id)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // necesario si usás cookies
        body: JSON.stringify(data),
    });

    const responseUser = await response.json();

    if (!response.ok) {
        type ZodFormattedError = {
            [key: string]: { _errors?: string[] };
        };

        const zodError = responseUser?.error as ZodFormattedError | undefined;

        const message =
            responseUser?.message ??
            Object.values(zodError ?? {})[0]?._errors?.[0] ??
            "Error al actualizar el tipo de usuario";

        return { error: message };
    }

    return {
        success: "Usuario actualizado exitosamente!",
        product: responseUser,
    };
}