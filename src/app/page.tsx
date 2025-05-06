import { HeroSection, FeaturesSection } from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-300 animate-gradient-x transition-all duration-1000">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
