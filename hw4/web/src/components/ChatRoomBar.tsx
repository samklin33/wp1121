"use client";
import ChatRoom from "@/components/ChatRoom";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/user";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";

function ChatRoomBar() {
    const { user } = useContext(UserContext);
    const [ search, setSearch ] = useState("");
    const router = useRouter();
  
    useEffect(() => {
        if (!user) {
            router.push("/");
            return;
        }
    }, [user, router]);

    const handleAddChat = () => {
        router.push("/add");
    }
    const handleSearch = () => {
    }
    const handleLogout = () => {
        router.push("/");
    }

    return (
        <>
        <div className="w-full h-full overflow-hidden flex flex-col shadow-lg">
            <div className="flex flex-row items-center gap-2">
                <div className="w-full shadow-md p-3 text-md font-semibold">Chat</div>
                <div className="flex-grow">
                    <button 
                        className="text-sm hover:bg-gray-200 transition duration-200 ease-in-out"
                        onClick={handleAddChat}
                    >
                        Add Chat
                    </button>
                </div>
            </div>
            <div className="w-full h-12 flex flex-row gap-2">
                <input
                    className="flex-grow border shadow-lg p-6 rounded-full gap-4 lg:w-1/3 md:w-1/2 w-2/3"
                    type="text"
                    placeholder="Search User..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="bg-black text-white py-2 px-4 rounded-full text-sm hover:bg-gray-700 transition duration-200 ease-in-out"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <div className="overflow-y-scroll grow">
                {user?.chatroom?.map((chat) => (
                    <ChatRoom chatId={chat}/>
                ))}
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
                <div className="flex flex-row justift-between items-center gap-2">
                    <Avatar displayId={user?.displayId || ""} classname="bg-black text-white w-8 h-8" />
                    <p className="text-md font-semibold">{user?.displayId}</p>
                </div>
                <button
                    className="bg-black text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-700 transition duration-200 ease-in-out"
                    onClick={handleLogout}
                >
                    Sign Out
                </button>
            </div>
        </div>
        </>
    );
}

export default ChatRoomBar;