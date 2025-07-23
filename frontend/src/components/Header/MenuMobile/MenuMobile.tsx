import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Home, Menu, Shirt } from "lucide-react";
import { ShoppingCart } from "../ShoppingCart";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fetchProductTypes } from "@/services/product-type.service";
import Link from "next/link";
import { UserNav } from "../UserNav";

export async function MenuMobile() {
    const types = await fetchProductTypes()

    return (
        <nav className="flex gap-4 md:hidden">
            <ShoppingCart />
            <Dialog>
                <DialogTrigger>
                    <Menu strokeWidth="2" className="w-6 h-6 cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="fixed top-0 right-0 left-auto translate-x-0 translate-y-0 h-screen w-[350px] max-w-md border-l bg-background shadow-lg z-50 transition-transform duration-300
             data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 animate-in slide-in-from-right">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-col">
                            <DialogTitle>Menu</DialogTitle>
                            <Separator className="mt-1 mb-6" />
                            <div className="flex gap-2 items-center hover:translate-x-1.5 hover:duration-150 transition-all  cursor-pointer">
                                <Home className="w-5 h-5" />
                                <Link href="/" className="text-md font-medium">Inicio</Link>
                            </div>
                            <div className="my-4 flex gap-2 items-center hover:translate-x-1.5 hover:duration-150 transition-all  cursor-pointer">
                                <Shirt className="w-5 h-5" />
                                <Link href="/catalogo" className="text-md font-medium">Catalogo</Link>
                            </div>
                            <div className="my-4 flex gap-2 items-center hover:translate-x-1.5 hover:duration-150 transition-all  cursor-pointer">
                                <Heart className="w-5 h-5" />
                                <Link href="#" className="text-md font-medium">Favoritos</Link>
                            </div>

                            <Accordion collapsible type="single" className="h-min">
                                <AccordionItem value="Type Filter" className="border-none">
                                    <AccordionTrigger className="text-sm font-semibold uppercase hover:bg-accent/50 rounded-md">
                                        Categorias
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="flex flex-col">
                                            {
                                                types?.map((type) => {
                                                    return (
                                                        <Link
                                                            key={type.id}
                                                            href={`/catalogo?typeId=${type.name}`}
                                                            className={"py-2 pl-7 hover:font-semibold cursor-pointer"}
                                                        >
                                                            {type.name}
                                                        </Link>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <UserNav />
                    </div>
                </DialogContent>
            </Dialog>
        </nav >
    )
}