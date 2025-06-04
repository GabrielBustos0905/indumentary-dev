import "../globals.css"
import { AuthBanner } from "@/components/Auth";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="flex h-screen">
                    <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                        {children}
                    </div>
                    <AuthBanner />
                </div>
            </body>
        </html>
    );
}