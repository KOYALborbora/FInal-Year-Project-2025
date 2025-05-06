import { NextResponse } from "next/server";

export async function GET() {
  // Example output: paginated history
  return NextResponse.json({
    history: [
      {
        id: "upload-1",
        date: "2025-04-27",
        text: "Sample text #1",
        image: "/sample1.png",
        textSentiment: "Positive",
        imageSentiment: "Neutral",
      },
      {
        id: "upload-2",
        date: "2025-04-26",
        text: "Sample text #2",
        image: null,
        textSentiment: "Negative",
        imageSentiment: "Positive",
      },
    ],
    page: 1,
    totalPages: 2,
  });
}