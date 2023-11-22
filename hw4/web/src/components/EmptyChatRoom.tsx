"use client";

import { UserContext } from "@/context/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

function EmptyChatRoom() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
  }, [user, router]);

  return (
    <>
    <div className="px-2 pt-4">
        <div className="w-full pt-1">
            <div className="flex flex-row items-end gap-2 justify-center">
                Select a ChatRoom to start chatting
            </div>
        </div>
    </div>
    </>
  );
}

export default EmptyChatRoom;
