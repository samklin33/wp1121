import React, { useState } from "react";

import { Button, Toolbar, Input } from "@mui/material";
import Typography from "@mui/material/Typography";

import NewListDialog from "./NewListDialog";

type TitleBarProps = {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function TitleBar({setSearch}: TitleBarProps)  {
    
    // const [deleteButton, setDeleteButton] = useState(false);
    const [newListDialogOpen, setNewListDialogOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    
    return (
        <>
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    My Playlists
                </Typography>
                <div>
                    <Input
                        type="text"
                        placeholder="search playlist"
                        defaultValue={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Button
                        // variant="contained"
                        className="w-25"
                        onClick={() => setSearch(searchInput)}
                    >
                        Search
                    </Button>
                </div>
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