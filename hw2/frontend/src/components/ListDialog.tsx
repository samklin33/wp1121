import { useRef, useState } from "react";

import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { updateList } from "@/utils/client";

import Card from "./Card";
import type { CardProps } from "./Card";
import CardDialog from "./CardDialog";
import { Dialog, DialogContent } from "@mui/material";

type ListDialogProps = {
    open: boolean;
    id:string;
    name: string;
    num: number;
    img: string;
    description: string;
    cards: CardProps[];
    onClose: () => void;
}

export default function ListDialog ({
    open, id, name, num, img, description, cards, onClose, 
}: ListDialogProps) {
    const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const { fetchLists } = useCards();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpdateName = async () => {
        if (!inputRef.current) return;
    
        const newName = inputRef.current.value;
        if (newName !== name) {
          try {
            await updateList(id, { name: newName });
            fetchLists();
          } catch (error) {
            alert("Error: Failed to update list name");
          }
        }
        setEditingName(false);
    };
    const handleUpdateDescription = async () => {
        if (!inputRef.current) return;
    
        const newDescription = inputRef.current.value;
        if (newDescription !== description) {
          try {
            await updateList(id, { description: newDescription });
            fetchLists();
          } catch (error) {
            alert("Error: Failed to update list description");
          }
        }
        setEditingDescription(false);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <img src={img} width={350} height={350}/>
                {editingName ? (
                    <ClickAwayListener onClickAway={handleUpdateName}>
                    <Input
                        autoFocus
                        defaultValue={name}
                        className="grow"
                        placeholder="Enter a new name for this list..."
                        sx={{ fontSize: "2rem" }}
                        inputRef={inputRef}
                    />
                    </ClickAwayListener>
                ) : (
                    <button
                        onClick={() => setEditingName(true)}
                        className="w-full rounded-md p-2 hover:bg-white/10"
                    >
                        <Typography className="text-start" variant="h4">
                            {name}
                        </Typography>
                    </button>
                )}
                {editingDescription ? (
                    <ClickAwayListener onClickAway={handleUpdateDescription}>
                    <Input
                        autoFocus
                        defaultValue={description}
                        className="grow"
                        placeholder="Enter a new description for this list..."
                        sx={{ fontSize: "1.2rem" }}
                        inputRef={inputRef}
                    />
                    </ClickAwayListener>
                ) : (
                    <button
                        onClick={() => setEditingDescription(true)}
                        className="w-full rounded-md p-2 hover:bg-white/10"
                    >
                        <Typography className="text-start" variant="h6">
                            {description}
                        </Typography>
                    </button>
                )}
            </DialogContent>
            <Toolbar style={{justifyContent:"flex-end"}}>
                <Button
                    variant="contained"
                    className="w-25"
                    onClick={() => setOpenNewCardDialog(true)}
                >
                    Add
                </Button>
                {/* <Button
                    variant="contained"
                    className="w-25"
                    // onClick={() => setDeleteButton(true)}
                >
                    Delete
                </Button> */}
            </Toolbar>
            <DialogContent className="flex justify-between">
                {/* <CheckBox></CheckBox> */}
                <Typography className="text-start" variant="h6">Song</Typography>
                <Typography className="text-center" variant="h6">Singer</Typography>
                <Typography className="text-end" variant="h6">Link</Typography>
            </DialogContent>
            <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
            <div className="flex flex-col gap-4">
            {cards.map((card) => (
                <Card key={card.id} {...card} songNum={num}/>
            ))}
            </div>
            <CardDialog
                variant="new"
                open={openNewCardDialog}
                songNum={num}
                onClose={() => setOpenNewCardDialog(false)}
                listId={id}
            />
        </Dialog>
    );
}