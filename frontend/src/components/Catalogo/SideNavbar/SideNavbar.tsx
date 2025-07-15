import { FilterByType, PriceFilter, SizeFilter } from "./Filters";

export function SideNavbar() {
    return (
        <nav className="w-[270px] flex flex-col h-screen items-start gap-4">
            <FilterByType />
            <SizeFilter />
            <PriceFilter />
        </nav>
    )
}