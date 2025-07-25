import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/Admin";
import { Toaster } from "@/components/ui/sonner";
import { ProtectRoute } from "@/components/ProtectRoute";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Indumentary Dev - Admin",
    description: "",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} antialiased`}
            >
                <ProtectRoute allowedRoles={['ADMIN']}>
                    <SidebarProvider>
                        <div className="flex min-h-screen">
                            <AppSidebar />

                            <div className="flex-1 flex flex-col">
                                <SidebarInset>
                                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                                        <div className="flex items-center gap-2 px-4">
                                            <SidebarTrigger className="-ml-1" />
                                            <Separator orientation="vertical" className="mr-2 h-4" />
                                        </div>
                                    </header>
                                </SidebarInset>

                                <main className="flex-1 mt-8 px-4">
                                    {children}
                                    <Toaster />
                                </main>
                            </div>
                        </div>
                    </SidebarProvider>

                </ProtectRoute>
            </body>
        </html>
    );
}