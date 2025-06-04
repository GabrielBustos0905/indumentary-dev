"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CardWrapper } from "../CardWrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/schemas/register.schema";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    })

    const onSubmit = () => {
        startTransition(() => {
            alert("Submit")
        })
    };

    return (
        <CardWrapper
            headerLabel="Create una cuenta"
            backButtonLabel="ya tienes una cuenta?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Nombre"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Email"
                                        type="text"
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

                    <Button type="submit" className="w-full" disabled={isPending}>
                        Registrar
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}