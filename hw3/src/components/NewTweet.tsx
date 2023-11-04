"use client";

import { useState } from "react";
import TweetInput from "./TweetInput";

export default function NewTweet()  {
    const [NewTweetInput, setNewTweetInput] = useState(false);

    return (
        <>
        <div className="justify-end">
            <button
                className="flex items-center gap-2 rounded-md border border-solid border-1 p-2.5 w-20 text-center transition-colors duration-300 hover:bg-gray-200"
                onClick={() => setNewTweetInput(true)}
            >
                新增
            </button>
        </div>
        <TweetInput open={NewTweetInput} onClose={() => setNewTweetInput(false)} />
        </>
    )
}