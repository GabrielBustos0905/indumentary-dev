"use client"

import { Button } from "@/components/ui/button";

import { useAuth } from "@/contexts";
import Link from "next/link";
import { Heart, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function UserNav() {
    const { user, logout } = useAuth()

    return (
        <nav>
            {user ? (
                <>
                    <Heart strokeWidth="1.5" className="hidden md:block cursor-pointer" />
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
                            <DropdownMenuItem>
                                <button onClick={logout}>Logout</button>
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