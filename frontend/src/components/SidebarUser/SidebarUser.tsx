'use client'

import { User, LogOut, ChevronDown, Loader2, LayoutDashboard } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/contexts'
import Link from 'next/link'
import { Button } from '../ui/button'


export function SidebarUser() {
    const { user, logout, isLoading } = useAuth()

    if (isLoading) return (
        <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
    )

    return (
        <div>
            {
                user ? (
                    <div className="w-full mt-auto px-4 py-3 border-t border-border" >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-3 cursor-pointer">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col text-left text-sm leading-tight flex-1">
                                        <span className="font-medium">{user.name}</span>
                                        <span className="text-xs text-muted-foreground">{user.userType}</span>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Cerrar sesión
                                </DropdownMenuItem>
                                {
                                    user.userType === "ADMIN" && (
                                        <DropdownMenuItem>
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            <Link href="/admin/dashboard">
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                    )
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Link href="/auth/login">
                            <Button>Signin</Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button variant="link">Signup</Button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}
