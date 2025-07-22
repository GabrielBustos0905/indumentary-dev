"use client"

import { CatalogSearchBar } from "../CatalogSearchBar";
import { FilterByType, PriceFilter, SizeFilter } from "./Filters";

export function SideNavbar() {
    return (
        <nav className="w-[270px] flex flex-col h-screen items-start gap-4">
            <CatalogSearchBar />
            <FilterByType />
            <SizeFilter />
            <PriceFilter />
        </nav>
    )
}