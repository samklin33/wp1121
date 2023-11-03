import Link from "next/link";

import checked from "@/assets/checked.png"
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type TweetProps = {
  username?: string;
  handle?: string;
  id: number;
  content: string;
  likes: number;
  liked?: boolean;
};

export default function Tweet({
  username,
  handle, 
  id,
  content,
  likes,
  liked,
}: TweetProps) {
  return (
    <>
    <Link
      className="w-full h-100px px-4 pt-3 transition-colors hover:bg-gray-50"
      href={{
        pathname: `/tweet/${id}`,
        query: {
          username,
          handle, 
        },
      }}
    >
      <div className="flex gap-4">
        <article className="flex grow flex-col">
          <div className="flex justify-between">
            <article className="mt-2 whitespace-pre-wrap">{content}</article>
            {liked && <Image src={checked} alt="checked" width={30} height={20}/>}
            <div className="flex justify-end">
              {likes !== 0 && <p className="font-bold">{likes}</p>}
              {likes === null && <p className="font-bold">0</p>}
              <p>人已參加</p>
            </div>
          </div>
        </article>
      </div>
    </Link>
    <Separator />
    </>
  );
}
