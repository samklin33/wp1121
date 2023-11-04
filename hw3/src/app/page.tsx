import { eq, desc, isNull, sql } from "drizzle-orm";

import NameDialog from "@/components/NameDialog";
import Tweet from "@/components/Tweet";
import ProfileButton from "@/components/ProfileButton";
import SearchBar from "@/components/SearchBar";
import NewTweet from "@/components/NewTweet";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { likesTable, tweetsTable, usersTable } from "@/db/schema";
import React from "react";
import { useState } from "react";

type HomePageProps = {
  searchParams: {
    username?: string;
    handle?: string;
  };
};

export default async function Home({
  searchParams: { username, handle },
}: HomePageProps) {

  if (username && handle) {
    await db
      .insert(usersTable)
      .values({
        displayName: username,
        handle,
      })
      .onConflictDoUpdate({
        target: usersTable.handle,
        set: {
          displayName: username,
        },
      })
      .execute();
  }

  const likesSubquery = db.$with("likes_count").as(
    db
      .select({
        tweetId: likesTable.tweetId,
        likes: sql<number | null>`count(*)`.mapWith(Number).as("likes"),
      })
      .from(likesTable)
      .groupBy(likesTable.tweetId),
  );

  const likedSubquery = db.$with("liked").as(
    db
      .select({
        tweetId: likesTable.tweetId,
        liked: sql<number>`1`.mapWith(Boolean).as("liked"),
      })
      .from(likesTable)
      .where(eq(likesTable.userHandle, handle ?? "")),
  );

  const tweets = await db
    .with(likesSubquery, likedSubquery)
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      username: usersTable.displayName,
      handle: usersTable.handle,
      likes: likesSubquery.likes,
      createdAt: tweetsTable.createdAt,
      liked: likedSubquery.liked,
    })
    .from(tweetsTable)
    .where(isNull(tweetsTable.replyToTweetId))
    .orderBy(desc(tweetsTable.createdAt))
    .innerJoin(usersTable, eq(tweetsTable.userHandle, usersTable.handle))
    .leftJoin(likesSubquery, eq(tweetsTable.id, likesSubquery.tweetId))
    .leftJoin(likedSubquery, eq(tweetsTable.id, likedSubquery.tweetId))
    .execute();
  
  const [search, setSearch] = typeof window !== 'undefined' ? React.useState(""): [(""), () => null]
  // const [search, setSearch] = useState("");
  console.log("search: ", search, ".")

  return (
    <>
      <div className="flex h-screen w-full max-w-2xl flex-col overflow-scroll pt-2">
        <ProfileButton />
        <div className="my-2 flex items-center justify-between gap-4 text-black-400">
          <SearchBar /*setSearch={setSearch}*/ />
          <NewTweet />
        </div>
        <Separator />
        {tweets.filter((tweet) => (tweet.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))).map((tweet) => (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            username={username}
            handle={handle}
            content={tweet.content}
            likes={tweet.likes}
            liked={tweet.liked}
          />
        ))}
      </div>
      <div>
        <NameDialog />
      </div>
    </>
  );
}
