import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useReply() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postReply = async ({
    handle, 
    content,
    replyToTweetId, 
  }: {
    handle: string;
    content: string;
    replyToTweetId: number;
  }) => {
    setLoading(true);

    const res = await fetch("/api/replies", {
      method: "POST",
      body: JSON.stringify({
        handle, 
        content,
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
    postReply,
    loading,
  };
}