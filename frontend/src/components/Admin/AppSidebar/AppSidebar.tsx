"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { data } from "./AppSidebar.data"
import { NavMain } from "./NavMain"
import { TeamSwitcher } from "./TeamSwitcher"
import { NavProjects } from "./NavProjects"
import { NavUser } from "./NavUser"

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser /> */}
                Logout
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}