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
            <body className={`${inter.className} antialiased`}>
                <ProtectRoute allowedRoles={['ADMIN']}>
                    <SidebarProvider>
                        <AppSidebar />
                        <div className="w-screen">
                            <SidebarInset>
                                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                                    <div className="flex items-center gap-2 px-4">
                                        <SidebarTrigger className="-ml-1" />
                                        <Separator orientation="vertical" className="mr-2 h-4" />
                                        <h1 className="text-lg font-medium">Panel de Administración</h1>
                                    </div>
                                </header>
                            </SidebarInset>
                            <main className="w-full mt-2 md:mt-4 px-6">
                                {children}
                                <Toaster />
                            </main>
                        </div>
                    </SidebarProvider>
                </ProtectRoute>
            </body>
        </html >
    )
}
