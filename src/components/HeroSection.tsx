"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  return (
    <section className="w-full flex flex-col items-center justify-center py-20 px-4 text-center gap-8">
      <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-400 bg-clip-text text-transparent animate-fade-in-up">
        GradientSentimentAI
      </h1>
      <p className="text-lg sm:text-2xl text-muted-foreground max-w-xl animate-fade-in-up delay-100">
        Understand Emotions. Beyond Text and Images.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 animate-fade-in-up delay-200">
        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition" onClick={() => router.push("/login")}>Login</Button>
        <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-700 hover:bg-indigo-50 transition" onClick={() => router.push("/signup")}>Sign Up</Button>
      </div>
    </section>
  );
}