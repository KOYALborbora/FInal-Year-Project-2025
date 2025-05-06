"use client";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Navbar, NavbarContent, NavbarItem, NavbarProfileDropdown } from "@/components/ui/navbar";
import { Upload, BarChart, Brain, History } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const sidebarItems = [
  { title: "Upload", icon: Upload, href: "/dashboard/upload" },
  { title: "Analyze", icon: BarChart, href: "/dashboard/analyze" },
  { title: "Explainability", icon: Brain, href: "/dashboard/explain" },
  { title: "History", icon: History, href: "/dashboard/history" },
];

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-sky-100 to-emerald-50 dark:from-indigo-950 dark:via-sky-900 dark:to-emerald-950">
      <Sidebar className="h-screen">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 w-full ${pathname === item.href ? "bg-muted font-semibold text-primary" : ""}`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar className="border-b bg-white/80 dark:bg-black/60 shadow-sm">
          <NavbarContent className="justify-end">
            <NavbarItem>
              <NavbarProfileDropdown />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          {children}
        </main>
      </div>
    </div>
  );
}