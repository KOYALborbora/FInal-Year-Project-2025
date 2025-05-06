import { NextResponse } from "next/server";

export async function GET() {
  // Example output: explanations for text and image
  return NextResponse.json({
    explanations: [
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
    ],
  });
}