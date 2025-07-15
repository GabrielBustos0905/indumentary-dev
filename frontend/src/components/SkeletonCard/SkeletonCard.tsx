import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <div className="md:w-3/4 h-screen flex justify-center ">
            <div className="flex flex-col gap-1 mx-auto space-y-3">
                <Skeleton className="h-[363px] w-[242px] rounded-none" />
                <Skeleton className="h-4 w-[242px]" />
                <Skeleton className="h-4 w-[242px]" />
                <Skeleton className="h-4 w-[242px]" />
            </div>
            <div className="flex flex-col gap-1 mx-auto space-y-3">
                <Skeleton className="h-[363px] w-[242px] rounded-none" />
                <Skeleton className="h-4 w-[242px]" />
                <Skeleton className="h-4 w-[242px]" />
                <Skeleton className="h-4 w-[242px]" />
            </div>
            <div className="flex flex-col gap-1 mx-auto space-y-3">
                <Skeleton className="h-[363px] w-[242px] rounded-none" />
                <Skeleton className="h-4 w-[242px]" />
                <Skeleton className="h-4 w-[242px]" />
                <Skeleton className="h-4 w-[242px]" />
            </div>
        </div>
    )
}