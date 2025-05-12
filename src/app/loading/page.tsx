"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkModelStatus() {
      try {
        const response = await fetch("http://localhost:5000/");
        if (response.ok) {
          router.replace("/dashboard");
        } else {
          console.error("Model is not ready yet.");
        }
      } catch (error) {
        console.error("Error checking model status:", error);
      }
    }

    const interval = setInterval(checkModelStatus, 2000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center">
        <div className="loader mb-4"></div>
        <p className="text-lg font-medium text-foreground">Loading the model, please wait...</p>
      </div>
    </div>
  );
}
