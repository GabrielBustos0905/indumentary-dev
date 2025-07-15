"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ProductType } from "@/types/product-type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function FilterByType() {
    const [types, setTypes] = useState<ProductType[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedType = searchParams.get("typeId");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-type`, {
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => setTypes(data))
            .catch((error) => console.error("Error al obtener tipos:", error));
    }, []);

    const handleClick = (typeId: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (params.get("typeId") === typeId) {
            params.delete("typeId");
        } else {
            params.set("typeId", typeId);
        }

        params.set("page", "1");
        router.push(`/catalogo?${params.toString()}`);
    };

    return (
        <div className="w-full">
            <Accordion type="single" collapsible>
                <AccordionItem value="Type Filter" className="border-none">
                    <AccordionTrigger className="text-sm font-semibold uppercase hover:bg-accent/50 rounded-md">Tipo de Producto</AccordionTrigger>
                    <AccordionContent>
                        <ul>
                            <li
                                onClick={() => handleClick("all")}
                                className={selectedType == "all" ? "py-2 pl-7 underline hover:font-semibold cursor-pointer" : "py-2 pl-7 hover:font-semibold cursor-pointer"}
                            >
                                Todos
                            </li>
                            {
                                types?.map((type) => {
                                    const isSelected = selectedType === type.name;
                                    return (
                                        <li
                                            key={type.id}
                                            onClick={() => handleClick(type.name)}
                                            className={isSelected ? "py-2 pl-7 underline hover:font-semibold cursor-pointer" : "py-2 pl-7 hover:font-semibold cursor-pointer"}
                                        >
                                            {type.name}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}