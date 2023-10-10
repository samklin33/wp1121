import { useState } from "react";

import { Button, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";

import NewListDialog from "./NewListDialog";

export default function TitleBar()  {
    
    // const [deleteButton, setDeleteButton] = useState(false);
    const [newListDialogOpen, setNewListDialogOpen] = useState(false);
    
    return (
        <>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Playlists
                </Typography>
                <Button
                    variant="contained"
                    className="w-25"
                    onClick={() => setNewListDialogOpen(true)}
                >
                    Add a list
                </Button>
                {/* <Button
                    variant="contained"
                    className="w-25"
                    onClick={() => setDeleteButton(true)}
                >
                    Delete list
                </Button> */}
            </Toolbar>
            <NewListDialog
                open={newListDialogOpen}
                title=""
                description=""
                onClose={() => setNewListDialogOpen(false)}
            />
        </>
    );
}