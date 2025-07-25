import { UserSection } from "@/components/Admin/Dashboard/UserSection";

export default function UsersPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Usuarios</h1>
            <UserSection />
        </div>
    )
}