import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import type { User } from "@/package/types/user";

const signInSchema = z.object({
  user: z.string().min(1).max(50),
  chatrooms: z.array(z.string().min(1).max(50)),
});
type SignInRequest = z.infer<typeof signInSchema>;

export async function GET() {
  return NextResponse.json(
    {
      user: db.user,
    },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    signInSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { user, chatrooms } = data as SignInRequest;
  const newUser: User = {
    displayId: user,
    chatroom: chatrooms,
  };
  db.user = newUser;
  return NextResponse.json(
    {
      user: newUser,
    },
    { status: 200 },
  );
}

export async function DELETE(request: NextRequest) {
}