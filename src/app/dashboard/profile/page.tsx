"use client";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAppStore } from "@/hooks/useAppStore";
import { Button } from "@/components/ui/button";
import { User as UserIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const user = useAppStore((s) => s.user) || { email: "user@email.com", name: "Jane Doe", createdAt: "2024-01-01" };
  const router = useRouter();
  return (
    <DashboardLayout>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 items-center animate-fade-in-up relative">
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition"
            aria-label="Close profile"
            onClick={() => router.back()}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-400 to-emerald-400 flex items-center justify-center text-white text-4xl font-bold mb-2">
            <UserIcon className="w-16 h-16" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-1">{user.name || user.email.split("@")[0]}</h2>
            <p className="text-muted-foreground mb-1">{user.email}</p>
            <p className="text-xs text-muted-foreground">Joined: {user.createdAt || "2024-01-01"}</p>
          </div>
          <Button className="w-full mt-2" variant="outline">Edit Profile</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}