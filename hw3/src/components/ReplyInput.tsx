"use client";

import { useRef } from "react";

import GrowingTextarea from "@/components/GrowingTextarea";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";
import useReply from "@/hooks/useReply";

type ReplyInputProps = {
  replyToTweetId: number;
  userName?: string;
  liked: boolean;
};

export default function ReplyInput({
  replyToTweetId,
  userName, 
  liked, 
}: ReplyInputProps) {
  const username = userName?.toString();
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { postReply } = useReply();

  const handleReply = async () => {
    const content = textareaRef.current?.value;
    if (!content) return;
    if (!handle) return;

    try {
      await postReply({
        handle, 
        content,
        replyToTweetId, 
      });
      textareaRef.current.value = "";
      textareaRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
      console.log("handle: ", handle);
      console.log("content: ", content);
      console.log("reply posted");
    } catch (error) {
      console.error(error);
      alert("Error posting reply");
    }
  };

  const handleInput = () => {
    const newText = textareaRef.current?.value;

    if (newText !== undefined) {
      if (newText.includes('\n')) {
        handleReply();
      }
    }
  }

  return (
    <>
    {/*liked && */<div onClick={() => textareaRef.current?.focus()}>
      <div>
        <GrowingTextarea
          ref={textareaRef}
          onChange={handleInput}
          wrapperClassName="col-start-2 row-start-2"
          className="bg-transparent text-xl outline-none placeholder:text-gray-500"
          placeholder={{username}+" 留下你的想法"}
        />
      </div>
    </div>}
    {/* {!liked && <p className="bg-transparent text-xl outline-none text-gray-500">參加活動來留下想法</p>} */}
    </>
  );
}
