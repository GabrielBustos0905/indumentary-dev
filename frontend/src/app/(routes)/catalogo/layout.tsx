import { CatalogBreadcrumb, CatalogSearchBar, SideNavbar } from "@/components/Catalogo";
import { Separator } from "@/components/ui/separator";

export default function CatalogoLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-4 px-12">
            <div className="flex justify-between items-center py-2">
                <CatalogBreadcrumb />
                <CatalogSearchBar />
            </div>
            <Separator />
            <div className="mt-4 flex justify-between gap-4">
                <SideNavbar />
                {children}
            </div>
        </div>
    )
}