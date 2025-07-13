import { UserProvider } from "@/contexts/UserContext/UserContext";
import { UserTable } from "./UserTable";

export function UserSection() {
    return (
        <UserProvider>
            <UserTable />
        </UserProvider>
    )
}