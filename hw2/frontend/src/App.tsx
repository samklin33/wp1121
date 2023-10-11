import { useEffect, useState } from "react";


import CardList from "@/components/CardList";
import TitleBar from "@/components/TitleBar";
import HeaderBar from "@/components/HeaderBar";
import useCards from "@/hooks/useCards";

function App() {
  const { lists, fetchLists, fetchCards } = useCards();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  return (
    <>
      <HeaderBar />
      <TitleBar setSearch={setSearch} />
      <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
        {lists.filter((list) => (list.name.toLowerCase().includes(search.toLowerCase()))).map((list) => (
          <CardList key={list.id} {...list} />
        ))}
      </main>
    </>
  );
}

export default App;
