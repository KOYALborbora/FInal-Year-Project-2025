import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Example: { email, password, name }
  const body = await req.json();
  // TODO: Register user
  return NextResponse.json({
    success: true,
    user: {
      email: body.email,
      name: body.name,
      createdAt: new Date().toISOString().slice(0, 10),
      id: "mock-user-id"
    }
  });
}