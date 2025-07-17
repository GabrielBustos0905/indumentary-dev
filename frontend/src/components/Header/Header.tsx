import Link from "next/link";
import { MenuList } from "./MenuList";
import { Dancing_Script } from "next/font/google";
import { UserNav } from "./UserNav";
import { ShoppingCart } from "./ShoppingCart";
import { Heart } from "lucide-react";

const montserrat = Dancing_Script({ subsets: ['latin'], weight: ['400'] })

export function Header() {
    return (
        <header className="flex items-center justify-between py-4 px-6 mx-auto">
            <Link href="/" className={`${montserrat.className} text-2xl`}>
                Indumentary - Dev
            </Link>
            <MenuList />
            <div className="flex justify-center items-center gap-4">
                <Heart strokeWidth="1.5" className="cursor-pointer" />
                <UserNav />
                <ShoppingCart />
            </div>
        </header>
    )
}