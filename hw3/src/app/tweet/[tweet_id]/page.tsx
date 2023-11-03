import Link from "next/link";
import { redirect } from "next/navigation";

import { eq, desc, sql, and } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";

import LikeButton from "@/components/LikeButton";
import ReplyInput from "@/components/ReplyInput";
import Reply from "@/components/Reply";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { likesTable, repliesTable, tweetsTable, usersTable } from "@/db/schema";

type TweetPageProps = {
  params: {
    tweet_id: string;
  };
  searchParams: {
    username?: string;
    handle?: string;
  };
};

export default async function TweetPage({
  params: { tweet_id },
  searchParams: { username, handle },
}: TweetPageProps) {

  const errorRedirect = () => {
    const params = new URLSearchParams();
    username && params.set("username", username);
    handle && params.set("handle", handle);
    redirect(`/?${params.toString()}`);
  };

  const tweet_id_num = parseInt(tweet_id);
  if (isNaN(tweet_id_num)) {
    errorRedirect();
  }

  const [tweetData] = await db
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      userHandle: tweetsTable.userHandle,
      startDate: tweetsTable.startDate, 
      startTime: tweetsTable.startTime, 
      endDate: tweetsTable.endDate, 
      endTime: tweetsTable.endTime, 
      createdAt: tweetsTable.createdAt,
    })
    .from(tweetsTable)
    .where(eq(tweetsTable.id, tweet_id_num))
    .execute();

  if (!tweetData) {
    errorRedirect();
  }

  const likes = await db
    .select({
      id: likesTable.id,
    })
    .from(likesTable)
    .where(eq(likesTable.tweetId, tweet_id_num))
    .execute();

  const numLikes = likes.length;

  const [liked] = await db
    .select({
      id: likesTable.id,
    })
    .from(likesTable)
    .where(
      and(
        eq(likesTable.tweetId, tweet_id_num),
        eq(likesTable.userHandle, handle ?? ""),
      ),
    )
    .execute();

    const [user] = await db
    .select({
      displayName: usersTable.displayName,
      handle: usersTable.handle,
    })
    .from(usersTable)
    .where(eq(usersTable.handle, tweetData.userHandle))
    .execute();

  const tweet = {
    id: tweetData.id,
    content: tweetData.content,
    username: user.displayName,
    handle: user.handle,
    startDate: tweetData.startDate, 
    startTime: tweetData.startTime,
    endDate: tweetData.endDate, 
    endTime: tweetData.endTime,
    likes: numLikes,
    createdAt: tweetData.createdAt,
    liked: Boolean(liked),
  };

  const replies = await db
    .select({
      id: repliesTable.id,
      content: repliesTable.content,
      username: usersTable.displayName,
      handle: usersTable.handle, 
      createdAt: repliesTable.createdAt,
    })
    .from(repliesTable)
    .orderBy(desc(repliesTable.createdAt))
    .innerJoin(usersTable, eq(repliesTable.userHandle, usersTable.handle))
    .execute();

  return (
    <>
    <div className="flex h-screen w-full max-w-2xl flex-col overflow-scroll pt-2">
      <div className="mb-2 flex items-center gap-8 px-4">
        <Link href={{ pathname: "/", query: { username, handle } }}>
          <ArrowLeft size={18} />
        </Link>
      </div>
      <div className="flex flex-col px-4 pt-3 gap-2">
        <p className="mt-3 whitespace-pre-wrap text-xl">
          {tweet.content}
        </p>
        <p>{tweet.likes}人已參加</p>
        <div className="flex gap-3 justify-between">
          <p className="font-bold">From: {tweet.startDate} {tweet.startTime}</p>
          <p className="font-bold">To: {tweet.endDate} {tweet.endTime}</p>
        </div>
        <div className="my-2 flex items-center justify-between gap-4 text-gray-400">
          {!tweet.liked && <LikeButton
            handle={handle}
            initialLiked={tweet.liked}
            tweetId={tweet.id}
          />}
          {tweet.liked && <p className="flex w-16 items-center gap-1 text-brand">已參加</p>}
        </div>
        <Separator />
      </div>
      {tweet.liked && <ReplyInput replyToTweetId={tweet.id} userName={tweet.username} liked={tweet.liked}/>}
      {!tweet.liked && <p className="bg-transparent text-xl outline-none text-gray-500">參加活動來留下想法</p>}
      <Separator />
      {replies.map((reply) => (
        <Reply
          key={reply.id}
          username={reply.username}
          content={reply.content}
        />
      ))}
    </div>
    </>
  );
}
