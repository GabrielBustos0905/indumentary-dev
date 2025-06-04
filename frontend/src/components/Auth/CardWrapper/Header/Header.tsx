import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

interface HeaderPops {
    label: string
};

export function Header({ label }: HeaderPops) {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-3xl font-semibold flex items-center gap-2", font.className)}>
                🔐 Registrarse
            </h1>
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    )
}