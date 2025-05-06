import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Example: { email, password }
  const body = await req.json();
  // TODO: Authenticate user
  return NextResponse.json({ success: true, token: "mock-jwt-token", user: { email: body.email } });
}