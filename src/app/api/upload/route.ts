import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Example: multipart/form-data with { file, text }
  // TODO: Handle file upload and text input
  return NextResponse.json({ success: true, uploadId: "mock-upload-id" });
}