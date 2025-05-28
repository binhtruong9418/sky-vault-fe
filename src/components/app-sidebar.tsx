import { Cloud, Home, FolderOpen, Star, Trash2, Share2, Settings, Plus, Upload } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const data = {
    navMain: [
        {
            title: "Home",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "My Files",
            url: "/dashboard/files",
            icon: FolderOpen,
        },
        {
            title: "Shared",
            url: "/dashboard/shared",
            icon: Share2,
        },
        {
            title: "Starred",
            url: "/dashboard/starred",
            icon: Star,
        },
        {
            title: "Trash",
            url: "/dashboard/trash",
            icon: Trash2,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings,
        },
    ],
}

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border">
                <div className="flex items-center gap-2 px-2 py-2">
                    <Cloud className="h-6 w-6 text-primary" />
                    <span className="font-semibold text-lg">CloudStore</span>
                </div>
                <div className="px-2 space-y-2">
                    <Button className="w-full justify-start" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                    </Button>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Storage</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="px-2 py-2">
                            <div className="text-xs text-muted-foreground mb-2">2.1 GB of 15 GB used</div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: "14%" }}></div>
                            </div>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border">
                <SidebarMenu>
                    {data.navSecondary.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
