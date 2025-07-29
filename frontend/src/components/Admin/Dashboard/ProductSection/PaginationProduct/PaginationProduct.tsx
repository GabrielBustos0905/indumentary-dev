'use client'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
    PaginationEllipsis,
} from "@/components/ui/pagination"
import { useProduct } from "@/contexts/ProductsContext/ProductsContext"

export function PaginationProduct() {
    const { page, totalPages, changePage } = useProduct()

    const renderPages = () => {
        const pages = []

        for (let i = 1; i <= totalPages; i++) {
            // Mostrar solo algunas páginas + elipsis
            if (
                i === 1 ||
                i === totalPages ||
                (i >= page - 1 && i <= page + 1)
            ) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={i === page}
                            onClick={() => changePage(i)}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                )
            } else if (i === page - 2 || i === page + 2) {
                pages.push(
                    <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }
        }

        return pages
    }

    return (
        <Pagination className="justify-center">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => changePage(Math.max(1, page - 1))}
                    />
                </PaginationItem>

                {renderPages()}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => changePage(Math.min(totalPages, page + 1))}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
