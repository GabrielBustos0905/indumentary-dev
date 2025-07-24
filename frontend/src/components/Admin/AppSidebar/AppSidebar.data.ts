import {
    AudioWaveform,
    BookOpen,
    Command,
    GalleryVerticalEnd,
    SquareTerminal,
    Instagram,
    Github,
    Code
} from "lucide-react";

export const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Home",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Home",
                    url: "https://indumentary-dev.vercel.app",
                },
                {
                    title: "Catalogo",
                    url: "https://indumentary-dev.vercel.app/catalogo",
                },
            ],
        },
        {
            title: "Dashboard",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Productos",
                    url: "/products",
                },
                {
                    title: "Tipo de Producto",
                    url: "/product-type",
                },
                {
                    title: "Ordenes",
                    url: "/orders",
                },
                {
                    title: "Favoritos",
                    url: "/favorites"
                },
                {
                    title: "Usuarios",
                    url: "/users"
                }
            ],
        },
    ],
    projects: [
        {
            name: "Instagram",
            url: "https://www.instagram.com/_gabibustos_",
            icon: Instagram,
        },
        {
            name: "Github",
            url: "https://github.com/GabrielBustos0905",
            icon: Github,
        },
        {
            name: "Pagina Web",
            url: "https://gabriel-bustos.vercel.app",
            icon: Code,
        },
    ],
}