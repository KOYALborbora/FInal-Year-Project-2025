"use client";
import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Placeholder explainability data
const explanations = [
  {
    id: "text-1",
    title: "Text Decision: Sentiment",
    details: "The model focused on the words 'amazing' and 'love' to determine a positive sentiment.",
    chartData: [
      { word: "I", importance: 0.1 },
      { word: "love", importance: 0.8 },
      { word: "this", importance: 0.2 },
      { word: "amazing", importance: 0.9 },
      { word: "product", importance: 0.3 },
    ],
  },
  {
    id: "image-1",
    title: "Image Decision: Saliency Map",
    details: "The model highlighted the central region of the image as most relevant for emotion detection.",
    chartData: [
      { region: "Top-Left", importance: 0.2 },
      { region: "Center", importance: 0.85 },
      { region: "Bottom-Right", importance: 0.4 },
    ],
  },
];

export function ExplainabilityCard() {
  // TODO: Fetch explanations from /api/explainability
  // const [explanations, setExplanations] = React.useState([])

  return (
    <div className="w-full max-w-2xl bg-white/90 dark:bg-black/70 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-foreground mb-2">Explainability</h2>
      <Accordion type="single" collapsible className="w-full">
        {explanations.map((exp) => (
          <AccordionItem value={exp.id} key={exp.id}>
            <AccordionTrigger>{exp.title}</AccordionTrigger>
            <AccordionContent>
              <div className="mb-4 text-muted-foreground">{exp.details}</div>
              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={exp.chartData} layout="vertical">
                    <XAxis type="number" hide domain={[0, 1]} />
                    <YAxis type="category" dataKey={exp.word ? "word" : "region"} width={80} />
                    <Tooltip />
                    <Bar dataKey="importance" fill="#6366f1">
                      {exp.chartData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={exp.word ? "#38bdf8" : "#34d399"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}