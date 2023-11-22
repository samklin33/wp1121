"use client";
import React from "react";
import Avatar from "./Avatar";
import { UserContext } from "@/context/user";
import { useRouter } from "next/navigation";

type ChatRoomProps = {
    chatId: string;
}

function ChatRoom({ chatId }: ChatRoomProps) {
    console.log(chatId);
    const { user } = React.useContext(UserContext);
    const router = useRouter();
    
    const handleDelete = async () => {
        console.log("delete");
        await fetch("/api/users", {
            method: "DELETE",
            body: JSON.stringify({ displayId: user?.displayId, chatId }),
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
        });
    }
    const handleClick = () => {
        router.push(`/chat/${chatId}`);
    }

    return (
        <>
        <button
            className="w-full p-3 text-md font-semibold rounded-full hover:bg-gray-200"
            onClick={handleClick}
        >
            <div className="flex flex-row items-center gap-2">
                <Avatar displayId={chatId} classname="bg-black text-white w-8 h-8" />
                <div className="flex flex-col justify-start">
                    <p className="text-md font-bold">{chatId}</p>
                    <p className="text-sm">last message</p>
                </div>
                <div className="flex-grow">
                    <div className="flex flex-row justify-end">
                        <button
                            className="text-gray-200 py-2 px-4 rounded-full text-sm hover:bg-gray-300 transition duration-200 ease-in-out"
                            onClick={handleDelete}
                        >x</button>
                    </div>
                </div>
            </div>
        </button>
        </>
    )
}

export default ChatRoom;