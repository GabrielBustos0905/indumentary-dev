
import { AuthProvider } from "@/contexts";
// import { getCurrentUser } from "@/lib/auth";
import { Header } from "../Header";

export async function HeaderWrapper() {
    // const user = await getCurrentUser();
    return (
        <AuthProvider>
            <Header />
        </AuthProvider>
    );
}
