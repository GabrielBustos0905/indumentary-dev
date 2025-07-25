import { UserSection } from "@/components/Admin/Dashboard/UserSection";
import { Separator } from "@/components/ui/separator";

export default function UsersPage() {
    return (
        <div>
            <div className="flex flex-col gap-2 w-full">
                <h1 className="text-2xl font-bold text-gray-800">Usuarios</h1>
                <Separator />
            </div>
            <UserSection />
        </div>
    )
}