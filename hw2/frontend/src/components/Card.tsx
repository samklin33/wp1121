import { useState } from "react";

import { DialogContent, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

import CardDialog from "./CardDialog";
// import { CheckBox } from "@mui/icons-material";

export type CardProps = {
  id: string;
  title: string;
  singer: string;
  link: string;
  listId: string;
  songNum: number;
};

export default function Card({ id, title, singer, link, listId }: CardProps) {
  const [cardDialogOpen, setCardDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setCardDialogOpen(true);
  };

  return (
    <>
      <button onClick={handleClickOpen} className="text-start">
        <Paper className="flex w-full flex-col p-2" elevation={6}>
          <DialogContent className="flex justify-between">
            {/* <CheckBox></CheckBox> */}
            <Typography className="text-start" variant="caption">{title}</Typography>
            <Typography className="text-center" variant="caption">{singer}</Typography>
            <Typography className="text-end underline" variant="caption"><a href={link} target="_blank">link</a></Typography>
          </DialogContent>
        </Paper>
      </button>
      <CardDialog
        variant="edit"
        open={cardDialogOpen}
        onClose={() => setCardDialogOpen(false)}
        title={title}
        singer={singer}
        link={link}
        listId={listId}
        cardId={id}
      />
    </>
  );
}
