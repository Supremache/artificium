"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icons } from "../ui/icons";
import { Search } from "./search";
import { NavUser } from "./sidebar-user";
import { ScrollArea } from "../ui/scroll-area";

const data = {
  user: {
    name: "Abdulrahman",
    role: "Premium",
    avatar: "/images/avatar/person/RyanLee.png",
  },
  projects: [
    {
      id: 1,
      icon: (
        <Icons.square className="h-4 w-4 text-primary drop-shadow-[0_3px_4px] drop-shadow-primary" />
      ),
      title: "Orbital Oddysey",
    },
    {
      id: 2,
      icon: (
        <Icons.triangle className="h-4 w-4 text-red-power-600 drop-shadow-[0_3px_4px] drop-shadow-red-power-600" />
      ),
      title: "Digital Product Launch",
    },
    {
      id: 3,
      icon: (
        <Icons.square className="h-4 w-4 text-happy-orange-600 drop-shadow-[0_3px_4px] drop-shadow-happy-orange-600" />
      ),
      title: "Brand Refresh",
    },
    {
      id: 4,
      icon: (
        <Icons.octagon className="h-4 w-4 text-heisenberg-blue-500 drop-shadow-[0_3px_4px] drop-shadow-heisenberg-blue-500" />
      ),
      title: "Social Media Strategy",
    },
  ],
};

export function ChatSidebar() {
  return (
    <Sidebar className="border-none rounded-2xl m-3">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="rounded-2xl h-16 w-full"
                >
                  <Avatar className="rounded-2xl h-12 w-12">
                    <AvatarImage
                      src="/images/avatar/intellisys.png"
                      alt="@Intellisys"
                    />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="body-lg text-noble-black-100">Intellisys</p>
                    <span className="text-primary">12 members</span>
                  </div>
                  <Icons.chevronRight className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[--radix-dropdown-menu-trigger-width] rounded-lg"
              >
                <DropdownMenuItem className="rounded-lg">
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        
          <SidebarGroup>
            <SidebarGroupLabel className="text-noble-black-400">
              GENERAL
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size={"lg"}>
                    <Search />
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton size={"lg"}>
                    <Icons.billing className="h-4 w-4 text-noble-black-400" />
                    <span>Billing</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <ScrollArea className="h-screen">
          <SidebarGroup>
            <SidebarGroupLabel className="text-noble-black-400">
              Recent Chats
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton variant={"ghost"} size={"lg"}>
                    <div className="flex items-center justify-center space-x-3">
                      <Icons.addCircle className="h-4 w-4" />
                      <span>Add new project</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {data.projects.map((p) => (
                  <SidebarMenuItem key={p.id}>
                    <SidebarMenuButton isActive={p.id === 1} size={"lg"}>
                      {p.icon}
                      <span>{p.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
