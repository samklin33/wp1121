"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function AddChatRoom() {
    console.log("AddChatRoom");
    const [ chatName, setChatName ] = useState("");
    const router = useRouter();

    const handleChat = async () => {
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                body: JSON.stringify({ chatName }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);
            if(!res.ok) {
                const data = await res.json();
                throw new Error(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleClose = () => {
            router.push("/");
    }

    return (
        <form 
            onSubmit={handleChat}
            className="border shadow-lg p-6 rounded-xl flex flex-col gap-4 lg:w-1/3 md:w-1/2"
        >
            <div className="flex flex-row justify-between gap-2">
                <h1 className="flex gap-4 font-bold">Add ChatRoom</h1>
                <button
                    className="text-gray py-2 px-4 rounded-full text-sm hover:bg-gray-300 transition duration-200 ease-in-out"
                    onClick={handleClose}
                >x</button>
            </div>
            <div className="w-full flex flex-grow gap-2">
                <input
                    className="w-full border p-2 rounded-full"
                    type="text"
                    placeholder="Who Do You Want to Chat With?"
                    onChange={(e) => setChatName(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-black text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-700 transition duration-200 ease-in-out"
                >
                    chat
                </button>
            </div>
        </form>
    )
}

export default AddChatRoom;