import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import type { User } from "@/package/types/user";

const signInSchema = z.object({
  displayId: z.string().min(0).max(50),
  chatroom: z.array(z.string().min(0).max(50)),
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
  console.log("data: ", data);
  console.log(data.user.displayId)
  try {
    signInSchema.parse(data);
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { displayId, chatroom } = data as SignInRequest;
  const newUser: User = {
    displayId: displayId,
    chatroom: chatroom,
  };
  db.user = newUser;
  return NextResponse.json(
    {
      user: newUser,
    },
    { status: 200 },
  );
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  console.log("data: ", data);
  try {
    signInSchema.parse(data.user);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { displayId, chatroom } = data as SignInRequest;
  const newUser: User = {
    displayId: displayId,
    chatroom: chatroom,
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
