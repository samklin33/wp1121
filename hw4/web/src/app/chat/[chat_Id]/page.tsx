"use client"

import ChatRoomMessages from "@/components/ChatRoomMessages";
import ChatRoomBar from "@/components/ChatRoomBar";
import ChatRoomInput from "@/components/ChatRoomInput";

function ChattingRoom() {
    return (
        <>
        <div className="w-full h-full overflow-hidden flex flex-row shadow-lg">
            <div className="flex-grow bg-gray-100 justify-left">
                <ChatRoomBar />
            </div>
            <div className="w-50% h-full overflow-hidden flex flex-col shadow-lg">
                <nav className="w-full shadow-md p-3 text-md font-semibold">Chatroom</nav>
                <div className="overflow-y-scroll grow">
                    <ChatRoomMessages />
                </div>
                <div className="p-2">
                    <ChatRoomInput />
                </div>
            </div>
        </div>
        </>
    )
}

export default ChattingRoom;
