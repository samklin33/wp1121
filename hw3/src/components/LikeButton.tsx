"use client";

import { useState } from "react";
import type { EventHandler, MouseEvent } from "react";

import useLike from "@/hooks/useLike";
import { cn } from "@/lib/utils";

type LikeButtonProps = {
  initialLiked?: boolean;
  tweetId: number;
  handle?: string;
};

export default function LikeButton({
  initialLiked,
  tweetId,
  handle,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const { likeTweet, unlikeTweet, loading } = useLike();

  const handleClick: EventHandler<MouseEvent> = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!handle) return;
    if (liked) {
      await unlikeTweet({
        tweetId,
        userHandle: handle,
      });
      setLiked(false);
    } else {
      await likeTweet({
        tweetId,
        userHandle: handle,
      });
      setLiked(true);
    }
  };

  return (
    <>
    <button
      className={cn(
        "flex w-16 items-center gap-1 hover:text-brand",
        liked && "text-brand",
      )}
      onClick={handleClick}
      disabled={loading}
    >
      <div
        className={cn(
          "flex items-center gap-1 rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10",
          liked && "bg-brand/10",
        )}
      >
        我要參加
      </div>
    </button>
    </>
  );
}
