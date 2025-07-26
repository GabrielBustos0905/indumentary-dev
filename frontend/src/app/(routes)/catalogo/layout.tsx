// app/catalogo/layout.tsx
import { CatalogBreadcrumb, SideNavbar } from "@/components/Catalogo";
import { SideNavbarMobile } from "@/components/Catalogo/SideNavbarMobile";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function CatalogoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-4 px-5 md:px-12">
            <Suspense fallback={<div>Cargando navegación...</div>}>
                <div className="flex w-full justify-between">
                    <CatalogBreadcrumb />
                    <SideNavbarMobile />
                </div>
            </Suspense>
            <Separator />
            <div className="mt-4 flex md:justify-between gap-4">
                <Suspense fallback={<div>Cargando filtros...</div>}>
                    <SideNavbar />
                </Suspense>
                {children}
            </div>
        </div>
    );
}
