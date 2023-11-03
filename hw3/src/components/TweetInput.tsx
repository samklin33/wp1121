"use client";

import { useRef } from "react";

import GrowingTextarea from "@/components/GrowingTextarea";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";
import Dialog from "@mui/material/Dialog";

type TweetInputProps = {
    open: boolean;
    onClose: () => void;
}

export default function TweetInput({ open, onClose }: TweetInputProps) {
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const { postTweet, loading } = useTweet();

  const handleTweet = async () => {
    const content = textareaRef.current?.value;
    const startDate = startDateRef.current?.value;
    const startTime = startTimeRef.current?.value;
    const endDate = endDateRef.current?.value;
    const endTime = endTimeRef.current?.value;
    if (!content) return;
    if (!handle) return;
    if (!startDate) return;
    if (!startTime) return;
    if (!endDate) return;
    if (!endTime) return;

    try {
      await postTweet({
        handle, 
        content,
        startDate,
        startTime,
        endDate,
        endTime,
      });
      textareaRef.current.value = "";
      startDateRef.current.value = "";
      startTimeRef.current.value = "";
      endDateRef.current.value = "";
      endTimeRef.current.value = "";

      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true, composed: true }), );
      startDateRef.current.dispatchEvent(new Event("input", { bubbles: true, composed: true }), );
      startTimeRef.current.dispatchEvent(new Event("input", { bubbles: true, composed: true }), );
      endDateRef.current.dispatchEvent(new Event("input", { bubbles: true, composed: true }), );
      endTimeRef.current.dispatchEvent(new Event("input", { bubbles: true, composed: true }), );
    } catch (error) {
      console.error(error);
      alert("Error posting tweet");
    }
  };

  return (
    <>
    <Dialog open={open} onClose={onClose}>
        <div className="flex gap-4" onClick={() => textareaRef.current?.focus()}>
            <div className="flex w-full flex-col px-2">
                <div className="mb-2 mt-6">
                {/* <div className="flex justify-end"> */}
                <GrowingTextarea
                    ref={textareaRef}
                    className="bg-transparent outline-none placeholder:text-gray-500"
                    placeholder="標題"
                />
                </div>
                <div className="flex justify-between">
                    <p className="font-bold">From</p>
                    <input type="date" ref={startDateRef}/>
                    <input type="time" ref={startTimeRef}/>
                </div>
                <div className="flex justify-between">
                    <p className="font-bold">To</p>
                    <input type="date" ref={endDateRef}/>
                    <input type="time" ref={endTimeRef}/>
                </div>
                <button
                    className={cn(
                    "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
                    "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
                    )}
                    onClick={handleTweet}
                    disabled={loading}
                >
                    新增
                </button>
                {/* </div> */}
            </div>
        </div>
    </Dialog>
    </>
  );
}