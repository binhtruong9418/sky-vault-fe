import * as React from "react"
import {
  FolderOpen, Home,
  LifeBuoy,
  Send,
  Share2,
  Star, Trash2,
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavSecondary} from "@/components/nav-secondary"
import {NavUser} from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  return (
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div
                      className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full">
                    <img src={"/sky-vault-logo.png"} alt="Sky Vault Logo" className="h-8 w-8 rounded-full"/>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Sky Vault</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain}/>
          <NavSecondary items={data.navSecondary} className="mt-auto"/>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user}/>
        </SidebarFooter>
      </Sidebar>
  )
}