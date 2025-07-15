import { CatalogBreadcrumb, SideNavbar } from "@/components/Catalogo";
import { Separator } from "@/components/ui/separator";

export default function CatalogoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-4 px-12">
            <CatalogBreadcrumb />
            <Separator />
            <div className="mt-4 flex justify-between gap-4">
                <SideNavbar />
                {children}
            </div>
        </div>
    )
}