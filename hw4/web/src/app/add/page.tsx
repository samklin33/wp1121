import AddChatRoom from "@/components/AddChatRoom";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full h-screen flex items-center justify-center">
        <AddChatRoom/>
      </div>
    </main>
  );
}
