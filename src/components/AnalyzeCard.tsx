"use client";
import { useAppStore } from "@/hooks/useAppStore";
import { useRouter } from "next/navigation";

export function AnalyzeCard() {
  const router = useRouter();
  const analysisResult = useAppStore((state) => state.analysisResult);

  if (!analysisResult) {
    return (
      <div className="w-full max-w-xl bg-white/90 dark:bg-black/70 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-center text-foreground mb-2">
          No Analysis Data
        </h2>
        <p className="text-center text-muted-foreground">
          Please upload data for analysis.
        </p>
      </div>
    );
  }

  const { probabilities, result } = analysisResult;

  return (
    <div className="w-full max-w-xl bg-white/90 dark:bg-black/70 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-foreground mb-4">
        Sentiment Analysis Results
      </h2>

      {/* Main Sentiment */}
      <div className="bg-gradient-to-br from-indigo-100 via-sky-100 to-emerald-100 dark:from-indigo-900 dark:via-sky-900 dark:to-emerald-900 rounded-xl p-6 flex flex-col items-center shadow">
        <span className="text-lg font-semibold mb-1">Main Sentiment</span>
        <span className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
          {result}
        </span>
        <span className="text-sm text-muted-foreground">
          Score: {parseFloat(probabilities[result]).toFixed(2)}
        </span>
      </div>

      {/* Other Sentiments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        {Object.entries(probabilities)
          .filter(([sentiment]) => sentiment !== result)
          .map(([sentiment, score], index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-indigo-100 via-sky-100 to-emerald-100 dark:from-indigo-900 dark:via-sky-900 dark:to-emerald-900 rounded-xl p-6 flex flex-col items-center shadow"
            >
              <span className="text-lg font-semibold mb-1 capitalize">
                {sentiment} Sentiment
              </span>
              <span className="text-sm text-muted-foreground">
                Score: {parseFloat(score).toFixed(2)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}