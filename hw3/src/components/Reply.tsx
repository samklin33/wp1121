import { Separator } from "@/components/ui/separator";

type ReplyProps = {
  username: string;
  content: string;
};

export default function Reply({
  username,
  content,
}: ReplyProps) {
  return (
    <>
    <div className="flex">
      <p>{username}：{content}</p>
    </div>
    <Separator />
    </>
  );
}
