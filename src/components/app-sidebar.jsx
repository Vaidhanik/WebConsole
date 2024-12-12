import * as React from "react";
import {
  Settings2,
  SquareTerminal,
  Search,
  Bug,
  ShieldAlert,
  MapPinned,
  Monitor
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import TeamInfoBox from "@/Props/TeamInfoBox";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectIp } from "@/store/features/ipSlice";

// This is sample data.
const data = {
  user: {
    name: "Vaidhanik",
    email: "vaidanik@gamil.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Select Machine",
      url: "/Dashboard",
      icon: Monitor,
    },
    {
      title: "Search Apps",
      url: "/Dashboard/MainDashboard",
      icon: Search,
    },
    {
      title: "Blocked App",
        url: "/Dashboard/Blocked-apps",
        icon: Bug,
    },
    {
      title: "Global System",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Global Blocking",
          url: "/Dashboard/Global-analysis/Global-blocking",        },
        {
          title: "Global Analysis",
          url: "/Dashboard/Global-analysis",
  
        },
      ],
    },
    {
      title: "Firewall AI",
      url: "/Dashboard/Ai-insides",
      icon: ShieldAlert,
    },
    {
      title: "Geo Blocker",
      url: "/Dashboard/Geo-Blocker",
      icon: MapPinned,
    },
    {
      title: "Settings",
      url: "/Dashboard/Settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const dispatch = useDispatch();
  const currentIp = useSelector(selectIp);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-row align-middle items-center text-2xl">
      <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="https://github.com/shadcn.png"/>
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-2xl">FIREWALL</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator className="w-[80%] mx-[10%]" />
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <Separator className="w-[80%] mx-[10%]" /> */}
      <SidebarFooter>
        <p className="text-[14px]">{currentIp ? `SELECTED MACHINE: ${currentIp.ip}` : "running on GLOBAL SYSTEM..."}</p>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
