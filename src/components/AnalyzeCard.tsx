"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function AnalyzeCard() {
  // Placeholder state for results
  const [result, setResult] = React.useState<null | {
    textSentiment: string;
    imageSentiment: string;
    textScore: number;
    imageScore: number;
  }>(null);
  const router = useRouter();
  // Simulate fetching results
  React.useEffect(() => {
    // TODO: Fetch from /api/analyze
    setTimeout(() => {
      setResult({
        textSentiment: "Positive",
        imageSentiment: "Neutral",
        textScore: 0.87,
        imageScore: 0.55,
      });
    }, 800);
  }, []);

  return (
    <div className="w-full max-w-xl bg-white/90 dark:bg-black/70 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-foreground mb-2">Sentiment Analysis Results</h2>
      {!result ? (
        <div className="text-center text-muted-foreground py-12">Analyzing...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-100 via-sky-100 to-emerald-100 dark:from-indigo-900 dark:via-sky-900 dark:to-emerald-900 rounded-xl p-6 flex flex-col items-center shadow">
            <span className="text-lg font-semibold mb-1">Text Sentiment</span>
            <span className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-400 bg-clip-text text-transparent">{result.textSentiment}</span>
            <span className="text-sm text-muted-foreground">Score: {result.textScore}</span>
          </div>
          <div className="bg-gradient-to-br from-indigo-100 via-sky-100 to-emerald-100 dark:from-indigo-900 dark:via-sky-900 dark:to-emerald-900 rounded-xl p-6 flex flex-col items-center shadow">
            <span className="text-lg font-semibold mb-1">Image Sentiment</span>
            <span className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-400 bg-clip-text text-transparent">{result.imageSentiment}</span>
            <span className="text-sm text-muted-foreground">Score: {result.imageScore}</span>
          </div>
        </div>
      )}
      <Button className="w-full mt-4" variant="outline" onClick={() => router.push("/dashboard/upload")}>Analyze Another</Button>
    </div>
  );
}