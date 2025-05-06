import * as React from "react";

export function Sidebar({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <aside className={`w-56 bg-white/90 dark:bg-black/70 border-r border-border flex flex-col ${className ?? ""}`}>{children}</aside>;
}

export function SidebarContent({ children }: React.PropsWithChildren) {
  return <div className="flex-1 flex flex-col p-4 gap-4">{children}</div>;
}

export function SidebarGroup({ children }: React.PropsWithChildren) {
  return <div className="mb-4">{children}</div>;
}

export function SidebarGroupLabel({ children }: React.PropsWithChildren) {
  return <div className="text-xs font-semibold uppercase text-muted-foreground mb-2 px-2 tracking-wider">{children}</div>;
}

export function SidebarGroupContent({ children }: React.PropsWithChildren) {
  return <div>{children}</div>;
}

export function SidebarMenu({ children }: React.PropsWithChildren) {
  return <nav className="flex flex-col gap-1">{children}</nav>;
}

export function SidebarMenuItem({ children }: React.PropsWithChildren) {
  return <div>{children}</div>;
}

export function SidebarMenuButton({ asChild = false, children }: { asChild?: boolean; children: React.ReactNode }) {
  if (asChild) return <>{children}</>;
  return <button className="w-full text-left px-3 py-2 rounded hover:bg-muted transition">{children}</button>;
}