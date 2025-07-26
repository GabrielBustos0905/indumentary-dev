import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Filter } from "lucide-react";
import { CatalogSearchBar } from "../CatalogSearchBar";
import { FilterByType, PriceFilter, SizeFilter } from "../SideNavbar/Filters";

export function SideNavbarMobile() {
    return (
        <nav className="md:hidden mr-5">
            <Dialog>
                <DialogTrigger className="flex items-center gap-2">
                    <Filter strokeWidth={1.5} className="w-4 h-4" />
                    <p className="text-slate-600 hover:underline text-sm cursor-pointer">Filtros</p>
                </DialogTrigger>
                <DialogContent className="fixed top-0 right-0 left-auto translate-x-0 translate-y-0 h-screen w-[350px] max-w-md border-l bg-background shadow-lg z-50 transition-transform duration-300
             data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 animate-in slide-in-from-right">
                    <div className="flex flex-col">
                        <DialogTitle>Filtros</DialogTitle>
                        <Separator className="mt-1 mb-6" />
                        <div className="flex flex-col gap-y-4">
                            <CatalogSearchBar />
                            <FilterByType />
                            <SizeFilter />
                            <PriceFilter />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </nav>
    )
}