import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useTweet() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postTweet = async ({
    handle, 
    content,
    startDate,
    startTime,
    endDate,
    endTime,
    replyToTweetId,
  }: {
    handle: string;
    content: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    replyToTweetId?: number;
  }) => {
    setLoading(true);

    const res = await fetch("/api/tweets", {
      method: "POST",
      body: JSON.stringify({
        handle, 
        content,
        startDate, 
        startTime,
        endDate,
        endTime, 
        replyToTweetId,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  return {
    postTweet,
    loading,
  };
}
