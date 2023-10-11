import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { deleteList } from "@/utils/client";

import type { CardProps } from "./Card";
import ListDialog from "./ListDialog";

export type CardListProps = {
  id: string;
  name: string;
  img: string;
  description: string;
  cards: CardProps[];
};

export default function CardList({ id, name, description, cards}: CardListProps) {
  const [opnListDialog, setOpenListDialog] = useState(false);
  const { fetchLists } = useCards();

  const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };

  return (
    <>
      <Paper className="w-80 p-6">
        <button onClick={() => setOpenListDialog(true)}>
          <img src="./pic/cover1.svg" className="playlistCover" alt="playlist-cover" width={300} height={300} />
        </button>
        <div className="flex gap-4">
          <button
              onClick={() => setOpenListDialog(true)}
              className="w-full rounded-md p-2 hover:bg-white/10"
            >
              <Typography className="text-start" variant="h5">
                {name}
              </Typography>
          </button>
          <div className="grid place-items-center">
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <Typography className="text-start" variant="h6">
          {cards.length} songs
        </Typography>
      </Paper>
      <ListDialog
        open={opnListDialog}
        id={id}
        name={name}
        img="./pic/cover1.svg"
        description={description}
        cards={cards}
        onClose={() => setOpenListDialog(false)}
      />
    </>
  );
}
