import { updateUserType } from "@/actions/user";
import { FormError } from "@/components/Auth/FormError";
import { FormSuccess } from "@/components/Auth/FormSuccess";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updateUserTypeSchema } from "@/schemas/user.schema";
import { UserType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface UpdateUserTypeFormProps {
    closeDialog: (open: boolean) => void;
    userId: string;
    userType: UserType
}

const userTypes: UserType[] = ["CLIENT", "ADMIN"]

export function UpdateUserForm(props: UpdateUserTypeFormProps) {
    const { closeDialog, userId, userType } = props;
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof updateUserTypeSchema>>({
        resolver: zodResolver(updateUserTypeSchema),
        defaultValues: {
            userType: userType
        }
    });

    const onSubmit = (values: z.infer<typeof updateUserTypeSchema>) => {
        startTransition(() => {
            updateUserType(userId, values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                        toast.error(data.error);
                        return;
                    }

                    setSuccess(data.success);
                    toast.success("Tipo de producto actualizado!");

                    // ✅ solo se llama si todo salió bien
                    // reloadProductTypes()
                    closeDialog(false);
                })
                .catch((err) => {
                    console.error("Error actualizando el producto", err);
                    toast.error("Ocurrió un error al actualizar el producto");
                });
        });
    };

    return (
        <div className="grid gap-4 py-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField control={form.control} name="userType" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de Usuario</FormLabel>
                            <FormControl>
                                <div className="flex flex-wrap gap-2">
                                    {userTypes.map((type) => (
                                        <Button
                                            key={type}
                                            type="button"
                                            variant={field.value === type ? "default" : "outline"}
                                            onClick={() => field.onChange(type)}
                                            disabled={isPending}
                                        >
                                            {type}
                                        </Button>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormError message={error} />
                    <FormSuccess message={success} />
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
    )
}