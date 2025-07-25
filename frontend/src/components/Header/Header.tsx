import Link from "next/link"
import { MenuList } from "./MenuList"
import { Dancing_Script } from "next/font/google"
import { UserNav } from "./UserNav"
import { ShoppingCart } from "./ShoppingCart"
import { MenuMobile } from "./MenuMobile"
import { Heart } from "lucide-react"
import { useAuth } from "@/contexts"

const montserrat = Dancing_Script({ subsets: ["latin"], weight: ["400"] })

export function Header() {
    const { user } = useAuth()

    return (
        <header className="flex items-center justify-between py-4 px-6 mx-auto">
            {/* Logo */}
            <Link href="/" className={`${montserrat.className} text-2xl`}>
                Indumentary - Dev
            </Link>

            {/* Menú en desktop */}
            <div className="hidden md:block">
                <MenuList />
            </div>

            {/* Íconos en desktop */}
            <div className="hidden md:flex justify-center items-center gap-4">
                <Heart strokeWidth="1.5" className="cursor-pointer" />
                <UserNav />
                <ShoppingCart />
            </div>

            {/* Botón hamburguesa solo en mobile */}
            <MenuMobile userType={user?.userType} />
        </header>
    )
}
