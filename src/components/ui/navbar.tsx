"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export function Navbar({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <header className={`w-full flex items-center h-16 px-4 ${className ?? ""}`}>{children}</header>;
}

export function NavbarContent({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`flex flex-1 items-center ${className ?? ""}`}>{children}</div>;
}

export function NavbarItem({ children }: React.PropsWithChildren) {
  return <div className="ml-2 flex items-center">{children}</div>;
}

export function NavbarProfileDropdown() {
  const router = useRouter();
  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted transition"
        onClick={() => router.push("/dashboard/profile")}
      >
        <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-400 to-emerald-400 flex items-center justify-center text-white font-bold">U</span>
        <span className="hidden sm:inline">Profile</span>
      </button>
      {/* Dropdown menu placeholder */}
    </div>
  );
}