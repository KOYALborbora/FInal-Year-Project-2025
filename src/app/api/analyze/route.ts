import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const text = formData.get("text");

    if (!image || !text) {
      return NextResponse.json({ error: "Image and text are required." }, { status: 400 });
    }

    const apiResponse = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    });

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch data from the backend API");
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/analyze:", error);
    return NextResponse.json({ error: "Failed to analyze data." }, { status: 500 });
  }
}