import { Sparkles, Brain, Image as ImageIcon } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-indigo-500" />, title: "Sentiment Analysis", description: "Analyze emotions in text, images, and more with state-of-the-art AI."
  },
  {
    icon: <Brain className="w-8 h-8 text-sky-500" />, title: "Explainability", description: "Transparent AI decisions with clear, human-readable explanations."
  },
  {
    icon: <ImageIcon className="w-8 h-8 text-emerald-500" />, title: "Multimodal Inputs", description: "Seamlessly process and understand both text and images."
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in-up delay-300">
      {features.map((feature) => (
        <div key={feature.title} className="flex flex-col items-center text-center bg-white/80 dark:bg-black/40 rounded-xl shadow-lg p-6 gap-4 transition hover:scale-105 hover:shadow-2xl">
          <div className="mb-2">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-1 text-foreground">{feature.title}</h3>
          <p className="text-muted-foreground text-base">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}