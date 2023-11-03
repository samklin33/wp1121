"use client";

import { useRouter } from "next/navigation";

import useUserInfo from "@/hooks/useUserInfo";

export default function ProfileButton() {
  const { username } = useUserInfo();
  const router = useRouter();

  return (
    <>
    <div className="flex items-center gap-2 rounded-full p-3 text-start transition-colors duration-300">
      <div className="w-40 max-lg:hidden">
        <p className="text-lg font-bold">{username ?? "..."}</p>
      </div>
    <button
      className="flex items-center gap-2 rounded-md border border-solid border-1 p-2.5 text-start transition-colors duration-300 hover:bg-gray-200"
      onClick={() => router.push('/')}
    >
      切換使用者
    </button>
    </div>
    </>
  );
}
