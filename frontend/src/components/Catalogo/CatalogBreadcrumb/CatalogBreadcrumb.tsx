"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";

export function CatalogBreadcrumb() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const type = searchParams.get("typeId");

    const handleResetType = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("typeId");
        router.push(`/catalogo?${params.toString()}`);
    };

    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/catalogo" onClick={handleResetType}>
                        Catálogo
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {type && type !== "all" && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <span className="font-medium capitalize">{type}</span>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
