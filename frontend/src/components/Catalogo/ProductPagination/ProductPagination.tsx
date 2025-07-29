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
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

interface Props {
    page: number
    totalPages: number
}

export function ProductPagination({ page, totalPages }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const createPageLink = (newPage: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", newPage.toString())
        return `?${params.toString()}`
    }

    const goToPage = (newPage: number) => {
        router.push(createPageLink(newPage))
    }

    const renderPages = () => {
        const pages = []

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= page - 1 && i <= page + 1)
            ) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={i === page}
                            onClick={() => goToPage(i)}
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
        <Suspense>
            <Pagination className="justify-center">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => goToPage(Math.max(1, page - 1))}
                        />
                    </PaginationItem>

                    {renderPages()}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => goToPage(Math.min(totalPages, page + 1))}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </Suspense>
    )
}
