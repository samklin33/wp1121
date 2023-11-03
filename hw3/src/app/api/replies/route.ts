import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { repliesTable } from "@/db/schema";

const postTweetRequestSchema = z.object({
  handle: z.string().min(1).max(50),
  content: z.string().min(1).max(280),
  replyToTweetId: z.number().optional(),
});

type PostRepliesRequest = z.infer<typeof postTweetRequestSchema>;

export async function POST(request: NextRequest) {
  console.log("ok")
  const data = await request.json();

  try {
    postTweetRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { handle, content, replyToTweetId } = data as PostRepliesRequest;

  try {
    await db
      .insert(repliesTable)
      .values({
        userHandle: handle,
        content,
        replyToTweetId, 
      })
      .execute();
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
