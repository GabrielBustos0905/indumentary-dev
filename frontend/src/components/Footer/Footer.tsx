import Link from "next/link";
import { Separator } from "../ui/separator"
import { Facebook, Instagram, MapPin } from 'lucide-react';
import { footerData } from "./Footer.data";

export function Footer() {
    return (
        <footer className="h-full mt-4 bg-secondary-foreground text-gray-100">
            <div className="flex flex-col items-center justify-center p-4">
                <h2 className="text-3xl font-bold uppercase my-3">Sucursales</h2>
                <div className="flex w-full justify-between px-4 sm:px-24">
                    {
                        footerData.map(sucursal => (
                            <div key={sucursal.id} className='flex gap-2'>
                                <MapPin />
                                <p className="text-md sm:text-xl font-semibold uppercase">{sucursal.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <Separator className="my-6 border-gray-200 sm:mx-autolg:my-8" />

            <div className=''>
                <div className='flex flex-col items-center justify-center m-8'>
                    <h2 className='text-3xl font-bold uppercase my-3'>Indumentary Unisex</h2>
                    <div className='flex gap-20 mt-6'>
                        <Instagram />
                        <Facebook />
                    </div>
                </div>
                <div className=''>
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        &copy; 2024
                        <Link href="https://porfolio-web-theta.vercel.app/">  Gabi Bustos. </Link>
                        Todos los derechos reservados
                    </span>
                </div>
            </div>
        </footer>
    )
}