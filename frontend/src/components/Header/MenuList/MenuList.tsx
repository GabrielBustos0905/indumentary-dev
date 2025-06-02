import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { categories } from "./MenuList.data";

export function MenuList() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 uppercase font-bold mr-2">Inicio</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="uppercase font-semibold">Ayuda</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Indumentary - Dev
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            La mejor tienda de ropa
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/shop"
                                        className={cn(
                                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        )}
                                    >
                                        <div className="text-sm font-medium leading-none">Shop</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                            Accede a toda tu iformacion, tus pedidos y mucho mas.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/catalogo"
                                        className={cn(
                                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        )}
                                    >
                                        <div className="text-sm font-medium leading-none">Ofertas</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                            Seccion dedicada a promociones y descuentos especiales.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="uppercase font-semibold">Productos</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {categories.map((component) => (
                                <li key={component.title}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={component.href}
                                            className={cn(
                                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            )}
                                        >
                                            <div className="text-sm font-medium leading-none">{component.title}</div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                {component.description}
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}