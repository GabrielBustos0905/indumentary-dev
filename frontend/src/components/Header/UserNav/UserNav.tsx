"use client"

import { Button } from "@/components/ui/button";

import { useAuth } from "@/contexts";
import Link from "next/link";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function UserNav() {
    const { user, logout } = useAuth()

    return (
        <nav>
            {user ? (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex gap-1 items-center">
                            <User strokeWidth="1.5" className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                {
                                    user.name
                                }
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <p className="text-md font-medium">{user.userType}</p>
                            </DropdownMenuItem>
                            {
                                user.userType === "ADMIN" && (
                                    <DropdownMenuItem>
                                        <Link href="/admin/dashboard">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                )
                            }
                            <DropdownMenuItem onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Cerrar sesión
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                <div className="flex justify-center">
                    <Link href="/auth/login">
                        <Button>Signin</Button>
                    </Link>
                    <Link href="/auth/register">
                        <Button variant="link">Signup</Button>
                    </Link>
                </div>
            )}
        </nav>
    )
}