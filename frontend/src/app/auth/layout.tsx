import { Metadata } from "next";
import "../globals.css"
import { AuthBanner } from "@/components/Auth";
import { AuthProvider } from "@/contexts";

export const metadata: Metadata = {
    title: "Indumentary Dev - Autenticacion 🔐",
    description: "",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <div className="flex h-screen">
                        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                            {children}
                        </div>
                        <AuthBanner />
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}