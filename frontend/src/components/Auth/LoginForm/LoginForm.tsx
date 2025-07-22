"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CardWrapper } from "../CardWrapper"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema } from "@/schemas/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { login } from "@/actions/login"
import { useRouter } from "next/navigation"

export function LoginForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success)
                })
            if (!error) router.push("/auth/login")
        })
    }

    return (
        <CardWrapper
            headerLabel="Bienvenido de nuevo!"
            backButtonLabel="No tienes una cuenta?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="next-auth@gmail.com"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Contraseña"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}