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
                    url: "/",
                },
                {
                    title: "Catalogo",
                    url: "#",
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
            url: "#",
            icon: Instagram,
        },
        {
            name: "Github",
            url: "#",
            icon: Github,
        },
        {
            name: "Pagina Web",
            url: "#",
            icon: Code,
        },
    ],
}