import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Example: { image: <base64 or url>, text: "..." }
  const body = await req.json();
  // TODO: Analyze sentiment
  return NextResponse.json({
    textSentiment: "Positive",
    imageSentiment: "Neutral",
    textScore: 0.87,
    imageScore: 0.55,
  });
}