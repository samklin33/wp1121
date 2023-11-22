"use client";
import { createContext, useState } from "react";
import type { User } from "@/package/types/user";

export type UserContext = {
  user: User | null;
  setUser: (user: User) => void;
  signIn: (user: string, chatroom: string[]) => Promise<void>;
};

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  signIn: async () => {},
});

type Props = {
  children: React.ReactNode;
};
export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (displayId: string, chatroom: string[]) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ user: displayId, chatroom: chatroom }),
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      });
      if(!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }  
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <UserContext.Provider value={{ user, setUser, signIn }}>
      {children}
    </UserContext.Provider>
  );
}
