"use client";
import React from "react";
import Avatar from "./Avatar";
import { UserContext } from "@/context/user";

type ChatRoomProps = {
    chatId: string;
}

function ChatRoom({ chatId }: ChatRoomProps) {
    console.log(chatId);
    const { user } = React.useContext(UserContext);
    
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

    return (
        <>
        <div className="flex flex-row items-center gap-2">
            <button className="w-full shadow-md p-3 text-md font-semibold rounded-full">
                <Avatar displayId={chatId} classname="bg-black text-white w-8 h-8" />
                <div className="flex flex-col">
                    <p className="text-md font-semibold">{chatId}</p>
                    <p className="text-sm font-semibold">last message</p>
                </div>
                <div className="flex-grow">
                    <div className="flex flex-row justify-end">
                        <button
                            className="text-gray py-2 px-4 rounded-full text-sm hover:bg-gray-700 transition duration-200 ease-in-out"
                            onClick={handleDelete}
                        >x</button>
                    </div>
                </div>
            </button>
        </div>
        </>
    )
}

export default ChatRoom;