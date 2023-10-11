import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
// import TextField from "@mui/material/TextField";

import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";
// import { useStepContext } from "@mui/material";
// import { Input } from "postcss";

type NewListDialogProps = {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
};

export default function NewListDialog({ open, title, description, onClose }: NewListDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const { fetchLists } = useCards();

  const handleAddList = async () => {
    if (newTitle === "")  {
      alert("Please enter Playlist title!")
      return;
    }
    if (newDescription === "")  {
      alert("Please enter the description!")
      return;
    }
    
    try {
      await createList({name: newTitle, description: newDescription,})
      fetchLists();
    } catch (error) {
      alert("Error: Failed to create list");
      console.log(error);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="flex gap-4">Add a list</DialogTitle>
      <DialogContent>
        <Input
          autoFocus
          defaultValue={title}
          onChange={(e) => setNewTitle(e.target.value)}
          className="grow"
          placeholder="Add New Playlist"
        />
        <input type="file" accept="image/*" placeholder="album cover"/>
      </DialogContent>
      <DialogContent>
        <textarea
          className="bg-white/0 p-2"
          autoFocus
          defaultValue={description}
          placeholder="Add a more detailed description..."
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
