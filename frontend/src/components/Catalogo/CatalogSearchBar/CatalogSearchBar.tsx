"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function CatalogSearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentQuery = searchParams.get("q") || "";
    const [searchValue, setSearchValue] = useState(currentQuery);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (searchValue) {
                params.set("q", searchValue);
            } else {
                params.delete("q");
            }

            router.push(`/catalogo?${params.toString()}`);
        }, 500); // debounce

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    return (
        <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-9" // padding-left para dejar espacio al ícono
            />
        </div>
    );
}
